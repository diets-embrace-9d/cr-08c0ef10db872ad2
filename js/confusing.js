import { renderNav } from "./nav.js";
import { CONFUSING_CATEGORIES, CONFUSING_GROUPS } from "../data/confusing.js";
import { VOCAB } from "../data/vocab.js";
import { RESTAURANT_VOCAB } from "../data/restaurant.js";
import { getSettings } from "./storage.js";
import { speak } from "./speech.js";

renderNav("confusing.html");

const settings = getSettings();
const searchEl = document.getElementById("cf-search");
const tabsEl = document.getElementById("cf-tabs");
const countEl = document.getElementById("cf-count");
const listEl = document.getElementById("cf-list");

const TIERS = [
  { id: "all", label: "All" },
  { id: "top200", label: "Top 200" },
  { id: "top500", label: "201–500" },
  { id: "top1000", label: "501–1000" },
  { id: "restaurant", label: "Restaurant" },
];
const MAX_EXAMPLES = 2;

// Grammar Essentials (ids 1500+) is taught first, so it ranks ahead of id 1.
function teachingRank(word) {
  return word.id >= 1500 && word.id < 2000 ? word.id - 1500 - 100 : word.id;
}

function tierOf(rank) {
  if (rank <= 200) return "top200";
  if (rank <= 500) return "top500";
  if (rank <= 1000) return "top1000";
  return "restaurant";
}

const ALL_WORDS = [...VOCAB, ...RESTAURANT_VOCAB]
  .map((w) => ({ ...w, teachRank: teachingRank(w) }))
  .sort((a, b) => a.teachRank - b.teachRank);

const wordsByChar = new Map();
for (const w of ALL_WORDS) {
  for (const ch of new Set(w.traditional)) {
    if (!wordsByChar.has(ch)) wordsByChar.set(ch, []);
    wordsByChar.get(ch).push(w);
  }
}

function escapeHtml(s) {
  return String(s)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

// Prefers real multi-character words: the tile already shows the character.
function examplesFor(ch) {
  const words = wordsByChar.get(ch) || [];
  const compounds = words.filter((w) => w.traditional.length > 1);
  return (compounds.length ? compounds : words).slice(0, MAX_EXAMPLES);
}

const GROUPS = CONFUSING_GROUPS.map((g) => {
  const chars = g.chars.map(([ch, jyutping, english]) => ({
    ch,
    jyutping,
    english,
    examples: examplesFor(ch),
    firstRank: (wordsByChar.get(ch) || [{ teachRank: Infinity }])[0].teachRank,
  }));
  // A set only becomes confusing once its last character has been taught.
  const rank = Math.max(...chars.map((c) => c.firstRank));
  return {
    group: g.group,
    chars,
    tip: g.tip,
    rank,
    tier: tierOf(rank),
    sameSound: new Set(chars.map((c) => c.jyutping)).size === 1,
  };
}).sort((a, b) => a.rank - b.rank);

let activeTier = "all";
const openCategories = new Set();
const PREVIEW_SETS = 3;

function tileHtml(c) {
  const examples = c.examples
    .map(
      (w) =>
        `<button type="button" class="cf-example" data-say="${escapeHtml(w.traditional)}"><b>${escapeHtml(
          w.traditional
        )}</b> <span class="jyutping">${escapeHtml(w.jyutping)}</span><span class="cf-example-en">${escapeHtml(
          w.english
        )}</span></button>`
    )
    .join("");
  return `
    <div class="cf-tile">
      <button type="button" class="cf-char" data-say="${escapeHtml(c.ch)}" title="Play ${escapeHtml(c.ch)}">${escapeHtml(c.ch)}</button>
      <div class="jyutping">${escapeHtml(c.jyutping)}</div>
      <div class="cf-meaning">${escapeHtml(c.english)}</div>
      <div class="cf-examples">${examples}</div>
    </div>`;
}

function groupHtml(g) {
  const badge = g.sameSound ? `<span class="cf-badge">Same sound</span>` : "";
  return `
    <div class="card cf-group">
      <div class="cf-tiles">${g.chars.map(tileHtml).join("")}</div>
      <div class="cf-tip">${badge}${escapeHtml(g.tip)}</div>
    </div>`;
}

function matches(g, query) {
  if (!query) return true;
  const text = [g.tip, ...g.chars.map((c) => `${c.ch} ${c.jyutping} ${c.english}`)].join(" ").toLowerCase();
  return text.includes(query);
}

function categoryHtml(category, sets, isOpen) {
  const preview = sets
    .slice(0, PREVIEW_SETS)
    .map((g) => g.chars.map((c) => c.ch).join(" "))
    .join(" · ");
  return `
    <details class="reading-section cf-category" data-category="${category.id}"${isOpen ? " open" : ""}>
      <summary>
        <h2>${escapeHtml(category.name)}<span class="cf-category-count">${sets.length}</span></h2>
        <div class="cf-category-preview">${escapeHtml(preview)}${sets.length > PREVIEW_SETS ? " …" : ""}</div>
      </summary>
      ${sets.map(groupHtml).join("")}
    </details>`;
}

function render() {
  const query = searchEl.value.trim().toLowerCase();
  const shown = GROUPS.filter((g) => (activeTier === "all" || g.tier === activeTier) && matches(g, query));
  const sections = CONFUSING_CATEGORIES.map((category) => ({
    category,
    sets: shown.filter((g) => g.group === category.id),
  })).filter((s) => s.sets.length);

  countEl.textContent = `${shown.length} look-alike set${shown.length === 1 ? "" : "s"} in ${sections.length} group${
    sections.length === 1 ? "" : "s"
  }`;
  // Searching opens every matching group so results are visible straight away.
  listEl.innerHTML = sections.length
    ? sections.map((s) => categoryHtml(s.category, s.sets, Boolean(query) || openCategories.has(s.category.id))).join("")
    : `<div class="empty-state">No look-alike sets match that search.</div>`;
}

tabsEl.innerHTML = TIERS.map(
  (t) => `<button type="button" data-tier="${t.id}"${t.id === activeTier ? ' class="active"' : ""}>${t.label}</button>`
).join("");

tabsEl.addEventListener("click", (e) => {
  const btn = e.target.closest("button[data-tier]");
  if (!btn) return;
  activeTier = btn.dataset.tier;
  tabsEl.querySelectorAll("button").forEach((b) => b.classList.toggle("active", b === btn));
  render();
});

searchEl.addEventListener("input", render);

// "toggle" doesn't bubble, so listen in the capture phase. Search forces groups
// open, and that shouldn't count as the learner choosing to open them.
listEl.addEventListener(
  "toggle",
  (e) => {
    if (searchEl.value.trim()) return;
    const id = e.target.dataset.category;
    if (!id) return;
    if (e.target.open) openCategories.add(id);
    else openCategories.delete(id);
  },
  true
);

listEl.addEventListener("click", (e) => {
  const btn = e.target.closest("[data-say]");
  if (btn) speak(btn.dataset.say, settings.voiceURI);
});

render();
