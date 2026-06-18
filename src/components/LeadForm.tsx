"use client";

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  Crown,
  Lock,
  ArrowRight,
  Check,
  Loader2,
  ClipboardList,
  X,
} from "lucide-react";
import { waLink } from "@/lib/wa";
import { track } from "@/lib/pixel";
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

const qualifySchema = z.object({
  finalidade: z.enum(["Investimento", "Moradia"], "Selecione uma opção."),
  primeiroImovel: z.enum(["Sim", "Não"], "Selecione uma opção."),
  jaInvestiu: z.enum(["Sim", "Não"], "Selecione uma opção."),
  duvida: z.string().trim().max(600, "Máximo de 600 caracteres.").optional(),
});

type QualifyData = z.infer<typeof qualifySchema>;

interface LeadFormProps {
  heading?: string;
  sub?: string;
  cta?: string;
  variant?: string;
  /* Identifica onde a pessoa converteu; vai pro Vista no campo veiculo. */
  source?: string;
}

/* Modal da segunda etapa (qualificação). Renderizado em portal no body
   para não herdar transform/overflow dos cards e modais que contêm o form. */
function QualifyModal({
  source,
  nome,
  tel,
  email,
  onDone,
  onClose,
}: {
  source: string;
  nome: string;
  tel: string;
  email: string;
  onDone: () => void;
  onClose: () => void;
}) {
  const [sending, setSending] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<QualifyData>({
    resolver: zodResolver(qualifySchema),
  });

  useEffect(() => {
    function esc(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    document.addEventListener("keydown", esc);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", esc);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  async function onSubmit(data: QualifyData) {
    setSending(true);
    try {
      /* Mesmo endpoint do lead: o Vista deduplica pelo telefone e anexa a
         mensagem de qualificação ao cadastro que acabou de ser criado. */
      await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          etapa: "qualificacao",
          nome,
          tel,
          email,
          source,
          finalidade: data.finalidade,
          primeiroImovel: data.primeiroImovel,
          jaInvestiu: data.jaInvestiu,
          duvida: data.duvida ?? "",
        }),
      });
    } catch {
      /* se falhar, não bloqueia: a pessoa segue para o WhatsApp */
    } finally {
      setSending(false);
      onDone();
    }
  }

  return createPortal(
    <div className="modal" role="dialog" aria-modal="true">
      <div className="modal__bg" onClick={onClose}></div>
      <div className="modal__card">
        <button className="modal__close" onClick={onClose} aria-label="Fechar">
          <X strokeWidth={1.9} />
        </button>
        <form className="formcard" onSubmit={handleSubmit(onSubmit)} noValidate>
          <div className="formcard__top">
            <div className="ic">
              <ClipboardList strokeWidth={1.9} />
            </div>
            <div>
              <h3>Conte um pouco mais</h3>
              <p className="sub">
                Suas respostas ajudam o consultor a preparar um atendimento sob
                medida para você.
              </p>
            </div>
          </div>

          <div className="field">
            <label htmlFor="qf-finalidade">É para investimento ou moradia?</label>
            <select
              id="qf-finalidade"
              defaultValue=""
              className={errors.finalidade ? "err" : ""}
              {...register("finalidade")}
            >
              <option value="" disabled>
                Selecione
              </option>
              <option value="Investimento">Investimento</option>
              <option value="Moradia">Moradia</option>
            </select>
            {errors.finalidade && (
              <div className="msg">{errors.finalidade.message}</div>
            )}
          </div>

          <div className="field">
            <label htmlFor="qf-primeiro">É seu primeiro imóvel?</label>
            <select
              id="qf-primeiro"
              defaultValue=""
              className={errors.primeiroImovel ? "err" : ""}
              {...register("primeiroImovel")}
            >
              <option value="" disabled>
                Selecione
              </option>
              <option value="Sim">Sim</option>
              <option value="Não">Não</option>
            </select>
            {errors.primeiroImovel && (
              <div className="msg">{errors.primeiroImovel.message}</div>
            )}
          </div>

          <div className="field">
            <label htmlFor="qf-investiu">
              Já investiu alguma vez no mercado imobiliário?
            </label>
            <select
              id="qf-investiu"
              defaultValue=""
              className={errors.jaInvestiu ? "err" : ""}
              {...register("jaInvestiu")}
            >
              <option value="" disabled>
                Selecione
              </option>
              <option value="Sim">Sim</option>
              <option value="Não">Não</option>
            </select>
            {errors.jaInvestiu && (
              <div className="msg">{errors.jaInvestiu.message}</div>
            )}
          </div>

          <div className="field">
            <label htmlFor="qf-duvida">
              Tem alguma dúvida ou observação sobre o empreendimento?{" "}
              <span className="opt">(opcional)</span>
            </label>
            <textarea
              id="qf-duvida"
              placeholder="Escreva aqui"
              className={errors.duvida ? "err" : ""}
              {...register("duvida")}
            />
            {errors.duvida && <div className="msg">{errors.duvida.message}</div>}
          </div>

          <button
            className="btn btn--primary btn--block btn--lg"
            type="submit"
            disabled={sending}
          >
            {sending ? (
              <Loader2 strokeWidth={1.9} className="animate-spin" />
            ) : (
              <>
                Enviar informações <ArrowRight strokeWidth={1.9} />
              </>
            )}
          </button>
        </form>
      </div>
    </div>,
    document.body
  );
}

export function LeadForm({
  heading = "Entrar na Lista VIP",
  sub = "Receba antes de ser aberto ao público todas as informações!",
  cta = "Quero entrar na Lista VIP",
  variant = "",
  source = "LP Etna",
}: LeadFormProps) {
  /* form → done (cadastrado) → qualified (segunda etapa enviada) */
  const [stage, setStage] = useState<"form" | "done" | "qualified">("form");
  const [qualifyOpen, setQualifyOpen] = useState(false);
  const [lead, setLead] = useState({ nome: "", tel: "", email: "" });
  const [sending, setSending] = useState(false);
  /* Anti-spam: honeypot que humano não vê + tempo desde a montagem do form.
     O servidor descarta envios com honeypot preenchido ou rápidos demais. */
  const hpRef = useRef<HTMLInputElement>(null);
  const mountedAt = useRef(Date.now());

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
          hp: hpRef.current?.value ?? "",
          t: Date.now() - mountedAt.current,
        }),
      });
    } catch {
      /* registro do lead falhou; o fluxo segue para o WhatsApp */
    } finally {
      setSending(false);
      setLead({ nome: data.nome, tel: data.tel, email: data.email });
      /* conversão principal da campanha (otimizar por Lead no Meta) */
      track("Lead", { content_name: "Lista VIP — Etna by SPL", lead_source: source });
      setStage("done");
      /* abre a qualificação direto, sem exigir clique; fechar o modal
         devolve ao card com o botão de reabrir e o atalho do WhatsApp */
      setQualifyOpen(true);
    }
  }

  if (stage === "done" || stage === "qualified") {
    const waBtn = (
      <a
        className="btn btn--wa btn--block"
        style={{ marginTop: 14 }}
        href={waLink(
          "Acabei de entrar na Lista VIP do Etna by SPL, no Aquarela das Artes (" +
            lead.nome +
            "). Quero o acesso antecipado a plantas e condições."
        )}
        target="_blank"
        rel="noopener"
      >
        <WhatsAppIcon /> Abrir conversa no WhatsApp
      </a>
    );

    return (
      <div className={"formcard " + variant}>
        <div className="formok">
          <div className="ring">
            <Check strokeWidth={2.4} />
          </div>
          {stage === "qualified" ? (
            <>
              <h3>Informações enviadas.</h3>
              <p>
                Obrigado! Seu consultor já recebe tudo isso junto com o seu
                cadastro. Adiante a conversa agora:
              </p>
              {waBtn}
            </>
          ) : (
            <>
              <h3>Você está na Lista VIP.</h3>
              <p>
                Quer um atendimento mais preciso? Responda 3 perguntas rápidas
                para o consultor já chegar com o que importa para você.
              </p>
              <button
                className="btn btn--primary btn--block btn--lg"
                style={{ marginTop: 14 }}
                onClick={() => setQualifyOpen(true)}
              >
                <ClipboardList strokeWidth={1.9} /> Completar minhas informações
              </button>
              <a
                className="formnote"
                style={{ cursor: "pointer", marginTop: 12 }}
                href={waLink(
                  "Acabei de entrar na Lista VIP do novo lançamento no Aquarela das Artes (" +
                    lead.nome +
                    "). Quero a tabela com desconto."
                )}
                target="_blank"
                rel="noopener"
              >
                <WhatsAppIcon /> Pular e abrir o WhatsApp
              </a>
            </>
          )}
        </div>

        {qualifyOpen && (
          <QualifyModal
            source={source}
            nome={lead.nome}
            tel={lead.tel}
            email={lead.email}
            onDone={() => {
              setQualifyOpen(false);
              setStage("qualified");
            }}
            onClose={() => setQualifyOpen(false)}
          />
        )}
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

      {/* Honeypot: fora da tela e fora da ordem de tab; só bot preenche. */}
      <input
        ref={hpRef}
        type="text"
        name="website"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        style={{
          position: "absolute",
          left: "-9999px",
          width: 1,
          height: 1,
          opacity: 0,
        }}
      />

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
