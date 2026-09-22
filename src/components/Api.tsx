"use client";

import { useState } from "react";
import { ApiFlow } from "./Network";
import { apiBeneficios, apiSwap } from "@/lib/content";

function lineas(i: number) {
  const s = apiSwap[i];
  return [
    { t: "POST /v1/shipments", c: "method" },
    { t: "Authorization: Bearer tc_live_··········", c: "faint" },
    { t: "Idempotency-Key: ord_10422", c: "faint" },
    { t: "", c: "faint" },
    { t: "{", c: "punct" },
    { t: `  "carrier": "${s.id}",`, c: "swap" },
    { t: `  "service": "${s.servicio}",`, c: "swap-soft" },
    { t: '  "reference": "SO-10422",', c: "plain" },
    { t: '  "from":   { "postal_code": "72000" },', c: "plain" },
    { t: '  "to":     { "postal_code": "64000" },', c: "plain" },
    { t: '  "parcel": { "weight_kg": 2.4 },', c: "plain" },
    { t: '  "webhook": "https://tu-sistema.mx/hooks/tc"', c: "plain" },
    { t: "}", c: "punct" },
  ];
}

const tono: Record<string, string> = {
  method: "font-semibold text-emerald-300",
  faint: "text-white/60",
  punct: "text-white/60",
  plain: "text-white/90",
  // El verde de marca con texto oscuro encima: 5.32:1.
  swap: "rounded bg-accent px-1 text-abyss",
  "swap-soft": "text-emerald-300",
};

export function Api() {
  const [i, setI] = useState(0);

  return (
    <section id="api" className="relative scroll-mt-20 border-t border-hairline">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[420px] bg-[radial-gradient(45%_60%_at_50%_0%,rgba(15,157,110,.12),transparent_70%)]"
      />
      <div className="shell py-20 md:py-28">
        <div className="grid items-start gap-12 lg:grid-cols-2 lg:gap-16">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-link">API</p>
            <h2 className="mt-4 text-3xl font-semibold tracking-tight text-strong md:text-[2.75rem] md:leading-[1.08]">
              Una API. Todos tus carriers.
            </h2>
            <p className="mt-5 max-w-[58ch] text-base text-muted md:text-lg">
              Integra TheCarriers una sola vez. Cuando agregues una nueva paquetería, no necesitas
              desarrollar otra integración desde cero.
            </p>

            <div className="mt-10">
              <ApiFlow />
            </div>
          </div>

          <div>
            <div data-tema="oscuro" className="overflow-hidden rounded-2xl border border-hairline bg-page shadow-[0_50px_110px_-60px_rgba(0,0,0,.95)]">
              <div className="flex flex-wrap items-center gap-2 border-b border-hairline bg-white/4 px-4 py-3">
                <span className="mr-1 text-xs text-muted">Carrier</span>
                {apiSwap.map((s, idx) => (
                  <button
                    key={s.id}
                    type="button"
                    aria-pressed={i === idx}
                    onClick={() => setI(idx)}
                    className={`rounded-md border px-2.5 py-1.5 text-xs font-medium transition-colors duration-200 ease-[var(--ease-signal)] ${
                      i === idx
                        ? "border-accent bg-accent text-abyss"
                        : "border-hairline-strong text-muted hover:border-accent/60 hover:text-ink"
                    }`}
                  >
                    {s.etiqueta}
                  </button>
                ))}
              </div>

              <div
                className="thin-scroll overflow-x-auto"
                tabIndex={0}
                role="region"
                aria-label="Cuerpo de la petición"
              >
                <pre className="min-w-max p-5 font-mono text-[12.5px] leading-[1.8]">
                  <code>
                    {lineas(i).map((l, n) => (
                      <span key={n} className="block">
                        <span className={tono[l.c]}>{l.t || " "}</span>
                      </span>
                    ))}
                  </code>
                </pre>
              </div>

              <p aria-live="polite" className="sr-only">
                Carrier seleccionado: {apiSwap[i].etiqueta}. La estructura de la petición no cambia.
              </p>
            </div>

            <p className="mt-4 text-sm text-muted">
              Cambia el carrier sin reconstruir tu integración.
            </p>

          </div>
        </div>

        <ul className="mt-14 grid gap-4 md:grid-cols-3">
          {apiBeneficios.map((b) => (
            <li
              key={b.t}
              className="rounded-2xl border border-hairline bg-raise p-6 transition-colors duration-300 ease-[var(--ease-signal)] hover:border-hairline-strong"
            >
              <h3 className="text-base font-semibold text-strong">{b.t}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">{b.d}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
