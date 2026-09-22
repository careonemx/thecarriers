import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site";

// robots.txt y sitemap.xml se generan como rutas. Con `output: export` hay que
// marcarlas estáticas explícitamente, o el build falla al recolectarlas.
export const dynamic = "force-static";

/**
 * Los rastreadores de los asistentes de IA. Se listan uno por uno aunque la
 * regla general ya los permita: es una declaración explícita de que queremos
 * que esta página sea citable, y el día que haya que excluir a alguno, se
 * cambia aquí sin tocar la regla general.
 *
 * Ojo: robots.txt solo se lee desde la raíz del dominio. En la vista previa de
 * GitHub Pages este archivo queda en /thecarriers/robots.txt y ningún rastreador
 * lo mira; ahí lo que manda es la etiqueta noindex del HTML.
 */
const rastreadoresDeIA = [
  "GPTBot", // OpenAI, entrenamiento
  "OAI-SearchBot", // OpenAI, búsqueda de ChatGPT
  "ChatGPT-User", // ChatGPT abriendo un enlace a petición de alguien
  "ClaudeBot", // Anthropic
  "Claude-User",
  "Claude-SearchBot",
  "anthropic-ai",
  "PerplexityBot",
  "Perplexity-User",
  "Google-Extended", // controla si Gemini puede usar el contenido
  "Applebot-Extended",
  "Amazonbot",
  "meta-externalagent",
  "CCBot", // Common Crawl, del que se alimentan muchos modelos
];

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: "*", allow: "/" },
      { userAgent: rastreadoresDeIA, allow: "/" },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
