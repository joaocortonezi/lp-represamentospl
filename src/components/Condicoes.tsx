"use client";

import {
  Percent,
  Wallet,
  Calendar,
  Building2,
  Tag,
  LucideIcon,
} from "lucide-react";
import { Reveal } from "./Reveal";
import { SectionCta } from "./SectionCta";

const CONDS: { Icon: LucideIcon; t: string; d: string; hero?: boolean }[] = [
  {
    Icon: Percent,
    t: "Condição de pré-lançamento",
    d: "Em lançamentos anteriores, a Lista VIP costumou conhecer a tabela antes do mercado geral.",
    hero: true,
  },
  {
    Icon: Wallet,
    t: "Entrada facilitada",
    d: "Historicamente, a entrada foi parcelada para caber no planejamento, sem aperto no início.",
  },
  {
    Icon: Calendar,
    t: "Parcelamento estendido",
    d: "Em edições passadas, o saldo foi diluído ao longo da obra, com mais fôlego no fluxo de caixa.",
  },
  {
    Icon: Building2,
    t: "Condições durante a obra",
    d: "O setor costuma trabalhar parcelas ao longo da construção com correção pelo INCC.",
  },
  {
    Icon: Tag,
    t: "Reserva para garantir prioridade",
    d: "Nos lançamentos da Tozi, a reserva foi a forma de assegurar a prioridade na escolha.",
  },
];

export function Condicoes() {
  return (
    <section className="section sec--mist" id="condicoes">
      <div className="wrap">
        <Reveal className="sechead">
          <span className="eyebrow">Condições de pré-lançamento</span>
          <h2 className="h-sec">Como a Tozi costuma facilitar a compra</h2>
          <p className="lead">
            Estas foram as condições praticadas em lançamentos anteriores e
            servem apenas como referência do que a Lista VIP costuma receber. As
            condições oficiais do Etna by SPL serão divulgadas primeiro para a
            lista.
          </p>
        </Reveal>
        <div className="cond">
          {CONDS.map((c, i) => (
            <Reveal
              className={"condcard " + (c.hero ? "is-hero" : "")}
              key={c.t}
              index={i}
            >
              <div className="ic">
                <c.Icon strokeWidth={1.9} />
              </div>
              <h4>{c.t}</h4>
              <p>{c.d}</p>
            </Reveal>
          ))}
        </div>
        <Reveal index={5}>
          <p className="disc">
            Referência baseada em lançamentos anteriores. Não garantimos as
            mesmas condições para o Etna by SPL. E lembre: entrar na Lista VIP é
            gratuito e não é compromisso de compra. Você conhece a tabela, as
            plantas e as condições primeiro, e só compra se quiser.
          </p>
        </Reveal>
        <SectionCta
          label="Conhecer as condições primeiro"
          source="LP Etna - Secção Condições"
        />
      </div>
    </section>
  );
}
