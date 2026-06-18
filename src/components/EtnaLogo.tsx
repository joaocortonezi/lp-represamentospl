import type { CSSProperties } from "react";

/* Logo oficial do Etna by SPL.
   variant "branco" (fundos escuros, padrão) | "dourado" (fundos claros).
   A altura é sempre controlada por `size` (sobrescreve qualquer height vindo de style). */
export function EtnaLogo({
  className = "",
  size = 32,
  variant = "branco",
  style,
}: {
  className?: string;
  size?: number;
  variant?: "branco" | "dourado";
  style?: CSSProperties;
}) {
  const src = variant === "dourado" ? "/etna-logo.png" : "/etna-logo-branco.png";
  return (
    <img
      src={src}
      alt="Etna by SPL"
      className={className}
      style={{ width: "auto", display: "block", ...style, height: size }}
    />
  );
}
