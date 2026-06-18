"use client";

import Image from "next/image";
import { Reveal } from "./Reveal";
import { SectionCta } from "./SectionCta";

export function Conceito() {
  return (
    <section className="section sec--gold" id="conceito">
      <div className="wrap">
        <div className="sinop__grid">
          <div>
            <Reveal className="sechead">
              <span className="eyebrow">O conceito</span>
              <h2 className="h-sec">
                Um estilo de vida que Sinop ainda não tinha
              </h2>
              <p className="lead">
                O Etna by SPL é um empreendimento wellness, pensado para o
                bem-estar, o autocuidado e a qualidade de vida todos os dias.
                Não é só onde você mora, é como você vive. São 384 unidades em
                3 torres, com mais de 3 mil m² de lazer na região do Aquarela
                das Artes, num equilíbrio entre arquitetura, natureza e a sua
                rotina. O melhor endereço de Sinop agora tem um estilo de vida.
              </p>
            </Reveal>
            <SectionCta
              label="Quero conhecer o conceito"
              source="LP Etna - Secção O Conceito"
              align="start"
            />
          </div>
          <Reveal as="figure" className="sinop__single" index={1}>
            <Image
              src="/assets/web/isometrica.jpg"
              alt="Vista isométrica do Etna by SPL, com as 3 torres e a área de lazer"
              fill
              sizes="(min-width: 920px) 50vw, 100vw"
              style={{ objectFit: "cover" }}
            />
            <figcaption className="cap">Etna by SPL · Aquarela das Artes</figcaption>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
