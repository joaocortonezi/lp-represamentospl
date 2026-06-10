"use client";

import Image from "next/image";
import { Reveal } from "./Reveal";
import { SectionCta } from "./SectionCta";

export function SobreSinop() {
  return (
    <section className="section" id="sinop">
      <div className="wrap">
        <div className="sinop__grid">
          <div>
            <Reveal className="sechead">
              <span className="eyebrow">Por que Sinop</span>
              <h2 className="h-sec">
                A cidade que mais cresce no norte de Mato Grosso
              </h2>
              <p className="lead">
                Fundada em 1974 a partir de uma colonização planejada, Sinop é
                hoje o principal polo urbano do norte de MT, referência em
                comércio, saúde e educação para dezenas de municípios ao redor.
                Movida pelo agronegócio, é uma das cidades que mais crescem no
                Centro-Oeste. Aqui, comprar antes de virar público já é
                estratégia conhecida.
              </p>
            </Reveal>
            <SectionCta
              label="Quero investir em Sinop"
              source="LP Represamento - Secção Por que Sinop"
              align="start"
            />
          </div>
          <Reveal as="figure" className="sinop__single" index={1}>
            <Image
              src="/assets/web/sinop.jpg"
              alt="Vista aérea de Sinop, Mato Grosso, com a Catedral do Sagrado Coração de Jesus"
              fill
              sizes="(min-width: 920px) 50vw, 100vw"
              style={{ objectFit: "cover" }}
            />
            <figcaption className="cap">Sinop · Mato Grosso</figcaption>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
