"use client";

import { createContext, useContext } from "react";

/* Abre o modal da Lista VIP de qualquer seção, sem prop drilling.
   O argumento identifica onde a pessoa converteu (vai no campo
   "veiculo" do Vista CRM), ex: "LP Etna - Secção Sobre a Tozi". */
export const VipModalContext = createContext<(source?: string) => void>(() => {});

export function useVipModal() {
  return useContext(VipModalContext);
}
