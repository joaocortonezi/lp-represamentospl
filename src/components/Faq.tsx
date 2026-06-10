"use client";

import { Plus } from "lucide-react";
import { Reveal } from "./Reveal";
import { SectionCta } from "./SectionCta";

const FAQS = [
  {
    q: "Quando é o lançamento oficial?",
    a: "O lançamento privado para a Lista VIP está previsto para julho de 2026, e o lançamento público para setembro de 2026. Quem está na lista compra antes e com a tabela de desconto.",
  },
  {
    q: "Quais são as plantas e tipologias?",
    a: "As plantas e tipologias estão sendo finalizadas com a construtora parceira e serão reveladas primeiro para a Lista VIP, antes do lançamento público. Entrar na lista é a forma de conhecê-las em primeira mão.",
  },
  {
    q: "Quanto custa para entrar na lista?",
    a: "Nada. Entrar na Lista VIP é gratuito e não gera nenhuma obrigação. Você só formaliza algo se decidir reservar uma unidade, e mesmo a reserva é por um valor baixo e reembolsável.",
  },
  {
    q: "Sou obrigado a comprar?",
    a: "Não. A lista garante prioridade e condições, mas a decisão de compra é totalmente sua. Você pode sair a qualquer momento.",
  },
  {
    q: "Como recebo as condições e o desconto?",
    a: "Após entrar na lista, um consultor sênior da Tozi entra em contato pelo WhatsApp com a tabela de pré-lançamento com desconto e as condições de pagamento completas.",
  },
  {
    q: "Onde fica exatamente o empreendimento?",
    a: "Dentro do Aquarela das Artes, no vetor norte de Sinop, com acesso pela Av. das Sibipirunas e próximo ao Shopping Sinop, Hospital Regional e universidades. O endereço exato é reservado e liberado apenas para a Lista VIP.",
  },
];

export function Faq() {
  return (
    <section className="section section--tight" id="faq">
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
          source="LP Represamento - Secção FAQ"
        />
      </div>
    </section>
  );
}
