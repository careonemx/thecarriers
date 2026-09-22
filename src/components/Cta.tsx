import { AccessForm } from "./AccessForm";

export function Cta() {
  return (
    <section id="acceso" className="scroll-mt-20 border-t border-hairline">
      <div className="shell py-20 md:py-28">
        {/* El contenedor del sitio llega a 1920 en pantallas muy anchas, y eso a
            esta tarjeta no le sirve: un párrafo y un formulario no necesitan
            1729px. Sin tope, la columna del texto se quedaba con 1135 para
            llenar 632, y los 503 que sobraban se leían como un hueco entre
            las dos mitades. */}
        <div className="relative mx-auto max-w-6xl overflow-hidden rounded-3xl border border-hairline bg-raise p-8 md:p-12">
          <div
            aria-hidden
            className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-[radial-gradient(circle,rgba(15,157,110,.22),transparent_68%)] blur-2xl"
          />
          {/* Dos huecos, no uno. El vertical: el texto es corto y el formulario
              largo, así que alineados arriba quedaban 340px de nada debajo del
              texto; centrados, ese aire se reparte. El horizontal: el
              formulario tenía media tarjeta y solo ocupaba 448px, y los 124
              que sobraban se sumaban al hueco entre columnas. Ahora su columna
              mide lo que él. */}
          <div className="relative grid gap-12 md:grid-cols-[1fr_28rem] md:items-center">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-link">
                Acceso anticipado
              </p>
              <h2 className="mt-4 text-3xl font-semibold tracking-tight text-strong md:text-4xl">
                Solicita acceso anticipado
              </h2>
              <p className="mt-5 max-w-[56ch] text-muted md:text-lg">
                Estamos incorporando un grupo reducido de empresas en México. Cuéntanos qué canales
                utilizas y con qué paqueterías trabajas.
              </p>
              <ul className="mt-8 max-w-[58ch] space-y-3 text-sm text-muted">
                {[
                  "Sin costo durante el acceso anticipado.",
                  "Conectamos tus canales y paqueterías contigo durante el onboarding.",
                  "Tus accesos son tuyos: solo se usan para operar tus envíos.",
                ].map((t) => (
                  <li key={t} className="flex gap-3">
                    <span aria-hidden className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                    {t}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <AccessForm />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
