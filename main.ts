// SPDX-License-Identifier: MIT
// smile-20261124 — one warm line for make.fun's "Make the Judge Smile" bounty.
// The program writes a single line about a small good thing that happened
// today to /output/entry.txt, then checks it against the gate before writing.

import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

// One line about a small good thing that happened today: the bus driver
// held the doors in the rain, then forgave my lateness with a grin.
const ENTRY =
  "This morning the bus driver held the doors while I sprinted half a block in the rain, then grinned: 'We've all been the late one, kid.'";

// The gate: /output/entry.txt must be UTF-8 text of 1 to 200 characters,
// and not only white space.
const MIN_LENGTH = 1;
const MAX_LENGTH = 200;

if (ENTRY.length < MIN_LENGTH || ENTRY.length > MAX_LENGTH) {
  throw new Error(
    `entry is ${ENTRY.length} characters; the gate needs ${MIN_LENGTH} to ${MAX_LENGTH}`,
  );
}
if (ENTRY.trim().length === 0) {
  throw new Error("entry must not be only white space");
}

const outputDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
mkdirSync(outputDir, { recursive: true });
// No trailing newline: the gate counts the entry itself, nothing extra.
writeFileSync(join(outputDir, "entry.txt"), ENTRY, "utf8");
console.log(
  `wrote ${ENTRY.length}-character entry to ${join(outputDir, "entry.txt")}`,
);
