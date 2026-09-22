"use client";

import { useLayoutEffect } from "react";

export const CLAVE_TEMA = "tc-tema";

/**
 * El interruptor de tema.
 *
 * No guarda el tema en estado de React. El tema ya vive en un atributo de
 * <html> que puso un script en línea antes del primer pintado, y duplicarlo
 * en estado solo abre la puerta a que las dos copias digan cosas distintas:
 * en el servidor el estado no puede conocer el valor, así que el icono
 * saldría mal y saltaría al hidratar.
 *
 * Los dos iconos se pintan siempre y el CSS esconde el que sobra, igual que
 * con el logotipo. Así el botón es correcto desde el primer pintado.
 */
export function TemaToggle({ className = "" }: { className?: string }) {
  /* En desarrollo, React remonta una vez por Strict Mode y al hacerlo deja
     <html> solo con los atributos que él maneja, borrando el que puso el
     script. Esto lo repone antes de pintar; en producción no hace nada. */
  useLayoutEffect(() => {
    try {
      if (localStorage.getItem(CLAVE_TEMA) === "claro") {
        document.documentElement.setAttribute("data-tema", "claro");
      }
    } catch {
      /* navegación privada */
    }
  }, []);

  function cambiar() {
    const raiz = document.documentElement;
    const siguiente = raiz.getAttribute("data-tema") === "claro" ? "oscuro" : "claro";
    raiz.setAttribute("data-tema", siguiente);
    try {
      localStorage.setItem(CLAVE_TEMA, siguiente);
    } catch {
      /* navegación privada: el tema dura lo que la pestaña */
    }
  }

  return (
    <button
      type="button"
      onClick={cambiar}
      className={`inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-hairline text-muted transition-colors duration-200 ease-[var(--ease-signal)] hover:border-hairline-strong hover:text-ink ${className}`}
    >
      <span className="sr-only">Cambiar entre tema claro y oscuro</span>

      {/* En oscuro se ofrece el sol; en claro, la luna. */}
      <svg
        viewBox="0 0 24 24"
        width="17"
        height="17"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
        className="marca-clara"
      >
        <circle cx="12" cy="12" r="4" />
        <path d="M12 3v2M12 19v2M3 12h2M19 12h2M5.6 5.6 7 7M17 17l1.4 1.4M18.4 5.6 17 7M7 17l-1.4 1.4" />
      </svg>

      <svg
        viewBox="0 0 24 24"
        width="17"
        height="17"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
        className="marca-oscura"
      >
        <path d="M20 14.5A8.5 8.5 0 0 1 9.5 4a8.5 8.5 0 1 0 10.5 10.5z" />
      </svg>
    </button>
  );
}
