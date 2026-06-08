#!/usr/bin/env node
import { existsSync, readdirSync, readFileSync, statSync } from "node:fs";
import { join, resolve } from "node:path";

function arg(name, fallback) {
  const index = process.argv.indexOf(name);
  if (index === -1) return fallback;
  const value = process.argv[index + 1];
  return value && !value.startsWith("--") ? value : fallback;
}

function readJson(path) {
  try {
    return JSON.parse(readFileSync(path, "utf8"));
  } catch {
    return null;
  }
}

function exists(root, relativePath) {
  return existsSync(join(root, relativePath));
}

function walk(root, maxDepth = 3, current = root, depth = 0, files = []) {
  if (depth > maxDepth || !existsSync(current)) return files;
  for (const entry of readdirSync(current)) {
    if ([".git", "node_modules", ".next", "dist", "build"].includes(entry)) continue;
    const absolute = join(current, entry);
    const relative = absolute.slice(root.length + 1).replaceAll("\\", "/");
    const stats = statSync(absolute);
    if (stats.isDirectory()) {
      walk(root, maxDepth, absolute, depth + 1, files);
    } else {
      files.push(relative);
    }
  }
  return files;
}

function printSection(title, items) {
  console.log(`\n## ${title}`);
  if (!items.length) {
    console.log("- None found");
    return;
  }
  for (const item of items) console.log(`- ${item}`);
}

const root = resolve(arg("--root", process.cwd()));
const asJson = process.argv.includes("--json");
const packageJson = readJson(join(root, "package.json"));

if (!packageJson) {
  throw new Error(`No readable package.json found at ${root}`);
}

const files = walk(root);
const lockfiles = ["pnpm-lock.yaml", "package-lock.json", "yarn.lock", "bun.lockb", "bun.lock"].filter((file) =>
  exists(root, file),
);

const v0Artifacts = [
  "__v0_runtime_loader.js",
  "__v0_devtools.tsx",
  "__v0_jsx-dev-runtime.ts",
  ".snowflake",
  ".v0-trash",
  "next.user-config.js",
  "next.user-config.mjs",
  "next.user-config.ts",
].filter((file) => exists(root, file));

const placeholderFiles = files.filter((file) =>
  /(^|\/)(placeholder|sample|demo|mock|todo|password-gate|sponsor-card)/i.test(file),
);

const envFiles = files.filter((file) => /^\.env(\.|$)/.test(file));
const vercelState = [".vercel"].filter((file) => exists(root, file));
const scripts = packageJson.scripts ?? {};
const dependencies = {
  ...packageJson.dependencies,
  ...packageJson.devDependencies,
};

const recommendations = [];
if (lockfiles.length === 0) recommendations.push("No lockfile found. Pick one package manager before installing.");
if (lockfiles.length > 1) recommendations.push(`Multiple lockfiles found: ${lockfiles.join(", ")}.`);
if (!exists(root, ".gitignore")) recommendations.push("Add a .gitignore before installing or running builds.");
if (!exists(root, ".env.example")) recommendations.push("Add .env.example for public config shape.");
if (envFiles.some((file) => file !== ".env.example")) {
  recommendations.push("Review local env files for secrets and keep them uncommitted.");
}
if (vercelState.length) recommendations.push("Remove stale .vercel/ before linking a separate Vercel project.");
if (!scripts.dev) recommendations.push("Add a dev script or use `pnpm next dev -H 127.0.0.1 -p <port>`.");
if (!scripts.build) recommendations.push("Add or verify a build script before redeploying.");
if (!scripts.lint) recommendations.push("Add or verify linting before larger cleanup.");
if (!dependencies.next) recommendations.push("This does not look like a Next.js package; adjust the workflow.");
if (dependencies.next && (!dependencies.react || !dependencies["react-dom"])) {
  recommendations.push("Next.js should have matching react and react-dom dependencies.");
}

const report = {
  root,
  packageName: packageJson.name ?? null,
  packageManager: packageJson.packageManager ?? null,
  lockfiles,
  scripts,
  coreDependencies: Object.fromEntries(
    ["next", "react", "react-dom", "eslint-config-next", "typescript"].flatMap((name) =>
      dependencies[name] ? [[name, dependencies[name]]] : [],
    ),
  ),
  v0Artifacts,
  placeholderFiles,
  envFiles,
  vercelState,
  recommendations,
};

if (asJson) {
  console.log(JSON.stringify(report, null, 2));
} else {
  console.log(`# v0/Next Project Audit\n\nRoot: ${report.root}`);
  console.log(`Package: ${report.packageName ?? "(unnamed)"}`);
  console.log(`Package manager: ${report.packageManager ?? "(not declared)"}`);
  printSection("Lockfiles", report.lockfiles);
  printSection("Core Dependencies", Object.entries(report.coreDependencies).map(([name, version]) => `${name}: ${version}`));
  printSection("v0 Artifacts", report.v0Artifacts);
  printSection("Placeholder or Demo-Labeled Files", report.placeholderFiles.slice(0, 50));
  printSection("Environment Files", report.envFiles);
  printSection("Vercel Local State", report.vercelState);
  printSection("Recommendations", report.recommendations);
}
