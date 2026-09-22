import type { CSSProperties, ReactNode } from "react";
import type { Glifo, Icono } from "@/lib/content";

/* -----------------------------------------------------------------
 * Piezas comunes del sistema oscuro.
 * --------------------------------------------------------------- */

/** Tarjeta base. El hover levanta el borde, no el contenido. */
export const card =
  "rounded-2xl border border-hairline bg-raise p-6 shadow-[var(--sombra-tarjeta)] transition-[border-color,background-color,box-shadow] duration-300 ease-[var(--ease-signal)] hover:border-hairline-strong hover:bg-raise hover:shadow-[var(--sombra-tarjeta-hover)]";

/* Texto oscuro sobre el verde de marca: blanco sobre accent da 3.46:1 y
   reprueba AA; abyss sobre accent da 5.32:1. El hover aclara en vez de
   oscurecer, porque accent-600 dejaría el texto oscuro sin contraste. */
export const btnPrimario =
  "inline-flex items-center justify-center whitespace-nowrap rounded-lg bg-accent-solid px-5 py-3 text-sm font-semibold text-on-accent shadow-[0_18px_40px_-22px_rgba(15,157,110,.9)] transition-[filter,box-shadow] duration-200 ease-[var(--ease-signal)] hover:brightness-110";

export const btnFantasma =
  "inline-flex items-center justify-center whitespace-nowrap rounded-lg border border-hairline-strong bg-control px-5 py-3 text-sm font-semibold text-ink transition-colors duration-200 ease-[var(--ease-signal)] hover:border-accent/60 hover:bg-control-fuerte";

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
      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-link">{eyebrow}</p>
      <h2 className="mt-4 text-3xl font-semibold tracking-tight text-strong md:text-[2.75rem] md:leading-[1.08]">
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
    <span className="grid h-11 w-11 place-items-center rounded-xl border border-accent/30 bg-accent/10 text-link">
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
const tenue = "var(--trazo-fuerte)";

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

/* Los tres glifos comparten caja y, sobre todo, la MISMA zona útil dentro de
   ella: x de 6 a 126, y de 8 a 56. Sin eso cada uno se estiraba hasta donde
   le pedía su propio dibujo —el primero llegaba al borde de abajo y el
   tercero se quedaba flotando— y las tres tarjetas, puestas en fila, no
   casaban. La caja es la misma; lo que hay que igualar es el contenido. */
const G = { x0: 6, x1: 126, y0: 8, y1: 56, cy: 32 };

/** Los cuatro carriles del abanico, repartidos dentro de la zona útil. */
const CARRILES = [13, 26, 39, 52];

export function StepGlyph({ name }: { name: Glifo }) {
  return (
    <svg
      viewBox="0 0 132 64"
      fill="none"
      aria-hidden
      className="h-16 w-[132px] text-link"
    >
      {name === "canales" && (
        <>
          {CARRILES.map((y, i) => (
            <g key={y}>
              <rect x={G.x0} y={y - 5} width="30" height="10" rx="3" stroke={tenue} />
              <Trayecto d={`M36 ${y} C 72 ${y}, 78 ${G.cy}, 104 ${G.cy}`} dur={2.8} delay={i * 0.25} />
            </g>
          ))}
          <rect x="104" y={G.cy - 10} width="20" height="20" rx="6" stroke="var(--color-accent)" />
        </>
      )}

      {name === "cuentas" && (
        <>
          <rect x={G.x0 + 2} y={G.cy - 10} width="20" height="20" rx="6" stroke="var(--color-accent)" />
          {CARRILES.map((y, i) => (
            <g key={y}>
              <Trayecto d={`M28 ${G.cy} C 60 ${G.cy}, 66 ${y}, 96 ${y}`} dur={2.8} delay={0.3 + i * 0.25} />
              <rect x="96" y={y - 5} width="30" height="10" rx="3" stroke={tenue} />
            </g>
          ))}
        </>
      )}

      {name === "opera" && (
        <>
          <rect
            x={G.x0}
            y={G.y0}
            width={G.x1 - G.x0}
            height={G.y1 - G.y0}
            rx="8"
            stroke={tenue}
          />
          <path d={`M${G.x0} 22 H ${G.x1}`} stroke={tenue} strokeWidth="1.5" />
          <path d={`M34 ${G.y0} V ${G.y1}`} stroke={tenue} strokeWidth="1.5" />
          <Trayecto d="M44 34 H 116" dur={2.4} />
          <Trayecto d="M44 46 H 116" dur={2.4} delay={0.6} />
          <circle cx="14" cy="15" r="2" fill={tenue} stroke="none" />
          <circle cx="22" cy="15" r="2" fill={tenue} stroke="none" />
        </>
      )}
    </svg>
  );
}
