---
title: 'Migrate icon system to Better Icons for consistency'
status: captured
priority: unset
source: internal
captured: '2026-04-14'
domain: design
prd: ''
tags:
  - icons
  - design-system
  - frontend
  - cms
---

## Problem / Opportunity

The current icon setup mixes many inline SVG definitions and naming conventions, which makes icon style inconsistent and harder to maintain. Standardizing on Better Icons can improve visual consistency and simplify icon management.

## Context

The frontend currently uses a custom `Icon` + `IconMap` system in `packages/ses-next/src/components/Icon/Icon.tsx` and `packages/ses-next/src/components/Icon/IconMap.tsx`, where many icons are manually embedded SVGs with different sizes, stroke/fill styles, and source origins.

Icon usage is widespread across navigation, services cards, footer, contact, hero social links, and utility components. On the CMS side, Sanity icon selection (`packages/ses-content/schemas/iconField.ts`) stores icon values that are tightly coupled to current `IconMap` keys.

## Rough Scope

- Define a canonical icon source and style rules using Better Icons (set/family, stroke/fill conventions, default sizing).
- Replace `IconMap` entries with Better Icons references while preserving current `Icon` component API where possible.
- Migrate Sanity icon options and value mapping to the new canonical icon IDs with backward compatibility for existing content.
- Audit key UI surfaces to ensure icon alignment, sizing, and accessibility remain consistent after migration.

## Success Signal

- Icons across pages share a consistent visual language and sizing behavior.
- New icons are added via Better Icons workflows instead of manual SVG embedding.
- CMS-managed icon fields continue to work without broken references in existing documents.

## Open Questions

- Should we do a full one-shot migration or support a temporary compatibility layer between old and new icon IDs?
- Do we standardize on a single icon family or allow multiple families with strict usage rules?
- Should decorative brand/social icons also be migrated, or only functional UI icons in phase one?

## References

- `packages/ses-next/src/components/Icon/Icon.tsx`
- `packages/ses-next/src/components/Icon/IconMap.tsx`
- `packages/ses-next/src/components/Navbar.tsx`
- `packages/ses-next/src/components/Services.tsx`
- `packages/ses-content/schemas/iconField.ts`
