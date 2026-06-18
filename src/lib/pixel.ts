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

export function track(event: string, params?: Record<string, unknown>): void {
  if (typeof window === "undefined" || !window.fbq) return;
  window.fbq("track", event, params);
}
