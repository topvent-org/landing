"use client";

import { useEffect, useRef, useState } from "react";
import { ChevronDown, LogOut, User, LayoutDashboard, ExternalLink } from "lucide-react";
import Link from "next/link";

interface AuthUser {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: string;
}

const API_URL =
  process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:3001/api/v1";

const DASHBOARD_URL =
  process.env.NEXT_PUBLIC_DASHBOARD_URL ?? "http://localhost:3002";

export function NavbarAuth() {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [planStatus, setPlanStatus] = useState<string | null>(null);
  const [mounted, setMounted] = useState(false);
  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMounted(true);
    try {
      const raw = localStorage.getItem("authUser");
      if (raw) setUser(JSON.parse(raw) as AuthUser);
    } catch {
      // corrupted storage — ignore
    }
  }, []);

  // Fetch plan status once we know the user is logged in
  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    if (!token) return;

    fetch(`${API_URL}/auth/me`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((r) => (r.ok ? r.json() : null))
      .then((data) => {
        if (data?.restaurant?.planStatus) {
          setPlanStatus(data.restaurant.planStatus);
        }
      })
      .catch(() => {/* ignore — navbar is non-critical */});
  }, []);

  // Close dropdown when clicking outside
  useEffect(() => {
    if (!open) return;
    function handleClickOutside(e: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [open]);

  function handleSignOut() {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("authUser");
    setUser(null);
    setPlanStatus(null);
    setOpen(false);
  }

  if (!mounted) {
    return (
      <div className="flex items-center gap-5">
        <div className="hidden md:block h-4 w-20 animate-pulse rounded bg-muted" />
        <div className="h-8 w-28 animate-pulse rounded-full bg-muted" />
      </div>
    );
  }

  // ── Not logged in ──────────────────────────────────────────────────────────
  if (!user) {
    return (
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
    );
  }

  const hasActivePlan = planStatus === "ACTIVE";
  const initials = `${user.firstName[0]}${user.lastName[0]}`.toUpperCase();

  return (
    <div ref={menuRef} className="relative flex items-center gap-2">
      {/* If user has an active plan, show a direct platform access button */}
      {hasActivePlan && (
        <a
          href={DASHBOARD_URL}
          className="mr-2 hidden items-center gap-1.5 rounded-full bg-primary px-4 py-2 text-xs font-semibold text-primary-foreground transition-opacity hover:opacity-85 active:scale-[0.98] md:flex"
        >
          <ExternalLink size={12} strokeWidth={2} />
          Ir a la plataforma
        </a>
      )}

      <button
        onClick={() => setOpen((v) => !v)}
        className="flex items-center gap-2 rounded-full border border-border/50 bg-background px-3 py-1.5 text-sm font-medium text-foreground transition-colors hover:bg-muted"
        aria-haspopup="true"
        aria-expanded={open}
      >
        <span className="flex h-6 w-6 items-center justify-center rounded-full bg-primary text-[10px] font-bold text-primary-foreground">
          {initials}
        </span>
        <span className="hidden max-w-[120px] truncate md:block">
          {user.firstName}
        </span>
        <ChevronDown
          size={14}
          strokeWidth={2}
          className={`text-muted-foreground transition-transform duration-150 ${open ? "rotate-180" : ""}`}
        />
      </button>

      {/* Dropdown */}
      {open && (
        <div className="absolute right-0 top-full mt-2 w-56 origin-top-right animate-in fade-in zoom-in-95 duration-100 rounded-xl border border-border bg-card shadow-lg">
          {/* User header */}
          <div className="border-b border-border px-4 py-3">
            <p className="text-sm font-medium text-foreground truncate">
              {user.firstName} {user.lastName}
            </p>
            <p className="text-xs text-muted-foreground truncate">{user.email}</p>
          </div>

          {/* Go to platform (active plan) */}
          {hasActivePlan && (
            <div className="border-b border-border p-1">
              <a
                href={DASHBOARD_URL}
                className="flex items-center gap-2.5 rounded-lg px-3 py-2 text-sm font-medium text-primary hover:bg-primary/8 transition-colors"
                onClick={() => setOpen(false)}
              >
                <ExternalLink size={14} strokeWidth={1.75} />
                Ir a la plataforma
              </a>
            </div>
          )}

          {/* Menu items */}
          <div className="p-1">
            <a
              href="/account"
              className="flex items-center gap-2.5 rounded-lg px-3 py-2 text-sm text-foreground hover:bg-muted transition-colors"
              onClick={() => setOpen(false)}
            >
              <User size={14} strokeWidth={1.75} className="text-muted-foreground" />
              Ver cuenta
            </a>
            <a
              href="/plans"
              className="flex items-center gap-2.5 rounded-lg px-3 py-2 text-sm text-foreground hover:bg-muted transition-colors"
              onClick={() => setOpen(false)}
            >
              <LayoutDashboard size={14} strokeWidth={1.75} className="text-muted-foreground" />
              Ver planes
            </a>
          </div>

          {/* Sign out */}
          <div className="border-t border-border p-1">
            <button
              onClick={handleSignOut}
              className="flex w-full items-center gap-2.5 rounded-lg px-3 py-2 text-sm text-destructive hover:bg-destructive/8 transition-colors"
            >
              <LogOut size={14} strokeWidth={1.75} />
              Cerrar sesión
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
