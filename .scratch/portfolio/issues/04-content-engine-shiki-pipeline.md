# 04: Type-Safe Content Engine & Shiki Article Pipeline

**What to build:**
Create the content engine for reading Markdown files with Zod-validated frontmatter schemas for Articles and Projects. Implement server-rendered syntax highlighting using Shiki with zero client bundle overhead, an article index page with tag filtering, and a clean editorial reading view.

**Blocked by:** 01: Project Scaffold & Design Engine Foundation

**Type:** Feature
**Status:** To Do

## Acceptance criteria

- [ ] Zod content schemas defined for Articles (`title`, `slug`, `publishedAt`, `excerpt`, `tags`, `draft`) and Projects.
- [ ] Server-side markdown rendering pipeline using Shiki TextMate grammars for dark/light themes.
- [ ] Writing index page (`/writing`) listing all published articles with tag filter pills.
- [ ] Individual article view (`/writing/[slug]`) with estimated reading time, clean typography, responsive code blocks, and table of contents.
- [ ] Local tests verifying markdown parsing and frontmatter validation.
