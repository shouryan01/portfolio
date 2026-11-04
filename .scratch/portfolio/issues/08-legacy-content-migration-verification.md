# 08: Legacy Content Migration & Verification

**What to build:**
Migrate existing articles and assets from the previous blog (`../blog`) into the new Markdown content schema. Perform comprehensive end-to-end verification across all routes, mode switches, View Transitions, Vercel Analytics integration, and production build checks.

**Blocked by:** 04: Type-Safe Content Engine & Shiki Article Pipeline, 06: In-Browser Content Studio with Cloudflare R2 Uploads

**Type:** Chore
**Status:** To Do

## Acceptance criteria

- [ ] Existing markdown articles from `../blog` migrated and validated against the new Zod schema.
- [ ] Vercel Web Analytics component integrated into root layout.
- [ ] `oxlint` and `oxfmt` pass with zero warnings or errors.
- [ ] Production build (`pnpm build`) succeeds cleanly with all static pages generated.
- [ ] Manual smoke test checklist verifying Light/Dark themes, Minimal/Kinetic modes, View Transitions, and Studio authoring.
