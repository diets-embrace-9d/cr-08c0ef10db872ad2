import { renderNav, toast } from "./nav.js";
import { getCourse, getLesson, getWordById } from "../data/lessons.js";
import { buildExamplePair } from "./examples.js";
import { getSettings, getCards, saveCards, getCard, todayStr } from "./storage.js";
import { speakHighlighted, stopSpeaking } from "./speech.js";
import { segmentVocab } from "./vocab-segment.js";
import { wordInfoHtml, wireWordListControls } from "./wordinfo-ui.js";

renderNav("lessons.html");

const settings = getSettings();
const params = new URLSearchParams(location.search);
const courseId = params.get("course");
const lessonNumber = Number(params.get("lesson"));
const course = getCourse(courseId);
const lesson = getLesson(courseId, lessonNumber);

const backLink = document.getElementById("back-link");
const titleEl = document.getElementById("reading-title");
const descEl = document.getElementById("reading-desc");
const listEl = document.getElementById("reading-list");

let sentences = [];

if (!course || !lesson) {
  titleEl.textContent = "Lesson not found";
} else {
  backLink.href = `lesson-detail.html?course=${course.id}&lesson=${lesson.number}`;
  titleEl.textContent = `Reading Practice: ${lesson.name}`;
  descEl.textContent = course.title;

  // Only "Sentence 2" from each word — the one written to lean on other
  // vocabulary rather than restate the word's own meaning, which makes a
  // better standalone reading passage than "Sentence 1" would.
  sentences = lesson.ids
    .map((id) => getWordById(id))
    .filter(Boolean)
    .map((word) => buildExamplePair(word)[1])
    .filter(Boolean);

  if (!sentences.length) {
    listEl.innerHTML = `<p class="muted">No sentences available for this lesson yet.</p>`;
  } else {
    listEl.innerHTML = sentences.map((ex, i) => renderSentence(ex, i)).join("");
    wireAudioButtons();
  }
}

// Wraps each vocab-matched run of characters in a clickable .word-token
// (for tap-to-reveal), while every character — clickable or not — still
// gets its own .char span so speech highlight sync keeps working exactly
// as before.
function renderTokenSpans(text) {
  return segmentVocab(text)
    .map((t) => {
      const chars = [...t.text]
        .map((ch, j) => `<span class="char" data-i="${t.start + j}">${ch}</span>`)
        .join("");
      if (!t.vocab) return chars;
      return `<span class="word-token" data-start="${t.start}" data-len="${t.len}">${chars}</span>`;
    })
    .join("");
}

function renderSentence(ex, i) {
  const containerId = `read-${i}`;
  return `
    <div class="card sentence-card" data-i="${i}">
      <div style="display:flex; align-items:flex-start; gap:8px;">
        <div class="sentence-zh" id="${containerId}" style="font-size:1.4rem;">${renderTokenSpans(ex.zh)}</div>
        <button class="icon-btn play-btn" data-target="${containerId}" data-text="${encodeURIComponent(ex.zh)}" title="Play sentence" style="flex-shrink:0;">🔊</button>
        <button class="icon-btn stop-btn" title="Stop" style="flex-shrink:0;">⏹</button>
      </div>
      <div class="reveal-info"></div>
    </div>`;
}

function wireAudioButtons() {
  listEl.addEventListener("click", (e) => {
    if (e.target.closest(".stop-btn")) {
      stopSpeaking();
      return;
    }

    const token = e.target.closest(".word-token");
    if (token) {
      const card = token.closest(".sentence-card");
      const i = Number(card.dataset.i);
      const start = Number(token.dataset.start);
      const len = Number(token.dataset.len);
      const tokens = segmentVocab(sentences[i].zh);
      const match = tokens.find((t) => t.start === start && t.len === len);
      if (!match?.vocab) return;
      token.classList.add("revealed");
      card.querySelector(".reveal-info").innerHTML = wordInfoHtml({ traditional: match.text, jyutping: match.vocab.jyutping, english: match.vocab.english, vocabId: match.vocab.id });
      return;
    }

    const btn = e.target.closest(".play-btn");
    if (!btn) return;
    const containerId = btn.dataset.target;
    const text = decodeURIComponent(btn.dataset.text);
    const container = document.getElementById(containerId);
    const spans = container ? [...container.querySelectorAll(".char")] : [];

    spans.forEach((s) => s.classList.remove("speaking"));
    speakHighlighted(text, settings.voiceURI, {
      onChar: (i) => {
        spans.forEach((s) => s.classList.remove("speaking"));
        const span = spans[i];
        if (span) span.classList.add("speaking");
      },
      onDone: () => {
        spans.forEach((s) => s.classList.remove("speaking"));
      },
    });
  });

  wireWordListControls(listEl, {
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
