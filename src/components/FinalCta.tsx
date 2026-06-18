"use client";

import { Check } from "lucide-react";
import { LeadForm } from "./LeadForm";
import { Reveal } from "./Reveal";

const CHECKS = [
  "Prioridade na escolha da unidade",
  "Acesso antecipado a plantas, tabela e condições",
  "Convite ao coquetel de investidores em 02/07",
  "Consultor dedicado, sem compromisso",
];

export function FinalCta() {
  return (
    <section className="final section sec--mist" id="lista">
      <div className="wrap final__in">
        <Reveal>
          <span className="eyebrow">Última chamada</span>
          <h2>Entre na Lista VIP do Etna by SPL</h2>
          <p>
            Deixe seu nome e WhatsApp. Em instantes um consultor sênior fala com
            você, com o acesso antecipado a plantas e condições, a prioridade na
            escolha da unidade e o convite ao coquetel de investidores. Sem
            custo, sem compromisso.
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
            sub="384 unidades. A lista escolhe primeiro."
            cta="Entrar na Lista VIP agora"
            source="LP Etna - CTA Final"
          />
        </Reveal>
      </div>
    </section>
  );
}
