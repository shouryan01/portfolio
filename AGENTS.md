# Agent Instructions

## Agent skills

### Issue tracker

Issues are tracked in Linear project `portfolio-8697af83f6a4` via the Linear MCP server. See `docs/agents/issue-tracker.md`.

### Triage labels

Linear Kanban states (`To Do`, `Doing`, `Done`, `Won't Do`) and type labels (`Bug`, `Feature`, `Improvement`, `Chore`, `Spike`). See `docs/agents/triage-labels.md`.

### Domain docs

Single-context (`GLOSSARY.md` + `docs/adr/`). See `docs/agents/domain.md`.

<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
