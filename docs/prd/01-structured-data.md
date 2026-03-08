# 01 — Structured Data (JSON-LD Schema)

**Priority:** Critical
**Phase:** 1 (Month 1)
**Status:** To Do

## Problem

The site has zero structured data. Google Search Console shows no rich results (Search Appearance report is empty). Competitors have LocalBusiness and Service schema, giving them review stars and enhanced listings in search results. AI models also rely on structured data to understand and recommend businesses.

## Requirements

### 1. LocalBusiness Schema (all pages)

Add to `_app.tsx` or layout component so it appears on every page.

```json
{
  "@context": "https://schema.org",
  "@type": "Electrician",
  "name": "Storm Electrical Solutions",
  "alternateName": "SES Melbourne",
  "url": "https://www.sesmelbourne.com.au",
  "logo": "https://www.sesmelbourne.com.au/logo.png",
  "image": "https://www.sesmelbourne.com.au/og-image.jpg",
  "telephone": "(03) 4050 7937",
  "email": "info@sesmelbourne.com.au",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "61B Hansen St",
    "addressLocality": "Altona North",
    "addressRegion": "VIC",
    "postalCode": "3025",
    "addressCountry": "AU"
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": -37.8354339,
    "longitude": 144.8650809
  },
  "areaServed": [
    { "@type": "City", "name": "Melbourne" },
    { "@type": "Place", "name": "Altona" },
    { "@type": "Place", "name": "Altona North" },
    { "@type": "Place", "name": "Williamstown" },
    { "@type": "Place", "name": "Yarraville" },
    { "@type": "Place", "name": "Footscray" },
    { "@type": "Place", "name": "Newport" }
  ],
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": "5.0",
    "reviewCount": "111",
    "bestRating": "5"
  },
  "openingHoursSpecification": [
    {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": ["Monday","Tuesday","Wednesday","Thursday","Friday"],
      "opens": "07:00",
      "closes": "18:00"
    }
  ],
  "priceRange": "$$",
  "hasCredential": [
    {
      "@type": "EducationalOccupationalCredential",
      "credentialCategory": "Clean Energy Council Accredited Designer and Installer"
    },
    {
      "@type": "EducationalOccupationalCredential",
      "credentialCategory": "New Energy Tech Approved Seller"
    }
  ],
  "sameAs": [
    "https://www.facebook.com/stormelectricalsolutions",
    "https://www.instagram.com/stormelectricalsolutions/",
    "https://www.linkedin.com/company/storm-electrical-solutions"
  ]
}
```

### 2. Service Schema (each service page)

Add to each `/services/[slug]` page. Example for air conditioning:

```json
{
  "@context": "https://schema.org",
  "@type": "Service",
  "name": "Air Conditioning Installation & Service Melbourne",
  "description": "Split system air conditioner installation, service and repair across Melbourne metro areas.",
  "provider": {
    "@type": "Electrician",
    "name": "Storm Electrical Solutions",
    "url": "https://www.sesmelbourne.com.au"
  },
  "areaServed": { "@type": "City", "name": "Melbourne" },
  "serviceType": "Air Conditioning Installation"
}
```

**Repeat for each service page with appropriate `name`, `description`, and `serviceType`:**

| Page | serviceType |
|------|-------------|
| /services/air-conditioning | Air Conditioning Installation and Service |
| /services/lighting | Lighting Installation and Repair |
| /services/electrical-testing | Electrical Testing and Inspection |
| /services/data-and-tv | Data and TV Point Installation |
| /services/telecommunications | Telecommunications and Data Cabling |
| /services/renewable-energy | Solar Panel and Battery Installation |
| /services/catering-maintenance | Commercial Electrical Maintenance |

### 3. FAQ Schema (FAQ page)

Pull FAQ content from the existing `/faq` page and wrap in schema:

```json
{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "How much does an electrician cost in Melbourne?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "..."
      }
    }
  ]
}
```

> **Note:** Review current FAQ content. If questions are too generic, rewrite to target actual search queries from Search Console data (e.g., "How often should electrical testing be done?", "Do I need a licensed electrician to install a split system?").

### 4. BreadcrumbList Schema (all inner pages)

```json
{
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://www.sesmelbourne.com.au" },
    { "@type": "ListItem", "position": 2, "name": "Services", "item": "https://www.sesmelbourne.com.au/#services" },
    { "@type": "ListItem", "position": 3, "name": "Air Conditioning" }
  ]
}
```

## Implementation Notes

- Use Next.js `<Head>` component or `next/script` with `type="application/ld+json"`
- Can create a reusable `<StructuredData />` component that accepts props
- LocalBusiness schema = global layout, Service schema = per-page
- Validate all schema at https://search.google.com/test/rich-results before deploying

## Acceptance Criteria

- [ ] LocalBusiness schema present on every page
- [ ] Service schema present on each of the 7 service pages
- [ ] FAQ schema present on /faq page
- [ ] BreadcrumbList schema on all inner pages
- [ ] All schema passes Google Rich Results Test with no errors
- [ ] Schema validated at validator.schema.org
