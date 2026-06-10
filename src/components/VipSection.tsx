"use client";

import {
  Crown,
  Percent,
  Layers,
  Handshake,
  Building2,
  Wallet,
  LucideIcon,
} from "lucide-react";
import { Reveal } from "./Reveal";
import { SectionCta } from "./SectionCta";

const BENEFITS: {
  Icon: LucideIcon;
  t: string;
  d: string;
  tag: string;
}[] = [
  {
    Icon: Crown,
    t: "Prioridade de escolha",
    d: "A lista escolhe unidade, andar e posição de sol antes de qualquer comprador do mercado geral.",
    tag: "1º na fila",
  },
  {
    Icon: Percent,
    t: "Tabela com desconto",
    d: "Preço de pré-lançamento reservado à lista, abaixo da tabela pública que entra em set/2026.",
    tag: "Abaixo do público",
  },
  {
    Icon: Layers,
    t: "Plantas e tipologias em 1ª mão",
    d: "As plantas e tipologias serão reveladas primeiro para a lista, antes de chegarem ao mercado.",
    tag: "Antes do mercado",
  },
  {
    Icon: Handshake,
    t: "Consultor sênior dedicado",
    d: "Atendimento consultivo e direto com um especialista da Tozi, sem fila e sem call center.",
    tag: "Atendimento direto",
  },
  {
    Icon: Building2,
    t: "Sem juros na obra",
    d: "Parcelas durante a obra sem juros: apenas a correção do INCC, como manda o setor.",
    tag: "Só correção INCC",
  },
  {
    Icon: Wallet,
    t: "Reserva por valor baixo",
    d: "Garanta sua unidade com um valor de reserva baixo e totalmente reembolsável se desistir.",
    tag: "Reembolsável",
  },
];

export function VipSection() {
  return (
    <section className="vip section" id="vip">
      <div className="wrap vip__in">
        <Reveal className="vip__head">
          <span className="eyebrow eyebrow--light">O represamento</span>
          <h2 className="h-sec">O que a Lista VIP garante a você</h2>
          <p className="lead">
            Antes do lançamento oficial, a Tozi abre um grupo prioritário. Quem
            entra agora compra primeiro, mais barato e com as melhores unidades
            ainda disponíveis. É vantagem concreta, não promessa.
          </p>
        </Reveal>
        <div className="vip__grid">
          {BENEFITS.map((b, i) => (
            <Reveal className="benefit" key={b.t} index={i}>
              <div className="ic">
                <b.Icon strokeWidth={1.9} />
              </div>
              <h4>{b.t}</h4>
              <p>{b.d}</p>
              <span className="tag">{b.tag}</span>
            </Reveal>
          ))}
        </div>
        <SectionCta
          label="Garantir minha prioridade"
          source="LP Represamento - Secção Lista VIP"
          light
        />
      </div>
    </section>
  );
}
