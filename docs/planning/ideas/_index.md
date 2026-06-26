---
updated: '2026-06-27'
---

# Ideas Pipeline

## Summary

| Status      | Count  |
| ----------- | ------ |
| Captured    | 11     |
| In Progress | 1      |
| Completed   | 2      |
| Won't Do    | 1      |
| Deferred    | 0      |
| **Total**   | **15** |

## Ideas

| File                                                                                                                                         | Title                                                                       | Status      | Domain         | Captured   | Plan                                                                   |
| -------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------- | ----------- | -------------- | ---------- | ---------------------------------------------------------------------- |
| [2026-06-on-page-ranking-uplift-near-miss-pages.md](./2026-06-on-page-ranking-uplift-near-miss-pages.md)                                     | On-page ranking uplift for near-miss western-suburb pages                   | in-progress | seo            | 2026-06-27 | [011](../plans/011-on-page-ranking-uplift/plan.md)                     |
| [2026-06-rescue-electrical-testing-guide-high-impressions.md](./2026-06-rescue-electrical-testing-guide-high-impressions.md)                 | Rescue the electrical-testing guide (3,540 impressions, page 1.4)           | captured    | seo            | 2026-06-27 | —                                                                      |
| [2026-06-ctr-and-snippet-audit-for-ranking-pages.md](./2026-06-ctr-and-snippet-audit-for-ranking-pages.md)                                   | CTR / snippet audit for already-ranking pages                               | captured    | seo            | 2026-06-27 | —                                                                      |
| [2026-05-hardcoded-business-content-to-sanity.md](./2026-05-hardcoded-business-content-to-sanity.md)                                         | Move hardcoded business content into Sanity SiteSettings                    | completed   | engineering    | 2026-05-06 | [09](../plans/09-hardcoded-business-content/plan.md)                   |
| [2026-04-enhance-ci-pipeline-format-and-lint-checks.md](./2026-04-enhance-ci-pipeline-format-and-lint-checks.md)                             | Enhance CI pipeline checks for formatting and linting                       | completed   | infrastructure | 2026-04-14 | [010](../plans/010-enhance-ci-pipeline-format-and-lint-checks/plan.md) |
| [2026-04-improve-ga-conversion-tracking-contact-and-menu-phone.md](./2026-04-improve-ga-conversion-tracking-contact-and-menu-phone.md)       | Improve GA conversion tracking for contact form and menu phone clicks       | wont-do     | seo            | 2026-04-14 | — (superseded by June 2026 data — events already fire)                 |
| [2026-04-implement-dark-theme.md](./2026-04-implement-dark-theme.md)                                                                         | Implement a dark theme across the website                                   | captured    | design         | 2026-04-14 | —                                                                      |
| [2026-04-improve-theme-system-usage-tailwind-daisyui.md](./2026-04-improve-theme-system-usage-tailwind-daisyui.md)                           | Improve website theming by properly using Tailwind and DaisyUI theme system | captured    | design         | 2026-04-14 | —                                                                      |
| [2026-04-migrate-icons-to-better-icons-for-consistency.md](./2026-04-migrate-icons-to-better-icons-for-consistency.md)                       | Migrate icon system to Better Icons for consistency                         | captured    | design         | 2026-04-14 | —                                                                      |
| [2026-04-redesign-services-hub-layout.md](./2026-04-redesign-services-hub-layout.md)                                                         | Redesign services hub layout to be narrower and visually distinct           | captured    | design         | 2026-04-14 | —                                                                      |
| [2026-04-remove-typescript-casts-and-unsafe-patterns.md](./2026-04-remove-typescript-casts-and-unsafe-patterns.md)                           | Remove TypeScript casts and unsafe patterns across the codebase             | captured    | engineering    | 2026-04-14 | —                                                                      |
| [2026-04-reusable-page-layout-system.md](./2026-04-reusable-page-layout-system.md)                                                           | Create reusable page layouts for consistent implementation                  | captured    | engineering    | 2026-04-14 | —                                                                      |
| [2026-05-finish-site-settings-cleanup-and-remove-homepage-overlap.md](./2026-05-finish-site-settings-cleanup-and-remove-homepage-overlap.md) | Finish siteSettings cleanup and remove homepage overlap                     | captured    | engineering    | 2026-05-06 | —                                                                      |
| [2026-05-configure-sanity-type-generation.md](./2026-05-configure-sanity-type-generation.md)                                                 | Configure Sanity type generation                                            | captured    | engineering    | 2026-05-06 | —                                                                      |
| [2026-05-split-content-service-into-domain-sanity-services.md](./2026-05-split-content-service-into-domain-sanity-services.md)               | Split contentService into domain-specific Sanity services                   | captured    | engineering    | 2026-05-06 | —                                                                      |
| [2026-05-migrate-sanity-content-layer-to-new-patterns.md](./2026-05-migrate-sanity-content-layer-to-new-patterns.md)                         | Migrate Sanity content layer to new patterns                                | captured    | engineering    | 2026-05-06 | —                                                                      |
| [2026-05-api-endpoint-for-on-demand-cache-revalidation.md](./2026-05-api-endpoint-for-on-demand-cache-revalidation.md)                       | Add API endpoint for on-demand Next.js cache revalidation                   | captured    | engineering    | 2026-05-06 | —                                                                      |

## Pipeline Flow

Ideas → Execution Plans

Captured ideas become execution plans via `/plan-from-idea` when ready to start work.

## Notes

- **2026-06-27** — Three SEO ideas captured from the first monthly scorecard
  (`docs/seo-geo/scorecards/2026-06.md`). The data reframed the priority from "write more content" to
  "raise rankings on existing pages." The GA conversion-tracking idea was marked **won't-do**: the
  June export shows `generate_lead`, `first_time_phone_call`, and `repeat_phone_call` already firing,
  so its premise no longer holds.
- Engineering/design ideas remain a **parallel track** (codebase maintenance the team values), distinct
  from the SEO retainer — kept, not prioritised for the monthly SEO hours.
