import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site";

// robots.txt y sitemap.xml se generan como rutas. Con `output: export` hay que
// marcarlas estáticas explícitamente, o el build falla al recolectarlas.
export const dynamic = "force-static";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
