"use client";

import Image from "next/image";
import { Reveal } from "./Reveal";
import { SectionCta } from "./SectionCta";

const AMENS = [
  { id: "piscina", n: "Piscina", src: "/assets/web/piscina.jpg", cls: "amen--lg" },
  { id: "bosque", n: "Bosque & Redário", src: "/assets/web/bosque.jpg", cls: "amen--w" },
  { id: "academia", n: "Academia", src: "/assets/web/academia.jpg", cls: "" },
  { id: "lounge", n: "Wine Bar", src: "/assets/web/winebar.jpg", cls: "" },
  { id: "gourmet", n: "Espaço gourmet", src: "/assets/web/gourmet.jpg", cls: "" },
  { id: "festas", n: "Salão de festas", src: "/assets/web/festas.jpg", cls: "" },
  { id: "playground", n: "Playground", src: "/assets/web/playground.jpg", cls: "amen--w" },
  { id: "kids", n: "Espaço kids", src: "/assets/web/kids.jpg", cls: "amen--w" },
  { id: "rooftop", n: "Rooftop social", src: "/assets/web/rooftop.jpg", cls: "amen--w" },
];

export function AreasComuns() {
  return (
    <section className="section section--tight sec--mist" id="areas">
      <div className="wrap">
        <Reveal className="sechead">
          <span className="eyebrow">Áreas comuns</span>
          <h2 className="h-sec">Lazer completo para viver fora de casa</h2>
          <p className="lead">
            Da piscina ao rooftop social, ambientes de lazer e convivência
            projetados para a família e para o dia a dia.
          </p>
        </Reveal>
        <div className="bento">
          {AMENS.map((a, i) => (
            <Reveal className={"amen " + a.cls} key={a.id} index={i}>
              <Image
                src={a.src}
                alt={a.n}
                fill
                sizes="(min-width: 760px) 25vw, 50vw"
                style={{ objectFit: "cover" }}
              />
              <div className="amen__lbl">
                <b>{a.n}</b>
              </div>
            </Reveal>
          ))}
        </div>
        <SectionCta
          label="Quero ver tudo em primeira mão"
          source="LP Represamento - Secção Áreas Comuns"
        />
      </div>
    </section>
  );
}
