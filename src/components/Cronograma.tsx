"use client";

import { Reveal } from "./Reveal";
import { SectionCta } from "./SectionCta";

const STEPS = [
  {
    when: "Mai/2026",
    t: "Represamento",
    d: "Captação da Lista VIP: você está aqui. É agora que se garante prioridade e o menor preço.",
    now: true,
    badge: "Agora",
  },
  {
    when: "Jul/2026",
    t: "Lançamento privado",
    d: "A lista escolhe unidades em primeira mão, com a tabela de pré-lançamento da lista.",
  },
  {
    when: "Set/2026",
    t: "Lançamento público",
    d: "Abertura ao mercado geral com a nova tabela, sem o desconto da lista.",
  },
  {
    when: "Out/2026",
    t: "Início da obra",
    d: "Começo da construção das duas torres residenciais.",
  },
  {
    when: "Out/2030",
    t: "Entrega das chaves",
    d: "Conclusão e entrega do empreendimento aos proprietários.",
  },
];

export function Cronograma() {
  return (
    <section className="section" id="cronograma">
      <div className="wrap">
        <Reveal className="sechead">
          <span className="eyebrow">Cronograma</span>
          <h2 className="h-sec">A janela da Lista VIP é agora</h2>
          <p className="lead">
            Cada etapa adiada significa preço maior e menos unidades. Quem entra
            na fase de represamento aproveita o melhor momento.
          </p>
        </Reveal>
        <Reveal className="timeline" index={1}>
          <div className="tl">
            {STEPS.map((s) => (
              <div className={"tlstep " + (s.now ? "is-now" : "")} key={s.when}>
                <span className="node"></span>
                <div className="when">{s.when}</div>
                <b>{s.t}</b>
                <p>{s.d}</p>
                {s.badge && <span className="badge">{s.badge}</span>}
              </div>
            ))}
          </div>
        </Reveal>
        <SectionCta
          label="Aproveitar a janela de agora"
          source="LP Represamento - Secção Cronograma"
        />
      </div>
    </section>
  );
}
