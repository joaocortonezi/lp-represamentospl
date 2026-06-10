"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ReactNode } from "react";

/* Entrada sutil (nunca esconde conteúdo): apenas translateY 15px → 0,
   SEM opacity 0 inicial. Decisão de projeto: usuário de mídia paga
   não espera reveal. Stagger 55ms entre irmãos, máx 6. */

interface RevealProps {
  children: ReactNode;
  index?: number;
  className?: string;
  as?: "div" | "section" | "figure" | "li" | "span";
}

export function Reveal({ children, index = 0, className, as = "div" }: RevealProps) {
  const reduced = useReducedMotion();
  const Tag = motion[as] as typeof motion.div;

  if (reduced) {
    const Plain = as;
    return <Plain className={className}>{children}</Plain>;
  }

  return (
    <Tag
      className={className}
      initial={{ y: 15 }}
      whileInView={{ y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{
        duration: 0.5,
        delay: Math.min(index, 6) * 0.055,
        ease: [0.2, 0.7, 0.2, 1],
      }}
    >
      {children}
    </Tag>
  );
}
