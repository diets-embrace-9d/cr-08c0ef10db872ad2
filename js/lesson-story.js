import { renderNav, toast } from "./nav.js";
import { getCourse, getLesson } from "../data/lessons.js";
import { STORIES } from "../data/stories.js";
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
const titleEl = document.getElementById("story-title");
const descEl = document.getElementById("story-desc");
const tabsEl = document.getElementById("story-tabs");
const listEl = document.getElementById("story-list");
const playAllBtn = document.getElementById("play-all-btn");
const stopBtn = document.getElementById("stop-btn");

const PAUSE_BETWEEN_MS = 400;

let stories = []; // array of sentence-arrays — one per story set
let storyIndex = 0;
let sentences = [];
let playingAll = false;
let playToken = 0; // bumped on stop so a stale chain of onDone callbacks halts

if (!course || !lesson) {
  titleEl.textContent = "Lesson not found";
  playAllBtn.disabled = true;
} else {
  backLink.href = `lesson-detail.html?course=${course.id}&lesson=${lesson.number}`;
  titleEl.textContent = `Story: ${lesson.name}`;
  descEl.textContent = course.title;

  stories = STORIES[`${course.id}:${lesson.number}`] || [];

  if (!stories.length) {
    listEl.innerHTML = `<p class="muted">No story written for this lesson yet.</p>`;
    playAllBtn.disabled = true;
  } else {
    if (stories.length > 1) {
      tabsEl.innerHTML = stories.map((_, i) => `<button data-index="${i}"${i === 0 ? ' class="active"' : ""}>Story ${i + 1}</button>`).join("");
      tabsEl.addEventListener("click", (e) => {
        const btn = e.target.closest("button[data-index]");
        if (!btn) return;
        playToken += 1;
        playingAll = false;
        stopSpeaking();
        storyIndex = Number(btn.dataset.index);
        tabsEl.querySelectorAll("button").forEach((b) => b.classList.toggle("active", b === btn));
        renderStory();
      });
    }
    wireAudioButtons();
    playAllBtn.addEventListener("click", playAll);
    stopBtn.addEventListener("click", () => {
      playToken += 1;
      playingAll = false;
      stopSpeaking();
      clearAllHighlights();
    });
    renderStory();
  }
}

function renderStory() {
  sentences = stories[storyIndex];
  listEl.innerHTML = sentences.map((ex, i) => renderSentence(ex, i)).join("");
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
  const containerId = `story-${i}`;
  return `
    <div class="card sentence-card" id="story-card-${i}" data-i="${i}">
      <div style="display:flex; align-items:flex-start; gap:8px;">
        <div class="sentence-zh" id="${containerId}" style="font-size:1.4rem;">${renderTokenSpans(ex.zh)}</div>
        <button class="icon-btn play-btn" data-index="${i}" title="Play sentence" style="flex-shrink:0;">🔊</button>
        <button class="icon-btn stop-btn" title="Stop" style="flex-shrink:0;">⏹</button>
      </div>
      <div class="reveal-info"></div>
    </div>`;
}

function highlightChar(containerId, i) {
  const container = document.getElementById(containerId);
  if (!container) return;
  container.querySelectorAll(".char.speaking").forEach((s) => s.classList.remove("speaking"));
  const span = container.querySelector(`.char[data-i="${i}"]`);
  if (span) span.classList.add("speaking");
}

function clearHighlight(containerId) {
  const container = document.getElementById(containerId);
  if (!container) return;
  container.querySelectorAll(".char.speaking").forEach((s) => s.classList.remove("speaking"));
}

function clearAllHighlights() {
  sentences.forEach((_, i) => clearHighlight(`story-${i}`));
  document.querySelectorAll(".sentence-card").forEach((c) => c.classList.remove("story-active"));
}

function speakSentence(i, onDone) {
  const containerId = `story-${i}`;
  document.querySelectorAll(".sentence-card").forEach((c) => c.classList.remove("story-active"));
  document.getElementById(`story-card-${i}`)?.classList.add("story-active");
  speakHighlighted(sentences[i].zh, settings.voiceURI, {
    onChar: (idx) => highlightChar(containerId, idx),
    onDone: () => {
      clearHighlight(containerId);
      onDone?.();
    },
  });
}

function playAll() {
  playToken += 1;
  const token = playToken;
  playingAll = true;
  let i = 0;
  function next() {
    if (token !== playToken || i >= sentences.length) {
      playingAll = false;
      clearAllHighlights();
      return;
    }
    const idx = i;
    i += 1;
    speakSentence(idx, () => {
      if (token !== playToken) return;
      setTimeout(next, PAUSE_BETWEEN_MS);
    });
  }
  next();
}

function wireAudioButtons() {
  listEl.addEventListener("click", (e) => {
    if (e.target.closest(".stop-btn")) {
      playToken += 1;
      playingAll = false;
      stopSpeaking();
      clearAllHighlights();
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
    playToken += 1; // interrupt any whole-story playback
    playingAll = false;
    const i = Number(btn.dataset.index);
    speakSentence(i);
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
