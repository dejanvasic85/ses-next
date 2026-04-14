---
title: 'Implement a dark theme across the website'
status: captured
priority: unset
source: internal
captured: '2026-04-14'
domain: design
prd: ''
tags:
  - dark-theme
  - ui
  - accessibility
  - frontend
---

## Problem / Opportunity

The site currently offers only a light visual theme, which limits user preference support and can reduce comfort for users who browse in low-light environments.

## Context

Global styling in `packages/ses-next/styles/globals.css` configures DaisyUI with only `light --default` and defines a single `light` theme. There is no alternate dark token set and no theme switching logic.

The root layout in `packages/ses-next/src/app/layout.tsx` sets base structure and providers, but does not apply any theme mode state, `data-theme` toggling, or system-preference handling. A large portion of components and pages use fixed utility classes like `bg-white`, `text-gray-*`, and `text-gray-900`, which would not adapt automatically to dark mode.

## Rough Scope

- Add a dark DaisyUI theme token set in global styles and configure dual-theme support.
- Introduce theme mode handling (system preference + optional manual toggle) at app layout/provider level.
- Refactor key shared components and top-level pages from hardcoded light colors to theme-aware semantic classes.
- Validate contrast and legibility in both modes, including nav, cards, forms, and content-heavy pages.

## Success Signal

- Users can view the site in both light and dark themes without visual regressions.
- Core pages remain readable and accessible with strong color contrast in dark mode.
- Theme behavior is consistent across navigation, content pages, and interactive components.

## Open Questions

- Should dark mode default to system preference, or stay light by default until user opt-in?
- Do we want a persistent user toggle in the navbar, footer, or settings-style control?
- Should dark mode launch across all routes at once or incrementally by page group?

## References

- `packages/ses-next/styles/globals.css`
- `packages/ses-next/src/app/layout.tsx`
- `packages/ses-next/src/components/Navbar.tsx`
- `packages/ses-next/src/components/Contact.tsx`
- `packages/ses-next/src/app/services/page.tsx`
