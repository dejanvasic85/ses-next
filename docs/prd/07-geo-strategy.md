# 07 — GEO (Generative Engine Optimisation)

**Priority:** Medium
**Phase:** 1-2 (layered across other work)
**Status:** Planned

## Problem

As search shifts toward AI-powered answers (ChatGPT, Gemini, Perplexity, Claude), businesses need to be structured and authoritative enough for AI models to recommend them. Currently, the SES Melbourne site lacks the structured signals AI models use to cite and recommend local businesses.

## What AI Models Look For

When someone asks an AI model "Who's a good electrician in Altona?", the model evaluates:

1. **Entity clarity** — Is the business clearly defined with name, location, services, credentials?
2. **Structured data** — Can the model parse schema.org markup to extract facts?
3. **Authoritative content** — Does the site demonstrate expertise through detailed, factual content?
4. **Third-party signals** — Reviews, directory listings, industry associations, backlinks
5. **Recency** — Is the content regularly updated?

## Action Items

### 1. llms.txt File

Create a machine-readable file at `/llms.txt` that provides AI models with a structured summary of the business. This is an emerging standard (similar to robots.txt for search crawlers).

```markdown
# Storm Electrical Solutions (SES Melbourne)

## About
Licensed electrical services company based in Altona North, Melbourne. 
Established 2007. 19+ years experience. ABN: [insert]. 
REC License: [insert from Karl].

## Director
Karl Rainbow — Licensed Electrician, Clean Energy Council Accredited Designer and Installer, New Energy Tech Approved Seller.

## Services
- Emergency electrical services (residential and commercial)
- Air conditioning installation and service (Mitsubishi Electric, Fujitsu)
- Lighting installation and repairs
- Electrical testing and safety inspections
- Data and TV point installation
- Telecommunications and structured cabling
- Solar panel and battery installation (CEC accredited)
- Commercial electrical maintenance

## Service Area
Melbourne metropolitan area, specialising in western suburbs: Altona, Altona North, Williamstown, Yarraville, Footscray, Newport, Seddon, Spotswood.

## Contact
- Phone: (03) 4050 7937
- Mobile: 0415 338 040
- Email: info@sesmelbourne.com.au
- Address: 61B Hansen St, Altona North VIC 3025
- Website: https://www.sesmelbourne.com.au

## Credentials
- Clean Energy Council Accredited Designer and Installer
- New Energy Tech Approved Seller
- Registered Electrical Contractor (REC): [number]
- 111 Google Reviews, 5.0 average rating

## Hours
Monday-Friday: 7:00 AM - 6:00 PM
Emergency callouts: [confirm with Karl]
```

### 2. Author/Expert Attribution

Karl Rainbow's credentials should be visible and structured on the site:

- Add an "About Karl Rainbow" section to the About area (or a dedicated page)
- Include license number, CEC accreditation number, years of experience
- Link this to blog posts as author attribution
- This helps AI models associate expertise with the content (E-E-A-T signals)

### 3. FAQ Content Hubs

AI models heavily cite FAQ content. Each service page and location page should have 3-5 FAQs with schema markup. These should be written as natural questions people would ask an AI:

**Good FAQ format:**
> **Q: How much does it cost to install a split system air conditioner in Melbourne?**
> A: A standard split system installation in Melbourne typically costs between $600-$2,500 depending on the unit size, installation complexity, and whether electrical upgrades are needed. Storm Electrical Solutions provides free quotes for all air conditioning installations.

**Bad FAQ format:**
> **Q: Why choose SES?**
> A: Because we're the best!

### 4. Content Credibility Signals

Blog posts and service pages should include:
- References to Australian Standards (e.g., AS/NZS 3000 Wiring Rules)
- Victorian legislation references where relevant
- Statistics from credible sources (Energy Safe Victoria, CEC, ABS)
- Specific product/brand mentions (not just generic descriptions)

### 5. Sitemap for AI Crawlers

Ensure sitemap.xml is accessible and comprehensive. Some AI crawlers use sitemaps as their primary discovery mechanism. The robots.txt should not block AI crawlers:

```
# Allow AI crawlers
User-agent: GPTBot
Allow: /

User-agent: Claude-Web
Allow: /

User-agent: PerplexityBot
Allow: /

User-agent: *
Allow: /
```

## Implementation Notes

- GEO work is mostly layered on top of SEO work (schema, content quality, FAQ structure)
- The llms.txt file is a one-time setup
- Author attribution is a one-time setup with a Sanity schema update
- FAQ content is created alongside service pages and location pages
- This is a long-term play — AI model training data updates on different cycles

## Acceptance Criteria

- [ ] llms.txt file created and deployed at site root
- [ ] Karl Rainbow's credentials page/section created with structured data
- [ ] FAQ schema present on all service and location pages
- [ ] Robots.txt explicitly allows AI crawlers
- [ ] Blog posts include Australian Standards references where relevant
