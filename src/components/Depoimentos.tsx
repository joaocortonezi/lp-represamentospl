"use client";

import { Star } from "lucide-react";
import { Reveal } from "./Reveal";
import { SectionCta } from "./SectionCta";

const QUOTES = [
  {
    q: "Comprei na planta com a Tozi e na entrega o apartamento já valia bem mais. Eles acompanharam tudo, do contrato às chaves.",
    n: "Marcos A.",
    r: "Comprou na planta com a Tozi",
    av: "M",
  },
  {
    q: "Atendimento direto, sem enrolação. Explicaram cada etapa do contrato e acompanharam a gente até a entrega.",
    n: "Juliana e Rafael",
    r: "Compraram o primeiro apartamento com a Tozi",
    av: "J",
  },
  {
    q: "É o segundo apartamento que compro com eles. Confio na indicação e no acompanhamento. Nunca tive dor de cabeça.",
    n: "Cláudia M.",
    r: "Cliente recorrente · Sinop",
    av: "C",
  },
  {
    q: "Sou investidor e o que me convence é histórico. A valorização dos lançamentos que comprei em Sinop fala por si.",
    n: "Eduardo P.",
    r: "Investidor · Sinop",
    av: "E",
  },
];

export function Depoimentos() {
  return (
    <section className="section sec--mist" id="depoimentos">
      <div className="wrap">
        <Reveal className="sechead">
          <span className="eyebrow">Quem já comprou com a Tozi</span>
          <h2 className="h-sec">Histórico que sustenta a decisão</h2>
        </Reveal>
        <div className="quotes">
          {QUOTES.map((q, i) => (
            <Reveal as="figure" className="quote" key={q.n} index={i}>
              <div className="stars">
                {[0, 1, 2, 3, 4].map((s) => (
                  <Star key={s} strokeWidth={0} fill="currentColor" />
                ))}
              </div>
              <blockquote>“{q.q}”</blockquote>
              <figcaption className="who">
                <div className="av">{q.av}</div>
                <div>
                  <b>{q.n}</b>
                  <span>{q.r}</span>
                </div>
              </figcaption>
            </Reveal>
          ))}
        </div>
        <SectionCta
          label="Comprar com quem entende de Sinop"
          source="LP Etna - Secção Depoimentos"
        />
      </div>
    </section>
  );
}
