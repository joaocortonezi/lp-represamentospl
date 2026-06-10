import { NextRequest, NextResponse } from "next/server";
import * as z from "zod";

const leadSchema = z.object({
  nome: z.string().trim().min(2),
  tel: z.string().refine((v) => v.replace(/\D/g, "").length >= 10),
  email: z.string().trim().optional().default(""),
  source: z.string().trim().max(120).optional().default("LP Represamento"),
});

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

  const { nome, tel, email, source } = parsed.data;

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
