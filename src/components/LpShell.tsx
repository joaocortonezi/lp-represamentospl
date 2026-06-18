"use client";

import { useState, useEffect, useCallback } from "react";
import { Crown, X } from "lucide-react";
import { waLink } from "@/lib/wa";
import { WhatsAppIcon } from "./icons/WhatsAppIcon";
import { LeadForm } from "./LeadForm";
import { VipModalContext } from "./VipModalContext";
import { Header } from "./Header";
import { Hero } from "./Hero";
import { Conceito } from "./Conceito";
import { AreasComuns } from "./AreasComuns";
import { Wellness } from "./Wellness";
import { VipSection } from "./VipSection";
import { SobreSinop } from "./SobreSinop";
import { Localizacao } from "./Localizacao";
import { Valorizacao } from "./Valorizacao";
import { Credibilidade } from "./Credibilidade";
import { Condicoes } from "./Condicoes";
import { Tipologias } from "./Tipologias";
import { Cronograma } from "./Cronograma";
import { Depoimentos } from "./Depoimentos";
import { Faq } from "./Faq";
import { FinalCta } from "./FinalCta";
import { Footer } from "./Footer";

function Modal({
  open,
  source,
  onClose,
}: {
  open: boolean;
  source: string;
  onClose: () => void;
}) {
  useEffect(() => {
    function esc(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    if (open) {
      document.addEventListener("keydown", esc);
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.removeEventListener("keydown", esc);
      document.body.style.overflow = "";
    };
  }, [open, onClose]);

  if (!open) return null;
  return (
    <div className="modal" role="dialog" aria-modal="true">
      <div className="modal__bg" onClick={onClose}></div>
      <div className="modal__card">
        <button className="modal__close" onClick={onClose} aria-label="Fechar">
          <X strokeWidth={1.9} />
        </button>
        <LeadForm
          heading="Entrar na Lista VIP"
          sub="Nome e WhatsApp. Um consultor sênior envia o acesso antecipado a plantas e condições do Etna by SPL."
          cta="Quero minha prioridade"
          source={source}
        />
      </div>
    </div>
  );
}

function StickyBar({ onOpen }: { onOpen: (source?: string) => void }) {
  const [show, setShow] = useState(false);
  useEffect(() => {
    function onScroll() {
      setShow(window.scrollY > 720);
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return (
    <div className={"stickybar " + (show ? "show" : "")}>
      <div className="meta">
        <b>Etna by SPL</b>
        <span>No Aquarela das Artes · Lista VIP</span>
      </div>
      <button
        className="btn btn--primary"
        onClick={() => onOpen("LP Etna - Barra Mobile")}
      >
        <Crown strokeWidth={1.9} /> Lista VIP
      </button>
    </div>
  );
}

const DEFAULT_SOURCE = "LP Etna - Modal";

export function LpShell() {
  const [modal, setModal] = useState(false);
  const [modalSource, setModalSource] = useState(DEFAULT_SOURCE);

  const open = useCallback((source?: string) => {
    setModalSource(source || DEFAULT_SOURCE);
    setModal(true);
  }, []);
  const close = useCallback(() => setModal(false), []);

  return (
    <VipModalContext.Provider value={open}>
      <Header onOpen={() => open("LP Etna - Header")} />
      <main>
        <Hero />
        <Credibilidade />
        <Conceito />
        <SobreSinop />
        <AreasComuns />
        <Wellness />
        <Localizacao />
        <Valorizacao />
        <Condicoes />
        <Tipologias />
        <VipSection />
        <Cronograma />
        <Depoimentos />
        <Faq />
        <FinalCta />
      </main>
      <Footer />

      <a
        className="wafloat"
        href={waLink()}
        target="_blank"
        rel="noopener"
        aria-label="Falar no WhatsApp"
      >
        <span className="wafloat__ping"></span>
        <WhatsAppIcon />
      </a>
      <StickyBar onOpen={open} />
      <Modal open={modal} source={modalSource} onClose={close} />
    </VipModalContext.Provider>
  );
}
