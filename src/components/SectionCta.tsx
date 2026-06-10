"use client";

import { Crown } from "lucide-react";
import { useVipModal } from "./VipModalContext";

interface SectionCtaProps {
  label: string;
  /* Identifica onde a pessoa converteu; vai pro Vista no campo veiculo. */
  source: string;
  /* Em seções de fundo navy o botão primário some; usa o branco do header. */
  light?: boolean;
  /* "center" (padrão) ou "start" para alinhar à esquerda em layouts de coluna. */
  align?: "center" | "start";
}

export function SectionCta({ label, source, light = false, align = "center" }: SectionCtaProps) {
  const open = useVipModal();
  return (
    <div className={"seccta " + (align === "start" ? "seccta--start" : "")}>
      <button
        className={"btn btn--lg " + (light ? "btn--light" : "btn--primary")}
        onClick={() => open(source)}
      >
        <Crown strokeWidth={1.9} /> {label}
      </button>
    </div>
  );
}
