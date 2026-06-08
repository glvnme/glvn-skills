# v0 / Next Local Bootstrap Checklist

Use this as a reference after reading the project itself. Do not apply it blindly.

## Baseline

- Confirm the root by locating `package.json`, `next.config.*`, `app/` or `pages/`, and the lockfile.
- Run `git status --short`; never revert unrelated user changes.
- Record package manager from `packageManager`, lockfile, or scripts. If multiple lockfiles exist, ask which one to keep or infer from the newest lockfile only when safe.
- Read env usage with `rg "process\\.env|NEXT_PUBLIC_|OPENROUTER|DATABASE|API_KEY|SECRET"`.

## AwenTools History Pattern

The AwenTools import started as a large v0-style Next.js project, then moved through these cleanup stages:

- Initial import with many shadcn components, placeholder images, direct API route logic, inline editor components, and generated docs.
- `.gitignore` pass that ignored v0 sandbox files, build output, local env files, logs, test output, editor state, temp files, and private keys.
- Local project setup with `.env.example`, `AGENTS.md`, `CONTEXT.md`, `CONTRIBUTING.md`, repo-scoped skills, eslint, and a telemetry-free Next wrapper.
- Generated clutter removal, including `next-env.d.ts`, password gate, duplicate full-page editor components, stale settings/todos panels, and placeholder public assets.
- Domain hardening by extracting prompt-builder types/defaults/native output, OpenRouter adapters, AI prompt catalog, model functions, docs, ADRs, and focused Vitest coverage.

Use that as a model: first make the project runnable, then remove obvious generated junk, then extract durable domain logic only where the code proves it is needed.

## Local Port Strategy

- Avoid common dev ports such as `3000`, `3001`, `4000`, `4200`, `5000`, `5173`, `5174`, `8000`, `8080`, `8787`, and `9000`.
- Prefer probing an uncommon high range and binding to `127.0.0.1`.
- Use `next dev -H 127.0.0.1 -p <port>` or `pnpm next dev -H 127.0.0.1 -p <port>`.
- Store the chosen URL in a local ignored file such as `.codex-runtime/local-port.json`.

## Cleanup Targets

Usually safe to remove after inspection:

- `__v0_runtime_loader.js`
- `__v0_devtools.tsx`
- `__v0_jsx-dev-runtime.ts`
- `.snowflake/`
- `.v0-trash/`
- `next.user-config.*`
- `.vercel/` when redeploying as a separate project
- stock placeholder assets under `public/`
- dead generated components that are not imported anywhere

Review carefully before removing:

- shadcn components, because v0 often over-installs them but some are real dependencies
- demo pages or cards, because they may contain useful copy or layout
- env files, because they may contain secrets that should be moved to `.env.local` and never shown
- route handlers and middleware, because deployed behavior may depend on them

## Project Hygiene

- Keep `.env.example` committed and `.env.local` ignored.
- Keep secrets server-side. Only `NEXT_PUBLIC_` variables may be read by browser code, and those are public by design.
- Keep `.vercel/` ignored unless the user intentionally wants a project-local link.
- Keep `.codex-runtime/` ignored when using the port helper or other local agent artifacts.
- Prefer concise `README.md` setup instructions over generated marketing copy.
- Add `AGENTS.md`/`CONTEXT.md` only when project domain language or agent operating rules would prevent repeated rediscovery.
- Add tests or deterministic scripts when changing non-trivial parsing, API, state, or domain logic.

## Dependency Updates

- Run `pnpm outdated` before broad upgrades.
- Update framework-coupled packages together: `next`, `react`, `react-dom`, `eslint-config-next`, `@types/react`, and `@types/react-dom`.
- Prefer patch/minor updates first. Use major updates only when the user wants latest/current and the build is verified afterward.
- After dependency changes, run install, lint, build, and any tests.

## Vercel Redeploy Separately

- Remove stale `.vercel/` state from the downloaded project before linking.
- Use `vercel link` to create or attach a new Vercel project.
- Use `vercel env pull .env.local` when the source project already has configured development env vars, or recreate env vars manually when separating ownership.
- Use preview deploy before production: `vercel deploy`, then `vercel deploy --prod` only when requested.

## Official References

- v0 docs: https://v0.app/docs
- Next CLI: https://nextjs.org/docs/app/api-reference/cli/next
- Next environment variables: https://nextjs.org/docs/app/building-your-application/configuring/environment-variables
- Vercel CLI deploy flow: https://vercel.com/docs/projects/deploy-from-cli
- pnpm outdated: https://pnpm.io/cli/outdated
- pnpm update: https://pnpm.io/cli/update
