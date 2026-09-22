import { SITE_URL } from "@/lib/site";
import { audiences, canales, modules, paqueterias, plataformas, steps } from "@/lib/content";

export const dynamic = "force-static";

/**
 * /llms.txt — resumen del sitio en texto plano para modelos de lenguaje.
 *
 * Es una convención emergente (llmstxt.org), no un estándar que alguien esté
 * obligado a respetar. Sirve para que un asistente que cite esta página lo haga
 * con los hechos correctos en vez de deducirlos del HTML.
 *
 * Se arma desde src/lib/content.ts para que no se desincronice del sitio: si
 * cambia una paquetería o un módulo, cambia aquí también.
 */
const lista = (xs: { nombre: string }[]) => xs.map((x) => x.nombre).join(", ");

export async function GET() {
  const texto = `# The Carriers

> Plataforma mexicana que conecta los canales de venta de una empresa con sus
> propias cuentas de paquetería, para generar guías, monitorear envíos y
> atender incidencias desde una sola pantalla.

## Qué hace

Una empresa que vende por varios canales y envía con varias paqueterías tiene
que entrar a un portal distinto por cada una. The Carriers es la capa que las
reúne: los pedidos entran por un lado y las guías salen por el otro.

Si la empresa tiene un sistema propio, lo integra una sola vez mediante la API;
al agregar una paquetería nueva no hay que desarrollar otra integración.

## Qué NO hace

- No vende guías.
- No cambia ni revende las tarifas del cliente.
- El cliente usa sus propias cuentas, contratos y tarifas.
- No es una paquetería ni una empresa de mensajería.

## Estado del producto

En acceso anticipado, en México. Se vende por solicitud y llamada. Las
conexiones se construyen con el cliente durante el onboarding, así que no hay
alta automática ni activación inmediata.

## Canales de venta que conecta

${lista(canales)}

## Paqueterías (transportistas)

${lista(paqueterias)}

## Plataformas de envío (revenden guías de esas paqueterías)

${lista(plataformas)}

## Cómo funciona

${steps.map((s) => `${s.n}. ${s.t}: ${s.d}`).join("\n")}

## Qué incluye la plataforma

${modules.map((m) => `- ${m.t}: ${m.d}`).join("\n")}

## Para quién es

${audiences.map((a) => `- ${a.t}: ${a.d}`).join("\n")}

## Contacto

Sitio: ${SITE_URL}
Correo: hola@thecarriers.mx
Ubicación: Puebla, México

## Nota sobre marcas

DHL, FedEx, UPS, Estafeta, Paquetexpress, Redpack, T1 Envíos, Skydropx, EnviaYa
y Envíame son marcas de sus respectivos titulares, al igual que Shopify,
Tiendanube, Mercado Libre, Amazon y WooCommerce. The Carriers no está afiliado a
ninguna de ellas; se integra con las cuentas que cada empresa ya tiene
contratadas.
`;

  return new Response(texto, {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
