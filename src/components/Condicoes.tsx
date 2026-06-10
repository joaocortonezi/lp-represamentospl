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
    t: "Tabela com desconto",
    d: "Tabela de pré-lançamento reservada à Lista VIP, abaixo do preço público de setembro.",
    hero: true,
  },
  {
    Icon: Wallet,
    t: "Entrada facilitada",
    d: "Entrada parcelada que cabe no seu planejamento, sem aperto no início.",
  },
  {
    Icon: Calendar,
    t: "Parcelamento estendido",
    d: "Saldo diluído ao longo de toda a obra, com mais fôlego no fluxo de caixa.",
  },
  {
    Icon: Building2,
    t: "Sem juros na obra",
    d: "Durante a construção você paga apenas a correção do INCC. Zero juros.",
  },
  {
    Icon: Tag,
    t: "Reserva por valor baixo",
    d: "Garanta a unidade com um valor de reserva baixo e reembolsável.",
  },
];

export function Condicoes() {
  return (
    <section className="section sec--mist" id="condicoes">
      <div className="wrap">
        <Reveal className="sechead">
          <span className="eyebrow">Condições de pré-lançamento</span>
          <h2 className="h-sec">Comprar agora pesa menos no bolso</h2>
          <p className="lead">
            Estas foram as condições praticadas no último lançamento e servem
            como referência do que a Lista VIP costuma receber. As condições
            oficiais deste lançamento serão divulgadas primeiro para a lista.
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
            Referência baseada no último lançamento. Não garantimos as mesmas
            condições para este lançamento. E lembre: entrar na Lista VIP não é
            compromisso de compra. Você conhece a tabela, as plantas e as
            condições primeiro, e só compra se quiser.
          </p>
        </Reveal>
        <SectionCta
          label="Conhecer as condições primeiro"
          source="LP Represamento - Secção Condições"
        />
      </div>
    </section>
  );
}
