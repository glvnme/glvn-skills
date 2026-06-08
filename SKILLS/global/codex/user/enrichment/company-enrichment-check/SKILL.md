---
name: company-enrichment-check
description: Reviews completed, failed, or partial Warp & Weft company enrichment runs and turns their stored evidence into a concise human-in-the-loop revision report. Use when the user asks to review company enrichment results, latest enrichment for a company ID, failed company enrichment, company enrichment logs, found-but-unused data, data drift, or next-step feedback after a run.
---

# Company Enrichment Check

## Purpose

Use this skill once per review request to inspect a company enrichment run, produce a constructive operator report, and start a follow-up loop. This is not a code-quality review and not a fresh web research task.

Default to stored Convex data and run evidence. Use web search only when the user explicitly asks or approves it.

## Quick Start

1. Resolve the target from the user's phrasing:
   - `companyId` only: review the latest completed, failed, or partial company enrichment run.
   - `runId` supplied: review that exact run.
   - "latest enrichment" or "logs": find the latest related company enrichment run and related logs.
2. If the run is queued or running, report that it is not ready. Wait or recheck only if the user asked.
3. Gather all related available data, then write one concise report.
4. End by asking which revision thread to tackle next. Do not edit files, prompts, settings, or database rows during the first review unless the user explicitly asks after the report.

## Data To Gather

Collect all available related data for the company and selected/latest run:

- `companies` current canonical company row, including enrichment counters and latest status
- `companyEnrichmentRuns`, including pre-run snapshot, config snapshot, provider/model, status, audit payload, spend, errors
- `companyEnrichmentPasses`, including pass order, terminal states, retries, errors, counts
- `companyEnrichmentSources`, selected and unselected when available
- `companyEnrichmentClaims`, grouped by pass, kind, field, review status, confidence, verification status
- `companyFieldSuggestions`, `companySourceFacts`, `companyReviewRevisions`
- contact, social, legal, intelligence, entity mention, resource, and media rows tied to the run/pass/company
- project/product side-effect claims, created/attached target records, backlinks, and source facts
- event logs, API usage events, and available run logs tied to company/run/pass IDs
- light historical context from previous runs for repeated failures, regressions, or drift; do not do a full multi-run comparison unless requested

Use the repo's best available Convex query path. Useful anchors:

- `apps/web/convex/companyEnrichment.ts`
- `apps/web/convex/schema.ts`
- `apps/web/convex/lib/companyEnrichment/`
- `packages/shared/src/automation/company-enrichment-config.ts`
- `docs/specs/workflows/company-enrichment-workflow.md`

## Review Method

Judge the run as an enrichment-quality and human-revision artifact:

- Compare the pre-run snapshot, current company row, auto-applied revisions, suggestions, claims, and source facts.
- Separate company truth alignment from Warp & Weft domain fit.
- Identify strong evidence that was found but not used well.
- Treat failed and partial runs as reviewable: inspect what exists first, then diagnose the failure.
- Distinguish run evidence from fresh reviewer assumptions.
- Prefer source-backed facts, snippets, source URLs, and stored confidence over model prose.

Underused data includes strong claims that never became suggestions/facts/side effects, rich selected sources with weak extraction, better unselected sources, high-confidence project/product candidates held without clear reason, surfaced conflicts that are not actionable, and repeated confirming evidence that did not improve review priority.

## Report Template

Keep the report concise, with expandable detail only where useful.

1. `Reviewed Context`: company ID/name, run ID, status, provider/model, passes, what data was inspected.
2. `Executive Read`: one-paragraph verdict on whether the run produced useful review material.
3. `Company Truth Alignment`: identity, domain, legal/brand, geography, contact/legal/social, capabilities.
4. `Warp & Weft Fit`: tensile/fabric/ETFE relevance, market role, project/product graph value.
5. `Data Drift And Canonical Changes`: pre-run versus current, auto-fills, revisions, conflicts with current truth.
6. `Found But Underused`: useful sources, claims, candidates, facts, gaps, or conflicts not converted into action.
7. `Failures, Gaps, And Conflicts`: failed passes, missing evidence, blocked downstream passes, ambiguous claims.
8. `Human Revision Queue`: triage into `Do Now`, `Review Next`, and `Defer`.
9. `Process Feedback For Next Runs`: prompt/pass/settings/source-selection feedback, clearly separated from manual data cleanup.
10. `Follow-Up Menu`: ask which issue to tackle next individually, in bulk, or all at once.

If a section has no significant issues, say so briefly rather than omitting it.

## Guardrails

- Do not review implementation reliability, code architecture, or test coverage unless the user asks.
- Do not call missing localhost-only secrets a problem.
- Do not browse the web by default.
- Do not rerun enrichment, mutate canonical data, change prompts/settings, or patch files during the first report.
- Do not present every claim as equal. Prioritize high-impact, source-backed, operator-actionable findings.
- Do not treat project/product side effects as failures merely because they were non-blocking; evaluate whether their review state is useful.
