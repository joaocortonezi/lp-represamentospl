"use client";

import { Reveal } from "./Reveal";
import { SectionCta } from "./SectionCta";

/* Gráfico de barras SVG portado de maps.jsx (cores conforme protótipo) */
function ValorizationChart() {
  const bars = [
    { l: "CDI", y: "12 meses", v: 11, top: "+11%", c: "#9A968B" },
    { l: "Gaia by SPL", y: "desde 2025 (est.)", v: 16, top: "+16%", c: "#1C5E45" },
    { l: "Lançamentos Sinop", y: "média ao ano", v: 22, top: "15 a 28%", c: "#2F5E92" },
    { l: "Ciclo na planta", y: "36 meses · entrega", v: 45, top: "até 45%", c: "#1C5E45" },
  ];
  const W = 460,
    H = 270,
    pad = 38,
    base = H - 42,
    top = 24,
    max = 52;
  const bw = 58,
    gap = (W - pad * 2 - bw * bars.length) / (bars.length - 1);
  const yFor = (v: number) => base - (v / max) * (base - top);
  return (
    <svg
      viewBox={`0 0 ${W} ${H}`}
      role="img"
      aria-label="Valorização no mercado de Sinop, incluindo o Gaia by SPL"
    >
      {[0, 20, 40].map((g, i) => {
        const y = yFor(g);
        return (
          <g key={i}>
            <line x1={pad} y1={y} x2={W - 12} y2={y} stroke="#E0D9CB" strokeWidth="1" />
            <text
              x={pad - 8}
              y={y + 3}
              textAnchor="end"
              fontFamily="var(--sans)"
              fontSize="9.5"
              fill="#9A968B"
              fontWeight="600"
            >
              {g}%
            </text>
          </g>
        );
      })}
      {bars.map((b, i) => {
        const x = pad + i * (bw + gap),
          y = yFor(b.v),
          hh = base - y;
        return (
          <g key={i}>
            <rect x={x} y={y} width={bw} height={hh} rx="4" fill={b.c} />
            <text
              x={x + bw / 2}
              y={y - 8}
              textAnchor="middle"
              fontFamily="var(--display)"
              fontSize="16"
              fontWeight="700"
              fill={b.c}
            >
              {b.top}
            </text>
            <text
              x={x + bw / 2}
              y={base + 15}
              textAnchor="middle"
              fontFamily="var(--sans)"
              fontSize="9.5"
              fontWeight="700"
              fill="#163763"
            >
              {b.l}
            </text>
            <text
              x={x + bw / 2}
              y={base + 27}
              textAnchor="middle"
              fontFamily="var(--sans)"
              fontSize="8.5"
              fontWeight="600"
              fill="#9A968B"
            >
              {b.y}
            </text>
          </g>
        );
      })}
    </svg>
  );
}

export function Valorizacao() {
  return (
    <section className="section" id="valorizacao">
      <div className="wrap">
        <div className="val__grid">
          <div>
            <Reveal className="sechead">
              <span className="eyebrow">Por que comprar na planta</span>
              <h2 className="h-sec">O argumento racional do investidor</h2>
              <p className="lead">
                Em Sinop, comprar no lançamento e revender ou alugar na entrega
                virou estratégia. O ciclo completo na planta tem gerado até 45%
                de valorização acumulada em 36 meses, com lançamentos subindo de
                15% a 28% ao ano.
              </p>
            </Reveal>
            <div className="val__big">
              até +45<span>%</span>
            </div>
            <Reveal as="div" index={1}>
              <ul className="val__pts">
                <li>
                  <span className="n">1</span>
                  <div>
                    <b>Compre abaixo da tabela pública</b>
                    <p>
                      A Lista VIP entra com desconto de pré-lançamento. Você já
                      começa com margem em relação a quem compra no lançamento
                      público de setembro.
                    </p>
                  </div>
                </li>
                <li>
                  <span className="n">2</span>
                  <div>
                    <b>O Gaia by SPL já percorre esse ciclo</b>
                    <p>
                      Lançado em 2025 pela SPL, o Gaia abriu o pré-lançamento
                      com entrada a partir de 5% e quem entrou comprou no menor
                      preço da curva. Este novo lançamento começa o mesmo ciclo
                      agora.
                    </p>
                  </div>
                </li>
                <li>
                  <span className="n">3</span>
                  <div>
                    <b>Saída por venda ou locação</b>
                    <p>
                      Região com demanda de aluguel firme: universidades,
                      hospital e agronegócio sustentam a procura.
                    </p>
                  </div>
                </li>
              </ul>
            </Reveal>
            <SectionCta
              label="Entrar no início do ciclo"
              source="LP Represamento - Secção Valorização"
              align="start"
            />
          </div>
          <Reveal className="val__right" index={2}>
            <div className="val__chart">
              <ValorizationChart />
            </div>
            <p className="disc">
              Referências públicas do mercado de Sinop: valorização média anual
              de lançamentos entre 15% e 28% nos últimos anos e até 45%
              acumulados no ciclo lançamento-entrega (36 meses). Valor do Gaia
              by SPL estimado desde o lançamento em 2025. Desempenho passado não
              garante resultado futuro.
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
