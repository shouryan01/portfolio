# 06: In-Browser Content Studio with Cloudflare R2 Uploads

**What to build:**
Build an authenticated, in-browser Content Studio at `/studio` that allows the site owner to draft, edit, and publish Articles, Projects, and global site copy. Media uploads stream directly to the existing Cloudflare R2 bucket, and saves persist directly to Git with Next.js ISR tag revalidation for instant live updates without rebuilds.

**Blocked by:** 04: Type-Safe Content Engine & Shiki Article Pipeline

**Type:** Feature
**Status:** To Do

## Acceptance criteria

- [ ] Route `/studio` protected by a secret authentication gate (`STUDIO_SECRET` / secure cookie).
- [ ] Visual editor for drafting Markdown articles with real-time preview.
- [ ] Editing interface for Projects and global site bio/contact info (`site.json`).
- [ ] Cloudflare R2 presigned upload endpoint (`/api/studio/upload`) with drag-and-drop image insertion into Markdown.
- [ ] Persistence API (`/api/studio/save`) writing to GitHub API in production and local filesystem in dev.
- [ ] Instant cache revalidation using `revalidateTag` (`articles`, `projects`, `content`) upon saving.
