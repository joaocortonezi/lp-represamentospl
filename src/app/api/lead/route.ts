import { NextRequest, NextResponse } from "next/server";
import { checkBotId } from "botid/server";
import { createHash } from "crypto";
import * as z from "zod";

const cadastroSchema = z.object({
  etapa: z.literal("cadastro").optional().default("cadastro"),
  nome: z.string().trim().min(2),
  tel: z.string().refine((v) => v.replace(/\D/g, "").length >= 10),
  email: z.string().trim().optional().default(""),
  source: z.string().trim().max(120).optional().default("LP Etna"),
  /* Honeypot: campo invisível no form; humano nunca preenche. */
  hp: z.string().optional().default(""),
  /* Milissegundos entre montar o form e enviar; bot envia em <3s. */
  t: z.number().optional(),
  /* Meta CAPI (dedupe com o Pixel): id do evento, cookies e url de origem. */
  eventId: z.string().optional(),
  fbp: z.string().optional(),
  fbc: z.string().optional(),
  eventSourceUrl: z.string().optional(),
});

/* Segunda etapa: qualificação opcional pós-cadastro. O Vista deduplica o
   lead pelo telefone e anexa a mensagem ao cadastro existente, então as
   respostas aparecem como novo comentário no card do cliente. */
const qualificacaoSchema = z.object({
  etapa: z.literal("qualificacao"),
  nome: z.string().trim().min(2),
  tel: z.string().refine((v) => v.replace(/\D/g, "").length >= 10),
  email: z.string().trim().optional().default(""),
  source: z.string().trim().max(120).optional().default("LP Etna"),
  finalidade: z.enum(["Investimento", "Moradia"]),
  primeiroImovel: z.enum(["Sim", "Não"]),
  jaInvestiu: z.enum(["Sim", "Não"]),
  duvida: z.string().trim().max(600).optional().default(""),
});

const leadSchema = z.union([qualificacaoSchema, cadastroSchema]);

/* Rate limit em memória, por instância da função (Fluid Compute reaproveita
   instâncias, então segura rajadas de um mesmo IP; o limite global fica por
   conta da regra de rate-limit no Vercel Firewall). */
const WINDOW_MS = 60_000;
const MAX_PER_WINDOW = 5;
const hits = new Map<string, { n: number; reset: number }>();

function rateLimited(ip: string): boolean {
  const now = Date.now();
  if (hits.size > 5_000) {
    for (const [k, v] of hits) if (now > v.reset) hits.delete(k);
  }
  const h = hits.get(ip);
  if (!h || now > h.reset) {
    hits.set(ip, { n: 1, reset: now + WINDOW_MS });
    return false;
  }
  h.n += 1;
  return h.n > MAX_PER_WINDOW;
}

async function enviarLeadAoVista(lead: Record<string, string>) {
  const VISTA_URL = process.env.VISTA_URL;
  const VISTA_KEY = process.env.VISTA_KEY;
  if (!VISTA_URL || !VISTA_KEY) {
    console.error("[lead] VISTA_URL/VISTA_KEY ausentes no ambiente");
    return NextResponse.json({ ok: false, error: "misconfigured" }, { status: 500 });
  }

  try {
    const url = new URL(`${VISTA_URL}/lead`);
    url.searchParams.append("key", VISTA_KEY);

    const res = await fetch(url.toString(), {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({ cadastro: { lead } }),
      signal: AbortSignal.timeout(10_000),
    });

    const text = await res.text();
    let data: unknown = null;
    try {
      data = JSON.parse(text);
    } catch {
      /* Vista pode responder não-JSON em erro; cai no check abaixo */
    }

    const d = data as { status?: string; error?: unknown; message?: string } | null;
    if (!res.ok || d?.status === "error" || d?.error) {
      console.error("[lead] Vista recusou:", res.status, text.slice(0, 300));
      return NextResponse.json({ ok: false, error: "crm_rejected" }, { status: 502 });
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[lead] Falha ao enviar ao Vista:", err);
    return NextResponse.json({ ok: false, error: "crm_unreachable" }, { status: 502 });
  }
}

/* ---------- Meta Conversions API (server-side) ----------
   Envia o evento Lead pelo servidor, com o mesmo event_id do Pixel (browser)
   para o Meta deduplicar. Só roda se FB_PIXEL_ID + FB_CONVERSIONS_TOKEN
   estiverem no ambiente; sem isso, é no-op. Falha de CAPI nunca quebra o lead. */
const sha256 = (v: string) => createHash("sha256").update(v).digest("hex");

function normFone(tel: string): string {
  let d = tel.replace(/\D/g, "");
  if (!d.startsWith("55")) d = "55" + d;
  return d;
}

async function enviarCapiMeta(p: {
  nome: string;
  tel: string;
  email?: string;
  eventId?: string;
  fbp?: string;
  fbc?: string;
  eventSourceUrl?: string;
  clientIp?: string;
  userAgent?: string;
  lpOrigem?: string;
}): Promise<void> {
  const PIXEL = process.env.FB_PIXEL_ID || process.env.NEXT_PUBLIC_FB_PIXEL_ID;
  const TOKEN = process.env.FB_CONVERSIONS_TOKEN;
  if (!PIXEL || !TOKEN) return;

  try {
    const user_data: Record<string, unknown> = { ph: [sha256(normFone(p.tel))] };
    if (p.email) user_data.em = [sha256(p.email.trim().toLowerCase())];
    if (p.nome) {
      const parts = p.nome.trim().toLowerCase().split(/\s+/).filter(Boolean);
      if (parts[0]) user_data.fn = [sha256(parts[0])];
      if (parts.length > 1) user_data.ln = [sha256(parts[parts.length - 1])];
    }
    if (p.fbp) user_data.fbp = p.fbp;
    if (p.fbc) user_data.fbc = p.fbc;
    if (p.clientIp && p.clientIp !== "unknown") user_data.client_ip_address = p.clientIp;
    if (p.userAgent) user_data.client_user_agent = p.userAgent;

    const payload = {
      data: [
        {
          event_name: "Lead",
          event_time: Math.floor(Date.now() / 1000),
          event_id: p.eventId,
          action_source: "website",
          event_source_url: p.eventSourceUrl,
          user_data,
          custom_data: {
            content_name: "Lista VIP — Etna by SPL",
            lp_origem: p.lpOrigem,
          },
        },
      ],
    };

    const res = await fetch(
      `https://graph.facebook.com/v21.0/${PIXEL}/events?access_token=${encodeURIComponent(TOKEN)}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
        signal: AbortSignal.timeout(8_000),
      }
    );
    if (!res.ok) console.error("[lead] CAPI Meta recusou:", res.status, (await res.text()).slice(0, 200));
  } catch (err) {
    console.error("[lead] CAPI Meta falhou:", err);
  }
}

export async function POST(req: NextRequest) {
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "invalid_json" }, { status: 400 });
  }

  const parsed = leadSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ ok: false, error: "invalid_fields" }, { status: 400 });
  }

  const ip =
    req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
    req.headers.get("x-real-ip") ??
    "unknown";
  if (rateLimited(ip)) {
    return NextResponse.json({ ok: false, error: "too_many_requests" }, { status: 429 });
  }

  if (parsed.data.etapa === "qualificacao") {
    const { nome, tel, email, source, finalidade, primeiroImovel, jaInvestiu, duvida } =
      parsed.data;

    const verification = await checkBotId();
    if (verification.isBot) {
      console.warn("[lead] qualificação descartada pelo BotID", { ip });
      return NextResponse.json({ ok: false, error: "access_denied" }, { status: 403 });
    }

    const partes = [
      `Qualificacao do lead (LP Etna by SPL):`,
      `Finalidade: ${finalidade}.`,
      `Primeiro imovel: ${primeiroImovel}.`,
      `Ja investiu no mercado imobiliario: ${jaInvestiu}.`,
    ];
    if (duvida) partes.push(`Duvida/observacao: ${duvida}`);

    return enviarLeadAoVista({
      nome,
      fone: tel,
      ...(email ? { email } : {}),
      veiculo: source,
      Interesse: "Venda",
      mensagem: partes.join(" "),
    });
  }

  const { nome, tel, email, source, hp, t, eventId, fbp, fbc, eventSourceUrl } = parsed.data;

  /* Honeypot preenchido ou envio rápido demais para um humano: responde
     sucesso falso para não ensinar o bot a contornar. Lead não é gravado. */
  if (hp !== "" || (typeof t === "number" && t < 3_000)) {
    console.warn("[lead] descartado por honeypot/tempo", { ip, t, hpFilled: hp !== "" });
    return NextResponse.json({ ok: true });
  }

  const verification = await checkBotId();
  if (verification.isBot) {
    console.warn("[lead] descartado pelo BotID", { ip });
    return NextResponse.json({ ok: false, error: "access_denied" }, { status: 403 });
  }

  let lpOrigem: string | undefined;
  try {
    if (eventSourceUrl) lpOrigem = new URL(eventSourceUrl).hostname;
  } catch {
    /* url inválida: segue sem lp_origem */
  }
  await enviarCapiMeta({
    nome,
    tel,
    email,
    eventId,
    fbp,
    fbc,
    eventSourceUrl,
    clientIp: ip,
    userAgent: req.headers.get("user-agent") ?? undefined,
    lpOrigem,
  });

  return enviarLeadAoVista({
    nome,
    fone: tel,
    ...(email ? { email } : {}),
    veiculo: source,
    Interesse: "Venda",
    mensagem: `Lead veio da LP com interesse no Etna by SPL. Converteu em: ${source}.`,
  });
}
