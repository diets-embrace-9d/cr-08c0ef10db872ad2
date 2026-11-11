import { renderNav, toast } from "./nav.js";
import { REALISTIC_READINGS } from "../data/realistic.js";
import { getSettings, getCards, saveCards, getCard, todayStr } from "./storage.js";
import { speak } from "./speech.js";
import { segmentText, lookupWord } from "./dictionary.js";
import { wordInfoHtml, wireWordListControls } from "./wordinfo-ui.js";

renderNav("reading.html");

const params = new URLSearchParams(location.search);
const reading = REALISTIC_READINGS.find((r) => r.id === params.get("id"));
const settings = getSettings();

const titleEl = document.getElementById("title");
const subtitleEl = document.getElementById("subtitle");
const menuEl = document.getElementById("menu");

function escapeHtml(s) {
  return String(s)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

// Renders `text` as clickable word-tokens using the full CC-Canto/CEDICT
// dictionary (via segmentText), not just curated lesson vocab — this is
// what makes every word on a realistic menu tappable, not only the ones
// that happen to have been "taught".
function renderTokens(text, blockIdx) {
  return segmentText(text)
    .map((t) => {
      const safe = escapeHtml(t.text);
      if (!t.clickable) return safe;
      return `<span class="word-token${t.known ? "" : " unknown"}" data-block="${blockIdx}" data-start="${t.start}" data-len="${t.len}">${safe}</span>`;
    })
    .join("");
}

if (!reading) {
  titleEl.textContent = "Reading not found";
} else {
  titleEl.innerHTML = `${reading.title} <span class="muted">${reading.englishTitle}</span><span class="level-badge">Level ${reading.level}</span>`;
  subtitleEl.textContent = "Tap any word to reveal its pronunciation and meaning — every word here is readable, not just what's been taught in lessons.";

  menuEl.innerHTML = reading.blocks
    .map((block, i) => {
      const playBtn = `<button class="icon-btn play-block" data-idx="${i}" title="Play">🔊</button>`;
      let inner = "";
      switch (block.kind) {
        case "shop-name":
          inner = `<h2 class="menu-shop-name">${renderTokens(block.text, i)} ${playBtn}</h2>`;
          break;
        case "tagline":
          inner = `<p class="menu-tagline">${renderTokens(block.text, i)} ${playBtn}</p>`;
          break;
        case "section":
          inner = `<h3 class="menu-section">${renderTokens(block.text, i)} ${playBtn}</h3>`;
          break;
        case "item":
          inner = `
            <div class="menu-item">
              <span class="menu-item-zh">${renderTokens(block.zh, i)}</span>
              <span class="menu-item-price">${escapeHtml(block.price)}</span>
              ${playBtn}
            </div>`;
          break;
        case "note":
          inner = `<p class="menu-note">${renderTokens(block.text, i)} ${playBtn}</p>`;
          break;
        default:
          inner = "";
      }
      return `<div class="menu-block" data-idx="${i}">${inner}<div class="reveal-info"></div></div>`;
    })
    .join("");

  function blockText(idx) {
    const block = reading.blocks[idx];
    return block.kind === "item" ? block.zh : block.text;
  }

  menuEl.addEventListener("click", (e) => {
    const playBtn = e.target.closest(".play-block");
    if (playBtn) {
      speak(blockText(Number(playBtn.dataset.idx)), settings.voiceURI);
      return;
    }

    const token = e.target.closest(".word-token");
    if (token) {
      const idx = Number(token.dataset.block);
      const start = Number(token.dataset.start);
      const len = Number(token.dataset.len);
      const text = blockText(idx);
      const wordText = [...text].slice(start, start + len).join("");
      const info = lookupWord(wordText);
      const block = e.target.closest(".menu-block");
      const infoEl = block.querySelector(".reveal-info");
      if (!info) {
        infoEl.innerHTML = `<span class="muted">No dictionary entry found for "${escapeHtml(wordText)}".</span>`;
        return;
      }
      token.classList.add("revealed");
      infoEl.innerHTML = wordInfoHtml({ traditional: wordText, jyutping: info.jyutping, english: info.english, vocabId: info.id });
      return;
    }
  });

  wireWordListControls(menuEl, {
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
