# 02 — Meta Tags & Canonicals

**Priority:** Critical
**Phase:** 1 (Month 1)
**Status:** Complete

## Problem

Current title tags are generic and don't target high-value keywords. The homepage title "SES Melbourne Electricians | Emergency: AC, Lighting, Network & More" doesn't clearly target "electrician Melbourne" or "Melbourne electrician." Service page titles likely follow the same pattern.

Additionally, UTM-tagged URLs are being indexed as separate pages, creating duplicate content.

## Requirements

### 1. Homepage Title & Meta

**Current:** `SES Melbourne Electricians | Emergency: AC, Lighting, Network & More`

**Proposed:** `Melbourne Electricians | 24/7 Emergency Electrical Services | Storm Electrical Solutions`

**Meta description:** `Licensed Melbourne electricians with 19+ years experience. Emergency electrical services, air conditioning, solar, lighting & data cabling. 5-star rated. Free quotes. Call (03) 4050 7937.`

**Rationale:** Leads with "Melbourne Electricians" (target keyword), includes "emergency" (high-value modifier), ends with brand name for recognition.

### 2. Service Page Titles

| Page                           | Current Title (likely) | Proposed Title                                                 |
| ------------------------------ | ---------------------- | -------------------------------------------------------------- |
| /services/air-conditioning     | Air Conditioning       | Air Conditioning Installation & Service Melbourne \| SES       |
| /services/lighting             | Lighting               | Lighting Installation & Repairs Melbourne \| SES               |
| /services/electrical-testing   | Electrical Testing     | Electrical Testing & Safety Inspections Melbourne \| SES       |
| /services/data-and-tv          | Data and TV            | Data & TV Point Installation Melbourne \| SES                  |
| /services/telecommunications   | Telecommunications     | Data Cabling & Telecommunications Electrician Melbourne \| SES |
| /services/renewable-energy     | Renewable Energy       | Solar Panel & Battery Installation Melbourne \| SES            |
| /services/catering-maintenance | Catering Maintenance   | Commercial Electrical Maintenance Melbourne \| SES             |

**Pattern:** `[Primary Service Keyword] Melbourne | SES`

Each service page also needs a unique, keyword-rich meta description (max 155 characters) that includes a call to action.

### 3. Canonical Tags

**Fix UTM parameter indexing:**

The URL `/?utm_campaign=gmb` has 16,386 impressions as a separate page. Add a canonical tag to ensure all parameterised versions point to the clean URL:

```html
<link rel="canonical" href="https://www.sesmelbourne.com.au/" />
```

This should be added globally — every page should have a self-referencing canonical tag. In Next.js Pages Router:

```jsx
// In _app.tsx or per-page <Head>
<Head>
  <link rel="canonical" href={`https://www.sesmelbourne.com.au${router.asPath.split('?')[0]}`} />
</Head>
```

### 4. Open Graph Tags

Ensure each page has proper OG tags for social sharing and AI model context:

```html
<meta property="og:title" content="[Page Title]" />
<meta property="og:description" content="[Meta Description]" />
<meta property="og:url" content="https://www.sesmelbourne.com.au/[path]" />
<meta property="og:type" content="website" />
<meta property="og:image" content="https://www.sesmelbourne.com.au/og-image.jpg" />
<meta property="og:locale" content="en_AU" />
```

## Implementation Notes

- If using Sanity CMS for page content, consider adding `seoTitle` and `seoDescription` fields to the page schema so Karl or Dean can edit these without code changes
- Title tag max length: ~60 characters (for display in SERPs)
- Meta description max length: ~155 characters
- Test canonical implementation by checking `view-source:` on the deployed page

## Acceptance Criteria

- [x] Homepage title and meta description updated
- [x] All 7 service page titles and meta descriptions updated
- [x] Self-referencing canonical tags on all pages
- [x] UTM parameters stripped from canonical URLs
- [x] OG tags present on all pages (title, description, url, siteName, locale, image)
- [ ] Verify in Google Search Console that /?utm_campaign=gmb stops appearing as separate page (may take 2-4 weeks)

## Implementation Summary

Completed in commit `36fb732` on branch `claude/implement-next-prd-bEbrf`.

### What was changed

- **`PageHead.tsx`** — Replaced `generateNextSeo` (App Router API, was silently not rendering) with `<NextSeo>` component (Pages Router API). This was the root cause of canonical and OG tags not being output. Added `og:locale: en_AU`. OG title now uses the page title instead of the company name.
- **`Layout.tsx`** — Added optional `description` prop for per-page meta description override, falling back to the global `siteSettings.meta.description`.
- **`pages/index.tsx`** — Homepage title and meta description defined as module-level constants and passed to `Layout`.
- **`ses-content/schemas/service.ts`** — Added optional `seoTitle` and `seoDescription` fields to the Sanity service schema so Karl/Dean can manage SEO copy from Sanity Studio without code changes.
- **`types.ts`** — Added `seoTitle?` and `seoDescription?` to `ServiceSchema` (zod) and `ServiceItem` type.
- **`queries.ts`** — Added `seoTitle`, `seoDescription` to `servicesQuery` GROQ projection.
- **`mappers.ts`** — `mapService` passes through `seoTitle` and `seoDescription`.
- **`pages/services/[id].tsx`** — Added `serviceSeoTitles` and `serviceSeoDescriptions` constant maps for all 7 services as immediate fallbacks. `getStaticProps` uses `service.seoTitle || constant` so CMS values take precedence once set. Description passed to `Layout`.

### Notes

- No static `og-image.jpg` exists in `/public`; OG image uses `companyLogo` from Sanity (Cloudinary CDN URL).
- Service SEO descriptions were written per-page, all ≤155 characters with a call to action.
- The GSC UTM indexing fix will take 2-4 weeks to reflect after deployment.
