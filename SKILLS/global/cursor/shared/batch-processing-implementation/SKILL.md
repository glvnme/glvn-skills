---
name: batch-processing-implementation
description: Implement, harden, or review Warp & Weft batch processing for images, projects, products, or companies. Use when adding manual selected-record batches, parent/item batch tables, dispatch/reconciliation, queue UI, recovery controls, or later cron/backfill conversion while preserving provenance and modality boundaries.
---

# Batch Processing Implementation

Use this skill for Warp & Weft batch-processing work across images, projects, products, and companies.

## Start Here

1. Read `AGENTS.md`.
2. Read `docs/batch-processing-trigger-packets/batch-processing-implementation-overview.md`.
3. Read exactly one modality packet unless the task explicitly crosses modalities:
   - `docs/batch-processing-trigger-packets/image-batch-processing-trigger.md`
   - `docs/batch-processing-trigger-packets/project-batch-processing-trigger.md`
   - `docs/batch-processing-trigger-packets/product-batch-processing-trigger.md`
   - `docs/batch-processing-trigger-packets/company-batch-processing-trigger.md`
4. Then inspect the linked source specs and runtime files from that packet.

## Core Rule

Build manual `operator_batch` first. Cron, scheduled backfill, and continuous processing must reuse the same selector, snapshot, batch creation, dispatcher, idempotency, skip, budget, recovery, and reconciliation core.

Do not add cron in the first pass unless the user explicitly asks for scheduled processing and the manual path is already implemented and verified.

## Implementation Boundaries

- Keep batch parent/items as orchestration records; existing run/source/claim/usage tables remain the detailed provenance.
- Prefer modality-specific batch tables at first unless the repo already has a clear shared abstraction.
- Reject empty or all-skipped batch creation.
- Record operator-visible skip reasons.
- Avoid duplicate active work; attach or skip existing active runs.
- Reconcile item state from linked modality runs instead of optimistic UI state.
- Preserve source URLs, run ids, actor ids, usage events, revisions, and final audit records.
- Do not inspect `datasets/tensile-fabric-structures/`.

## Modality Guardrails

- Images: keep analysis batching in the existing image-processing lane; keep continuous scanners disabled until accepted.
- Projects: do not confuse `Run base`, `Process images`, and `Enrich selected`; do not auto-ingest project enrichment image candidates.
- Products: keep enrichment review-only; no Firecrawl, reroute, ingestion jobs, canonical product writes, or first-class docs/variants/media/relationships.
- Companies: wrap existing single-company enrichment runs; do not bypass child passes, final audit, side-effect safeguards, or official-site workflow separation.

## Workflow

1. Audit current docs, schema, Convex functions, UI trigger surface, queue projection, and tests.
2. Write a short implementation checklist with file/function references before editing.
3. Add backend schema and dispatcher/reconciliation first.
4. Add UI only after backend behavior and tests are clear.
5. Add tests for empty selection, duplicate ids, missing/deleted records, active-run skip, success, failure/partial, cancellation, and forbidden side effects.
6. Run the narrowest useful verification, then typecheck/lint when schema or shared UI changes.

## Completion Check

Before final response, confirm:

- manual trigger exists or the requested audit explains why it does not
- batch parent/item state is durable and inspectable
- provenance remains in the existing modality records
- no hidden cron or automatic downstream chain was added
- verification commands and remaining risks are reported
