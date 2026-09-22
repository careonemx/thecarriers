import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import { SITE_ORIGIN, SITE_URL } from "@/lib/site";
import { DatosEstructurados } from "@/components/DatosEstructurados";
import "./globals.css";

// Inter se sirve desde el propio sitio (sin dependencia de Google Fonts).
// El .woff2 está subseteado al rango latin (105 KB en vez de 352 KB), conservando
// los ejes variables wght 100-900 y opsz. Si algún día hay contenido en polaco,
// checo, turco, etc., hay que regenerarlo incluyendo latin-ext (ver README).
const inter = localFont({
  src: "./fonts/InterVariable.woff2",
  variable: "--font-inter",
  weight: "100 900",
  display: "swap",
});

const TITULO = "The Carriers — Todas tus paqueterías. Una sola plataforma.";
const DESCRIPCION =
  "Conecta tus canales de venta y tus cuentas de paquetería en un solo lugar. " +
  "Genera guías, monitorea envíos y opera múltiples carriers sin entrar a cada portal.";

export const metadata: Metadata = {
  // metadataBase resuelve las rutas relativas de esta metadata a URLs absolutas,
  // que es lo que exigen Open Graph y el canonical. Va el ORIGEN, sin ruta: Next
  // antepone el basePath por su cuenta, y si el subdirectorio viniera ya dentro
  // de metadataBase quedaría duplicado en og:image.
  metadataBase: new URL(SITE_ORIGIN),
  // Absoluto a propósito: Next antepone el basePath a las imágenes de la
  // metadata, pero NO al canonical ni a og:url. Con una ruta relativa, en la
  // vista previa ambos apuntaban a la raíz del dominio, que no es este sitio.
  alternates: { canonical: `${SITE_URL}/` },

  // La vista previa de GitHub Pages vive en un subdominio prestado. Que Google la
  // indexe ahora significa que después compita contra el dominio real, así que se
  // publica con noindex. El link sigue siendo visible para cualquiera que lo tenga.
  robots:
    process.env.GITHUB_PAGES === "true"
      ? { index: false, follow: false }
      : {
          index: true,
          follow: true,
          googleBot: {
            index: true,
            follow: true,
            "max-image-preview": "large",
            "max-snippet": -1,
            "max-video-preview": -1,
          },
        },

  title: TITULO,
  description: DESCRIPCION,
  applicationName: "The Carriers",
  category: "Logística",
  // opengraph-image.png y twitter-image.png se recogen por convención de archivo:
  // Next genera las etiquetas con su tamaño, su tipo y el texto alternativo.
  openGraph: {
    title: TITULO,
    description: DESCRIPCION,
    url: `${SITE_URL}/`,
    siteName: "The Carriers",
    type: "website",
    locale: "es_MX",
  },
  twitter: {
    card: "summary_large_image",
    title: TITULO,
    description: DESCRIPCION,
  },
};

export const viewport: Viewport = {
  themeColor: "#0b1220",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="es-MX" className={`${inter.variable} h-full`}>
      <body className="flex min-h-full flex-col">
        <DatosEstructurados />
        {children}
      </body>
    </html>
  );
}
