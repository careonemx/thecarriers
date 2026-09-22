import type { NextConfig } from "next";

/**
 * GitHub Pages sirve archivos estáticos y, por ser un repositorio de proyecto,
 * los sirve bajo un subdirectorio: careonemx.github.io/thecarriers. Eso obliga a
 * tres cosas que NO queremos en desarrollo ni en un despliegue normal:
 *
 *   output: "export"      no hay servidor, solo HTML ya generado
 *   basePath              si falta, la página carga sin estilos: busca /_next
 *                         en la raíz del dominio, donde no hay nada
 *   images.unoptimized    el optimizador de next/image necesita servidor
 *
 * Por eso todo va detrás de GITHUB_PAGES, que solo define el workflow. En local
 * `npm run dev` sigue en http://localhost:3000, sin subdirectorio, y el día que
 * esto se despliegue en un dominio propio no hay nada que revertir.
 */
const paraGitHubPages = process.env.GITHUB_PAGES === "true";

/** El subdirectorio donde GitHub Pages sirve este repositorio. */
const subdirectorio = paraGitHubPages ? "/thecarriers" : "";

const nextConfig: NextConfig = {
  // `basePath` prefija las rutas que genera Next (/_next, el favicon), pero NO
  // el `src` de next/image cuando apunta a un archivo de public/. Por eso el
  // mismo valor se expone al cliente y Logo.tsx lo antepone a mano; sin esto el
  // logotipo queda roto en la vista previa.
  env: { NEXT_PUBLIC_BASE_PATH: subdirectorio },
  ...(paraGitHubPages && {
    output: "export",
    basePath: subdirectorio,
    trailingSlash: true,
    images: { unoptimized: true },
  }),
};

export default nextConfig;
