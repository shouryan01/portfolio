# 02: Dual Presentation Modes & Bottom-Right Peel Switcher

**What to build:**
Implement the interactive presentation mode system allowing visitors to toggle between Minimal Mode (typography-focused, minimal executive style) and Kinetic Mode (fluid, interactive hero canvas reacting to pointer physics with glassmorphic cards and micro-interactions). The toggle is an interactive, tactile corner peel located in the bottom-right corner of the viewport.

**Blocked by:** 01: Project Scaffold & Design Engine Foundation

**Type:** Feature
**Status:** To Do

## Acceptance criteria

- [ ] Global presentation mode state (`minimal` vs `kinetic`) stored in client storage (`localStorage`) and synced via root DOM attribute.
- [ ] Bottom-right Peel Switcher component with hover curl physics and smooth screen-wide mode flip transition.
- [ ] WebGL/Canvas shader mounted behind hero content in Kinetic Mode that tracks cursor movement with smooth spring damping.
- [ ] Auto-pause mechanism via `IntersectionObserver` when the hero canvas is scrolled out of viewport.
- [ ] Graceful fallback to static ambient radial accents when `prefers-reduced-motion` is active or on touch-only mobile devices.
- [ ] No scroll hijacking or scroll degradation across any mode.
