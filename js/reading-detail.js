import { renderNav, toast } from "./nav.js";
import { PASSAGES } from "../data/passages.js";
import { VOCAB } from "../data/vocab.js";
import { getSettings, getCards, saveCards, getCard, todayStr } from "./storage.js";
import { speak } from "./speech.js";
import { wordInfoHtml, wireWordListControls } from "./wordinfo-ui.js";

renderNav("reading.html");

const params = new URLSearchParams(location.search);
const passage = PASSAGES.find((p) => p.id === params.get("id"));
const settings = getSettings();

const titleEl = document.getElementById("title");
const passageEl = document.getElementById("passage");

function escapeHtml(s) {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

// Renders a sentence's text with each `words` entry as a clickable token,
// while filling the gaps between them (punctuation, spaces — anything not
// captured in `words`) back in as plain, non-clickable text. Deriving this
// from `s.text` rather than requiring punctuation in `words` itself means
// existing passages don't need their data touched to stop losing commas
// and question marks.
function renderSentenceHtml(s) {
  const text = s.text;
  let cursor = 0;
  let html = "";
  s.words.forEach((w, wi) => {
    const idx = text.indexOf(w.traditional, cursor);
    if (idx < 0) return; // shouldn't happen, but don't crash the render
    if (idx > cursor) html += escapeHtml(text.slice(cursor, idx));
    html += `<span class="word-token" data-wi="${wi}">${escapeHtml(w.traditional)}</span>`;
    cursor = idx + w.traditional.length;
  });
  if (cursor < text.length) html += escapeHtml(text.slice(cursor));
  return html;
}

if (!passage) {
  titleEl.textContent = "Passage not found";
} else {
  titleEl.innerHTML = `${passage.title} <span class="muted">${passage.englishTitle}</span><span class="level-badge">Level ${passage.level}</span> <button class="icon-btn play-title" title="Play title" style="vertical-align:middle;">🔊</button>`;
  document.querySelector(".play-title").addEventListener("click", () => {
    speak(passage.title, settings.voiceURI);
  });

  passageEl.innerHTML = passage.sentences
    .map(
      (s, si) => `
    <div class="sentence-block" data-si="${si}">
      <div class="passage-text">
        ${renderSentenceHtml(s)}
        <button class="icon-btn play-sentence" title="Play sentence" style="vertical-align:middle;">🔊</button>
      </div>
      <div class="reveal-info"></div>
    </div>`
    )
    .join("");

  passageEl.addEventListener("click", (e) => {
    const block = e.target.closest(".sentence-block");
    if (!block) return;
    const si = Number(block.dataset.si);
    const sentence = passage.sentences[si];

    if (e.target.closest(".play-sentence")) {
      speak(sentence.text, settings.voiceURI);
      return;
    }

    const token = e.target.closest(".word-token");
    if (token) {
      const wi = Number(token.dataset.wi);
      const w = sentence.words[wi];
      token.classList.add("revealed");
      const info = block.querySelector(".reveal-info");
      const vocabMatch = VOCAB.find((v) => v.traditional === w.traditional);
      info.innerHTML = wordInfoHtml({ traditional: w.traditional, jyutping: w.jyutping, english: w.english, vocabId: vocabMatch?.id ?? null });
      return;
    }
  });

  wireWordListControls(passageEl, {
    voiceURI: settings.voiceURI,
    onFlashAdd: (vid) => {
      const cards = getCards();
      const card = getCard(cards, vid);
      cards[vid] = { ...card, due: todayStr() };
      saveCards(cards);
      toast("Added to today's review queue");
    },
  });
}
