import { renderNav, toast } from "./nav.js";
import { getWordLists, createWordList, deleteWordList } from "./storage.js";

renderNav("lists.html");

const containerEl = document.getElementById("lists-container");
const nameInput = document.getElementById("new-list-name");
const createBtn = document.getElementById("new-list-btn");

function render() {
  const lists = Object.values(getWordLists()).sort((a, b) => b.createdAt.localeCompare(a.createdAt));

  if (!lists.length) {
    containerEl.innerHTML = `<div class="empty-state">No lists yet. Tap a word while reading or in a lesson and choose "+ list" to start one — or create one above.</div>`;
    return;
  }

  containerEl.innerHTML = lists
    .map(
      (l) => `
    <div class="card" style="display:flex; align-items:center; gap:10px;">
      <a href="list-detail.html?id=${l.id}" style="flex:1; text-decoration:none; color:inherit;">
        <strong>${escapeHtml(l.name)}</strong>
        <span class="muted">${l.words.length} word${l.words.length === 1 ? "" : "s"}</span>
      </a>
      <button class="icon-btn delete-list" data-id="${l.id}" title="Delete list">🗑</button>
    </div>`
    )
    .join("");
}

function escapeHtml(s) {
  return String(s)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

createBtn.addEventListener("click", () => {
  const name = nameInput.value.trim();
  if (!name) {
    nameInput.focus();
    return;
  }
  createWordList(name);
  nameInput.value = "";
  toast(`Created "${name}"`);
  render();
});

nameInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter") createBtn.click();
});

containerEl.addEventListener("click", (e) => {
  const btn = e.target.closest(".delete-list");
  if (!btn) return;
  const lists = getWordLists();
  const list = lists[btn.dataset.id];
  if (!list) return;
  if (confirm(`Delete "${list.name}"? This can't be undone.`)) {
    deleteWordList(btn.dataset.id);
    render();
  }
});

render();
