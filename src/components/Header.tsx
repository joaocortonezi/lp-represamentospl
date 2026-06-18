"use client";

import { Crown } from "lucide-react";
import { waLink } from "@/lib/wa";
import { WhatsAppIcon } from "./icons/WhatsAppIcon";
import { EtnaLogo } from "./EtnaLogo";

export function Header({ onOpen }: { onOpen: () => void }) {
  return (
    <header className="hdr">
      <div className="wrap hdr__in">
        <a className="brand" href="#topo" aria-label="Etna by SPL · por Tozi Imóveis">
          <EtnaLogo size={26} />
          <span className="brand__sub">por Tozi Imóveis · Sinop · MT</span>
        </a>
        <div className="hdr__cta">
          <span className="pill pill--live">
            <span className="dot"></span> Lista VIP aberta
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
