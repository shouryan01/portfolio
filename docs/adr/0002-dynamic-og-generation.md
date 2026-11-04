# 2. Dynamic Open Graph Image Generation Architecture

Date: 2026-11-04

## Status

Accepted

## Context

Social sharing cards (Open Graph images) need to render high-fidelity, branded preview images dynamically for articles and portfolio pages when shared across platforms like X/Twitter, LinkedIn, Slack, and Discord.

## Decision

We adopt Next.js built-in `ImageResponse` (`next/og`, powered by Satori and Resvg) directly in Route Handlers (`app/og/route.tsx` or `app/writing/[slug]/opengraph-image.tsx`).

## Rationale

- **Native Next.js integration**: No extra external microservices or Puppeteer instances required.
- **Pure React/JSX styling**: Generates crisp SVG and PNG images on edge or node runtime using standard Tailwind/CSS flexbox syntax.
- **Fast, zero external dependency**: Ships with Next.js out of the box.

## Consequences

- Full control over typography, branding, article title, and date in preview images.
- Instant, cacheable generation at the edge.
