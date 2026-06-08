---
name: ai-dev-hardening
description: Audits and hardens AI-assisted code changes through evidence-based todo lists, conservative repairs, error-management review, and deterministic verification. Use when the user asks to harden a workflow, make AI-generated code ship-ready, fix lint/typecheck/test failures, improve reliability/error handling, run a safety pass, or audit and repair implementation quality.
---

# AI Dev Hardening

Use this skill to turn an AI-assisted implementation into something inspectable, reliable, and ready for the project's normal quality gates.

## Operating Contract

- Read project instructions first: `AGENTS.md`, local agent notes, and only the specific docs needed for the task.
- Check worktree status before editing. Preserve user changes and avoid unrelated cleanup.
- Discover the actual project stack from local files instead of assuming tools: package scripts, TypeScript config, lint/format config, test runner config, framework/runtime folders, and existing local skills.
- Do not inspect explicitly excluded datasets or generated corpora unless the user asks.
- Use external research only when the user specifically asks for current, industry, official, or named-source guidance.
- Be conservative by default. Prefer existing project patterns, helpers, scripts, rules, and tests before adding abstractions or packages.

## Default Flow

1. **Audit the evidence**
   - Run or inspect the failing command when the user reports a failure.
   - Read the smallest relevant set of files needed to understand the issue.
   - Classify findings by layer: types, lint/format, runtime validation, backend/API, UI states, tests, docs, observability, and developer workflow.
   - Separate preexisting user changes from agent changes where possible.

2. **Write the implementation brief before edits**
   - List concrete todos with file/function references.
   - Note the intended edit order and why.
   - Include verification commands that match the scope.
   - Call out risk boundaries: migrations, auth/security behavior, data deletion, public API changes, broad refactors, or unclear ownership.

3. **Repair by default**
   - After the todo list is clear, implement unless the user asked for audit-only.
   - Pause for confirmation only for risky architecture choices, destructive operations, migrations, security boundary changes, or ambiguous product behavior.
   - Keep patches small and inspectable.

4. **Run the AI safety loop**
   - Look for fake success paths, swallowed errors, broad `catch` blocks, placeholder behavior, unchecked nullable/index access, weak validation boundaries, missing provenance, and untested assumptions.
   - Prefer explicit expected-error paths over vague exception handling.
   - Treat unexpected exceptions as bugs that should surface with enough context for diagnosis.

5. **Verify with the tiered policy**
   - Narrow change: run lint/typecheck for the touched package plus targeted tests.
   - Multi-package or shared-contract change: run root lint/typecheck and relevant package tests.
   - Runtime/build-sensitive change: add build or framework-specific checks.
   - Format-only/doc-only change: run the smallest meaningful check, or state why no command adds value.

## Error-Management Review

When the hardening target includes error handling, evaluate it from first principles:

- What promise did the code make, and how can it break?
- Is the failure expected user/input behavior, expected operational behavior, or an unexpected bug?
- Where should it be detected: type layer, schema validation, backend boundary, UI boundary, job runner, or external integration wrapper?
- What should happen next: retry, recover, show operator action, mark durable failure, or crash loudly?
- What evidence is preserved: source input, run id, entity id, request id, cause, retry count, and operator-visible summary?

Prefer structured validation, typed expected errors, durable failure records for jobs, and secure logs that avoid leaking secrets or sensitive raw data.

## Final Output

For repair mode, close with:

- What changed: files/modules touched and why.
- Verification: exact commands run and pass/fail status.
- Remaining risk: skipped checks, weak assumptions, or known gaps.
- Next hardening options: only concrete follow-ups that build on the work.

For audit-only mode, close with:

- Findings ordered by severity.
- Implementation todo list with file references.
- Recommended verification plan.
