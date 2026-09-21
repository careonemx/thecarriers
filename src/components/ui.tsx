import type { CSSProperties, ReactNode } from "react";
import type { Glifo, Icono } from "@/lib/content";

/* -----------------------------------------------------------------
 * Piezas comunes del sistema oscuro.
 * --------------------------------------------------------------- */

/** Tarjeta base. El hover levanta el borde, no el contenido. */
export const card =
  "rounded-2xl border border-hairline bg-navy-900/70 p-6 transition-[border-color,background-color,box-shadow] duration-300 ease-[var(--ease-signal)] hover:border-hairline-strong hover:bg-navy-900 hover:shadow-[0_24px_60px_-40px_rgba(15,157,110,.8)]";

/* Texto oscuro sobre el verde de marca: blanco sobre accent da 3.46:1 y
   reprueba AA; abyss sobre accent da 5.32:1. El hover aclara en vez de
   oscurecer, porque accent-600 dejaría el texto oscuro sin contraste. */
export const btnPrimario =
  "inline-flex items-center justify-center whitespace-nowrap rounded-lg bg-accent px-5 py-3 text-sm font-semibold text-abyss shadow-[0_18px_40px_-22px_rgba(15,157,110,.9)] transition-[filter,box-shadow] duration-200 ease-[var(--ease-signal)] hover:brightness-110";

export const btnFantasma =
  "inline-flex items-center justify-center whitespace-nowrap rounded-lg border border-hairline-strong bg-white/5 px-5 py-3 text-sm font-semibold text-ink transition-colors duration-200 ease-[var(--ease-signal)] hover:border-accent/60 hover:bg-white/10";

export function SectionTitle({
  eyebrow,
  title,
  text,
  align = "center",
}: {
  eyebrow: string;
  title: ReactNode;
  text?: string;
  align?: "center" | "left";
}) {
  const centrado = align === "center";
  return (
    <div className={centrado ? "mx-auto max-w-2xl text-center" : "max-w-2xl"}>
      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-emerald-300">{eyebrow}</p>
      <h2 className="mt-4 text-3xl font-semibold tracking-tight text-white md:text-[2.75rem] md:leading-[1.08]">
        {title}
      </h2>
      {text && <p className="mt-5 text-base text-muted md:text-lg">{text}</p>}
    </div>
  );
}

/* -----------------------------------------------------------------
 * Iconos de plataforma. Trazo, nunca relleno: pesan poco y heredan color.
 * --------------------------------------------------------------- */
const trazos: Record<Icono, ReactNode> = {
  tabla: (
    <>
      <rect x="3" y="4" width="18" height="16" rx="2" />
      <path d="M3 9h18M3 14.5h18M9 9v11" />
    </>
  ),
  alerta: (
    <>
      <path d="M12 4.5 21 19.5H3z" />
      <path d="M12 10v4M12 17h.01" />
    </>
  ),
  recoleccion: (
    <>
      <rect x="3" y="5" width="18" height="16" rx="2" />
      <path d="M3 10h18M8 3v4M16 3v4" />
      <path d="m9 15 2 2 4-4" />
    </>
  ),
  desempeno: (
    <>
      <path d="M4 20V4" />
      <path d="M4 20h16" />
      <path d="M8.5 20v-6M13 20V9M17.5 20v-9.5" />
    </>
  ),
  cobros: (
    <>
      <path d="M6 3h12v18l-3-1.8-3 1.8-3-1.8L6 21z" />
      <path d="M9.5 8.5h5M9.5 12.5h5" />
    </>
  ),
  guia: (
    <>
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="M7 9v6M10 9v6M13 9v3M16 9v6" />
    </>
  ),
};

export function ModuleIcon({ name }: { name: Icono }) {
  return (
    <span className="grid h-11 w-11 place-items-center rounded-xl border border-accent/30 bg-accent/10 text-emerald-300">
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden
        className="h-5 w-5"
      >
        {trazos[name]}
      </svg>
    </span>
  );
}

/* -----------------------------------------------------------------
 * Mini diagramas de los tres pasos.
 *
 * Cada uno cuenta su propio paso con la misma gramática del sitio:
 * trazo tenue de fondo y un pulso verde recorriéndolo.
 * --------------------------------------------------------------- */
const tenue = "rgba(255,255,255,.16)";

function Trayecto({ d, dur, delay = 0 }: { d: string; dur: number; delay?: number }) {
  return (
    <>
      <path d={d} stroke={tenue} strokeWidth="1.5" vectorEffect="non-scaling-stroke" />
      <path
        className="pulse"
        style={{ "--pulse-dur": `${dur}s`, "--pulse-delay": `${delay}s` } as CSSProperties}
        d={d}
        pathLength={100}
        strokeDasharray="16 84"
        stroke="var(--color-accent)"
        strokeWidth="2"
        strokeLinecap="round"
        vectorEffect="non-scaling-stroke"
      />
    </>
  );
}

export function StepGlyph({ name }: { name: Glifo }) {
  return (
    <svg
      viewBox="0 0 132 64"
      fill="none"
      aria-hidden
      className="h-16 w-[132px] text-emerald-300"
    >
      {name === "canales" && (
        <>
          {[10, 26, 42, 58].map((y, i) => (
            <g key={y}>
              <rect x="2" y={y - 5} width="30" height="10" rx="3" stroke={tenue} />
              <Trayecto d={`M32 ${y} C 70 ${y}, 78 32, 108 32`} dur={2.8} delay={i * 0.25} />
            </g>
          ))}
          <rect x="108" y="22" width="20" height="20" rx="6" stroke="var(--color-accent)" />
        </>
      )}

      {name === "cuentas" && (
        <>
          <rect x="4" y="22" width="20" height="20" rx="6" stroke="var(--color-accent)" />
          {[10, 26, 42, 58].map((y, i) => (
            <g key={y}>
              <Trayecto d={`M24 32 C 54 32, 62 ${y}, 98 ${y}`} dur={2.8} delay={0.3 + i * 0.25} />
              <rect x="98" y={y - 5} width="30" height="10" rx="3" stroke={tenue} />
            </g>
          ))}
        </>
      )}

      {name === "opera" && (
        <>
          <rect x="6" y="6" width="120" height="52" rx="8" stroke={tenue} />
          <path d="M6 20h120" stroke={tenue} strokeWidth="1.5" />
          <path d="M34 6v52" stroke={tenue} strokeWidth="1.5" />
          <Trayecto d="M44 32 H 116" dur={2.4} />
          <Trayecto d="M44 44 H 116" dur={2.4} delay={0.6} />
          <circle cx="14" cy="13" r="2" fill={tenue} stroke="none" />
          <circle cx="22" cy="13" r="2" fill={tenue} stroke="none" />
        </>
      )}
    </svg>
  );
}
