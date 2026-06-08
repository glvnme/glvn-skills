---
name: proceed
description: Continue the current coding, debugging, review, or implementation thread when invoked alone, then produce a clear closure report. Use when the user invokes this skill by itself or asks to proceed, state what issue was fixed, list next steps, summarize what remains, or report blockers and verification.
---

# Proceed

Use this skill to continue the current thread without needing extra prompt text, then turn the result into an action-oriented status update.

## Default Behavior

When invoked alone, infer the current issue or task from the latest thread context. If there is an obvious next implementation or verification step, do that step first. If continuing would be risky or requires a missing decision, stop and report the blocker instead of guessing.

## Report Shape

Keep the response short and concrete:

- **Fixed issue:** Name the issue, root cause if known, and the exact change made. If nothing was fixed yet, say that plainly and describe what was learned.
- **Verification:** List the checks run, observed result, and any check that could not be run. Do not imply success without evidence.
- **Next steps:** State the immediate actions that should happen next, ordered by priority.
- **Left:** State remaining work, risks, skipped validation, follow-up tickets, or decisions still needed.

## Quality Rules

- Prefer file paths, commands, issue IDs, and test names over vague summaries.
- Separate completed work from planned work.
- Do not hide partial progress. Use "left" for unfinished items instead of blending them into "next steps."
- Keep next steps actionable: start each item with a verb and include the target file, command, or owner when known.
- If the user needs to make a decision, ask one concise question after the report.
