# SEO & GEO Tracking

This folder holds the ongoing measurement loop for SES Melbourne's organic search and
generative-engine visibility. Its job is to answer one question each month: **did the needle move,
and what should we do next?**

## Why this exists

For months, SEO/GEO work shipped with no persistent way to tell whether it had impact. Raw report
exports were downloaded twice (March and April 2026) but never distilled into a trend, then were lost
in a docs reorg. This structure fixes that: **scorecards persist; raw data is disposable.**

## The monthly ritual

1. **Karl/owner exports CSVs** (~5 min) into a dated folder:

   ```
   reports/<YYYY-MM-DD>/
     search-console/   ← GSC: Queries.csv, Pages.csv (28-day range)
     ga/               ← GA4: Acquisition + Engagement/Events exports (28-day range)
   ```

2. **We write the scorecard** — read the CSVs, refresh tracked-keyword positions from real GSC data,
   and produce `scorecards/<YYYY-MM>.md` from the template. It diffs against the previous scorecard
   with ▲/▼, attributes movement to specific work, and sets next month's focus.

3. **Delete the raw CSVs** once the scorecard is written. The scorecard is the durable artifact.

## What we track

| Tier       | Metric                                        | Source          |
| ---------- | --------------------------------------------- | --------------- |
| North star | Form submits + phone-click events             | GA4             |
| Demand     | Total impressions & clicks (28-day)           | GSC             |
| Position   | Avg position for the tracked keyword set      | GSC Queries.csv |
| Content    | Clicks per blog post / landing page           | GSC Pages.csv   |
| GEO        | Citations/mentions in AI answers (spot-check) | Manual          |

Bing Webmaster Tools: quarterly glance only (<5% AU search share).

## Tracked keyword set

The position-tracking keyword set lives in `scorecards/tracked-keywords.md`. It is chosen from real
GSC data (queries we already rank near page 1 for) and reviewed each month — not guessed.

## How ranking actually improves (and why "more content" isn't the lever)

A recurring confusion: if the fix is "rankings, not content," why is the active plan
(`docs/planning/plans/011-on-page-ranking-uplift/`) almost entirely content work? Because there are
**three** different levers, and only one of them is wrong for this site:

1. **Content volume** — how many pages/posts exist. _Adding more does not help pages already stuck._
2. **Content quality on a page** — how well a specific page answers its target query.
3. **Ranking** — the position Google assigns. This is an **output**, not a lever you pull directly.

The June baseline showed the site already gets ~15,700 impressions/28d — Google considers existing
pages relevant enough to _show_. The problem is they sit at ~position 32, below the click threshold. A
new blog post starts from zero and does nothing for the 30+ pages already drowning. So **"write more
content" (lever 1) is the wrong reflex.** That is the only thing "ranking, not content" ever meant —
not that content is irrelevant.

**Ranking improves by improving the right content on pages that already rank.** Ranking is the output
of roughly four inputs, three of which we move with content edits to _existing_ pages:

| Input                  | What it is                                    | Our lever                                            |
| ---------------------- | --------------------------------------------- | ---------------------------------------------------- |
| **Relevance**          | Does the page's text match the query?         | ✅ Edit `seoTitle` / H1 / `intro` to target the term |
| **Internal authority** | Do other site pages link to it?               | ✅ Internal linking from homepage + related pages    |
| **Engagement / CTR**   | Do people click and stay?                     | ✅ Better titles/meta → more clicks → reinforcement  |
| **External authority** | Backlinks, Google Business Profile, citations | ⚠️ Off-site — the hard lever, not content            |

**Worked example.** `electrician altona north` sits at position ~13 — Google finds the page relevant
but not the best answer. Typical causes: a generic title ("…Your Local Electricians" vs a competitor's
"Altona North Electrician | Same-Day | Licensed | 5.0★"), an intro that describes the company instead
of densely covering _being an electrician in Altona North_, and few internal links signalling the page
matters. Fixing those — all edits to a page that **already exists** — raises relevance + authority and
can move it 13 → 7, onto page 1, where it earns clicks. No new page created.

**The caveat that sets priorities.** Content edits move pages that are _close_ (positions ~8–20). They
usually can't drag a page from position 56 to page 1 — there, **external authority** dominates
(backlinks, GBP, local citations), which content alone can't fix. That's exactly why the plan targets
**near-misses first** (where content is the deciding factor) and flags the high-demand/low-rank terms
in `tracked-keywords.md` as a separate "long game."

## Folders

- `scorecards/` — permanent. One `.md` per month + the tracked-keyword list + the template.
- `reports/` — transient. Raw CSV drop zone, cleared after each scorecard is written.
