---
title: "Designing for Pure White and Deep Ink"
date: 2026-08-12
excerpt: "Balancing hairline borders and muted metadata across both themes."
---

In light mode, a `#e6e6e8` border looks crisp against `#ffffff`. Invert blindly and you get harsh gray boxes. Dark mode needs slightly softer foreground ink (`#ededed` instead of pure `#ffffff`) and subtler borders (`#1f1f22`) so text hierarchy stays calm.

Testing both themes side-by-side—especially hover states and code blocks—catches contrast regressions before they ship.
