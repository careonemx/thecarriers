import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
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

export const metadata: Metadata = {
  title: "TheCarriers — Todas tus paqueterías. Una sola plataforma.",
  description:
    "Conecta tus canales de venta y tus cuentas de paquetería en un solo lugar. Genera guías, monitorea envíos y opera múltiples carriers sin entrar a cada portal.",
  openGraph: {
    title: "TheCarriers — Todas tus paqueterías. Una sola plataforma.",
    description:
      "Conecta tus canales de venta y las paqueterías que ya usas, y controla todos tus envíos desde una sola pantalla.",
    type: "website",
    locale: "es_MX",
    siteName: "TheCarriers",
  },
};

export const viewport: Viewport = {
  themeColor: "#0b1220",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="es" className={`${inter.variable} h-full`}>
      <body className="flex min-h-full flex-col">{children}</body>
    </html>
  );
}
