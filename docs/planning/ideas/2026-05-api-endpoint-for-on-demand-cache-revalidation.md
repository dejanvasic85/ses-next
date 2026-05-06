---
title: 'Add API endpoint for on-demand Next.js cache revalidation'
status: captured
priority: unset
source: internal
captured: '2026-05-06'
domain: engineering
prd: ''
tags:
  - nextjs
  - cache
  - sanity
  - webhooks
  - performance
---

# Add API endpoint for on-demand Next.js cache revalidation

## Problem / Opportunity

The site currently relies on a full deployment hook to pick up Sanity content changes, which means routine CMS publishes trigger a redeploy instead of targeted cache invalidation. This slows editorial updates and unnecessarily couples content changes to the deployment pipeline.

## Context

Replacing the deployment hook with a protected Next.js API route allows Sanity to call the endpoint after publish events and revalidate only the affected paths via `revalidatePath(...)`. The existing contact route at `packages/ses-next/src/app/api/contact/route.ts` shows the preferred Route Handler style. All Sanity reads currently flow through `packages/ses-next/src/lib/content/contentService.ts` with no existing cache tags. Tracked in GitHub issue #272.

## Rough Scope

- Add `POST /api/revalidate` route handler at `packages/ses-next/src/app/api/revalidate/route.ts` with shared-secret validation (`REVALIDATE_SECRET` env var)
- Implement `_type` → `revalidatePath(...)` mapping covering all document types: `siteSettings`, `homepage`, `service`, `blog-post`, `faq`, `locationPage`, `terms-and-conditions`, `teamMember`, `training`, `showcase`
- Add `revalidateSecret` to `packages/ses-next/src/lib/config.ts`
- Configure the Sanity webhook to POST to the new endpoint instead of the deployment hook
- Add route tests in `packages/ses-next/tests/routes.spec.ts` for unauthorized, invalid payload, and successful revalidation cases

## Success Signal

CMS content publishes update the live site within seconds via targeted cache revalidation, with no full redeploy required.

## Open Questions

- Should the webhook projection also send `slug.current` and `tags[]` to enable finer-grained path invalidation, or is `_type`-based path revalidation sufficient?
- Should the existing deployment hook be kept as a fallback until the webhook is verified, or removed immediately?
- Should sitemap revalidation (`/sitemap.xml`) be added for location pages (currently out of scope)?

## References

- `packages/ses-next/src/app/api/contact/route.ts`
- `packages/ses-next/src/lib/content/contentService.ts`
- `packages/ses-next/src/lib/config.ts`
- `packages/ses-next/tests/routes.spec.ts`
- `packages/ses-next/src/app/sitemap.ts`
- GitHub issue #272
