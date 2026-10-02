"use client";

import { useState, type FormEvent, type ReactNode } from "react";
import { canales, paqueterias, plataformas, volumenes, type Nodo } from "@/lib/content";
import { btnPrimario } from "./ui";

/**
 * Formulario de solicitud.
 *
 * Envía con fetch para poder mostrar el resultado en la misma página. El
 * endpoint vive en NEXT_PUBLIC_FORM_ENDPOINT (ver .env.example): la URL de la
 * aplicación web de Apps Script que guarda cada solicitud en una hoja de
 * Google (script en docs/formulario-google.gs), o una de Formspree.
 *
 * Canales, paqueterías y volumen se eligen, no se escriben. Con cajas de texto
 * la gente ponía una sola por flojera, o no sabía qué contestar, y el teléfono
 * obligaba a abrir el teclado tres veces. Se mandan con los mismos nombres de
 * campo que antes, unidos por comas, para que la hoja no cambie de columnas.
 *
 * Si falta el endpoint, el visitante NO ve nada sobre la configuración: ve el
 * mismo aviso de error que ante cualquier otra falla, con un correo al cual
 * escribir. El detalle técnico se queda en la consola, y solo en desarrollo.
 */
const ENDPOINT = process.env.NEXT_PUBLIC_FORM_ENDPOINT;

/**
 * Agenda para la llamada (Calendly, SavvyCal…). Si existe, la confirmación
 * ofrece agendar en el momento: quien acaba de enviar es quien más interés
 * tiene, y esperar un correo para agendar pierde a una parte.
 */
const AGENDA = process.env.NEXT_PUBLIC_AGENDA_URL;

const OTRO_CANAL: Nodo = { nombre: "Otro", sigla: "" };
const OTRA_PAQ: Nodo = { nombre: "Otra", sigla: "" };

type Estado = "listo" | "enviando" | "ok" | "error";

export function AccessForm() {
  const [estado, setEstado] = useState<Estado>("listo");
  const [faltan, setFaltan] = useState<{ canales: boolean; paqueterias: boolean }>({
    canales: false,
    paqueterias: false,
  });

  async function enviar(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const datos = new FormData(e.currentTarget);

    /* Con casillas, `required` no sirve para "al menos una": se comprueba
       aquí y se dice junto al grupo que falta. */
    const elegidos = (campo: string) => datos.getAll(campo).map(String);
    const sinCanal = elegidos("canales").length === 0;
    const sinPaq = elegidos("paqueterias").length + elegidos("plataformas").length === 0;
    setFaltan({ canales: sinCanal, paqueterias: sinPaq });
    if (sinCanal || sinPaq) return;

    setEstado("enviando");

    if (!ENDPOINT) {
      if (process.env.NODE_ENV !== "production") {
        console.warn(
          "[TheCarriers] Falta NEXT_PUBLIC_FORM_ENDPOINT: el formulario no puede enviarse. Ver .env.example.",
        );
      }
      setEstado("error");
      return;
    }

    /* "Otro" se reemplaza por lo que se escribió en su campo, si se escribió. */
    const conOtro = (lista: string[], otro: string) =>
      lista.map((v) => (v === "Otro" || v === "Otra") && otro.trim() ? otro.trim() : v);
    const lista = (v: string[]) => v.join(", ");

    const paq = lista(conOtro(elegidos("paqueterias"), String(datos.get("paqueteria_otra") ?? "")));
    const plat = lista(elegidos("plataformas"));

    // Codificado como formulario y no como multipart: Apps Script solo lee los
    // campos en e.parameter con este formato, y Formspree acepta los dos.
    const cuerpo = new URLSearchParams({
      nombre: String(datos.get("nombre") ?? ""),
      email: String(datos.get("email") ?? ""),
      empresa: String(datos.get("empresa") ?? ""),
      envios_por_mes: String(datos.get("envios_por_mes") ?? ""),
      canales: lista(conOtro(elegidos("canales"), String(datos.get("canal_otro") ?? ""))),
      paqueterias: [paq, plat && `Plataformas: ${plat}`].filter(Boolean).join(" · "),
    });

    try {
      const res = await fetch(ENDPOINT, {
        method: "POST",
        headers: { Accept: "application/json" },
        body: cuerpo,
      });
      setEstado(res.ok ? "ok" : "error");
    } catch {
      setEstado("error");
    }
  }

  if (estado === "ok") {
    return (
      <div className="flex h-full flex-col justify-center rounded-2xl border border-accent/35 bg-accent/10 p-8 text-center">
        <p className="text-lg font-semibold text-strong">¡Solicitud recibida!</p>
        {AGENDA ? (
          <>
            <p className="mt-3 text-sm text-muted">
              Para acelerar tu activación, agenda ahora una llamada de 10 minutos con nuestro
              equipo. Si prefieres, te escribimos en menos de 24 horas.
            </p>
            <a
              href={AGENDA}
              target="_blank"
              rel="noopener noreferrer"
              className={`${btnPrimario} mx-auto mt-6`}
            >
              Agendar mi llamada →
            </a>
          </>
        ) : (
          <p className="mt-3 text-sm text-muted">
            Te contactamos en menos de 24 horas para coordinar tu onboarding y ver qué canales y
            paqueterías conectamos contigo.
          </p>
        )}
      </div>
    );
  }

  const enviando = estado === "enviando";

  return (
    <form onSubmit={enviar} className="grid w-full gap-5">
      <Field label="Nombre" name="nombre" autoComplete="name" required />
      <Field label="Email de trabajo" name="email" type="email" autoComplete="email" required />
      <Field label="Empresa" name="empresa" autoComplete="organization" required />

      <Grupo titulo="Envíos por mes">
        <div className="grid grid-cols-2 gap-2 sm:grid-cols-4 md:grid-cols-2">
          {volumenes.map((v, i) => (
            <Opcion key={v} tipo="radio" name="envios_por_mes" valor={v} marcada={i === 0}>
              {v}
            </Opcion>
          ))}
        </div>
      </Grupo>

      <Grupo
        titulo="Canales de venta"
        nota="Elige todos los que uses."
        error={faltan.canales ? "Elige al menos un canal." : undefined}
      >
        <Chips name="canales" items={[...canales, OTRO_CANAL]} />
        <Otro name="canal_otro" de="canales" placeholder="¿Cuál otro canal?" />
      </Grupo>

      <Grupo
        titulo="Paqueterías"
        nota="Las que tienes contratadas."
        error={faltan.paqueterias ? "Elige al menos una paquetería o plataforma." : undefined}
      >
        <Chips name="paqueterias" items={[...paqueterias, OTRA_PAQ]} />
        <Otro name="paqueteria_otra" de="paqueterias" placeholder="¿Cuál otra paquetería?" />
        {/* Plegado: es opcional y son nueve. Abierto, alargaba el formulario
            más que todo lo demás junto para una pregunta que no todos tienen. */}
        <details className="group mt-2">
          <summary className="cursor-pointer list-none text-xs font-medium text-link marker:hidden [&::-webkit-details-marker]:hidden">
            <span className="mr-1 inline-block transition-transform duration-200 group-open:rotate-90">
              ›
            </span>
            ¿Compras tus guías en una plataforma? <span className="text-muted">(opcional)</span>
          </summary>
          <Chips name="plataformas" items={plataformas} className="mt-3" />
        </details>
      </Grupo>

      {estado === "error" && (
        <p
          role="alert"
          className="rounded-lg border border-red-400/40 bg-red-400/10 px-3 py-2.5 text-xs text-red-200"
        >
          No pudimos enviar tu solicitud. Vuelve a intentarlo o escríbenos a{" "}
          <a href="mailto:hola@thecarriers.com.mx" className="font-medium underline underline-offset-2">
            hola@thecarriers.com.mx
          </a>
          .
        </p>
      )}

      <button
        type="submit"
        disabled={enviando}
        aria-busy={enviando}
        className={`${btnPrimario} mt-1 w-full disabled:cursor-not-allowed disabled:opacity-70`}
      >
        {enviando ? "Enviando…" : "Conectar mis paqueterías →"}
      </button>
      <p className="-mt-2 text-center text-xs text-muted">
        Te contactamos en menos de 24 horas para coordinar tu onboarding.
      </p>
    </form>
  );
}

/** Un grupo de opciones con su rótulo, una nota corta y su error. */
function Grupo({
  titulo,
  nota,
  error,
  children,
}: {
  titulo: string;
  nota?: string;
  error?: string;
  children: ReactNode;
}) {
  return (
    <fieldset className="grid gap-2 text-sm">
      <legend className="mb-2 flex w-full flex-wrap items-baseline justify-between gap-x-3">
        <span className="font-medium text-ink">{titulo}</span>
        {nota && <span className="text-xs text-muted">{nota}</span>}
      </legend>
      {children}
      {error && (
        <p role="alert" className="text-xs font-medium text-red-400">
          {error}
        </p>
      )}
    </fieldset>
  );
}

/**
 * Casillas con forma de ficha: se marca con un toque, sin teclado. Sin
 * monograma: duplicaba el ancho de cada ficha y el formulario crecía un
 * renglón por grupo sin decir nada que el nombre no dijera.
 */
function Chips({ name, items, className = "" }: { name: string; items: Nodo[]; className?: string }) {
  return (
    <div className={`flex flex-wrap gap-2 ${className}`}>
      {items.map((it) => (
        <Opcion key={it.nombre} tipo="checkbox" name={name} valor={it.nombre}>
          {it.nombre}
        </Opcion>
      ))}
    </div>
  );
}

function Opcion({
  tipo,
  name,
  valor,
  marcada = false,
  children,
}: {
  tipo: "checkbox" | "radio";
  name: string;
  valor: string;
  marcada?: boolean;
  children: ReactNode;
}) {
  return (
    <label className="relative inline-flex cursor-pointer items-center justify-center gap-2 rounded-lg border border-field bg-control px-3 py-2 text-xs font-medium text-ink transition-colors duration-200 ease-[var(--ease-signal)] hover:border-accent/50 has-[:checked]:border-accent has-[:checked]:bg-accent/15 has-[:checked]:text-strong has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-accent/60">
      <input
        type={tipo}
        name={name}
        value={valor}
        defaultChecked={marcada}
        className="sr-only"
      />
      {children}
    </label>
  );
}

/**
 * El campo para escribir cuál, que solo aparece si en su grupo se marcó
 * "Otro" u "Otra". Lo resuelve el CSS, sin estado por cada casilla. Las dos
 * clases van escritas enteras para que Tailwind las encuentre.
 */
const MOSTRAR_OTRO = {
  canales: "[fieldset:has(input[name=canales][value=Otro]:checked)_&]:block",
  paqueterias: "[fieldset:has(input[name=paqueterias][value=Otra]:checked)_&]:block",
};

function Otro({
  name,
  de,
  placeholder,
}: {
  name: string;
  de: keyof typeof MOSTRAR_OTRO;
  placeholder: string;
}) {
  return (
    <input
      name={name}
      aria-label={placeholder}
      placeholder={placeholder}
      className={`hidden rounded-lg border border-field bg-control px-3 py-2.5 text-ink placeholder:text-muted ${MOSTRAR_OTRO[de]}`}
    />
  );
}

function Field({
  label,
  name,
  type = "text",
  placeholder,
  autoComplete,
  required = false,
}: {
  label: string;
  name: string;
  type?: string;
  placeholder?: string;
  autoComplete?: string;
  required?: boolean;
}) {
  return (
    <label className="grid gap-1.5 text-sm">
      <span className="font-medium text-ink">
        {label}
        {!required && <span className="ml-1 font-normal text-muted">(opcional)</span>}
      </span>
      <input
        name={name}
        type={type}
        required={required}
        placeholder={placeholder}
        autoComplete={autoComplete}
        className="rounded-lg border border-field bg-control px-3 py-2.5 text-ink placeholder:text-muted"
      />
    </label>
  );
}
