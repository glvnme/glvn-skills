---
name: fake-news
description: Treats the preceding answer or supplied artifact as potentially fabricated, nonexistent, nonfunctional, stale, unsupported, or misaligned with the original request; audits every material claim against authoritative evidence and replaces the answer with a verified result. Use when the user explicitly says fake news, calls an answer fake, made up, hallucinated, imaginary, nonexistent, broken, or not what they asked for, or requests a hostile reality check of a previous response.
---

# Fake News

That answer is fake news. Treat every confident claim as a hostile witness until
reality corroborates it. Do not merely apologize, nitpick wording, or decorate the
same answer with caveats. Reconstruct the requested result from evidence.

## Contract

- Recover the user's original intent independently of the suspect answer.
- Audit material claims, named entities, citations, files, APIs, capabilities,
  actions, outputs, and completion statements.
- Distinguish **false**, **unsupported**, **nonexistent**, **nonfunctional**,
  **stale**, **intent drift**, and **not verified**. Do not call uncertainty false.
- Prefer local state and primary sources. Browse when facts may have changed or
  the claim depends on an external source.
- Reproduce functional claims with proportionate checks. A plausible explanation
  is not proof that code, a command, a link, or a workflow works.
- Preserve the authorization boundary of the original request. An audit does not
  authorize deployments, messages, purchases, deletions, or unrelated edits.
- Never invent evidence to disprove an invention. State exactly what was checked.

## 1. Recover the real request

Read the original user request, constraints, supplied artifacts, and relevant
follow-ups without relying on the suspect answer's framing. Write a short internal
contract covering the intended outcome, scope, and success criteria.

Gate: the request can be stated without borrowing unverified assumptions from the
answer being audited.

## 2. Put the answer on trial

Extract every material claim whose failure would change the usefulness or truth of
the answer. Include implicit claims such as "this exists," "I changed it," "this
API supports that," "this is complete," and "this command works."

Check each claim against the strongest available evidence:

- Inspect actual files, diffs, logs, tool results, and application state.
- Open cited sources and verify that they support the specific claim.
- Confirm names, versions, signatures, paths, URLs, dates, and capabilities.
- Run focused tests or minimal reproductions for functional claims.
- Check the proposed result against every original requirement.

Do not spend effort proving harmless filler. Prioritize claims that affect the
result, safety, cost, or user decisions.

Gate: every material claim has evidence or an explicit **not verified** verdict.

## 3. Issue the verdict

Classify defects precisely:

- **False**: evidence contradicts the claim.
- **Unsupported**: asserted without adequate evidence.
- **Nonexistent**: the named thing or claimed state cannot be found where it
  should exist.
- **Nonfunctional**: it exists but fails a relevant execution or behavior check.
- **Stale**: it was once plausible but no longer matches current authoritative
  state.
- **Intent drift**: it may be true or functional but does not satisfy the request.
- **Not verified**: available evidence cannot settle it.

Explain the decisive evidence concisely. Do not manufacture certainty from an
absence of evidence.

## 4. Replace the fake

Produce the answer the user should have received, rebuilt from the recovered
contract and verified evidence. If the original request authorized implementation,
repair the work and verify it. If it requested only an answer or review, provide
the corrected answer without expanding into mutations.

Re-check the replacement from scratch. Do not retain a claim merely because it
survived from the previous answer.

Gate: the replacement satisfies the original intent and every remaining
uncertainty is visible.

## Report

Lead with the corrected result. Then report, as useful:

- **what was fake**
- **what merely lacked proof**
- **what the user originally meant**
- **what replaced it**
- **verification performed**
- **residual uncertainty**

Use blunt language for defects and exact language for evidence. Never claim the
answer is now real, fixed, or complete unless fresh checks establish that.
