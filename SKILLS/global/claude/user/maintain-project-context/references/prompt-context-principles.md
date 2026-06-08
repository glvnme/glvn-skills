# Prompt Context Principles

Use this reference when reviewing AI-facing project guidance, especially after model/tool upgrades or when the user asks for current prompting standards. Refresh official sources before making time-sensitive claims.

## Practical Standard

1. Treat durable prompts as context engineering, not prose polish. The goal is the smallest high-signal context that changes future agent behavior for the better.
2. Keep project Markdown factual and scoped: commands, conventions, review expectations, architecture routing, and repeated corrections.
3. Avoid behavior steering that is generic, motivational, model-specific, or copied from old prompt folklore.
4. Evaluate prompt changes with repo evidence, tests, linters, examples, or task outcomes. Do not rely on subjective feel.
5. Re-audit context files after major repo structure changes, model upgrades, agent-tool changes, or repeated agent mistakes.
6. Prefer maintained product defaults and small project deltas over bespoke agent harnesses.
7. Put large reusable workflows in skills or scripts; put enforceable rules in tests, linters, hooks, or CI.
8. Treat enabled tools, MCP servers, plugins, skills, and dynamic prompt branches as part of the prompt surface because they consume context and shape behavior.
9. Start from a stock/minimal setup and add context only to solve repeated concrete problems. Keep optional capabilities off by default unless the project truly needs them.
10. Keep concise why/how guidance when it helps agents make correct tradeoffs, but do not turn agent docs into essays.
11. Flag stale phase claims such as "early WIP", "tool-first", "experimental", or "sweeping changes encouraged" unless the current repo still proves them.
12. Make skills small, single-purpose, and composable. Put deterministic repeated work in scripts, rarely-needed detail in one-level references, and keep the trigger description precise.
13. For this skill, keep the output review-only: recommend deletes, moves, additions, rewrites, and disables, but do not apply them.

## Source Notes

- OpenAI Codex customization: `AGENTS.md` is durable repo guidance, should be kept small, and should focus on build/test commands, review expectations, repo conventions, and directory-specific instructions.
- OpenAI prompt engineering: prompt behavior varies by model; production prompts should be evaluated, structured with clear sections, and supplied with relevant context and examples when needed.
- Sean Goedecke, "Prompts are technical debt too": prompt files decay silently across model upgrades; keep project prompts to concrete project facts and delete stale instructions.
- Transcript-derived notes from the video discussion: audit prompt debt across Markdown, skills, MCPs, plugins, tool choices, and dynamic system prompts; prefer boring defaults; create durable context only after repeated steering need; separate README content for users from agent guidance for future coding agents.
- Matt Pocock skills repo: production skills are small, adaptable, composable, and grounded in engineering fundamentals. The `write-a-skill` guidance emphasizes concise `SKILL.md`, precise trigger descriptions, utility scripts only for deterministic repeated work, one-level references, and review checklists.
- Anthropic context engineering: context is finite; curate the smallest high-signal token set, and use clear instructions, examples, and structured long-context inputs when appropriate.
- Google prompt design: prompt design is test-driven and iterative; clear instructions, examples, context, structure, and prompt health checks are recurring best practices.
- Microsoft prompt engineering: be specific, ground answers in source data, and remember that model behavior differs across model families.

## Source URLs

- https://developers.openai.com/codex/concepts/customization#agents-guidance
- https://developers.openai.com/api/docs/guides/prompt-engineering
- https://www.seangoedecke.com/prompts-are-technical-debt-too/
- https://github.com/mattpocock/skills
- https://github.com/mattpocock/skills/blob/main/skills/productivity/write-a-skill/SKILL.md
- https://www.anthropic.com/engineering/effective-context-engineering-for-ai-agents
- https://platform.claude.com/docs/en/build-with-claude/prompt-engineering/claude-prompting-best-practices
- https://docs.cloud.google.com/vertex-ai/generative-ai/docs/learn/prompts/prompt-design-strategies
- https://learn.microsoft.com/en-us/azure/foundry/openai/concepts/prompt-engineering
