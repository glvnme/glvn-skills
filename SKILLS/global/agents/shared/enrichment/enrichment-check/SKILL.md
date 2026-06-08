---
name: enrichment-check
description: Routes generic Warp & Weft enrichment review requests to the right modality-specific check, or applies a generic stored-evidence review loop for unsupported enrichment modalities. Use when the user asks to review enrichment results, latest enrichment, failed enrichment, enrichment logs, data drift, found-but-unused evidence, or next-step feedback without clearly naming company, project, product, or another modality.
---

# Enrichment Check

## Purpose

Use this master skill when the user asks for an enrichment review but the modality is broad, missing, mixed, or future-facing. It should resolve the entity/run context, delegate to a modality-specific check when possible, or produce a generic human-in-the-loop enrichment revision report.

This is not a code-quality review, not a reliability audit, and not a fresh web research task. Default to stored Convex data and run evidence. Use web search only when the user explicitly asks or approves it.

## Routing

First identify the modality from the user's words, IDs, run tables, or entity tables:

- Company: use `company-enrichment-check`.
- Project: use `project-enrichment-check`.
- Product: use `product-enrichment-check`.
- Mixed request: review each requested modality separately, then summarize cross-lane patterns.
- Unknown or future modality: use the generic workflow below.

Do not ask the user for modality if it can be inferred from an ID prefix, table name, route, run ID, entity row, or latest-run field. If multiple plausible entities match, ask one concise clarifying question.

## Generic Quick Start

1. Resolve the target:
   - entity ID only: find its entity type and latest completed, failed, or partial enrichment run.
   - run ID supplied: review that exact run and infer entity type from the run row.
   - "latest enrichment" or "logs": find the latest related enrichment run and related logs.
2. If the run is queued or running, report that it is not ready. Wait or recheck only if the user asked.
3. Gather all related stored data, then write one concise report.
4. End by asking which revision thread to tackle next. Do not edit files, prompts, settings, canonical fields, suggestions, review state, or database rows during the first review unless the user explicitly asks after the report.

## Generic Data To Gather

Collect the equivalent of:

- current canonical entity row and review state
- selected/latest enrichment run, pre-run snapshot, config/provider/model, status, counters, spend, memo, errors
- child passes when the modality has pass rows
- selected and unselected enrichment sources
- enrichment claims, suggestions, source facts, revisions, candidates, and accepted/dismissed review states
- related entity backlinks, media/resources/documents, technical facts, measurements, and side-effect/candidate rows
- event logs, workflow queue state, API usage events, and available run logs tied to entity/run/pass IDs
- light historical context from previous runs for repeated failures, regressions, drift, or lost useful evidence; do not do a full multi-run comparison unless requested

Useful repo anchors:

- `apps/web/convex/schema.ts`
- `docs/specs/workflows/enrichment-qa-session-example.md`
- modality-specific workflow specs under `docs/specs/workflows/`
- modality-specific enrichment files under `apps/web/convex/*Enrichment.ts`
- modality-specific config files under `packages/shared/src/automation/*-enrichment-config.ts`

## Generic Review Method

Judge the run as an enrichment-quality and human-revision artifact:

- Compare pre-run snapshot, current canonical state, suggestions, claims, facts, revisions, sources, and side effects/candidates.
- Separate entity truth alignment from Warp & Weft domain fit.
- Identify strong evidence that was found but not used well.
- Treat failed and partial runs as reviewable: inspect what exists first, then diagnose the failure.
- Distinguish stored run evidence from fresh reviewer assumptions.
- Prefer source-backed facts, snippets, source URLs, normalized values, and stored confidence over model prose.

Underused data includes rich selected sources with weak extraction, better unselected sources, strong claims that never became suggestions/facts/candidates, high-confidence candidates that stayed hard to act on, conflicts that were recorded but not surfaced clearly, repeated confirmations that did not improve review priority, and gaps where useful evidence failed to become a next action.

## Generic Report Template

Keep the report concise, with expandable detail only where useful.

1. `Reviewed Context`: modality, entity ID/name, run ID, status, provider/model, what data was inspected.
2. `Executive Read`: one-paragraph verdict on whether the run produced useful review material.
3. `Truth Alignment`: identity, primary source/domain, core fields, review state, and conflicts.
4. `Warp & Weft Fit`: relevance to tensile/fabric/ETFE structures, technical usefulness, graph value.
5. `Data Drift And Changes`: pre-run versus current, suggestions, revisions, side effects, accepted/dismissed states.
6. `Found But Underused`: useful sources, claims, measurements, mentions, media/resources, candidates, gaps, or conflicts not converted into action.
7. `Failures, Gaps, And Conflicts`: provider/fetch/extraction/pass failures, missing evidence, ambiguous identity, blockers.
8. `Human Revision Queue`: triage into `Do Now`, `Review Next`, and `Defer`.
9. `Process Feedback For Next Runs`: prompt/settings/source-selection/fallback feedback, clearly separated from manual data cleanup.
10. `Follow-Up Menu`: ask which issue to tackle next individually, in bulk, or all at once.

If a section has no significant issues, say so briefly rather than omitting it.

## Guardrails

- Prefer modality-specific skills whenever the modality is known.
- Do not browse the web by default.
- Do not review implementation reliability, code architecture, or test coverage unless the user asks.
- Do not call missing localhost-only secrets a problem.
- Do not rerun enrichment, mutate canonical data, apply/dismiss suggestions, promote sources, reroute entities, enqueue ingestion, change prompts/settings, or patch files during the first report.
- Do not present every claim as equal. Prioritize high-impact, source-backed, operator-actionable findings.
