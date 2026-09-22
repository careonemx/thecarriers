"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Lockup } from "./Logo";
import { nav } from "@/lib/content";
import { APP_URL } from "@/lib/site";

export function Header() {
  const [open, setOpen] = useState(false);

  // El panel no debe sobrevivir a un cambio de ancho ni a la tecla Escape.
  useEffect(() => {
    const mq = window.matchMedia("(min-width: 768px)");
    const cerrar = () => setOpen(false);
    mq.addEventListener("change", cerrar);
    return () => mq.removeEventListener("change", cerrar);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <header className="sticky top-0 z-40 border-b border-hairline bg-abyss/80 backdrop-blur-md">
      <div className="shell flex h-16 items-center justify-between gap-4">
        <div className="flex min-w-0 items-center gap-4">
          <Link
            href="/"
            aria-label="TheCarriers, inicio"
            className="inline-flex shrink-0 items-center"
          >
            <Lockup variant="white" height={26} priority />
          </Link>
          <span className="hidden items-center gap-2 rounded-full border border-hairline px-2.5 py-1 text-[11px] font-medium text-muted lg:inline-flex">
            <span className="h-1.5 w-1.5 rounded-full bg-accent" />
            Acceso anticipado · México
          </span>
        </div>

        {/* Desde md, no desde lg: entre 768 y 1023 el menú quedaba inalcanzable. */}
        <nav
          aria-label="Principal"
          className="hidden items-center gap-5 text-sm font-medium text-muted md:flex lg:gap-7"
        >
          {nav.map((n) => (
            <a
              key={n.href}
              href={n.href}
              className="py-1 transition-colors duration-200 ease-[var(--ease-signal)] hover:text-ink"
            >
              {n.label}
            </a>
          ))}
        </nav>

        <div className="flex shrink-0 items-center gap-2">
          {/* Desde sm: en pantallas muy angostas compite con el botón principal. */}
          <a
            href={APP_URL}
            className="hidden px-2 py-2.5 text-sm font-medium text-muted transition-colors duration-200 ease-[var(--ease-signal)] hover:text-ink sm:inline-flex"
          >
            Iniciar sesión
          </a>

          <a
            href="#acceso"
            className="inline-flex items-center whitespace-nowrap rounded-lg bg-accent px-3 py-2.5 text-sm font-semibold text-abyss transition-[filter] duration-200 ease-[var(--ease-signal)] hover:brightness-110 sm:px-4"
          >
            Solicitar acceso
          </a>

          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="menu-movil"
            className="inline-flex h-11 w-11 items-center justify-center rounded-lg border border-hairline-strong text-ink transition-colors duration-200 hover:border-accent/60 md:hidden"
          >
            <span className="sr-only">{open ? "Cerrar menú" : "Abrir menú"}</span>
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={1.5}
              strokeLinecap="round"
              aria-hidden
              className="h-5 w-5"
            >
              {open ? (
                <>
                  <path d="m6 6 12 12" />
                  <path d="M18 6 6 18" />
                </>
              ) : (
                <>
                  <path d="M4 8h16" />
                  <path d="M4 16h16" />
                </>
              )}
            </svg>
          </button>
        </div>
      </div>

      <div id="menu-movil" hidden={!open} className="border-t border-hairline bg-abyss md:hidden">
        <nav aria-label="Principal, móvil" className="shell flex flex-col py-2">
          {nav.map((n) => (
            <a
              key={n.href}
              href={n.href}
              onClick={() => setOpen(false)}
              className="border-b border-hairline py-3.5 text-sm font-medium text-muted transition-colors duration-200 hover:text-ink"
            >
              {n.label}
            </a>
          ))}
          <a
            href={APP_URL}
            className="py-3.5 text-sm font-medium text-muted transition-colors duration-200 hover:text-ink"
          >
            Iniciar sesión
          </a>
        </nav>
      </div>
    </header>
  );
}
