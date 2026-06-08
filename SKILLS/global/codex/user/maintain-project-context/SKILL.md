---
name: maintain-project-context
description: "Review AI-facing project context files and report how to keep durable Markdown lean and aligned with the current codebase. Use when the user asks to audit, review, assess, refresh, or find prompt debt in AGENTS.md, CLAUDE.md, GEMINI.md, Cursor/Windsurf/Copilot rules, prompt files, repo AI instructions, agent onboarding docs, skills, MCP/plugin/tool context, or stale context after project changes or model/tool upgrades. Review-only: do not modify project files."
---

# Maintain Project Context

## Purpose

Review durable AI instructions and report whether they are small, factual, repo-specific, and current with the project. Treat prompt/context files as technical debt: useful when they encode stable project knowledge, harmful when they accumulate stale behavior steering.

## Review-Only Boundary

Do not edit, create, delete, move, rename, disable, or reformat project files while using this skill. Produce an evidence-backed review with recommended changes instead. If the user asks to apply fixes after the review, treat that as a separate implementation task outside this skill.

## Quick Start

Run `python <skill-dir>/scripts/inventory_context.py <repo>` to find candidate context files, then audit only the surfaces that actually exist. Stop after the report.

## Candidate Files

Look for project-scoped AI context first:

- `AGENTS.md`, nested `AGENTS.md`
- `CLAUDE.md`, `GEMINI.md`
- `.cursor/rules/**`, `.cursorrules`, `.windsurf/rules/**`, `.windsurfrules`
- `.github/copilot-instructions.md`
- `prompts/**`, `.agents/skills/**`, `.codex/config.toml`
- MCP, plugin, skill, and tool-enable configs when they alter default agent context or tool choice

Do not edit global, personal, or project files while using this review-only skill.

## Examples

- "Refresh AGENTS.md after our repo rewrite" -> report stale phase claims, command drift, missing architecture facts, and the smallest recommended replacement shape.
- "Audit our prompt debt" -> inventory Markdown, skills, MCP/plugin/tool configs, and prompt templates; report what to delete, keep, or move.
- "Make this project easier for agents" -> identify durable context worth adding only if repeated steering would otherwise be needed.

## Workflow

1. Inventory context surfaces.
   - Prefer `scripts/inventory_context.py`; fall back to `rg --files` plus `git status --short` if the script is unavailable.
   - Read the candidate files before judging them.
   - Map each file to its scope: global, repo root, subtree, tool-specific, skill, prompt template, or config.
   - Check context-file age against major repo rewrites, model/tool upgrades, or changed workflows using `git log` when the repo has history.

2. Ground claims in the repo.
   - Inspect source layout, package scripts, Makefiles, CI, test config, docs, and recent conventions.
   - Treat the current codebase and verified commands as source of truth.
   - If the user asks for latest prompt guidance, model migration, or vendor-specific behavior, read `references/prompt-context-principles.md` and refresh official docs/web sources before reporting.

3. Decide what belongs in the recommendation.
   - Keep stable facts: build/test commands, verification steps, architecture map, source-routing guidance, repo conventions, review expectations, recurring mistakes, decision rationale that changes implementation choices, and hard project constraints.
   - Recommend removing or shortening generic agent behavior, motivational language, outdated prompt hacks, duplicate rules, stale model-specific tuning, stale project-phase/tool claims, long explanations, transient task status, intentional lies, and unverified claims.
   - Recommend moving broad workflow detail into a skill or linked reference when it is reusable but too large for the repo Markdown.

4. Review the lean Markdown surface.
   - Prefer the nearest-scoped file. Put subproject rules in nested files when supported instead of bloating the root file.
   - Use short headings and bullets. Link to existing docs rather than copying them.
   - Keep README/user docs separate from agent docs; link across audiences instead of duplicating.
   - Do not recommend creating a new AGENTS/Claude/rules file just because one is absent. Recommend durable context only after repeated steering would otherwise be needed.
   - Preserve user-authored facts unless they are contradicted by verified project evidence.
   - Avoid creating a new AI instruction surface when an existing one can represent the same durable context.
   - Recommend disabling unnecessary default-on MCPs, plugins, tools, and skills when they add context bloat or cause unwanted tool use.

5. Validate the report.
   - Run cheap command checks where practical, such as package-script listing, lint/test discovery, or docs link checks.
   - Re-read the audited Markdown to catch contradictions, stale commands, duplicated rules, and bloated sections.
   - Report files audited, verification run, and any guidance left untouched because it was unverified or out of scope.

## Report Contract

When finishing, include:

- Files audited. State explicitly that no project files were changed.
- Deletes, moves, additions, rewrites, or disables recommended but not performed.
- Verification evidence, or why verification was not practical.
- Remaining stale/uncertain claims that need user input.

## Lean Markdown Gate

Before finishing, every instruction recommended for retention should pass all checks:

- It is durable across normal project work.
- It is specific to this repo or this tool surface.
- It helps future agents avoid a real mistake or find the right files faster.
- It is either verified from the project or clearly linked to source material.
- It belongs in durable Markdown instead of tests, lint rules, scripts, config, README docs, or a skill.
