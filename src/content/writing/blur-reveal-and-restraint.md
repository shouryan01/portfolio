---
title: "On Blur Reveals and Restraint"
date: 2026-11-18
excerpt: "Why 680ms of soft Gaussian blur feels calmer than a bounce."
---

Most web animations announce themselves too loudly. When an element slides in from 40 pixels away, your eye has to track its trajectory before it can read the words.

A subtle blur reveal—starting at `blur(10px)` and `translateY(8px)`, settling with an exponential out curve—lets typography materialize in place. It feels less like a PowerPoint slide and more like ink focusing on paper.

## Timing as a material

Interactive state changes (hover, press, tab switches) should stay between 140ms and 240ms. Entry reveals can breathe a little longer—around 600ms—as long as stagger delays stay tight (50–70ms per block) so the page never feels slow.

> Animation should clarify spatial relationships or reward curiosity, never delay reading.

```css
@keyframes blurReveal {
  from {
    opacity: 0;
    filter: blur(10px);
    transform: translateY(8px);
  }
  to {
    opacity: 1;
    filter: blur(0px);
    transform: translateY(0);
  }
}
```

## Spatial continuity

When navigating between an index list and a full essay, shared-element View Transitions preserve your mental map of where the text came from. The title glides into place rather than vanishing and reappearing.

Pair this with `prefers-reduced-motion: reduce` so visitors who prefer static pages get instant, crisp text with zero delay.

## Scroll-driven restraint

Even scroll-linked effects work best when they stay quiet: a 1.5px reading hairline and soft edge blurs that fade away the moment you reach the top or bottom of the page.
