import { HeroNetwork } from "./Network";
import { hero } from "@/lib/content";
import { btnFantasma, btnPrimario } from "./ui";

export function Hero() {
  return (
    <section className="relative">
      {/* Un solo resplandor, detrás del titular. Nada de tramas de fondo. */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[640px] bg-[radial-gradient(60%_58%_at_50%_0%,var(--halo-hero),transparent_72%)]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-[120px] -z-10 h-[420px] bg-[radial-gradient(38%_52%_at_50%_0%,rgba(15,157,110,.16),transparent_70%)]"
      />

      <div className="shell pb-20 pt-16 md:pb-28 md:pt-24">
        <div className="mx-auto max-w-3xl text-center">
          {/* En lg+ este indicador vive en la barra superior. */}
          <p className="mb-6 inline-flex items-center gap-2 rounded-full border border-hairline bg-control px-3 py-1 text-xs font-medium text-muted lg:hidden">
            <span className="h-1.5 w-1.5 rounded-full bg-accent" />
            {hero.eyebrow}
          </p>

          <h1 className="text-4xl font-semibold leading-[1.05] tracking-tight text-strong md:text-6xl xl:text-7xl">
            {hero.h1[0]}
            <br />
            <span className="text-muted">{hero.h1[1]}</span>
          </h1>

          <p className="mx-auto mt-7 max-w-2xl text-base leading-relaxed text-muted md:text-lg">
            {hero.sub}
          </p>

          <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <a href="#acceso" className={`${btnPrimario} w-full max-w-xs sm:w-auto`}>
              Solicitar acceso anticipado
            </a>
            <a href="#como-funciona" className={`${btnFantasma} w-full max-w-xs sm:w-auto`}>
              Ver cómo funciona
            </a>
          </div>

          <p className="mt-7 text-sm font-medium text-link">{hero.claim}</p>
          <p className="mx-auto mt-3 max-w-xl text-xs text-muted">{hero.nota}</p>
        </div>

        <div className="mt-16 md:mt-20">
          <HeroNetwork />
        </div>
      </div>
    </section>
  );
}
