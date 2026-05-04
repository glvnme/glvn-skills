---
name: revision-pass
description: Perform a post-implementation quality gate after a large plan, phased workflow, or substantial coding pass by finding fake shortcuts, missing behavior, brittle assumptions, weak tests, and unsafe success paths, then patching the real code. Use when the user asks for a revision pass, ship-ready pass, hardening pass, fake-code removal, gap patching, or futureproofing before considering work complete.
---

# Revision Pass

Run a post-implementation quality gate that turns completed-looking work into ship-ready work.

## Principles

- Compare the implementation against the original promise before judging quality.
- Stabilize correctness before improving structure.
- Make hidden failure visible through errors, tests, logs, states, or user-facing feedback.
- Prefer deleting or simplifying fake structure over wrapping it.

## Operating Mode

- Patch by default. Proceed without asking unless the change requires a product decision, broad rewrite, migration, destructive action, live credential, or external system assumption.
- Start from changed files, recent diff, original plan, and affected call paths. Expand outward only when the contract or failure mode requires it.
- Present 2-3 options only for ambiguous Blocking or High fixes. For clear Blocking, High, or Medium fixes, patch directly.
- Keep the final reply concise: gap found, option chosen, patch made, verification run, and residual risk.

## Severity

Rank every gap before patching:

- Blocking: fake success, data loss, broken promised behavior, unsafe mutation, missing persistence, missing provenance, or unverified critical path.
- High: brittle edge case, weak error handling, weak validation, or missing test around important behavior.
- Medium: maintainability risk, unclear ownership, duplicated logic, shallow abstraction, or future-change trap.
- Low: naming, polish, minor cleanup, or speculative improvement.

Patch Blocking first, then High, then Medium when local and bounded. Do not patch Low by default; report Low as follow-up tasks in the final overview.

## What Counts as Fake Code

Treat code as fake when it presents itself as real implementation but only satisfies the immediate checklist, demo, test, or happy path while bypassing the actual responsibility.

- Hardcoded, fixture-shaped, mocked, or placeholder behavior in production paths.
- Fake persistence, fake integration, or logic that passes a checklist while bypassing the real domain responsibility.
- Overfitted logic that passes one fixture while ignoring general cases.
- Silent success after skipped work, swallowed errors, or broad defaults that make failed work look valid.
- UI actions that imply mutation, provenance, durability, or review state without actually enforcing it.
- Tests that assert internals while missing the user-visible contract or promised failure path.
- Abstractions that hide coupling instead of reducing it.
- Docs, comments, tests, or labels claiming support the code does not provide.

## Workflow

1. Reconstruct the promise: original plan, checklist, issue, PRD, spec, user request, or phase notes.
2. Compare the implementation against that promise. Treat a checklist item as incomplete until real behavior, failure mode, persistence, and verification are visible in code.
3. Inspect the diff, changed files, related tests, docs, TODOs, mocks, fallbacks, and affected call paths.
4. Identify the real contract: caller expectation, persisted state, user-visible behavior, failure mode, and test oracle.
5. Rank gaps by severity. Patch Blocking, then High, then bounded Medium.
6. Patch the production path first, then patch fake tests that only prove the shortcut, mirror internals, mock away risk, or omit the promised failure path.
7. Avoid new abstractions unless they directly remove a ranked Blocking, High, or Medium gap.
8. Run the smallest useful verification. Expand only when the blast radius justifies it.

## Verification

- Do not treat existing green tests as proof.
- Prefer characterization tests before refactoring unclear behavior.
- Prefer contract tests for fake integrations, persistence, parsing, permissions, and workflow state.
- For each Blocking or High patch, identify the concrete scenario that failed or would have failed before the patch. Add or update a test for that scenario when practical.
- After editing, inspect the resulting diff or changed files before treating the patch as complete.
- Do not add tests that merely lock in incidental structure.

## Final Overview Shape
Use exactly these five bullets; do not add long narrative unless blocked:
- Promised: what the plan/checklist/spec said should work.
- Found: the fake shortcut, missing behavior, or brittle assumption.
- Patched: the real behavior added or explicit boundary enforced.
- Verified: test or command run.
- Follow-up: Low-severity cleanup only.

## Acceptance Criteria

The pass is complete when all Blocking and High gaps are patched or explicitly blocked, bounded Medium gaps are handled, verification has run or been explained, and Low gaps are listed only as follow-up.
Pause and ask when multiple product behaviors are plausible, the fix needs migration or destructive changes, verification needs unavailable live services or credentials, or the only honest fix is a broad architectural rewrite.
