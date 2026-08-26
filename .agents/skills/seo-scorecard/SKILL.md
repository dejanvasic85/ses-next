---
name: seo-scorecard
description: 'Write the monthly SEO/GEO scorecard from fresh Google Search Console + GA4 exports, diffing against the prior month and cross-checking claims against live CMS content rather than trusting plan checkboxes. Use when the user says "seo scorecard", "seo report", "how did seo do this month", "write the scorecard", or invokes /seo-scorecard.'
argument-hint: 'Optional: the report month if not the current one, e.g. "August 2026"'
user-invocable: true
---

# Skill: seo-scorecard

## Trigger

Use this skill when the user says:

- "seo scorecard"
- "seo report"
- "how did seo do this month" / "how's search doing"
- "write the scorecard"
- invokes `/seo-scorecard`

## Purpose

This scorecard — "your search visibility went X→Y, here's why, here's next" — is the real deliverable
of an ongoing SEO/GEO retainer, not "I wrote a blog post." It makes the engagement legible to the
client month over month. It exists because raw GSC/GA exports are easy to capture and easy to lose —
without a persisted trend line, nobody can tell whether the work is moving the needle.

The scorecard is a **trend document, not a snapshot**: every number is written as a diff against the
prior month, every ranking or traffic movement is attributed to specific work (or explicitly marked
unattributed), and every month ends with a focus list for the next one.

## Prerequisites — locate the project's SEO docs

This skill is written against a `docs/seo-geo/` convention, but confirm it in the current repo before
assuming paths:

- `docs/seo-geo/scorecards/_template.md` — the scorecard template
- `docs/seo-geo/scorecards/<YYYY-MM>.md` — one file per month, the persisted trend line
- `docs/seo-geo/scorecards/tracked-keywords.md` — the locked set of ~8–10 keywords tracked
  month-over-month (mix of near-miss "winnable" terms and high-demand "long game" terms)
- `docs/seo-geo/reports/<YYYY-MM-DD>/` — scratch folder for the current month's raw CSV exports
  (disposable — deleted after the scorecard is written)

If these don't exist yet, look for an equivalent convention before creating one from scratch, and ask
the user if genuinely unclear.

## Workflow

### Step 1 — Determine the report window

Default to a 28-day window ending today. Confirm the resolved range in one line, e.g. "Writing the
August 2026 scorecard, 28-day window ending 2026-08-24."

Read the most recent prior scorecard in `scorecards/` to diff against, and read `_template.md` for
section structure.

### Step 2 — Get the raw exports

Ask whether the user has export access themselves or needs to loop in someone else (e.g. a client
contact) to pull the CSVs. Don't assume — this varies per engagement and may already be answered by
project memory.

Needed, both 28-day range matching the report window:

**Google Search Console:**

- `Queries.csv` — per-query clicks, impressions, CTR, position
- `Pages.csv` — per-URL clicks, impressions, CTR, position

**GA4:**

- **Acquisition** report (Reports → Acquisition → Traffic acquisition, or "User acquisition by
  channel") — session/user counts by channel, to see the organic-vs-direct-vs-referral mix
- **Events** report (Reports → Engagement → Events) — counts for whatever the site's lead-tracking
  events are (e.g. `generate_lead`, `first_time_phone_call`, `repeat_phone_call`, `form_start`) — this
  is the north-star metric, more important than raw traffic

Tell the user exactly where to drop the files (the dated `reports/<YYYY-MM-DD>/` folder). Exact
subfolder structure or filenames don't matter — find and read whatever lands there rather than
insisting on a rigid layout.

### Step 3 — Compute the headline numbers

From `Queries.csv`, compute (don't eyeball — use a script):

- Total clicks, total impressions, blended CTR = clicks/impressions
- Impression-weighted average position = Σ(impressions × position) / Σ(impressions)

From the GA4 events export, total up the lead-tracking events into a north-star "total lead actions"
figure.

Diff every one of these against the prior month's scorecard with ▲/▼/≈.

**Watch for the denominator trap:** a worsening blended average position is often just a long tail of
low-value queries gaining impressions, not the tracked/priority pages losing ground. Check the tracked
keyword set specifically before concluding the average tells the real story — call this out explicitly
when it applies, the way a prior month might have.

### Step 4 — Look up tracked keywords and top pages

Pull each keyword in `tracked-keywords.md` from `Queries.csv` and diff its position against last
month. Pull the top URLs from `Pages.csv` and note which pages/posts are earning clicks.

Flag any keyword or page where **position held or improved but clicks didn't follow** — that pattern
(good position, no clicks) points to a snippet/CTR/rendering problem, not a ranking problem, and
changes what next month's fix should be.

### Step 5 — Attribute movement to real work, verified against live state — not checkboxes

This is the step most likely to get lazy and produce a wrong scorecard. Two disciplines, both
non-negotiable:

**a. Verify against the live CMS/site, not a plan file's checkboxes.** A task plan marking something
`[x]` done is not proof it shipped correctly. Before writing "we did X and it worked," check the actual
live content (CMS query, or fetch the live page and inspect it) for the field or change in question.
Checkboxes have been wrong before — e.g. a plan marked a page's SEO description as done, but the live
document still had an empty field falling back to stale content, and the keyword regressed.

**b. Match commit/change dates against the report window, not just "what happened this month."**
On-page content changes typically take 4–6 weeks to surface in rankings. A ranking movement inside
this month's window is usually caused by work that shipped _before_ the window opened, not work that
shipped during it. Check `git log` (or the CMS's edit history) dates explicitly:

```bash
git log --oneline --since="<window-start>" --until="<window-end>"
```

- If the commits in-window are pure infrastructure (deps, refactors, tooling) with no content changes,
  say plainly that no new SEO work shipped in-window, so next month's report will have nothing new to
  attribute — an empty pipeline is a real finding, not a non-finding.
- If the commits in-window include something structurally large (a redesign, a nav rebuild, a
  migration) rather than targeted SEO content, treat that as the leading hypothesis for any anomaly
  this month (a CTR collapse, a lead-event drop) — flag it as a hypothesis to verify next month, not
  as a proven cause. Don't quietly attribute a metric swing to "SEO" when engineering work is the more
  likely cause.
- SEO content changes are frequently CMS edits with **no git diff at all** — an empty git diff does not
  mean no SEO work happened. Check the CMS directly.

### Step 6 — Write the scorecard

Copy `_template.md`'s structure (or the most recent month's file, since the template may lag the
structure that's evolved in practice) into `scorecards/<YYYY-MM>.md`:

```yaml
---
month: 'YYYY-MM'
report-date: 'YYYY-MM-DD'
range: '28-day (<start> → <end>)'
prior: 'YYYY-MM'
---
```

Sections, in order:

1. **Headline** — one tight paragraph naming the single most important story this month, not a list
   of metrics. If there's an open question (a suspected-but-unconfirmed cause), say so explicitly and
   name what would confirm or rule it out.
2. **Attribution note** (blockquote) — which work is responsible for what's shown, and its actual
   ship date vs the report window.
3. **North star — leads (GA4)** — table, this-month vs prior vs Δ, one Note column per row.
4. **Demand — Google Search Console** — impressions/clicks/CTR/position, same diff format.
5. **Tracked keyword positions** — full table from Step 4, plus 1-2 paragraphs of narrative pulling
   out the pattern (near-misses graduating, a cluster regressing, position/click divergence, etc.)
6. **Content performance — top pages** — table from Pages.csv, narrative on which pages are/aren't
   converting impressions into clicks.
7. **GEO — AI visibility (spot-check)** — GA4 "AI Assistant" channel sessions if present, and/or a
   manual check of whether ChatGPT/Perplexity/AI Overviews cite the site for its core service+location
   queries.
8. **What moved & why** — bullet list, each bullet a causal claim tied to verified evidence from Step 5.
9. **Focus for next month** — numbered priority list. If Step 5 turned up an unresolved question
   (e.g. "did the redesign break something"), that diagnosis goes to priority #1, ahead of new
   optimisation work — don't let new content work bury an open regression.

Keep the tone even when the news is bad. A bad month reported clearly is more valuable than a good
month reported vaguely — the client is paying for legibility, not cheerleading.

### Step 7 — Format and clean up

Run the project's formatter on the new file if one exists (e.g. `pnpm format`). Then **delete the raw
CSV export folder** for this month — the scorecard is the persisted artifact; the CSVs are disposable
scratch inputs and should not accumulate in the repo.

### Step 8 — Persist anything strategy-shifting

If this month's scorecard produced a finding that should change how future months are approached (a
new baseline, a reversal, an open question that needs resolving next time), say so to the user and
offer to persist it to memory — don't let a structural insight live only inside one month's markdown
file where it'll get missed next time.

## Notes

- Compute every aggregate number (totals, weighted averages) with a script or explicit arithmetic —
  do not eyeball sums from a long CSV.
- The tracked keyword set should be revisited periodically: promote anything that's newly ranking well
  and holds, retire anything structurally dead, add a fresh near-miss candidate from the latest export.
- If GA4 event names differ from the reference list above, use whatever the project's actual
  conversion events are — the GSC/GA4 metric _shapes_ here are the pattern to follow, not the literal
  event names.
- This skill produces one persisted file per month. Resist the urge to also keep the raw exports
  "just in case" — the whole point of the discipline is that the scorecard is the trend line, not the
  underlying data dumps.
