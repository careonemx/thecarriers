import { demoRows, type Tono } from "@/lib/content";
import { Reveal } from "./Reveal";
import { SectionTitle } from "./ui";

/* Las mismas cuatro pastillas del administrador, con los colores de este
   sitio. Ahí están escritas como `pastilla--ok`, `--mal`, `--aviso`; aquí
   llevan los tokens del tema, así que la maqueta cambia con la página. */
const tono: Record<Tono, string> = {
  info: "border-hairline-strong text-muted",
  good: "border-accent/45 bg-accent/12 text-link",
  bad: "border-mal-borde bg-mal-fondo text-mal",
  warn: "border-aviso-borde bg-aviso-fondo text-aviso",
};

const columnas = ["Pedido", "Cliente", "Destino", "Total", "Pago", "Envío"];

/* El menú del administrador, con sus grupos. Es lo que ve quien entra, y por
   eso la maqueta lo copia en vez de inventarse una lista más corta. */
const menu = [
  { grupo: "Operación", items: ["Inicio", "Pedidos", "Tracking", "Recolecciones"] },
  { grupo: "Análisis", items: ["Desempeño", "Cobros", "Correcciones"] },
  { grupo: "Ajustes", items: ["Canales de venta", "Paqueterías", "Configuración"] },
];

const ACTIVO = "Pedidos";

/* Las pestañas reales de Pedidos. Los números salen de las filas de muestra,
   no de una cifra escrita a mano que un día deje de cuadrar con la tabla. */
const pestanas = [
  { t: "Todos", n: demoRows.length },
  { t: "Sin guía", n: demoRows.filter((r) => r.envio === "Sin guía").length },
  { t: "En tránsito", n: demoRows.filter((r) => r.envioTono === "good").length },
  { t: "Detenidos", n: demoRows.filter((r) => r.envioTono === "bad").length },
];

/**
 * La pantalla de Pedidos del administrador, presentada como la ventana de la
 * aplicación. Los datos son de muestra y así se dice al pie: no hay
 * telemetría simulada ni nada que sugiera que la tabla está en vivo.
 */
export function ProductView() {
  return (
    <section id="producto" className="scroll-mt-20 border-t border-hairline">
      <div className="shell py-20 md:py-28">
        <SectionTitle
          eyebrow="La plataforma por dentro"
          title="Todos tus pedidos. Todas tus paqueterías."
          text="La misma pantalla para lo que entró por Shopify y para lo que salió con DHL, sin abrir el portal de nadie."
        />

        <Reveal className="mt-14">
          <div className="overflow-hidden rounded-2xl border border-hairline bg-raise shadow-[var(--sombra-tarjeta)]">
            {/* Barra de la ventana */}
            <div className="flex items-center gap-3 border-b border-hairline bg-banda px-4 py-3">
              <span aria-hidden className="flex gap-1.5">
                <span className="h-2.5 w-2.5 rounded-full bg-hairline-strong" />
                <span className="h-2.5 w-2.5 rounded-full bg-hairline-strong" />
                <span className="h-2.5 w-2.5 rounded-full bg-hairline-strong" />
              </span>
              <span className="rounded-md border border-hairline px-2.5 py-1 text-[11px] text-muted">
                The Carriers · Pedidos
              </span>
            </div>

            <div className="md:grid md:grid-cols-[208px_1fr]">
              {/* Menú lateral: decorativo, por eso no es una lista de enlaces. */}
              <div
                aria-hidden
                className="hidden flex-col gap-0.5 border-r border-hairline p-3 md:flex"
              >
                {menu.map((g) => (
                  <div key={g.grupo} className="mb-1">
                    <p className="px-3 pb-1 pt-2 text-[10px] uppercase tracking-[0.14em] text-muted">
                      {g.grupo}
                    </p>
                    {g.items.map((it) => (
                      <span
                        key={it}
                        className={`block rounded-lg px-3 py-1.5 text-[13px] ${
                          it === ACTIVO ? "bg-control-fuerte font-medium text-ink" : "text-muted"
                        }`}
                      >
                        {it}
                      </span>
                    ))}
                  </div>
                ))}
              </div>

              <div className="min-w-0">
                <div className="flex flex-wrap items-center gap-2 border-b border-hairline px-4 py-3">
                  <span className="mr-2 text-sm font-semibold text-ink">Pedidos</span>
                  {pestanas.map((p, i) => (
                    <Chip key={p.t} activa={i === 0}>
                      {p.t} · {p.n}
                    </Chip>
                  ))}
                </div>

                {/* tabIndex hace la zona con scroll alcanzable con teclado (WCAG 2.1.1). */}
                <div
                  className="thin-scroll overflow-x-auto"
                  tabIndex={0}
                  role="region"
                  aria-label="Ejemplo de la lista de pedidos"
                >
                  <table className="w-full min-w-[880px] text-left text-sm">
                    <caption className="sr-only">
                      Ejemplo de la pantalla de Pedidos: cada pedido con su cliente, su destino, si
                      está pagado y en qué va su envío.
                    </caption>
                    <thead className="bg-control text-[11px] uppercase tracking-[0.12em] text-muted">
                      <tr>
                        {columnas.map((c) => (
                          <th key={c} scope="col" className="px-4 py-2.5 font-medium">
                            {c}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-hairline">
                      {demoRows.map((r) => (
                        <tr
                          key={r.folio}
                          className="transition-colors duration-200 ease-[var(--ease-signal)] hover:bg-control-fuerte"
                        >
                          <td className="px-4 py-3">
                            <span className="tabular font-mono text-xs text-link">{r.folio}</span>
                            <span className="mt-0.5 block text-[11px] text-muted">{r.fecha}</span>
                          </td>
                          <td className="px-4 py-3">
                            <span className="text-ink">{r.cliente}</span>
                            <span className="mt-0.5 block truncate text-[11px] text-muted">
                              {r.correo}
                            </span>
                          </td>
                          <td className="px-4 py-3">
                            <span className="text-ink">{r.destino}</span>
                            <span className="mt-0.5 block text-[11px] text-muted">{r.ciudad}</span>
                          </td>
                          <td className="tabular whitespace-nowrap px-4 py-3 text-ink">
                            {r.total}
                          </td>
                          <td className="px-4 py-3">
                            <Pastilla tono={r.pagoTono}>{r.pago}</Pastilla>
                          </td>
                          <td className="px-4 py-3">
                            {/* Con guía se enseña el número, en monoespaciada
                                como en el administrador; sin ella, el motivo. */}
                            <Pastilla tono={r.envioTono}>
                              {r.envioTono === "good" ? (
                                <span className="tabular font-mono">{r.envio}</span>
                              ) : (
                                r.envio
                              )}
                            </Pastilla>
                          </td>
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

function Chip({ children, activa = false }: { children: React.ReactNode; activa?: boolean }) {
  return (
    <span
      className={`rounded-md border px-2 py-1 text-[11px] ${
        activa ? "border-hairline-strong bg-control-fuerte text-ink" : "border-hairline text-muted"
      }`}
    >
      {children}
    </span>
  );
}

function Pastilla({ tono: t, children }: { tono: Tono; children: React.ReactNode }) {
  return (
    <span
      className={`inline-flex rounded-md border px-2 py-0.5 text-xs font-medium ${tono[t]}`}
    >
      {children}
    </span>
  );
}
