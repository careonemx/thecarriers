import Image from "next/image";

/**
 * Los SVG de marca viven en public/ y next/image no les aplica el `basePath`.
 * En un despliegue normal esto es cadena vacía y no cambia nada; en la vista
 * previa de GitHub Pages es lo que evita que el logotipo apunte fuera del sitio.
 */
const base = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

type Props = {
  variant?: "navy" | "white" | "auto";
  height?: number;
  className?: string;
  /** Solo para el logo visible sin hacer scroll (el del header). */
  priority?: boolean;
};

/**
 * `variant="auto"` pinta las DOS y deja que el CSS esconda la que sobra según
 * el tema. Elegir una en React obligaría a saber el tema al renderizar, y el
 * tema lo decide un script del navegador: el logotipo saldría blanco un
 * instante sobre un fondo claro.
 */
export function Lockup({ variant = "navy", height = 28, className = "", priority = false }: Props) {
  const ancho = Math.round(height * (329 / 64));
  const img = (archivo: string, marca: string) => (
    <Image
      src={`${base}${archivo}`}
      alt="TheCarriers"
      width={ancho}
      height={height}
      priority={priority}
      className={`${marca} ${className}`}
    />
  );
  if (variant === "auto") {
    return (
      <>
        {img("/brand/lockup-white.svg", "marca-clara")}
        {img("/brand/lockup.svg", "marca-oscura")}
      </>
    );
  }
  return img(variant === "white" ? "/brand/lockup-white.svg" : "/brand/lockup.svg", "");
}

export function Mark({ variant = "navy", height = 32, className = "", priority = false }: Props) {
  const img = (archivo: string, marca: string) => (
    <Image
      src={`${base}${archivo}`}
      alt=""
      width={height}
      height={height}
      priority={priority}
      className={`${marca} ${className}`}
    />
  );
  if (variant === "auto") {
    return (
      <>
        {img("/brand/mark-white.svg", "marca-clara")}
        {img("/brand/mark.svg", "marca-oscura")}
      </>
    );
  }
  return img(variant === "white" ? "/brand/mark-white.svg" : "/brand/mark.svg", "");
}
