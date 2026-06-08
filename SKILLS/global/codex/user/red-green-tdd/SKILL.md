---
name: red-green-tdd
description: Use red/green/refactor test-driven development for coding tasks. Trigger when the user asks for TDD, red-green TDD, test-first development, fail-first tests, regression fixes, feature work with tests, bug fixes needing proof, parser/importer/calculation/simulation logic, or changes where behavior must be verified before implementation.
---

# Red Green TDD

## Core Rule

Drive each change with one observable behavior at a time:

1. RED: write or update exactly one focused test for the next behavior.
2. Run the smallest relevant test command and confirm it fails for the expected reason.
3. GREEN: implement the smallest production change that can pass that test.
4. Run the test again and confirm it passes.
5. REFACTOR: clean code only while tests are green, then rerun tests.

Do not write implementation before a failing test unless no executable test harness exists. If no harness exists, first create the smallest harness or explain the blocker.

## Test Quality

Prefer behavior tests through public interfaces: commands, API endpoints, UI flows, exported functions, file import/export, persisted state, or documented domain APIs.

Avoid tests that know private implementation details, internal call order, private helpers, exact class shapes, or mocked internals unless the boundary is genuinely external or expensive.

Name tests like specifications: "rejects patterns with inconsistent thread counts" is better than "validateRows returns false".

Every new test must be sensitive: it should fail before the implementation and pass after. A test that is green before the change is not proof.

## Vertical Slices

Work vertically, not horizontally.

Bad: write five tests, then implement five behaviors.

Good: test one behavior, make it pass, repeat.

Use the first test as a tracer bullet through the real path. Let later tests respond to what the codebase teaches you.

## Choosing Tests

Start with the highest-risk behavior: bug reproduction, critical business rule, parser edge case, calculation invariant, permission boundary, persistence rule, or user-visible workflow.

Include edge cases when they protect real behavior, not to chase coverage. Prefer one clear positive case and one clear negative case over broad shallow assertions.

For existing bugs, first write a regression test that fails on the current code. The failure message should make the bug obvious.

For refactors, lock current behavior with tests first, then refactor under green.

## Agent Workflow

Before editing, identify:

- the public interface under test
- the exact behavior to prove
- the test command to run
- the expected RED failure

During work, report the loop compactly:

- RED: test added/changed, command, expected failure observed
- GREEN: implementation changed, command, passing result
- REFACTOR: cleanup performed, command, still passing

If RED fails for the wrong reason, fix the test or setup before implementation.

If GREEN requires a large design change, pause implementation, state the discovery, and split the next behavior smaller.

## Stop Conditions

Do not claim TDD success unless the failing-test step was observed.

Do not skip tests because the change is "obvious"; obvious changes still regress.

Do not keep speculative code that no failing test required.

Do not refactor while tests are red.

When blocked by slow, flaky, missing, or impossible tests, say exactly why and run the closest reliable verification available.
