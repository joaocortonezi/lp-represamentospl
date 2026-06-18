"use client";

import Image from "next/image";
import {
  Flame,
  Snowflake,
  Waves,
  Dumbbell,
  Droplets,
  Leaf,
  LucideIcon,
} from "lucide-react";
import { Reveal } from "./Reveal";
import { SectionCta } from "./SectionCta";

const ITENS: { Icon: LucideIcon; t: string; d: string }[] = [
  {
    Icon: Flame,
    t: "Sauna",
    d: "Calor seco para relaxar a musculatura e fechar o dia com tranquilidade.",
  },
  {
    Icon: Snowflake,
    t: "Banheira de gelo",
    d: "Crioterapia para recuperação, foco e mais energia na rotina.",
  },
  {
    Icon: Waves,
    t: "Hidromassagem",
    d: "Um momento de descompressão sem precisar sair de casa.",
  },
  {
    Icon: Dumbbell,
    t: "Academia climatizada",
    d: "Equipada e com simulador de escada, confortável o ano inteiro.",
  },
  {
    Icon: Droplets,
    t: "Piscina com raia de 25m climatizada",
    d: "Para treinar e nadar com conforto em qualquer estação.",
  },
  {
    Icon: Leaf,
    t: "Praça de bem-estar",
    d: "Área ao ar livre para meditar, respirar e desacelerar a rotina.",
  },
];

export function Wellness() {
  return (
    <section className="section" id="wellness">
      <div className="wrap">
        <div className="sinop__grid">
          <div>
            <Reveal className="sechead">
              <span className="eyebrow">Wellness</span>
              <h2 className="h-sec">
                Um espaço inteiro dedicado ao seu bem-estar
              </h2>
              <p className="lead">
                No Etna by SPL, autocuidado faz parte do dia a dia. Um espaço
                wellness completo, pensado para você cuidar do corpo e da mente
                sem sair de casa.
              </p>
            </Reveal>
          </div>
          <Reveal as="figure" className="sinop__single" index={1}>
            <Image
              src="/assets/web/spa.jpg"
              alt="Espaço wellness do Etna by SPL, com sauna e área de relaxamento"
              fill
              sizes="(min-width: 920px) 50vw, 100vw"
              style={{ objectFit: "cover" }}
            />
            <figcaption className="cap">Espaço Wellness · Etna by SPL</figcaption>
          </Reveal>
        </div>
        <div className="cond">
          {ITENS.map((c, i) => (
            <Reveal className="condcard" key={c.t} index={i}>
              <div className="ic">
                <c.Icon strokeWidth={1.9} />
              </div>
              <h4>{c.t}</h4>
              <p>{c.d}</p>
            </Reveal>
          ))}
        </div>
        <SectionCta
          label="Quero viver esse bem-estar"
          source="LP Etna - Secção Wellness"
        />
      </div>
    </section>
  );
}
