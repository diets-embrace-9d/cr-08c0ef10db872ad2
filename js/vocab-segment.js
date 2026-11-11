// Greedy longest-match segmentation against the app's own curated vocab
// (Top 200/500/1000 + restaurant pack), falling back to the CC-Canto /
// CC-CEDICT dictionaries (same lookup used on the Speak page) for anything
// not taught — sentence connectors like 差/不過 that appear in lesson
// stories/reading but were never assigned a curated vocab entry still get
// pronunciation + a definition and stay tappable, they just don't get a
// `vocab.id` (so no "+ flashcard": SRS review is curated-vocab-only, but
// "+ list" works on any word regardless of source).
import { VOCAB } from "../data/vocab.js";
import { RESTAURANT_VOCAB } from "../data/restaurant.js";
import { CANTO_DICT } from "../data/canto-dict.js";
import { CEDICT_CANTO } from "../data/cedict-canto.js";

const LOOKUP = new Map();
let maxLen = 1;

function addEntry(traditional, jyutping, english, id) {
  if (!traditional || LOOKUP.has(traditional)) return;
  LOOKUP.set(traditional, { id: id ?? null, jyutping, english });
  maxLen = Math.max(maxLen, [...traditional].length);
}
// Curated vocab first so it always wins ties over the dictionary fallback.
for (const w of VOCAB) addEntry(w.traditional, w.jyutping, w.english, w.id);
for (const w of RESTAURANT_VOCAB) addEntry(w.traditional, w.jyutping, w.english, w.id);
for (const [traditional, jyutping, english] of CANTO_DICT) addEntry(traditional, jyutping, english, null);
for (const [traditional, jyutping, english] of CEDICT_CANTO) addEntry(traditional, jyutping, english, null);
// A handful of common single characters that neither dictionary lists as a
// standalone headword (they're usually only documented inside a longer
// compound), but that do appear on their own in lesson content.
const EXTRA_SINGLES = {
  未: ["mei6", "not yet"],
  吓: ["haa5", "a bit / briefly"],
  再: ["zoi3", "again"],
  婚: ["fan1", "marriage (bound form, e.g. 結婚/未婚)"],
  吵: ["caau2", "to argue / noisy"],
  性: ["sing3", "nature / gender (suffix, e.g. 男性)"],
  劇: ["kek6", "drama / play"],
  椒: ["ziu1", "pepper (e.g. 辣椒, chili)"],
};
for (const [traditional, [jyutping, english]] of Object.entries(EXTRA_SINGLES)) addEntry(traditional, jyutping, english, null);

function isHan(ch) {
  return /[㐀-鿿豈-﫿]/.test(ch);
}

// Returns tokens covering the whole string: { text, start, len, vocab }.
// `vocab` is the {id, jyutping, english} entry for a matched word, or null
// for punctuation/filler characters that aren't in the curated vocab.
export function segmentVocab(text) {
  const chars = [...text];
  const tokens = [];
  let i = 0;
  while (i < chars.length) {
    if (isHan(chars[i])) {
      let matchedLen = 0;
      const maxTry = Math.min(maxLen, chars.length - i);
      for (let len = maxTry; len >= 1; len--) {
        const candidate = chars.slice(i, i + len).join("");
        if (LOOKUP.has(candidate)) {
          matchedLen = len;
          break;
        }
      }
      if (matchedLen > 0) {
        const tokenText = chars.slice(i, i + matchedLen).join("");
        tokens.push({ text: tokenText, start: i, len: matchedLen, vocab: LOOKUP.get(tokenText) });
        i += matchedLen;
      } else {
        tokens.push({ text: chars[i], start: i, len: 1, vocab: null });
        i += 1;
      }
    } else {
      tokens.push({ text: chars[i], start: i, len: 1, vocab: null });
      i += 1;
    }
  }
  return tokens;
}
