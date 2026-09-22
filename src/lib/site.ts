/**
 * Dominio del sitio. Provisional: confirmar antes de publicar (ver README).
 * Se puede sobreescribir con NEXT_PUBLIC_SITE_URL sin tocar código.
 */
export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://thecarriers.mx";

/**
 * Solo el origen, sin ruta. `metadataBase` debe recibir esto y no SITE_URL: en
 * la vista previa de GitHub Pages, Next ya antepone el basePath a las rutas
 * relativas de la metadata, así que un metadataBase con "/thecarriers" dentro
 * producía og:image en /thecarriers/thecarriers/…
 */
export const SITE_ORIGIN = new URL(SITE_URL).origin;
