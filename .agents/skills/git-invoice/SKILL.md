---
name: git-invoice
description: 'Scan git logs for a date range and produce a categorised invoice line-item list. Classifies commits as Maintenance (framework upgrades, bug fixes) or Feature work (new functionality, with size estimates). Use when the user says "generate invoice", "invoice from git", "what did I work on", or invokes /git-invoice.'
argument-hint: 'Date range and optional branch. Examples: "last month", "2026-04-01..2026-04-30", "since 2026-05-01 on branch main"'
user-invocable: true
---

# Skill: git-invoice

## Trigger

Use this skill when the user says:

- "generate invoice"
- "invoice from git"
- "what did I work on"
- "git invoice"
- "invoice items"
- invokes `/git-invoice`

## Purpose

Scan the git log for a given period, classify each commit into one of two billing categories, group related commits into coherent line items, and output a structured invoice-ready breakdown that a contractor can paste directly into an invoice.

## Output

Produces a markdown invoice items block with two sections:

1. **Maintenance** — framework upgrades, dependency bumps, bug fixes, CI/tooling changes, security patches
2. **Feature Work** — new functionality, UI changes, content additions, integrations

Each Feature Work item includes a **size** estimate (XS / S / M / L / XL) to support potential pricing.

## Workflow

### Step 1 — Determine the date range

If the user provided a range (e.g., "April 2026", "last month", "2026-04-01..2026-04-30"), parse it into absolute `--after` / `--before` dates.

If no range is given, default to the previous calendar month relative to today.

Confirm the resolved range with the user in one line before proceeding: e.g., "Scanning commits from 2026-04-01 to 2026-04-30…"

### Step 2 — Fetch the git log

Run:

```bash
git log --oneline --no-merges --after="YYYY-MM-DD" --before="YYYY-MM-DD" --format="%H %ad %s" --date=short
```

If there are merge commits that carry meaningful descriptions (e.g., PR titles), also run:

```bash
git log --merges --after="YYYY-MM-DD" --before="YYYY-MM-DD" --format="%H %ad %s" --date=short
```

If the repo has multiple remotes or the user specified a branch, include `--first-parent <branch>`.

### Step 3 — Classify commits

For each commit message, classify it:

**Maintenance** — any of:

- Dependency/framework upgrades (`bump`, `upgrade`, `update X to`, `chore`, `renovate`, `deps`)
- Bug fixes (`fix`, `bug`, `patch`, `hotfix`, `revert`)
- Tooling / CI / config (`ci:`, `build:`, `chore:`, `lint`, `format`, `refactor` with no user-facing change)
- Security patches

**Feature** — any of:

- New pages, components, routes, or UI (`feat`, `add`, `new`, `implement`, `create`)
- Content additions or updates (`content:`, `copy`, `page`, `post`, `blog`)
- Integrations or API connections
- Performance improvements visible to users
- SEO / metadata changes

Many repos do not use conventional commit prefixes consistently — treat them as a strong signal when present, but always fall back to reading the full commit message and any file paths touched (via `git show --stat <hash>`) to infer intent.

When a commit message is genuinely ambiguous after inspecting it, **do not guess** — collect all ambiguous commits and ask the user to classify them before producing output. Present them as a numbered list:

> "I couldn't confidently classify these commits — can you tell me which category each belongs to (Maintenance / Feature)?"
>
> 1. `abc1234` — "update header styles"
> 2. `def5678` — "tweak logic for pricing"

When unambiguous, lean toward **Feature** if the change affects the end-user experience, **Maintenance** otherwise.

### Step 4 — Group into line items

Cluster related commits into coherent line items rather than listing every commit individually. Use the following heuristics:

- Commits touching the same area (e.g., "location pages", "auth flow", "Next.js upgrade") → one item
- Sequential commits that build toward one outcome → one item
- Unrelated one-off commits → individual items

Each line item should read as a natural invoice description, not a raw commit message.

### Step 5 — Estimate feature sizes

For each Feature line item, assign a size based on the number and nature of commits involved:

| Size | Signal                                                   |
| ---- | -------------------------------------------------------- |
| XS   | 1 commit, cosmetic or copy tweak                         |
| S    | 1–2 commits, small isolated change                       |
| M    | 3–5 commits, single coherent feature                     |
| L    | 6–10 commits, multi-part feature or significant refactor |
| XL   | 10+ commits, major feature or subsystem                  |

### Step 6 — Output the invoice items

Format the result as follows:

```markdown
## Invoice Items — [Month YYYY]

### Maintenance

- [Description of maintenance work] _(e.g., Next.js upgrade to v15, Renovate dependency bumps)_
- [Bug fix description]

### Feature Work

| #   | Description           | Size |
| --- | --------------------- | ---- |
| 1   | [Feature description] | M    |
| 2   | [Feature description] | S    |
```

If there are no commits in a category, omit that section.

### Step 7 — Ask follow-up

After outputting, ask:

> "Would you like me to add pricing estimates, group these under a client/project, or export this as a plan file?"

On the SES repo, also prompt: "This covers maintenance + code only. The SEO retainer (Sanity edits, GSC/GA analysis, scorecard) isn't in git — run **/seo-invoice** to capture it from the monthly scorecard."

## Classification keywords (reference)

**Maintenance signals:** `chore`, `fix`, `bug`, `patch`, `hotfix`, `revert`, `bump`, `upgrade`, `renovate`, `deps`, `ci`, `build`, `lint`, `format`, `security`, `update X to vN`

**Feature signals:** `feat`, `add`, `new`, `implement`, `create`, `introduce`, `page`, `component`, `route`, `content`, `blog`, `post`, `seo`, `analytics`, `integrate`, `perf`, `improve UX`

## Notes

- Run `git log` via Bash — do not hallucinate commits
- If the repo has no commits in the range, say so clearly
- Conventional-commit prefixes (`feat:`, `fix:`, `chore:`, etc.) take priority when present, but many repos don't use them — use `git show --stat` to inspect changed files when the message alone is unclear
- If still uncertain after inspecting the commit, ask the user rather than guessing
- The output is intentionally human-readable and editable — it is a starting point, not a final invoice
- Sizes are estimates to support pricing conversations, not binding commitments
- **SEO/CMS blind spot:** work published straight to a CMS (e.g. Sanity `seoDescription`, internal links) and analysis work (reading GSC/GA, writing a scorecard) leave little or no commit trail, so this skill under-counts them. On the SES repo, pair with **`/seo-invoice`**, which derives the retainer line-items from the monthly scorecard rather than git. Run both for a complete month-end picture.
