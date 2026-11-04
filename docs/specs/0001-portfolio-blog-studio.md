# Specification: Modern Personal Portfolio, Blog & Content Studio

## Problem Statement

The site owner currently relies on an outdated starter fork and third-party hosted platform (Hashnode) that previously cut off access. The existing codebase is heavy, lacks unified styling, lacks dynamic creative presentation, and requires manual redeployments or rigid workflows to publish updates. The owner needs an executive-grade personal portfolio and writing platform that is clean, fast, interactive, and completely under their control without third-party vendor lock-in.

## Solution

Build a modern, high-performance portfolio and blog using Next.js 16 (App Router), React 19, Tailwind CSS v4, Base UI, and Rust-based developer tooling (Oxc/Oxfmt). The platform features:
1. Dual Presentation Modes (Minimal by default, switching via an interactive bottom-right corner Peel Switcher to a Kinetic Mode with reactive WebGL/canvas background physics without scroll hijacking).
2. Native View Transitions API for seamless routing across Home, Writing, Projects, and Contact.
3. Git-backed Markdown storage for Articles and Projects with zero-rebuild ISR updates.
4. Hybrid media storage leveraging an existing Cloudflare R2 bucket for zero-egress asset delivery.
5. In-browser authenticated Studio at `/studio` to manage, edit, and publish all content types (Articles, Projects, Bio, Contact links).
6. Machine-accessible Web-MCP server endpoint (`/api/mcp`) and `llms.txt` for AI agent navigation.
7. Vercel Web Analytics for privacy-preserving, zero-cookie insights.

## User Stories

1. As a visitor, I want the portfolio to load instantly in Minimal Mode, so that I can quickly read the author's background, writing, and projects without visual distraction.
2. As a visitor, I want to click or drag the bottom-right Peel Switcher, so that I can transform the page into an interactive Kinetic Mode with fluid visuals and micro-interactions.
3. As a visitor, I want page transitions to animate smoothly using the native View Transitions API, so that moving between pages feels like a native desktop app.
4. As a visitor, I want to switch between light and dark color schemes, so that I can comfortably read in any ambient lighting environment.
5. As a visitor, I want interactive hero backgrounds in Kinetic Mode to react smoothly to my mouse movements without hijacking or degrading my natural scroll experience.
6. As a visitor, I want code snippets in articles to be highlighted cleanly with server-rendered Shiki, so that code blocks are readable with zero client-side layout shift or heavy JavaScript bundles.
7. As a visitor, I want to filter articles and projects by topic tags, so that I can explore specific domains (e.g. AI, systems, design).
8. As a visitor, I want to easily copy the author's contact email or follow external social links from the Contact page, so that I can get in touch or follow their work.
9. As an external user sharing links on social media (X, LinkedIn, Slack), I want shared articles and pages to display dynamic, branded Open Graph preview cards, so that links are recognizable and engaging.
10. As an AI agent or automated assistant, I want to access `/.well-known/mcp.json` or query `/api/mcp`, so that I can programmatically search articles, read posts, and inspect projects.
11. As an LLM web crawler, I want to fetch `/llms.txt`, so that I receive an optimized, structured markdown summary of the entire site.
12. As the site owner, I want to visit a password-protected `/studio` route, so that I can draft, update, and publish articles and projects directly from my browser without third-party CMS dependency.
13. As the site owner, I want to edit global site copy (bio, headline, social links) inside the Studio, so that I can update my profile in seconds.
14. As the site owner, I want changes saved in the Studio to update git and trigger Next.js cache revalidation immediately, so that my edits appear live on the website without waiting for full rebuilds.
15. As the site owner, I want to drag and drop images in the Studio, so that they upload directly to Cloudflare R2 storage and insert clean CDN links into my markdown without bloating the git repository.
16. As a mobile visitor, I want the site to degrade gracefully (falling back to lightweight ambient radial accents), so that my battery and frame rate are preserved.

## Implementation Decisions

### 1. Core Stack & Toolchain
- **Framework**: Next.js 16 App Router on Vercel with React 19.
- **Styling**: Tailwind CSS v4 using CSS-first variable architecture, Base UI / Radix primitives.
- **Tooling**: Oxc (`oxlint` for linting, `oxfmt` for formatting).
- **Transitions**: Native browser `View Transitions API` triggered on Next.js navigation with CSS view-transition pseudoelements.

### 2. Dual Presentation Modes & Peel Switcher
- Global state managed via a dedicated React context / HTML dataset attribute (`data-presentation-mode="minimal" | "kinetic"`), persisted in `localStorage`.
- The Peel Switcher is positioned fixed at the bottom-right corner, rendering an interactive folded-corner graphic that scales/curls on hover and triggers a page-wide mode flip.
- In Minimal Mode: Typographic purity, clean borders, high contrast, zero canvas overhead.
- In Kinetic Mode: Mounts a pointer-reactive WebGL/Canvas shader behind hero sections with `IntersectionObserver` auto-pause when out of view, coupled with glassmorphic cards and spring hover states.

### 3. Content Architecture & Studio
- Structured files:
  - Articles: `/content/articles/*.md` (with frontmatter: title, slug, publishedAt, excerpt, tags, draft).
  - Projects: `/content/projects/*.md` (with frontmatter: title, slug, year, role, tags, liveUrl, repoUrl, featured).
  - Global site profile: `/content/site.json` (author name, bio, social links, contact info).
- Validation: Zod schemas for all content models.
- Markdown rendering: Server-side markdown pipeline with Shiki for syntax highlighting.
- Studio API: `/api/studio/save` writing to GitHub Contents API in production and local filesystem in development, paired with Next.js `revalidateTag` for instantaneous cache updates.
- Media handling: Cloudflare R2 presigned URL upload endpoint (`/api/studio/upload`) returning CDN asset URLs.

### 4. AI Agent & Discovery Surface
- `/api/mcp` endpoint providing Model Context Protocol tool interfaces (`list_articles`, `get_article`, `list_projects`, `get_bio`).
- `public/llms.txt` and `app/llms-full.txt/route.ts` for automated LLM content consumption.

## Testing Decisions

- **Single High-Level Seam**: We test at the route and API contract level rather than internal helper functions.
- **Content Pipeline Tests**: Verifying that Markdown documents with frontmatter parse correctly through the Zod schema and render Shiki HTML syntax highlighting.
- **Studio API Tests**: Verifying authentication security (unauthorized requests rejected) and that save operations return valid status and invoke cache revalidation.
- **Mode Switching & View Transition Integrity**: Ensuring presentation mode toggles apply appropriate DOM attributes without throwing or crashing on clients with reduced motion preferences.

## Out of Scope

- User authentication / comments for visitors (the site is a portfolio/editorial publication, not a social forum).
- Heavy third-party headless CMS backends.
- Legacy RSS feeds (explicitly removed by user request).
- Scroll-hijacking full-page snap animations.

## Further Notes

- Existing articles from `../blog` will be migrated into the new `/content/articles/` schema once the foundation is scaffolded.
- Design quality standards will align with `impeccable`, `taste-skill`, and `ui-ux-pro-max-skill`.
