---
title: 'Migrate Sanity content layer to new patterns'
status: captured
priority: unset
source: internal
captured: '2026-05-06'
domain: engineering
prd: ''
tags:
  - sanity
  - refactor
  - typescript
  - content-layer
---

# Migrate Sanity content layer to new patterns

## Problem / Opportunity

The app still uses raw `fetch()` calls and manually maintained TypeScript types for Sanity data instead of the Sanity client, service layer, and generated types. This creates duplication, makes queries harder to maintain, and misses type safety improvements available through the modern Sanity SDK patterns.

## Context

`packages/ses-next/src/lib/content/contentApi.ts` uses raw `fetch()` with generic `*[]` GROQ queries instead of the Sanity client. `packages/ses-next/src/types.ts` contains manual Sanity document type definitions that overlap with what can be generated. This refactor depends on the type generation (#369) and domain service split (#370) being complete. Tracked in GitHub issue #371.

## Rough Scope

- Refactor `packages/ses-next/src/lib/content/contentApi.ts` to replace `fetch()` with `client.fetch(...)` using specific GROQ projections
- Update `packages/ses-next/src/lib/content/contentService.ts` to use the new domain service layer functions
- Refactor `packages/ses-next/src/types.ts` to remove manual Sanity document schema types, import from generated `sanity.types.ts`, and retain only business logic types (forms, email payloads, mapped frontend types like `ServiceItem`, `BlogPost`, etc.)

## Success Signal

No raw `fetch()` calls to the Sanity API remain; all queries go through the typed Sanity client; generated types replace hand-maintained schema definitions.

## Open Questions

- Should the caching strategy in `contentService.ts` change as part of this migration, or be addressed separately?
- How should runtime Zod validation be handled once types are generated — keep validation, drop it, or replace with narrower guards?

## References

- `packages/ses-next/src/lib/content/contentApi.ts`
- `packages/ses-next/src/lib/content/contentService.ts`
- `packages/ses-next/src/types.ts`
- GitHub issue #371 (depends on #369 and #370)
