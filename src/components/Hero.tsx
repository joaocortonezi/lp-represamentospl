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
        alt="Praça de entrada do Etna by SPL"
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
              O melhor endereço de Sinop agora tem um{" "}
              <em>estilo de vida</em>
            </h1>
          </Reveal>
          <Reveal index={2} className="hero__loc">
            <MapPin strokeWidth={1.9} /> No Aquarela das Artes · Sinop · MT
          </Reveal>
          <Reveal index={3}>
            <p className="lead">
              Etna by SPL: três torres com 384 unidades e mais de 3 mil m² de
              lazer wellness integrado, da raia climatizada de 25m aos rooftops e
              ao espaço de sauna e crioterapia. Entre na Lista VIP, garanta{" "}
              <b>prioridade na escolha da unidade</b> e{" "}
              <b>acesso antecipado a plantas, tabela e condições</b>, antes do
              mercado.
            </p>
          </Reveal>
        </div>

        <Reveal index={4}>
          <LeadForm variant="formcard--hero" source="LP Etna - Hero" />
        </Reveal>
      </div>
      <span className="hero__rendertag">Imagem ilustrativa · praça de entrada</span>
    </section>
  );
}
