---
name: frontend-design
description: This skill is for marketing design — landing pages, marketing sites, pricing pages, campaigns, and promotional content. NOT for app interfaces (dashboards, admin panels, tools).
---

# Frontend Design — Marketing & Landing Pages

Build marketing pages that convert visitors into customers.

## Scope

**Use for:** Landing pages, pricing pages, marketing sites, campaign pages, feature showcases.

**Not for:** Dashboards, admin panels, tools, and data interfaces. Redirect those to `interface-design`.

---

# The Goal

Every section of a marketing page has ONE job: move the visitor one step closer to converting. Landing pages fail when they become feature lists. They succeed when they answer the visitor's single question: "Is this for me?"

---

# Intent First

Before writing a single component, answer:

**Who is the visitor?**
Restaurant owner? Bar manager? Chain operator? Each has different fears and motivations.

**What is their biggest objection?**
Price? Complexity? "We already have something". Name it — the page must address it.

**What is the ONE conversion action?**
Sign up? Book a demo? Start free trial? Every CTA on the page leads here.

If you cannot answer these, stop and clarify before building.

---

# Page Structure for SaaS Marketing Pages

## Hero Section
- Headline: Outcome-focused, not feature-focused. "Fill more tables. Lose less orders." not "Restaurant Management Software".
- Sub-headline: Who it's for + what it does in one sentence.
- Primary CTA: Action verb + low-friction framing. "Start free" not "Register".
- Social proof: Logo strip or "X restaurants trust TopVent".

## Problem Section
- Names the pain without being dramatic. Use language the customer uses.
- 3 problems max. Each problem sets up a feature/benefit.

## Features / How It Works
- Benefits-led, not feature-led. "Your waiters never lose an order" > "Real-time order sync".
- Visual proof: mockups, screenshots, short demos.

## Pricing Section — CRITICAL for conversion
- 3 tiers maximum. Middle tier is the anchor — make it obvious.
- Show annual/monthly toggle. Annual = better perceived value.
- Each tier answers: "What type of business is this for?"
- CTA on each card. Primary style on recommended tier.
- FAQs below: address the top 3 objections about pricing.

## Social Proof
- Real testimonials with name, role, restaurant name.
- Quantified results when possible: "Reduced order errors by 80%".

## Final CTA Section
- Repeat the primary conversion action.
- Add urgency or risk-reduction: "No credit card required", "Free 14-day trial".

---

# Design Principles for Marketing Pages

## Hierarchy is everything
The visitor scans, not reads. F-pattern. Headlines must communicate value on their own.

## Color and contrast drive action
- CTA buttons must have the highest contrast on the page.
- Use ONE accent color for all CTAs. Consistency = trust.

## Whitespace is not wasted space
Dense marketing pages feel untrustworthy. Give sections room to breathe.

## Mobile-first
>60% of landing page traffic is mobile. Design mobile layout first.

## Performance = conversion
Every 100ms of load time costs conversion. Use Next.js Image, lazy loading, and static generation.

---

# Pricing Plan Architecture

For a restaurant SaaS with plans, structure around restaurant size/volume:

| Tier | Target | Key constraint |
|------|--------|----------------|
| Starter | 1 location, small venue | Tables limit, basic reports |
| Pro | 1-2 locations, medium | Full features, priority support |
| Enterprise | Chains, multi-location | Custom, dedicated support |

**Pricing anchoring:** Show Pro as "Most Popular". Make it 2-3x Starter price but with 5x value.

**Free trial beats freemium** for restaurant SaaS — operations people need to see the full product to commit.

---

# Component Patterns

## Responsive sections
All sections: `py-16 md:py-24`, max-width container, centered.

## Feature cards
Icon + title + description. 3 per row desktop, 1 per row mobile.

## Pricing cards
Border on all, highlight recommended with colored border + badge.

## Testimonial cards
Avatar + quote + name + role + restaurant.

---

# Checks Before Shipping

- [ ] Headline communicates outcome, not feature
- [ ] Each section has a single clear purpose
- [ ] CTA appears above the fold and at the bottom
- [ ] Pricing tiers are clearly differentiated
- [ ] Mobile layout reviewed
- [ ] Page loads under 3s on 4G
- [ ] No orphaned CTAs that lead nowhere
