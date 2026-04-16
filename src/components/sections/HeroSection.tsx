import Link from "next/link";
import Image from "next/image";
import { ArrowRight, CheckCircle, UtensilsCrossed } from "lucide-react";
import { cn } from "@/lib/utils";
import { Container } from "@/components/ui/container";

// ── Dashboard preview mockup ────────────────────────────────────────────────
const MOCK_TABLES = [
  { id: 1, status: "occupied", guests: 4, time: "42 min" },
  { id: 2, status: "free",     guests: 0, time: null },
  { id: 3, status: "occupied", guests: 2, time: "18 min" },
  { id: 4, status: "waiting",  guests: 3, time: "5 min" },
  { id: 5, status: "free",     guests: 0, time: null },
  { id: 6, status: "occupied", guests: 6, time: "28 min" },
] as const;

function DashboardPreview() {
  return (
    <div className="relative animate-fade-up delay-200">
      {/* Outer shell */}
      <div className="overflow-hidden rounded-2xl border border-border/50 bg-primary shadow-2xl shadow-foreground/[0.12]">
        {/* App topbar */}
        <div className="flex items-center justify-between border-b border-white/10 px-5 py-3.5">
          <div className="flex items-center gap-2">
            <UtensilsCrossed className="size-3.5 text-primary-foreground/50" strokeWidth={1.5} />
            <span className="text-xs font-semibold text-primary-foreground/70">TopVent</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="size-1.5 animate-pulse rounded-full bg-emerald-400" />
            <span className="text-[10px] text-primary-foreground/40">En vivo</span>
          </div>
        </div>

        {/* Metrics strip */}
        <div className="grid grid-cols-3 divide-x divide-white/10 border-b border-white/10">
          {[
            { label: "Ventas hoy",      value: "$8,340" },
            { label: "Órdenes activas", value: "11"     },
            { label: "Ocupación",       value: "4 / 6"  },
          ].map(({ label, value }) => (
            <div key={label} className="px-4 py-3 text-center">
              <p className="mb-0.5 text-[10px] text-primary-foreground/40">{label}</p>
              <p className="font-mono text-sm font-bold text-primary-foreground [font-variant-numeric:tabular-nums]">
                {value}
              </p>
            </div>
          ))}
        </div>

        {/* Tables grid */}
        <div className="grid grid-cols-3 gap-2 p-4">
          {MOCK_TABLES.map((t) => (
            <div
              key={t.id}
              className={cn(
                "rounded-xl border p-3 transition-colors duration-200",
                t.status === "occupied" && "border-emerald-500/30 bg-emerald-500/10",
                t.status === "waiting"  && "border-amber-400/30 bg-amber-400/10",
                t.status === "free"     && "border-white/10 bg-white/5"
              )}
            >
              <div className="mb-2 flex items-start justify-between">
                <span className="text-[10px] font-semibold text-primary-foreground/60">
                  Mesa {t.id}
                </span>
                <span
                  className={cn(
                    "mt-0.5 size-1.5 rounded-full",
                    t.status === "occupied" && "bg-emerald-400",
                    t.status === "waiting"  && "bg-amber-400",
                    t.status === "free"     && "bg-white/20"
                  )}
                />
              </div>
              {t.status !== "free" ? (
                <>
                  <p className="font-mono text-xs text-primary-foreground/80 [font-variant-numeric:tabular-nums]">
                    {t.guests} personas
                  </p>
                  <p className="mt-0.5 text-[10px] text-primary-foreground/35">{t.time}</p>
                </>
              ) : (
                <p className="text-[10px] text-primary-foreground/25">Disponible</p>
              )}
            </div>
          ))}
        </div>

        {/* Last order */}
        <div className="px-4 pb-4">
          <p className="mb-2 text-[10px] uppercase tracking-wider text-primary-foreground/25">
            Último pedido
          </p>
          <div className="flex items-center justify-between rounded-xl border border-white/10 bg-white/5 px-3 py-2.5">
            <div>
              <p className="text-xs font-semibold text-primary-foreground/80">
                Mesa 1 · Mesero: Andrés
              </p>
              <p className="mt-0.5 text-[10px] text-primary-foreground/35">
                2× Filete · 1× Copa de vino
              </p>
            </div>
            <span className="font-mono text-xs font-bold text-emerald-400 [font-variant-numeric:tabular-nums]">
              $786
            </span>
          </div>
        </div>
      </div>

      {/* Floating accent metric card */}
      <div className="absolute -bottom-4 -left-5 rounded-2xl border border-border bg-card px-4 py-3 shadow-lg shadow-foreground/[0.06]">
        <p className="mb-1 text-[10px] text-muted-foreground">Órdenes hoy</p>
        <div className="flex items-end gap-1.5">
          <span className="font-mono text-xl font-bold text-foreground [font-variant-numeric:tabular-nums]">
            47
          </span>
          <span className="mb-0.5 text-xs font-semibold text-emerald-600">+12%</span>
        </div>
      </div>

      {/* Floating time card */}
      <div className="absolute -right-4 top-10 rounded-2xl border border-border bg-card px-3.5 py-2.5 shadow-lg shadow-foreground/[0.06]">
        <p className="mb-0.5 text-[10px] text-muted-foreground">Tiempo promedio</p>
        <p className="font-mono text-sm font-bold text-foreground [font-variant-numeric:tabular-nums]">
          28 min
        </p>
      </div>
    </div>
  );
}

// ── Hero section ────────────────────────────────────────────────────────────
const TRUST_ITEMS = [
  "Sin tarjeta de crédito",
  "14 días gratis",
  "Configura en menos de 10 min",
];

const SOCIAL_PROOF = ["La Leña", "El Rincón", "Marea Alta", "Casa Blanca", "Fogón & Co."];

export function HeroSection() {
  return (
    <section className="relative overflow-hidden pb-24 pt-24 md:pb-36 md:pt-36">
      {/* Hero background image */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-20 overflow-hidden">
        <Image
          src="/imagenes/hero.png"
          alt=""
          fill
          className="object-cover object-center opacity-[0.06]"
          priority
          sizes="100vw"
        />
      </div>

      <Container>
        {/* Asymmetric split — text left / mockup right */}
        <div className="grid grid-cols-1 items-center gap-14 md:grid-cols-2 md:gap-10 lg:gap-20">

          {/* ── Left: Copy ── */}
          <div>
            {/* Eyebrow — editorial label, no pill */}
            <p className="mb-6 animate-fade-up flex items-center gap-2 text-[11px] font-medium uppercase tracking-[0.15em] text-muted-foreground">
              <span className="size-1 rounded-full bg-emerald-500" />
              Gestión en tiempo real
            </p>

            {/* Headline — editorial scale */}
            <h1 className="mb-7 animate-fade-up text-[clamp(2.8rem,7vw,5.5rem)] font-bold leading-[1.02] tracking-tighter text-foreground delay-75 text-balance">
              Tu restaurante,{" "}
              <em className="not-italic text-primary/65">sin caos</em>{" "}
              en la operación
            </h1>

            {/* Sub-headline — max 65ch */}
            <p className="mb-10 max-w-[50ch] animate-fade-up text-base leading-relaxed text-muted-foreground delay-150">
              TopVent conecta mesas, meseros y cocina en una sola plataforma.
              Pedidos a tiempo, mesas que rotan y reportes automáticos.
            </p>

            {/* CTAs */}
            <div className="mb-10 flex animate-fade-up flex-col items-start gap-3 delay-200 sm:flex-row sm:items-center">
              <Link
                href="/signup"
                className="group flex items-center gap-3 rounded-full bg-primary py-3 pl-6 pr-2 text-sm font-semibold text-primary-foreground shadow-lg shadow-primary/20 transition-all duration-300 hover:shadow-primary/30 hover:opacity-90 active:scale-[0.98]"
              >
                Empezar gratis
                <span className="flex size-8 items-center justify-center rounded-full bg-primary-foreground/10 transition-transform duration-300 group-hover:translate-x-0.5">
                  <ArrowRight className="size-4" strokeWidth={2} />
                </span>
              </Link>
              <Link
                href="#features"
                className="px-2 py-3 text-sm font-medium text-muted-foreground transition-colors duration-200 hover:text-foreground"
              >
                Ver cómo funciona →
              </Link>
            </div>

            {/* Trust checklist */}
            <ul className="flex animate-fade-up flex-wrap gap-x-6 gap-y-2 delay-300">
              {TRUST_ITEMS.map((item) => (
                <li key={item} className="flex items-center gap-1.5 text-[13px] text-muted-foreground">
                  <CheckCircle className="size-3.5 shrink-0 text-primary/70" strokeWidth={1.5} />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {/* ── Right: Dashboard mockup ── */}
          <DashboardPreview />
        </div>

        {/* Social proof strip */}
        <div className="mt-24 flex animate-fade-up flex-col items-center gap-4 delay-400">
          <p className="text-[11px] font-medium uppercase tracking-[0.15em] text-muted-foreground/50">
            Restaurantes que ya confían en TopVent
          </p>
          <div className="flex flex-wrap items-center justify-center gap-x-10 gap-y-2">
            {SOCIAL_PROOF.map((name) => (
              <span key={name} className="text-sm font-semibold text-foreground/30">
                {name}
              </span>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}