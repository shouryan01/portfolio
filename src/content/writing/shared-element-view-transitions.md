---
title: "Shared-Element View Transitions Without a Framework"
date: 2026-09-20
excerpt: "Using the native View Transitions API for tactile page and portrait morphs."
---

The browser's `document.startViewTransition` API lets a title in a list morph directly into an article header, or a small hero portrait expand into an About page frame—without shipping a single kilobyte of animation runtime.

Keep the rules simple: assign matching `view-transition-name` values only to the elements actively transitioning so nothing collides.
