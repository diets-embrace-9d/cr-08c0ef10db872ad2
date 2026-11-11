import { renderNav } from "./nav.js";
import { PASSAGES } from "../data/passages.js";
import { REALISTIC_READINGS } from "../data/realistic.js";
import { getSettings } from "./storage.js";
import { speak } from "./speech.js";

renderNav("reading.html");

const settings = getSettings();
const listEl = document.getElementById("passage-list");
const realisticListEl = document.getElementById("realistic-list");

function cardRow(href, title, englishTitle, level) {
  return `
  <div class="card" style="display:flex; align-items:center; gap:10px;">
    <a href="${href}" style="flex:1; text-decoration:none; color:inherit;">
      <strong>${title}</strong> <span class="muted">${englishTitle}</span>
      <span class="level-badge">Level ${level}</span>
    </a>
    <button class="icon-btn play-title" data-title="${encodeURIComponent(title)}" title="Play title" style="flex-shrink:0;">🔊</button>
  </div>`;
}

listEl.innerHTML = PASSAGES.map((p) => cardRow(`reading-detail.html?id=${p.id}`, p.title, p.englishTitle, p.level)).join("");

realisticListEl.innerHTML = REALISTIC_READINGS.map((r) =>
  cardRow(`realistic-detail.html?id=${r.id}`, r.title, r.englishTitle, r.level)
).join("");

document.addEventListener("click", (e) => {
  const btn = e.target.closest(".play-title");
  if (!btn) return;
  speak(decodeURIComponent(btn.dataset.title), settings.voiceURI);
});
