# 03 — Sitemap & Indexing Cleanup

**Priority:** High
**Phase:** 1 (Month 1)
**Status:** Completed

## Problem

Search Console shows several indexing issues:

- Hash anchor URLs (`/#about`, `/#contact`, `/#services`) appearing as indexed pages
- Blog tag pages (`/blog/tag/air-conditioning` etc.) indexed as thin content
- A `_next/image` URL leaked into the index
- Need to verify sitemap includes all 11 blog posts

## Requirements

### 1. Sitemap Audit

Verify `/sitemap.xml` contents:

**Should include:**

- Homepage: `/`
- All 7 service pages: `/services/*`
- All blog posts: `/blog/*` (individual posts only)
- FAQ page: `/faq`
- Blog index: `/blog`

**Should NOT include:**

- Hash anchor URLs: `/#about`, `/#contact`, `/#services`
- Blog tag pages: `/blog/tag/*`
- Terms page (low value): `/terms`
- Any `_next/*` URLs
- Any URLs with query parameters

If using `next-sitemap`, review the config to add exclusion patterns:

```js
// next-sitemap.config.js
module.exports = {
  siteUrl: 'https://www.sesmelbourne.com.au',
  generateRobotsTxt: true,
  exclude: ['/blog/tag/*', '/terms'],
  // Ensure hash fragments don't make it in
  transform: async (config, path) => {
    if (path.includes('#')) return null;
    return {
      loc: path,
      changefreq: 'weekly',
      priority: path === '/' ? 1.0 : 0.7,
      lastmod: new Date().toISOString(),
    };
  },
};
```

### 2. Robots.txt

Verify `/robots.txt` includes:

```
User-agent: *
Allow: /
Disallow: /_next/
Disallow: /api/

Sitemap: https://www.sesmelbourne.com.au/sitemap.xml
```

### 3. Noindex Blog Tag Pages

Add `noindex` meta tag to `/blog/tag/[tag]` pages:

```html
<meta name="robots" content="noindex, follow" />
```

These pages have minimal content and are cannibalising the actual blog posts and service pages. We still want Google to follow links on them (to discover blog posts), but not index the tag pages themselves.

### 4. Remove Hash Anchor URLs from Index

If hash URLs are in the sitemap, remove them. If they're already indexed, they should naturally drop out once:

- Removed from sitemap
- Canonical tags point to `/` (from PRD-02)

If they persist, submit URL removal requests in Search Console.

### 5. Block \_next/image URLs

Add to robots.txt:

```
Disallow: /_next/image
```

Next.js image optimisation URLs should not be indexed.

## Acceptance Criteria

- [ ] Sitemap contains only valid, indexable pages (no hashes, no tags, no \_next)
- [ ] Robots.txt blocks `/_next/` and `/api/` paths
- [ ] Blog tag pages have `noindex, follow` meta tag
- [ ] All blog posts confirmed present in sitemap
- [ ] Sitemap resubmitted in Google Search Console after changes
