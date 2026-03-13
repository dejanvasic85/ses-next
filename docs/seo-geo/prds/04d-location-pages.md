# 04d — Location Hub & Suburb Pages

**Priority:** Critical
**Phase:** 2 (Month 2-3)
**Status:** Planned
**Depends on:** PRD-04a (services hub — for internal linking pattern), PRD-01 (structured data)

## Problem

The site has zero location-specific pages. Competitor Briggs Electrical has 15+ dedicated suburb pages. Search Console shows significant impressions for suburb-specific queries with poor positions because there's no relevant landing page.

SES already ranks positions 2-5 for Altona terms **without a dedicated page**. A properly optimised page should push these to position 1-3 and significantly increase CTR. For suburbs like Footscray (position 75+), a dedicated page is the only way to compete.

## Keyword Evidence

| Query                                   | Impressions | Clicks | Position |
| --------------------------------------- | ----------: | -----: | :------: |
| electrician altona                      |       3,618 |     17 |   4.1    |
| electricians altona                     |       2,090 |      7 |   2.9    |
| altona electrician                      |       1,384 |      7 |   3.4    |
| electricians in altona                  |       1,083 |      0 |   4.9    |
| electrician company altona              |       1,032 |      0 |   3.3    |
| electrician altona north                |         547 |      6 |   4.5    |
| air conditioning installation footscray |         791 |      0 |   81.5   |
| air conditioner footscray               |         498 |      0 |   75.7   |
| emergency electrician altona            |         421 |      0 |   9.9    |
| split system installations altona       |         213 |      0 |   16.0   |
| electrician newport                     |          67 |      1 |   2.7    |
| electrician yarraville                  |          43 |      1 |   6.4    |
| williamstown electrician                |          16 |      1 |   7.6    |

## Scope

This PRD covers:

- New "Location Page" document type in Sanity
- Location hub page at `/electrician-melbourne/`
- First 3 suburb pages (Altona, Altona North, Footscray)
- Internal linking from services and homepage
- Sitemap and structured data

Future suburb pages (Newport, Yarraville, Williamstown, Moonee Ponds, Ascot Vale, etc.) follow the same template and are added incrementally under ongoing content work.

## URL Structure

Root-level URLs matching competitor patterns:

```
/electrician-melbourne/          ← hub page
/electrician-altona/             ← suburb page
/electrician-altona-north/       ← suburb page
/electrician-footscray/          ← suburb page
```

Not nested under `/services/` or `/locations/`. This keeps URLs short and matches how competitors and users search.

## Sanity Content Model

### New document type: `locationPage`

| Field              | Type                | Description                                                 |
| ------------------ | ------------------- | ----------------------------------------------------------- |
| `title`            | string              | Display name (e.g., "Electrician Altona")                   |
| `slug`             | slug                | URL slug (e.g., "electrician-altona")                       |
| `suburb`           | string              | Suburb name (e.g., "Altona")                                |
| `isHub`            | boolean             | `true` for the Melbourne hub page, `false` for suburb pages |
| `heroImage`        | image               | Hero/banner image                                           |
| `intro`            | blockContent        | Unique intro paragraph for this suburb                      |
| `distanceFromBase` | string              | e.g., "5 minutes from our Altona North base"                |
| `propertyTypes`    | string              | Common property types in the area                           |
| `commonIssues`     | blockContent        | Suburb-specific electrical issues                           |
| `services`         | array of references | Links to service pages relevant to this suburb              |
| `nearbySuburbs`    | array of references | Links to other locationPage documents for cross-linking     |
| `faqs`             | array of objects    | FAQ items (question + answer) for FAQ schema                |
| `seoTitle`         | string              | Custom title tag                                            |
| `seoDescription`   | string              | Custom meta description                                     |
| `gallery`          | array of images     | Job photos from the suburb                                  |

### Why a separate document type (not reusing `service`)?

Location pages have different fields (suburb, distance, property types, nearby suburbs) and a different content template. Sharing the `service` type would add complexity for no benefit. Separate types keep the Sanity Studio clean for Karl.

## Routing in Next.js

Create `pages/electrician-[suburb].tsx` or use a catch-all pattern. Since these are root-level URLs, the file sits directly in `pages/`:

```
pages/
  electrician-[suburb].tsx    ← dynamic route for all location pages
```

`getStaticPaths` queries all `locationPage` documents from Sanity. `getStaticProps` fetches the specific page by slug.

The hub page (`/electrician-melbourne/`) uses the same route — it's just a `locationPage` document with `isHub: true` that renders a different template (list of all suburb pages instead of suburb-specific content).

## Pages

### Hub: `/electrician-melbourne/`

**Title tag:** `Electrician Melbourne — Licensed Local Electricians | SES`

**Meta description:** `Licensed Melbourne electricians serving the western suburbs. Altona, Footscray, Newport, Yarraville and more. 19+ years experience, 5-star rated. Call (03) 4050 7937.`

**Content structure:**

```
H1: Electrician Melbourne

Intro:
- SES serves Melbourne's western suburbs from their Altona North base
- 19+ years experience, licensed, CEC accredited
- Residential and commercial

H2: Areas We Serve
- Card grid or list linking to each suburb page
- Each card: suburb name, brief description, distance from base
- Dynamically populated from Sanity locationPage documents

H2: Our Electrical Services
- Brief service list linking to service pages and hub
- Connects location intent with service intent

H2: Why Melbourne Chooses SES
- Reviews, credentials, response times
- 112 Google reviews, 5.0 average

H2: Frequently Asked Questions
- "What areas of Melbourne do you service?"
- "How quickly can you get to [general area]?"
- "Do you charge for travel time?"

CTA: Phone + contact form
```

### Suburb: `/electrician-altona/`

**Title tag:** `Electrician Altona — Licensed Local Electricians | SES`

**Meta description:** `Local electrician in Altona. Residential and commercial electrical services, air conditioning, solar. 5 minutes from our base. 5-star rated. Call (03) 4050 7937.`

**Content must be unique.** Not a template with suburb name swapped. Include:

- Distance from SES base (Altona North — essentially next door)
- Property types in Altona (mix of older weatherboard homes, newer townhouses, some light commercial along Pier Street)
- Common electrical issues (older homes needing switchboard upgrades, rewiring)
- Any specific jobs Karl can reference
- Local landmarks/context that demonstrate genuine knowledge of the area

### Suburb: `/electrician-altona-north/`

**Title tag:** `Electrician Altona North — Your Local Electricians | SES`

This is where SES is physically based. The page should emphasise:

- "We're based right here in Altona North at 61B Hansen St"
- Zero travel time, fastest response in the area
- Mix of residential and industrial/commercial properties
- Brooklyn/Altona North industrial precinct for commercial work

### Suburb: `/electrician-footscray/`

**Title tag:** `Electrician Footscray — Licensed Local Electricians | SES`

Footscray has the highest untapped impression volume (791+ for AC alone, position 81.5). Content should cover:

- Growing suburb with mix of heritage Victorian homes and new apartment developments
- Common issues: old wiring in heritage properties, new builds needing full electrical fit-outs
- Commercial strip along Nicholson Street
- Distance from Altona North base (~10 minutes)

## Structured Data

Each location page gets:

### LocalBusiness schema (suburb-specific)

```json
{
  "@context": "https://schema.org",
  "@type": "Electrician",
  "name": "Storm Electrical Solutions — Electrician Altona",
  "url": "https://www.sesmelbourne.com.au/electrician-altona/",
  "telephone": "(03) 4050 7937",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "61B Hansen St",
    "addressLocality": "Altona North",
    "addressRegion": "VIC",
    "postalCode": "3025"
  },
  "areaServed": {
    "@type": "City",
    "name": "Altona"
  },
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": "5.0",
    "reviewCount": "112"
  }
}
```

### BreadcrumbJsonLd

```
Home → Electrician Melbourne → Electrician Altona
```

### FAQPageJsonLd

From the FAQ section on each page.

## Internal Linking

- **Homepage** → hub page (`/electrician-melbourne/`). Add to the "Service Areas" or a new "Areas We Serve" section.
- **Hub page** → all suburb pages
- **Suburb pages** → cross-link to nearby suburbs ("Also serving nearby: [links]")
- **Service pages** → mention service areas with links to relevant location pages (e.g., air conditioning page mentions "We install split systems across Altona, Footscray, and Newport" with links)
- **Location pages** → link to relevant service pages
- **Blog posts** → link to location pages where suburbs are mentioned

## Content Sourcing

Ask Karl for:

- Specific jobs done in each suburb (anonymised — "recently upgraded a 1960s switchboard in Altona")
- Any suburb-specific knowledge
- Photos from jobs in target suburbs (via OneDrive)

If Karl can't provide details, research suburb characteristics to create genuinely useful local content. Never fabricate testimonials or job references.

## What NOT to Do

- Don't create near-identical pages with just suburb names swapped (Google penalises thin doorway pages)
- Don't stuff keywords unnaturally
- Don't claim coverage for areas SES doesn't actually service
- Don't fabricate customer testimonials for specific suburbs
- Don't use fake "local office" addresses — SES has one base in Altona North

## Future Suburb Pages

These follow the same template and are added incrementally. Not in scope for this PRD but documented for planning:

**Priority 2 — Near-term:**

- `/electrician-newport/` — Karl confirmed regular work here
- `/electrician-yarraville/` — Karl confirmed regular work here
- `/electrician-williamstown/` — nearby, some keyword signals
- `/electrician-moonee-ponds/` — team members in the area
- `/electrician-ascot-vale/` — team members in the area

**Priority 3 — Future:**

- `/electrician-seddon/`
- `/electrician-spotswood/`
- `/electrician-laverton/`
- `/electrician-point-cook/`

## Acceptance Criteria

- [ ] `locationPage` document type created in Sanity
- [ ] Hub page `/electrician-melbourne/` live and linking to all suburb pages
- [ ] `/electrician-altona/` live with 600+ words of unique content
- [ ] `/electrician-altona-north/` live with 600+ words of unique content
- [ ] `/electrician-footscray/` live with 600+ words of unique content
- [ ] Each page has LocalBusiness schema with suburb-specific `areaServed`
- [ ] Each page has BreadcrumbJsonLd and FAQPageJsonLd
- [ ] Each page has unique title tag and meta description
- [ ] Hub page linked from homepage (service areas section or similar)
- [ ] Cross-links between suburb pages ("Also serving nearby")
- [ ] Service pages updated with links to relevant location pages
- [ ] All new pages appear in sitemap
- [ ] No duplicate/thin content — each page is substantively unique
