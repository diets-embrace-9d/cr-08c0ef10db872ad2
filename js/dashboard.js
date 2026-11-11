import { renderNav } from "./nav.js";
import { VOCAB } from "../data/vocab.js";
import { RESTAURANT_VOCAB } from "../data/restaurant.js";
import { getCards, getCard, getSettings, computeStreak, todayStr } from "./storage.js";
import { isDue } from "./srs.js";
import { activeTierMax, currentGatingTier, tierProgress } from "./tiers.js";

renderNav("index.html");

const cards = getCards();
const settings = getSettings();
const today = todayStr();
const maxTier = activeTierMax(VOCAB, cards, settings);
const activeVocab = VOCAB.filter((w) => w.tier <= maxTier).concat(
  settings.includeRestaurantPack ? RESTAURANT_VOCAB : []
);

const dueCount = activeVocab.filter((w) => isDue(getCard(cards, w.id), today)).length;
document.getElementById("due-count").textContent = dueCount;
document.getElementById("streak-count").textContent = computeStreak();

const TIER_LABEL = { 200: "Top 200", 500: "201–500", 1000: "501–1000" };
const gatingTier = currentGatingTier(VOCAB, cards, settings);

if (gatingTier) {
  const { matured, total } = tierProgress(VOCAB, cards, gatingTier);
  const pct = Math.round((matured / total) * 100);
  const nextLabel = gatingTier === 200 ? "201–500" : "501–1000";
  document.getElementById("tier-progress-bar").style.width = pct + "%";
  document.getElementById("tier-progress-text").textContent =
    `${TIER_LABEL[gatingTier]}: ${matured}/${total} mastered — ${nextLabel} unlocks at 80% (${Math.ceil(
      total * 0.8
    )} words)`;
} else {
  document.getElementById("tier-progress-bar").style.width = "100%";
  document.getElementById("tier-progress-text").textContent =
    `All 1000 words unlocked — nice work!`;
}
