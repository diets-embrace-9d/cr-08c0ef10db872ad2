// Shared multiple-choice distractor logic for lesson tests and Review's
// test mode. Candidates are scored by how easily they could be mistaken
// for the target word, then the highest-scoring ones are picked first —
// so a question always ends up with `count` choices, just with the
// hardest ones filled in first from the current scope, then the full
// vocabulary.
//
// Signals (weighted by how much they actually help someone guess wrong):
//   - shares a syllable with the target that differs only by tone
//     (e.g. si1 vs si4) — the classic Cantonese confusion, weighted highest
//   - shares a radical with the target (visually similar characters)
//   - same number of Han characters (can't guess by "the short option")
import { CHAR_RADICAL } from "../data/char-radical.js";

export function shortEnglish(en) {
  return en.split(" / ")[0].replace(/\s*\([^)]*\)\s*/g, "").trim() || en;
}

export function charLen(word) {
  return [...word.traditional].length;
}

function radicalsOf(word) {
  const set = new Set();
  for (const ch of word.traditional) {
    const num = CHAR_RADICAL[ch];
    if (num != null) set.add(num);
  }
  return set;
}

function sharesRadical(a, b) {
  const radicalsA = radicalsOf(a);
  for (const num of radicalsOf(b)) {
    if (radicalsA.has(num)) return true;
  }
  return false;
}

function syllables(word) {
  return word.jyutping.split(/\s+/).filter(Boolean);
}

function syllableBase(syl) {
  return syl.replace(/[0-9]$/, "");
}

function syllableTone(syl) {
  const m = syl.match(/([0-9])$/);
  return m ? m[1] : null;
}

// True if the two words share a syllable with the same sound but a
// different tone — e.g. 詩 si1 vs 是 si6 — the single hardest kind of
// Cantonese mix-up, since the characters can look nothing alike.
function sharesToneConfusableSyllable(a, b) {
  for (const sa of syllables(a)) {
    const baseA = syllableBase(sa);
    const toneA = syllableTone(sa);
    for (const sb of syllables(b)) {
      if (syllableBase(sb) === baseA && syllableTone(sb) !== toneA) return true;
    }
  }
  return false;
}

function difficultyScore(candidate, target, targetLen) {
  let score = 0;
  if (sharesToneConfusableSyllable(candidate, target)) score += 4;
  if (sharesRadical(candidate, target)) score += 2;
  if (charLen(candidate) === targetLen) score += 1;
  return score;
}

export function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export function pickDistractors(word, primaryPool, allVocab, count) {
  const correctText = shortEnglish(word.english);
  const targetLen = charLen(word);
  const seenText = new Set([correctText]);
  const distractors = [];

  function addFrom(pool) {
    if (distractors.length >= count) return;
    const ranked = shuffle(pool)
      .filter((w) => w.id !== word.id)
      .map((w) => ({ w, score: difficultyScore(w, word, targetLen) }))
      .sort((a, b) => b.score - a.score);
    for (const { w } of ranked) {
      if (distractors.length >= count) break;
      const text = shortEnglish(w.english);
      if (seenText.has(text)) continue;
      seenText.add(text);
      distractors.push(w);
    }
  }

  addFrom(primaryPool);
  addFrom(allVocab);

  return distractors;
}
