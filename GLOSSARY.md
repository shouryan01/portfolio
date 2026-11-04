# Glossary

Canonical vocabulary used across this portfolio project.

### Core Concepts

- **Presentation Mode**: The visual rendering state of the website. Persisted in client storage (`minimal` vs `kinetic`).
- **Minimal Mode**: High-contrast, typography-focused, fast, executive-style visual presentation without background simulation. Default mode.
- **Kinetic Mode**: Interactive visual presentation featuring fluid background canvas / shaders reacting to cursor physics, glassmorphic surfaces, and motion micro-interactions.
- **Peel Switcher**: The interactive bottom-right corner dog-ear / page-turn component used to toggle between Minimal and Kinetic modes.
- **Article**: A long-form blog post written in Markdown (`.md`) containing frontmatter metadata and rendered with Shiki syntax highlighting.
- **Project**: A curated portfolio item highlighting work, role, stack, and interactive links, editable via the online studio.
- **Studio**: The lightweight, password-protected in-browser editor (`/studio` or `/admin`) for drafting, editing, and publishing all content types (Articles, Projects, Bio/Hero copy, and Contact links) directly to Git with instant ISR refresh.
- **Spike**: An exploratory ticket or prototype task used to evaluate feasibility or resolve open design/technical questions.
- **Tag**: A taxonomy label assigned to Articles or Projects for faceted filtering (e.g. `ai`, `engineering`, `design`).
- **Web-MCP**: Machine-readable Model Context Protocol endpoints (`/api/mcp`) allowing AI agents to query the portfolio's articles, projects, and contact info.
