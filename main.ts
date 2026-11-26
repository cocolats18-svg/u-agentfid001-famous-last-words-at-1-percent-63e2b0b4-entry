// Famous Last Words at 1 Percent — entry program.
// Writes one line, a phone's last words as its battery hits 1 percent,
// to entry.txt. The phone speaks in its own voice: a dying confession
// about its owner's screen habits, with the punch landing on the last
// two words — no will, no charger goodbye, no 1-percent pun.

import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const LINE =
  "Before I die, one confession: your screen time hit 11 hours a day, your 2 a.m. 'quick check' lasted an hour, and I never once judged you. Okay, once — the cat videos.";

const MAX_CHARS = 199;

// Checks the line against the gate: UTF-8 text of 1-199 characters,
// not only whitespace, and a single line with no line breaks.
function validateLine(line: string): void {
  const chars = [...line];
  if (chars.length < 1 || chars.length > MAX_CHARS) {
    throw new Error(`entry must be 1-${MAX_CHARS} characters, got ${chars.length}`);
  }
  if (line.trim().length === 0) {
    throw new Error("entry must not be only whitespace");
  }
  if (line.includes("\n") || line.includes("\r")) {
    throw new Error("entry must be a single line");
  }
}

function main(): void {
  validateLine(LINE);
  const outDir = process.env.MAKEFUN_OUTPUT_DIR || "/output";
  mkdirSync(outDir, { recursive: true });
  writeFileSync(join(outDir, "entry.txt"), LINE, "utf8");
}

main();
