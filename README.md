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

WCAG 2.1 AA, verificado midiendo el render **en los dos temas** (282 textos, 0 fallos).
Restricciones de la paleta:

- **Texto blanco sobre el acento sólido da 3.46:1 y reprueba.** En oscuro los botones
  verdes llevan texto `abyss` (5.32:1) y su hover *aclara*. En claro no cabe texto
  oscuro sobre verde, así que el relleno baja a `accent-600` y el texto va blanco
  (4.7:1). Es lo que hace `--color-accent-solid`.
- **El verde de marca no sirve como texto sobre fondo claro.** `accent-600` da 4.6:1
  sobre la página pero 4.17:1 sobre las secciones alternas, así que `--color-link`
  usa un paso más oscuro (`#0A7350`).
- `--color-hairline` es decorativo y no sirve como único borde de un control. Los
  campos de formulario usan `--color-field` (3.41:1), que cumple el mínimo de 3:1.
- `white/50` es el piso para texto sobre el fondo. Por debajo, reprueba.

El anillo de foco es el verde de marca, `prefers-reduced-motion` se respeta y las zonas
con scroll horizontal son alcanzables con teclado.

## Marca

Navy `#1B2A4A`, acento `#0F9D6E`, Inter. Ninguno de los dos temas introduce colores de
marca nuevos.

## Temas

El sitio sirve dos temas con la misma identidad. Lo que cambia son los tokens de
**papel** —`--color-page`, `--color-strong`, `--color-raise`, `--color-inset`,
`--color-link`, `--color-accent-solid`, `--color-on-accent`— y no los de identidad.
Un componente que escribe `text-white` o `bg-white/5` a mano se queda fuera del
sistema: esos son justo los que no pueden cambiar solos.

El tema oscuro tenía seis superficies distintas y cada una conserva su valor: un tema
nuevo no puede cambiar el que ya estaba.

| Token | Papel | Oscuro | Claro |
|---|---|---|---|
| `--color-page` | la página | `abyss` | blanco |
| `--color-banda` | sección alterna | `navy-900/35` | `navy-50` |
| `--color-raise` | tarjeta | `navy-900/70` | blanco |
| `--color-inset` | pieza dentro de una tarjeta | `navy-900` | `navy-50` |
| `--color-control` | botón fantasma, campo, pastilla | `white/5` | blanco |
| `--color-control-fuerte` | su estado activo | `white/10` | `navy-50` |

**La escalera va en sentidos opuestos** y por eso `raise` e `inset` no pueden ser el
mismo token: en oscuro una pieza dentro de una tarjeta es más CLARA que ella; en claro,
más oscura.

**Sobre blanco no hay nada más claro que el blanco**, así que la tarjeta no se separa
de la página por color sino por `--sombra-tarjeta` y un borde algo más presente. El
ritmo entre secciones lo da la banda `navy-50`. En oscuro la sombra es `none` y el
hover sí lleva un halo verde; sobre blanco un brillo de color se lee como un error de
impresión.

**Islas oscuras.** El bloque de código y la maqueta del admin llevan
`data-tema="oscuro"` y se quedan oscuros dentro de la página clara: no son la página,
son una foto de algo que es oscuro de verdad. El atributo les devuelve los tokens
oscuros, así que lo de dentro sigue siendo legible sin escribir ningún color a mano.

**El sitio abre en claro.** El tema vive en `localStorage` bajo `tc-tema` y lo aplica
un script en línea del layout, antes del primer pintado. El sitio se exporta estático:
el servidor no puede leer la preferencia, y dejárselo a React haría que la página se
viera un instante con el tema equivocado antes de saltar al bueno.

Cambiar cuál abre por defecto son dos sitios que tienen que decir lo mismo: el
`data-tema` de `<html>` en el layout y el valor que busca ese script.

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
- **Apuntar el dominio.** Nada se va a indexar hasta que `thecarriers.mx` exista y
  sirva el sitio. Todo lo de abajo ya está escrito apuntando a ese dominio.
- **Logos.** `public/brand/*.svg` son un trazado de bitmap (miles de segmentos `L`), no
  un vector limpio: 22 KB el lockup y 12 KB el isotipo. Un re-export vectorial real los
  dejaría en 1–2 KB y se verían mejor en tamaños chicos.

## Indexación

Todo apunta a `NEXT_PUBLIC_SITE_URL`, así que el mismo código sirve para la vista
previa y para el dominio definitivo.

- `src/app/robots.ts` → `/robots.txt`. Permite todo y lista uno por uno los
  rastreadores de IA (GPTBot, ClaudeBot, PerplexityBot, Google-Extended…): la regla
  general ya los cubría, pero así queda explícito y es un solo lugar que tocar el día
  que haya que excluir a alguno.
- `src/app/sitemap.ts` → `/sitemap.xml`. Una sola URL, con la barra final, para que
  coincida exactamente con el canonical.
- `src/app/llms.txt/route.ts` → `/llms.txt`. Resumen en texto plano para modelos de
  lenguaje (convención de llmstxt.org, no un estándar obligatorio). Se arma desde
  `src/lib/content.ts` para que no se desincronice del sitio.
- `src/app/opengraph-image.png` y `twitter-image.png`, 1200×630, con su `.alt.txt`.
  Son PNG estáticos, no generados en tiempo de ejecución, porque el sitio se exporta
  estático. Para rehacerlos hay que volver a renderizar el diseño y reemplazarlos.
- `src/components/DatosEstructurados.tsx` → JSON-LD de `Organization` y `WebSite`.
  Solo declara lo verificable en la página: nada de precios, valoraciones ni número
  de clientes.

Dos trampas ya resueltas, por si alguien las vuelve a pisar:

- **`metadataBase` lleva el ORIGEN, sin ruta.** Next antepone el `basePath` a las
  imágenes de la metadata por su cuenta; con el subdirectorio dentro de
  `metadataBase`, `og:image` salía duplicado (`/thecarriers/thecarriers/…`).
- **El canonical y `og:url` van absolutos.** A esos Next *no* les antepone el
  `basePath`, así que con una ruta relativa apuntaban a la raíz del dominio.

**En GitHub Pages el robots.txt no sirve para nada.** Los rastreadores solo leen el
de la raíz del dominio, y `careonemx.github.io/robots.txt` no es nuestro (da 404). Ahí
lo único que manda es el `noindex` del HTML, que la vista previa lleva a propósito
para no competir después contra el dominio real. Se quita borrando la rama
`GITHUB_PAGES` de `robots` en `src/app/layout.tsx`.

## Deploy

`vercel` desde esta carpeta, o conectar el repo en vercel.com. Recuerda definir
`NEXT_PUBLIC_FORM_ENDPOINT` y `NEXT_PUBLIC_SITE_URL` como variables de entorno del
proyecto.
