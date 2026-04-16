import Image from "next/image";
import {
  Table2,
  ClipboardList,
  Users,
  BarChart3,
  Zap,
  ShieldCheck,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Container } from "@/components/ui/container";

const FEATURES = [
  {
    icon: Table2,
    number: "01",
    title: "Mesas en tiempo real",
    description:
      "Ve el estado de cada mesa al instante — libre, ocupada o en espera — sin preguntar a nadie. Actúa antes de que el cliente espere.",
    image: "/imagenes/funciones-mesas-tiempo-real.png",
  },
  {
    icon: ClipboardList,
    number: "02",
    title: "Pedidos sin papel",
    description:
      "Los meseros toman pedidos desde su dispositivo. Llegan directo a cocina. Cero errores de transcripción.",
    image: "/imagenes/funciones-pedidos-sin-papel.png",
  },
  {
    icon: Users,
    number: "03",
    title: "Gestión de meseros",
    description:
      "Asigna mesas, monitorea cargas de trabajo y evalúa el desempeño de tu equipo en un solo lugar.",
    image: "/imagenes/funciones-gestion-meseros.png",
  },
  {
    icon: BarChart3,
    number: "04",
    title: "Reportes automáticos",
    description:
      "Ventas diarias, platillos más pedidos y tiempos de servicio. Los números que necesitas, sin buscarlos. Exportables a cualquier formato.",
    image: "/imagenes/funciones-reportes.png",
  },
  {
    icon: Zap,
    number: "05",
    title: "Sincronización instantánea",
    description:
      "Cocina, barra y caja siempre alineadas. Si algo cambia, todos lo saben al momento.",
    image: "/imagenes/funciones-sincronizacion.png",
  },
  {
    icon: ShieldCheck,
    number: "06",
    title: "Roles y permisos",
    description:
      "Administradores, meseros y cajeros con accesos diferenciados. Tu operación, bajo control total.",
    image: "/imagenes/funciones-roles-permisos.png",
  },
] as const;

export function FeaturesSection() {
  return (
    <section id="features" className="py-24 md:py-32">
      <Container>
        {/* Section header */}
        <div className="mb-4 flex items-end justify-between border-b border-border pb-10">
          <div className="max-w-lg">
            <p className="mb-4 animate-fade-up text-[11px] font-medium uppercase tracking-[0.15em] text-muted-foreground">
              Funciones
            </p>
            <h2 className="animate-fade-up text-[clamp(2rem,4vw,3rem)] font-bold leading-[1.05] tracking-tighter text-foreground delay-75 text-balance">
              Todo lo que tu restaurante necesita
            </h2>
          </div>
          <p className="hidden animate-fade-up max-w-[36ch] text-sm leading-relaxed text-muted-foreground delay-100 md:block">
            Desde el mesero que toma el pedido<br />hasta el reporte de cierre.
          </p>
        </div>

        {/* Numbered feature rows */}
        <div>
          {FEATURES.map(({ icon: Icon, number, title, description, image }, i) => {
            const isEven = i % 2 === 1;
            return (
              <div
                key={title}
                className="group animate-fade-up border-b border-border"
                style={{ animationDelay: `${i * 60}ms` }}
              >
                <div
                  className={cn(
                    "grid grid-cols-1 items-center gap-0 py-12 md:grid-cols-2 md:gap-16 md:py-16",
                    isEven && "md:[&>*:first-child]:order-2 md:[&>*:last-child]:order-1"
                  )}
                >
                  {/* Text block */}
                  <div className="pb-8 md:pb-0">
                    <div className="mb-6 flex items-center gap-4">
                      <span className="font-mono text-[11px] font-medium tracking-widest text-muted-foreground/50">
                        {number}
                      </span>
                      <div className="h-px flex-1 bg-border/60" />
                      <div className="flex size-8 items-center justify-center rounded-lg bg-muted">
                        <Icon className="size-4 text-foreground/60" strokeWidth={1.5} />
                      </div>
                    </div>
                    <h3 className="mb-4 text-2xl font-bold tracking-tight text-foreground md:text-3xl">
                      {title}
                    </h3>
                    <p className="max-w-[42ch] text-base leading-relaxed text-muted-foreground">
                      {description}
                    </p>
                  </div>

                  {/* Image block — clean, no heavy borders */}
                  <div className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-muted/60 shadow-md shadow-foreground/[0.05] transition-shadow duration-500 group-hover:shadow-lg group-hover:shadow-foreground/[0.08]">
                    <Image
                      src={image}
                      alt={title}
                      fill
                      className="object-contain p-4 transition-transform duration-700 group-hover:scale-[1.02]"
                      sizes="(min-width: 768px) 50vw, 100vw"
                    />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}