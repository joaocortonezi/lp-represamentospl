import type { CSSProperties } from "react";

/* Wordmark do Etna by SPL. Usa currentColor, então herda a cor do contexto
   (branco no header/footer escuros, tinta nos fundos claros). Sem imagem,
   nítido em qualquer resolução. */
export function EtnaLogo({
  className = "",
  size = 30,
  style,
}: {
  className?: string;
  size?: number;
  style?: CSSProperties;
}) {
  return (
    <span
      className={className}
      aria-label="Etna by SPL"
      style={{
        display: "inline-flex",
        flexDirection: "column",
        lineHeight: 1,
        color: "currentColor",
        ...style,
      }}
    >
      <span
        style={{
          fontFamily: "var(--display)",
          fontWeight: 800,
          fontSize: size,
          letterSpacing: size * 0.18,
          textIndent: size * 0.18,
        }}
      >
        ETNA
      </span>
      <span
        style={{
          fontFamily: "var(--sans)",
          fontWeight: 600,
          fontSize: size * 0.3,
          letterSpacing: size * 0.14,
          textIndent: size * 0.14,
          textTransform: "uppercase",
          opacity: 0.85,
          marginTop: size * 0.12,
        }}
      >
        by SPL
      </span>
    </span>
  );
}
