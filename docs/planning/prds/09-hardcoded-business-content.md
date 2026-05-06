---
title: 'Move Hardcoded Business Content into Sanity SiteSettings'
number: '09'
status: draft
priority: high
phase: ''
created: '2026-05-06'
updated: '2026-05-06'
owner: ''
idea: '2026-05-hardcoded-business-content-to-sanity.md'
plan: '09-hardcoded-business-content/plan.md'
depends-on: []
domain: engineering
budget: ''
tags: ['cms', 'content-model', 'maintainability', 'sanity', 'site-settings']
---

# 09 — Move Hardcoded Business Content into Sanity SiteSettings

## Problem

Business-specific values — company name, address, phone, coordinates, opening hours, years established, director name — are hardcoded across ~12 source files. When any of these change, a developer must hunt down every occurrence manually, risking inconsistency and missed instances. This is not maintainable and contradicts the purpose of having a CMS.

## Current State

A recent PR added `abn`, `recLicence`, `mobile`, `email`, `address`, and `businessHours` to `packages/ses-content/schemas/siteSettings.ts`. These fields are populated in Sanity and consumed correctly by `packages/ses-next/src/app/llms/route.ts`. The broader codebase has not been updated.

**Values already in the SiteSettings schema but still hardcoded in code:**

- `companyName` ("Storm Electrical Solutions") — hardcoded in `src/app/page.tsx`, `src/app/blog/page.tsx`, `src/app/blog/[slug]/page.tsx`, `src/app/blog/tag/[tag]/page.tsx`, `src/app/services/page.tsx`, `src/app/services/[...slug]/page.tsx`, `src/app/terms/page.tsx`, `src/app/faq/page.tsx`, `src/components/Footer.tsx`, `src/lib/mailService.ts`
- `phone` — hardcoded in `src/app/page.tsx` meta description
- `address` (flat string) — hardcoded in `src/components/Contact.tsx`, `src/app/page.tsx`, `src/app/locations/[locationSlug]/page.tsx`, `src/app/services/[...slug]/page.tsx`
- `businessHours` (free-text string) — opening hours hardcoded as structured data in `src/app/page.tsx` (lines 96–102)

**Missing from SiteSettings schema entirely:**

- `establishedYear` (number, e.g. `2007`) — hardcoded in `src/app/llms/route.ts`; replaces the existing `yearsExperience` concept — the frontend will derive years of experience from this
- `latitude` / `longitude` (numbers: `-37.8354339`, `144.8650809`) — hardcoded in `src/app/page.tsx`, `src/app/locations/[locationSlug]/page.tsx`, `src/app/services/[...slug]/page.tsx` for JSON-LD geo coordinates
- `directorName` (string, e.g. `"Karl Rainbow"`) — hardcoded in `src/app/llms/route.ts`
- Structured `address` sub-fields (`streetAddress`, `suburb`, `state`, `postcode`) — the flat `address` string exists but JSON-LD `PostalAddress` in multiple files needs discrete fields
- Structured `businessHours` object (`opensAt`, `closesAt`, `daysOfWeek[]`) — the free-text `businessHours` string exists but JSON-LD `OpeningHoursSpecification` needs structured data

## Requirements

### 1. Extend the Sanity SiteSettings schema

Add the following fields to `packages/ses-content/schemas/siteSettings.ts`:

```ts
// New top-level fields
defineField({
  name: 'establishedYear',
  type: 'number',
  title: 'Year Established',
  description: 'e.g. 2007 — used to derive years of experience',
}),
defineField({
  name: 'directorName',
  type: 'string',
  title: 'Director Name',
  description: 'e.g. Karl Rainbow',
}),
defineField({
  name: 'latitude',
  type: 'number',
  title: 'Latitude',
  description: 'Business location latitude for structured data e.g. -37.8354339',
}),
defineField({
  name: 'longitude',
  type: 'number',
  title: 'Longitude',
  description: 'Business location longitude for structured data e.g. 144.8650809',
}),

// Structured address (coexists with flat `address` string until migration complete)
defineField({
  name: 'streetAddress',
  type: 'string',
  title: 'Street Address',
  description: 'e.g. 61B Hansen St',
}),
defineField({
  name: 'suburb',
  type: 'string',
  title: 'Suburb',
  description: 'e.g. Altona North',
}),
defineField({
  name: 'state',
  type: 'string',
  title: 'State',
  description: 'e.g. VIC',
}),
defineField({
  name: 'postcode',
  type: 'string',
  title: 'Postcode',
  description: 'e.g. 3025',
}),

// Structured business hours (coexists with flat `businessHours` string until migration complete)
defineField({
  name: 'openingHours',
  type: 'object',
  title: 'Opening Hours',
  description: 'Structured opening hours for JSON-LD OpeningHoursSpecification',
  fields: [
    {
      name: 'daysOfWeek',
      type: 'array',
      title: 'Days of Week',
      of: [{ type: 'string' }],
      options: {
        list: [
          'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday',
        ],
      },
    },
    { name: 'opensAt', type: 'string', title: 'Opens At', description: 'e.g. 07:00' },
    { name: 'closesAt', type: 'string', title: 'Closes At', description: 'e.g. 18:00' },
  ],
}),
```

Deploy schema changes: `pnpm --filter ses-content deploy`.

### 2. Update TypeScript types and data pipeline

- `packages/ses-next/src/types.ts` — extend `SiteSettingsSchema` (Zod) with all new fields as optional
- `packages/ses-next/src/lib/content/queries.ts` — add new fields to the `siteSettings` GROQ query
- `packages/ses-next/src/lib/content/mappers.ts` — pass new fields through the mapper
- Derive `yearsExperience` from `establishedYear` in the mapper or at call sites: `new Date().getFullYear() - establishedYear`

### 3. Replace hardcoded values in frontend components and pages

Replace every hardcoded business string with values from the `siteSettings` object (passed as a prop or fetched via the existing data pipeline):

- `src/app/page.tsx` — company name in metadata, phone in description, address sub-fields in JSON-LD `PostalAddress`, coordinates in JSON-LD `GeoCoordinates`, opening hours in JSON-LD `OpeningHoursSpecification`, established year for experience derivation
- `src/app/blog/page.tsx`, `src/app/blog/[slug]/page.tsx`, `src/app/blog/tag/[tag]/page.tsx` — company name in metadata titles
- `src/app/services/page.tsx`, `src/app/services/[...slug]/page.tsx` — company name in metadata, address and coordinates in JSON-LD
- `src/app/locations/[locationSlug]/page.tsx` — address sub-fields and coordinates in JSON-LD
- `src/app/terms/page.tsx`, `src/app/faq/page.tsx` — company name in metadata
- `src/components/Footer.tsx` — company name
- `src/components/Contact.tsx` — address sub-fields in JSON-LD `PostalAddress`

### 4. Replace hardcoded values in mailService

- `src/lib/mailService.ts` — replace hardcoded company name and domain references with values from `siteSettings`. The mail service should receive these as parameters or read from a shared config that sources from `siteSettings`.

### 5. Populate new fields in Sanity Studio

Content work — populate all new fields in the `siteSettings` document:

- `establishedYear`: 2007
- `directorName`: Karl Rainbow
- `latitude`: -37.8354339
- `longitude`: 144.8650809
- `streetAddress`: 61B Hansen St
- `suburb`: Altona North
- `state`: VIC
- `postcode`: 3025
- `openingHours.daysOfWeek`: Monday–Friday
- `openingHours.opensAt`: 07:00
- `openingHours.closesAt`: 18:00

## Implementation Notes

- **Coexistence then removal**: The flat `address` string and free-text `businessHours` string fields coexist with the new structured fields during migration. Once all consumers have been migrated to the structured fields within this PRD, the flat fields are removed from the Sanity schema, the Zod type, the GROQ query, and the mapper in the same PR — not deferred.
- **Years of experience**: Do not add a `yearsExperience` field. Derive it at the call site: `new Date().getFullYear() - siteSettings.establishedYear`. This avoids a field that goes stale.
- **`directorName`**: Plain string field on `siteSettings`. Do not link to the `teamMember` document — keep it simple.
- **`mailService.ts`**: The mail service currently has a hardcoded BCC address (`dejanvasic24@gmail.com` at line 98) — this should be moved to an environment variable as part of this work, not left as a hardcoded personal email.
- **Schema deployment**: Must deploy schema before populating Sanity content and before running the frontend against the new fields.

## Acceptance Criteria

- [ ] New fields (`establishedYear`, `directorName`, `latitude`, `longitude`, `streetAddress`, `suburb`, `state`, `postcode`, `openingHours`) are added to the SiteSettings Sanity schema and deployed
- [ ] `SiteSettingsSchema` Zod type, GROQ query, and mapper are updated to include all new fields
- [ ] No occurrences of "Storm Electrical Solutions", the business phone, or the business address remain hardcoded in any `.tsx` or `.ts` source file
- [ ] JSON-LD `PostalAddress` and `GeoCoordinates` blocks across `page.tsx`, service pages, and location pages are driven by `siteSettings` fields
- [ ] JSON-LD `OpeningHoursSpecification` in `page.tsx` is driven by `siteSettings.openingHours`
- [ ] `mailService.ts` uses `siteSettings.companyName` and no hardcoded personal email remains in source
- [ ] All new `siteSettings` fields are populated in Sanity Studio
- [ ] `pnpm lint`, `pnpm type:check`, and `pnpm build` pass with no errors
