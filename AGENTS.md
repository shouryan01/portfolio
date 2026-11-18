# Agent Instructions

Personal portfolio and blog built with **Astro 7** (Vite 8), **plain CSS**, and **Markdown Content Collections**, deployed statically to **Cloudflare Pages**.

## Commands

- `pnpm dev` — Start local dev server (`http://localhost:4321`)
- `pnpm build` — Build static site into `dist/`
- `pnpm preview` — Preview built `dist/` locally

## Structure

- `src/site.config.ts` — Central config for author name, bio, email, and social/photography links
- `src/content/writing/*.md` — Blog posts (`title`, `date` as `YYYY-MM-DD`, `excerpt`, `draft`)
- `src/content/projects/*.md` — Project pages (`title`, `year`, `desc`, `liveUrl?`, `repoUrl?`, `order`)
- `src/content.config.ts` — Zod schemas and `glob` loaders for collections
- `src/layouts/BaseLayout.astro` — Shared shell, View Transitions (`<ClientRouter />`), Liquid Glass scroll blur, theme/favicon sync, nav pill magnet, and keyboard shortcuts (`H`, `P`, `W`, `A`, `T`)
- `src/styles/global.css` — Light/dark CSS variables, blur reveals, `linear()` springs, `interpolate-size` Archive, and Shiki dual-theme styles
- `public/favicon.svg` — Adaptive `S` favicon

## Conventions

- Keep public pages zero-framework-JS (no React, no Tailwind); rely on native CSS and small progressive-enhancement scripts.
- Preserve `prefers-reduced-motion: reduce` fallbacks and bot-safe email assembly in `BaseLayout.astro`.
- Run `pnpm build` before committing or deploying to Cloudflare Pages (`dist/`).
