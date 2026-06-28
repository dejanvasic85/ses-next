---
title: 'Sanity TypeGen + Domain Content Services: Execution Plan'
number: '013'
status: completed
created: '2026-06-28'
updated: '2026-06-28'
idea: '2026-05-configure-sanity-type-generation.md, 2026-05-split-content-service-into-domain-sanity-services.md'
started: '2026-06-28'
completed: '2026-06-28'
estimated-hours: '4-6'
tags:
  - sanity
  - typescript
  - type-generation
  - architecture
  - refactor
  - developer-experience
---

# 013 — Sanity TypeGen + Domain Content Services: Execution Plan

## Overview

This plan delivers two tightly-coupled engineering improvements in a single pass. Phase 1 introduces Sanity TypeGen so that all Sanity document types are generated from the schema rather than hand-maintained in `src/types.ts`. Phase 2 splits the monolithic `contentService.ts` into focused domain-specific service modules, each importing the generated types directly — following the same pattern already proven in the `williamstownsc` sibling repo (`src/lib/content/{domain}.ts` + `src/sanity/lib/client.ts`). The combined result: no more hand-written CMS types, no more god-service, and every future content domain change is isolated and type-safe.

Runtime behaviour is unchanged. All existing GROQ queries, mappers, and Zod validation schemas are preserved.

---

## Phase 1 — Sanity TypeGen Setup

### Task 1.1 — Add typegen config and script to `ses-content`

**Files to change:**

- `packages/ses-content/sanity-typegen.json` — new file, typegen config
- `packages/ses-content/package.json` — add `typegen` script

**Steps:**

1. Create `packages/ses-content/sanity-typegen.json`:

   ```json
   {
     "schema": "packages/ses-next/src/sanity/schema.json",
     "generates": "packages/ses-next/src/sanity/sanity.types.ts",
     "path": "./packages/ses-next/src/**/*.{ts,tsx}"
   }
   ```

   Note: paths are relative to repo root since `sanity typegen generate` is run from the monorepo root targeting the `ses-content` workspace. Adjust if CLI requires paths relative to `packages/ses-content/` — confirm on first run.

2. Add to `packages/ses-content/package.json` `"scripts"`:

   ```json
   "typegen": "sanity schema extract --path ../../packages/ses-next/src/sanity/schema.json && sanity typegen generate"
   ```

   This mirrors the `williamstownsc` pattern: `"type:gen": "sanity schema extract --path src/sanity && sanity typegen generate"`.

3. Verify the script invocation at monorepo root:
   ```
   pnpm --filter ses-content typegen
   ```

**Verification:** Running `pnpm --filter ses-content typegen` produces `packages/ses-next/src/sanity/schema.json` and `packages/ses-next/src/sanity/sanity.types.ts` without errors.

---

### Task 1.2 — Create the Sanity client module in `ses-next`

**Files to change:**

- `packages/ses-next/src/sanity/lib/client.ts` — new file, extracted Sanity client

**Steps:**

1. Create `packages/ses-next/src/sanity/lib/client.ts`:

   ```ts
   import { createClient } from 'next-sanity';
   import { config } from '@/lib/config';

   export const sanityClient = createClient({
     projectId: config.sanityProjectId,
     dataset: config.sanityDataset,
     apiVersion: '2021-06-07',
     useCdn: false,
     perspective: 'published',
   });
   ```

   This extracts the inline client from `contentService.ts` — identical config, just moved to a dedicated module so all domain services share one client instance.

**Verification:** File exists and TypeScript resolves `@/lib/config` without error (`pnpm --filter ses-next type:check`).

---

### Task 1.3 — Audit `types.ts` and replace Sanity document types with generated ones

**Files to change:**

- `packages/ses-next/src/types.ts` — remove Sanity document-schema Zod schemas; keep form schemas, mapped frontend types, and non-Sanity types
- `packages/ses-next/src/sanity/sanity.types.ts` — generated file (do not hand-edit)

**Steps:**

1. After running `typegen`, open `packages/ses-next/src/sanity/sanity.types.ts` and identify which generated types cover what was hand-written in `types.ts`:
   - `BlogPostSchema` → `BlogPost` generated type
   - `ServiceSchema` → `Service` generated type
   - `SiteSettingsSchema` → `SiteSettings` generated type
   - `HomepageSchema` → `Homepage` generated type
   - `LocationPageSchema` → `LocationPage` generated type
   - `ServicesHubSchema` → `ServicesHub` generated type
   - `FAQSchema` → `Faq` generated type
   - `TermsAndConditionsSchema` → `TermsAndConditions` generated type
   - `TrainingSchema` / `ShowcaseSchema` / `TeamMemberSchema` → covered by embedded types

2. Decide per-schema: keep Zod for runtime validation at fetch boundaries, but **import the generated TypeScript type for type annotations** instead of using `z.infer<typeof ...>`. Example:

   ```ts
   import type { BlogPost } from '@/sanity/sanity.types';
   ```

   The Zod `.parse()` calls in the service functions remain as-is for runtime safety — just swap the type-annotation side.

3. Remove from `types.ts` any exported Zod schemas whose sole purpose was CMS document shape. Keep:
   - `ContactFormDataSchema`, `FeedbackFormDataSchema` (form validation — not Sanity)
   - `GoogleReviewSchema`, `GoogleReviewsSchema` (external API — not Sanity)
   - `IconSchema` (referenced by components — keep until icon system refactor)
   - All mapped frontend types (`ServiceItem`, `BlogPost` frontend type, `SiteSettings` mapped type, etc.) — these are **different** from the Sanity document types; they're what pages consume after mapping

4. Update any imports broken by removals.

**Verification:** `pnpm --filter ses-next type:check` passes with no errors after removals.

---

## Phase 2 — Domain Content Services

### Task 2.1 — Create `packages/ses-next/src/lib/content/services/` directory with domain files

Following the `williamstownsc` pattern (`src/lib/content/{domain}.ts`), create one file per content domain. All files import from `@/sanity/lib/client` and use generated types for GROQ fetch type parameters where applicable. Zod `.parse()` validation is preserved at each fetch boundary.

**Files to create:**

| File                                                                  | Exports                                                                  |
| --------------------------------------------------------------------- | ------------------------------------------------------------------------ |
| `packages/ses-next/src/lib/content/services/siteSettingsService.ts`   | `getSiteSettings`                                                        |
| `packages/ses-next/src/lib/content/services/homepageService.ts`       | `getHomePageContent`                                                     |
| `packages/ses-next/src/lib/content/services/serviceCatalogService.ts` | `getServices`, `getServicesHubContent`, `getLocationPagesByServiceSlugs` |
| `packages/ses-next/src/lib/content/services/blogService.ts`           | `getBlogPosts`, `getBlogPostBySlug`                                      |
| `packages/ses-next/src/lib/content/services/locationService.ts`       | `getAllLocationPages`, `getLocationPageBySlug`                           |
| `packages/ses-next/src/lib/content/services/faqService.ts`            | `getFAQs`                                                                |
| `packages/ses-next/src/lib/content/services/termsService.ts`          | `getTermsAndConditions`                                                  |

**Steps for each file:**

1. Copy the relevant function(s) verbatim from `contentService.ts` into the new file.
2. Replace `import { sanityClient }` internal reference with `import { sanityClient } from '@/sanity/lib/client'`.
3. Bring in only the types and mappers each file needs (no barrel import from the old monolith).
4. Do not change function signatures, return types, GROQ queries, or Zod parse calls.

**Grouping rationale:**

- `serviceCatalogService` groups `getServices`, `getServicesHubContent`, and `getLocationPagesByServiceSlugs` because all three are called together on the services hub and service detail pages.
- All other domains map 1:1 to a file.

**Verification:** Each new file compiles in isolation — `pnpm --filter ses-next type:check` passes.

---

### Task 2.2 — Replace `contentService.ts` with a barrel re-export

**Files to change:**

- `packages/ses-next/src/lib/content/contentService.ts` — replace body with re-exports only

**Steps:**

1. Replace the entire body of `contentService.ts` with re-exports from each domain service:

   ```ts
   export { getSiteSettings } from '@/lib/content/services/siteSettingsService';
   export { getHomePageContent } from '@/lib/content/services/homepageService';
   export {
     getServices,
     getServicesHubContent,
     getLocationPagesByServiceSlugs,
   } from '@/lib/content/services/serviceCatalogService';
   export { getBlogPosts, getBlogPostBySlug } from '@/lib/content/services/blogService';
   export { getAllLocationPages, getLocationPageBySlug } from '@/lib/content/services/locationService';
   export { getFAQs } from '@/lib/content/services/faqService';
   export { getTermsAndConditions } from '@/lib/content/services/termsService';
   ```

   This means **zero import changes** in the 15 existing consumers (pages, routes, `basePageProps.ts`). The barrel is the stable public API.

2. Remove the `sanityClient` definition and all `import` statements that are no longer needed at the top of the old file.

**Verification:** All 15 import sites (`app/`, `lib/basePageProps.ts`) continue to resolve without changes. `pnpm --filter ses-next build` succeeds.

---

### Task 2.3 — Split `queries.ts` and `mappers.ts` to align with domain services (optional but recommended)

**Files to change:**

- `packages/ses-next/src/lib/content/queries/` — new directory with one file per domain
- `packages/ses-next/src/lib/content/mappers/` — new directory with one file per domain

**Steps:**

1. Create `packages/ses-next/src/lib/content/queries/` with files mirroring the services:
   - `siteSettingsQueries.ts` → `siteSettingsQuery`
   - `homepageQueries.ts` → `homepageQuery`
   - `serviceCatalogQueries.ts` → `servicesQuery`, `servicesHubQuery`, `locationPagesByServiceSlugsQuery`
   - `blogQueries.ts` → `allBlogPostsQuery`, `blogPostBySlugQuery`
   - `locationQueries.ts` → `allLocationPagesQuery`, `locationPageBySlugQuery`
   - `faqQueries.ts` → `allFaqsQuery`
   - `termsQueries.ts` → `termsAndConditionsQuery`

2. Keep `queries.ts` as a barrel re-export (same pattern as `contentService.ts`) so nothing outside breaks:

   ```ts
   export * from '@/lib/content/queries/siteSettingsQueries';
   // ... etc
   ```

3. Similarly split `mappers.ts` into `mappers/` with domain-specific files: `blogMappers.ts`, `serviceMappers.ts`, `locationMappers.ts`, `siteSettingsMappers.ts`, `homepageMappers.ts`.

4. Keep `mappers.ts` as a barrel for any existing consumers.

> **Note:** This task is lower-risk than Tasks 2.1–2.2 and can be deferred to a follow-up if scope needs trimming.

**Verification:** `pnpm --filter ses-next type:check && pnpm --filter ses-next build` pass.

---

## Verification Checklist

Run in order before pushing:

- [ ] `pnpm format`
- [ ] `pnpm lint`
- [ ] `pnpm type:check`
- [ ] `pnpm build`
- [ ] `pnpm test:e2e`

## Rollback Plan

1. The barrel `contentService.ts` means all consumer imports are unchanged — reverting is a single-file restore.
2. If typegen causes issues: delete `src/sanity/schema.json` and `src/sanity/sanity.types.ts`, restore removed Zod schemas from git, revert `types.ts`.
3. The `ses-content` `typegen` script addition is additive — removing it has no runtime impact.

## Assets

- Reference `williamstownsc` patterns:
  - Client: `/Users/dejanvasic/code/williamstownsc/src/sanity/lib/client.ts`
  - Domain service example: `/Users/dejanvasic/code/williamstownsc/src/lib/content/news.ts`
  - Barrel index: `/Users/dejanvasic/code/williamstownsc/src/lib/content/index.ts`
  - TypeGen config: `/Users/dejanvasic/code/williamstownsc/sanity-typegen.json`
  - TypeGen script: `"type:gen"` in `/Users/dejanvasic/code/williamstownsc/package.json`
