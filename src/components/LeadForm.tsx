"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Crown, Lock, ArrowRight, Check, Loader2 } from "lucide-react";
import { waLink } from "@/lib/wa";
import { WhatsAppIcon } from "./icons/WhatsAppIcon";

export function maskPhone(v: string): string {
  v = v.replace(/\D/g, "").slice(0, 11);
  if (v.length <= 2) return v.length ? "(" + v : "";
  if (v.length <= 7) return "(" + v.slice(0, 2) + ") " + v.slice(2);
  return "(" + v.slice(0, 2) + ") " + v.slice(2, 7) + "-" + v.slice(7);
}

const schema = z.object({
  nome: z.string().trim().min(2, "Informe seu nome."),
  tel: z
    .string()
    .refine((v) => v.replace(/\D/g, "").length >= 10, "WhatsApp incompleto."),
  email: z
    .string()
    .trim()
    .refine((v) => !v || /^\S+@\S+\.\S+$/.test(v), "E-mail inválido."),
  consent: z.boolean().refine((v) => v === true),
});

type FormData = z.infer<typeof schema>;

interface LeadFormProps {
  heading?: string;
  sub?: string;
  cta?: string;
  variant?: string;
  /* Identifica onde a pessoa converteu; vai pro Vista no campo veiculo. */
  source?: string;
}

export function LeadForm({
  heading = "Entrar na Lista VIP",
  sub = "Receba a tabela com desconto e a prioridade de escolha antes do mercado.",
  cta = "Quero entrar na Lista VIP",
  variant = "",
  source = "LP Represamento",
}: LeadFormProps) {
  const [ok, setOk] = useState(false);
  const [nome, setNome] = useState("");
  const [sending, setSending] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: { nome: "", tel: "", email: "", consent: true },
  });

  const tel = watch("tel");

  async function onSubmit(data: FormData) {
    setSending(true);
    try {
      /* Lead vai pro Vista CRM com a origem da conversão. Se o CRM falhar,
         não bloqueia a pessoa: o WhatsApp continua sendo o canal principal. */
      await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          nome: data.nome,
          tel: data.tel,
          email: data.email,
          source,
        }),
      });
    } catch {
      /* registro do lead falhou; o fluxo segue para o WhatsApp */
    } finally {
      setSending(false);
      setNome(data.nome);
      setOk(true);
    }
  }

  if (ok) {
    return (
      <div className={"formcard " + variant}>
        <div className="formok">
          <div className="ring">
            <Check strokeWidth={2.4} />
          </div>
          <h3>Você está na Lista VIP.</h3>
          <p>
            Em instantes um consultor sênior fala com você no WhatsApp com a
            tabela de pré-lançamento. Adiante a conversa agora:
          </p>
          <a
            className="btn btn--wa btn--block"
            style={{ marginTop: 14 }}
            href={waLink(
              "Acabei de entrar na Lista VIP do novo lançamento no Aquarela das Artes (" +
                nome +
                "). Quero a tabela com desconto."
            )}
            target="_blank"
            rel="noopener"
          >
            <WhatsAppIcon /> Abrir conversa no WhatsApp
          </a>
        </div>
      </div>
    );
  }

  return (
    <form className={"formcard " + variant} onSubmit={handleSubmit(onSubmit)} noValidate>
      <div className="formcard__top">
        <div className="ic">
          <Crown strokeWidth={1.9} />
        </div>
        <div>
          <h3>{heading}</h3>
          <p className="sub">{sub}</p>
        </div>
      </div>

      <div className="field">
        <label htmlFor={`lf-nome-${source}`}>Nome completo</label>
        <input
          id={`lf-nome-${source}`}
          type="text"
          placeholder="Seu nome"
          className={errors.nome ? "err" : ""}
          {...register("nome")}
        />
        {errors.nome && <div className="msg">{errors.nome.message}</div>}
      </div>

      <div className="field">
        <label htmlFor={`lf-tel-${source}`}>WhatsApp</label>
        <input
          id={`lf-tel-${source}`}
          type="tel"
          placeholder="(66) 90000-0000"
          className={errors.tel ? "err" : ""}
          value={tel}
          {...register("tel", {
            onChange: (e) =>
              setValue("tel", maskPhone(e.target.value), { shouldValidate: false }),
          })}
        />
        {errors.tel && <div className="msg">{errors.tel.message}</div>}
      </div>

      <div className="field">
        <label htmlFor={`lf-email-${source}`}>
          E-mail <span className="opt">(opcional)</span>
        </label>
        <input
          id={`lf-email-${source}`}
          type="email"
          placeholder="seu@email.com"
          className={errors.email ? "err" : ""}
          {...register("email")}
        />
        {errors.email && <div className="msg">{errors.email.message}</div>}
      </div>

      <label className="consent">
        <input type="checkbox" {...register("consent")} />
        <span>
          Autorizo o contato da Tozi Imóveis pelo WhatsApp e o tratamento dos
          meus dados conforme a LGPD.{" "}
          {errors.consent && <b style={{ color: "#C0492E" }}>(obrigatório)</b>}
        </span>
      </label>

      <button className="btn btn--primary btn--block btn--lg" type="submit" disabled={sending}>
        {sending ? (
          <Loader2 strokeWidth={1.9} className="animate-spin" />
        ) : (
          <>
            {cta} <ArrowRight strokeWidth={1.9} />
          </>
        )}
      </button>
      <div className="formnote">
        <Lock strokeWidth={1.9} /> Sem custo e sem compromisso de compra.
      </div>
    </form>
  );
}
