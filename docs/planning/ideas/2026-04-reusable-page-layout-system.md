---
title: 'Create reusable page layouts for consistent implementation'
status: captured
priority: unset
source: internal
captured: '2026-04-14'
domain: engineering
prd: ''
tags:
  - architecture
  - frontend
  - layout
  - consistency
---

## Problem / Opportunity

Page layout structure is currently implemented ad hoc across routes and components, which leads to inconsistent spacing, container widths, and section patterns. A reusable layout system would reduce drift and improve maintainability.

## Context

There is an existing `Container` component at `packages/ses-next/src/components/Container.tsx`, but many pages bypass it and define their own wrappers (`container`, `mx-auto`, varying `max-w-*`, repeated `py-6 sm:py-8 lg:py-12`) directly in route files.

Examples include `packages/ses-next/src/app/faq/page.tsx`, `packages/ses-next/src/app/terms/page.tsx`, and `packages/ses-next/src/app/services/page.tsx`, each using different composition and width conventions. Related section components also mix layout primitives (`max-w-screen-lg`, `max-w-screen-xl`, `max-w-5xl`, and `container`) without a shared abstraction.

## Rough Scope

- Define a small set of reusable layout primitives (e.g., page shell, section container, content width variants).
- Refactor key route pages to adopt shared layout components instead of duplicating wrapper classes.
- Standardize spacing and width tokens for common page types (marketing, prose/content, listing/grid pages).
- Document usage conventions so new pages default to shared layouts rather than custom wrappers.

## Success Signal

- New and existing pages use shared layout primitives consistently.
- Fewer repeated wrapper class strings across route files.
- Visual rhythm and content width are consistent between pages, with fewer one-off layout regressions.

## Open Questions

- Should layout primitives live in `src/components/layout/` as composable building blocks, or as higher-level page templates?
- What canonical width tiers should be supported (e.g., prose, standard, wide) and where should each be used?
- Should this be rolled out incrementally page-by-page or via a single larger refactor?

## References

- `packages/ses-next/src/components/Container.tsx`
- `packages/ses-next/src/app/faq/page.tsx`
- `packages/ses-next/src/app/terms/page.tsx`
- `packages/ses-next/src/app/services/page.tsx`
- `packages/ses-next/src/components/BlogLayout.tsx`
