export const PLANS = [
  {
    id: "STARTER" as const,
    name: "Starter",
    tagline: "Para empezar sin complicaciones",
    monthlyPrice: 89,
    annualPrice: 75,
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
    id: "PRO" as const,
    name: "Pro",
    tagline: "Para restaurantes que quieren crecer",
    monthlyPrice: 199,
    annualPrice: 169,
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
    id: "ENTERPRISE" as const,
    name: "Enterprise",
    tagline: "Para cadenas y grupos con varias sucursales",
    monthlyPrice: null,
    annualPrice: null,
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

export type PlanId = (typeof PLANS)[number]["id"];
