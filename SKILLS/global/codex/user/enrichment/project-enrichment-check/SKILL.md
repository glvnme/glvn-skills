---
name: project-enrichment-check
description: Reviews completed, failed, or partial Warp & Weft project enrichment runs and turns stored sources, claims, drift, and unused findings into a concise human-in-the-loop revision report. Use when the user asks to review project enrichment results, latest enrichment for a project ID, failed project enrichment, project enrichment logs, source promotion, technical facts, found-but-unused data, or next-step feedback after a project run.
---

# Project Enrichment Check

## Purpose

Use this skill once per review request to inspect a project enrichment run, produce a constructive operator report, and start a follow-up loop. This is not a code-quality review, not a reliability audit, and not a fresh web research task.

Default to stored Convex data and run evidence. Use web search only when the user explicitly asks or approves it.

## Quick Start

1. Resolve the target from the user's phrasing:
   - `projectId` only: review the latest completed, failed, or partial project enrichment run.
   - `runId` supplied: review that exact run.
   - "latest enrichment", "logs", or "source promotion": find the latest related project enrichment run and related logs.
2. If the run is queued or running, report that it is not ready. Wait or recheck only if the user asked.
3. Gather all related available data, then write one concise report.
4. End by asking which revision thread to tackle next. Do not edit files, prompts, settings, or database rows during the first review unless the user explicitly asks after the report.

## Data To Gather

Collect all available related data for the project and selected/latest run:

- `projects` current canonical row, latest enrichment counters, preferred review source fields, source/domain fields
- `projectEnrichmentRuns`, including pre-run snapshot, query bundle, config/provider/model, status, fallback state, counts, spend, memo, errors
- `projectEnrichmentSources`, selected and unselected when available, source roles, reliability tiers, coverage flags, promotion recommendations
- `projectEnrichmentClaims`, grouped by kind, field, source, confidence, verification status, review status, and priority
- `projectFieldSuggestions`, `projectReviewRevisions`, accepted/dismissed claim states
- linked project images, `project_images`, related source rows, and existing project company backlinks
- media/resource candidates, technical facts, measurements, entity mentions, gaps, conflicts, and description suggestions
- event logs, workflow queue state, API usage events, and available run logs tied to project/run IDs
- light historical context from previous runs for repeated failures, regressions, source-promotion drift, or lost useful claims; do not do a full multi-run comparison unless requested

Use the repo's best available Convex query path. Useful anchors:

- `apps/web/convex/projectEnrichment.ts`
- `apps/web/convex/schema.ts`
- `packages/shared/src/automation/project-enrichment-config.ts`
- `docs/specs/workflows/project-enrichment-workflow.md`
- `docs/specs/workflows/enrichment-qa-session-example.md`

## Review Method

Judge the run as an enrichment-quality and human-revision artifact:

- Compare the pre-run snapshot, current project row, auto-applied revisions, suggestions, claims, preferred review source, and source backlinks.
- Separate project truth alignment from Warp & Weft domain fit.
- Identify strong evidence that was found but not used well.
- Treat failed and partial runs as reviewable: inspect what exists first, then diagnose the failure.
- Distinguish run evidence from fresh reviewer assumptions.
- Prefer source-backed facts, snippets, source URLs, normalized measurement values, and stored confidence over model prose.

Underused data includes strong claims that never became suggestions or review actions, rich selected sources with weak extraction, better unselected sources, source-promotion candidates not surfaced clearly, high-confidence technical facts or measurements left hard to act on, entity mentions that should be reviewed for future linking, media/resource candidates with useful evidence, and conflicts that were recorded but not made actionable.

## Project-Specific Checks

- Did the run confirm or challenge title, location, year/date, area, dimensions, type, structure, material, description, and participant hints?
- Did source promotion identify a better main review source, technical source, or supporting source?
- Were measurements normalized to metric values where possible and still traceable to raw text?
- Did media/resource candidates stay candidates only, without triggering image ingestion?
- Did related companies, products, people, institutions, publications, and award bodies stay as project mentions rather than fake canonical links?
- Did fallback direct fetch improve weak source text, or only add noise?

## Report Template

Keep the report concise, with expandable detail only where useful.

1. `Reviewed Context`: project ID/name, run ID, status, provider/model, fallback state, what data was inspected.
2. `Executive Read`: one-paragraph verdict on whether the run produced useful review material.
3. `Project Truth Alignment`: identity, location, date, typology, material/system, description, participants, preferred source.
4. `Warp & Weft Fit`: tensile/fabric/ETFE relevance, technical richness, image/media usefulness, company/product graph value.
5. `Data Drift And Canonical Changes`: pre-run versus current, auto-fills, revisions, source promotion, conflicts with current truth.
6. `Found But Underused`: useful sources, claims, measurements, mentions, media/resources, gaps, or conflicts not converted into action.
7. `Failures, Gaps, And Conflicts`: provider/fetch/extraction failures, missing evidence, ambiguous claims, partial-run blockers.
8. `Human Revision Queue`: triage into `Do Now`, `Review Next`, and `Defer`.
9. `Process Feedback For Next Runs`: prompt/settings/source-selection/fallback feedback, clearly separated from manual data cleanup.
10. `Follow-Up Menu`: ask which issue to tackle next individually, in bulk, or all at once.

If a section has no significant issues, say so briefly rather than omitting it.

## Guardrails

- Do not review implementation reliability, code architecture, or test coverage unless the user asks.
- Do not call missing localhost-only secrets a problem.
- Do not browse the web by default.
- Do not rerun enrichment, mutate canonical data, promote a source, review claims, change prompts/settings, or patch files during the first report.
- Do not present every claim as equal. Prioritize high-impact, source-backed, operator-actionable findings.
- Do not treat candidate-only media, resources, or entity mentions as failures; evaluate whether their review state is useful.
