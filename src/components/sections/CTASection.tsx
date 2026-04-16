import Link from "next/link";
import { ArrowRight } from "lucide-react";

export function CTASection() {
  return (
    <section className="bg-primary py-28 md:py-36">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid grid-cols-1 items-end gap-12 md:grid-cols-2">

          {/* Left — big headline */}
          <div>
            <p className="mb-6 text-[11px] font-medium uppercase tracking-[0.15em] text-primary-foreground/50">
              Empieza hoy
            </p>
            <h2 className="text-[clamp(2.5rem,5vw,4rem)] font-bold leading-[1.02] tracking-tighter text-primary-foreground text-balance">
              Tu restaurante merece operar mejor
            </h2>
          </div>

          {/* Right — copy + CTAs */}
          <div>
            <p className="mb-10 max-w-[44ch] text-base leading-relaxed text-primary-foreground/65">
              Únete a los restaurantes que redujeron errores, aceleraron el servicio y
              cerraron más mesas cada noche. 14 días gratis, sin tarjeta de crédito.
            </p>

            <div className="flex flex-col items-start gap-4 sm:flex-row sm:items-center">
              <Link
                href="/signup"
                className="group flex items-center gap-3 rounded-full bg-primary-foreground py-3 pl-6 pr-2 text-sm font-semibold text-primary shadow-xl transition-all duration-300 hover:opacity-90 active:scale-[0.98]"
              >
                Empezar gratis
                <span className="flex size-8 items-center justify-center rounded-full bg-primary/10 transition-transform duration-300 group-hover:translate-x-0.5">
                  <ArrowRight className="size-4" strokeWidth={2} />
                </span>
              </Link>
              <Link
                href="/contact"
                className="py-3 text-sm font-medium text-primary-foreground/60 transition-colors hover:text-primary-foreground"
              >
                Hablar con ventas →
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}