import Image from "next/image";

type Props = {
  variant?: "navy" | "white";
  height?: number;
  className?: string;
  /** Solo para el logo visible sin hacer scroll (el del header). */
  priority?: boolean;
};

export function Lockup({ variant = "navy", height = 28, className = "", priority = false }: Props) {
  const src = variant === "white" ? "/brand/lockup-white.svg" : "/brand/lockup.svg";
  return (
    <Image
      src={src}
      alt="TheCarriers"
      width={Math.round(height * (321 / 64))}
      height={height}
      priority={priority}
      className={className}
    />
  );
}

export function Mark({ variant = "navy", height = 32, className = "", priority = false }: Props) {
  const src = variant === "white" ? "/brand/mark-white.svg" : "/brand/mark.svg";
  return <Image src={src} alt="" width={height} height={height} priority={priority} className={className} />;
}
