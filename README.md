# Ride Your Flame — Website & Registration Experience

A responsive, high-performance endurance event website and 3-step registration flow for **Ride Your Flame**, an event offering premier road/gravel cycling and mountain trail running experiences in the Cascade Foothills.

Built with **Next.js 15 (App Router)**, **React 19**, **TypeScript**, **Tailwind CSS**, and **Zod**.

---

## 1. Design & Creative Direction

- **Art Direction**: Athletic editorial restraint. Inspired by the precision of a classic race guide and the atmosphere of outdoor sports editorial—not a SaaS landing page or fitness tracker dashboard.
- **Palette**:
  - Ground: `#FAF8F5` (warm off-white canvas)
  - Typography: `#18181B` (crisp deep charcoal, high contrast)
  - Accents: `#C2410C` (controlled ember terracotta; meets WCAG 2.2 AA with 5.2:1 contrast against `#FAF8F5` and 4.6:1 against white text)
  - Hairline rules: `#E7E2DA`
- **Typography & Numerals**: High-contrast grotesque sans with tabular figures (`font-variant-numeric: tabular-nums`) across distances, elevations, times, and prices.
- **AI-Slop Bans Enforced**:
  - No purple/blue gradients or glassmorphism.
  - No floating particles or glowing borders.
  - No emojis as interface icons (all SVG via Lucide).
  - No fake reviews, artificial counters, or fabricated urgency.

---

## 2. Event Structure & Participation Model

- **Separate Disciplines**: Running and cycling are independent participation choices within one event (not a duathlon).
- **Centralized Event Configuration** (`src/config/event.ts`):
  - 3 Cycling Distances: Gran Fondo 120K, Gravel Explorer 65K, Valley Tour 35K.
  - 3 Trail Running Distances: Mountain Trail Marathon 42K, Ridge Half Marathon 21K, Valley Trail 10K.
  - Full logistics: packet pickup schedule, wave start times, parking & transit info, bag drop, mandatory/recommended equipment checklists, and accessibility coordinator contacts.
  - Explicit domain sentinel states: distinguishes between `0`, `"unknown"`, `"not_applicable"`, and `"not_yet_announced"`.

---

## 3. Accessible Multi-Step Registration Flow (`/register`)

Adheres strictly to the **W3C Multi-Page Forms** guidelines and modern Next.js form handling patterns:

- **Dynamic Page Titles**: Automatically updates `<title>` per step (`Step 1 of 3: Choose Entry...`).
- **Accessible Step Indicator**: Uses an ordered list `<ol>` with visually hidden text for screen readers ("Completed step: ", "Current step: ") and clickable links to completed steps.
- **Data Preservation**: Navigating backward via the "Back" button or step indicator preserves all entered participant details and selections.
- **Client & Server Validation**:
  - Validated on client and server with Zod.
  - Inline field errors connected via `aria-describedby` and `aria-invalid`.
  - Linked Error Summary at the top of the form after failed submissions, announcing via `role="alert"` and automatically shifting keyboard focus.
  - Minimum age verification: dynamically calculates age on event day (October 17, 2026) against category minimums (e.g. 18+ for Gran Fondo and Trail Marathon).
- **Pricing & Payment Integrity**:
  - Server-side authoritative price calculations: base entry + facility fee + sales tax.
  - Unchecked-by-default consents for liability waiver and rules agreement.
  - Idempotent transaction processing preventing duplicate registrations.
  - Distinct confirmation receipt state at `/register/confirmation` with reference code, arrival instructions, print receipt, and calendar `.ics` download.

---

## 4. Getting Started

### Prerequisites
- Node.js 18.18+ or 20+
- npm

### Installation
```bash
# Install dependencies
npm install

# Run development server
npm run dev
```
Visit [http://localhost:3000](http://localhost:3000) in your browser.

### Running Automated Tests
```bash
# Run Vitest test suite
npm run test
```

### Type Checking & Production Build
```bash
# Run strict TypeScript validation
npm run lint

# Compile production Next.js build
npm run build
```

---

## 5. Environment Variables & Demo Configuration

See `.env.example` for reference:
```ini
NEXT_PUBLIC_DEMO_MODE=true
```
- When `NEXT_PUBLIC_DEMO_MODE=true`, the registration checkout acts as a simulated adapter. It validates data, enforces idempotency, generates realistic reference codes (`RYF-2026-XXXX`), and routes to confirmation without charging real cards.
- **To integrate live production rails**: Connect Stripe Elements / Checkout in `src/lib/services/registrationService.ts` using `STRIPE_SECRET_KEY` and save participant records to Postgres / Supabase.

---

## 6. Asset Attribution

Outdoor photography curated from Unsplash under open editorial licenses:
- Hero cycling image: Photo by Victor Xok (alpine pass cycling).
- Trail running images: Photos by David Marcu & Peter Conlan (Pacific Northwest trails).
- Pack cycling image: Photo by Coen van de Broek (gravel and road peloton).

---

## 7. QA Acceptance Checklist

- [x] Landing-page category selection carries seamlessly into registration (`/register?entry=...`).
- [x] Direct registration entry works without pre-selected params.
- [x] Back navigation between steps preserves all form input.
- [x] Invalid submissions produce accessible, linked error summaries and field-level notices.
- [x] Pricing remains identical across selection cards, order summary, review, and confirmation.
- [x] Unavailable/sold-out categories cannot be selected or submitted.
- [x] Duplicate submissions are prevented with visible pending button states and idempotency.
- [x] Demo checkout simulation is explicitly labeled and cannot be mistaken for a real charge.
- [x] Keyboard-only completion is fully functional (`Tab`, `Space`, `Enter`).
- [x] Mobile layouts display with zero horizontal overflow, 44x44px touch targets, and collapsible summaries.
