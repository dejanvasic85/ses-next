# 01 — Structured Data (JSON-LD Schema)

**Priority:** Critical
**Phase:** 1 (Month 1)
**Status:** To Do

## Current State

The site already has some structured data via `next-seo` (v7.2.0):

- **LocalBusinessJsonLd** on homepage and service pages
- **ArticleJsonLd** on blog posts

However, Google Search Console's Search Appearance report is empty — meaning none of this is generating rich results yet. The existing schema needs enhancement and there are genuine gaps.

## Gaps to Address

1. **Enhanced LocalBusiness** — existing homepage schema is missing: `@type: Electrician`, `geo`, `openingHoursSpecification`, `priceRange`, `hasCredential`, `sameAs`, `alternateName`, `areaServed`
2. **Service schema** — service pages use LocalBusiness but need the more specific `Service` type with `serviceType`, `provider`, `areaServed`
3. **FAQPage schema** — `/faq` page has zero JSON-LD
4. **BreadcrumbList schema** — missing on all inner pages

## Requirements

### 1. Enhance Homepage LocalBusinessJsonLd

**File:** `packages/ses-next/src/pages/index.tsx`

Update the existing `LocalBusinessJsonLd` to use `type="Electrician"` and add:

- `alternateName`: "SES Melbourne"
- `geo` coordinates: lat -37.8354339, lng 144.8650809
- `openingHoursSpecification`: Mon–Fri 07:00–18:00 (confirmed by Karl: business hours only, no after-hours emergency)
- `priceRange`: "$$"
- `sameAs`: Facebook, Instagram, LinkedIn URLs
- `areaServed`: Melbourne, Altona, Altona North, Newport, Yarraville, Footscray, Williamstown, Moonee Ponds, Ascot Vale
- `aggregateRating`: 5.0 rating, 111 reviews

> **Note:** `hasCredential` is not directly supported by next-seo's LocalBusinessJsonLd — use the `overrides` escape hatch or render a separate raw `<script type="application/ld+json">` tag for CEC accreditation and NETA credentials.

### 2. Add Service JSON-LD to Service Pages

**File:** `packages/ses-next/src/pages/services/[id].tsx`

Add a second JSON-LD block alongside the existing LocalBusinessJsonLd. Use next-seo's generic `JsonLd` or a raw `<script type="application/ld+json">` since next-seo doesn't have a dedicated ServiceJsonLd:

```json
{
  "@context": "https://schema.org",
  "@type": "Service",
  "name": "<service.name>",
  "description": "<service.description>",
  "provider": {
    "@type": "Electrician",
    "name": "Storm Electrical Solutions",
    "url": "https://www.sesmelbourne.com.au"
  },
  "areaServed": { "@type": "City", "name": "Melbourne" },
  "serviceType": "<derived from service slug/name>"
}
```

The `serviceType` can use `service.name` directly since it's already descriptive. Keep the existing LocalBusinessJsonLd in place.

| Page                           | serviceType                               |
| ------------------------------ | ----------------------------------------- |
| /services/air-conditioning     | Air Conditioning Installation and Service |
| /services/lighting             | Lighting Installation and Repair          |
| /services/electrical-testing   | Electrical Testing and Inspection         |
| /services/data-and-tv          | Data and TV Point Installation            |
| /services/telecommunications   | Telecommunications and Data Cabling       |
| /services/renewable-energy     | Solar Panel and Battery Installation      |
| /services/catering-maintenance | Commercial Electrical Maintenance         |

### 3. Add FAQPageJsonLd to FAQ Page

**File:** `packages/ses-next/src/pages/faq.tsx`

next-seo provides `FAQPageJsonLd`. Add before the `<Layout>`:

```tsx
import { FAQPageJsonLd } from 'next-seo';

<FAQPageJsonLd
  mainEntity={faqItems.map(({ question, answer }) => ({
    questionName: question,
    acceptedAnswerText: answer,
  }))}
/>;
```

> **Note:** Review current FAQ content. If questions are too generic, rewrite to target actual search queries from Search Console data (e.g., "How often should electrical testing be done?", "Do I need a licensed electrician to install a split system?").

### 4. Add BreadcrumbJsonLd to Inner Pages

next-seo provides `BreadcrumbJsonLd`. Add to:

- `packages/ses-next/src/pages/services/[id].tsx`
- `packages/ses-next/src/pages/faq.tsx`
- `packages/ses-next/src/pages/blog/[slug].tsx` (already has ArticleJsonLd)

Each page constructs breadcrumb items based on its route depth.

## Implementation Notes

- Use existing `next-seo` library (v7.2.0, already installed). No new dependencies needed.
- LocalBusiness enhancement = homepage only. Service pages keep their existing LocalBusiness and gain a Service block.
- Validate all schema at https://search.google.com/test/rich-results before deploying
- Run `npm run type:check` and `npm run lint` to confirm no errors

## Acceptance Criteria

- [ ] Homepage LocalBusinessJsonLd enhanced with Electrician type, geo, hours, sameAs, areaServed
- [ ] Service JSON-LD added to each of the 7 service pages
- [ ] FAQPageJsonLd added to /faq page
- [ ] BreadcrumbJsonLd added to service pages, FAQ, and blog posts
- [ ] All schema passes Google Rich Results Test with no errors
- [ ] Existing ArticleJsonLd on blog posts left intact
- [ ] `npm run type:check` and `npm run lint` pass
