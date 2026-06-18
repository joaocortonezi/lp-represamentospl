/* Google tag — Google Ads (conversões) + GA4 opcional.
   Carrega APENAS se NEXT_PUBLIC_GADS_ID (AW-...) ou NEXT_PUBLIC_GA4_ID (G-...)
   estiver definido — sem isso, tudo vira no-op. Cole os IDs nas envs da Vercel.
   Eventos: PageView (config automático) · Conversão de Lead (envio do form). */

const GADS_ID = process.env.NEXT_PUBLIC_GADS_ID; // ex.: AW-123456789
const GADS_LEAD_LABEL = process.env.NEXT_PUBLIC_GADS_LEAD_LABEL; // rótulo da conversão "Lead"
const GA4_ID = process.env.NEXT_PUBLIC_GA4_ID; // ex.: G-XXXXXXX (opcional)

type GtagFn = (...args: unknown[]) => void;

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: GtagFn;
  }
}

export function initGtag(): void {
  const primary = GADS_ID || GA4_ID;
  if (!primary || typeof window === "undefined" || window.gtag) return;

  const s = document.createElement("script");
  s.async = true;
  s.src = `https://www.googletagmanager.com/gtag/js?id=${primary}`;
  document.head.appendChild(s);

  window.dataLayer = window.dataLayer || [];
  /* IMPORTANTE: o gtag precisa empurrar o objeto `arguments` (não um array),
     senão o Google não reconhece os comandos js/config/event e os hits ficam
     "adiados" (deferred hits). */
  const gtag: GtagFn = function () {
    // eslint-disable-next-line prefer-rest-params
    window.dataLayer!.push(arguments);
  };
  window.gtag = gtag;
  gtag("js", new Date());
  if (GADS_ID) gtag("config", GADS_ID);
  if (GA4_ID) gtag("config", GA4_ID);
}

/* Conversão de Lead: registra no Google Ads (send_to ID/rótulo) e, se houver
   GA4, dispara também o evento padrão generate_lead. */
export function gtagLead(): void {
  if (typeof window === "undefined" || !window.gtag) return;
  if (GADS_ID && GADS_LEAD_LABEL) {
    window.gtag("event", "conversion", { send_to: `${GADS_ID}/${GADS_LEAD_LABEL}` });
  }
  if (GA4_ID) {
    window.gtag("event", "generate_lead");
  }
}
