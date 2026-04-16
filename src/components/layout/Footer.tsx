import Link from "next/link";
import { UtensilsCrossed } from "lucide-react";

const FOOTER_LINKS = [
  {
    heading: "Producto",
    items: [
      { label: "Funciones", href: "#features" },
      { label: "Precios", href: "#pricing" },
      { label: "Changelog", href: "/changelog" },
    ],
  },
  {
    heading: "Empresa",
    items: [
      { label: "Sobre nosotros", href: "/about" },
      { label: "Blog", href: "/blog" },
      { label: "Contacto", href: "/contact" },
    ],
  },
  {
    heading: "Legal",
    items: [
      { label: "Términos de uso", href: "/terms" },
      { label: "Privacidad", href: "/privacy" },
    ],
  },
];

export function Footer() {
  return (
    <footer className="border-t border-border">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* Main footer grid */}
        <div className="grid grid-cols-2 gap-12 py-16 md:grid-cols-4 md:py-20">
          {/* Brand */}
          <div className="col-span-2 flex flex-col gap-6 md:col-span-1">
            <Link href="/" className="flex items-center gap-2 text-sm font-semibold text-foreground transition-opacity hover:opacity-60">
              <UtensilsCrossed className="size-4" strokeWidth={1.5} />
              <span className="tracking-tight">TopVent</span>
            </Link>
            <p className="max-w-[28ch] text-sm leading-relaxed text-muted-foreground">
              La plataforma de gestión para restaurantes que crecen sin perder el control.
            </p>
          </div>

          {/* Links */}
          {FOOTER_LINKS.map((group) => (
            <div key={group.heading} className="flex flex-col gap-4">
              <p className="text-[11px] font-medium uppercase tracking-[0.12em] text-foreground">
                {group.heading}
              </p>
              <ul className="flex flex-col gap-3">
                {group.items.map((item) => (
                  <li key={item.label}>
                    <Link
                      href={item.href}
                      className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col items-start justify-between gap-3 border-t border-border py-8 text-[13px] text-muted-foreground md:flex-row md:items-center">
          <p>© {new Date().getFullYear()} TopVent. Todos los derechos reservados.</p>
          <p>Hecho para restaurantes que exigen más.</p>
        </div>
      </div>
    </footer>
  );
}