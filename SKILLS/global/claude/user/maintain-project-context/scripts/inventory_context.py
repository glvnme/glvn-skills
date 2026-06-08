#!/usr/bin/env python3
"""Inventory AI-facing project context surfaces."""

from __future__ import annotations

import argparse
import json
import subprocess
from dataclasses import asdict, dataclass
from datetime import date
from pathlib import Path


EXACT_NAMES = {
    "AGENTS.md",
    "CLAUDE.md",
    "GEMINI.md",
    ".cursorrules",
    ".windsurfrules",
    "copilot-instructions.md",
}

PATH_MARKERS = (
    ".cursor/rules/",
    ".windsurf/rules/",
    ".github/copilot-instructions.md",
    "prompts/",
    ".agents/skills/",
    ".claude/skills/",
    ".claude/commands/",
    ".codex/config.toml",
    ".mcp.json",
    "mcp.json",
)

SKIP_DIRS = {
    ".git",
    ".hg",
    ".svn",
    "node_modules",
    ".next",
    "dist",
    "build",
    "out",
    "target",
    "vendor",
    ".venv",
    "venv",
    "__pycache__",
}


@dataclass
class ContextFile:
    path: str
    bytes: int
    lines: int
    git_status: str
    last_commit_date: str
    age_days: int | None


def run_git(root: Path, args: list[str]) -> str:
    try:
        result = subprocess.run(
            ["git", *args],
            cwd=root,
            text=True,
            capture_output=True,
            check=False,
        )
    except FileNotFoundError:
        return ""
    if result.returncode != 0:
        return ""
    return result.stdout.strip()


def is_candidate(root: Path, path: Path) -> bool:
    rel = path.relative_to(root).as_posix()
    if path.name in EXACT_NAMES:
        return True
    return any(rel == marker.rstrip("/") or marker in rel for marker in PATH_MARKERS)


def count_lines(path: Path) -> int:
    try:
        with path.open("rb") as file:
            return sum(1 for _ in file)
    except OSError:
        return 0


def last_commit_date(root: Path, rel: str) -> str:
    return run_git(root, ["log", "-1", "--format=%cs", "--", rel])


def git_status(root: Path, rel: str) -> str:
    output = run_git(root, ["status", "--short", "--", rel])
    return output[:2].strip() if output else ""


def age_days(iso_date: str) -> int | None:
    if not iso_date:
        return None
    try:
        return (date.today() - date.fromisoformat(iso_date)).days
    except ValueError:
        return None


def inventory(root: Path) -> list[ContextFile]:
    files: list[ContextFile] = []
    for path in root.rglob("*"):
        if path.is_dir():
            continue
        if any(part in SKIP_DIRS for part in path.relative_to(root).parts):
            continue
        if not is_candidate(root, path):
            continue

        rel = path.relative_to(root).as_posix()
        commit_date = last_commit_date(root, rel)
        files.append(
            ContextFile(
                path=rel,
                bytes=path.stat().st_size,
                lines=count_lines(path),
                git_status=git_status(root, rel),
                last_commit_date=commit_date,
                age_days=age_days(commit_date),
            )
        )
    return sorted(files, key=lambda item: item.path.lower())


def print_markdown(files: list[ContextFile]) -> None:
    if not files:
        print("No candidate AI-facing context files found.")
        return
    print("| Path | Lines | Bytes | Git | Last Commit | Age Days |")
    print("| --- | ---: | ---: | --- | --- | ---: |")
    for item in files:
        age = "" if item.age_days is None else str(item.age_days)
        print(
            f"| `{item.path}` | {item.lines} | {item.bytes} | "
            f"{item.git_status or ''} | {item.last_commit_date or ''} | {age} |"
        )


def main() -> int:
    parser = argparse.ArgumentParser(
        description="Inventory AI-facing project context files."
    )
    parser.add_argument("root", nargs="?", default=".", help="Project root to scan")
    parser.add_argument("--json", action="store_true", help="Emit JSON")
    args = parser.parse_args()

    root = Path(args.root).resolve()
    if not root.exists() or not root.is_dir():
        parser.error(f"root is not a directory: {root}")

    files = inventory(root)
    if args.json:
        print(json.dumps([asdict(item) for item in files], indent=2))
    else:
        print_markdown(files)
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
