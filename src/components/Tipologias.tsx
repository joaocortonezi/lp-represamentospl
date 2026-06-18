"use client";

import { Home, BedDouble, LayoutGrid, Trees, LucideIcon } from "lucide-react";
import { Reveal } from "./Reveal";
import { SectionCta } from "./SectionCta";

const PLANTAS: { Icon: LucideIcon; t: string; m: string; d: string; hero?: boolean }[] = [
  {
    Icon: Home,
    t: "1 quarto",
    m: "Compacto inteligente",
    d: "Planta enxuta e funcional, ideal para morar bem ou investir com liquidez.",
    hero: true,
  },
  {
    Icon: BedDouble,
    t: "2 quartos com suíte",
    m: "62 m²",
    d: "Espaço certo para o casal ou a família que está começando.",
  },
  {
    Icon: BedDouble,
    t: "3 quartos com suíte",
    m: "72 a 74 m²",
    d: "Mais quartos e amplitude para quem precisa de espaço no dia a dia.",
  },
  {
    Icon: LayoutGrid,
    t: "3 suítes com lavabo",
    m: "85 m²",
    d: "A planta mais completa, com privacidade para todos e lavabo social.",
  },
  {
    Icon: Trees,
    t: "Térreos com garden",
    m: "Área privativa externa",
    d: "Unidades no térreo com área externa privativa, para viver junto da natureza.",
  },
];

export function Tipologias() {
  return (
    <section className="section" id="tipologias">
      <div className="wrap">
        <Reveal className="sechead">
          <span className="eyebrow">Plantas</span>
          <h2 className="h-sec">Plantas pra cada estilo de vida</h2>
          <p className="lead">
            Do compacto inteligente aos térreos com garden, o Etna by SPL tem a
            planta certa para quem quer morar bem e para quem busca o melhor
            investimento na região do Aquarela das Artes.
          </p>
        </Reveal>
        <div className="cond">
          {PLANTAS.map((p, i) => (
            <Reveal
              className={"condcard " + (p.hero ? "is-hero" : "")}
              key={p.t}
              index={i}
            >
              <div className="ic">
                <p.Icon strokeWidth={1.9} />
              </div>
              <h4>
                {p.t} · {p.m}
              </h4>
              <p>{p.d}</p>
            </Reveal>
          ))}
        </div>
        <Reveal index={5}>
          <p className="disc">
            Possibilidade de sala estendida em plantas selecionadas.
            Disponibilidade e metragens sujeitas a confirmação. A Lista VIP
            conhece todas as plantas em primeira mão.
          </p>
        </Reveal>
        <SectionCta
          label="Quero ver as plantas primeiro"
          source="LP Etna - Secção Plantas"
        />
      </div>
    </section>
  );
}
