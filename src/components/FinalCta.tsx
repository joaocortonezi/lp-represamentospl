"use client";

import { Check } from "lucide-react";
import { LeadForm } from "./LeadForm";
import { Reveal } from "./Reveal";

const CHECKS = [
  "Prioridade de escolha de unidade",
  "Tabela com desconto de pré-lançamento",
  "Sem juros na obra (só INCC)",
  "Reserva baixa e reembolsável",
];

export function FinalCta() {
  return (
    <section className="final section" id="lista">
      <div className="wrap final__in">
        <Reveal>
          <span className="eyebrow eyebrow--light">Última chamada</span>
          <h2>Entre na Lista VIP do novo lançamento</h2>
          <p>
            Deixe seu nome e WhatsApp. Em instantes um consultor sênior fala com
            você, com a tabela com desconto, a prioridade de escolha e o
            primeiro acesso às plantas. Sem custo, sem compromisso.
          </p>
          <ul className="final__list">
            {CHECKS.map((c) => (
              <li key={c}>
                <Check strokeWidth={2.2} /> {c}
              </li>
            ))}
          </ul>
        </Reveal>
        <Reveal index={1}>
          <LeadForm
            heading="Garanta sua prioridade"
            sub="112 unidades. A lista escolhe primeiro."
            cta="Entrar na Lista VIP agora"
            source="LP Represamento - CTA Final"
          />
        </Reveal>
      </div>
    </section>
  );
}
