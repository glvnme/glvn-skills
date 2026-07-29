---
name: shitcode
description: Takes AI-generated code that is complete shit and rebuilds it into smaller, clearer, maintainable code without changing behavior. Use when the user says shitcode, shit code, AI slop, garbage, spaghetti, overengineered, bloated, or asks for aggressive behavior-preserving cleanup or LOC reduction.
---

# Shitcode

This code is shit. Fix it. Do not polish the turd or replace it with clever,
compressed shit. Make it smaller and clearer while proving behavior survived.

## Contract

- Preserve APIs, payloads, data, ordering, side effects, errors, retries,
  idempotency, and relevant performance unless the user authorizes change.
- Reduce LOC by deleting bullshit, not by code golf. Clarity beats line count.
- Keep scope tight: no drive-by upgrades, schema changes, or API redesigns.
- No bullshit green checks: never skip tests, weaken assertions, widen types,
  swallow errors, or add ignores to fake success.
- Never promise "no bugs." Report only what fresh evidence establishes.

## 1. Understand the shit

Read repo instructions and inspect the worktree. Trace affected entrypoints,
pipelines, boundaries, and side effects. Write the behavior contract, risks,
unknowns, and authoritative verification commands.

Gate: every affected behavior is understood or explicitly marked unknown.

## 2. Nail behavior down

Run the baseline and record existing failures. Add characterization tests for
uncovered behavior, including failures, boundaries, ordering, and side effects.
Use real seams when mocks would hide the contract.

Gate: every risky behavior has coverage or a concrete manual check.

## 3. Delete the bullshit

Delete dead code, duplication, fake wrappers, speculative abstraction,
needless state, redundant comments, repeated branches, and useless indirection.
Prefer direct data flow, clear names, deep modules, and obvious error handling.
Work in small slices; run focused checks after each one.

Gate: every edit has a concrete simplification reason and no unexplained drift.

## 4. Try to break it

Review the full diff as a hostile reviewer. Search changed call sites. Exercise
pipeline ordering, retries, partial failures, cleanup, and side effects. Run
fresh tests, typechecks, linters, builds, and integration checks that apply.

Gate: checks pass or failures are proven pre-existing; every contract item is
accounted for.

## Report

Report: **what was shit**, **what changed**, **behavior proof**, **LOC delta**,
**verification**, and **residual risk**. If evidence is missing, say
**not verified**, not complete.
