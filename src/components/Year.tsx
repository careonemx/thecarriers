"use client";

import { useSyncExternalStore } from "react";

/**
 * La página es estática: un `new Date()` en el servidor congela el año al
 * momento del build y el footer se queda atrasado hasta el siguiente deploy.
 *
 * useSyncExternalStore es el patrón para un valor que difiere entre servidor y
 * cliente: renderiza el año del build en el HTML (sin desajuste de hidratación)
 * y lo corrige con el reloj real del visitante.
 */
const subscribe = () => () => {};
const getYear = () => new Date().getFullYear();

export function Year({ buildYear }: { buildYear: number }) {
  const year = useSyncExternalStore(subscribe, getYear, () => buildYear);
  return <>{year}</>;
}
