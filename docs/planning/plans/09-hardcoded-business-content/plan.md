---
title: 'Move Hardcoded Business Content into Sanity SiteSettings: Execution Plan'
number: '09'
status: planning
priority: high
created: '2026-05-06'
updated: '2026-05-06'
owner: ''
prd: '09-hardcoded-business-content.md'
started: ''
completed: ''
estimated-hours: ''
tags: ['cms', 'content-model', 'maintainability', 'sanity', 'site-settings']
---

# 09 — Move Hardcoded Business Content into Sanity SiteSettings: Execution Plan

## Overview

This plan removes hardcoded business values from ~12 source files and replaces them with data flowing from the Sanity `siteSettings` document. It covers four areas: (1) extending the Sanity schema with new fields, (2) updating the TypeScript types and data pipeline, (3) replacing hardcoded values in all frontend pages and components, and (4) replacing hardcoded values in the mail service. All code changes are in `packages/ses-next` and `packages/ses-content`. Content population is done in Sanity Studio.

---

## Phase 1 — Sanity Schema Extension

### Task 1.1 — Add new fields to siteSettings schema

**File to change:**

- `packages/ses-content/schemas/siteSettings.ts`

**Steps:**

1. Open `packages/ses-content/schemas/siteSettings.ts`.
2. Add the following fields inside the `fields` array, after the existing `businessHours` field:

```ts
defineField({
  name: 'establishedYear',
  type: 'number',
  title: 'Year Established',
  description: 'e.g. 2007 — used to derive years of experience dynamically',
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
  description: 'Business location latitude for JSON-LD geo coordinates e.g. -37.8354339',
}),
defineField({
  name: 'longitude',
  type: 'number',
  title: 'Longitude',
  description: 'Business location longitude for JSON-LD geo coordinates e.g. 144.8650809',
}),
defineField({
  name: 'streetAddress',
  type: 'string',
  title: 'Street Address',
  description: 'e.g. 61B Hansen St — used in JSON-LD PostalAddress',
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
        list: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
      },
    },
    { name: 'opensAt', type: 'string', title: 'Opens At', description: 'e.g. 07:00' },
    { name: 'closesAt', type: 'string', title: 'Closes At', description: 'e.g. 18:00' },
  ],
}),
```

3. Deploy: `pnpm --filter ses-content deploy`

**Verification:** Open Sanity Studio → Site Settings document → confirm new fields appear.

---

## Phase 2 — TypeScript Types and Data Pipeline

### Task 2.1 — Extend SiteSettingsSchema (Zod) and SiteSettings type

**File to change:**

- `packages/ses-next/src/types.ts`

**Steps:**

1. Open `packages/ses-next/src/types.ts`.
2. In `SiteSettingsSchema` (line 267), add the new fields after `businessHours: z.string().optional()`:

```ts
establishedYear: z.number().optional(),
directorName: z.string().optional(),
latitude: z.number().optional(),
longitude: z.number().optional(),
streetAddress: z.string().optional(),
suburb: z.string().optional(),
state: z.string().optional(),
postcode: z.string().optional(),
openingHours: z
  .object({
    daysOfWeek: z.array(z.string()),
    opensAt: z.string(),
    closesAt: z.string(),
  })
  .optional(),
```

3. In the `SiteSettings` type (line 417), add the corresponding optional fields after `businessHours?: string`:

```ts
establishedYear?: number;
directorName?: string;
latitude?: number;
longitude?: number;
streetAddress?: string;
suburb?: string;
state?: string;
postcode?: string;
openingHours?: {
  daysOfWeek: string[];
  opensAt: string;
  closesAt: string;
};
```

**Verification:** `pnpm type:check` passes.

---

### Task 2.2 — Update GROQ query

**File to change:**

- `packages/ses-next/src/lib/content/queries.ts`

**Steps:**

1. Open `packages/ses-next/src/lib/content/queries.ts`.
2. In `siteSettingsQuery` (line 5), add the new fields after `businessHours`:

```groq
establishedYear,
directorName,
latitude,
longitude,
streetAddress,
suburb,
state,
postcode,
openingHours
```

**Verification:** `pnpm build` fetches siteSettings without errors.

---

### Task 2.3 — Update mapper

**File to change:**

- `packages/ses-next/src/lib/content/mappers.ts`

**Steps:**

1. Open `packages/ses-next/src/lib/content/mappers.ts`.
2. In `mapSiteSettings` (line 150), add the new fields to the return object after `businessHours: model.businessHours`:

```ts
establishedYear: model.establishedYear,
directorName: model.directorName,
latitude: model.latitude,
longitude: model.longitude,
streetAddress: model.streetAddress,
suburb: model.suburb,
state: model.state,
postcode: model.postcode,
openingHours: model.openingHours,
```

**Verification:** `pnpm type:check` passes.

---

## Phase 3 — Frontend: Pages and Components

All pages below already call `getSiteSettings()` via the existing content service pipeline. The `siteSettings` object is available — it just isn't being used in place of the hardcoded values.

### Task 3.1 — Homepage (`page.tsx`)

**File to change:**

- `packages/ses-next/src/app/page.tsx`

**Steps:**

1. Line 9 — replace the hardcoded company name in the title constant with `siteSettings.companyName` (already destructured at line 42, just use it).
2. Line 11 — replace `"19+ years experience"` with a derived value: `${new Date().getFullYear() - (siteSettings.establishedYear ?? 2007)}+ years experience`. Replace `"(03) 4050 7937"` with `siteSettings.phone`.
3. Lines 69–70 — replace `streetAddress: '61B Hansen St'` and `addressLocality: 'Altona North'` with `siteSettings.streetAddress` and `siteSettings.suburb`. Update `addressRegion` and `postalCode` similarly from `siteSettings.state` and `siteSettings.postcode`.
4. Lines 77–78 — replace hardcoded `latitude` and `longitude` with `siteSettings.latitude` and `siteSettings.longitude`.
5. Lines 96–102 — replace the hardcoded `openingHoursSpecification` block with:

```ts
openingHoursSpecification: siteSettings.openingHours
  ? [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: siteSettings.openingHours.daysOfWeek,
        opens: siteSettings.openingHours.opensAt,
        closes: siteSettings.openingHours.closesAt,
      },
    ]
  : undefined,
```

**Verification:** Run `pnpm build`. Inspect homepage JSON-LD in browser source — all values should match Sanity content.

---

### Task 3.2 — Services page and service detail page

**Files to change:**

- `packages/ses-next/src/app/services/page.tsx`
- `packages/ses-next/src/app/services/[...slug]/page.tsx`

**Steps:**

1. `services/page.tsx` — lines 12 and 19: replace `'Storm Electrical Solutions'` in the title strings with `siteSettings.companyName`. Fetch `siteSettings` at the top of the page if not already fetched.
2. `services/[...slug]/page.tsx` — line 72: replace `'Storm Electrical Solutions'` in the title template with `siteSettings.companyName`. Lines 156–159: replace hardcoded `streetAddress`, `addressLocality`, `addressRegion`, `postalCode` with `siteSettings` fields. Replace hardcoded latitude/longitude with `siteSettings.latitude` / `siteSettings.longitude`.

**Verification:** Build passes. Inspect a service page's JSON-LD in browser — address and coordinates come from Sanity.

---

### Task 3.3 — Location detail page

**File to change:**

- `packages/ses-next/src/app/locations/[locationSlug]/page.tsx`

**Steps:**

1. Lines 87–90: replace hardcoded `streetAddress`, `addressLocality`, `postalCode`, `addressRegion` with `siteSettings.streetAddress`, `siteSettings.suburb`, `siteSettings.postcode`, `siteSettings.state`.
2. Replace hardcoded latitude/longitude with `siteSettings.latitude` / `siteSettings.longitude`.

**Verification:** Build passes. Inspect a location page's JSON-LD — address comes from Sanity.

---

### Task 3.4 — Blog pages

**Files to change:**

- `packages/ses-next/src/app/blog/page.tsx`
- `packages/ses-next/src/app/blog/[slug]/page.tsx`
- `packages/ses-next/src/app/blog/tag/[tag]/page.tsx`

**Steps:**

1. In each file, fetch `siteSettings` (add `getSiteSettings()` call if not already present) and replace the hardcoded `'Storm Electrical Solutions'` string in metadata title/description with `siteSettings.companyName`.

**Verification:** Build passes. View source on a blog page — no hardcoded company name in `<title>`.

---

### Task 3.5 — Terms and FAQ pages

**Files to change:**

- `packages/ses-next/src/app/terms/page.tsx`
- `packages/ses-next/src/app/faq/page.tsx`

**Steps:**

1. Fetch `siteSettings` in each page and replace `'Storm Electrical Solutions'` in metadata with `siteSettings.companyName`.

**Verification:** Build passes.

---

### Task 3.6 — Footer component

**File to change:**

- `packages/ses-next/src/components/Footer.tsx`

**Steps:**

1. Line 53: replace the hardcoded `<strong>Storm Electrical Solutions. Melbourne electricians.</strong>` with `siteSettings.companyName`. Pass `siteSettings` (or just `companyName`) as a prop from the parent layout.

**Verification:** Build passes. Footer renders company name from Sanity.

---

### Task 3.7 — Contact component

**File to change:**

- `packages/ses-next/src/components/Contact.tsx`

**Steps:**

1. Line 33: replace the hardcoded inline address (`61B Hansen St`, `Altona North`) with `siteSettings.streetAddress` and `siteSettings.suburb`. Pass the required fields as a prop.

**Verification:** Build passes. Contact section renders address from Sanity.

---

## Phase 4 — Remove Flat Field Duplicates

Once all frontend consumers have been migrated to the structured fields, remove the legacy flat fields (`address`, `businessHours`) that are now superseded by `streetAddress`/`suburb`/`state`/`postcode` and `openingHours`.

### Task 4.1 — Remove flat fields from Sanity schema

**File to change:**

- `packages/ses-content/schemas/siteSettings.ts`

**Steps:**

1. Delete the `defineField({ name: 'address', ... })` entry.
2. Delete the `defineField({ name: 'businessHours', ... })` entry.
3. Deploy: `pnpm --filter ses-content deploy`

**Verification:** Sanity Studio no longer shows the `address` or `businessHours` fields. Build passes.

---

### Task 4.2 — Remove flat fields from Zod schema and TypeScript type

**File to change:**

- `packages/ses-next/src/types.ts`

**Steps:**

1. In `SiteSettingsSchema`, remove `address: z.string().optional()` and `businessHours: z.string().optional()`.
2. In the `SiteSettings` type, remove `address?: string` and `businessHours?: string`.

**Verification:** `pnpm type:check` passes with no references to the removed fields.

---

### Task 4.3 — Remove flat fields from GROQ query and mapper

**Files to change:**

- `packages/ses-next/src/lib/content/queries.ts`
- `packages/ses-next/src/lib/content/mappers.ts`

**Steps:**

1. In `siteSettingsQuery`, remove `address` and `businessHours` from the field list.
2. In `mapSiteSettings`, remove `address: model.address` and `businessHours: model.businessHours` from the return object.

**Verification:** `pnpm type:check` and `pnpm build` pass.

---

## Phase 5 — Mail Service

### Task 5.1 — Replace hardcoded company name in email templates

**File to change:**

- `packages/ses-next/src/lib/mailService.ts`

**Steps:**

1. Line 49: replace the hardcoded `<strong>Storm Electrical Solutions</strong>` in `thankYouForContactingTemplate` with a `{{companyName}}` template variable.
2. Update the `SendEmailParams` interface to accept an optional `companyName` field and pass it through `emailBody` interpolation alongside the existing form data fields.
3. Update all callers of `send()` to pass `companyName: siteSettings.companyName`.

### Task 5.2 — Move BCC email address to environment variable

**Files to change:**

- `packages/ses-next/src/lib/mailService.ts`
- `packages/ses-next/src/lib/config.ts`

**Steps:**

1. In `config.ts`, add `emailBcc: z.string().optional()` to `AppConfigSchema` and `emailBcc: process.env.EMAIL_BCC` to `rawConfig`.
2. In `mailService.ts`, line 98: replace `'dejanvasic24@gmail.com'` with `config.emailBcc ? [config.emailBcc] : []`.
3. Add `EMAIL_BCC` to your `.env.local` and Vercel environment variables.

**Verification:** Build passes. No literal email address remains in source files.

---

## Sanity CMS Steps

Populate the new fields in the `siteSettings` document after schema deployment (Task 1.1):

- [ ] `establishedYear`: `2007`
- [ ] `directorName`: `Karl Rainbow`
- [ ] `latitude`: `-37.8354339`
- [ ] `longitude`: `144.8650809`
- [ ] `streetAddress`: `61B Hansen St`
- [ ] `suburb`: `Altona North`
- [ ] `state`: `VIC`
- [ ] `postcode`: `3025`
- [ ] `openingHours.daysOfWeek`: `['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday']`
- [ ] `openingHours.opensAt`: `07:00`
- [ ] `openingHours.closesAt`: `18:00`

---

## Verification Checklist

Run in order before pushing code changes:

- [ ] `pnpm format`
- [ ] `pnpm lint`
- [ ] `pnpm type:check`
- [ ] `pnpm build`
- [ ] `pnpm test:e2e`

---

## Rollback Plan

1. All new Sanity schema fields are additive (optional) — removing them has no frontend impact if the code hasn't been deployed yet.
2. The flat field removal (Phase 4) is the only destructive step — if needed, the fields can be re-added to the schema and re-populated from Sanity history (no content is lost, Sanity retains field values until the schema change is deployed).
3. Frontend changes can be reverted by reverting the relevant commits — the hardcoded values were working before, so reverting restores a working state.
4. The BCC email env var change: if `EMAIL_BCC` is not set, the code falls back to an empty array (no BCC sent) — this is safer than a hardcoded personal email.
5. No database migrations or destructive operations beyond the flat field schema removal are involved.
