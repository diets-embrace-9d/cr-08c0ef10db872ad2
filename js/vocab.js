import { renderNav } from "./nav.js";
import { VOCAB } from "../data/vocab.js";
import { RESTAURANT_VOCAB } from "../data/restaurant.js";
import { getSettings, getWordStatus, setWordStatus } from "./storage.js";
import { speak } from "./speech.js";

renderNav("vocab.html");

const settings = getSettings();
let tierFilter = "200";
let query = "";

const listEl = document.getElementById("vocab-list");
const searchEl = document.getElementById("search");
const tabsEl = document.getElementById("tier-tabs");
const restaurantNoteEl = document.getElementById("restaurant-note");

tabsEl.addEventListener("click", (e) => {
  const btn = e.target.closest("button[data-tier]");
  if (!btn) return;
  tierFilter = btn.dataset.tier;
  [...tabsEl.children].forEach((b) => b.classList.toggle("active", b === btn));
  restaurantNoteEl.style.display = tierFilter === "restaurant" ? "block" : "none";
  render();
});

searchEl.addEventListener("input", () => {
  query = searchEl.value.trim().toLowerCase();
  render();
});

function matchesTier(word) {
  if (tierFilter === "all") return true;
  return word.tier === Number(tierFilter);
}

function matchesQuery(word) {
  if (!query) return true;
  return (
    word.traditional.includes(query) ||
    word.jyutping.toLowerCase().includes(query) ||
    word.english.toLowerCase().includes(query)
  );
}

function render() {
  const statuses = getWordStatus();
  const isRestaurant = tierFilter === "restaurant";
  const pool = isRestaurant ? RESTAURANT_VOCAB : VOCAB;
  const words = pool.filter((w) => (isRestaurant || matchesTier(w)) && matchesQuery(w));

  if (!words.length) {
    listEl.innerHTML = `<div class="empty-state">No words match.</div>`;
    return;
  }

  listEl.innerHTML = words
    .map((w) => {
      const known = statuses[w.id] === "known";
      return `
      <div class="word-row" data-id="${w.id}">
        <div class="word-main">
          <span class="hanzi">${w.traditional}</span>
          <span class="jyutping">${w.jyutping}</span>
          <span class="english">${w.english}</span>
        </div>
        <div class="btn-row">
          <button class="icon-btn audio-btn" title="Play audio">🔊</button>
          <button class="icon-btn known-btn" title="Mark known">${known ? "⭐" : "☆"}</button>
        </div>
      </div>`;
    })
    .join("");
}

listEl.addEventListener("click", (e) => {
  const row = e.target.closest(".word-row");
  if (!row) return;
  const id = Number(row.dataset.id);
  const word = id >= 2000 ? RESTAURANT_VOCAB.find((w) => w.id === id) : VOCAB.find((w) => w.id === id);

  if (e.target.closest(".audio-btn")) {
    speak(word.traditional, settings.voiceURI);
  } else if (e.target.closest(".known-btn")) {
    const statuses = getWordStatus();
    const next = statuses[id] === "known" ? "learning" : "known";
    setWordStatus(id, next);
    render();
  }
});

render();
