"use client";

import Image from "next/image";
import { Crown, MapPin } from "lucide-react";
import { LeadForm } from "./LeadForm";
import { Reveal } from "./Reveal";

export function Hero() {
  return (
    <section className="hero" id="topo">
      <Image
        className="hero__bg"
        src="/assets/web/hero.jpg"
        alt="Praça de entrada do novo lançamento"
        fill
        priority
        sizes="100vw"
      />
      <div className="hero__scrim"></div>
      <div className="wrap hero__grid">
        <div>
          <Reveal index={0} className="hero__meta">
            <span className="pill pill--vip">
              <Crown strokeWidth={1.9} /> Lista VIP em captação
            </span>
          </Reveal>
          <Reveal index={1}>
            <h1>
              Novo lançamento no meio do <em>Aquarela das Artes</em>
            </h1>
          </Reveal>
          <Reveal index={2} className="hero__loc">
            <MapPin strokeWidth={1.9} /> Vetor norte · Sinop · MT
          </Reveal>
          <Reveal index={3}>
            <p className="lead">
              Duas torres residenciais e cerca de 112 unidades dentro do
              Aquarela das Artes, a região que mais cresce em Sinop. Entre na
              Lista VIP, garanta <b>prioridade de escolha</b> e a{" "}
              <b>tabela com desconto de pré-lançamento</b>. E seja o primeiro a
              conhecer plantas e tipologias, antes do mercado.
            </p>
          </Reveal>
        </div>

        <Reveal index={4}>
          <LeadForm variant="formcard--hero" source="LP Represamento - Hero" />
        </Reveal>
      </div>
      <span className="hero__rendertag">Imagem ilustrativa · praça de entrada</span>
    </section>
  );
}
