"use client";

import { Plus } from "lucide-react";
import { Reveal } from "./Reveal";
import { SectionCta } from "./SectionCta";

const FAQS = [
  {
    q: "O que é a Lista VIP do Etna by SPL?",
    a: "É o acesso antecipado ao pré-lançamento do Etna. Quem entra tem prioridade de escolha das unidades, convite ao coquetel de investidores e um consultor dedicado, tudo antes da abertura pública.",
  },
  {
    q: "Entrar na Lista VIP é gratuito?",
    a: "Sim. Entrar na Lista VIP é gratuito e não gera nenhuma obrigação. Você só formaliza algo se decidir reservar uma unidade mais adiante.",
  },
  {
    q: "Sou obrigado a comprar?",
    a: "Não. A lista garante prioridade e acesso antecipado, mas a decisão de compra é totalmente sua. Você pode sair quando quiser.",
  },
  {
    q: "Quando saem os valores e as plantas?",
    a: "Os valores, plantas e tipologias estão sendo finalizados com a SPL e serão revelados primeiro para a Lista VIP. O coquetel de investidores acontece em 02 de julho de 2026. Entrar na lista é a forma de conhecer tudo em primeira mão.",
  },
  {
    q: "Quem é a construtora SPL?",
    a: "A SPL é a construtora do Etna, com 44 anos de história, mais de 1 milhão de m² lançados e mais de 9.500 unidades entregues. Em Sinop, assina empreendimentos como Acqua, Ares e Gaia by SPL. A Tozi é a parceira oficial de vendas.",
  },
  {
    q: "Onde fica o Etna by SPL?",
    a: "Na região do Aquarela das Artes, em Sinop, a menos de 5 minutos da orla, de universidades como Unemat e Fasipe, de colégios, OAB, Fórum e do aeroporto. São 384 unidades em 3 torres, com mais de 3 mil m² de lazer. O endereço exato é liberado primeiro para a Lista VIP.",
  },
];

export function Faq() {
  return (
    <section className="section section--tight sec--gold" id="faq">
      <div className="wrap">
        <Reveal className="sechead sechead--center">
          <span className="eyebrow">Dúvidas frequentes</span>
          <h2 className="h-sec">Tudo claro antes do WhatsApp</h2>
        </Reveal>
        <div className="faq">
          {FAQS.map((f, i) => (
            <Reveal key={f.q} index={i}>
              <details className="fitem">
                <summary>
                  {f.q}
                  <span className="pl">
                    <Plus strokeWidth={2.2} />
                  </span>
                </summary>
                <div className="ans">{f.a}</div>
              </details>
            </Reveal>
          ))}
        </div>
        <SectionCta
          label="Tudo claro, quero entrar na lista"
          source="LP Etna - Secção FAQ"
        />
      </div>
    </section>
  );
}
