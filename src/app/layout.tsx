import type { Metadata } from "next";
import { Archivo, Bricolage_Grotesque } from "next/font/google";
import "./globals.css";
import { SmoothScroll } from "@/components/SmoothScroll";

const archivo = Archivo({
  variable: "--font-archivo",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
});

const bricolage = Bricolage_Grotesque({
  variable: "--font-bricolage",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "Novo lançamento no Aquarela das Artes | Lista VIP · Tozi Imóveis",
  description:
    "Duas torres residenciais no meio do Aquarela das Artes, vetor norte de Sinop · MT. Entre na Lista VIP e garanta prioridade de escolha e a tabela de pré-lançamento.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" className={`${archivo.variable} ${bricolage.variable}`}>
      <body className="antialiased">
        <SmoothScroll>{children}</SmoothScroll>
      </body>
    </html>
  );
}
