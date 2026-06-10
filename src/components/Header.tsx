"use client";

import Image from "next/image";
import { Crown } from "lucide-react";
import { waLink } from "@/lib/wa";
import { WhatsAppIcon } from "./icons/WhatsAppIcon";

export function Header({ onOpen }: { onOpen: () => void }) {
  return (
    <header className="hdr">
      <div className="wrap hdr__in">
        <a className="brand" href="#topo" aria-label="Tozi Imóveis">
          <Image
            className="brand__logo"
            src="/assets/tozi-logo-branco.png"
            alt="Tozi Imóveis"
            width={120}
            height={34}
            priority
          />
          <span className="brand__sub">Sinop · MT</span>
        </a>
        <div className="hdr__cta">
          <span className="pill pill--live">
            <span className="dot"></span> Pré-lançamento aberto
          </span>
          <a className="btn btn--ghost" href={waLink()} target="_blank" rel="noopener">
            <WhatsAppIcon /> WhatsApp
          </a>
          <button className="btn btn--primary" onClick={onOpen}>
            <Crown strokeWidth={1.9} /> Lista VIP
          </button>
        </div>
      </div>
    </header>
  );
}
