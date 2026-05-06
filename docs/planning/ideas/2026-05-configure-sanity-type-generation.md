---
title: 'Configure Sanity type generation'
status: captured
priority: unset
source: internal
captured: '2026-05-06'
domain: engineering
prd: ''
tags:
  - sanity
  - typescript
  - type-generation
  - developer-experience
---

# Configure Sanity type generation

## Problem / Opportunity

`packages/ses-next/src/types.ts` contains hand-written TypeScript types for Sanity-backed content models that must be kept in sync manually. There is no Sanity type generation config, no generation script, and no generated types file — this creates duplication and drift risk as schemas evolve.

## Context

The Sanity workspace already exists at `packages/ses-content/` with `sanity.config.ts` and `sanity.cli.ts`, making it straightforward to add type generation. Currently all app code imports from `@/types` with manually defined schemas like `HomepageSchema`, `ServiceSchema`, `BlogPostSchema` etc., and uses `.parse(...)` on GROQ query results. Tracked in GitHub issue #369.

## Rough Scope

- Create `packages/ses-content/sanity-typegen.json` with generation config
- Add a `typegen` script to `packages/ses-content/package.json` (`sanity schema extract` + `sanity typegen generate`)
- Generate extracted schema JSON at `packages/ses-next/src/sanity/schema.json`
- Generate TypeScript types at `packages/ses-next/src/sanity/sanity.types.ts`
- Audit `packages/ses-next/src/types.ts` and replace duplicated Sanity schema types with generated ones; keep repo-specific types (forms, email payloads, mapped frontend types)

## Success Signal

Running `pnpm typegen -w ses-content` generates schema-driven types and the repo no longer hand-maintains duplicate Sanity document type definitions.

## Open Questions

- Should generated files be committed to the repo or regenerated in CI/local workflows?
- Should GROQ query result type generation be tackled here or as a separate follow-up?
- Which runtime Zod validations should be kept even after generated types are in place?

## References

- `packages/ses-next/src/types.ts`
- `packages/ses-content/sanity.config.ts`
- `packages/ses-content/sanity.cli.ts`
- `packages/ses-next/src/lib/content/contentService.ts`
- `packages/ses-next/src/lib/content/queries.ts`
- GitHub issue #369
