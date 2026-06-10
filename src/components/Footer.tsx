"use client";

import Image from "next/image";
import { waLink } from "@/lib/wa";
import { WhatsAppIcon } from "./icons/WhatsAppIcon";
import { InstagramIcon, FacebookIcon } from "./icons/SocialIcons";

export function Footer() {
  return (
    <footer className="ftr">
      <div className="wrap">
        <div className="ftr__grid">
          <div className="ftr__brand">
            <Image
              className="ftr__logo"
              src="/assets/tozi-logo-branco.png"
              alt="Tozi Imóveis"
              width={134}
              height={38}
            />
            <p>
              Imobiliária de Sinop · MT há 23 anos. Assessoria especializada e
              atendimento consultivo na compra do seu imóvel. Estruturamos a
              Lista VIP do novo lançamento no Aquarela das Artes.
            </p>
            <div className="ftr__social">
              <a href={waLink()} target="_blank" rel="noopener" aria-label="WhatsApp">
                <WhatsAppIcon />
              </a>
              <a
                href="https://www.instagram.com/toziimoveis.com.br/"
                target="_blank"
                rel="noopener"
                aria-label="Instagram"
              >
                <InstagramIcon />
              </a>
              <a
                href="https://www.facebook.com/Toziimoveis"
                target="_blank"
                rel="noopener"
                aria-label="Facebook"
              >
                <FacebookIcon />
              </a>
            </div>
          </div>
          <div>
            <h5>Navegue</h5>
            <ul>
              <li><a href="#vip">Lista VIP</a></li>
              <li><a href="#sinop">Por que Sinop</a></li>
              <li><a href="#areas">Áreas comuns</a></li>
              <li><a href="#local">Localização</a></li>
              <li><a href="#tozi">Sobre a Tozi</a></li>
              <li><a href="#faq">Dúvidas frequentes</a></li>
            </ul>
          </div>
          <div>
            <h5>Contato</h5>
            <ul>
              <li>
                <a href={waLink()} target="_blank" rel="noopener">
                  WhatsApp · (66) 3531-7222
                </a>
              </li>
              <li>Sinop · Mato Grosso</li>
              <li>CRECI/MT J-8583</li>
            </ul>
          </div>
        </div>
        <div className="ftr__bottom">
          <span>© 2026 Tozi Imóveis. Todos os direitos reservados.</span>
          <span>
            Imagens meramente ilustrativas. Memorial descritivo prevalece sobre
            o material publicitário.
          </span>
        </div>
      </div>
    </footer>
  );
}
