import { initBotId } from "botid/client/core";

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
