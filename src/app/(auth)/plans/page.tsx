"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { Check, ArrowRight, Loader2 } from "lucide-react";
import { PLANS } from "@/lib/plans";
import type { PlanId } from "@/lib/plans";
import { cn } from "@/lib/utils";

const API_URL =
  process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:3001/api/v1";

type PlanStatus = "TRIAL" | "ACTIVE" | "CANCELLED";

interface RestaurantPlan {
  plan: PlanId;
  planStatus: PlanStatus;
  trialEndsAt: string | null;
  planUpdatedAt: string | null;
}

const PLAN_STATUS_LABEL: Record<PlanStatus, string> = {
  TRIAL: "Período de prueba",
  ACTIVE: "Activo",
  CANCELLED: "Cancelado",
};

const PLAN_STATUS_COLORS: Record<PlanStatus, string> = {
  TRIAL: "bg-amber-50 text-amber-700 border-amber-200",
  ACTIVE: "bg-emerald-50 text-emerald-700 border-emerald-200",
  CANCELLED: "bg-red-50 text-red-600 border-red-200",
};

function daysLeft(iso: string | null): number | null {
  if (!iso) return null;
  const diff = new Date(iso).getTime() - Date.now();
  return Math.max(0, Math.ceil(diff / (1000 * 60 * 60 * 24)));
}

declare global {
  interface Window {
    Culqi: {
      publicKey: string;
      settings: (opts: {
        title: string;
        currency: string;
        description: string;
        amount: number;
      }) => void;
      open: () => void;
      close: () => void;
      token?: { id: string; email: string };
      order?: unknown;
    };
    culqi?: () => void;
  }
}

export default function PlansPage() {
  const [restaurantPlan, setRestaurantPlan] = useState<RestaurantPlan | null>(null);
  const [loading, setLoading] = useState(true);
  const [paying, setPaying] = useState<PlanId | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [annual, setAnnual] = useState(true);

  const pendingRef = useRef<{
    planId: PlanId;
    billing: "monthly" | "annual";
    amount: number;
  } | null>(null);

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    if (!token) {
      setLoading(false);
      return;
    }

    fetch(`${API_URL}/auth/me`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((r) => r.json())
      .then((d) => {
        setRestaurantPlan({
          plan: d.restaurant.plan,
          planStatus: d.restaurant.planStatus,
          trialEndsAt: d.restaurant.trialEndsAt,
          planUpdatedAt: d.restaurant.planUpdatedAt,
        });
      })
      .catch(() => {/* not logged in or error — still show plans */})
      .finally(() => setLoading(false));
  }, []);

  /* ── Load Culqi.js ── */
  useEffect(() => {
    if (document.getElementById("culqi-script")) return;
    const script = document.createElement("script");
    script.id = "culqi-script";
    script.src = "https://checkout.culqi.com/js/v4";
    script.async = true;
    document.head.appendChild(script);
  }, []);

  /* ── Culqi global callback ── */
  useEffect(() => {
    window.culqi = async () => {
      const culqiToken = window.Culqi?.token?.id;
      if (!culqiToken || !pendingRef.current) return;

      const { planId, billing } = pendingRef.current;
      pendingRef.current = null;

      const authToken = localStorage.getItem("accessToken");
      if (!authToken) return;

      try {
        const res = await fetch(`${API_URL}/auth/me/subscribe`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${authToken}`,
          },
          body: JSON.stringify({ culqiToken, plan: planId, billing }),
        });

        const data = await res.json() as RestaurantPlan & { message?: string };

        if (!res.ok) {
          setError(data.message ?? "El pago no pudo procesarse. Intenta de nuevo.");
        } else {
          setRestaurantPlan((prev) => ({ ...(prev ?? data), ...data }));
        }
      } catch {
        setError("No se pudo completar el pago. Intenta de nuevo.");
      } finally {
        setPaying(null);
        window.Culqi?.close();
      }
    };

    return () => {
      window.culqi = undefined;
    };
  }, []);

  /* ── Reset spinner if user dismisses modal without paying ── */
  useEffect(() => {
    function handleFocus() {
      // Give Culqi callback time to run first before resetting
      setTimeout(() => {
        if (pendingRef.current) {
          pendingRef.current = null;
          setPaying(null);
        }
      }, 300);
    }
    window.addEventListener("focus", handleFocus);
    return () => window.removeEventListener("focus", handleFocus);
  }, []);

  function openCulqiCheckout(
    planId: PlanId,
    billing: "monthly" | "annual",
    amount: number,
    planName: string,
  ) {
    const token = localStorage.getItem("accessToken");
    if (!token) {
      window.location.href = "/signup";
      return;
    }

    setError(null);
    setPaying(planId);
    pendingRef.current = { planId, billing, amount };

    const publicKey = process.env.NEXT_PUBLIC_CULQI_PUBLIC_KEY ?? "";
    window.Culqi.publicKey = publicKey;
    window.Culqi.settings({
      title: "TopVent",
      currency: "PEN",
      description: `Plan ${planName} - ${billing === "annual" ? "Anual" : "Mensual"}`,
      amount,
    });
    window.Culqi.open();
  }

  const currentPlan = restaurantPlan?.plan ?? null;
  const days = daysLeft(restaurantPlan?.trialEndsAt ?? null);

  return (
    <div className="w-full max-w-4xl">
      {/* Header */}
      <div className="mb-2">
        <h1 className="text-2xl font-semibold text-foreground">Planes</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          {restaurantPlan
            ? "Gestiona tu suscripción o cambia de plan cuando quieras."
            : "Elige el plan que mejor se adapte a tu restaurante."}
        </p>
      </div>

      {/* Current plan banner */}
      {restaurantPlan && !loading && (
        <div className="mb-8 flex flex-wrap items-center gap-3 rounded-xl border border-border bg-card px-5 py-4">
          <span className="text-sm text-muted-foreground">Plan actual:</span>
          <span className="font-semibold text-foreground">
            {PLANS.find((p) => p.id === currentPlan)?.name ?? currentPlan}
          </span>
          <span
            className={`rounded-full border px-2.5 py-0.5 text-xs font-medium ${PLAN_STATUS_COLORS[restaurantPlan.planStatus]}`}
          >
            {PLAN_STATUS_LABEL[restaurantPlan.planStatus]}
          </span>
          {restaurantPlan.planStatus === "TRIAL" && days !== null && (
            <span className="text-xs text-muted-foreground">
              · {days > 0 ? `Vence en ${days} día${days === 1 ? "" : "s"}` : "Prueba vencida"}
            </span>
          )}
          {restaurantPlan.planStatus === "ACTIVE" && restaurantPlan.planUpdatedAt && (
            <span className="text-xs text-muted-foreground">
              · Activado el{" "}
              {new Date(restaurantPlan.planUpdatedAt).toLocaleDateString("es-PE", {
                day: "numeric",
                month: "long",
                year: "numeric",
              })}
            </span>
          )}
        </div>
      )}

      {/* Billing toggle */}
      <div className="mb-8">
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

      {/* Error */}
      {error && (
        <p className="mb-6 rounded-lg border border-destructive/30 bg-destructive/8 px-4 py-3 text-sm text-destructive">
          {error}
        </p>
      )}

      {/* Plan cards */}
      <div className="grid grid-cols-1 gap-px bg-border md:grid-cols-3">
        {PLANS.map(({ id, name, tagline, monthlyPrice, annualPrice, popular, features }) => {
          const price = annual ? annualPrice : monthlyPrice;
          const isCurrent = currentPlan === id;
          const isPaying = paying === id;
          const chargeAmount =
            price !== null
              ? annual
                ? (annualPrice ?? 0) * 12 * 100
                : (monthlyPrice ?? 0) * 100
              : 0;

          return (
            <div
              key={id}
              className={cn(
                "relative flex flex-col bg-background p-8",
                popular && "bg-muted/20",
                isCurrent && "ring-2 ring-primary ring-inset"
              )}
            >
              {/* Badges */}
              <div className="absolute right-8 top-8 flex flex-col items-end gap-1.5">
                {isCurrent && (
                  <span className="rounded-full bg-primary/10 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider text-primary">
                    Tu plan
                  </span>
                )}
                {popular && !isCurrent && (
                  <span className="rounded-full bg-primary px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider text-primary-foreground">
                    Popular
                  </span>
                )}
              </div>

              <p className="mb-1 text-sm font-semibold text-foreground">{name}</p>
              <p className="mb-8 text-sm text-muted-foreground">{tagline}</p>

              {/* Price */}
              <div className="mb-1 min-h-[4rem]">
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

              {/* Annual total hint */}
              {price !== null && annual ? (
                <p className="mb-6 text-xs text-muted-foreground">
                  S/ {(annualPrice ?? 0) * 12} facturado anualmente
                </p>
              ) : (
                <div className="mb-6" />
              )}

              {/* CTA */}
              {id === "ENTERPRISE" ? (
                <a
                  href="mailto:ventas@topvent.app?subject=Plan%20Enterprise"
                  className="mb-8 rounded-full border border-border py-3 text-center text-sm font-medium text-foreground transition-all hover:border-primary/40 hover:bg-muted active:scale-[0.98]"
                >
                  Hablar con ventas
                </a>
              ) : isCurrent ? (
                <div className="mb-8 flex items-center justify-center gap-2 rounded-full border border-primary/30 bg-primary/5 py-3 text-sm font-medium text-primary">
                  <Check size={15} strokeWidth={2} />
                  Plan actual
                </div>
              ) : (
                <button
                  onClick={() => openCulqiCheckout(id, annual ? "annual" : "monthly", chargeAmount, name)}
                  disabled={!!paying}
                  className={cn(
                    "group mb-8 flex items-center justify-center gap-3 rounded-full py-3 text-sm font-semibold transition-all active:scale-[0.98] disabled:opacity-60 disabled:cursor-not-allowed",
                    popular
                      ? "bg-primary pl-6 pr-2 text-primary-foreground shadow-md shadow-primary/20 hover:opacity-90"
                      : "border border-border pl-5 pr-3 text-foreground hover:border-primary/40 hover:bg-muted"
                  )}
                >
                  {isPaying ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    <>
                      {restaurantPlan ? "Cambiar a " + name : "Empezar con " + name}
                      {popular && (
                        <span className="flex size-8 items-center justify-center rounded-full bg-primary-foreground/10 transition-transform duration-300 group-hover:translate-x-0.5">
                          <ArrowRight className="size-4" strokeWidth={2} />
                        </span>
                      )}
                    </>
                  )}
                </button>
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

      {/* Payment note */}
      <p className="mt-6 text-center text-xs text-muted-foreground">
        Pagos seguros procesados por{" "}
        <span className="font-medium text-foreground">Culqi</span>. Aceptamos
        Visa, Mastercard y American Express.
      </p>

      {/* Not logged in note */}
      {!loading && !restaurantPlan && (
        <p className="mt-4 text-center text-sm text-muted-foreground">
          ¿Ya tienes cuenta?{" "}
          <Link href="/login" className="font-medium text-foreground hover:underline">
            Inicia sesión
          </Link>{" "}
          para gestionar tu plan.
        </p>
      )}
    </div>
  );
}
