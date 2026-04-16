"use client";

import { useState } from "react";
import Link from "next/link";
import { Check, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { Container } from "@/components/ui/container";

const PLANS = [
  {
    id: "starter",
    name: "Starter",
    tagline: "Para empezar sin complicaciones",
    monthlyPrice: 89,
    annualPrice: 75,
    cta: "Empezar gratis",
    ctaHref: "/signup?plan=starter",
    popular: false,
    features: [
      "Hasta 10 mesas",
      "2 usuarios (admin + mesero)",
      "Pedidos en tiempo real",
      "Gestión de productos",
      "Reportes básicos (diario / semanal)",
      "Soporte por correo",
    ],
  },
  {
    id: "pro",
    name: "Pro",
    tagline: "Para restaurantes que quieren crecer",
    monthlyPrice: 199,
    annualPrice: 169,
    cta: "Empezar gratis",
    ctaHref: "/signup?plan=pro",
    popular: true,
    features: [
      "Mesas ilimitadas",
      "Usuarios ilimitados",
      "Pedidos en tiempo real",
      "Gestión completa de productos",
      "Reportes avanzados y exportables",
      "Roles y permisos personalizados",
      "Soporte prioritario (chat + correo)",
      "Historial de órdenes 12 meses",
    ],
  },
  {
    id: "enterprise",
    name: "Enterprise",
    tagline: "Para cadenas y grupos con varias sucursales",
    monthlyPrice: null,
    annualPrice: null,
    cta: "Hablar con ventas",
    ctaHref: "/contact?plan=enterprise",
    popular: false,
    features: [
      "Todo lo incluido en Pro",
      "Múltiples sucursales",
      "Dashboard centralizado",
      "API y webhooks",
      "SLA garantizado",
      "Onboarding dedicado",
    ],
  },
] as const;

const FAQS = [
  {
    q: "¿Puedo cancelar cuando quiera?",
    a: "Sí. No hay contratos de permanencia. Cancelas desde tu panel en cualquier momento.",
  },
  {
    q: "¿Qué incluye el período de prueba?",
    a: "14 días con acceso completo al plan Pro, sin tarjeta de crédito. Al vencer eliges tu plan.",
  },
  {
    q: "¿Necesito instalar algo?",
    a: "No. TopVent funciona desde el navegador. Solo necesitas un dispositivo con conexión a internet.",
  },
  {
    q: "¿Hay costo por configuración?",
    a: "No cobramos setup. El onboarding incluido en Enterprise es un servicio de acompañamiento, no un costo adicional.",
  },
];

export function PricingSection() {
  const [annual, setAnnual] = useState(true);

  return (
    <section id="pricing" className="py-24 md:py-32">
      <Container>
        {/* Header */}
        <div className="mb-4 flex flex-col items-start justify-between gap-6 border-b border-border pb-10 md:flex-row md:items-end">
          <div>
            <p className="mb-4 animate-fade-up text-[11px] font-medium uppercase tracking-[0.15em] text-muted-foreground">
              Precios
            </p>
            <h2 className="animate-fade-up text-[clamp(2rem,4vw,3rem)] font-bold leading-[1.05] tracking-tighter text-foreground delay-75 text-balance">
              Elige el plan que se ajusta
            </h2>
          </div>

          {/* Billing toggle */}
          <div className="animate-fade-up delay-100">
            <button
              type="button"
              onClick={() => setAnnual(!annual)}
              className="flex items-center gap-3 rounded-full border border-border bg-muted px-4 py-2 text-sm transition-colors hover:bg-muted/80"
            >
              <span className={cn("transition-colors", !annual ? "text-foreground font-medium" : "text-muted-foreground")}>
                Mensual
              </span>
              <span
                className={cn(
                  "relative inline-flex h-5 w-9 items-center rounded-full border-2 transition-colors",
                  annual ? "border-primary bg-primary" : "border-border bg-background"
                )}
              >
                <span
                  className={cn(
                    "absolute size-3 rounded-full bg-white shadow-sm transition-transform duration-300",
                    annual ? "translate-x-4" : "translate-x-0.5"
                  )}
                />
              </span>
              <span className={cn("transition-colors", annual ? "text-foreground font-medium" : "text-muted-foreground")}>
                Anual
              </span>
              {annual && (
                <span className="rounded-full bg-primary px-2 py-0.5 text-[10px] font-semibold text-primary-foreground">
                  2 meses gratis
                </span>
              )}
            </button>
          </div>
        </div>

        {/* Plans grid */}
        <div className="grid grid-cols-1 gap-px bg-border md:grid-cols-3">
          {PLANS.map(({ id, name, tagline, monthlyPrice, annualPrice, cta, ctaHref, popular, features }) => {
            const price = annual ? annualPrice : monthlyPrice;
            return (
              <div
                key={id}
                className={cn(
                  "relative flex flex-col bg-background p-8 transition-colors duration-200 hover:bg-muted/30",
                  popular && "bg-muted/20"
                )}
              >
                {popular && (
                  <div className="absolute right-8 top-8">
                    <span className="rounded-full bg-primary px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider text-primary-foreground">
                      Popular
                    </span>
                  </div>
                )}

                {/* Plan name */}
                <p className="mb-1 text-sm font-semibold text-foreground">{name}</p>
                <p className="mb-8 text-sm text-muted-foreground">{tagline}</p>

                {/* Price */}
                <div className="mb-8 min-h-[4rem]">
                  {price !== null ? (
                    <div className="flex items-end gap-1">
                      <span className="font-mono text-4xl font-bold tracking-tight text-foreground [font-variant-numeric:tabular-nums]">
                        S/ {price}
                      </span>
                      <span className="mb-1.5 text-sm text-muted-foreground">/ mes</span>
                    </div>
                  ) : (
                    <p className="font-mono text-4xl font-bold tracking-tight text-foreground">
                      A medida
                    </p>
                  )}
                </div>

                {/* CTA */}
                {popular ? (
                  <Link
                    href={ctaHref}
                    className="group mb-8 flex items-center gap-3 rounded-full bg-primary py-3 pl-6 pr-2 text-sm font-semibold text-primary-foreground shadow-md shadow-primary/20 transition-all hover:opacity-90 active:scale-[0.98]"
                  >
                    {cta}
                    <span className="flex size-8 items-center justify-center rounded-full bg-primary-foreground/10 transition-transform duration-300 group-hover:translate-x-0.5">
                      <ArrowRight className="size-4" strokeWidth={2} />
                    </span>
                  </Link>
                ) : (
                  <Link
                    href={ctaHref}
                    className="mb-8 rounded-full border border-border py-3 text-center text-sm font-medium text-foreground transition-all hover:border-primary/40 hover:bg-muted active:scale-[0.98]"
                  >
                    {cta}
                  </Link>
                )}

                {/* Features */}
                <ul className="flex flex-col gap-3">
                  {features.map((f) => (
                    <li key={f} className="flex items-start gap-2.5 text-sm text-muted-foreground">
                      <Check className="mt-0.5 size-4 shrink-0 text-primary/70" strokeWidth={1.5} />
                      {f}
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>

        {/* FAQs */}
        <div className="mt-20">
          <p className="mb-10 animate-fade-up text-[11px] font-medium uppercase tracking-[0.15em] text-muted-foreground">
            Preguntas frecuentes
          </p>
          <div className="grid grid-cols-1 gap-0 md:grid-cols-2">
            {FAQS.map(({ q, a }, i) => (
              <div
                key={q}
                className={cn(
                  "animate-fade-up border-t border-border py-8",
                  i % 2 === 0 ? "md:border-r md:pr-12" : "md:pl-12"
                )}
                style={{ animationDelay: `${i * 60}ms` }}
              >
                <p className="mb-2 text-sm font-semibold text-foreground">{q}</p>
                <p className="text-sm leading-relaxed text-muted-foreground">{a}</p>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}