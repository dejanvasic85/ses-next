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

| Tier          | Metric                                       | Source            |
| ------------- | -------------------------------------------- | ----------------- |
| North star    | Form submits + phone-click events            | GA4               |
| Demand        | Total impressions & clicks (28-day)          | GSC               |
| Position      | Avg position for the tracked keyword set     | GSC Queries.csv   |
| Content       | Clicks per blog post / landing page          | GSC Pages.csv     |
| GEO           | Citations/mentions in AI answers (spot-check) | Manual            |

Bing Webmaster Tools: quarterly glance only (<5% AU search share).

## Tracked keyword set

The position-tracking keyword set lives in `scorecards/tracked-keywords.md`. It is chosen from real
GSC data (queries we already rank near page 1 for) and reviewed each month — not guessed.

## Folders

- `scorecards/` — permanent. One `.md` per month + the tracked-keyword list + the template.
- `reports/` — transient. Raw CSV drop zone, cleared after each scorecard is written.
