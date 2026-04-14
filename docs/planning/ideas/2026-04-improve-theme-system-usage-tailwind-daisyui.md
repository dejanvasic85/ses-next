---
title: 'Improve website theming by properly using Tailwind and DaisyUI theme system'
status: captured
priority: unset
source: internal
captured: '2026-04-14'
domain: design
prd: ''
tags:
  - theming
  - tailwind
  - daisyui
  - design-system
---

## Problem / Opportunity

The project is configured with Tailwind + DaisyUI, but most UI styling still relies on hardcoded utility colors. This reduces consistency, makes theme changes expensive, and underuses the existing theme token system.

## Context

Global configuration in `packages/ses-next/styles/globals.css` defines DaisyUI with a single custom `light` theme, but component styling across the app frequently uses direct color utilities (`bg-white`, `text-gray-*`, `border-gray-*`, `bg-slate-*`, `text-blue-*`) instead of semantic theme classes.

Examples include `packages/ses-next/src/components/Hero.tsx`, `packages/ses-next/src/components/Navbar.tsx`, `packages/ses-next/src/app/services/page.tsx`, and many shared card/content components. This indicates the theme layer exists but is not the primary styling contract.

## Rough Scope

- Define and document a semantic token strategy using DaisyUI theme variables and Tailwind classes (`base-*`, `primary`, `secondary`, `neutral`, etc.).
- Refactor high-impact shared components to replace hardcoded palette classes with theme-aware classes.
- Introduce reusable style patterns for common UI surfaces (page backgrounds, cards, headings, muted text, interactive states).
- Add guardrails (linting/conventions/docs) so new components default to theme tokens rather than one-off colors.

## Success Signal

- Core pages and shared components use semantic theme classes consistently.
- Global visual updates can be made through theme tokens with fewer component-level edits.
- Styling across routes feels more cohesive and easier to maintain.

## Open Questions

- Should we keep a single refined light theme first, or redesign for multi-theme support immediately?
- Which components should be migrated first to maximize consistency with minimal risk?
- Do we want explicit conventions for when direct utility colors are still acceptable (e.g., illustrations, gradients, brand accents)?

## References

- `packages/ses-next/styles/globals.css`
- `packages/ses-next/src/components/Hero.tsx`
- `packages/ses-next/src/components/Navbar.tsx`
- `packages/ses-next/src/app/services/page.tsx`
- `packages/ses-next/src/components/Contact.tsx`
