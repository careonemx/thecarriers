/**
 * Contenido de la landing.
 *
 * El producto está en acceso anticipado y las conexiones se construyen durante
 * el onboarding, con el cliente. Por eso aquí no se promete "con un clic" ni
 * "en minutos", y los canales y paqueterías se presentan como aquellos con los
 * que somos compatibles (nunca "trabajamos con", "aliados" ni "partners"),
 * sin estados en vivo ni tiempos simulados.
 *
 * Los canales y paqueterías se nombran con texto y un monograma tipográfico
 * propio. No usamos los logotipos oficiales de terceros: son marcas de sus
 * titulares y no tenemos licencia para mostrarlas.
 */

/* ---------- Hero ---------- */
export const hero = {
  eyebrow: "Acceso anticipado · México",
  h1: ["Todas tus paqueterías.", "Una sola plataforma."],
  sub: "Conecta tus canales de venta y tus cuentas de paquetería en un solo lugar. Genera guías, monitorea envíos y opera múltiples carriers sin entrar a cada portal. Si tienes un sistema propio, intégralo una sola vez mediante nuestra API.",
  claim: "Tus cuentas. Tus tarifas. Tus paqueterías. Una sola integración.",
  nota: "No vendemos guías ni cambiamos tus tarifas. Solo conectamos las cuentas que ya tienes.",
};

/** Los envíos de la tabla de muestra. Datos de ejemplo. */
export const demoRows = [
  {
    canal: "Shopify",
    paqueteria: "DHL",
    guia: "JD01480000123",
    pedido: "#10422",
    estado: "En tránsito",
    original: "Shipment in transit",
    tono: "info",
  },
  {
    canal: "Mercado Libre",
    paqueteria: "FedEx",
    guia: "782394001122",
    pedido: "#10419",
    estado: "Detenido",
    original: "Delivery exception",
    tono: "bad",
  },
  {
    canal: "Tiendanube",
    paqueteria: "Estafeta",
    guia: "6050000112233",
    pedido: "#10417",
    estado: "Entregado",
    original: "Entregado a destinatario",
    tono: "good",
  },
  {
    canal: "Amazon",
    paqueteria: "UPS",
    guia: "1Z999AA10123",
    pedido: "#10415",
    estado: "Recolección pendiente",
    original: "Pickup scheduled",
    tono: "warn",
  },
  {
    canal: "WooCommerce",
    paqueteria: "Redpack",
    guia: "RP-4410982",
    pedido: "#10413",
    estado: "En tránsito",
    original: "EN RUTA",
    tono: "info",
  },
  {
    canal: "Tienda propia",
    paqueteria: "T1 Envíos",
    guia: "T1-88213",
    pedido: "#10411",
    estado: "Entregado",
    original: "IN_TRANSIT",
    tono: "good",
  },
] as const;

export type Tono = (typeof demoRows)[number]["tono"];

/* ---------- Nodos de los diagramas e integraciones ----------
 * `sigla` es un monograma tipográfico nuestro, no el logotipo de la marca.
 */
export type Nodo = { nombre: string; sigla: string };

export const canales: Nodo[] = [
  { nombre: "Shopify", sigla: "Sh" },
  { nombre: "Tiendanube", sigla: "Tn" },
  { nombre: "Mercado Libre", sigla: "ML" },
  { nombre: "Amazon", sigla: "Az" },
  { nombre: "WooCommerce", sigla: "Wo" },
  { nombre: "API / sistema propio", sigla: "{}" },
];

/**
 * Dos familias distintas, y la diferencia importa:
 *
 * - `paqueterias` son los transportistas: quienes mueven el paquete.
 * - `plataformas` revenden guías de esas mismas paqueterías. TheCarriers se
 *   conecta también con ellas, lo cual deja claro que está por encima y no
 *   compitiendo: da igual si el cliente tiene contrato directo con DHL o
 *   cuenta en Skydropx, entra igual.
 *
 * En Integraciones van separadas, porque ahí hay espacio para ser precisos. En
 * los diagramas van juntas bajo `destinos`, porque ahí el rótulo tiene que ser
 * corto y el comprador les dice "paqueterías" a todas.
 */
export const paqueterias: Nodo[] = [
  { nombre: "DHL", sigla: "DH" },
  { nombre: "FedEx", sigla: "Fx" },
  { nombre: "UPS", sigla: "UP" },
  { nombre: "Estafeta", sigla: "Es" },
  { nombre: "Paquetexpress", sigla: "Px" },
  { nombre: "Redpack", sigla: "Rp" },
];

export const plataformas: Nodo[] = [
  { nombre: "T1 Envíos", sigla: "T1" },
  { nombre: "Skydropx", sigla: "Sk" },
  { nombre: "EnviaYa", sigla: "EY" },
  { nombre: "Envíame", sigla: "Em" },
];

/** Lo que sale del otro lado del nodo. Es lo que consumen los diagramas. */
export const destinos: Nodo[] = [...paqueterias, ...plataformas];

/** Su rótulo: una sola etiqueta para las dos familias. */
export const rotuloDestinos = "Tus paqueterías y plataformas";

/* ---------- El problema ---------- */
export const pains = [
  {
    t: "Un portal por paquetería",
    d: "Tu equipo cambia entre diferentes portales para consultar envíos y generar guías.",
  },
  {
    t: "Los problemas aparecen tarde",
    d: "Un envío puede parecer normal mientras lleva días detenido.",
  },
  {
    t: "El cliente se entera primero",
    d: "Muchas incidencias se descubren cuando el comprador pregunta por su pedido.",
  },
  {
    t: "Cobros extra sin control",
    d: "Sobrepesos y ajustes aparecen después y son difíciles de conciliar.",
  },
];

/* ---------- Cómo funciona ---------- */
export const steps = [
  {
    n: "01",
    t: "Conecta tus canales",
    d: "Shopify, Tiendanube, Mercado Libre, Amazon, WooCommerce o tu sistema.",
    glifo: "canales",
  },
  {
    n: "02",
    t: "Conecta tus cuentas de paquetería",
    d: "Utiliza los contratos y tarifas que ya tienes con DHL, FedEx, Estafeta, UPS y otros carriers.",
    glifo: "cuentas",
  },
  {
    n: "03",
    t: "Opera todo desde TheCarriers",
    d: "Genera guías, monitorea envíos, atiende excepciones y administra recolecciones desde una sola plataforma.",
    glifo: "opera",
  },
] as const;

export type Glifo = (typeof steps)[number]["glifo"];

/* ---------- Plataforma ---------- */
export const modules = [
  {
    t: "Todos tus envíos en un solo lugar",
    d: "Una sola tabla con los envíos de todas tus paqueterías.",
    icono: "tabla",
  },
  {
    t: "Excepciones primero",
    d: "Lo detenido sube al principio, con la fecha en que empezó.",
    icono: "alerta",
  },
  {
    t: "Recolecciones centralizadas",
    d: "Programa y cancela recolecciones sin entrar a cada portal.",
    icono: "recoleccion",
  },
  {
    t: "Desempeño por paquetería",
    d: "Cuántos envíos llegaron a tiempo y de quién fue la causa.",
    icono: "desempeno",
  },
  {
    t: "Cobros extra bajo control",
    d: "Lo que cotizaste contra lo que te cobraron, envío por envío.",
    icono: "cobros",
  },
  {
    t: "Guías con tus propias cuentas",
    d: "Cotiza y genera guías con tus contratos y tus tarifas.",
    icono: "guia",
  },
] as const;

export type Icono = (typeof modules)[number]["icono"];

/* ---------- Para quién ---------- */
export const audiences = [
  {
    t: "Ecommerce multicarrier",
    d: "Empresas que venden por varios canales y utilizan diferentes paqueterías.",
  },
  {
    t: "Operadores logísticos",
    d: "Empresas que gestionan envíos para múltiples clientes y cuentas.",
  },
  {
    t: "Equipos de fulfillment y operaciones",
    d: "Equipos que hoy pierden tiempo entrando a distintos portales y resolviendo incidencias manualmente.",
  },
];

/* ---------- API ---------- */
export const apiSwap = [
  { id: "estafeta", etiqueta: "Estafeta", servicio: "terrestre" },
  { id: "dhl", etiqueta: "DHL", servicio: "express_worldwide" },
  { id: "fedex", etiqueta: "FedEx", servicio: "priority_overnight" },
  { id: "ups", etiqueta: "UPS", servicio: "standard" },
];

export const apiBeneficios = [
  {
    t: "Estados normalizados",
    d: "Traducimos diferentes respuestas de carriers a una estructura común.",
  },
  {
    t: "Estado original disponible",
    d: "También conservamos exactamente lo que reportó la paquetería.",
  },
  {
    t: "Webhooks",
    d: "Tus sistemas reciben cambios de estado automáticamente.",
  },
];

/* ---------- Navegación ---------- */
export const nav = [
  { href: "#como-funciona", label: "Cómo funciona" },
  { href: "#plataforma", label: "Plataforma" },
  { href: "#integraciones", label: "Integraciones" },
  { href: "#api", label: "API" },
];

export const volumenes = [
  "Menos de 500",
  "500 – 2,000",
  "2,000 – 10,000",
  "Más de 10,000",
];
