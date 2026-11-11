import { renderNav } from "./nav.js";
import { WS_CATEGORIES } from "../data/written-spoken.js";
import { getSettings } from "./storage.js";
import { escapeHtml, pairHtml, matchesQuery, wirePlayButtons } from "./written-ui.js";

renderNav("written.html");

const settings = getSettings();
const params = new URLSearchParams(location.search);
const catId = params.get("id");
const index = WS_CATEGORIES.findIndex((c) => c.id === catId);
const cat = index >= 0 ? WS_CATEGORIES[index] : null;

const titleEl = document.getElementById("ws-title");
const blurbEl = document.getElementById("ws-blurb");
const searchEl = document.getElementById("ws-search");
const listEl = document.getElementById("ws-list");
const countEl = document.getElementById("ws-count");
const hideJyutpingEl = document.getElementById("ws-hide-jyutping");
const navEl = document.getElementById("ws-nav");

if (!cat) {
  titleEl.textContent = "Section not found";
  searchEl.style.display = "none";
  document.querySelector(".ws-toggle").style.display = "none";
} else {
  document.title = `Cantonese Reader — ${cat.name}`;
  titleEl.textContent = cat.name;
  blurbEl.textContent = cat.blurb;

  renderNavRow();
  render();

  searchEl.addEventListener("input", render);
  hideJyutpingEl.addEventListener("change", () => {
    listEl.classList.toggle("hide-jyutping", hideJyutpingEl.checked);
  });
  wirePlayButtons(listEl, settings.voiceURI);
}

function render() {
  const query = searchEl.value.trim().toLowerCase();
  const pairs = cat.pairs.filter((p) => matchesQuery(p, query));

  listEl.innerHTML = pairs.length
    ? `<div class="card ws-card">
        <div class="ws-head">
          <div>Spoken 口語</div>
          <div></div>
          <div>Written 書面語</div>
        </div>
        ${pairs.map(pairHtml).join("")}
      </div>`
    : `<div class="empty-state">No matches for “${escapeHtml(searchEl.value.trim())}”.</div>`;

  countEl.textContent = pairs.length ? `${pairs.length} pair${pairs.length === 1 ? "" : "s"}` : "";
}

function renderNavRow() {
  const prev = WS_CATEGORIES[index - 1];
  const next = WS_CATEGORIES[index + 1];
  navEl.innerHTML = `
    ${
      prev
        ? `<a class="btn ghost" href="written-section.html?id=${encodeURIComponent(prev.id)}">&larr; ${escapeHtml(prev.name)}</a>`
        : `<span></span>`
    }
    ${
      next
        ? `<a class="btn" href="written-section.html?id=${encodeURIComponent(next.id)}">${escapeHtml(next.name)} &rarr;</a>`
        : `<a class="btn" href="written.html">Done &rarr;</a>`
    }`;
}
