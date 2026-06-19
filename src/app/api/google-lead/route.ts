import { NextRequest, NextResponse } from "next/server";

/* Webhook do Google Lead Form (lead form assets do Google Ads).
   O Google envia um POST com `user_column_data[]` + `google_key`. Validamos a
   chave (env GOOGLE_LEAD_KEY) e repassamos o lead ao Vista CRM, reaproveitando
   a mesma integração do /api/lead (VISTA_URL / VISTA_KEY). */

type Col = { column_id?: string; string_value?: string };

function pick(cols: Col[], ...ids: string[]): string {
  for (const id of ids) {
    const c = cols.find((x) => (x.column_id || "").toUpperCase() === id);
    if (c?.string_value) return c.string_value;
  }
  return "";
}

async function enviarLeadAoVista(lead: Record<string, string>): Promise<boolean> {
  const VISTA_URL = process.env.VISTA_URL;
  const VISTA_KEY = process.env.VISTA_KEY;
  if (!VISTA_URL || !VISTA_KEY) {
    console.error("[google-lead] VISTA_URL/VISTA_KEY ausentes no ambiente");
    return false;
  }
  try {
    const url = new URL(`${VISTA_URL}/lead`);
    url.searchParams.append("key", VISTA_KEY);
    const res = await fetch(url.toString(), {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify({ cadastro: { lead } }),
      signal: AbortSignal.timeout(10_000),
    });
    const text = await res.text();
    let data: { status?: string; error?: unknown } | null = null;
    try {
      data = JSON.parse(text);
    } catch {
      /* Vista pode responder não-JSON em erro */
    }
    if (!res.ok || data?.status === "error" || data?.error) {
      console.error("[google-lead] Vista recusou:", res.status, text.slice(0, 300));
      return false;
    }
    return true;
  } catch (err) {
    console.error("[google-lead] Falha ao enviar ao Vista:", err);
    return false;
  }
}

export async function POST(req: NextRequest) {
  let body: Record<string, unknown>;
  try {
    body = (await req.json()) as Record<string, unknown>;
  } catch {
    return NextResponse.json({ ok: false, error: "invalid_json" }, { status: 400 });
  }

  /* Validação: o Google reenvia, no campo google_key, a chave que você
     configurou no formulário. Sem bater, recusa. */
  const expected = process.env.GOOGLE_LEAD_KEY;
  const got = (body.google_key ?? body.key) as string | undefined;
  if (!expected || got !== expected) {
    return NextResponse.json({ ok: false, error: "unauthorized" }, { status: 401 });
  }

  const cols = (Array.isArray(body.user_column_data) ? body.user_column_data : []) as Col[];
  const nome = pick(cols, "FULL_NAME", "FIRST_NAME") || "Lead Google";
  const tel = pick(cols, "PHONE_NUMBER");
  const email = pick(cols, "EMAIL", "USER_EMAIL");

  /* Lead de teste enviado pelo painel do Google: responde 200 e não grava. */
  if (body.is_test === true) {
    return NextResponse.json({ ok: true, test: true });
  }
  if (!tel && !email) {
    return NextResponse.json({ ok: false, error: "missing_contact" }, { status: 400 });
  }

  const ok = await enviarLeadAoVista({
    nome,
    fone: tel,
    ...(email ? { email } : {}),
    veiculo: "Google Lead Form - Etna",
    Interesse: "Venda",
    mensagem: "Lead do formulário nativo do Google (Etna by SPL).",
  });

  /* O Google espera HTTP 200 para considerar entregue. */
  return NextResponse.json({ ok });
}
