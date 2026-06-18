"use client";

import { Reveal } from "./Reveal";
import { SectionCta } from "./SectionCta";

const STEPS = [
  {
    when: "Agora · Jun/2026",
    t: "Lista VIP (pré-lançamento)",
    d: "Captação da Lista VIP. Você está aqui: é agora que se garante acesso antecipado às condições e prioridade na escolha da unidade.",
    now: true,
    badge: "Você está aqui",
  },
  {
    when: "02/07/2026",
    t: "Coquetel de investidores",
    d: "Evento exclusivo de apresentação do Etna by SPL para a Lista VIP, com prioridade de reserva antes de todo mundo.",
  },
  {
    when: "03/07/2026",
    t: "Abertura ao público",
    d: "Lançamento aberto ao mercado geral, depois da prioridade reservada à Lista VIP.",
  },
  {
    when: "A partir de 2026",
    t: "Obra",
    d: "Construção das três torres do empreendimento.",
  },
  {
    when: "Entrega",
    t: "Entrega das chaves",
    d: "Conclusão e entrega do Etna by SPL aos proprietários.",
  },
];

export function Cronograma() {
  return (
    <section className="section" id="cronograma">
      <div className="wrap">
        <Reveal className="sechead">
          <span className="eyebrow">Cronograma</span>
          <h2 className="h-sec">O momento da Lista VIP é agora</h2>
          <p className="lead">
            Estamos na fase de pré-lançamento do Etna by SPL. Quem entra na Lista
            VIP acompanha cada etapa de perto, do coquetel de investidores à
            escolha das unidades.
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
          label="Entrar na Lista VIP agora"
          source="LP Etna - Secção Cronograma"
        />
      </div>
    </section>
  );
}
