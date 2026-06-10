import { NextRequest, NextResponse } from "next/server";
import { checkBotId } from "botid/server";
import * as z from "zod";

const leadSchema = z.object({
  nome: z.string().trim().min(2),
  tel: z.string().refine((v) => v.replace(/\D/g, "").length >= 10),
  email: z.string().trim().optional().default(""),
  source: z.string().trim().max(120).optional().default("LP Represamento"),
  /* Honeypot: campo invisível no form; humano nunca preenche. */
  hp: z.string().optional().default(""),
  /* Milissegundos entre montar o form e enviar; bot envia em <3s. */
  t: z.number().optional(),
});

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

  const { nome, tel, email, source, hp, t } = parsed.data;

  const ip =
    req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
    req.headers.get("x-real-ip") ??
    "unknown";
  if (rateLimited(ip)) {
    return NextResponse.json({ ok: false, error: "too_many_requests" }, { status: 429 });
  }

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

  const VISTA_URL = process.env.VISTA_URL;
  const VISTA_KEY = process.env.VISTA_KEY;
  if (!VISTA_URL || !VISTA_KEY) {
    console.error("[lead] VISTA_URL/VISTA_KEY ausentes no ambiente");
    return NextResponse.json({ ok: false, error: "misconfigured" }, { status: 500 });
  }

  const lead = {
    nome,
    fone: tel,
    ...(email ? { email } : {}),
    veiculo: source,
    Interesse: "Venda",
    mensagem: `Lead veio da LP com interesse no represamento SPL. Converteu em: ${source}.`,
  };

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
