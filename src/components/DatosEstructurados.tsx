import { SITE_URL } from "@/lib/site";

/**
 * Datos estructurados schema.org, para Google y para los rastreadores que
 * alimentan a los asistentes de IA.
 *
 * Solo se declara lo que es verificable en la propia página: quién es la
 * empresa, dónde está y qué hace. Nada de precios, valoraciones, número de
 * clientes ni fechas de fundación: inventar eso es lo que hace que Google
 * marque los datos como no confiables, y además no sería cierto.
 */
const datos = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": `${SITE_URL}/#organizacion`,
      name: "The Carriers",
      url: SITE_URL,
      logo: `${SITE_URL}/brand/lockup.svg`,
      email: "hola@thecarriers.mx",
      description:
        "Plataforma que conecta los canales de venta de una empresa con sus propias " +
        "cuentas de paquetería, para generar guías y dar seguimiento a los envíos " +
        "desde un solo lugar.",
      address: {
        "@type": "PostalAddress",
        addressLocality: "Puebla",
        addressCountry: "MX",
      },
      areaServed: { "@type": "Country", name: "México" },
    },
    {
      "@type": "WebSite",
      "@id": `${SITE_URL}/#sitio`,
      url: SITE_URL,
      name: "The Carriers",
      inLanguage: "es-MX",
      publisher: { "@id": `${SITE_URL}/#organizacion` },
    },
  ],
};

export function DatosEstructurados() {
  return (
    <script
      type="application/ld+json"
      // El contenido es una constante nuestra, no entra nada del usuario.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(datos) }}
    />
  );
}
