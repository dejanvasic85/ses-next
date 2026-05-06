---
title: 'Move hardcoded business content into Sanity SiteSettings'
status: accepted
priority: medium
source: internal
captured: '2026-05-06'
domain: engineering
prd: '09-hardcoded-business-content.md'
tags:
  - cms
  - content-model
  - maintainability
  - sanity
  - site-settings
---

# Move hardcoded business content into Sanity SiteSettings

## Problem / Opportunity

Across the codebase, business-specific values are hardcoded in React components and Next.js page files — values that belong to the business, not to the code. When business details change (owner, address, credentials, hours, experience), a developer must find and update every occurrence manually, risking inconsistency and missed instances. Moving these into Sanity `siteSettings` makes them maintainable by non-developers and ensures a single source of truth.

## Context

A recent PR added `abn`, `recLicence`, `mobile`, `email`, `address`, and `businessHours` to the `siteSettings` Sanity schema (`packages/ses-content/schemas/siteSettings.ts`). These are now properly populated in the CMS and consumed by `llms/route.ts`. However, the broader codebase has not been updated — many components still hardcode the same values. An audit identified the following gaps:

**Already in SiteSettings schema (but still hardcoded in code):**

- `companyName` — "Storm Electrical Solutions" hardcoded in 10+ files (page titles, footers, email templates, blog pages)
- `phone` — "(03) 4050 7937" in `page.tsx` meta description
- `address` — "61B Hansen St, Altona North VIC 3025" hardcoded in `Contact.tsx`, `page.tsx`, `locations/[locationSlug]/page.tsx`, `services/[...slug]/page.tsx`
- `businessHours` — opening hours as structured data hardcoded in `page.tsx` (lines 96–102)

**Missing from SiteSettings schema entirely (no field exists yet):**

- `yearsExperience` (string, e.g. "19+") — hardcoded in `page.tsx` meta description and `llms/route.ts`
- `establishedYear` (number, e.g. 2007) — hardcoded in `llms/route.ts`
- `latitude` / `longitude` (numbers: -37.8354339, 144.8650809) — hardcoded in `page.tsx`, `locations/[locationSlug]/page.tsx`, `services/[...slug]/page.tsx` for JSON-LD geo coordinates
- `directorName` (string, e.g. "Karl Rainbow") — hardcoded in `llms/route.ts`

**Structural improvements needed:**

- `address` is a flat string in Sanity — the codebase needs separate `streetAddress`, `suburb`, `state`, `postcode` fields for JSON-LD `PostalAddress` structured data
- `businessHours` is a free-text string — needs structured `opensAt` / `closesAt` / `daysOfWeek` fields to power JSON-LD `OpeningHoursSpecification` correctly

## Rough Scope

- Extend `siteSettings.ts` schema: add `yearsExperience`, `establishedYear`, `latitude`, `longitude`, `directorName`; restructure `address` into sub-fields; restructure `businessHours` into structured object
- Update `packages/ses-next/src/types.ts` `SiteSettingsSchema` to match
- Update GROQ query in `packages/ses-next/src/lib/content/queries.ts` to fetch new fields
- Update `packages/ses-next/src/lib/content/mappers.ts` to map new fields
- Replace hardcoded values across ~12 files: `page.tsx`, `Contact.tsx`, `Footer.tsx`, `BlogMenu.tsx`, `blog/page.tsx`, `blog/[slug]/page.tsx`, `blog/tag/[tag]/page.tsx`, `services/page.tsx`, `services/[...slug]/page.tsx`, `locations/[locationSlug]/page.tsx`, `terms/page.tsx`, `faq/page.tsx`, `mailService.ts`
- Populate new fields in Sanity Studio (content work)
- Deploy updated schema to Sanity

## Success Signal

No business-specific strings (company name, address, phone, coordinates, hours, years of experience, director name) remain hardcoded in TypeScript/TSX source files. All values flow from `siteSettings` via the existing data pipeline.

## Open Questions

- Should `address` sub-fields (`streetAddress`, `suburb`, `state`, `postcode`) replace the existing flat `address` string, or coexist? (Recommend: replace — the flat string is only used in `llms/route.ts` which can reconstruct it)
- Should `businessHours` be a structured object with days + times, or an array of `OpeningHoursSpecification` objects? (Recommend: structured object with `opensAt`, `closesAt`, `daysOfWeek` array — matches JSON-LD schema directly)
- `directorName` vs. linking to a `teamMember` reference? (The `teamMember` schema now has `bio`, `licenceNumber`, `accreditations` — a reference from `siteSettings.director` to the Karl Rainbow `teamMember` document may be cleaner than duplicating fields)

## References

- `packages/ses-content/schemas/siteSettings.ts` — current schema (16 fields)
- `packages/ses-next/src/app/page.tsx` — highest concentration of hardcoded values
- `packages/ses-next/src/components/Contact.tsx` — hardcoded PostalAddress
- `packages/ses-next/src/app/llms/route.ts` — already correctly pulling from siteSettings
