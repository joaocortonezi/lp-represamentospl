/* Meta Pixel (Facebook/Instagram Ads).
   Carrega APENAS se NEXT_PUBLIC_FB_PIXEL_ID estiver definido — em dev, sem o
   ID, tudo vira no-op e nada é rastreado. Cole o Pixel ID no .env.local.
   Eventos: PageView (init) · Lead (envio do formulário) · Contact (WhatsApp). */

const PIXEL_ID = process.env.NEXT_PUBLIC_FB_PIXEL_ID;

type Fbq = ((...args: unknown[]) => void) & {
  callMethod?: (...args: unknown[]) => void;
  queue?: unknown[];
  loaded?: boolean;
  version?: string;
};

declare global {
  interface Window {
    fbq?: Fbq;
    _fbq?: Fbq;
  }
}

export function initPixel(): void {
  if (!PIXEL_ID || typeof window === "undefined" || window.fbq) return;

  /* snippet oficial do Meta Pixel, em TS */
  const fbq: Fbq = function (...args: unknown[]) {
    if (fbq.callMethod) fbq.callMethod(...args);
    else fbq.queue!.push(args);
  };
  fbq.queue = [];
  fbq.loaded = true;
  fbq.version = "2.0";
  window.fbq = fbq;
  window._fbq = window._fbq || fbq;

  const s = document.createElement("script");
  s.async = true;
  s.src = "https://connect.facebook.net/en_US/fbevents.js";
  document.head.appendChild(s);

  window.fbq("init", PIXEL_ID);
  window.fbq("track", "PageView");
}

export function track(
  event: string,
  params?: Record<string, unknown>,
  eventID?: string
): void {
  if (typeof window === "undefined" || !window.fbq) return;
  if (eventID) window.fbq("track", event, params, { eventID });
  else window.fbq("track", event, params);
}

/* ID único do evento, compartilhado entre o Pixel (browser) e a CAPI (server)
   para o Meta deduplicar a mesma conversão contada nos dois caminhos. */
export function newEventId(): string {
  try {
    if (typeof crypto !== "undefined" && crypto.randomUUID) return crypto.randomUUID();
  } catch {
    /* fallback abaixo */
  }
  return `${Date.now()}-${Math.random().toString(16).slice(2)}`;
}

/* Lê um cookie no browser (usado para _fbp e _fbc, que melhoram o match da CAPI). */
export function getCookie(name: string): string {
  if (typeof document === "undefined") return "";
  const m = document.cookie.match(new RegExp("(?:^|; )" + name + "=([^;]*)"));
  return m ? decodeURIComponent(m[1]) : "";
}
