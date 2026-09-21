import { Lockup } from "./Logo";
import { Year } from "./Year";
import { nav } from "@/lib/content";

export function Footer() {
  return (
    <footer className="border-t border-hairline">
      <div className="shell flex flex-col gap-8 py-12 md:flex-row md:items-start md:justify-between">
        <div className="flex flex-col gap-3">
          <Lockup variant="white" height={22} />
          <p className="text-xs text-muted">Todas tus paqueterías. Una sola plataforma.</p>
        </div>
        <nav aria-label="Pie de página" className="flex flex-wrap gap-x-8 gap-y-3 text-sm text-muted">
          {nav.map((n) => (
            <a
              key={n.href}
              href={n.href}
              className="py-1 transition-colors duration-200 hover:text-ink"
            >
              {n.label}
            </a>
          ))}
          <a href="#acceso" className="py-1 transition-colors duration-200 hover:text-ink">
            Solicitar acceso
          </a>
        </nav>
        <p className="text-xs text-muted">
          © <Year buildYear={new Date().getFullYear()} /> TheCarriers · Puebla, México
        </p>
      </div>
      <div className="border-t border-hairline">
        <div className="shell py-5">
          {/* El ancho de lectura va en el párrafo, no en el contenedor: `ch` se
              mide contra los 11px de este texto, no contra el del sitio. */}
          <p className="max-w-[120ch] text-[11px] leading-relaxed text-muted/80">
            DHL, FedEx, UPS, Estafeta, Paquetexpress, Redpack, T1 Envíos, Skydropx, EnviaYa y
            Envíame son marcas de sus respectivos titulares, al igual que Shopify, Tiendanube,
            Mercado Libre, Amazon y WooCommerce. TheCarriers no está afiliado a ninguna paquetería ni a ninguna plataforma de
            venta; se integra con las cuentas que cada empresa ya tiene contratadas.
          </p>
        </div>
      </div>
    </footer>
  );
}
