import Image from "next/image";
import { Container } from "@/components/ui/container";

const TESTIMONIALS = [
  {
    quote:
      "Antes teníamos comandas perdidas casi todos los sábados. Con TopVent llevamos 3 meses sin un solo error de pedido. El cambio fue inmediato desde el primer día.",
    name: "Carlos Mendoza",
    role: "Chef / Propietario",
    restaurant: "La Leña Steakhouse",
    photo: "/imagenes/testimonio-1.png",
    stat: { value: "0", label: "errores en 3 meses" },
  },
  {
    quote:
      "El reporte de ventas del día me llega automático. Ya no paso media hora sacando números a mano antes de cerrar.",
    name: "Laura Ríos",
    role: "Administradora",
    restaurant: "Café El Rincón",
    photo: "/imagenes/testimonio-2.png",
    stat: null,
  },
  {
    quote:
      "Mis meseros se adaptaron en un día. La interfaz es tan clara que no tuve que dar capacitación.",
    name: "Andrés Salcedo",
    role: "Gerente de Operaciones",
    restaurant: "Marea Alta Mariscos",
    photo: null,
    stat: null,
  },
];

function Avatar({ name, photo }: { name: string; photo: string | null }) {
  const initials = name.split(" ").slice(0, 2).map((p) => p[0]).join("");
  if (photo) {
    return (
      <div className="relative size-10 shrink-0 overflow-hidden rounded-full">
        <Image src={photo} alt={name} fill className="object-cover" sizes="40px" />
      </div>
    );
  }
  return (
    <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-muted text-sm font-bold text-foreground/60">
      {initials}
    </div>
  );
}

export function TestimonialsSection() {
  const [featured, ...rest] = TESTIMONIALS;

  return (
    <section id="testimonials" className="py-24 md:py-32">
      <Container>
        {/* Section label */}
        <p className="mb-16 animate-fade-up text-[11px] font-medium uppercase tracking-[0.15em] text-muted-foreground">
          Testimonios
        </p>

        {/* Featured quote — full-width editorial */}
        <figure className="animate-fade-up delay-75">
          {/* Large opening quote mark */}
          <div
            aria-hidden
            className="mb-6 font-serif text-[6rem] leading-none text-foreground/10 select-none"
          >
            &ldquo;
          </div>

          <blockquote className="mb-10 max-w-4xl text-[clamp(1.35rem,2.8vw,2rem)] font-medium leading-[1.45] tracking-tight text-foreground">
            {featured.quote}
          </blockquote>

          <div className="flex items-center justify-between gap-6 border-t border-border pt-8">
            <figcaption className="flex items-center gap-3.5">
              <Avatar name={featured.name} photo={featured.photo} />
              <div>
                <p className="text-sm font-semibold text-foreground">{featured.name}</p>
                <p className="text-xs text-muted-foreground">
                  {featured.role} · {featured.restaurant}
                </p>
              </div>
            </figcaption>

            {featured.stat && (
              <div className="text-right">
                <p className="font-mono text-4xl font-bold tracking-tight text-foreground [font-variant-numeric:tabular-nums]">
                  {featured.stat.value}
                </p>
                <p className="text-xs text-muted-foreground">{featured.stat.label}</p>
              </div>
            )}
          </div>
        </figure>

        {/* Supporting testimonials */}
        <div className="mt-16 grid grid-cols-1 gap-0 md:grid-cols-2">
          {rest.map(({ quote, name, role, restaurant, photo }, i) => (
            <figure
              key={name}
              className={`animate-fade-up border-t border-border py-10 delay-${(i + 2) * 100} ${
                i === 0 ? "md:border-r md:pr-12" : "md:pl-12"
              }`}
            >
              <blockquote className="mb-6 text-base leading-relaxed text-muted-foreground">
                &ldquo;{quote}&rdquo;
              </blockquote>
              <figcaption className="flex items-center gap-3">
                <Avatar name={name} photo={photo} />
                <div>
                  <p className="text-sm font-semibold text-foreground">{name}</p>
                  <p className="text-xs text-muted-foreground">
                    {role} · {restaurant}
                  </p>
                </div>
              </figcaption>
            </figure>
          ))}
        </div>
      </Container>
    </section>
  );
}