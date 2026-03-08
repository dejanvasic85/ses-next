# 05 — Location Pages

**Priority:** Critical
**Phase:** 2 (Month 2-3)
**Status:** Planned

## Problem

The site has zero location-specific pages. Competitor Briggs Electrical has 15+ pages like `/electrician-brighton/`, `/electrician-bayside/` etc. Search Console shows significant impressions for suburb-specific queries with poor positions because there's no relevant landing page.

## Keyword Evidence

| Query | Impressions | Clicks | Position |
|-------|----------:|------:|:--------:|
| electrician altona | 3,618 | 17 | 4.1 |
| electricians altona | 2,090 | 7 | 2.9 |
| altona electrician | 1,384 | 7 | 3.4 |
| electricians in altona | 1,083 | 0 | 4.9 |
| electrician company altona | 1,032 | 0 | 3.3 |
| electrician altona north | 547 | 6 | 4.5 |
| air conditioning installation footscray | 791 | 0 | 81.5 |
| air conditioner footscray | 498 | 0 | 75.7 |
| emergency electrician altona | 421 | 0 | 9.9 |
| split system installations altona | 213 | 0 | 16.0 |
| electrician newport | 67 | 1 | 2.7 |
| electrician yarraville | 43 | 1 | 6.4 |
| williamstown electrician | 16 | 1 | 7.6 |

## Key Insight

SES already ranks well for Altona terms (positions 2-5) **without a dedicated page**. A properly optimised Altona page should push these to position 1-3 and significantly increase CTR. For suburbs like Footscray where position is 75+, a dedicated page is the only way to compete.

## New Pages Required

### Priority 1 — Immediate (already have keyword traction)

1. **`/electrician-altona/`** — consolidate the strong Altona signal
2. **`/electrician-altona-north/`** — SES is physically located here
3. **`/electrician-footscray/`** — high impression volume (791+ for AC alone)

### Priority 2 — Near-term (some keyword signals)

4. **`/electrician-williamstown/`**
5. **`/electrician-yarraville/`**
6. **`/electrician-newport/`**

### Priority 3 — Future expansion

7. **`/electrician-seddon/`**
8. **`/electrician-spotswood/`**
9. **`/electrician-laverton/`**
10. **`/electrician-point-cook/`**

### Hub Page

**`/electrician-melbourne/`** — a parent page that links to all suburb pages and targets the broader "electrician melbourne" keyword (currently at position 43).

## Content Template

Each location page should follow this structure. **Critical: these must NOT be duplicate content with just the suburb name swapped.** Each page needs genuine local relevance.

```
H1: Electrician [Suburb] — Licensed Local Electricians

Intro paragraph (unique per suburb):
- Distance/travel time from SES base in Altona North
- Types of properties common in that suburb (Victorian terraces, new estates, commercial precincts)
- Common electrical issues in the area

H2: Our Electrical Services in [Suburb]
- Brief list of services with links to full service pages
- Mention any work done in the area (with Karl's input)

H2: Why Choose SES for [Suburb]
- Local proximity advantage
- Response times
- Reviews from customers in/near that suburb (if available)

H2: Common Electrical Issues in [Suburb]
- Suburb-specific content (e.g., old wiring in heritage areas, new builds needing switchboard upgrades)

H2: Frequently Asked Questions
- 3-4 FAQs with FAQ schema
- "How much does an electrician cost in [Suburb]?"
- "Do you offer emergency callouts in [Suburb]?"

CTA: Contact form or phone number
```

## Implementation Notes

### URL Structure
Use `/electrician-[suburb]/` at the root level (not nested under /services/ or /locations/). This matches competitor patterns and keeps URLs short.

### Routing in Next.js
Create a dynamic route: `pages/electrician-[suburb].tsx` or individual static pages. If using Sanity, create a "Location Page" document type.

### Internal Linking
- Homepage services section should link to the hub page
- Each service page should mention service areas and link to relevant location pages
- Blog posts mentioning suburbs should link to location pages
- Location pages cross-link to each other ("Also serving nearby: [suburb links]")

### Content Sourcing
Ask Karl for:
- Specific jobs done in each suburb (anonymised is fine)
- Any suburb-specific knowledge (common house types, electrical issues)
- Photos from jobs in those areas

If Karl can't provide suburb-specific details, research the suburb characteristics (housing age, demographics, common property types) to create genuinely useful local content.

## What NOT to Do

- Don't create 20 near-identical pages with just suburb names swapped (Google penalises this)
- Don't stuff keywords unnaturally
- Don't claim coverage areas where SES doesn't actually operate
- Don't fabricate customer testimonials for specific suburbs

## Acceptance Criteria

- [ ] Hub page `/electrician-melbourne/` live
- [ ] At least 3 suburb pages live (Altona, Altona North, Footscray)
- [ ] Each page has unique, substantive content (600+ words)
- [ ] Each page has LocalBusiness schema with areaServed for that suburb
- [ ] Each page has FAQ schema
- [ ] Internal links added from service pages and homepage
- [ ] All new pages in sitemap and indexed
