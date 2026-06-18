"use client";

import {
  MapPin,
  Trees,
  Building2,
  ShieldCheck,
  Award,
  Car,
  Lock,
  LucideIcon,
} from "lucide-react";
import { Reveal } from "./Reveal";
import { SectionCta } from "./SectionCta";

const POIS: { Icon: LucideIcon; t: string; s: string; km: string }[] = [
  {
    Icon: Trees,
    t: "Orla do Aquarela das Artes",
    s: "Lazer, água e área verde na porta de casa",
    km: "menos de 5 min",
  },
  {
    Icon: Award,
    t: "Unemat · Fasipe",
    s: "Universidades de referência na região",
    km: "menos de 5 min",
  },
  {
    Icon: Building2,
    t: "Colégio Prina",
    s: "Ensino de qualidade pertinho",
    km: "menos de 5 min",
  },
  {
    Icon: ShieldCheck,
    t: "OAB · Fórum",
    s: "Serviços e polo jurídico de Sinop",
    km: "menos de 5 min",
  },
  {
    Icon: MapPin,
    t: "Av. Bruno Martini",
    s: "Acesso rápido e bem conectado",
    km: "no entorno",
  },
  {
    Icon: Car,
    t: "Aeroporto de Sinop",
    s: "Conexões aéreas da região",
    km: "menos de 5 min",
  },
];

export function Localizacao() {
  return (
    <section className="section sec--gold" id="local">
      <div className="wrap">
        <Reveal className="sechead">
          <span className="eyebrow">Localização</span>
          <h2 className="h-sec">No coração do Aquarela das Artes</h2>
          <p className="lead">
            O Etna by SPL nasce na região do Aquarela das Artes, a 5 minutos de
            tudo. Da orla às universidades, dos colégios ao aeroporto, você
            chega rápido em tudo que importa no dia a dia.
          </p>
          <p className="loc__addr">
            Rua Joaquim Manuel de Macedo, 65 · Aquarela das Artes · Sinop/MT
          </p>
        </Reveal>
        <Reveal index={1}>
          <figure
            style={{
              margin: "24px 0 20px",
              borderRadius: "var(--r)",
              overflow: "hidden",
              boxShadow: "var(--shadow-lg)",
              border: "1px solid var(--line)",
            }}
          >
            <img
              src="/assets/web/localizacao-aerea.jpg"
              alt="Vista aérea de Sinop mostrando o Etna by SPL no Aquarela das Artes e os pontos de interesse a menos de 5 minutos"
              style={{ width: "100%", display: "block" }}
            />
          </figure>
        </Reveal>
        <Reveal className="loc__pts" index={2}>
          {POIS.map((p) => (
            <div className="poi" key={p.t}>
              <div className="ic">
                <p.Icon strokeWidth={1.9} />
              </div>
              <div>
                <b>{p.t}</b>
                <span>{p.s}</span>
              </div>
              <span className="km">{p.km}</span>
            </div>
          ))}
        </Reveal>
        <Reveal className="loc__note" index={3}>
          <Lock strokeWidth={1.9} /> Tempos de deslocamento estimados de carro.
          Condições e prioridade de escolha liberadas primeiro para a Lista VIP.
          Inscreva-se para garantir as melhores condições.
        </Reveal>
        <SectionCta
          label="Garantir prioridade na Lista VIP"
          source="LP Etna - Secção Localização"
          align="start"
        />
      </div>
    </section>
  );
}
