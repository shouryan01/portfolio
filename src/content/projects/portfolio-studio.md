---
title: "Git-Backed Content Studio"
year: "2026"
desc: "In-browser markdown editor with instant ISR revalidation and R2 media uploads."
repoUrl: "https://github.com"
order: 1
---

Built to replace third-party CMS lock-in. Edits commit directly to GitHub via API in production and local disk in development, paired with Shiki server-side highlighting.

## Architecture

Every article and project lives as a plain `.md` file with Zod-validated YAML frontmatter, keeping content portable and independent of any hosted platform.
