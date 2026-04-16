"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { User, Building2, Mail, Phone, MapPin, ArrowRight } from "lucide-react";
import { PLANS } from "@/lib/plans";
import type { PlanId } from "@/lib/plans";

const API_URL =
  process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:3001/api/v1";

interface Restaurant {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  address: string | null;
  plan: PlanId;
  planStatus: "TRIAL" | "ACTIVE" | "CANCELLED";
  trialEndsAt: string | null;
  planUpdatedAt: string | null;
}

interface MeResponse {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: string;
  restaurant: Restaurant;
}

const PLAN_STATUS_LABEL: Record<Restaurant["planStatus"], string> = {
  TRIAL: "Período de prueba",
  ACTIVE: "Activo",
  CANCELLED: "Cancelado",
};

const PLAN_STATUS_COLORS: Record<Restaurant["planStatus"], string> = {
  TRIAL: "bg-amber-50 text-amber-700 border-amber-200",
  ACTIVE: "bg-emerald-50 text-emerald-700 border-emerald-200",
  CANCELLED: "bg-red-50 text-red-600 border-red-200",
};

function daysLeft(iso: string | null): number | null {
  if (!iso) return null;
  const diff = new Date(iso).getTime() - Date.now();
  return Math.max(0, Math.ceil(diff / (1000 * 60 * 60 * 24)));
}

export default function AccountPage() {
  const [data, setData] = useState<MeResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    if (!token) {
      setError("no-auth");
      setLoading(false);
      return;
    }

    fetch(`${API_URL}/auth/me`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((r) => {
        if (!r.ok) throw new Error("unauthorized");
        return r.json() as Promise<MeResponse>;
      })
      .then(setData)
      .catch(() => setError("error"))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="w-full max-w-2xl space-y-4">
        {[...Array(3)].map((_, i) => (
          <div key={i} className="h-20 animate-pulse rounded-xl bg-muted" />
        ))}
      </div>
    );
  }

  if (error === "no-auth") {
    return (
      <div className="w-full max-w-sm text-center">
        <p className="mb-4 text-sm text-muted-foreground">
          Debes iniciar sesión para ver tu cuenta.
        </p>
        <Link
          href="/login"
          className="inline-flex items-center gap-2 rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground hover:opacity-85"
        >
          Iniciar sesión <ArrowRight size={14} />
        </Link>
      </div>
    );
  }

  if (error || !data) {
    return (
      <p className="text-sm text-muted-foreground">
        No se pudo cargar tu información. Intenta de nuevo.
      </p>
    );
  }

  const currentPlan = PLANS.find((p) => p.id === data.restaurant.plan);
  const days = daysLeft(data.restaurant.trialEndsAt);

  return (
    <div className="w-full max-w-2xl space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-semibold text-foreground">Mi cuenta</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Información de tu perfil y restaurante
        </p>
      </div>

      {/* Profile card */}
      <section className="rounded-xl border border-border bg-card p-6">
        <div className="mb-4 flex items-center gap-2 text-sm font-medium text-foreground">
          <User size={15} strokeWidth={1.75} className="text-muted-foreground" />
          Perfil
        </div>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <Field label="Nombre" value={`${data.firstName} ${data.lastName}`} />
          <Field label="Correo" value={data.email} icon={<Mail size={13} />} />
          <Field
            label="Rol"
            value={data.role === "ADMIN" ? "Administrador" : "Mesero"}
          />
        </div>
      </section>

      {/* Restaurant card */}
      <section className="rounded-xl border border-border bg-card p-6">
        <div className="mb-4 flex items-center gap-2 text-sm font-medium text-foreground">
          <Building2 size={15} strokeWidth={1.75} className="text-muted-foreground" />
          Restaurante
        </div>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <Field label="Nombre" value={data.restaurant.name} />
          <Field
            label="Correo"
            value={data.restaurant.email}
            icon={<Mail size={13} />}
          />
          {data.restaurant.phone && (
            <Field
              label="Teléfono"
              value={data.restaurant.phone}
              icon={<Phone size={13} />}
            />
          )}
          {data.restaurant.address && (
            <Field
              label="Dirección"
              value={data.restaurant.address}
              icon={<MapPin size={13} />}
            />
          )}
        </div>
      </section>

      {/* Plan card */}
      <section className="rounded-xl border border-border bg-card p-6">
        <div className="mb-4 flex items-center justify-between">
          <span className="flex items-center gap-2 text-sm font-medium text-foreground">
            Plan activo
          </span>
          <Link
            href="/plans"
            className="flex items-center gap-1 text-xs font-medium text-primary hover:underline"
          >
            Ver planes <ArrowRight size={12} />
          </Link>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <span className="text-lg font-semibold text-foreground">
            {currentPlan?.name ?? data.restaurant.plan}
          </span>
          <span
            className={`rounded-full border px-2.5 py-0.5 text-xs font-medium ${PLAN_STATUS_COLORS[data.restaurant.planStatus]}`}
          >
            {PLAN_STATUS_LABEL[data.restaurant.planStatus]}
          </span>
        </div>

        {data.restaurant.planStatus === "TRIAL" && days !== null && (
          <p className="mt-2 text-sm text-muted-foreground">
            {days > 0
              ? `Tu período de prueba vence en ${days} día${days === 1 ? "" : "s"}.`
              : "Tu período de prueba ha vencido."}
            {" "}
            <Link href="/plans" className="font-medium text-foreground hover:underline">
              Elige un plan
            </Link>
          </p>
        )}

        {data.restaurant.planStatus === "ACTIVE" && data.restaurant.planUpdatedAt && (
          <p className="mt-2 text-xs text-muted-foreground">
            Activo desde{" "}
            {new Date(data.restaurant.planUpdatedAt).toLocaleDateString("es-PE", {
              day: "numeric",
              month: "long",
              year: "numeric",
            })}
          </p>
        )}
      </section>
    </div>
  );
}

function Field({
  label,
  value,
  icon,
}: {
  label: string;
  value: string;
  icon?: React.ReactNode;
}) {
  return (
    <div>
      <p className="mb-0.5 text-xs text-muted-foreground">{label}</p>
      <p className="flex items-center gap-1.5 text-sm font-medium text-foreground">
        {icon && <span className="text-muted-foreground">{icon}</span>}
        {value}
      </p>
    </div>
  );
}
