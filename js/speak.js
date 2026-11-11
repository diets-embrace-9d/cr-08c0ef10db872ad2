import { renderNav, toast } from "./nav.js";
import { getSettings, saveSettings, getSavedTexts, isTextSaved, addSavedText, removeSavedText } from "./storage.js";
import { speakHighlighted, stopSpeaking, pauseSpeaking, resumeSpeaking } from "./speech.js";
import { lookupWord, breakdownChars, segmentText, sourceLabel } from "./dictionary.js";

renderNav("speak.html");

const settings = getSettings();
const inputEl = document.getElementById("tts-input");
const speakAllBtn = document.getElementById("speak-all-btn");
const pauseBtn = document.getElementById("pause-btn");
const stopBtn = document.getElementById("stop-btn");
const clearBtn = document.getElementById("clear-btn");
const rateSlider = document.getElementById("rate-slider");
const rateValueEl = document.getElementById("rate-value");
const outputCard = document.getElementById("tts-output");
const textEl = document.getElementById("tts-text");
const wordInfoEl = document.getElementById("tts-word-info");
const tooltipEl = document.getElementById("tts-tooltip");
const saveTextBtn = document.getElementById("save-text-btn");
const savedListEl = document.getElementById("saved-list");
const savedCountEl = document.getElementById("saved-count");

let rate = settings.speakRate;
let paused = false;

rateSlider.value = rate;
rateValueEl.textContent = `${rate.toFixed(2)}x`;

rateSlider.addEventListener("input", () => {
  rate = Number(rateSlider.value);
  rateValueEl.textContent = `${rate.toFixed(2)}x`;
  settings.speakRate = rate;
  saveSettings(settings);
});

function unpause() {
  paused = false;
  pauseBtn.textContent = "⏸ Pause";
}

pauseBtn.addEventListener("click", () => {
  if (!paused) {
    paused = true;
    pauseBtn.textContent = "▶ Resume";
    pauseSpeaking();
  } else {
    unpause();
    resumeSpeaking();
  }
});

function escapeHtml(s) {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function breakdownHtmlCompact(parts) {
  return parts
    .map((p) => `<span class="tt-jyutping">${p.ch} ${p.info.jyutping}</span>${p.info.english}`)
    .join(" · ");
}

function breakdownHtmlFull(parts) {
  return parts
    .map(
      (p) =>
        `<button type="button" class="breakdown-char" data-ch="${p.ch}"><b>${p.ch}</b> ${p.info.jyutping} — ${p.info.english}</button>`
    )
    .join("");
}

let currentText = "";

function renderText(text) {
  currentText = text;
  wordInfoEl.textContent = "";

  if (!text.trim()) {
    outputCard.style.display = "none";
    return;
  }

  const tokens = segmentText(text);
  textEl.innerHTML = tokens
    .map((t) => {
      const chars = [...t.text]
        .map((ch, j) => `<span class="char" data-i="${t.start + j}">${escapeHtml(ch)}</span>`)
        .join("");
      if (!t.clickable) return chars;
      return `<button type="button" class="tts-word${t.known ? " known" : ""}" data-start="${t.start}" data-len="${t.len}">${chars}</button>`;
    })
    .join("");
  outputCard.style.display = "block";
}

function highlightGlobalIndex(globalIndex) {
  const prev = textEl.querySelector(".char.speaking");
  if (prev) prev.classList.remove("speaking");
  const span = textEl.querySelector(`.char[data-i="${globalIndex}"]`);
  if (span) span.classList.add("speaking");
}

function clearHighlight() {
  const prev = textEl.querySelector(".char.speaking");
  if (prev) prev.classList.remove("speaking");
}

// The save option belongs to the text that was just spoken, so it hides
// again as soon as the text is edited.
function showSaveButton() {
  const text = currentText.trim();
  const saved = isTextSaved(text);
  saveTextBtn.hidden = false;
  saveTextBtn.disabled = saved;
  saveTextBtn.textContent = saved ? "✓ Saved" : "☆ Save to list";
}

// Shown in the viewer's own locale and time zone, e.g. "Nov 11, 2026, 9:45 AM".
function formatSavedAt(savedAt) {
  if (!savedAt) return "";
  // Older entries only stored a date; show it as-is rather than letting
  // UTC parsing shift it to the previous day.
  if (/^\d{4}-\d{2}-\d{2}$/.test(savedAt)) {
    const [y, m, d] = savedAt.split("-").map(Number);
    return new Date(y, m - 1, d).toLocaleDateString(undefined, { dateStyle: "medium" });
  }
  const date = new Date(savedAt);
  return Number.isNaN(date.getTime()) ? "" : date.toLocaleString(undefined, { dateStyle: "medium", timeStyle: "short" });
}

function renderSavedTexts() {
  const items = getSavedTexts();
  savedCountEl.textContent = items.length ? String(items.length) : "";
  savedListEl.innerHTML = items.length
    ? items
        .map(
          (t) => `
      <div class="card saved-text" data-id="${t.id}">
        <div class="saved-text-main">
          <button type="button" class="saved-text-body" title="Load into the box">${escapeHtml(t.text)}</button>
          <div class="saved-text-date muted">Added ${escapeHtml(formatSavedAt(t.savedAt))}</div>
        </div>
        <div class="saved-text-actions">
          <button type="button" class="icon-btn saved-play" title="Play">🔊</button>
          <button type="button" class="icon-btn saved-delete" title="Remove from list">✕</button>
        </div>
      </div>`
        )
        .join("")
    : `<div class="empty-state">Nothing saved yet. Press Speak all, then Save to list.</div>`;
}

function loadText(text) {
  unpause();
  stopSpeaking();
  inputEl.value = text;
  renderText(text);
  inputEl.scrollIntoView({ behavior: "smooth", block: "center" });
}

function speakCurrent() {
  if (!currentText.trim()) return;
  unpause();
  speakHighlighted(currentText, settings.voiceURI, {
    rate,
    onChar: highlightGlobalIndex,
    onDone: clearHighlight,
  });
  showSaveButton();
}

saveTextBtn.addEventListener("click", () => {
  const text = currentText.trim();
  if (!text) return;
  addSavedText(text);
  showSaveButton();
  renderSavedTexts();
  toast("Saved to list");
});

savedListEl.addEventListener("click", (e) => {
  const row = e.target.closest(".saved-text");
  if (!row) return;
  const item = getSavedTexts().find((t) => t.id === row.dataset.id);
  if (!item) return;
  if (e.target.closest(".saved-delete")) {
    removeSavedText(item.id);
    renderSavedTexts();
    if (item.text === currentText.trim()) showSaveButton();
    return;
  }
  loadText(item.text);
  if (e.target.closest(".saved-play")) speakCurrent();
});

inputEl.addEventListener("input", () => {
  saveTextBtn.hidden = true;
  renderText(inputEl.value);
});

clearBtn.addEventListener("click", () => {
  unpause();
  stopSpeaking();
  saveTextBtn.hidden = true;
  inputEl.value = "";
  renderText("");
  inputEl.focus();
});

speakAllBtn.addEventListener("click", speakCurrent);

stopBtn.addEventListener("click", () => {
  unpause();
  stopSpeaking();
  clearHighlight();
});

textEl.addEventListener("click", (e) => {
  const btn = e.target.closest(".tts-word");
  if (!btn) return;
  const start = Number(btn.dataset.start);
  const len = Number(btn.dataset.len);
  const wordText = [...currentText].slice(start, start + len).join("");

  const known = lookupWord(wordText);
  if (known) {
    const parts = breakdownChars(wordText);
    const breakdownHtml = parts.length
      ? `<div class="breakdown">${breakdownHtmlFull(parts)}</div>`
      : "";
    wordInfoEl.innerHTML = `<span style="color:var(--accent); font-weight:600;">${known.jyutping}</span> — ${known.english}${breakdownHtml}`;
  } else {
    wordInfoEl.innerHTML = "";
  }

  unpause();
  speakHighlighted(wordText, settings.voiceURI, {
    rate,
    onChar: (i) => highlightGlobalIndex(start + i),
    onDone: clearHighlight,
  });
});

wordInfoEl.addEventListener("click", (e) => {
  const btn = e.target.closest(".breakdown-char");
  if (!btn) return;
  unpause();
  speakHighlighted(btn.dataset.ch, settings.voiceURI, { rate });
});

// Hover tooltip: pronunciation + meaning + which word-tier it belongs to,
// for any recognized word. Uses one shared tooltip element repositioned
// over whichever word is currently hovered.
textEl.addEventListener("mouseover", (e) => {
  const btn = e.target.closest(".tts-word.known");
  if (!btn) return;
  const start = Number(btn.dataset.start);
  const len = Number(btn.dataset.len);
  const wordText = [...currentText].slice(start, start + len).join("");
  const info = lookupWord(wordText);
  if (!info) return;

  const parts = breakdownChars(wordText);
  const breakdownHtml = parts.length
    ? `<div class="tt-breakdown">${breakdownHtmlCompact(parts)}</div>`
    : "";
  tooltipEl.innerHTML = `<span class="tt-jyutping">${info.jyutping}</span>${info.english}<span class="tt-tag">${sourceLabel(info)}</span>${breakdownHtml}`;
  const rect = btn.getBoundingClientRect();
  const center = rect.left + rect.width / 2;
  tooltipEl.style.left = `${center}px`;
  tooltipEl.style.top = `${rect.top}px`;
  tooltipEl.classList.add("show");

  // Keep the tooltip on-screen for words near the left/right edge.
  const half = tooltipEl.getBoundingClientRect().width / 2;
  const clamped = Math.max(half + 4, Math.min(window.innerWidth - half - 4, center));
  tooltipEl.style.left = `${clamped}px`;
});

textEl.addEventListener("mouseout", (e) => {
  const btn = e.target.closest(".tts-word.known");
  if (!btn) return;
  if (btn.contains(e.relatedTarget)) return;
  tooltipEl.classList.remove("show");
});

renderSavedTexts();
