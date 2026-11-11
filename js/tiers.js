import { isMature } from "./srs.js";

const MASTERY_THRESHOLD = 0.8;
export const TIER_LEVELS = [200, 500, 1000];

export function tierProgress(vocab, cards, level) {
  const words = vocab.filter((w) => w.tier === level);
  const matured = words.filter((w) => cards[w.id] && isMature(cards[w.id])).length;
  return { matured, total: words.length };
}

// Kept for backwards compatibility: progress on the Top 200 tier specifically.
export function tier1Progress(vocab, cards) {
  return tierProgress(vocab, cards, 200);
}

// Walks 200 -> 500 -> 1000, unlocking the next tier once the current one
// is 80% mastered. Returns the highest tier value currently unlocked.
export function activeTierMax(vocab, cards, settings) {
  if (settings.tierOverride) return TIER_LEVELS[TIER_LEVELS.length - 1];

  let unlocked = TIER_LEVELS[0];
  for (let i = 0; i < TIER_LEVELS.length - 1; i++) {
    const { matured, total } = tierProgress(vocab, cards, TIER_LEVELS[i]);
    if (total > 0 && matured / total >= MASTERY_THRESHOLD) {
      unlocked = TIER_LEVELS[i + 1];
    } else {
      break;
    }
  }
  return unlocked;
}

// The tier the learner is currently working toward (i.e. the gating tier
// for unlocking the next one), or null if everything is unlocked.
export function currentGatingTier(vocab, cards, settings) {
  const max = activeTierMax(vocab, cards, settings);
  const idx = TIER_LEVELS.indexOf(max);
  return idx < TIER_LEVELS.length - 1 ? max : null;
}
