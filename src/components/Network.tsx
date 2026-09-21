"use client";

import { useState, type CSSProperties } from "react";
import { Mark } from "./Logo";
import { canales, destinos, rotuloDestinos, type Nodo } from "@/lib/content";

/**
 * El lenguaje visual del sitio: muchos canales entran a una sola plataforma y
 * desde ahí salen muchas paqueterías.
 *
 * Tres composiciones distintas sobre la misma gramática (fichas, cables,
 * pulsos, nodo central), no el mismo componente repetido:
 *
 *   HeroNetwork          la pieza grande, con monogramas y reacción al hover
 *   ConvergenceDiagram   la versión compacta de "Cómo funciona"
 *   ApiFlow              el mismo flujo en vertical, para la sección de API
 *
 * La geometría es explícita y compartida: las columnas reparten sus fichas con
 * `justify-between` sobre una altura fija, y el SVG mide exactamente lo mismo,
 * así que cada curva nace en el centro de su ficha.
 */
const chipY = (i: number, n: number, colH: number, chipH: number) =>
  ((colH - chipH) * i) / (n - 1) + chipH / 2;

/**
 * Las dos columnas miden lo mismo pero no tienen la misma cantidad de fichas:
 * seis canales contra diez paqueterías. Con un alto de ficha único, la columna
 * corta queda con huecos enormes o la larga se desborda. Así que cada columna
 * calcula el suyo: llena `colH` dejando al menos `hueco` entre fichas, sin
 * pasar de `max` para que tres fichas no se conviertan en tres losas.
 */
const altoFicha = (n: number, colH: number, max: number, hueco = 8) =>
  Math.min(max, Math.floor((colH - (n - 1) * hueco) / n));

/* -----------------------------------------------------------------
 * Cables
 * --------------------------------------------------------------- */
function Wires({
  dir,
  n,
  w,
  colH,
  chipH,
  activo,
}: {
  dir: "in" | "out";
  n: number;
  w: number;
  colH: number;
  chipH: number;
  activo?: number | null;
}) {
  const mid = colH / 2;
  return (
    <svg
      width={w}
      height={colH}
      viewBox={`0 0 ${w} ${colH}`}
      fill="none"
      aria-hidden
      className="shrink-0"
    >
      {Array.from({ length: n }, (_, i) => {
        const y = chipY(i, n, colH, chipH);
        const d =
          dir === "in"
            ? `M0 ${y} C ${w * 0.55} ${y}, ${w * 0.45} ${mid}, ${w} ${mid}`
            : `M0 ${mid} C ${w * 0.55} ${mid}, ${w * 0.45} ${y}, ${w} ${y}`;
        const encendido = activo === i;
        return (
          <g key={i}>
            <path
              d={d}
              strokeWidth="1.5"
              stroke={encendido ? "rgba(15,157,110,.85)" : "rgba(255,255,255,.14)"}
              className="transition-[stroke] duration-300 ease-[var(--ease-signal)]"
            />
            {/* El pedido viajando: entra por los canales, sale por las paqueterías. */}
            <path
              className="pulse"
              style={
                {
                  "--pulse-dur": `${3 + i * 0.2}s`,
                  "--pulse-delay": `${(dir === "in" ? 0 : 1.3) + i * 0.28}s`,
                } as CSSProperties
              }
              d={d}
              pathLength={100}
              strokeDasharray="7 93"
              stroke="var(--color-accent)"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </g>
        );
      })}
    </svg>
  );
}

/* -----------------------------------------------------------------
 * Nodo central
 * --------------------------------------------------------------- */
function CoreNode({
  titulo = "TheCarriers",
  pie = "Una sola plataforma",
  alto = 34,
  className = "",
}: {
  titulo?: string;
  pie?: string;
  alto?: number;
  className?: string;
}) {
  return (
    <div className={`relative shrink-0 ${className}`}>
      <div
        aria-hidden
        className="halo pointer-events-none absolute -inset-8 rounded-full bg-[radial-gradient(circle,rgba(15,157,110,.38),transparent_68%)] blur-2xl"
      />
      <div className="relative flex flex-col items-center justify-center rounded-2xl border border-accent/40 bg-navy px-4 py-6 text-center shadow-[0_24px_70px_-30px_rgba(15,157,110,.9)]">
        <Mark variant="white" height={alto} />
        <p className="mt-3 text-sm font-semibold leading-tight text-white">{titulo}</p>
        <p className="mt-1 text-[11px] leading-tight text-muted">{pie}</p>
      </div>
    </div>
  );
}

/* -----------------------------------------------------------------
 * HeroNetwork — la pieza grande
 * --------------------------------------------------------------- */
const H_COL = 480;
const H_WIRE = 104;
const H_CHIP_MAX = 52;

export function HeroNetwork() {
  const [activo, setActivo] = useState<{ lado: "in" | "out"; i: number } | null>(null);

  return (
    <div className="relative">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(55%_60%_at_50%_45%,rgba(15,157,110,.13),transparent_70%)]"
      />
      <div className="rounded-2xl border border-hairline bg-navy-900/60 p-5 backdrop-blur-sm sm:p-8">
        {/* Desde lg: canales a la izquierda, TheCarriers al centro, paqueterías a la derecha.
            Los rótulos van en su propia fila, con las mismas proporciones: si
            viven dentro de la columna, empujan el SVG y los cables nacen arriba
            del centro de su ficha. */}
        <div className="mx-auto hidden max-w-[1060px] lg:block">
          <div className="mb-4 flex items-end">
            <Rotulo alineado>Tus canales de venta</Rotulo>
            <span aria-hidden style={{ width: H_WIRE }} className="shrink-0" />
            <span aria-hidden className="w-[172px] shrink-0" />
            <span aria-hidden style={{ width: H_WIRE }} className="shrink-0" />
            <Rotulo alineado>{rotuloDestinos}</Rotulo>
          </div>

          <div className="flex items-center">
            <Columna items={canales} lado="in" activo={activo} onActivo={setActivo} />
            <Wires
              dir="in"
              n={canales.length}
              w={H_WIRE}
              colH={H_COL}
              chipH={altoFicha(canales.length, H_COL, H_CHIP_MAX)}
              activo={activo?.lado === "in" ? activo.i : null}
            />
            <CoreNode alto={38} className="w-[172px]" />
            <Wires
              dir="out"
              n={destinos.length}
              w={H_WIRE}
              colH={H_COL}
              chipH={altoFicha(destinos.length, H_COL, H_CHIP_MAX)}
              activo={activo?.lado === "out" ? activo.i : null}
            />
            <Columna items={destinos} lado="out" activo={activo} onActivo={setActivo} />
          </div>
        </div>

        {/* Bajo lg, el mismo flujo de arriba hacia abajo. */}
        <div className="lg:hidden">
          <FlujoVertical />
        </div>
      </div>
    </div>
  );
}

function Columna({
  items,
  lado,
  activo,
  onActivo,
}: {
  items: Nodo[];
  lado: "in" | "out";
  activo: { lado: "in" | "out"; i: number } | null;
  onActivo: (v: { lado: "in" | "out"; i: number } | null) => void;
}) {
  const alto = altoFicha(items.length, H_COL, H_CHIP_MAX);
  return (
    <div className="min-w-0 flex-1">
      <ul className="flex flex-col justify-between" style={{ height: H_COL }}>
        {items.map((it, i) => {
          const encendido = activo?.lado === lado && activo.i === i;
          return (
            <li
              key={it.nombre}
              style={{ height: alto }}
              onMouseEnter={() => onActivo({ lado, i })}
              onMouseLeave={() => onActivo(null)}
              className={`flex items-center gap-2.5 rounded-xl border px-3 transition-colors duration-300 ease-[var(--ease-signal)] ${
                encendido
                  ? "border-accent/50 bg-navy"
                  : "border-hairline bg-navy-900"
              }`}
            >
              <Sigla texto={it.sigla} encendido={encendido} />
              <span className="truncate text-xs font-medium text-ink">{it.nombre}</span>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

/** Monograma tipográfico nuestro. No es el logotipo de la marca. */
function Sigla({ texto, encendido = false }: { texto: string; encendido?: boolean }) {
  return (
    <span
      aria-hidden
      className={`grid h-7 w-7 shrink-0 place-items-center rounded-md border font-mono text-[10px] transition-colors duration-300 ease-[var(--ease-signal)] ${
        encendido
          ? "border-accent/50 bg-accent/20 text-emerald-300"
          : "border-hairline bg-white/5 text-muted"
      }`}
    >
      {texto}
    </span>
  );
}

/* -----------------------------------------------------------------
 * Versión vertical, para pantallas angostas
 * --------------------------------------------------------------- */
function FlujoVertical() {
  return (
    <div className="mx-auto max-w-md">
      <Rotulo>Tus canales de venta</Rotulo>
      <Rejilla items={canales} />
      <Flechas dir="in" />
      <CoreNode alto={30} className="mx-auto w-44" />
      <Flechas dir="out" />
      <Rotulo className="mt-2">{rotuloDestinos}</Rotulo>
      <Rejilla items={destinos} />
    </div>
  );
}

function Rotulo({
  children,
  className = "",
  alineado = false,
}: {
  children: string;
  className?: string;
  alineado?: boolean;
}) {
  return (
    <p
      className={`text-[11px] font-semibold uppercase tracking-[0.16em] text-muted ${
        alineado ? "min-w-0 flex-1" : "mb-3 text-center"
      } ${className}`}
    >
      {children}
    </p>
  );
}

function Rejilla({ items }: { items: Nodo[] }) {
  return (
    <ul className="grid grid-cols-2 gap-2">
      {items.map((it) => (
        <li
          key={it.nombre}
          className="flex min-h-11 items-center gap-2 rounded-xl border border-hairline bg-navy-900 px-2.5 py-2"
        >
          <Sigla texto={it.sigla} />
          {/* Sin truncar: "API / sistema propio" no cabe en una línea a 390px. */}
          <span className="text-[11px] font-medium leading-tight text-ink">{it.nombre}</span>
        </li>
      ))}
    </ul>
  );
}

/** Dos columnas en la rejilla angosta: las flechas nacen de esos dos centros. */
function Flechas({ dir }: { dir: "in" | "out" }) {
  const cols = [75, 225];
  return (
    <svg
      viewBox="0 0 300 44"
      preserveAspectRatio="none"
      fill="none"
      aria-hidden
      className="my-3 h-9 w-full"
    >
      {cols.map((x, i) => {
        const d =
          dir === "in" ? `M${x} 0 C ${x} 24, 150 20, 150 44` : `M150 0 C 150 24, ${x} 20, ${x} 44`;
        return (
          <g key={x}>
            <path
              d={d}
              stroke="rgba(255,255,255,.14)"
              strokeWidth="1.5"
              vectorEffect="non-scaling-stroke"
            />
            <path
              className="pulse"
              style={
                {
                  "--pulse-dur": "2.8s",
                  "--pulse-delay": `${(dir === "in" ? 0 : 1.2) + i * 0.35}s`,
                } as CSSProperties
              }
              d={d}
              pathLength={100}
              strokeDasharray="10 90"
              stroke="var(--color-accent)"
              strokeWidth="2"
              strokeLinecap="round"
              vectorEffect="non-scaling-stroke"
            />
          </g>
        );
      })}
    </svg>
  );
}

/* -----------------------------------------------------------------
 * ConvergenceDiagram — la versión compacta de "Cómo funciona"
 * --------------------------------------------------------------- */
const C_COL = 400;
const C_WIRE = 76;
const C_CHIP_MAX = 44;

const chipCompacta =
  "flex items-center justify-center rounded-md border border-hairline bg-navy-900 px-2 text-center text-[11px] font-medium leading-tight text-ink transition-colors duration-300 ease-[var(--ease-signal)] hover:border-hairline-strong hover:bg-navy sm:text-xs";

export function ConvergenceDiagram() {
  const altoCanal = altoFicha(canales.length, C_COL, C_CHIP_MAX);
  const altoPaq = altoFicha(destinos.length, C_COL, C_CHIP_MAX);
  return (
    <div className="rounded-2xl border border-hairline bg-navy-900/60 p-5 sm:p-6">
      <div className="mx-auto hidden max-w-[920px] items-center lg:flex">
        <ul className="flex min-w-0 flex-1 flex-col justify-between" style={{ height: C_COL }}>
          {canales.map((c) => (
            <li key={c.nombre} style={{ height: altoCanal }} className={chipCompacta}>
              {c.nombre}
            </li>
          ))}
        </ul>
        <Wires dir="in" n={canales.length} w={C_WIRE} colH={C_COL} chipH={altoCanal} />
        <CoreNode alto={30} className="w-[150px]" />
        <Wires dir="out" n={destinos.length} w={C_WIRE} colH={C_COL} chipH={altoPaq} />
        <ul className="flex min-w-0 flex-1 flex-col justify-between" style={{ height: C_COL }}>
          {destinos.map((p) => (
            <li key={p.nombre} style={{ height: altoPaq }} className={chipCompacta}>
              {p.nombre}
            </li>
          ))}
        </ul>
      </div>

      <div className="lg:hidden">
        <FlujoVertical />
      </div>

      <div className="mt-6 grid gap-3 border-t border-hairline pt-5 text-center text-[11px] text-muted sm:grid-cols-3">
        <span className="rounded-md bg-white/5 px-2 py-1.5">Tus canales de venta</span>
        <span className="rounded-md bg-white/5 px-2 py-1.5">Tu equipo, en una pantalla</span>
        <span className="rounded-md bg-white/5 px-2 py-1.5">{rotuloDestinos}</span>
      </div>
    </div>
  );
}

/* -----------------------------------------------------------------
 * ApiFlow — el mismo flujo, en vertical
 * --------------------------------------------------------------- */
export function ApiFlow() {
  return (
    <div className="rounded-2xl border border-hairline bg-navy-900/60 p-6">
      <div className="mx-auto flex max-w-sm flex-col items-center">
        <div className="flex w-full items-center gap-3 rounded-xl border border-hairline bg-navy-900 px-4 py-3">
          <Sigla texto="{}" />
          <span className="text-sm font-medium text-ink">Tu sistema propio</span>
        </div>

        <Bajada />

        <div className="relative w-full">
          <div
            aria-hidden
            className="halo pointer-events-none absolute -inset-6 rounded-full bg-[radial-gradient(circle,rgba(15,157,110,.32),transparent_70%)] blur-2xl"
          />
          <div className="relative flex w-full items-center gap-3 rounded-xl border border-accent/40 bg-navy px-4 py-4 shadow-[0_24px_70px_-34px_rgba(15,157,110,.9)]">
            <Mark variant="white" height={26} />
            <div>
              <p className="text-sm font-semibold leading-tight text-white">TheCarriers API</p>
              <p className="mt-0.5 text-[11px] leading-tight text-muted">Una sola integración</p>
            </div>
          </div>
        </div>

        <Abanico />

        {/* Tres columnas fijas: el abanico termina exactamente en sus centros. */}
        <ul className="grid w-full grid-cols-3 gap-2">
          {destinos.map((p) => (
            <li
              key={p.nombre}
              className="truncate rounded-md border border-hairline bg-navy-900 px-2 py-1.5 text-center text-[11px] font-medium text-ink"
            >
              {p.nombre}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

function Bajada() {
  return (
    <svg viewBox="0 0 2 40" preserveAspectRatio="none" fill="none" aria-hidden className="h-10 w-px">
      <path d="M1 0 V40" stroke="rgba(255,255,255,.16)" strokeWidth="1.5" vectorEffect="non-scaling-stroke" />
      <path
        className="pulse"
        style={{ "--pulse-dur": "2.4s" } as CSSProperties}
        d="M1 0 V40"
        pathLength={100}
        strokeDasharray="22 78"
        stroke="var(--color-accent)"
        strokeWidth="2.5"
        strokeLinecap="round"
        vectorEffect="non-scaling-stroke"
      />
    </svg>
  );
}

/** Un trazo por columna de la rejilla de abajo: 300/3 = 100, centros en 50, 150 y 250. */
function Abanico() {
  return (
    <svg
      viewBox="0 0 300 40"
      preserveAspectRatio="none"
      fill="none"
      aria-hidden
      className="my-3 h-10 w-full"
    >
      {[50, 150, 250].map((x, i) => {
        const d = `M150 0 C 150 22, ${x} 18, ${x} 40`;
        return (
          <g key={i}>
            <path
              d={d}
              stroke="rgba(255,255,255,.14)"
              strokeWidth="1.5"
              vectorEffect="non-scaling-stroke"
            />
            <path
              className="pulse"
              style={
                { "--pulse-dur": "2.6s", "--pulse-delay": `${0.5 + i * 0.22}s` } as CSSProperties
              }
              d={d}
              pathLength={100}
              strokeDasharray="14 86"
              stroke="var(--color-accent)"
              strokeWidth="2"
              strokeLinecap="round"
              vectorEffect="non-scaling-stroke"
            />
          </g>
        );
      })}
    </svg>
  );
}
