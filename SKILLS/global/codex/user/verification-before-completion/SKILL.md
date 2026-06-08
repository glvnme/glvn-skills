---
name: verification-before-completion
description: Use before claiming work is complete, fixed, passing, ready, verified, committed, pushed, or PR-ready. Requires fresh evidence from commands, diffs, screenshots, rendered artifacts, or explicit checklist review before making success claims.
---

# Verification Before Completion

## Core Rule

Evidence before claims. Never say work is done, fixed, passing, clean, ready, or verified unless fresh evidence in the current turn proves it.

Before any completion claim:

1. Identify what would prove the claim.
2. Run or inspect the proof source.
3. Read the actual output, diff, screenshot, artifact, or checklist.
4. Compare evidence against the requirement.
5. State the result with the evidence, including failures or gaps.

## Proof Sources

Use the strongest available evidence:

- tests for behavior and regressions
- build/typecheck/lint commands for code health
- browser screenshots or interaction checks for UI work
- rendered PDFs/images/slides/docs for generated artifacts
- `git diff` or file reads for claimed edits
- requirement checklist for multi-part work
- reproduction steps for bug fixes

Partial proof only supports a partial claim. A passing linter does not prove a build. A changed file does not prove a bug is fixed.

## Red Flags

Stop and verify before using or implying:

- done, fixed, complete, ready, works, passes, clean
- should, probably, seems, likely, looks good
- "the agent reported success"
- "the change is obvious"
- "I already ran something earlier"
- "only a small change"

## Reporting

Use concise evidence-backed language:

- "Verified with `npm test`: 42 passed, 0 failed."
- "Build not verified: `npm run build` fails with TS2345 in `src/foo.ts`."
- "UI checked in browser at 375px and 1440px; no overlap observed."
- "I changed the parser, but did not verify import fixtures because no test command exists."

## If Verification Fails

Do not soften the result. State the actual status, then continue fixing if the task requires it.

If no reliable verification exists, say so directly and use the closest honest check. For risky behavior, create a focused test or reproduction before claiming success.

## Relationship To TDD

For regression tests, evidence requires the red/green cycle: the test fails before the fix and passes after the fix. A test that only passes once is not proof that it protects the intended behavior.
