import { renderNav, toast } from "./nav.js";
import {
  getWordLists,
  renameWordList,
  deleteWordList,
  removeWordFromList,
  getSettings,
  getCards,
  saveCards,
  getCard,
  todayStr,
} from "./storage.js";
import { speak } from "./speech.js";

renderNav("lists.html");

const settings = getSettings();
const params = new URLSearchParams(location.search);
const listId = params.get("id");

const headerEl = document.getElementById("list-header");
const wordsEl = document.getElementById("list-words");

function escapeHtml(s) {
  return String(s)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function currentList() {
  return getWordLists()[listId];
}

function render() {
  const list = currentList();
  if (!list) {
    headerEl.innerHTML = `<h1>List not found</h1>`;
    wordsEl.innerHTML = "";
    return;
  }

  headerEl.innerHTML = `
    <div style="display:flex; align-items:center; gap:10px; flex-wrap:wrap;">
      <h1 style="margin-bottom:0;">${escapeHtml(list.name)}</h1>
      <button class="icon-btn" id="rename-btn" title="Rename list">✏️</button>
      <button class="icon-btn" id="delete-btn" title="Delete list">🗑</button>
    </div>
    <p class="muted">${list.words.length} word${list.words.length === 1 ? "" : "s"}</p>`;

  document.getElementById("rename-btn").addEventListener("click", () => {
    const name = prompt("Rename list", list.name);
    if (name && name.trim()) {
      renameWordList(listId, name.trim());
      render();
    }
  });
  document.getElementById("delete-btn").addEventListener("click", () => {
    if (confirm(`Delete "${list.name}"? This can't be undone.`)) {
      deleteWordList(listId);
      location.href = "lists.html";
    }
  });

  if (!list.words.length) {
    wordsEl.innerHTML = `<div class="empty-state">No words in this list yet. Tap a word while reading or in a lesson and choose "+ list" to add one here.</div>`;
    return;
  }

  wordsEl.innerHTML = list.words
    .map(
      (word) => `
    <div class="card word-card" style="display:flex; align-items:center; gap:12px;">
      <div style="flex:1;">
        <div class="whead">
          <span class="hanzi">${word.traditional}</span>
          <span class="jyutping">${word.jyutping}</span>
        </div>
        <div class="english">${escapeHtml(word.english)}</div>
      </div>
      <button class="icon-btn play-word" data-traditional="${escapeHtml(word.traditional)}" title="Play audio">🔊</button>
      ${
        word.vocabId != null
          ? `<button class="btn ghost add-flash" data-vid="${word.vocabId}" style="font-size:0.8rem;">+ flashcard</button>`
          : ""
      }
      <button class="icon-btn remove-word" data-traditional="${escapeHtml(word.traditional)}" title="Remove from list">✕</button>
    </div>`
    )
    .join("");
}

wordsEl.addEventListener("click", (e) => {
  const playBtn = e.target.closest(".play-word");
  if (playBtn) {
    speak(playBtn.dataset.traditional, settings.voiceURI);
    return;
  }

  const flashBtn = e.target.closest(".add-flash");
  if (flashBtn) {
    const vid = Number(flashBtn.dataset.vid);
    const cards = getCards();
    const card = getCard(cards, vid);
    cards[vid] = { ...card, due: todayStr() };
    saveCards(cards);
    toast("Added to today's review queue");
    return;
  }

  const removeBtn = e.target.closest(".remove-word");
  if (removeBtn) {
    removeWordFromList(listId, removeBtn.dataset.traditional);
    render();
  }
});

render();
