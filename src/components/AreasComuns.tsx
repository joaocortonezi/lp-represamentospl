"use client";

import Image from "next/image";
import { Reveal } from "./Reveal";
import { SectionCta } from "./SectionCta";

const AMENS = [
  { id: "piscina", n: "Complexo aquático com raia de 25m", src: "/assets/web/piscina.jpg", cls: "amen--lg" },
  { id: "bosque", n: "Casa de campo e área verde", src: "/assets/web/bosque.jpg", cls: "amen--w" },
  { id: "academia", n: "Academia climatizada", src: "/assets/web/academia.jpg", cls: "" },
  { id: "lounge", n: "Rooftop Wine com adega", src: "/assets/web/winebar.jpg", cls: "" },
  { id: "gourmet", n: "Rooftop Gourmet", src: "/assets/web/gourmet.jpg", cls: "" },
  { id: "festas", n: "Salão de festas", src: "/assets/web/festas.jpg", cls: "" },
  { id: "spa", n: "Espaço Wellness com sauna", src: "/assets/web/spa.jpg", cls: "amen--w" },
  { id: "kids", n: "Brinquedoteca", src: "/assets/web/kids.jpg", cls: "amen--w" },
  { id: "rooftop", n: "Piscina no rooftop", src: "/assets/web/rooftop.jpg", cls: "amen--w" },
];

export function AreasComuns() {
  return (
    <section className="section section--tight sec--mist" id="areas">
      <div className="wrap">
        <Reveal className="sechead">
          <span className="eyebrow">Áreas comuns</span>
          <h2 className="h-sec">Mais de 3 mil m² de lazer e bem-estar</h2>
          <p className="lead">
            Do complexo aquático ao rooftop, o Etna by SPL reúne ambientes
            wellness e de convivência pensados para a família e para o dia a dia.
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
          source="LP Etna - Secção Áreas Comuns"
        />
      </div>
    </section>
  );
}
