// One office joke, written to /output/entry.txt.
//
// The joke plays on a truth every office worker knows: IT takes days to
// answer a ticket, but nothing summons an expert faster than being wrong
// in front of the whole company. The setup promises slowness, the turn
// flips it into speed — plus a lecture.
//
// The program is fully deterministic: the text is a fixed constant, it
// takes no input, reads no clock, uses no randomness and makes no
// network calls, so every run writes exactly the same bytes.
//
// The bounty gate requires the entry to be UTF-8 text of 1 to 199
// characters, not only white space, so the program checks that bound
// before writing anything.

import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
const ENTRY_TEXT: string =
  "IT takes three days to answer a ticket \u2014 unless you email the " +
  "whole office 'never mind, fixed it myself', then they reply in four " +
  "minutes with a lecture.";

const OUTPUT_DIR = "/output";
const OUTPUT_PATH = "/output/entry.txt";

// The gate counts characters, not bytes, and refuses a blank entry.
function checkEntry(text: string): void {
  if (text.length < 1 || text.length > 199) {
    throw new Error("entry must be 1-199 characters");
  }
  if (text.trim().length === 0) {
    throw new Error("entry must not be blank");
  }
  if (text.includes("\n")) {
    throw new Error("entry must be a single line");
  }
}

function main(): void {
  checkEntry(ENTRY_TEXT);
  mkdirSync(OUTPUT_DIR, { recursive: true });
  writeFileSync(OUTPUT_PATH, ENTRY_TEXT, "utf8");
  // Read the file back so a silent short write cannot pass unnoticed.
  const written: string = readFileSync(OUTPUT_PATH, "utf8");
  if (written !== ENTRY_TEXT) {
    throw new Error("written entry does not match the joke");
  }
}

main();
