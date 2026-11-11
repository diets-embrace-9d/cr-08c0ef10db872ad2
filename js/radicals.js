import { renderNav } from "./nav.js";
import { RADICALS } from "../data/radicals.js";
import { RADICAL_VOCAB } from "../data/radical-vocab.js";
import { getSettings } from "./storage.js";
import { speak } from "./speech.js";

renderNav("radicals.html");

const settings = getSettings();
const searchEl = document.getElementById("radical-search");
const listEl = document.getElementById("radical-list");
const tooltipEl = document.getElementById("radical-tooltip");
const modeTabsEl = document.getElementById("radical-mode-tabs");

let mode = "curated"; // "curated" | "vocab"
const VOCAB_PREVIEW_COUNT = 10;

function escapeHtml(s) {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

// The character to actually speak for a radical: its standalone form when
// the shown glyph is only a reduced combining form (e.g. 氵 -> 水).
function spokenForm(r) {
  return r.standalone || r.radical;
}

function exampleChip(trad, jyutping, english) {
  return `<button type="button" class="radical-example" data-word="${escapeHtml(trad)}">
      <span class="hanzi">${escapeHtml(trad)}</span>
      <span class="jyutping">${escapeHtml(jyutping)}</span>
      <span class="english">${escapeHtml(english)}</span>
    </button>`;
}

function examplesHtml(r) {
  if (mode === "curated") {
    return r.examples.map(([trad, jyutping, english]) => exampleChip(trad, jyutping, english)).join("");
  }
  const words = RADICAL_VOCAB[r.rank] || [];
  if (!words.length) {
    return `<span class="muted" style="font-size:0.85rem;">No words in your vocabulary yet use this radical.</span>`;
  }
  const chips = words.map(([trad, jyutping, english]) => exampleChip(trad, jyutping, english));
  if (chips.length <= VOCAB_PREVIEW_COUNT) return chips.join("");
  const shown = chips.slice(0, VOCAB_PREVIEW_COUNT).join("");
  const rest = chips.slice(VOCAB_PREVIEW_COUNT).join("");
  return `${shown}<details class="radical-more"><summary>+${
    chips.length - VOCAB_PREVIEW_COUNT
  } more</summary>${rest}</details>`;
}

function rowHtml(r) {
  const readingLabel = r.jyutping ? r.jyutping : "—";
  const standaloneNote = r.standalone ? ` (from ${r.standalone})` : "";
  return `
    <div class="radical-row" data-rank="${r.rank}">
      <div class="radical-rank">${r.rank}</div>
      <button type="button" class="radical-glyph" data-word="${escapeHtml(spokenForm(r))}" data-decode="${escapeHtml(
    r.decode
  )}" data-reading="${escapeHtml(readingLabel)}" data-meaning="${escapeHtml(r.meaning)}">${escapeHtml(r.radical)}</button>
      <div class="radical-meaning">
        <div><span class="jyutping">${escapeHtml(readingLabel)}</span>${escapeHtml(r.meaning)}</div>
        <div class="muted" style="font-size:0.8rem;">${escapeHtml(standaloneNote.trim())}</div>
      </div>
      <div class="radical-examples">${examplesHtml(r)}</div>
    </div>`;
}

function render(filterText) {
  const query = (filterText || "").trim().toLowerCase();
  const rows = RADICALS.filter((r) => {
    if (!query) return true;
    const haystack = (r.radical + " " + (r.standalone || "") + " " + (r.jyutping || "") + " " + r.meaning).toLowerCase();
    return haystack.includes(query);
  });
  listEl.innerHTML = rows.map(rowHtml).join("") || `<p class="muted">No radicals match “${escapeHtml(query)}”.</p>`;
}

render("");

searchEl.addEventListener("input", () => {
  tooltipEl.classList.remove("show");
  render(searchEl.value);
});

modeTabsEl.addEventListener("click", (e) => {
  const btn = e.target.closest("button[data-mode]");
  if (!btn) return;
  mode = btn.dataset.mode;
  for (const b of modeTabsEl.querySelectorAll("button")) b.classList.toggle("active", b === btn);
  tooltipEl.classList.remove("show");
  render(searchEl.value);
});

listEl.addEventListener("click", (e) => {
  const btn = e.target.closest(".radical-glyph, .radical-example");
  if (!btn) return;
  const word = btn.dataset.word;
  if (word) speak(word, settings.voiceURI);
});

listEl.addEventListener("mouseover", (e) => {
  const btn = e.target.closest(".radical-glyph");
  if (!btn) return;
  tooltipEl.innerHTML = `<span class="tt-jyutping">${escapeHtml(btn.dataset.reading)}</span>${escapeHtml(
    btn.dataset.meaning
  )}<div class="tt-breakdown">${escapeHtml(btn.dataset.decode)}</div>`;
  const rect = btn.getBoundingClientRect();
  const center = rect.left + rect.width / 2;
  tooltipEl.style.left = `${center}px`;
  tooltipEl.style.top = `${rect.top}px`;
  tooltipEl.classList.add("show");

  const half = tooltipEl.getBoundingClientRect().width / 2;
  const clamped = Math.max(half + 4, Math.min(window.innerWidth - half - 4, center));
  tooltipEl.style.left = `${clamped}px`;
});

listEl.addEventListener("mouseout", (e) => {
  const btn = e.target.closest(".radical-glyph");
  if (!btn) return;
  if (btn.contains(e.relatedTarget)) return;
  tooltipEl.classList.remove("show");
});
