# 1. Tech Stack and Toolchain Selection

Date: 2026-11-04

## Status

Accepted

## Context

We are rebuilding the personal portfolio and blog from scratch, moving away from a legacy Next.js fork and third-party hosted CMS (Hashnode). We need a modern, blisteringly fast, maintainable tech stack that supports executive-level minimalist presentation alongside an interactive kinetic visual mode.

## Decision

We adopt the following stack:
1. **Next.js 16 (App Router)** with React 19.
2. **Tailwind CSS v4** with CSS-first variable architecture and Base UI / Radix primitives.
3. **Oxc Toolchain**: `oxlint` for high-speed Rust-based linting and `oxfmt` (or Biome fallback) for formatting.
4. **Shiki**: Server-rendered code syntax highlighting using VS Code TextMate grammars.
5. **Git-Backed Markdown Articles**: Articles stored as `.md` files, queryable via ISR and an authenticated route.
6. **Web-MCP & Native LLM Endpoints**: Providing structured endpoints for AI agent exploration.

## Consequences

- No external CMS dependencies; zero vendor lock-in.
- Blazing-fast development and build loops using Rust-based tooling (Oxc, Turbopack).
- Server-rendered syntax highlighting produces zero client bundle overhead for Prism scripts.
