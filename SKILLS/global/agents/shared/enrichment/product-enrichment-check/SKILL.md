---
name: product-enrichment-check
description: Reviews completed, failed, or partial Warp & Weft product enrichment runs and turns stored sources, claims, suggestions, routing hints, and unused findings into a concise human-in-the-loop revision report. Use when the user asks to review product enrichment results, latest enrichment for a product ID, failed product enrichment, product enrichment logs, field suggestions, routing recommendations, technical facts, candidates, found-but-unused data, or next-step feedback after a product run.
---

# Product Enrichment Check

## Purpose

Use this skill once per review request to inspect a product enrichment run, produce a constructive operator report, and start a follow-up loop. This is not a code-quality review, not a reliability audit, not a product ingestion review, and not a fresh web research task.

Default to stored Convex data and run evidence. Use web search only when the user explicitly asks or approves it.

## Quick Start

1. Resolve the target from the user's phrasing:
   - `productId` only: review the latest completed, failed, or partial product enrichment run.
   - `runId` supplied: review that exact run.
   - "latest enrichment", "logs", "suggestions", or "routing recommendation": find the latest related product enrichment run and related logs.
2. If the run is queued or running, report that it is not ready. Wait or recheck only if the user asked.
3. Gather all related available data, then write one concise report.
4. End by asking which revision thread to tackle next. Do not edit files, prompts, settings, product fields, suggestions, reroute state, or database rows during the first review unless the user explicitly asks after the report.

## Data To Gather

Collect all available related data for the product and selected/latest run:

- `products` current canonical row, latest enrichment counters/status, source/domain fields, product class/page shape/specificity, evidence counts
- `productReviewStates`, unresolved warnings, recommended type, review disposition, last reviewed layer
- `productEnrichmentRuns`, including pre-run snapshot, query bundle, config/provider/model, status, fallback state, counts, spend, memo, errors
- `productEnrichmentSources`, selected and unselected when available, source roles, reliability tiers, coverage flags, fetch status, rationale
- `productEnrichmentClaims`, grouped by kind, field, source, confidence, verification status, review status, and priority
- `productFieldSuggestions`, `productReviewRevisions`, pending/accepted/dismissed suggestion states
- existing product documents, videos, variants, relationships, source facts, media/image links, and product-company links
- document, variant, relationship, media, resource, measurement, technical fact, routing recommendation, and gap claims
- event logs, workflow queue state, API usage events, and available run logs tied to product/run IDs
- light historical context from previous enrichment and ingestion/extraction runs for repeated failures, stale suggestions, routing drift, or lost useful evidence; do not do a full multi-run comparison unless requested

Use the repo's best available Convex query path. Useful anchors:

- `apps/web/convex/productEnrichment.ts`
- `apps/web/convex/schema.ts`
- `packages/shared/src/automation/product-enrichment-config.ts`
- `docs/specs/workflows/product-enrichment-workflow.md`
- `docs/specs/workflows/page-to-product-review-and-reroute.md`
- `docs/specs/workflows/product-types/README.md`

## Review Method

Judge the run as an enrichment-quality and human-revision artifact:

- Compare the pre-run snapshot, current product row, review state, suggestions, claims, source backlinks, and existing product evidence.
- Separate product truth alignment from Warp & Weft domain fit.
- Remember product enrichment v1 is review-only: no canonical product fields, docs, variants, media, relationships, reroute jobs, or ingestion jobs should be created by enrichment itself.
- Identify strong evidence that was found but not used well as suggestions, candidates, routing recommendations, or human-review notes.
- Treat failed and partial runs as reviewable: inspect what exists first, then diagnose the failure.
- Distinguish run evidence from fresh reviewer assumptions.
- Prefer source-backed facts, snippets, source URLs, normalized measurement values, product type hints, and stored confidence over model prose.

Underused data includes strong field claims that did not become actionable `productFieldSuggestions`, rich selected sources with weak extraction, better unselected sources, high-confidence document/variant/media/relationship candidates not surfaced clearly, routing recommendations that should trigger human reroute review, technical facts or measurements left hard to act on, and conflicts/gaps that were recorded but not made actionable.

## Product-Specific Checks

- Did the run confirm or challenge identity, manufacturer, brand/line, model/SKU, source URL, specificity, page shape, summary, description, materials, applications, dimensions, performance, and certifications?
- Did it create useful non-destructive field suggestions without overwriting canonical fields?
- Did it keep documents, variants, media, relationships, terms, and source-to-entity links as candidates only?
- Did routing recommendations remain claims only while still making `needs_reclassification` risks easy to review?
- Did fallback direct fetch improve weak source text, or only add noisy candidates?
- Does the evidence suggest normal product ingestion/reroute should be run separately?

## Report Template

Keep the report concise, with expandable detail only where useful.

1. `Reviewed Context`: product ID/name, run ID, status, provider/model, fallback state, review state, what data was inspected.
2. `Executive Read`: one-paragraph verdict on whether the run produced useful review material.
3. `Product Truth Alignment`: identity, manufacturer, source, specificity, page shape, specs, certifications, suggestions.
4. `Warp & Weft Fit`: fabric/hardware/equipment/generic relevance, tensile-domain usefulness, technical richness, company/project graph value.
5. `Review-Only Boundary`: confirm no unexpected canonical/reroute/ingestion/document/variant/media/relationship side effects; flag only if evidence says otherwise.
6. `Data Drift And Suggestions`: pre-run versus current, new suggestions, accepted/dismissed states, conflicts with current truth, stale review state.
7. `Found But Underused`: useful sources, claims, specs, measurements, documents, variants, media/resources, relationships, routing hints, gaps, or conflicts not converted into action.
8. `Failures, Gaps, And Conflicts`: provider/fetch/extraction/usage failures, missing evidence, ambiguous product identity, partial-run blockers.
9. `Human Revision Queue`: triage into `Do Now`, `Review Next`, and `Defer`.
10. `Process Feedback For Next Runs`: prompt/settings/source-selection/fallback feedback, clearly separated from manual product cleanup.
11. `Follow-Up Menu`: ask which issue to tackle next individually, in bulk, or all at once.

If a section has no significant issues, say so briefly rather than omitting it.

## Guardrails

- Do not review implementation reliability, code architecture, or test coverage unless the user asks.
- Do not call missing localhost-only secrets a problem.
- Do not browse the web by default.
- Do not rerun enrichment, mutate canonical data, apply/dismiss suggestions, reroute products, enqueue ingestion, change prompts/settings, or patch files during the first report.
- Do not treat candidate-only documents, variants, media, relationships, resources, or routing recommendations as failures; evaluate whether their review state is useful.
- Do not recommend automatic promotion as if it exists in v1. Frame promotion, ingestion, reroute, and canonical edits as separate explicit operator actions.
