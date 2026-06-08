#!/usr/bin/env node
import { randomInt } from "node:crypto";
import { mkdirSync, writeFileSync } from "node:fs";
import net from "node:net";
import { dirname, resolve } from "node:path";

const COMMON_PORTS = new Set([
  80, 443, 3000, 3001, 3002, 3333, 4000, 4200, 4321, 5000, 5173, 5174, 5432,
  6379, 8000, 8080, 8787, 9000, 9229, 10000,
]);

function getArg(name, fallback) {
  const index = process.argv.indexOf(name);
  if (index === -1) return fallback;
  const value = process.argv[index + 1];
  return value && !value.startsWith("--") ? value : fallback;
}

function hasFlag(name) {
  return process.argv.includes(name);
}

function isFree(port, host) {
  return new Promise((resolveFree) => {
    const server = net.createServer();
    server.once("error", () => resolveFree(false));
    server.once("listening", () => {
      server.close(() => resolveFree(true));
    });
    server.listen(port, host);
  });
}

const min = Number.parseInt(getArg("--min", "41000"), 10);
const max = Number.parseInt(getArg("--max", "54999"), 10);
const host = getArg("--host", "127.0.0.1");
const writePath = getArg("--write", "");

if (!Number.isInteger(min) || !Number.isInteger(max) || min < 1024 || max <= min) {
  throw new Error("Use --min/--max with a valid non-privileged port range.");
}

let selected = null;
for (let attempt = 0; attempt < 2000; attempt += 1) {
  const port = randomInt(min, max + 1);
  if (COMMON_PORTS.has(port)) continue;
  if (await isFree(port, host)) {
    selected = port;
    break;
  }
}

if (!selected) {
  throw new Error(`Could not find a free port in ${min}-${max} on ${host}.`);
}

const urlHost = host === "0.0.0.0" ? "localhost" : host;
const result = {
  host,
  port: selected,
  url: `http://${urlHost}:${selected}`,
  nextCommand: `pnpm next dev -H ${host} -p ${selected}`,
  scriptCommand: `pnpm dev -- -H ${host} -p ${selected}`,
};

if (writePath) {
  const target = resolve(writePath);
  mkdirSync(dirname(target), { recursive: true });
  writeFileSync(target, `${JSON.stringify(result, null, 2)}\n`);
}

if (hasFlag("--json") || writePath) {
  console.log(JSON.stringify(result, null, 2));
} else {
  console.log(result.url);
}
