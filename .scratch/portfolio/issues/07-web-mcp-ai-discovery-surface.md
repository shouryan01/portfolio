# 07: Web-MCP Server & AI Agent Discovery Surface

**What to build:**
Expose native machine-readable endpoints so that AI agents (Claude, Cursor, Antigravity, etc.) can discover and query the portfolio's contents. Expose Model Context Protocol tools and clean Markdown digests (`llms.txt`).

**Blocked by:** 04: Type-Safe Content Engine & Shiki Article Pipeline

**Type:** Feature
**Status:** To Do

## Acceptance criteria

- [ ] `/api/mcp` endpoint implementing the Model Context Protocol specifications (tools: `list_articles`, `get_article`, `list_projects`, `get_bio`).
- [ ] `/.well-known/mcp.json` manifest describing the server capabilities.
- [ ] `public/llms.txt` and `/llms-full.txt` delivering structured markdown index of the entire portfolio.
- [ ] Verified agent tool execution and valid response payloads.
