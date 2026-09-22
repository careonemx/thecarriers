import { ConvergenceDiagram } from "./Network";
import { Reveal } from "./Reveal";
import { SectionTitle, ModuleIcon, StepGlyph, card } from "./ui";
import {
  audiences,
  canales,
  modules,
  pains,
  paqueterias,
  plataformas,
  steps,
  type Nodo,
} from "@/lib/content";

/* ---------- El problema ---------- */
export function Problem() {
  return (
    <section className="border-t border-hairline bg-banda">
      <div className="shell py-20 md:py-28">
        <SectionTitle
          eyebrow="El problema"
          title="Operar cada paquetería por separado cuesta más de lo que parece"
        />
        <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {pains.map((p, i) => (
            <Reveal key={p.t} delay={i * 70}>
              <div className={`${card} h-full`}>
                <span className="tabular font-mono text-xs text-link">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-4 text-base font-semibold text-strong">{p.t}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">{p.d}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- Cómo funciona ---------- */
export function HowItWorks() {
  return (
    <section id="como-funciona" className="scroll-mt-20 border-t border-hairline">
      <div className="shell py-20 md:py-28">
        <SectionTitle
          eyebrow="Cómo funciona"
          title={
            <>
              Tus pedidos entran por un lado.
              <br className="hidden sm:block" /> Tus guías salen por el otro.
            </>
          }
          text="En medio está TheCarriers. Conectamos tus canales y tus paqueterías contigo durante el onboarding."
        />

        <Reveal className="mt-14">
          <ConvergenceDiagram />
        </Reveal>

        {/* Tres columnas desde `lg` y no desde `md`: con el dibujo al lado, a
            768px el título se partía en cuatro renglones. Entre medias va una
            tarjeta por fila, donde sobra sitio. */}
        <ol className="mt-12 grid gap-4 lg:grid-cols-3">
          {steps.map((s, i) => (
            <Reveal key={s.n} delay={i * 90}>
              <li className={`${card} flex h-full items-start gap-4`}>
                <StepGlyph name={s.glifo} />
                <div className="min-w-0">
                  <p className="tabular font-mono text-xs text-link">{s.n}</p>
                  <h3 className="mt-1.5 text-lg font-semibold text-strong">{s.t}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted">{s.d}</p>
                </div>
              </li>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}

/* ---------- Integraciones ---------- */
export function Integrations() {
  return (
    <section id="integraciones" className="scroll-mt-20 border-t border-hairline bg-banda">
      <div className="shell py-20 md:py-28">
        <SectionTitle
          eyebrow="Compatibilidad"
          title="Compatible con lo que ya usas"
          text="Te conectamos a las cuentas que ya tienes contratadas con cada canal de venta y cada paquetería."
        />

        {/* Canales y paqueterías tienen seis cada uno, así que emparejan. Las
            plataformas van abajo, en su propia fila: revenden guías de esas
            mismas paqueterías y mezclarlas sería impreciso. */}
        <div className="mt-14 grid items-start gap-4 lg:grid-cols-2">
          <Reveal>
            <Grupo titulo="Canales" items={canales} />
          </Reveal>
          <Reveal delay={90}>
            <Grupo titulo="Paqueterías" items={paqueterias} />
          </Reveal>
        </div>

        <Reveal className="mt-4">
          <Grupo
            titulo="Plataformas de envío"
            items={plataformas}
            nota="Si ya compras tus guías a través de una de estas, también se conecta."
            /* Auto-fit en vez de un número fijo: con cuatro plataformas cabían
               justas, y al entrar la quinta quedaba sola en una segunda fila,
               como si fuera distinta de las demás. Así la rejilla se ajusta a
               cuantas haya sin que nadie tenga que venir a contar. */
            columnas="grid-cols-[repeat(auto-fit,minmax(190px,1fr))]"
          />
        </Reveal>

        <p className="mt-8 text-center text-sm text-muted">
          ¿Usas otro canal u otra paquetería?{" "}
          <a
            href="#acceso"
            className="font-medium text-link underline underline-offset-4 transition-colors duration-200 hover:text-strong"
          >
            Cuéntanos cuál necesitas.
          </a>
        </p>
      </div>
    </section>
  );
}

function Grupo({
  titulo,
  items,
  nota,
  columnas = "sm:grid-cols-2",
}: {
  titulo: string;
  items: Nodo[];
  nota?: string;
  columnas?: string;
}) {
  return (
    <div className="rounded-2xl border border-hairline bg-raise p-6">
      <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
        <p className="text-xs font-semibold uppercase tracking-[0.16em] text-muted">{titulo}</p>
        {nota && <p className="text-xs text-muted">{nota}</p>}
      </div>
      <ul className={`mt-5 grid gap-2.5 ${columnas}`}>
        {items.map((it) => (
          <li
            key={it.nombre}
            className="flex items-center gap-3 rounded-xl border border-hairline bg-control px-3 py-3 transition-colors duration-300 ease-[var(--ease-signal)] hover:border-accent/40 hover:bg-control-fuerte"
          >
            {/* Monograma tipográfico nuestro, no el logotipo de la marca. */}
            <span
              aria-hidden
              className="grid h-8 w-8 shrink-0 place-items-center rounded-md border border-hairline bg-inset font-mono text-[11px] text-ink"
            >
              {it.sigla}
            </span>
            <span className="truncate text-sm font-medium text-ink">{it.nombre}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

/* ---------- Plataforma ---------- */
export function Platform() {
  return (
    <section id="plataforma" className="scroll-mt-20 border-t border-hairline">
      <div className="shell py-20 md:py-28">
        <SectionTitle
          eyebrow="Plataforma"
          title="Lo que tu equipo hace desde una sola pantalla"
        />
        <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {modules.map((m, i) => (
            <Reveal key={m.t} delay={(i % 3) * 80}>
              <div className={`${card} h-full`}>
                <ModuleIcon name={m.icono} />
                <h3 className="mt-5 text-base font-semibold text-strong">{m.t}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">{m.d}</p>
              </div>
            </Reveal>
          ))}
        </div>

        <div className="mt-10 text-center">
          <a
            href="#acceso"
            className="group inline-flex items-center gap-2 text-sm font-semibold text-link transition-colors duration-200 hover:text-strong"
          >
            Conocer la plataforma
            <span
              aria-hidden
              className="transition-transform duration-300 ease-[var(--ease-signal)] group-hover:translate-x-1"
            >
              →
            </span>
          </a>
        </div>
      </div>
    </section>
  );
}

/* ---------- Para quién ---------- */
export function Audience() {
  return (
    <section id="para-quien" className="scroll-mt-20 border-t border-hairline bg-banda">
      <div className="shell py-20 md:py-28">
        <SectionTitle eyebrow="Para quién" title="Para quién está hecho" />
        <div className="mt-14 grid gap-4 md:grid-cols-3">
          {audiences.map((a, i) => (
            <Reveal key={a.t} delay={i * 80}>
              <div className={`${card} h-full`}>
                <h3 className="text-lg font-semibold text-strong">{a.t}</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted">{a.d}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
