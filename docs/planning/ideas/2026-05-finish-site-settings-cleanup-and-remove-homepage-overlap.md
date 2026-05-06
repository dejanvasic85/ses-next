---
title: 'Finish siteSettings cleanup and remove homepage overlap'
status: captured
priority: unset
source: internal
captured: '2026-05-06'
domain: engineering
prd: ''
tags:
  - sanity
  - cms
  - site-settings
  - homepage
  - refactor
---

# Finish siteSettings cleanup and remove homepage overlap

## Problem / Opportunity

The `siteSettings` singleton schema is already in place, but `homepage` still owns a duplicate `contact.phone` field that overlaps with `siteSettings.phone`. This split source of truth means phone updates must be made in two places and the data flow is inconsistent across components.

## Context

Most of the original siteSettings refactor is already implemented — the schema exists, Studio is configured, and `getSiteSettings()` is already consumed in `layout.tsx` for the navbar phone. The remaining gap is that `homepage.contact.phone` still exists alongside `siteSettings.phone`, and `Contact.tsx` still reads phone from the homepage mapper rather than from site settings. Tracked in GitHub issue #368.

## Rough Scope

- Remove `contact.phone` from `packages/ses-content/schemas/homepage.ts`
- Update the homepage GROQ query in `packages/ses-next/src/lib/content/queries.ts` to drop the phone field
- Update Zod/manual types in `packages/ses-next/src/types.ts` to remove the duplicate phone field
- Update the homepage mapper in `packages/ses-next/src/lib/content/mappers.ts`
- Update `packages/ses-next/src/components/Contact.tsx` to source phone from `siteSettings` instead of homepage content

## Success Signal

A single `siteSettings.phone` value drives all phone display on the site with no duplicate field in the homepage schema.

## Open Questions

- Should homepage-specific contact copy (`blurbs`, `callBack`) remain in the homepage schema or also migrate to siteSettings?
- Are there other fields beyond `phone` still duplicated between `homepage` and `siteSettings`?

## References

- `packages/ses-content/schemas/homepage.ts`
- `packages/ses-content/schemas/siteSettings.ts`
- `packages/ses-next/src/lib/content/queries.ts`
- `packages/ses-next/src/lib/content/mappers.ts`
- `packages/ses-next/src/components/Contact.tsx`
- GitHub issue #368
