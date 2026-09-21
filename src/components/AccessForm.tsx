"use client";

import { useState, type FormEvent } from "react";
import { volumenes } from "@/lib/content";
import { btnPrimario } from "./ui";

/**
 * Formulario de acceso anticipado.
 *
 * Envía a Formspree con fetch para poder mostrar el resultado en la misma
 * página. El endpoint vive en NEXT_PUBLIC_FORM_ENDPOINT (ver .env.example).
 *
 * Si falta esa variable, el visitante NO ve nada sobre la configuración: ve el
 * mismo aviso de error que ante cualquier otra falla, con un correo al cual
 * escribir. El detalle técnico se queda en la consola, y solo en desarrollo.
 */
const ENDPOINT = process.env.NEXT_PUBLIC_FORM_ENDPOINT;

type Estado = "listo" | "enviando" | "ok" | "error";

export function AccessForm() {
  const [estado, setEstado] = useState<Estado>("listo");

  async function enviar(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
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

    try {
      const res = await fetch(ENDPOINT, {
        method: "POST",
        headers: { Accept: "application/json" },
        body: new FormData(e.currentTarget),
      });
      setEstado(res.ok ? "ok" : "error");
    } catch {
      setEstado("error");
    }
  }

  if (estado === "ok") {
    return (
      <div className="flex h-full flex-col justify-center rounded-2xl border border-accent/35 bg-accent/10 p-8 text-center">
        <p className="text-lg font-semibold text-white">Recibimos tu solicitud</p>
        <p className="mt-3 text-sm text-muted">
          Te escribimos en menos de 48 horas hábiles para agendar una llamada y ver qué canales y
          paqueterías conectamos contigo.
        </p>
      </div>
    );
  }

  const enviando = estado === "enviando";

  return (
    <form onSubmit={enviar} className="grid w-full gap-4">
      <Field label="Nombre" name="nombre" autoComplete="name" required />
      <Field label="Email de trabajo" name="email" type="email" autoComplete="email" required />
      <Field label="Empresa" name="empresa" autoComplete="organization" required />

      <label className="grid gap-1.5 text-sm">
        <span className="font-medium text-ink">Envíos por mes</span>
        <select
          name="envios_por_mes"
          defaultValue={volumenes[0]}
          className="rounded-lg border border-field bg-white/5 px-3 py-2.5 text-ink [&>option]:bg-navy-900"
        >
          {volumenes.map((v) => (
            <option key={v}>{v}</option>
          ))}
        </select>
      </label>

      <Field
        label="Canales de venta"
        name="canales"
        placeholder="Shopify, Mercado Libre…"
        required
      />
      <Field label="Paqueterías" name="paqueterias" placeholder="DHL, Estafeta…" required />

      {estado === "error" && (
        <p
          role="alert"
          className="rounded-lg border border-red-400/40 bg-red-400/10 px-3 py-2.5 text-xs text-red-200"
        >
          No pudimos enviar tu solicitud. Vuelve a intentarlo o escríbenos a{" "}
          <a href="mailto:hola@thecarriers.mx" className="font-medium underline underline-offset-2">
            hola@thecarriers.mx
          </a>
          .
        </p>
      )}

      <button
        type="submit"
        disabled={enviando}
        aria-busy={enviando}
        className={`${btnPrimario} mt-2 w-full disabled:cursor-not-allowed disabled:opacity-70`}
      >
        {enviando ? "Enviando…" : "Solicitar acceso"}
      </button>
      <p className="text-xs text-muted">Respondemos en menos de 48 horas hábiles.</p>
    </form>
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
        className="rounded-lg border border-field bg-white/5 px-3 py-2.5 text-ink placeholder:text-muted"
      />
    </label>
  );
}
