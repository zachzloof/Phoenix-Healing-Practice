# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

- **Primary:** adults in and around Chelmsford, Essex looking for hands-on bodywork for chronic pain, tension, injury or posture (Myofascial Release), or for spiritual and emotional support through grief, transition, anxiety or disconnection (Shamanic Healing). They usually arrive on a phone, often by word of mouth, and want to know who Penny is, whether it is right for them, what a session is like, what it costs, and how to book.
- **Secondary:** the site's builder (Penny's son) uses it as a portfolio showpiece. It must stand up to scrutiny from designers and prospective clients as ambitious, crafted front-end work.

## Product Purpose

A personal practice website for Penny Theophanous. It introduces Penny, explains her two services, sets expectations for a session, and converts visitors into a booking (Calendly) or an enquiry (contact form, email or phone). Success means a visitor feels safe and drawn in, understands the offering, and books.

## Positioning

One practitioner offering both deep physical fascia work and shamanic/energetic healing, so body and spirit can be treated by the same person in the same room. Personal, intuitive and local, not a clinic or a franchise.

## Operating Context

- Sessions take place in Chelmsford, Essex. Clients remain fully clothed for Myofascial Release.
- Session flow: book → first conversation → session → integration and aftercare.
- Booking via Calendly inline widget (placeholder URL `https://calendly.com/penny-theophanous`, real account still needed).
- Contact form currently simulates submission; needs Formspree/EmailJS or similar before launch.

## Capabilities and Constraints

- Stack: Vue 3 (`<script setup>`, plain JavaScript, not TypeScript) + Vite + Tailwind CSS v4. User approved adding **GSAP** (animation) and **Vue Router** (separate pages) on 2026-11-18. No other stack changes.
- Information architecture (confirmed 2026-11-18): a homepage plus one page per service, each with its own elemental world:
  - Homepage → **fire** and healing energies
  - Myofascial Release (MFR/MER) page → **earth**
  - Shamanic Healing page → **wind/air**
- Price: £60 per session (both services).
- Terminology: "Myofascial Release" (abbrev. MFR; MER also used), "Shamanic Healing".

## Brand Commitments

- Name: **Pheonix Healing Practice**. This is the client's chosen spelling; do not "correct" it without asking.
- Practitioner: Penny Theophanous.
- Contact: penny@patch-a-mumma.co.uk · 07561 702 154 · Chelmsford, Essex.
- The user explicitly asked for: an emphasis on fire and healing energies, a hippie feel, plants everywhere, intricate and highly creative detail, chakra motifs dotted throughout, and a different element per service page.

## Evidence on Hand

- Real: name, practitioner, services, service descriptions and "ideal for" lists, process steps, price, location and contact details (all in `src/components/`).
- **Placeholders (not real):** all four testimonials are invented and must stay visibly marked as placeholders in code until real ones are supplied. The "10+ years experience" claim is unverified; do not show it. All photography is Unsplash stock until Penny's own photos arrive.
- No credentials, accreditation bodies, press or reviews are on hand; do not invent any.

## Product Principles

1. Safety before spectacle: every flourish must still leave a nervous first-time visitor feeling calm and held.
2. Booking is always one step away, on every page.
3. Body and spirit are equal halves of the practice; neither service is the "main" one.
4. Truthful: no fabricated proof, credentials or claims.

## Accessibility & Inclusion

Many visitors live with chronic pain, migraines or anxiety. Honour `prefers-reduced-motion` fully, avoid flashing or strobing effects, and keep body text comfortably readable on mobile. Target WCAG 2.2 AA.
