# Comprehensive Design Engine & Aesthetic Standard

A production-grade, highly actionable design guide synthesized from **Taste** (the anti-slop filter), **Impeccable** (craft, micro-details & design calibration), and **UI/UX Pro Max** (design intelligence, density, motion tiers & UX heuristics).

Use this document as the single source of truth for frontend design decisions across web projects, landing pages, applications, and portfolios.

---

## 1. Core Philosophies

1. **The Brief & Intent Win:** Specific brand identity, editorial taste, and functional goals always take precedence over generic design templates. Never let AI defaults dilute the project's unique character.
2. **Design System First:** Define design tokens, typography pairings, spacing density, and color layers in CSS variables _before_ assembling page layouts.
3. **Anti-Slop Discipline:** High design is defined as much by what you **refuse** to do as what you include. Remove the predictable visual markers that scream "AI generated."
4. **Refine vs. Redesign:** When improving an interface, diagnose first. _Refine_ to calibrate weights, contrast, and spacing within an existing direction; _Redesign_ only when the structural flow is fundamentally broken.

---

## 2. The Complete Anti-Slop Filter (Taste "DON'Ts")

Do not stack the predictable hallmarks of generic AI styling. Treat this list as an essential preflight checklist before shipping:

### Colors & Gradients

- ❌ **No purple/indigo/violet accents or blue-to-purple hero gradients** (the single biggest AI giveaway).
- ❌ **No `bg-clip-text` gradient headlines** on hero text.
- ❌ **No cream wash (`#faf8f4`)** covering the entire background of every page.
- ❌ **No neon aurora blobs**, floating blurry gradient orbs, or glowing radial backgrounds.
- ❌ **No low-contrast gray text** (`text-gray-400` / `text-gray-500` for body copy on light surfaces).

### Typography Clichés

- ❌ **No Inter everywhere**, and never use Geist, Space Grotesk, Roboto, or Arial as your sole identity.
- ❌ **No single font weight/size monotony** lacking clear scale and optical rhythm.
- ❌ **No tracked-out all-caps micro-kickers** above every single heading.
- ❌ **No vague 10-word, 56px headlines** that say nothing concrete or memorable.

### Structural & Layout Tropes

- ❌ **No centered cookie-cutter hero** (eyebrow pill + generic giant headline + primary/secondary CTA pair).
- ❌ **No identical 3-card feature grid** with a lucide icon inside a rounded pastel square.
- ❌ **No repeating the same eyebrow → title → 3-cards pattern** back-to-back across sections.
- ❌ **No Bento grids by default** unless content genuinely benefits from asymmetric spatial chunking.
- ❌ **No cards nested inside cards**, left-colored accent bars on borders, or arbitrary colored borders on rounded elements.
- ❌ **No single radius (`rounded-2xl`)** applied blindly to every button, card, modal, and input.

### Motion & Visual Effects

- ❌ **No `hover:scale-105` lift** on cards and interactive surfaces.
- ❌ **No uniform glassmorphism** (`backdrop-blur-xl` + translucent borders) on every surface.
- ❌ **No scroll-fade-up on everything** as the user scrolls.
- ❌ **No motion that ignores `prefers-reduced-motion`**.
- ❌ **No emoji as feature bullets** (🚀 ⚡ ✨ 🎯 💡 🔮).
- ❌ **No purposeless hand-drawn SVG squiggles or doodles**.

---

## 3. Typography Architecture & Optical Scaling

Treat typography like fine editorial print: intentional, expressive, and strictly hierarchical.

### The Three-Tier Font Stack

1. **Editorial Serif (`--font-serif`):**
   - **Role:** Headlines, pull-quotes, hero titles, section openers.
   - **Characteristics:** High contrast, distinct italic forms, optical sizing.
   - **Examples:** _Newsreader_, _Fraunces_, _Lora_, _Cormorant Garamond_, _Playfair Display_.
2. **Contemporary Geometric Sans (`--font-sans`):**
   - **Role:** Body prose, navigation links, UI labels, button text.
   - **Characteristics:** Clean geometry, open apertures, excellent legibility at 13px–16px.
   - **Examples:** _Plus Jakarta Sans_, _General Sans_, _Satoshi_, _Inter Display_ (when paired intentionally).
3. **Engineered Monospace (`--font-mono`):**
   - **Role:** Metadata, timestamps, status badges, code, technical metrics.
   - **Characteristics:** Tabular figures, balanced punctuation, high distinction between `0/O` and `1/l`.
   - **Examples:** _JetBrains Mono_, _Geist Mono_, _Fira Code_.

### Typography Scale & Leading Rhythms

| Element                 | Font Family | Size / Line Height                   | Tracking                      | Weight / Style              |
| :---------------------- | :---------- | :----------------------------------- | :---------------------------- | :-------------------------- |
| **Display / Hero**      | Serif       | `text-4xl sm:text-6xl` (`1.08–1.14`) | `-0.025em` (`tracking-tight`) | Normal / Italic accents     |
| **Section Title**       | Serif       | `text-2xl sm:text-3xl` (`1.2–1.25`)  | `-0.02em`                     | Medium / Normal             |
| **Subsection**          | Sans        | `text-lg sm:text-xl` (`1.35`)        | `-0.01em`                     | Semibold (`font-semibold`)  |
| **Body Prose**          | Sans        | `text-base` (`1.6–1.7`)              | `normal`                      | Regular (`font-normal`)     |
| **UI Labels / Buttons** | Sans        | `text-sm` (`1.4`)                    | `normal`                      | Medium (`font-medium`)      |
| **Micro Labels / Tags** | Mono        | `text-xs` (`1.3`)                    | `0.04em` (`tracking-wider`)   | Medium / Upper or Lowercase |
| **Metadata**            | Mono        | `text-[11px]` (`1.2`)                | `normal`                      | Regular (`font-normal`)     |

> **Measure (Line Length):** Constrain long-form prose between 45 and 75 characters (`max-w-prose` or `max-w-2xl`). Never let text stretch across full screen widths.

---

## 4. Semantic Color Architecture & Surface Layering

Avoid sterile bluish grays (`slate-900`/`slate-50`) and muddy beige. Build warmth, clarity, and true tactile depth with structured CSS variables.

### Layered Surface Schema

Surfaces stack logically from canvas to elevated modals:

```
[ Canvas: --background ]
  └─ [ Flat Inset / Wells: --surface-muted ]
      └─ [ Elevated Card: --surface-elevated ]
          └─ [ Focus / Active Highlight: --surface-subtle ]
```

### Complete Token Matrix

| CSS Variable          | Light Mode (Warm Stone) | Dark Mode (Obsidian Graphite) | Purpose                                  |
| :-------------------- | :---------------------- | :---------------------------- | :--------------------------------------- |
| `--background`        | `#fafaf9`               | `#0c0a09`                     | Base application canvas                  |
| `--foreground`        | `#1c1917`               | `#f5f5f4`                     | High-contrast readable ink               |
| `--surface-elevated`  | `#ffffff`               | `#1c1917`                     | Cards, dropdown menus, sheets            |
| `--surface-muted`     | `#f5f5f4`               | `#171513`                     | Input fills, subtle wells, pill badges   |
| `--surface-subtle`    | `#e7e5e4`               | `#292524`                     | Hover states, active pressed fills       |
| `--border`            | `#e7e5e4`               | `#292524`                     | Hairline `1px` structural borders        |
| `--border-hover`      | `#d6d3d1`               | `#44403c`                     | Interactive hover border color           |
| `--border-subtle`     | `#f0eeed`               | `#1c1917`                     | Dividers, internal card separators       |
| `--text-primary`      | `#1c1917`               | `#f5f5f4`                     | Headings, primary statements (AAA)       |
| `--text-secondary`    | `#57534e`               | `#a8a29e`                     | Secondary body, supporting descriptions  |
| `--text-tertiary`     | `#8c8883`               | `#78716c`                     | Captions, timestamps, disabled states    |
| `--accent`            | `#292524`               | `#fafaf9`                     | Primary action fills, high-intent badges |
| `--accent-foreground` | `#fafaf9`               | `#0c0a09`                     | Text/icons inside `--accent` fills       |
| `--focus-ring`        | `#292524`               | `#fafaf9`                     | Keyboard navigation focus indicator      |

---

## 5. Layout Architecture, Density & Variance (UI/UX Pro Max)

### Density Dials

Choose a spatial density that matches the nature of the application:

- **Spacious (`gap-12 md:gap-16`, `p-8 md:p-12`):** Ideal for portfolios, editorial blogs, high-end agency sites, and brand showcases.
- **Comfortable (`gap-6 md:gap-8`, `p-6`):** Ideal for standard SaaS apps, settings pages, and interactive product platforms.
- **Compact (`gap-3 md:gap-4`, `p-3.5`):** Ideal for data dashboards, developer tool chains, log viewers, and financial interfaces.

### Variance & Asymmetry (Breaking Robotic Symmetries)

- **Avoid Repetitive Grids:** Instead of four identical cards in a row, use a **2:1 asymmetric split** (e.g., one expanded featured item with deep context + two compact supporting items).
- **Contextual Hero Layouts:**
  - _Editorial Left-Aligned:_ Left-aligned serif headline with inline italics, tight paragraph, mono status tag, subtle action group.
  - _Split Showcase:_ 60/40 split with headline and bio on the left, interactive live preview or imagery on the right.
  - _Media-First:_ Immersive photo/visual block crowned with minimal typography overlays.
- **Section Transitions:** Separate sections using subtle hairline borders (`border-t border-border`), generous whitespace rhythm, or alternating background/surface fills rather than heavy colored separator blocks.

---

## 6. Interaction, Micro-Details & Craft (Impeccable Standard)

### The Calibration Dials

When auditing or polishing an interface, adjust these four levers:

1. **Weight / Tone:**
   - Need it **quieter**? Lower border contrast, switch from `--text-primary` to `--text-secondary`, reduce padding, use subtle surfaces.
   - Need it **bolder**? Increase serif display contrast, introduce intentional solid accent fills, sharpen border definitions.
2. **Surface Depth via Tone (Not Shadows):**
   - In dark mode, drop shadows are virtually invisible. Express elevation through tonal lightness:
     `Canvas: #0c0a09` → `Elevated: #1c1917` → `Hover: #292524`.
   - In light mode, combine hairline borders (`border border-border`) with faint, soft ambient shadows (`shadow-sm` or `shadow-[0_1px_2px_rgba(0,0,0,0.04)]`).
3. **Tactile Feedback:**
   - Active press states: `active:scale-[0.985]` or `active:bg-surface-subtle` gives physical button feedback.
   - Never allow hover effects to shift surrounding content: use fixed borders (`border border-border hover:border-border-hover`) instead of adding borders on hover.
4. **Form & State UX:**
   - **Inline Validation:** Feedback displays directly adjacent to inputs with clear iconography and text.
   - **Empty States:** Never show a blank screen. Include a concise statement of what belongs there and a clear next step.
   - **Loading States:** Use content-shaped skeleton placeholders rather than generic spinning loaders to eliminate perceived latency and prevent Cumulative Layout Shift (CLS).

### Motion Tiers & GSAP Guidelines

Divide motion into three clear tiers:

- **Tier 1: Micro-interactions (100ms–150ms):**
  - Hover colors, button press feedback, icon state switches.
  - Easing: `ease-out` or `cubic-bezier(0.16, 1, 0.3, 1)`.
- **Tier 2: State Transitions (200ms–300ms):**
  - Dropdown reveals, drawer slides, accordion expands, theme transitions.
  - Easing: `cubic-bezier(0.2, 0.8, 0.2, 1)`.
- **Tier 3: Page & Orchestrated Enters (400ms–600ms):**
  - Staggered list reveals, view transitions.
  - Stagger timing: `0.04s–0.06s` per item.
  - **Always check for reduced motion:**
    ```css
    @media (prefers-reduced-motion: reduce) {
      *,
      *::before,
      *::after {
        animation-duration: 0.01ms !important;
        animation-iteration-count: 1 !important;
        transition-duration: 0.01ms !important;
        scroll-behavior: auto !important;
      }
    }
    ```

---

## 7. Accessibility & Ergonomics (WCAG AAA Standards)

- **Contrast Ratios:**
  - Normal text (`< 18px`): Minimum **7:1** against its background (WCAG AAA).
  - Large text (`≥ 18px` bold or `≥ 24px` normal): Minimum **4.5:1**.
  - UI components and graphical objects: Minimum **3:1**.
- **Touch Targets:**
  - Minimum clickable dimension of **44×44px** on touch devices (`min-h-[44px] min-w-[44px]` or padding compensations).
  - Keep interactive elements spaced at least **8px** apart to prevent mis-taps.
- **Keyboard Navigation & Focus Rings:**
  - Never remove focus outlines without an explicit, high-contrast replacement:
    ```css
    focus-visible: outline-2 focus-visible: outline-offset-2 focus-visible: outline-accent;
    ```
- **Semantic HTML & Screen Reader Support:**
  - Use landmarks: `<header>`, `<nav>`, `<main>`, `<aside>`, `<footer>`.
  - Icon-only buttons must have an explicit `aria-label` or visually hidden text:
    ```tsx
    <button aria-label="Toggle theme">
      <Sun className="h-4 w-4" aria-hidden="true" />
    </button>
    ```
- **Zero Hydration Flash:**
  - When rendering theme-dependent or client-only widgets, use `useSyncExternalStore` or SSR fallback wrappers to prevent layout flickers.

---

## 8. Tailwind CSS v4 Reference Setup

Copy this configuration directly into your project's `globals.css`:

```css
@import "tailwindcss";

@custom-variant dark (&:where([data-theme=dark], [data-theme=dark] *, .dark, .dark *));

@layer base {
  :root {
    --background: #fafaf9;
    --foreground: #1c1917;

    --surface-elevated: #ffffff;
    --surface-muted: #f5f5f4;
    --surface-subtle: #e7e5e4;

    --border: #e7e5e4;
    --border-hover: #d6d3d1;
    --border-subtle: #f0eeed;

    --text-primary: #1c1917;
    --text-secondary: #57534e;
    --text-tertiary: #8c8883;

    --accent: #292524;
    --accent-foreground: #fafaf9;
    --accent-muted: #78716c;

    --focus-ring: #292524;
  }

  .dark {
    --background: #0c0a09;
    --foreground: #f5f5f4;

    --surface-elevated: #1c1917;
    --surface-muted: #171513;
    --surface-subtle: #292524;

    --border: #292524;
    --border-hover: #44403c;
    --border-subtle: #1c1917;

    --text-primary: #f5f5f4;
    --text-secondary: #a8a29e;
    --text-tertiary: #78716c;

    --accent: #fafaf9;
    --accent-foreground: #0c0a09;
    --accent-muted: #a8a29e;

    --focus-ring: #fafaf9;
  }

  * {
    border-color: var(--border);
  }

  body {
    background-color: var(--background);
    color: var(--text-primary);
    text-rendering: optimizeLegibility;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }
}

@theme {
  --color-background: var(--background);
  --color-foreground: var(--foreground);
  --color-surface-elevated: var(--surface-elevated);
  --color-surface-muted: var(--surface-muted);
  --color-surface-subtle: var(--surface-subtle);

  --color-border: var(--border);
  --color-border-hover: var(--border-hover);
  --color-border-subtle: var(--border-subtle);

  --color-text-primary: var(--text-primary);
  --color-text-secondary: var(--text-secondary);
  --color-text-tertiary: var(--text-tertiary);

  --color-accent: var(--accent);
  --color-accent-foreground: var(--accent-foreground);
  --color-accent-muted: var(--accent-muted);

  --font-serif: var(--font-newsreader), Georgia, Cambria, "Times New Roman", Times, serif;
  --font-sans:
    var(--font-sans), system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
  --font-mono: var(--font-mono), ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
}
```

---

## 9. Reusable Component Recipes

### Primary Tactile Button

```tsx
<button
  type="button"
  className="inline-flex items-center justify-center gap-2 px-4 py-2 rounded-md font-sans text-sm font-medium bg-accent text-accent-foreground hover:opacity-95 active:scale-[0.985] transition-all focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent cursor-pointer"
>
  Primary Action
</button>
```

### Secondary Surface Button

```tsx
<button
  type="button"
  className="inline-flex items-center justify-center gap-2 px-4 py-2 rounded-md font-sans text-sm font-medium border border-border bg-surface-elevated text-text-primary hover:border-border-hover hover:bg-surface-muted active:scale-[0.985] transition-all focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent cursor-pointer"
>
  Secondary Action
</button>
```

### Clean Editorial Status Pill

```tsx
<div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full border border-border bg-surface-muted text-xs font-mono text-text-secondary">
  <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
  <span>System Active</span>
</div>
```

### Elevated Content Card (Zero AI Slop)

```tsx
<div className="p-6 rounded-lg border border-border bg-surface-elevated space-y-3 transition-colors hover:border-border-hover">
  <div className="flex items-baseline justify-between gap-2">
    <h3 className="font-serif text-xl tracking-tight text-text-primary">Card Headline</h3>
    <span className="font-mono text-xs text-text-tertiary">2026.11</span>
  </div>
  <p className="font-sans text-sm text-text-secondary leading-relaxed">
    Clear, concrete description focused on substance rather than marketing buzzwords.
  </p>
</div>
```
