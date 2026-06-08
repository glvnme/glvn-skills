---
name: v0-next-local-bootstrap
description: Bootstrap, clean up, and prepare downloaded v0/Vercel Next.js projects for local development and separate redeployment. Use when the user has exported or downloaded a website/app from v0, Vercel, or a deployed Next.js project and wants Codex to set it up locally, choose a non-conflicting localhost port, remove generated clutter, normalize package/env/git config, update dependencies, verify lint/build/dev-server behavior, or relink/redeploy it as a separate Vercel project.
---

# v0 Next Local Bootstrap

## Operating Rule

Treat the downloaded project as a rough import, not a finished codebase. Inspect first, preserve user changes, remove only explainable clutter, and verify the local app before redeploying.

## Workflow

1. Read project guidance first: `AGENTS.md`, `CONTEXT.md`, `README.md`, `package.json`, lockfiles, and framework config. If project-specific instructions exist, follow them.
2. Capture the baseline: `git status --short`, `git log --oneline -n 10` if a repo exists, `rg --files`, package scripts, env files, and Vercel/v0 artifacts. If no repo exists, initialize git only after confirming the project root is correct.
3. Run the audit helper before cleanup:

```bash
node <skill-dir>/scripts/audit-v0-next-project.mjs --root <project-root>
```

4. Choose a local port with the port helper, then run Next on that exact port:

```bash
node <skill-dir>/scripts/pick-local-port.mjs --write .codex-runtime/local-port.json
pnpm next dev -H 127.0.0.1 -p <port>
```

Use the detected package manager if the repo already has a single lockfile. If no lockfile exists, prefer `pnpm` for Next/v0 projects unless the user requested another manager.

5. Install and normalize dependencies. Prefer current-contract verification over legacy compatibility. Use `pnpm outdated`/`pnpm update` or the equivalent for the detected manager; update framework-coupled packages together, especially `next`, `react`, `react-dom`, and `eslint-config-next`.
6. Clean generated clutter after inspection. Typical targets are v0 runtime/devtools files, `.v0-trash/`, `.snowflake/`, placeholder assets, unused sample components, unused password gates, demo todo/settings/sponsor panels, duplicate generated editor files, and stale `.vercel/` links. Do not delete domain code or assets just because they look generated.
7. Set project hygiene: `.gitignore`, `.env.example`, private `.env.local`, package scripts, lint/build/test config, `AGENTS.md`/`CONTEXT.md` when useful, and concise docs for local startup.
8. Verify: run install, lint if configured, build if configured, start the dev server on the chosen port, open it in a browser when practical, and report any remaining failures with exact commands.
9. For separate Vercel redeploys, do not reuse the old `.vercel` link. Remove or ignore `.vercel/`, run `vercel link` for a new project, pull or recreate env vars, deploy preview, then production only when the user asks.

## Cleanup Judgment

Use `references/setup-checklist.md` when deciding what to strip. The checklist includes the AwenTools import history pattern this skill was based on: initial v0-style import, `.gitignore` cleanup, env template creation, domain/context docs, removal of generated placeholders and duplicate components, OpenRouter/API hardening, dependency normalization, and focused tests.

## Verification Standard

Do not claim the project is ready until fresh evidence exists. At minimum, report:

- package manager and install result
- selected localhost URL
- cleanup files changed
- lint/build/test status
- deployment/relink status if requested

If a command needs network or writes outside the workspace, request approval instead of working around the sandbox.
