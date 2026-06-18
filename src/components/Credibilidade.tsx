"use client";

import Image from "next/image";
import { Reveal } from "./Reveal";
import { SectionCta } from "./SectionCta";

const STATS = [
  { b: "23", i: "+", s: "anos de mercado em Sinop" },
  { b: "15", i: "+", s: "lançamentos comercializados" },
  { b: "1.800", i: "+", s: "clientes atendidos" },
];

export function Credibilidade() {
  return (
    <section className="cred section" id="tozi">
      <div className="wrap cred__in">
        <Reveal>
          <span className="eyebrow">A imobiliária</span>
          <h2 className="h-sec">23 anos vendendo o melhor de Sinop</h2>
          <p className="lead">
            A Tozi Imóveis é uma imobiliária de Sinop. Há 23 anos conecta quem
            compra e quem investe aos melhores lançamentos da região, com
            assessoria especializada e atendimento consultivo do primeiro
            contato à entrega das chaves. No Etna by SPL, a Tozi é parceira
            oficial de vendas da SPL, construtora com 44 anos de história e mais
            de 9.500 unidades entregues.
          </p>
          <SectionCta
            label="Falar com um consultor da Tozi"
            source="LP Etna - Secção Sobre a Tozi"
            align="start"
          />
        </Reveal>
        <Reveal index={1}>
          <div className="cred__photo" style={{ position: "relative" }}>
            <Image
              src="/assets/web/tozi-fachada.jpg"
              alt="Sede da Tozi Imóveis em Sinop, Mato Grosso"
              fill
              sizes="(min-width: 920px) 55vw, 100vw"
              style={{ objectFit: "cover" }}
            />
          </div>
          <div className="cred__stats">
            {STATS.map((c) => (
              <div className="cstat" key={c.s}>
                <b className="tnum">
                  {c.b}
                  <i>{c.i}</i>
                </b>
                <span>{c.s}</span>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
