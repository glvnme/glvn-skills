---
name: invariant-testing
description: Use when implementing or changing simulations, parsers, import/export logic, generators, state machines, geometry, editors, persistence, or domain models where certain rules must always hold across many inputs or steps. Especially useful for scientific, visual, textile, pattern, and numerical projects.
---

# Invariant Testing

## Core Rule

Test the rules that must always remain true, not only one expected example.

An invariant is a property that should hold after operations, across random inputs, across save/load cycles, or over many simulation steps.

## Find Invariants

Before editing domain logic, list candidate invariants:

- conservation: mass, count, area, energy, total threads, total cells
- bounds: no negative values, no NaN/Infinity, values stay within legal ranges
- determinism: same seed and input produce same output
- reversibility: import then export then import preserves normalized meaning
- idempotence: normalizing twice equals normalizing once
- structure: dimensions, topology, ordering, references, schema validity
- monotonicity: progress, timestamps, counters, or versions only move legally
- isolation: invalid input fails without partial writes or corrupt state
- rendering: empty/invalid states do not create blank canvases or overlaps

Prefer invariants that would catch real project failures.

## Test Strategy

Start with one concrete invariant test using a small fixture.

Then add breadth only where useful:

- table tests for known edge cases
- fixture tests for real saved files
- property-based tests for generated inputs when the stack supports it
- multi-step tests for simulations and state machines
- round-trip tests for parsers, importers, exporters, and persistence

Use deterministic seeds for generated/random tests and print the seed on failure.

## Red Green Discipline

For bug fixes, first prove the invariant is currently violated.

For new behavior, write the invariant test before changing implementation when possible.

If the invariant already passes, either choose a sharper invariant or explain that it is a characterization test protecting current behavior.

## Project Patterns

For simulation projects like `membranium-old`, favor:

- mass/count conservation within tolerance
- no NaN/Infinity after each step
- deterministic output for fixed seed/input
- stable boundary conditions
- legal value ranges over many ticks

For pattern/editor projects like `warp&weft`, favor:

- import/export round trips
- consistent row/thread dimensions
- no partial project creation after invalid input
- generated preview dimensions match pattern data
- normalized pattern equality despite formatting differences

## Tolerances

Use exact equality for symbolic data, schemas, IDs, and normalized text.

Use explicit tolerances for floating-point values. Name the tolerance and keep it close to the domain rule:

- `1e-9` for strict numeric conservation
- `1e-6` for accumulated simulation drift
- visual thresholds only when screenshot comparison is intentionally fuzzy

Do not hide real drift with a loose tolerance.

## Reporting

Report:

- invariant chosen
- public interface under test
- fixture or seed used
- RED result if using TDD
- GREEN result and command
- remaining invariants worth testing later
