// Full-coverage Cantonese word lookup — curated app vocab (Top 200/500/1000
// + restaurant pack) merged with CC-Canto and CC-CEDICT (~34k entries
// total). Unlike vocab-segment.js (curated-only, used on lesson pages where
// content is deliberately built from taught words), this is for content
// that isn't vocabulary-constrained — free-form text (Speak tab) and
// realistic reading material (menus, signs) that should be fully readable
// even though most of its words were never "taught".
import { VOCAB } from "../data/vocab.js";
import { RESTAURANT_VOCAB } from "../data/restaurant.js";
import { CANTO_DICT } from "../data/canto-dict.js";
import { CEDICT_CANTO } from "../data/cedict-canto.js";
import { CHAR_MEANINGS } from "../data/char-meanings.js";
import { UNIHAN_DEFS } from "../data/unihan-defs.js";

const LOOKUP = new Map();
// Every distinct entry per word, in the same priority order as LOOKUP. The
// first one is the primary meaning; the rest are offered as alternatives
// (other readings, or senses the primary gloss leaves out).
const ALL_ENTRIES = new Map();
let maxWordLen = 1;

function addEntry(traditional, jyutping, english, source, id = null) {
  if (!traditional) return;
  const entry = { jyutping, english, source, id };
  if (!ALL_ENTRIES.has(traditional)) ALL_ENTRIES.set(traditional, []);
  ALL_ENTRIES.get(traditional).push(entry);
  if (LOOKUP.has(traditional)) return;
  LOOKUP.set(traditional, entry);
  maxWordLen = Math.max(maxWordLen, [...traditional].length);
}

function curatedSource(w) {
  if (w.tier === 200) return "top200";
  if (w.tier === 500) return "top500";
  if (w.tier === 1000) return "top1000";
  return "restaurant";
}

// Curated vocab added first so it always wins ties over the dictionary.
// Its own `id` is carried through so callers (e.g. "+ flashcard") can
// schedule an SRS review even for a word found while reading free-form
// text, not just on a curated vocab list page.
for (const w of VOCAB) addEntry(w.traditional, w.jyutping, w.english, curatedSource(w), w.id);
for (const w of RESTAURANT_VOCAB) addEntry(w.traditional, w.jyutping, w.english, "restaurant", w.id);
// Hand-checked character meanings rank right after lesson vocab, and the
// dictionaries' own standalone entries for those characters are skipped.
for (const [traditional, entries] of Object.entries(CHAR_MEANINGS)) {
  for (const [jyutping, english] of entries) addEntry(traditional, jyutping, english, "curated");
}
for (const [traditional, jyutping, english] of CANTO_DICT) {
  if (CHAR_MEANINGS[traditional]) continue;
  addEntry(traditional, jyutping, english, "dictionary");
}
// CC-Canto only documents Cantonese-specific vocabulary, so common compound
// words (香港, 朋友, 工作...) are missing from it entirely. This layer fills
// those gaps: CC-CEDICT glosses matched with real word-level jyutping.
for (const [traditional, jyutping, english] of CEDICT_CANTO) {
  if (CHAR_MEANINGS[traditional]) continue;
  addEntry(traditional, jyutping, english, "dictionary");
}

// A handful of very common single characters that both dictionaries only
// document as part of compounds (e.g. 街市, 酒店, 麻醬) and never list on
// their own — found by auditing realistic reading content for coverage
// gaps. Added last, after both dictionaries, so a real entry always wins.
const SINGLE_CHAR_GAPS = [
  ["麻", "maa4", "hemp / numb (also in 麻醬, sesame paste)"],
  ["街", "gaai1", "street"],
  ["店", "dim3", "shop / store"],
  ["售", "sau6", "to sell"],
];
for (const [traditional, jyutping, english] of SINGLE_CHAR_GAPS) {
  addEntry(traditional, jyutping, english, "dictionary");
}

export const SOURCE_LABELS = {
  top200: "Top 200",
  top500: "201–500",
  top1000: "501–1000",
  restaurant: "🍜 Restaurant",
  curated: "Checked",
  dictionary: "Dictionary",
};

export function sourceLabel(info) {
  return SOURCE_LABELS[info.source] || "Dictionary";
}

export function isHan(ch) {
  return /[㐀-鿿豈-﫿]/.test(ch);
}

export function lookupWord(text) {
  return LOOKUP.get(text);
}

// Comparable form of a gloss: lowercase, without "(Cantonese)"-style tags,
// numbering, or punctuation.
function glossKey(english) {
  return english
    .toLowerCase()
    .replace(/\([^)]*\)/g, " ")
    .replace(/\b\d+\.\s*/g, " ")
    .replace(/[^a-z\s]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

// A single character's definition from Unicode's character database: a
// second, independent source. It has no reading attached, because Unihan's
// one listed Cantonese reading isn't always the common one.
export function lookupCharDefinition(ch) {
  return UNIHAN_DEFS[ch] || null;
}

// True when `english` adds nothing beyond glosses already shown.
export function isGlossCovered(english, shownGlosses) {
  const key = glossKey(english);
  return !key || shownGlosses.some((g) => glossKey(g).includes(key));
}

// Other entries for `text` beyond the primary one. Skips entries that only
// restate a meaning already shown (same reading, gloss already covered).
export function lookupAlternatives(text) {
  const entries = ALL_ENTRIES.get(text) || [];
  const shown = [];
  const result = [];
  for (const [i, entry] of entries.entries()) {
    const key = glossKey(entry.english);
    const redundant = shown.some((s) => s.jyutping === entry.jyutping && (!key || s.key.includes(key)));
    if (!redundant) {
      if (i > 0) result.push(entry);
      shown.push({ jyutping: entry.jyutping, key });
    }
  }
  return result;
}

// For multi-character words, look up each individual character so learners
// can see how the compound is built from its parts (e.g. 圖書館 = 圖 map/
// picture + 書 book + 館 building). Skips characters with no known entry.
export function breakdownChars(wordText) {
  const chars = [...wordText];
  if (chars.length < 2) return [];
  return chars
    .map((ch) => ({ ch, info: LOOKUP.get(ch) }))
    .filter((part) => part.info);
}

// Splits text into tokens: runs of Han characters are greedily matched
// against the merged dictionary (longest match first); everything else
// (spaces, punctuation, latin text, newlines) passes through unclickable.
// Returns { text, start, len, clickable, known }.
export function segmentText(text) {
  const chars = [...text];
  const tokens = [];
  let i = 0;
  while (i < chars.length) {
    if (isHan(chars[i])) {
      let matchedLen = 1;
      const maxTry = Math.min(maxWordLen, chars.length - i);
      for (let len = maxTry; len >= 2; len--) {
        const candidate = chars.slice(i, i + len).join("");
        if (LOOKUP.has(candidate)) {
          matchedLen = len;
          break;
        }
      }
      const tokenText = chars.slice(i, i + matchedLen).join("");
      tokens.push({ text: tokenText, start: i, len: matchedLen, clickable: true, known: LOOKUP.has(tokenText) });
      i += matchedLen;
    } else {
      tokens.push({ text: chars[i], start: i, len: 1, clickable: false, known: false });
      i += 1;
    }
  }
  return tokens;
}
