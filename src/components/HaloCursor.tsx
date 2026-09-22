"use client";

import { useEffect, useRef } from "react";

/**
 * El resplandor verde del hero, siguiendo al cursor.
 *
 * Antes era una mancha fija detrás del titular: se leía como una imperfección
 * del fondo, porque nada la explicaba. Como respuesta al cursor sí tiene
 * sentido —es el sitio donde estás mirando— y de paso le da algo de vida a
 * una zona que es solo texto.
 *
 * La posición viaja por variables CSS y no por estado de React: un `setState`
 * por cada píxel de ratón repinta el árbol sesenta veces por segundo para
 * mover un degradado. Aquí se escribe en el estilo del nodo dentro de un
 * `requestAnimationFrame`, así que el navegador compone y React no se entera.
 *
 * Sin cursor no hay efecto: en un teléfono se queda el resplandor centrado de
 * siempre, que es lo que este componente pinta hasta que alguien mueve algo.
 */
export function HaloCursor({ className = "" }: { className?: string }) {
  const nodo = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = nodo.current;
    if (!el) return;

    /* Con el movimiento reducido no se persigue nada: el resplandor se queda
       donde está y el componente no escucha el ratón. */
    const quieto = matchMedia("(prefers-reduced-motion: reduce)");
    const finoYSinReducir = () => matchMedia("(pointer: fine)").matches && !quieto.matches;
    if (!finoYSinReducir()) return;

    let pedido = 0;
    let x = 0;
    let y = 0;

    const pintar = () => {
      pedido = 0;
      el.style.setProperty("--halo-x", `${x}%`);
      el.style.setProperty("--halo-y", `${y}px`);
      el.style.setProperty("--halo-visible", "1");
    };

    const mover = (e: PointerEvent) => {
      const caja = el.getBoundingClientRect();
      x = ((e.clientX - caja.left) / caja.width) * 100;
      y = e.clientY - caja.top;
      if (!pedido) pedido = requestAnimationFrame(pintar);
    };

    /* Al salir vuelve a su sitio en vez de desaparecer: apagarlo de golpe deja
       un hueco donde había color. */
    const salir = () => {
      if (pedido) cancelAnimationFrame(pedido);
      pedido = 0;
      el.style.removeProperty("--halo-x");
      el.style.removeProperty("--halo-y");
      el.style.removeProperty("--halo-visible");
    };

    const padre = el.parentElement ?? el;
    padre.addEventListener("pointermove", mover, { passive: true });
    padre.addEventListener("pointerleave", salir);
    return () => {
      padre.removeEventListener("pointermove", mover);
      padre.removeEventListener("pointerleave", salir);
      if (pedido) cancelAnimationFrame(pedido);
    };
  }, []);

  return <div ref={nodo} aria-hidden className={`halo-cursor ${className}`} />;
}
