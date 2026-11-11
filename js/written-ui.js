// Shared rendering for spoken-vs-written pairs, used by both the landing
// page (search results across all sections) and the per-section pages.
import { speak } from "./speech.js";

export function escapeHtml(s) {
  return String(s)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

// Some cells hold a placeholder rather than a real word (particles with no
// written counterpart, or the false-friends rows where the "word" is a gloss
// like "走 = to leave"). Only the Chinese part is worth speaking, and a
// dash/placeholder shouldn't get a play button at all.
function speakableText(raw) {
  if (!raw || raw === "—" || raw.startsWith("（")) return null;
  const beforeGloss = raw.split("=")[0].trim();
  const firstAlternative = beforeGloss.split("/")[0].trim();
  return firstAlternative || null;
}

function playBtnHtml(text, label) {
  const speakable = speakableText(text);
  if (!speakable) return "";
  return `<button type="button" class="icon-btn ws-play" data-word="${escapeHtml(
    speakable
  )}" title="Play ${label}">🔊</button>`;
}

function cellHtml(word, jyut, side) {
  return `
    <div class="ws-cell ws-${side}">
      <div class="ws-word-row">
        <span class="ws-word">${escapeHtml(word)}</span>
        ${playBtnHtml(word, side)}
      </div>
      <div class="jyutping ws-jyut">${escapeHtml(jyut)}</div>
    </div>`;
}

// One side of the example sentence pair. `en` is rendered inline only when
// the two sides mean different things (the false friends) — otherwise a
// single shared gloss sits under both, which reads much less repetitively.
function exSideHtml(tag, zh, jyut, side, en) {
  return `
    <div class="ws-ex-side ws-ex-${side}">
      <div class="ws-ex-line">
        <span class="ws-ex-tag">${tag}</span>
        <span class="ws-ex-zh">${escapeHtml(zh)}</span>
        ${playBtnHtml(zh, "example")}
      </div>
      <div class="jyutping ws-ex-jyut">${escapeHtml(jyut)}</div>
      ${en ? `<div class="ws-ex-en-split">${escapeHtml(en)}</div>` : ""}
    </div>`;
}

function exampleHtml(ex) {
  if (!ex) return "";
  const split = Boolean(ex.enW);
  return `
    <div class="ws-ex">
      ${exSideHtml("口語", ex.s, ex.sj, "spoken", split ? ex.en : "")}
      ${exSideHtml("書面", ex.w, ex.wj, "written", split ? ex.enW : "")}
      ${split ? "" : `<div class="ws-ex-en">${escapeHtml(ex.en)}</div>`}
    </div>`;
}

export function pairHtml(p) {
  const note = p.note ? `<div class="ws-note muted">${escapeHtml(p.note)}</div>` : "";
  // On false-friend rows both cells already spell out their own sense
  // ("走 = to leave" / "走 = to walk"), so the shared gloss line would just
  // repeat the bare character. Those rows are exactly the ones carrying a
  // split example (`enW`), so use that as the signal to drop it.
  const gloss = p.ex?.enW ? "" : `<div class="ws-en">${escapeHtml(p.en)}</div>`;
  return `
    <div class="ws-row">
      <div class="ws-pair">
        ${cellHtml(p.s, p.sj, "spoken")}
        <div class="ws-arrow" aria-hidden="true">→</div>
        ${cellHtml(p.w, p.wj, "written")}
      </div>
      ${gloss}
      ${note}
      ${exampleHtml(p.ex)}
    </div>`;
}

export function matchesQuery(p, query) {
  if (!query) return true;
  const ex = p.ex || {};
  const haystack = [p.s, p.sj, p.w, p.wj, p.en, p.note || "", ex.s || "", ex.sj || "", ex.w || "", ex.wj || "", ex.en || "", ex.enW || ""]
    .join(" ")
    .toLowerCase();
  return haystack.includes(query);
}

// Delegated click handling for every play button rendered inside `root`.
export function wirePlayButtons(root, voiceURI) {
  root.addEventListener("click", (e) => {
    const btn = e.target.closest(".ws-play");
    if (!btn) return;
    speak(btn.dataset.word, voiceURI);
  });
}
