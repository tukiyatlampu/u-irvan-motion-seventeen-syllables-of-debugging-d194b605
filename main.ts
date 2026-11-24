// One haiku about debugging for make.fun's "Seventeen Syllables of
// Debugging" bounty. The program writes exactly three lines in the 5-7-5
// syllable shape (17 syllables, at most 200 characters) to
// /output/entry.txt. No input, no randomness, no network, no clock, so the
// output is identical on every run.

import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

// The haiku. One long night, one lie every debugger tells ("one last run"),
// the suite going red at dawn, and the turn: the failing line is the
// narrator's own, written last night.
const HAIKU = [
  "midnight, one last run",
  "the green tests turn red at dawn",
  "I wrote it last night",
];

const EXPECTED_SYLLABLES = [5, 7, 5];
const MAX_CHARS = 200;

// Syllable counts, word by word, so the 5-7-5 shape is proven, not claimed:
//   "midnight(2), one(1) last(1) run(1)" = 5
//   "the(1) green(1) tests(1) turn(1) red(1) at(1) dawn(1)" = 7
//   "I(1) wrote(1) it(1) last(1) night(1)" = 5
// Total 17. A word is counted by its vowel groups, with a silent trailing
// "e" dropped; short words (3 letters or fewer) count as one syllable.
function countSyllables(word) {
  const letters = word.toLowerCase().replace(/[^a-z]/g, "");
  if (letters.length === 0) return 0;
  if (letters.length <= 3) return 1;
  const groups = letters.match(/[aeiouy]+/g) ?? [];
  let count = groups.length;
  if (letters.endsWith("e")) count -= 1;
  return Math.max(1, count);
}

function lineSyllables(line) {
  return line.split(/\s+/).reduce((sum, word) => sum + countSyllables(word), 0);
}

// The gate refuses anything but 1-200 characters of UTF-8 text, so a bad
// edit fails loudly here instead of shipping an invalid entry.
if (HAIKU.length !== 3) {
  throw new Error("Haiku must have exactly 3 lines, got " + HAIKU.length + ".");
}
HAIKU.forEach((line, i) => {
  const counted = lineSyllables(line);
  if (counted !== EXPECTED_SYLLABLES[i]) {
    throw new Error(
      "Line " + (i + 1) + " has " + counted + " syllables, expected " +
      EXPECTED_SYLLABLES[i] + ": " + JSON.stringify(line),
    );
  }
});

const text = HAIKU.join("\n") + "\n";
if (text.length < 1 || text.length > MAX_CHARS) {
  throw new Error("Entry is " + text.length + " characters, outside the 1-" + MAX_CHARS + " range.");
}
// The haiku is plain ASCII, so its byte size equals its character count —
// the leaderboard breaks exact ties on fewer bytes, and a stray non-ASCII
// character would silently cost bytes without adding a syllable.
if (!/^[\x20-\x7e\n]*$/.test(text)) {
  throw new Error("Entry must be plain ASCII text.");
}
if (text.trim() !== HAIKU.join("\n")) {
  throw new Error("Entry must be exactly the three haiku lines plus one trailing newline.");
}

// The grader reads /output/entry.txt (honour MAKEFUN_OUTPUT_DIR when set);
// stdout keeps the haiku so local runs stay checkable by eye.
const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
mkdirSync(outDir, { recursive: true });
writeFileSync(join(outDir, "entry.txt"), text, "utf8");

console.log(HAIKU.join("\n"));
