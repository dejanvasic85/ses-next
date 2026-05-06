---
title: 'Split contentService into domain-specific Sanity services'
status: captured
priority: unset
source: internal
captured: '2026-05-06'
domain: engineering
prd: ''
tags:
  - sanity
  - architecture
  - refactor
  - content-layer
---

# Split contentService into domain-specific Sanity services

## Problem / Opportunity

All Sanity fetching logic lives in a single `contentService.ts` file, making it hard to maintain, test, and evolve individual content domains independently. The file owns the shared client setup plus homepage, services, blog, FAQ, locations, and terms fetching in one place.

## Context

`packages/ses-next/src/lib/content/contentService.ts` currently contains ~10 fetch functions spanning every content domain. The Sanity client, GROQ queries, and mappers already exist as separate files, so the structural split is straightforward without changing runtime behaviour. Tracked in GitHub issue #370.

## Rough Scope

- Extract the shared Sanity client into `packages/ses-next/src/lib/content/client.ts`
- Create domain-specific service modules under `packages/ses-next/src/lib/content/services/`: `siteSettingsService.ts`, `homepageService.ts`, `serviceCatalogService.ts`, `blogService.ts`, `locationService.ts`, `faqService.ts`, `termsService.ts`
- Keep a barrel/re-export in `contentService.ts` or `index.ts` during the refactor to minimise import churn across pages
- Verify all existing pages/layouts still build and resolve imports correctly after the split

## Success Signal

Each content domain has its own focused service module, and `contentService.ts` is no longer a monolithic catch-all — the app behaviour is unchanged.

## Open Questions

- Should the barrel file be temporary (removed once all imports are updated) or kept permanently as a stable public API?
- Should this adopt generated Sanity types (#369) simultaneously, or treat that as follow-up work?

## References

- `packages/ses-next/src/lib/content/contentService.ts`
- `packages/ses-next/src/lib/content/queries.ts`
- `packages/ses-next/src/lib/content/mappers.ts`
- GitHub issue #370
