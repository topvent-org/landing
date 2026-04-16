<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

<!-- BEGIN:landing-rules -->
# Landing Page — TopVent

This is a **marketing landing page** for TopVent, a restaurant management SaaS.

## Purpose
Convert restaurant owners and managers into TopVent customers through clear value communication and a frictionless signup flow.

## Tech Stack
- **Framework:** Next.js 16 (App Router, React Server Components)
- **Styling:** Tailwind CSS v4 + shadcn components
- **Language:** TypeScript (strict)

## Active Skills
- **frontend-design** (`.agents/skills/frontend-design/`) — Apply for all marketing copy, section structure, pricing design, and CTA patterns.
- **vercel-react-best-practices** (`.agents/skills/vercel-react-best-practices/`) — Apply for all React/Next.js component code, data fetching, and bundle optimisation.

## Project Structure
```
src/
  app/
    layout.tsx          # Root layout with metadata
    page.tsx            # Main landing page (assembles all sections)
    globals.css         # Design tokens (restaurant palette)
  components/
    layout/
      Navbar.tsx        # Sticky top nav
      Footer.tsx        # Site footer
    sections/
      HeroSection.tsx
      FeaturesSection.tsx
      TestimonialsSection.tsx
      PricingSection.tsx   # Annual/monthly toggle + 3 tiers
      CTASection.tsx
    ui/
      container.tsx     # Max-width wrapper
  lib/
    utils.ts            # cn() helper
```

## Design Tokens (globals.css)
| Token | Value | Meaning |
|-------|-------|---------|
| `--primary` | navy `#30364F` | Main brand, CTAs |
| `--accent` | warm beige `#E1D9BC` | Highlights |
| `--muted` | soft cream | Section backgrounds |

## Conventions
- All sections have `id=` attributes for anchor navigation (`#features`, `#pricing`, `#testimonials`).
- `"use client"` only when interactive state is required (e.g., `PricingSection` billing toggle).
- Prices are in MXN. Format with `toLocaleString("es-MX")`.
- Copy is in Spanish.

## Pricing Plans
| Plan | Monthly MXN | Annual MXN/mo | Target |
|------|-------------|---------------|--------|
| Starter | $299 | $249 | Small venue, ≤10 tables |
| Pro | $699 | $579 | Medium restaurant, unlimited tables |
| Enterprise | Custom | Custom | Chains, multi-location |

<!-- END:landing-rules -->
