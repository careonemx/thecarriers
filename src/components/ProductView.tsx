import { demoRows, type Tono } from "@/lib/content";
import { Reveal } from "./Reveal";
import { SectionTitle } from "./ui";

const tono: Record<Tono, string> = {
  info: "border-navy-700 bg-navy-700/45 text-navy-100",
  good: "border-accent/45 bg-accent/15 text-emerald-300",
  bad: "border-red-400/40 bg-red-400/12 text-red-300",
  warn: "border-amber-400/40 bg-amber-400/12 text-amber-200",
};

const columnas = ["Canal", "Paquetería", "Guía", "Pedido", "Estado", "Estado original"];

const menu = [
  { t: "Envíos", activo: true },
  { t: "Excepciones", activo: false },
  { t: "Recolecciones", activo: false },
  { t: "Desempeño", activo: false },
  { t: "Cobros", activo: false },
];

/**
 * La pantalla de envíos, presentada como la ventana de la aplicación.
 * Los datos son de muestra y así se dice al pie: no hay telemetría simulada
 * ni nada que sugiera que la tabla está en vivo.
 */
export function ProductView() {
  return (
    <section id="producto" className="scroll-mt-20 border-t border-hairline">
      <div className="shell py-20 md:py-28">
        <SectionTitle
          eyebrow="La plataforma por dentro"
          title="Todos tus envíos. Todas tus paqueterías."
          text="La misma pantalla para lo que entró por Shopify y para lo que salió con DHL, sin abrir el portal de nadie."
        />

        <Reveal className="mt-14">
          <div className="overflow-hidden rounded-2xl border border-hairline bg-navy-900 shadow-[0_60px_130px_-60px_rgba(0,0,0,.95)]">
            {/* Barra de la ventana */}
            <div className="flex items-center gap-3 border-b border-hairline bg-navy/60 px-4 py-3">
              <span aria-hidden className="flex gap-1.5">
                <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
                <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
                <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
              </span>
              <span className="rounded-md border border-hairline px-2.5 py-1 text-[11px] text-muted">
                TheCarriers · Envíos
              </span>
            </div>

            <div className="md:grid md:grid-cols-[196px_1fr]">
              {/* Menú lateral: decorativo, por eso no es una lista de enlaces. */}
              <div
                aria-hidden
                className="hidden flex-col gap-1 border-r border-hairline p-3 md:flex"
              >
                {menu.map((m) => (
                  <span
                    key={m.t}
                    className={`rounded-lg px-3 py-2 text-sm ${
                      m.activo
                        ? "bg-white/8 font-medium text-ink"
                        : "text-muted"
                    }`}
                  >
                    {m.t}
                  </span>
                ))}
              </div>

              <div className="min-w-0">
                <div className="flex flex-wrap items-center gap-2 border-b border-hairline px-4 py-3">
                  <span className="mr-2 text-sm font-semibold text-ink">Envíos</span>
                  <Chip>Todos · {demoRows.length}</Chip>
                  <Chip>Detenidos · 1</Chip>
                  <Chip>Por recolectar · 1</Chip>
                </div>

                {/* tabIndex hace la zona con scroll alcanzable con teclado (WCAG 2.1.1). */}
                <div
                  className="thin-scroll overflow-x-auto"
                  tabIndex={0}
                  role="region"
                  aria-label="Ejemplo de envíos de todas tus paqueterías"
                >
                  <table className="w-full min-w-[840px] text-left text-sm">
                    <caption className="sr-only">
                      Ejemplo de la pantalla de envíos: cada guía con el canal por el que entró el
                      pedido, su paquetería, el estado y el estado original de la paquetería.
                    </caption>
                    <thead className="bg-white/4 text-[11px] uppercase tracking-[0.12em] text-muted">
                      <tr>
                        {columnas.map((c) => (
                          <th key={c} scope="col" className="px-4 py-2.5 font-medium">
                            {c}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[rgba(255,255,255,.07)]">
                      {demoRows.map((r) => (
                        <tr
                          key={r.guia}
                          className="transition-colors duration-200 ease-[var(--ease-signal)] hover:bg-white/4"
                        >
                          <td className="px-4 py-3 text-muted">{r.canal}</td>
                          <td className="px-4 py-3 font-medium text-ink">{r.paqueteria}</td>
                          <td className="tabular px-4 py-3 font-mono text-xs text-muted">
                            {r.guia}
                          </td>
                          <td className="tabular px-4 py-3 text-muted">{r.pedido}</td>
                          <td className="px-4 py-3">
                            <span
                              className={`inline-flex rounded-md border px-2 py-0.5 text-xs font-medium ${tono[r.tono]}`}
                            >
                              {r.estado}
                            </span>
                          </td>
                          <td className="px-4 py-3 font-mono text-xs text-muted">{r.original}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                <p className="border-t border-hairline px-4 py-2.5 text-[11px] text-muted">
                  Ejemplo con datos de muestra.
                </p>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function Chip({ children }: { children: React.ReactNode }) {
  return (
    <span className="rounded-md border border-hairline px-2 py-1 text-[11px] text-muted">
      {children}
    </span>
  );
}
