import Link from "next/link";
import { UtensilsCrossed } from "lucide-react";

export function Navbar() {
  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-border/25 bg-background/92 backdrop-blur-sm">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6 lg:px-8">
        {/* Logo */}
        <Link
          href="/"
          className="flex items-center gap-2 text-sm font-semibold text-foreground transition-opacity hover:opacity-60"
        >
          <UtensilsCrossed className="size-4" strokeWidth={1.5} />
          <span className="tracking-tight">TopVent</span>
        </Link>

        {/* Nav links */}
        <nav className="hidden items-center gap-8 md:flex" aria-label="Principal">
          {[
            { label: "Funciones", href: "#features" },
            { label: "Precios", href: "#pricing" },
            { label: "Testimonios", href: "#testimonials" },
          ].map(({ label, href }) => (
            <Link
              key={href}
              href={href}
              className="text-sm text-muted-foreground transition-colors duration-200 hover:text-foreground"
            >
              {label}
            </Link>
          ))}
        </nav>

        {/* CTAs */}
        <div className="flex items-center gap-5">
          <Link
            href="/login"
            className="hidden text-sm text-muted-foreground transition-colors hover:text-foreground md:block"
          >
            Iniciar sesión
          </Link>
          <Link
            href="/signup"
            className="rounded-full bg-primary px-5 py-2 text-xs font-semibold text-primary-foreground transition-opacity hover:opacity-85 active:scale-[0.98]"
          >
            Empezar gratis
          </Link>
        </div>
      </div>
    </header>
  );
}