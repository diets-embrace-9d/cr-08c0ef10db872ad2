import { renderNav, toast } from "./nav.js";
import { VOCAB } from "../data/vocab.js";
import { RESTAURANT_VOCAB } from "../data/restaurant.js";
import { getLesson, getWordById } from "../data/lessons.js";
import {
  getCards,
  saveCards,
  getCard,
  getSettings,
  saveSettings,
  getCompletedLessons,
  todayStr,
  logReviewToday,
  logWrongAnswer,
  getWrongIdsSince,
} from "./storage.js";
import { schedule, isDue } from "./srs.js";
import { speak } from "./speech.js";
import { activeTierMax } from "./tiers.js";
import { buildExample } from "./examples.js";
import { shortEnglish, shuffle as sharedShuffle, pickDistractors } from "./quiz-distractors.js";

renderNav("review.html");

const cards = getCards();
const settings = getSettings();
const today = todayStr();

const area = document.getElementById("review-area");
const statusEl = document.getElementById("queue-status");
const scopeSelect = document.getElementById("scope-select");
const forceToggle = document.getElementById("force-review-toggle");
const testModeToggle = document.getElementById("test-mode-toggle");
const autoAdvanceToggle = document.getElementById("auto-advance-toggle");
const ALL_VOCAB = [...VOCAB, ...RESTAURANT_VOCAB];
let revealed = false;
let queue = [];
let emptyReason = "";
let scopePool = []; // current scope's vocab, used as the primary distractor pool in test mode
let currentTestQuestion = null; // the choices shown for queue[0] in test mode, cached for history peek

// Every card already answered this session, oldest first: { word, rating,
// test, choices?, selectedId? }. Lets "← Previous" show exactly what was
// shown before (test mode choices are randomized, so they're cached here
// rather than rebuilt) without re-scheduling it.
let history = [];
let peekIndex = null; // null = showing the live queue[0]; else an index into history

function completedScopeWords() {
  const completed = getCompletedLessons();
  const ids = new Set();
  for (const [key, done] of Object.entries(completed)) {
    if (!done) continue;
    const [courseId, lessonNumber] = key.split(":");
    const lesson = getLesson(courseId, Number(lessonNumber));
    if (lesson) lesson.ids.forEach((id) => ids.add(id));
  }
  return [...ids].map(getWordById).filter(Boolean);
}

const WRONG_SCOPE_DAYS = 7;

function wrongScopeWords() {
  // Anything logged wrong (flashcard "Again", a Review test-mode miss, or
  // a lesson test miss — see logWrongAnswer) in the last WRONG_SCOPE_DAYS
  // days, even if it's since been answered correctly — the point is extra
  // practice on things that gave trouble recently, not just right now.
  const ids = getWrongIdsSince(WRONG_SCOPE_DAYS);
  return ALL_VOCAB.filter((w) => ids.has(w.id));
}

function scopeVocab(scope) {
  switch (scope) {
    case "wrong":
      return wrongScopeWords();
    case "completed":
      return completedScopeWords();
    case "top200":
      return VOCAB.filter((w) => w.tier <= 200);
    case "top500":
      return VOCAB.filter((w) => w.tier <= 500);
    case "top1000":
      return VOCAB;
    case "restaurant":
      return RESTAURANT_VOCAB;
    case "auto":
    default: {
      const maxTier = activeTierMax(VOCAB, cards, settings);
      return VOCAB.filter((w) => w.tier <= maxTier).concat(
        settings.includeRestaurantPack ? RESTAURANT_VOCAB : []
      );
    }
  }
}

// Shown when the scope itself has no words at all (e.g. nothing marked
// complete yet). Different from "nothing due right now", which just means
// everything in this scope is already scheduled for a later date.
const EMPTY_SCOPE_REASONS = {
  wrong: "No wrong answers in the last 7 days — nice! Miss a word in Review or a lesson test and it'll show up here.",
  completed: "No completed lessons yet — mark a lesson complete to review its words here.",
  top200: "Top 200 has no words (unexpected).",
  top500: "Top 500 has no words (unexpected).",
  top1000: "Top 1000 has no words (unexpected).",
  restaurant: "The restaurant pack has no words (unexpected).",
  auto: "No words unlocked yet.",
};

// Note: "wrong" scope isn't listed here — it bypasses due-date filtering
// entirely (see buildQueue), so its queue is only ever empty when the
// scope itself has no words, which EMPTY_SCOPE_REASONS.wrong covers.
const NOTHING_DUE_REASONS = {
  completed: "Nothing from your completed lessons is due right now — great job staying on top of it! Check back later.",
  top200: "No Top 200 words due right now.",
  top500: "No Top 500 words due right now.",
  top1000: "No words due right now.",
  restaurant: "No restaurant words due right now.",
  auto: "No cards due right now.",
};

// Rebuilds the queue for the current scope/force settings, but reconciles
// with whatever's already in progress rather than starting over: cards
// already reviewed this session (tracked in `history`) never come back
// just because a checkbox or the scope dropdown changed, and anything
// still sitting mid-queue (e.g. an "again" card waiting to reappear)
// stays right where it is. Only genuinely new-to-this-session eligible
// words get appended.
function buildQueue() {
  const activeVocab = scopeVocab(settings.reviewScope);
  scopePool = activeVocab;
  // "Wrong recently" ignores due dates too, same as force review — the
  // word might already be rescheduled out days from a later correct
  // answer, but the whole point of this scope is deliberate extra practice.
  const eligible = forceToggle.checked || settings.reviewScope === "wrong"
    ? activeVocab
    : activeVocab.filter((w) => isDue(getCard(cards, w.id), today));

  const eligibleIds = new Set(eligible.map((w) => w.id));
  const doneIds = new Set(history.map((h) => h.word.id));
  const kept = queue.filter((w) => eligibleIds.has(w.id));
  const keptIds = new Set(kept.map((w) => w.id));
  const additions = eligible.filter((w) => !keptIds.has(w.id) && !doneIds.has(w.id));

  queue = [...kept, ...additions];
  queue.sort(() => Math.random() - 0.5);
  emptyReason = activeVocab.length
    ? NOTHING_DUE_REASONS[settings.reviewScope] || NOTHING_DUE_REASONS.auto
    : EMPTY_SCOPE_REASONS[settings.reviewScope] || EMPTY_SCOPE_REASONS.auto;
}

// ---- Test mode: multiple choice with hard distractors (same character
// count + sharing a radical with the target when possible), pooled from
// the current scope first and the full 1156-word vocabulary as a fallback
// (same approach as the per-lesson test — see quiz-distractors.js). ----
function buildQuestion(word) {
  const correctText = shortEnglish(word.english);
  const distractorWords = pickDistractors(word, scopePool, ALL_VOCAB, 3);
  const choices = sharedShuffle([
    { id: word.id, text: correctText, jyutping: word.jyutping, correct: true },
    ...distractorWords.map((w) => ({
      id: w.id,
      text: shortEnglish(w.english),
      jyutping: w.jyutping,
      correct: false,
    })),
  ]);
  return { word, choices };
}

scopeSelect.value = settings.reviewScope;
scopeSelect.addEventListener("change", () => {
  settings.reviewScope = scopeSelect.value;
  saveSettings(settings);
  buildQueue();
  updateStatus();
  renderCard();
});

// Not persisted — force review is an occasional cram action, not a
// standing preference, so it resets to off each time you open Review.
forceToggle.addEventListener("change", () => {
  buildQueue();
  updateStatus();
  renderCard();
});

// Also not persisted, for the same reason.
testModeToggle.addEventListener("change", renderCard);

autoAdvanceToggle.checked = settings.autoAdvanceOnCorrect;
autoAdvanceToggle.addEventListener("change", () => {
  settings.autoAdvanceOnCorrect = autoAdvanceToggle.checked;
  saveSettings(settings);
});

function updateStatus() {
  statusEl.textContent = queue.length
    ? `${queue.length} card${queue.length === 1 ? "" : "s"} left${forceToggle.checked ? " (forced)" : ""}`
    : "";
}

function renderEmpty() {
  area.innerHTML = `<div class="card empty-state">
    <p>🎉 ${emptyReason}</p>
    <a class="btn" href="index.html">Back to dashboard</a>
  </div>`;
  statusEl.textContent = "";
}

// Nav row shown under every card/question: "← Previous" steps back into
// history (read-only peek); "Current →" steps back toward the live card.
function navHtml() {
  const showPrev = peekIndex === null ? history.length > 0 : peekIndex > 0;
  const showNext = peekIndex !== null;
  if (!showPrev && !showNext) return "";
  return `
    <div class="test-nav">
      ${showPrev ? `<button class="btn ghost" id="review-prev-btn">← Previous</button>` : ""}
      ${showNext ? `<button class="btn" id="review-next-btn">${peekIndex < history.length - 1 ? "Next →" : "Current →"}</button>` : ""}
    </div>`;
}

function wireNav() {
  const prevBtn = document.getElementById("review-prev-btn");
  if (prevBtn) {
    prevBtn.addEventListener("click", () => {
      peekIndex = peekIndex === null ? history.length - 1 : peekIndex - 1;
      renderPeek();
    });
  }
  const nextBtn = document.getElementById("review-next-btn");
  if (nextBtn) {
    nextBtn.addEventListener("click", () => {
      if (peekIndex < history.length - 1) {
        peekIndex += 1;
        renderPeek();
      } else {
        peekIndex = null;
        renderCard();
      }
    });
  }
}

function renderCard() {
  if (!queue.length) return renderEmpty();
  updateStatus();
  const word = queue[0];
  revealed = false;

  if (testModeToggle.checked) return renderTestQuestion(word);

  area.innerHTML = `
    <div class="card flashcard" id="flashcard">
      <div class="hanzi">${word.traditional}</div>
      <div class="hint" id="reveal-hint">Tap card to reveal</div>
    </div>
    <div class="btn-row" style="justify-content:center; margin-top:10px;">
      <button class="icon-btn" id="audio-btn" title="Play audio">🔊</button>
    </div>
    <div class="rating-row" id="rating-row" style="visibility:hidden;">
      <button class="rating-again" data-rating="again">Again</button>
      <button class="rating-hard" data-rating="hard">Hard</button>
      <button class="rating-good" data-rating="good">Good</button>
      <button class="rating-easy" data-rating="easy">Easy</button>
    </div>
    ${navHtml()}
  `;

  document.getElementById("flashcard").addEventListener("click", reveal);
  document.getElementById("audio-btn").addEventListener("click", (e) => {
    e.stopPropagation();
    speak(word.traditional, settings.voiceURI);
  });
  document.getElementById("rating-row").addEventListener("click", (e) => {
    const btn = e.target.closest("button[data-rating]");
    if (!btn) return;
    rate(word, btn.dataset.rating);
  });
  wireNav();
}

function renderTestQuestion(word) {
  currentTestQuestion = buildQuestion(word);

  area.innerHTML = `
    <div class="card test-question">
      <div class="hanzi">${word.traditional}</div>
      <div class="jyutping" id="q-jyutping"></div>
      <button class="icon-btn" id="q-audio" title="Play word" style="margin-top:8px;">🔊</button>
    </div>
    <div class="test-answers">
      ${currentTestQuestion.choices
        .map(
          (c) => `
        <button class="test-answer-btn" data-id="${c.id}" data-correct="${c.correct}">
          <span class="game-card-en">${c.text}</span><span class="game-card-jyutping">${c.jyutping}</span>
        </button>`
        )
        .join("")}
    </div>
    <div id="test-next-area"></div>
    ${navHtml()}
  `;

  document.getElementById("q-audio").addEventListener("click", () => {
    speak(word.traditional, settings.voiceURI);
  });
  area.querySelectorAll(".test-answer-btn").forEach((btn) => {
    btn.addEventListener("click", () => onTestAnswer(btn, word));
  });
  wireNav();
}

function onTestAnswer(btn, word) {
  const correct = btn.dataset.correct === "true";
  const selectedId = Number(btn.dataset.id);
  const choices = currentTestQuestion.choices;

  document.getElementById("q-jyutping").textContent = word.jyutping;
  area.querySelectorAll(".test-answer-btn").forEach((b) => {
    b.disabled = true;
    if (b.dataset.correct === "true") b.classList.add("correct");
    else if (b === btn) b.classList.add("wrong");
  });

  if (correct && settings.autoAdvanceOnCorrect) {
    setTimeout(() => rate(word, "good", { test: true, choices, selectedId }), 500);
  } else {
    const nextArea = document.getElementById("test-next-area");
    nextArea.innerHTML = `<button class="btn" id="next-question-btn" style="margin-top:14px;">Next →</button>`;
    document.getElementById("next-question-btn").addEventListener("click", () => {
      rate(word, correct ? "good" : "again", { test: true, choices, selectedId });
    });
  }
}

// Read-only view of an already-answered card from `history` — lets the
// learner glance back without re-triggering SRS scheduling.
function renderPeek() {
  const entry = history[peekIndex];
  const { word } = entry;

  if (entry.test) {
    area.innerHTML = `
      <div class="card test-question">
        <div class="hanzi">${word.traditional}</div>
        <div class="jyutping">${word.jyutping}</div>
        <button class="icon-btn" id="q-audio" title="Play word" style="margin-top:8px;">🔊</button>
      </div>
      <div class="test-answers">
        ${entry.choices
          .map((c) => {
            const cls = c.correct ? "correct" : c.id === entry.selectedId ? "wrong" : "";
            return `<button class="test-answer-btn ${cls}" disabled>
              <span class="game-card-en">${c.text}</span><span class="game-card-jyutping">${c.jyutping}</span>
            </button>`;
          })
          .join("")}
      </div>
      ${navHtml()}
    `;
  } else {
    const example = buildExample(word);
    area.innerHTML = `
      <div class="card flashcard">
        <div class="hanzi">${word.traditional}</div>
        <div class="jyutping">${word.jyutping}</div>
        <div class="english">${word.english}</div>
        ${example ? exampleHTML(example) : ""}
      </div>
      <div class="btn-row" style="justify-content:center; margin-top:10px;">
        <button class="icon-btn" id="q-audio" title="Play audio">🔊</button>
      </div>
      <p class="muted" style="text-align:center;">You rated this: ${entry.rating}</p>
      ${navHtml()}
    `;
    const exampleBtn = area.querySelector(".example-audio-btn");
    if (exampleBtn) {
      exampleBtn.addEventListener("click", (e) => {
        e.stopPropagation();
        speak(example.zh, settings.voiceURI);
      });
    }
  }

  document.getElementById("q-audio").addEventListener("click", () => {
    speak(word.traditional, settings.voiceURI);
  });
  wireNav();
}

function exampleHTML(ex) {
  const idx = ex.zh.indexOf(ex.highlight);
  const before = ex.zh.slice(0, idx);
  const match = ex.zh.slice(idx, idx + ex.highlight.length);
  const after = ex.zh.slice(idx + ex.highlight.length);
  return `
    <div class="example-block">
      <div class="example-zh">
        <span>${before}<span class="example-highlight">${match}</span>${after}</span>
        <button class="icon-btn example-audio-btn" title="Play sentence">🔊</button>
      </div>
      <div class="example-jyut">${ex.jyut}</div>
      <div class="example-en">${ex.en}</div>
    </div>`;
}

function reveal() {
  if (revealed) return;
  revealed = true;
  const word = queue[0];
  const card = document.getElementById("flashcard");
  const example = buildExample(word);
  card.innerHTML = `
    <div class="hanzi">${word.traditional}</div>
    <div class="jyutping">${word.jyutping}</div>
    <div class="english">${word.english}</div>
    ${example ? exampleHTML(example) : ""}
  `;
  document.getElementById("rating-row").style.visibility = "visible";
  const exampleBtn = card.querySelector(".example-audio-btn");
  if (exampleBtn) {
    exampleBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      speak(example.zh, settings.voiceURI);
    });
  }
}

function rate(word, rating, extra) {
  const card = getCard(cards, word.id);
  cards[word.id] = schedule(card, rating, today);
  saveCards(cards);
  logReviewToday();
  if (rating === "again") logWrongAnswer(word.id);
  history.push({ word, rating, test: false, ...extra });
  peekIndex = null;
  queue.shift();
  if (rating === "again") {
    // requeue a few cards later in this session for immediate reinforcement
    queue.splice(Math.min(3, queue.length), 0, word);
  }
  toast(
    rating === "again"
      ? "Back into the queue soon"
      : `Next review in ~${Math.round(cards[word.id].interval)} day(s)`
  );
  renderCard();
}

buildQueue();
updateStatus();
renderCard();
