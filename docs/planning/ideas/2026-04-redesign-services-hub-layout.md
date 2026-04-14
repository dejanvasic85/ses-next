---
title: 'Redesign services hub layout to be narrower and visually distinct'
status: captured
priority: unset
source: internal
captured: '2026-04-14'
domain: design
prd: ''
tags:
  - services
  - ux
  - layout
---

## Problem / Opportunity

The `/services` hub feels too wide and too visually similar to the homepage services section, which reduces perceived hierarchy and makes the hub feel like a duplicate instead of a dedicated landing page.

## Context

The current services hub route at `packages/ses-next/src/app/services/page.tsx` uses a top-level wrapper without a max-width constraint (`mx-auto px-4 sm:px-6 lg:px-8`), while key content sections use broad containers such as `max-w-screen-xl` and a 4-column grid (`xl:grid-cols-4`).

The homepage services section at `packages/ses-next/src/components/Services.tsx` uses a very similar card pattern (icon + heading + blurb + optional image) and the same 4-column desktop structure (`xl:grid-cols-4`), making both experiences look nearly identical.

## Rough Scope

- Introduce a tighter global content container for the services hub page to reduce line length and card spread on large screens.
- Adjust the `/services` card grid density and spacing so it reads as a curated hub, not a homepage clone.
- Differentiate visual treatment on the hub (card styling, section rhythm, typography emphasis, or supporting intro layout) while preserving existing brand tokens and accessibility.
- Keep existing SEO metadata, structured data, and routing behavior unchanged unless needed for layout refactor.

## Success Signal

- On desktop, the services hub content no longer stretches excessively and remains comfortably readable.
- The `/services` page is visually distinct from the homepage services module at a glance.
- Core engagement signals improve or hold (service card click-through, time on page, reduced bounce from `/services`).

## Open Questions

- Should the hub stay at 4 columns on very large screens with narrower cards, or shift to a 3-column max layout?
- Should homepage cards remain unchanged while only the hub evolves, or should both be updated with a shared but configurable card component?
- Is this redesign intended to be purely layout-level, or should content hierarchy also change (e.g., stronger intro and grouped service categories)?

## References

- `packages/ses-next/src/app/services/page.tsx`
- `packages/ses-next/src/components/Services.tsx`
- `packages/ses-next/src/app/page.tsx`
- `docs/seo-geo/prds/04a-services-hub-navigation.md`
