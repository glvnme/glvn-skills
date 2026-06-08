---
name: refactor
description: Refactor existing code while preserving behavior. Use when asked to clean up, simplify, reorganize, remove dead code, reduce duplication, improve maintainability, or make evidence-backed performance improvements in a file, diff, module, package, feature area, or project.
---

# Refactor

## Scope

Accept a file, module, package, feature area, diff, or project scope.

If no scope is provided, ask whether to inspect the whole project before changing code.

## Workflow

1. Confirm scope only when it is missing, ambiguous, or too broad to change safely.
2. Identify the surface area: touched files, direct callers, dependencies, public APIs, schemas, tests, configuration, and side effects.
3. Discover project commands from local conventions before inventing them: package scripts, Makefiles, task files, CI configs, docs, and existing test patterns.
4. Run available baseline checks for the scope: tests, typecheck, lint, build, or targeted verification. Note missing or already-failing tooling.
5. Identify behavior-preserving refactors:
   - Dead code: unused functions, branches, flags, adapters, stale comments, and obsolete docs.
   - Duplication: repeated logic, validation, mapping, queries, error handling, and fixture setup.
   - Complexity: deep nesting, mixed responsibilities, ambiguous names, unnecessary indirection, and over-abstraction.
   - Design drift: code that fights nearby patterns, ownership boundaries, or type boundaries.
   - Evidence-backed optimization: hot loops, repeated expensive work, N+1 queries, unnecessary I/O, and avoidable recomputation.
6. Prefer small, reviewable edits. Separate larger refactors from feature changes or bug fixes when possible.
7. Ask before changing behavior, removing intentional features, altering public APIs, changing schemas, or modifying external side effects.
8. Apply safe changes incrementally. Keep the system working after each meaningful step.
9. Validate touched areas by re-running baseline checks and targeted tests. Add focused characterization tests first when risky code lacks coverage.

## Guardrails

Do not change behavior for style preferences alone.

Do not remove intentional features without confirmation.

Do not introduce broad rewrites when focused refactors solve the problem.

Do not optimize without evidence from code structure, measurements, logs, query plans, or known expensive operations.

Keep type boundaries strict. Avoid loose typing unless narrowly justified.

Preserve public APIs, schemas, data migrations, and side effects unless the user approves a behavior change.

Prefer local consistency unless it worsens maintainability.

## Output

Report:

- Scope reviewed
- Files changed
- Refactors applied
- Behavior preserved or intentionally changed
- Validation commands and results
- Remaining risks or follow-up work
