import { renderNav } from "./nav.js";
import { WS_CATEGORIES } from "../data/written-spoken.js";
import { getSettings } from "./storage.js";
import { escapeHtml, pairHtml, matchesQuery, wirePlayButtons } from "./written-ui.js";

renderNav("written.html");

const settings = getSettings();
const searchEl = document.getElementById("ws-search");
const resultsEl = document.getElementById("ws-search-results");
const sectionsEl = document.getElementById("ws-sections");

const totalPairs = WS_CATEGORIES.reduce((n, c) => n + c.pairs.length, 0);

function renderSectionCards() {
  sectionsEl.innerHTML = `
    <h2>Sections</h2>
    <p class="muted" style="margin:-4px 0 10px; font-size:0.88rem;">
      ${totalPairs} pairs in all, ordered so the differences you'll hit most often come first.
    </p>
    ${WS_CATEGORIES.map(
      (c, i) => `
      <a class="card ws-section-card" href="written-section.html?id=${encodeURIComponent(c.id)}">
        <div class="ws-section-num">${i + 1}</div>
        <div class="ws-section-body">
          <div class="ws-section-title">${escapeHtml(c.name)}</div>
          <div class="muted ws-section-blurb">${escapeHtml(c.blurb)}</div>
        </div>
        <div class="ws-section-count">${c.pairs.length}<span>pairs</span></div>
      </a>`
    ).join("")}`;
}

// Searching from the landing page looks across every section at once, so you
// don't have to guess which one a word lives in.
function renderSearch() {
  const query = searchEl.value.trim().toLowerCase();
  if (!query) {
    resultsEl.innerHTML = "";
    sectionsEl.style.display = "";
    return;
  }
  sectionsEl.style.display = "none";

  let shown = 0;
  const sections = WS_CATEGORIES.map((c) => {
    const pairs = c.pairs.filter((p) => matchesQuery(p, query));
    if (!pairs.length) return "";
    shown += pairs.length;
    return `
      <section class="ws-section">
        <h2><a href="written-section.html?id=${encodeURIComponent(c.id)}">${escapeHtml(c.name)}</a></h2>
        <div class="card ws-card">${pairs.map(pairHtml).join("")}</div>
      </section>`;
  }).join("");

  resultsEl.innerHTML = sections
    ? `<p class="muted" style="font-size:0.8rem; margin:10px 0 0;">${shown} match${
        shown === 1 ? "" : "es"
      } across all sections</p>${sections}`
    : `<div class="empty-state">No matches for “${escapeHtml(searchEl.value.trim())}”.</div>`;
}

searchEl.addEventListener("input", renderSearch);
wirePlayButtons(resultsEl, settings.voiceURI);

renderSectionCards();
