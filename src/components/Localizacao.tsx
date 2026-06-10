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
    Icon: MapPin,
    t: "Av. das Sibipirunas",
    s: "Acesso principal do vetor norte",
    km: "no entorno",
  },
  {
    Icon: Trees,
    t: "Parque das Águas",
    s: "Área verde e lazer ao ar livre",
    km: "≈ 5 min",
  },
  {
    Icon: Building2,
    t: "Shopping Sinop",
    s: "Compras, cinema e gastronomia",
    km: "≈ 10 min",
  },
  {
    Icon: ShieldCheck,
    t: "Hospital Regional",
    s: "Saúde de referência regional",
    km: "≈ 10 min",
  },
  {
    Icon: Award,
    t: "UNEMAT · IFMT",
    s: "Universidades e ensino técnico",
    km: "≈ 10 min",
  },
  {
    Icon: Car,
    t: "Aeroporto regional",
    s: "Conexões aéreas de Sinop",
    km: "≈ 15 min",
  },
];

export function Localizacao() {
  return (
    <section className="section sec--mist" id="local">
      <div className="wrap">
        <Reveal className="sechead">
          <span className="eyebrow">Localização</span>
          <h2 className="h-sec">No meio do Aquarela das Artes</h2>
          <p className="lead">
            O empreendimento nasce dentro do Aquarela das Artes, com acesso
            direto pela Av. das Sibipirunas e a poucos minutos do Shopping, do
            Hospital Regional e das universidades. O endereço exato é revelado
            só para a Lista VIP.
          </p>
        </Reveal>
        <div className="loc">
          <Reveal className="loc__map" index={1}>
            <iframe
              title="Mapa da região do novo lançamento em Sinop, MT"
              src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d11000!2d-55.5400!3d-11.8320!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1spt-BR!2sbr!4v1780666522813!5m2!1spt-BR!2sbr"
              loading="lazy"
              allowFullScreen
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </Reveal>
          <div>
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
              <Lock strokeWidth={1.9} /> Localização aproximada. Tempos de
              deslocamento estimados de carro. O endereço exato é liberado só
              para a Lista VIP. Inscreva-se para descobrir onde fica.
            </Reveal>
            <SectionCta
              label="Descobrir o endereço primeiro"
              source="LP Represamento - Secção Localização"
              align="start"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
