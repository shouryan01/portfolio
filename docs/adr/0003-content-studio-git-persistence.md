# 3. Content Studio and Git-Backed Persistence

Date: 2026-11-04

## Status

Accepted

## Context

The site owner needs an in-browser authoring environment to manage, edit, and publish all types of content across the site—including Articles, Projects, Bio/Hero copy, and Social/Contact links—without third-party CMS lock-in or triggering full Vercel redeploys.

## Decision

We implement a unified **Studio** at `/studio` (or `/admin`) protected by a secret authentication token (`STUDIO_SECRET` / HTTP-only session cookie):
1. **Source of Truth**: 
   - Articles: Markdown files under `/content/articles/*.md`
   - Projects: Markdown files under `/content/projects/*.md`
   - Global Site Content (Bio, Hero tagline, Social links): Structured configuration in `/content/site.json`
2. **Production Storage Engine**: GitHub Contents API (`octokit` or native `fetch`) to commit edits directly to the repository.
3. **Local Development Storage Engine**: Direct filesystem operations (`node:fs/promises`).
4. **Cache Invalidation**: On successful save, the studio invokes Next.js `revalidatePath` and `revalidateTag` (`content`, `articles`, `projects`) for instantaneous live updates across all pages.

## Consequences

- No external database or headless CMS fee.
- Content remains 100% human-readable `.md` in version control.
- Publishing takes effect instantly across all pages without waiting for Vercel build pipelines.
