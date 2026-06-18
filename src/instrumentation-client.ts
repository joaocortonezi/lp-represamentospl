import { initBotId } from "botid/client/core";
import { initPixel, track } from "./lib/pixel";

/* BotID (anti-bot da Vercel): anexa headers de classificação às requisições
   destas rotas. O route handler valida com checkBotId(). Em dev local o
   checkBotId sempre retorna isBot: false. */
initBotId({
  protect: [
    {
      path: "/api/lead",
      method: "POST",
    },
  ],
});

/* Meta Pixel: PageView na carga + Contact em qualquer clique de WhatsApp.
   Envolto em try/catch — rastreamento nunca pode derrubar a página. */
try {
  initPixel();
  document.addEventListener(
    "click",
    (e) => {
      const el = e.target as HTMLElement | null;
      if (el?.closest?.("a[href*='wa.me'], a[href*='api.whatsapp.com']")) {
        track("Contact");
      }
    },
    { capture: true }
  );
} catch {
  /* no-op */
}
