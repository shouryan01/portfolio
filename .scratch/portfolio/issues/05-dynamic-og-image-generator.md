# 05: Dynamic Open Graph Image Generator

**What to build:**
Implement dynamic Open Graph (OG) social card generation at the edge using Next.js `ImageResponse` (`next/og`). When shared on social platforms (X, LinkedIn, Slack), pages and articles render branded, pixel-perfect preview images dynamically populated with page titles, descriptions, and tags.

**Blocked by:** 04: Type-Safe Content Engine & Shiki Article Pipeline

**Type:** Feature
**Status:** To Do

## Acceptance criteria

- [ ] Global OG image route handler for root pages (`/og?title=...`).
- [ ] Dedicated article OG image route (`/writing/[slug]/opengraph-image.tsx`) displaying post title, date, reading time, and tags.
- [ ] Proper `<meta property="og:image">` and `twitter:card` tags emitted in HTML metadata.
- [ ] Edge runtime execution with instant response caching.
