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
    t: "Prioridade na escolha",
    d: "A lista escolhe unidade, torre, andar e posição antes da abertura ao mercado geral.",
    tag: "1º na fila",
  },
  {
    Icon: Layers,
    t: "Acesso antecipado",
    d: "Plantas, tabela e condições do Etna by SPL chegam primeiro para a Lista VIP, antes do mercado.",
    tag: "Antes do mercado",
  },
  {
    Icon: Percent,
    t: "Plantas e condições em 1ª mão",
    d: "Você conhece tipologias de 1 a 3 suítes, gardens e as condições oficiais com exclusividade.",
    tag: "Primeira mão",
  },
  {
    Icon: Handshake,
    t: "Consultor dedicado",
    d: "Atendimento consultivo e direto com um especialista da Tozi, sem fila e sem call center.",
    tag: "Atendimento direto",
  },
  {
    Icon: Building2,
    t: "Convite ao coquetel",
    d: "Vaga no coquetel de investidores da SPL em 02/07, com apresentação completa do empreendimento.",
    tag: "Coquetel 02/07",
  },
  {
    Icon: Wallet,
    t: "Gratuito e sem compromisso",
    d: "Entrar na lista não custa nada e não obriga a comprar. Você decide só depois de conhecer tudo.",
    tag: "Sem compromisso",
  },
];

export function VipSection() {
  return (
    <section className="vip section" id="vip">
      <div className="wrap vip__in">
        <Reveal className="vip__head">
          <span className="eyebrow eyebrow--light">O pré-lançamento</span>
          <h2 className="h-sec">O que a Lista VIP garante a você</h2>
          <p className="lead">
            Antes do lançamento oficial, a Tozi abre um grupo prioritário do
            Etna by SPL. Quem entra agora tem acesso antecipado, escolhe
            primeiro e acompanha tudo de perto. É vantagem concreta, não
            promessa.
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
          source="LP Etna - Secção Lista VIP"
          light
        />
      </div>
    </section>
  );
}
