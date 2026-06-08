---
name: systematic-debugging
description: Use when encountering bugs, failing tests, crashes, build failures, flaky behavior, performance regressions, unexpected outputs, or repeated failed fixes. Requires reproducing, tracing, hypothesizing, testing, and fixing the root cause instead of guessing.
---

# Systematic Debugging

## Core Rule

Find the root cause before fixing. Do not stack speculative patches.

Use this loop:

1. Reproduce the problem reliably.
2. Read the full error, logs, stack trace, or bad output.
3. Identify what changed recently.
4. Trace the failing value, state, request, render, or command backward to its origin.
5. Compare with nearby working examples or reference behavior.
6. Form one specific hypothesis.
7. Test the hypothesis with the smallest diagnostic or change.
8. Write a failing regression test or minimal reproduction.
9. Fix the root cause with one focused change.
10. Verify the original symptom and relevant tests.

## Phase Checks

Before proposing a fix, be able to state:

- exact reproduction steps or command
- observed failure and source line/output
- suspected root cause and evidence
- why nearby working code behaves differently
- smallest test or probe that confirms the hypothesis

If any item is missing, keep investigating.

## Multi-Layer Bugs

For workflows crossing boundaries such as UI to API to database, parser to model to renderer, or CI to build to packaging, add diagnostics at each boundary:

- input entering the layer
- output leaving the layer
- config/environment used by the layer
- state before and after mutation

Run once, read the evidence, then investigate the first broken boundary.

## Failed Fix Limit

After two failed fixes, stop patching and re-run root cause analysis.

After three failed fixes, question the architecture or mental model before editing again. Repeated failure usually means the bug is not where you think it is.

## Good Debugging Output

Report compactly:

- Repro: command or steps
- Evidence: key error/output/log line
- Cause: root cause with reasoning
- Fix: focused change
- Verification: fresh command/output proving the symptom is gone

## Supporting References

Read these local references only when needed:

- `root-cause-tracing.md` for tracing bad values backward
- `defense-in-depth.md` after finding a root cause that needs layered validation
- `condition-based-waiting.md` for flakes, sleeps, timing, and async waits

## Anti-Patterns

Avoid:

- changing code before reproducing
- fixing symptoms at the crash site without tracing origin
- bundling multiple guesses into one patch
- relying on "probably"
- skipping regression tests for bugs
- treating a passing diagnostic as a complete verification
