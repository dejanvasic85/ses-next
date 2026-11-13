# SEO change log

A record of every SEO change that goes live, newest first. Most SEO work is a Sanity edit, which
leaves no git commit, so this file is the only lasting record of it.

- `/seo-invoice` reads this file to find the month's billable CMS work.
- `/seo-scorecard` reads it to match ranking movement to the date a change went live.

Add an entry when a change is published, not when it is planned. Keep prices and invoice amounts out
of this file, because the repo is public.

## Entry format

```markdown
### YYYY-MM-DD: short name of the change

- **Why:** the data that prompted it
- **Changes:** what changed, page by page
- **Published:** date it went live
- **Baseline:** the numbers to compare against later
- **Issue:** #number
```

## 2026-11

### 2026-11-13: Google Business Profile categories added

- **Why:** the 9 November search check found SES 13th in the map pack for `electrician altona north`
  and missing for `electrician seddon`. The map pack is driven by the Business Profile, not the
  website. The profile listed no category for solar or EV chargers, though SES does both.
- **Changes:** added two additional categories in the Business Profile: "Solar energy system service"
  and "Electric vehicle charging station contractor". The profile now has 8 of 10 categories. No
  suitable commercial category exists, so "Electrician" covers it. Also added Sunshine, Moonee Ponds
  and Ascot Vale to the service area, and swapped Port Melbourne for Altona Meadows. All 20 slots
  are now filled, and every suburb with a location page on the site is listed. Filled the services
  for the two new categories (solar, EV charger installation) and added "Smoke alarm installation",
  since `smoke alarm installation melbourne` fell 15 places in October. Karl confirmed the existing
  services (including duct cleaning and security systems) are all work SES does.
- **Published:** 2026-11-13 (Google may take a few days to review)
- **Baseline:** Business Profile, Jun to Oct 2026: about 13 calls and 33 website clicks in October.
  Full table in #776. Map pack: 13th for `electrician altona north`, not shown for
  `electrician seddon`.
- **Issue:** #776

### 2026-11-09: Sitemap now tells Google when pages change (code change)

- **Why:** Google was still showing Karl's old phone number in the snippets for the Seddon and Altona
  North pages, eight weeks after it was removed on 16 September. The live pages are clean, so Google
  had not re-crawled them. The sitemap gave no `lastmod` dates, so Google could not tell which pages
  had changed.
- **Changes:** service, location and blog post entries in `sitemap.xml` now carry `lastmod` from
  Sanity's `_updatedAt`. Blog posts fall back to their publish date. Dejan also requested re-indexing
  in GSC for the key pages on 9 November.
- **Published:** when the sitemap PR merges. The merge commit date in `git log` is the publish date.
- **Baseline:** the old number showed in Google's snippets for `electrician seddon` and
  `electrician altona north` on 9 November. Check those snippets again before the 20 November
  scorecard.
- **Billing note:** a code change, so `/git-invoice` bills it.

### 2026-11-09: Commercial electrician page repositioned to the western suburbs

- **Why:** GSC (11 Oct to 7 Nov, filtered to the page) showed it at position 55 for Melbourne-wide
  searches, including suburbs SES does not serve (Hawthorn, Kew, St Kilda). Its biggest query,
  `commercial electrician melbourne`, sat at 46. The page's best result was a western suburb term,
  `commercial office electrician moonee ponds`, at 16.1.
- **Changes:**
  - `/services/commercial-electrician`: new SEO title, SEO description and schema description, all
    aimed at Melbourne's western suburbs. Rewrote the opening heading and first sentence the same way.
    Linked the 10 service-area suburbs to their location pages. Added a paragraph naming the local
    commercial areas (Brooklyn industrial area, Pier Street, Nicholson Street, Ballarat Street,
    Hampshire Road, Union Road and Epsom Road).
  - Location pages for Altona, Altona North, Ascot Vale, Footscray, Moonee Ponds, Sunshine and
    Yarraville: linked their existing commercial sentence to `/services/commercial-electrician`.
  - Ascot Vale and Moonee Ponds: added Commercial Electrician to their related services.
- **Published:** 2026-11-09, checked live on the site the same day
- **Baseline:** page position 55.0, 2,280 impressions, 0 clicks (28 days to 7 Nov). Expect the first
  signal in the December scorecard, since on-page changes take 4 to 6 weeks to show.
- **Issue:** #744

### 2026-11-09: In-text links fixed site-wide (code change)

- **Why:** while checking the change above on the live site, every link inside page text rendered as
  `<a>` with no `href`. Google cannot follow a link with no address, so none of these internal links
  passed any value. The cause was the portable text schema in `packages/ses-next/src/types.ts`, which
  dropped the `href` field. It has been broken since about October 2025 (#311).
- **Changes:** the schema now keeps `href`. This brings back the in-text links on 15 published pages:
  7 location pages, 4 service pages, the services hub and 3 blog posts. An e2e test now fails if a
  service page renders a link with no `href`.
- **Published:** when PR #775 merges, which deploys it to production. The merge commit date in
  `git log` is the publish date.
- **Baseline:** from late October 2025 until this fix, no in-text link rendered an `href`, whenever
  it was added. Internal-linking work from that period was live in Sanity but passed no value. This
  includes the 7 location page links added on 9 November. Links were not affected before late
  October 2025.
- **Billing note:** this is a code change, so `/git-invoice` bills it, not `/seo-invoice`.
