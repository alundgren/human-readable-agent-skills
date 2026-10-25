#!/usr/bin/env node
// Finds and cleans up saved PR reviews. Node only, no packages, so it runs on
// Linux, macOS, and Windows wherever `npx skills` ran.
//
//   node reviews.mjs path                      print the folder, creating it
//   node reviews.mjs list                      newest first
//   node reviews.mjs clean --older-than 60 [--dry-run]
//   node reviews.mjs clean --keep 200 [--dry-run]

import fs from "node:fs";
import os from "node:os";
import path from "node:path";

function reviewsDir() {
  const base =
    process.platform === "win32"
      ? process.env.LOCALAPPDATA || path.join(os.homedir(), "AppData", "Local")
      : process.env.XDG_DATA_HOME || path.join(os.homedir(), ".local", "share");
  return path.join(base, "pr-visual-guided-review", "reviews");
}

// One review is one .html page.
function reviews(dir) {
  if (!fs.existsSync(dir)) return [];
  const byName = new Map();
  for (const file of fs.readdirSync(dir)) {
    const ext = path.extname(file);
    if (ext !== ".html") continue;
    const name = file.slice(0, -ext.length);
    const full = path.join(dir, file);
    const entry = byName.get(name) || { name, files: [], mtime: 0 };
    entry.files.push(full);
    entry.mtime = Math.max(entry.mtime, fs.statSync(full).mtimeMs);
    byName.set(name, entry);
  }
  return [...byName.values()].sort((a, b) => b.mtime - a.mtime);
}

function option(args, flag) {
  const at = args.indexOf(flag);
  if (at === -1) return undefined;
  const value = Number(args[at + 1]);
  if (!Number.isInteger(value) || value < 0) fail(`${flag} needs a whole number`);
  return value;
}

function fail(message) {
  console.error(message);
  process.exit(2);
}

const [command, ...args] = process.argv.slice(2);
const dir = reviewsDir();

if (command === "path") {
  fs.mkdirSync(dir, { recursive: true });
  console.log(dir);
} else if (command === "list") {
  for (const r of reviews(dir)) {
    console.log(`${new Date(r.mtime).toISOString().slice(0, 10)}  ${r.name}`);
  }
} else if (command === "clean") {
  const days = option(args, "--older-than");
  const keep = option(args, "--keep");
  if ((days === undefined) === (keep === undefined)) {
    fail("clean needs exactly one of --older-than <days> or --keep <count>");
  }
  const dryRun = args.includes("--dry-run");
  const all = reviews(dir);
  const cutoff = Date.now() - (days ?? 0) * 86_400_000;
  const doomed = keep !== undefined ? all.slice(keep) : all.filter((r) => r.mtime < cutoff);
  for (const r of doomed) {
    console.log(`${dryRun ? "would remove" : "removed"}  ${r.name}`);
    if (!dryRun) for (const file of r.files) fs.rmSync(file);
  }
  console.log(`${doomed.length} of ${all.length} reviews ${dryRun ? "would be removed" : "removed"}`);
} else {
  fail("usage: reviews.mjs path | list | clean (--older-than <days> | --keep <count>) [--dry-run]");
}
