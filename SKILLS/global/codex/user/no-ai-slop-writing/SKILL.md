---
name: no-ai-slop-writing
description: Keep prose free of the local AI-slop exclusion list without loading the long vocabulary unless the task needs it. Use only when the user explicitly asks to remove AI slop, banned words, robotic or synthetic wording, improve human tone, review public-facing prose, or when a related writing task has high polish or publication risk; do not invoke for routine code work, status updates, terminal summaries, or ordinary technical answers.
---

# No AI Slop Writing

## Invocation Boundary

Use this skill sparingly. Do not load the exclusion list for routine coding, short status replies, terminal output summaries, or ordinary internal notes. Invoke it when prose quality is part of the task: public copy, docs meant for users, prompts or skills meant to steer other agents, or explicit requests to remove AI slop, banned terms, robotic tone, or synthetic wording. When the skill is not invoked, still write plainly; just do not load the full list or scanner.

## Source List

Use the canonical exclusion list before writing or revising prose:

- Local repo path: `SKILLS/references/ai-slop-exclusion-words.txt`
- Local absolute path: `C:\Users\fargrik\Documents\dev\glvn-skills\SKILLS\references\ai-slop-exclusion-words.txt`
- Online raw file after this repo is pushed to `main`: `https://raw.githubusercontent.com/glvnme/glvn-skills/main/SKILLS/references/ai-slop-exclusion-words.txt`
- Original source: `C:\Users\fargrik\Documents\dev\membranes.wiki\membranes-admin-private\lib\generated-language-policy.ts`

If the current workspace contains `glvn-skills`, read or grep the local file. In other workspaces, fetch the raw URL or open it through web access. Keep the list in context for the rest of the turn when the user asks for prose.

When the list is not present on disk, download it into a temp file, then scan with `--list` so wildcard patterns still work. If the download returns 404, use the local absolute path above or ask for the repo changes to be pushed.

- PowerShell: `$list = Join-Path $env:TEMP "ai-slop-exclusion-words.txt"; Invoke-WebRequest -Uri "https://raw.githubusercontent.com/glvnme/glvn-skills/main/SKILLS/references/ai-slop-exclusion-words.txt" -OutFile $list; node scripts/scan-ai-slop-text.mjs --list $list <path>`
- POSIX shell: `curl -fsSL "https://raw.githubusercontent.com/glvnme/glvn-skills/main/SKILLS/references/ai-slop-exclusion-words.txt" -o /tmp/ai-slop-exclusion-words.txt && node scripts/scan-ai-slop-text.mjs --list /tmp/ai-slop-exclusion-words.txt <path>`
- Exact fallback without the scanner: `rg -n -i -F -f <downloaded-list-path> <path>`

## Rewrite Process

1. Load the exclusion list.
2. Prefer the bundled scanner when this skill folder is available because it handles `...` gap patterns:
   `node scripts/scan-ai-slop-text.mjs <path>`
3. For quick exact-phrase checks, use:
   `rg -n -i -F -f SKILLS/references/ai-slop-exclusion-words.txt <path>`
4. Treat entries with `...` as gap patterns, not literal strings. If the scanner is unavailable, manually check whether the words on both sides appear in the same sentence or short span.
5. Replace flagged text with concrete nouns, verbs, numbers, conditions, or source-backed claims.
6. Reread for tone: remove meta openings, throat clearing, vague praise, sales phrasing, fake urgency, and tidy three-part slogans.
7. Run the scanner or exact-phrase scan again when editing files. Report any unavoidable retained term.

## Writing Rules

- Start with the answer, not a setup line.
- Prefer short paragraphs and normal words.
- Use technical terms only when they name a real thing in the domain.
- Let uncertainty stay visible: say "unknown", "not yet checked", or "needs a source" when that is true.
- Keep quotes, source titles, code identifiers, API names, file paths, URLs, tests, and user-supplied text unchanged unless the user asked to rewrite them.
- Do not pad with moral-of-the-story endings, recap headers, or future-facing filler.
- Do not replace one banned phrase with another vague phrase. If no clean replacement exists, delete the sentence.

## Review Output

When asked to review text, return the revised text when a rewrite is requested, a compact list of blocked terms found only if useful, and any terms left in place with the reason.
