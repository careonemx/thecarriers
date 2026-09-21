"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

type State = "shown" | "armed" | "in";

/**
 * Aparición progresiva al entrar en vista.
 *
 * El contenido se renderiza VISIBLE. Solo después de montar, y solo si el
 * elemento está por debajo del pliegue, se arma el estado oculto. Así nadie
 * —sin JS, sin IntersectionObserver, con el movimiento reducido, o con el
 * elemento ya en pantalla— se queda mirando una sección vacía.
 */
export function Reveal({
  children,
  delay = 0,
  className = "",
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [state, setState] = useState<State>("shown");

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (typeof IntersectionObserver === "undefined") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (el.getBoundingClientRect().top < window.innerHeight * 0.88) return;

    setState("armed");
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        setState("in");
        io.disconnect();
      },
      { rootMargin: "0px 0px -10% 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      data-reveal={state}
      className={className}
      style={delay ? { animationDelay: `${delay}ms` } : undefined}
    >
      {children}
    </div>
  );
}
