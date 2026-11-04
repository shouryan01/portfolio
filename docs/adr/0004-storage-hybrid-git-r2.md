# 4. Storage Architecture: Hybrid Git Content + Cloudflare R2 Media

Date: 2026-11-04

## Status

Accepted

## Context

We evaluated two content storage architectures:
1. **GitHub API only**: Storing both markdown and images/media directly in Git.
2. **Cloudflare R2 / Blob Storage**: S3-compatible object storage (already provisioned for the user's photo blog).
3. **Hybrid Architecture**: Markdown documents and structured site metadata in Git; binary media (cover images, screenshots, article assets) uploaded to Cloudflare R2 / Blob.

## Decision

We adopt the **Hybrid Architecture**:
- **Articles, Projects, and Site Config**: Stored in Git (Markdown + structured frontmatter/JSON). Git provides complete version history, rollback capability, diffs in PRs, and branch preview deployments on Vercel without storage costs.
- **Media Assets (Images, Screenshots, Photo Blog embeds)**: Stored in the existing Cloudflare R2 / Blob bucket. The in-browser `/studio` uploads binary assets directly to R2 via a presigned URL endpoint, inserting the public CDN URL into the Markdown.

## Rationale

- Git repositories stay lightweight and fast to clone/build without heavy image blobs bloating the `.git` tree.
- Zero egress fees with Cloudflare R2 for delivering high-resolution images.
- Unifies media infrastructure with the existing photo blog.
