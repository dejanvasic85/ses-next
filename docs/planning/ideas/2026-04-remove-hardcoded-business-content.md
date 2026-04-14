---
title: 'Remove hardcoded business content from website pages'
status: captured
priority: unset
source: internal
captured: '2026-04-14'
domain: engineering
prd: ''
tags:
  - cms
  - content-model
  - maintainability
  - seo
---

## Problem / Opportunity

Business-critical content (company name, phone-adjacent messaging, address, and location-specific copy) is still hardcoded in multiple pages and components. This makes content updates error-prone, creates inconsistency risk, and reduces CMS-driven control.

## Context

Some core layout and navigation data already comes from site settings (`getSiteSettings`) and is passed through `layout.tsx` to components like `Navbar` and `Footer`, but hardcoded business strings are still spread across route metadata, JSON-LD blocks, and page copy.

Examples include hardcoded brand and service-area strings in `packages/ses-next/src/app/page.tsx`, `packages/ses-next/src/app/services/page.tsx`, `packages/ses-next/src/app/locations/page.tsx`, and business/address literals in `packages/ses-next/src/components/Contact.tsx` and service/location schema output in route pages.

## Rough Scope

- Audit and centralize business identity fields (company name variants, address, phone-adjacent copy, service-area labels) into Sanity-backed settings/content models.
- Replace hardcoded website literals in page metadata, structured data payloads, and UI copy with content-service values.
- Standardize fallback behavior when CMS fields are missing so pages remain valid and SEO-safe.
- Keep route structure and UX unchanged while migrating data sources.

## Success Signal

- Website business content can be updated in one place (CMS/settings) without code changes.
- No user-facing business identity/address/phone copy remains hardcoded in route/page components.
- Metadata and JSON-LD stay consistent with the configured business profile across pages.

## Open Questions

- Which fields belong in global site settings vs page-specific content models?
- Should service-area/location marketing copy remain editable per page, or be generated from shared templates + location data?
- Do we also include email template copy in scope, or keep this initiative website-only?

## References

- `packages/ses-next/src/app/page.tsx`
- `packages/ses-next/src/app/services/page.tsx`
- `packages/ses-next/src/app/locations/page.tsx`
- `packages/ses-next/src/components/Contact.tsx`
- `packages/ses-next/src/components/Footer.tsx`
