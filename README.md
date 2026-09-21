# TheCarriers — sitio web

Landing page de TheCarriers. Next.js 16 (App Router, Turbopack) + Tailwind CSS 4 +
TypeScript. Página estática, sin backend.

## Correr en local

```bash
npm install
cp .env.example .env.local   # y pon el endpoint real del formulario
npm run dev
```

Abre http://localhost:3000.

> Si el puerto 3000 está ocupado, Next se pasa solo al 3001. Dos servidores de
> desarrollo a la vez sobre esta misma carpeta terminan sirviendo chunks que ya no
> existen: la página sale sin estilos. Deja uno solo corriendo.

## Estructura

```
src/app/layout.tsx           Fuente (Inter self-hosted), metadata, idioma
src/app/page.tsx             Orden de las secciones
src/app/globals.css          Tokens de marca, contenedor .shell y animaciones
src/app/icon.svg             Favicon
src/app/robots.ts            robots.txt generado
src/app/sitemap.ts           sitemap.xml generado
src/lib/site.ts              SITE_URL (sobreescribible con NEXT_PUBLIC_SITE_URL)
src/lib/content.ts           Todo el copy y los datos de la página
src/components/Header.tsx    Barra superior y menú móvil
src/components/Hero.tsx      Titular y diagrama principal
src/components/Network.tsx   Los tres diagramas de convergencia
src/components/ProductView.tsx  La pantalla de envíos como ventana de aplicación
src/components/Sections.tsx  Problema, Cómo funciona, Integraciones, Plataforma, Para quién
src/components/Api.tsx       Sección de API con el ejemplo intercambiable
src/components/Cta.tsx       Acceso anticipado
src/components/AccessForm.tsx  Formulario (Formspree)
src/components/Reveal.tsx    Aparición progresiva al hacer scroll
src/components/ui.tsx        Tarjeta, botones, iconos y glifos de los pasos
src/components/Year.tsx      Año del footer, corregido en cliente
public/brand/                Isotipo y lockup en SVG (navy y blanco)
```

## Diagramas

El diagrama de convergencia —canales → TheCarriers → paqueterías— es el elemento
central del sitio. Vive en `Network.tsx` como tres composiciones sobre la misma
gramática: `HeroNetwork` (grande, con monogramas y reacción al hover),
`ConvergenceDiagram` (compacto, en "Cómo funciona") y `ApiFlow` (vertical, en la
sección de API).

La geometría es explícita y compartida: cada columna reparte sus fichas con
`justify-between` sobre una altura fija y el SVG mide exactamente lo mismo, así que
cada curva nace en el centro de su ficha. Dos reglas que se rompen fácil:

- **Un rótulo dentro de la columna desalinea los cables.** Va en su propia fila, con
  las mismas proporciones.
- **Cada columna calcula su alto de ficha** con `altoFicha()`, porque seis canales y
  diez destinos no caben igual en la misma altura.

Si cambias la cantidad de canales o de paqueterías, verifica la alineación antes de
dar por bueno el resultado.

## Contenido

`src/lib/content.ts` separa dos familias que no son lo mismo:

- `paqueterias` — los transportistas: DHL, FedEx, UPS, Estafeta, Paquetexpress, Redpack.
- `plataformas` — revenden guías de esas mismas paqueterías: T1 Envíos, Skydropx,
  EnviaYa, Envíame.
- `destinos` — la unión de ambas, que es lo que consumen los diagramas.

En Integraciones van separadas; en los diagramas van juntas bajo un solo rótulo.

Dos reglas de copy que no se negocian: **nunca se promete "con un clic" ni "en
minutos"** (el producto está en acceso anticipado y las conexiones se construyen
durante el onboarding), y **no se usan logotipos de terceros**: cada marca lleva un
monograma tipográfico propio.

## Formulario

Envía a Formspree con `fetch`. El endpoint vive en `NEXT_PUBLIC_FORM_ENDPOINT`
(ver `.env.example`). Si falta esa variable, el visitante **no ve nada sobre la
configuración**: ve el mismo aviso de error que ante cualquier otra falla, con un
correo al cual escribir. El detalle técnico se queda en la consola y solo en
desarrollo.

## Accesibilidad

WCAG 2.1 AA, verificado midiendo el render (284 textos, 0 fallos). Restricciones de la
paleta sobre el fondo oscuro:

- **Texto blanco sobre el acento sólido da 3.46:1 y reprueba.** Los botones verdes
  llevan texto `abyss` (5.32:1), y su hover *aclara*; si oscureciera a `accent-600`,
  el texto oscuro se quedaría sin contraste.
- `--color-hairline` es decorativo y no sirve como único borde de un control. Los
  campos de formulario usan `--color-field` (3.41:1), que cumple el mínimo de 3:1.
- `white/50` es el piso para texto sobre el fondo. Por debajo, reprueba.

El anillo de foco es el verde de marca, `prefers-reduced-motion` se respeta y las zonas
con scroll horizontal son alcanzables con teclado.

## Marca

Navy `#1B2A4A`, acento `#0F9D6E`, Inter. El modo oscuro no introdujo colores nuevos: la
escalera es `abyss #0B1220` (página) → `navy-900 #121C33` (tarjeta) → `navy #1B2A4A`
(elevada), todo el mismo tono.

## Tipografía

`src/app/fonts/InterVariable.woff2` está subseteado al rango **latin** (105 KB en vez de
352 KB), conservando los ejes variables `wght 100-900` y `opsz`. Cubre español completo.
Si algún día hay contenido en polaco, checo, turco, vietnamita, etc., hay que regenerarlo
incluyendo `latin-ext`:

```bash
pyftsubset InterVariable.woff2 --output-file=InterVariable.woff2 --flavor=woff2 \
  --layout-features='*' --unicodes="U+0000-00FF,U+0131,U+0152-0153,U+02BB-02BC,..."
```

(`LICENSE.txt` de la OFL debe seguir junto al archivo.)

## Pendientes antes de publicar

- **Endpoint del formulario.** Falta crear el formulario en Formspree y poner su URL en
  `NEXT_PUBLIC_FORM_ENDPOINT`. Sin eso, nadie puede solicitar acceso.
- **Dominio y correo.** `hola@thecarriers.mx` y `SITE_URL` son provisionales. Confirmar
  antes de publicar: `SITE_URL` alimenta el sitemap.
- **Open Graph.** Falta `metadataBase`, `og:url`, `og:image` y canonical en
  `layout.tsx`. Sin imagen OG, el link compartido sale sin tarjeta.
- **Logos.** `public/brand/*.svg` son un trazado de bitmap (miles de segmentos `L`), no
  un vector limpio: 22 KB el lockup y 12 KB el isotipo. Un re-export vectorial real los
  dejaría en 1–2 KB y se verían mejor en tamaños chicos.

## Deploy

`vercel` desde esta carpeta, o conectar el repo en vercel.com. Recuerda definir
`NEXT_PUBLIC_FORM_ENDPOINT` y `NEXT_PUBLIC_SITE_URL` como variables de entorno del
proyecto.
