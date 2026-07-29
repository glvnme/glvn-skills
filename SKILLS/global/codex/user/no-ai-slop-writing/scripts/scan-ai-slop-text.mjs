#!/usr/bin/env node
import { existsSync, readFileSync, readdirSync, statSync } from "node:fs";
import path from "node:path";
import process from "node:process";

const DEFAULT_LIST_PATH = "C:\\Users\\fargrik\\Documents\\dev\\glvn-skills\\SKILLS\\references\\ai-slop-exclusion-words.txt";
const SKIP_DIRS = new Set([".git", "node_modules", ".next", "dist", "build", "coverage"]);

function usage() {
  return [
    "Usage: node scan-ai-slop-text.mjs [--list path] <file-or-dir>...",
    "",
    "Scans text files for the AI-slop exclusion list, including entries with ... wildcard gaps.",
  ].join("\n");
}

function parseArgs(argv) {
  const args = { listPath: process.env.AI_SLOP_LIST || "", targets: [] };
  for (let index = 0; index < argv.length; index += 1) {
    const arg = argv[index];
    if (arg === "--help" || arg === "-h") {
      console.log(usage());
      process.exit(0);
    }
    if (arg === "--list") {
      index += 1;
      if (!argv[index]) {
        throw new Error("--list requires a path");
      }
      args.listPath = argv[index];
      continue;
    }
    args.targets.push(arg);
  }
  if (args.targets.length === 0) {
    throw new Error("provide at least one file or directory to scan");
  }
  return args;
}

function resolveListPath(rawListPath) {
  const candidates = [];
  if (rawListPath) {
    candidates.push(path.resolve(rawListPath));
  }

  const repoList = findUp(process.cwd(), path.join("SKILLS", "references", "ai-slop-exclusion-words.txt"));
  if (repoList) {
    candidates.push(repoList);
  }

  candidates.push(DEFAULT_LIST_PATH);

  const found = candidates.find((candidate) => existsSync(candidate));
  if (!found) {
    throw new Error(`exclusion list not found. Tried: ${candidates.join(", ")}`);
  }
  return found;
}

function findUp(startDir, relativePath) {
  let current = path.resolve(startDir);
  while (true) {
    const candidate = path.join(current, relativePath);
    if (existsSync(candidate)) {
      return candidate;
    }
    const parent = path.dirname(current);
    if (parent === current) {
      return "";
    }
    current = parent;
  }
}

function loadTerms(listPath) {
  return readFileSync(listPath, "utf8")
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter((line) => line && !line.startsWith("#"));
}

function escapeRegExp(input) {
  return input.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function termPattern(term) {
  const body = term
    .split("...")
    .map((part) => part.trim())
    .filter(Boolean)
    .map((part) => escapeRegExp(part).replace(/\s+/g, "\\s+").replaceAll("'", "['\\u2019]"))
    .join("[\\s\\S]{0,240}?");
  return new RegExp(`(^|[^a-z0-9])(${body})(?=[^a-z0-9]|$)`, "gi");
}

function collectTargets(targets) {
  const files = [];
  for (const target of targets) {
    const resolved = path.resolve(target);
    if (!existsSync(resolved)) {
      throw new Error(`target not found: ${target}`);
    }
    collectPath(resolved, files);
  }
  return files;
}

function collectPath(target, files) {
  const stats = statSync(target);
  if (stats.isDirectory()) {
    if (SKIP_DIRS.has(path.basename(target))) {
      return;
    }
    for (const child of readdirSync(target)) {
      collectPath(path.join(target, child), files);
    }
    return;
  }
  if (stats.isFile()) {
    files.push(target);
  }
}

function readMaybeText(file) {
  const buffer = readFileSync(file);
  if (buffer.includes(0)) {
    return "";
  }
  return buffer.toString("utf8");
}

function positionForIndex(text, index) {
  const before = text.slice(0, index);
  const lines = before.split(/\r?\n/);
  return { line: lines.length, column: lines.at(-1).length + 1 };
}

function scanFile(file, patterns) {
  const text = readMaybeText(file);
  if (!text) {
    return [];
  }

  const matches = [];
  const occupied = [];
  for (const { term, pattern } of patterns) {
    pattern.lastIndex = 0;
    for (const match of text.matchAll(pattern)) {
      const prefixLength = match[1].length;
      const start = match.index + prefixLength;
      const end = start + match[2].length;
      if (occupied.some((range) => start < range.end && end > range.start)) {
        continue;
      }
      occupied.push({ start, end });
      matches.push({ term, ...positionForIndex(text, start) });
      break;
    }
  }
  return matches;
}

try {
  const args = parseArgs(process.argv.slice(2));
  const listPath = resolveListPath(args.listPath);
  const patterns = loadTerms(listPath)
    .sort((left, right) => right.length - left.length)
    .map((term) => ({ term, pattern: termPattern(term) }));
  const listPathResolved = path.resolve(listPath);
  const files = collectTargets(args.targets).filter((file) => path.resolve(file) !== listPathResolved);
  let matchCount = 0;

  for (const file of files) {
    for (const match of scanFile(file, patterns)) {
      matchCount += 1;
      console.log(`${file}:${match.line}:${match.column}: ${match.term}`);
    }
  }

  process.exit(matchCount > 0 ? 1 : 0);
} catch (error) {
  console.error(error instanceof Error ? error.message : String(error));
  console.error(usage());
  process.exit(2);
}
