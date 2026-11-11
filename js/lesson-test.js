import { renderNav } from "./nav.js";
import { getCourse, getLesson, getWordById } from "../data/lessons.js";
import { VOCAB } from "../data/vocab.js";
import { RESTAURANT_VOCAB } from "../data/restaurant.js";
import {
  getSettings,
  saveSettings,
  getCards,
  saveCards,
  getCard,
  todayStr,
  logReviewToday,
  logWrongAnswer,
  getCompletedLessons,
} from "./storage.js";
import { schedule } from "./srs.js";
import { speak } from "./speech.js";
import { shortEnglish, shuffle, pickDistractors } from "./quiz-distractors.js";

renderNav("lessons.html");

const settings = getSettings();
const params = new URLSearchParams(location.search);
const courseId = params.get("course");
const lessonNumber = Number(params.get("lesson"));
const course = getCourse(courseId);
const lesson = getLesson(courseId, lessonNumber);

const backLink = document.getElementById("back-link");
const doneBackLink = document.getElementById("done-back-link");
const titleEl = document.getElementById("test-title");
const scopeSelect = document.getElementById("test-scope-select");
const autoAdvanceToggle = document.getElementById("auto-advance-toggle");
const progressEl = document.getElementById("test-progress");
const areaEl = document.getElementById("test-area");
const doneEl = document.getElementById("test-done");
const scoreEl = document.getElementById("test-score");
const srsNoteEl = document.getElementById("test-srs-note");
const resultsEl = document.getElementById("test-results");
const retakeBtn = document.getElementById("retake-btn");

const ALL_VOCAB = [...VOCAB, ...RESTAURANT_VOCAB];

let questions = [];
let qIndex = 0;
let results = [];

if (!course || !lesson) {
  titleEl.textContent = "Lesson not found";
} else {
  const backHref = `lesson-detail.html?course=${course.id}&lesson=${lesson.number}`;
  backLink.href = backHref;
  doneBackLink.href = backHref;
  titleEl.textContent = `Test: ${lesson.name}`;
  autoAdvanceToggle.checked = settings.autoAdvanceOnCorrect;
  autoAdvanceToggle.addEventListener("change", () => {
    settings.autoAdvanceOnCorrect = autoAdvanceToggle.checked;
    saveSettings(settings);
  });
  retakeBtn.addEventListener("click", start);
  scopeSelect.addEventListener("change", start);
  start();
}

// All words from every lesson (any course) the learner has marked complete.
function completedWordPool() {
  const completed = getCompletedLessons();
  const ids = new Set();
  for (const [key, done] of Object.entries(completed)) {
    if (!done) continue;
    const [cId, lNum] = key.split(":");
    const l = getLesson(cId, Number(lNum));
    if (l) l.ids.forEach((id) => ids.add(id));
  }
  return [...ids].map(getWordById).filter(Boolean);
}

function buildQuestions(scope) {
  // The words being tested are always this lesson's — only the distractor
  // pool widens when "harder" is selected, so wrong answers can come from
  // anything the learner has studied, not just this lesson's theme.
  const words = lesson.ids.map(getWordById).filter(Boolean);
  const primaryPool =
    scope === "completed"
      ? completedWordPool()
      : course.lessons.flatMap((l) => l.ids).map(getWordById).filter(Boolean);

  return shuffle(words).map((word) => {
    const correctText = shortEnglish(word.english);
    const distractorWords = pickDistractors(word, primaryPool, ALL_VOCAB, 3);
    const choices = shuffle([
      { id: word.id, text: correctText, jyutping: word.jyutping, correct: true },
      ...distractorWords.map((w) => ({
        id: w.id,
        text: shortEnglish(w.english),
        jyutping: w.jyutping,
        correct: false,
      })),
    ]);
    return { word, choices };
  });
}

function start() {
  const scope = scopeSelect.value;
  questions = buildQuestions(scope);
  qIndex = 0;
  // Indexed (not pushed) so a question keeps its recorded answer even after
  // navigating away from it and back — { correct, selectedId } or null.
  results = new Array(questions.length).fill(null);
  doneEl.style.display = "none";
  areaEl.style.display = "block";
  renderQuestion();
}

function goNext() {
  if (qIndex + 1 < questions.length) {
    qIndex += 1;
    renderQuestion();
  } else {
    finish();
  }
}

function renderQuestion() {
  const q = questions[qIndex];
  const result = results[qIndex];
  progressEl.textContent = `Question ${qIndex + 1} of ${questions.length}`;

  areaEl.innerHTML = `
    <div class="card test-question">
      <div class="hanzi">${q.word.traditional}</div>
      <div class="jyutping" id="q-jyutping">${result ? q.word.jyutping : ""}</div>
      <button class="icon-btn" id="q-audio" title="Play word" style="margin-top:8px;">🔊</button>
    </div>
    <div class="test-answers">
      ${q.choices
        .map((c) => {
          if (!result) {
            return `<button class="test-answer-btn" data-id="${c.id}" data-correct="${c.correct}">
              <span class="game-card-en">${c.text}</span><span class="game-card-jyutping">${c.jyutping}</span>
            </button>`;
          }
          const cls = c.correct ? "correct" : c.id === result.selectedId ? "wrong" : "";
          return `<button class="test-answer-btn ${cls}" disabled>
            <span class="game-card-en">${c.text}</span><span class="game-card-jyutping">${c.jyutping}</span>
          </button>`;
        })
        .join("")}
    </div>
    <div class="test-nav">
      ${qIndex > 0 ? `<button class="btn ghost" id="prev-btn">← Previous</button>` : ""}
      ${result ? `<button class="btn" id="next-btn">${qIndex + 1 >= questions.length ? "See results →" : "Next question →"}</button>` : ""}
    </div>
  `;

  document.getElementById("q-audio").addEventListener("click", () => {
    speak(q.word.traditional, settings.voiceURI);
  });

  if (!result) {
    areaEl.querySelectorAll(".test-answer-btn").forEach((btn) => {
      btn.addEventListener("click", () => onAnswer(btn, q));
    });
  }

  const prevBtn = document.getElementById("prev-btn");
  if (prevBtn) prevBtn.addEventListener("click", () => { qIndex -= 1; renderQuestion(); });
  const nextBtn = document.getElementById("next-btn");
  if (nextBtn) nextBtn.addEventListener("click", goNext);
}

function onAnswer(btn, q) {
  const correct = btn.dataset.correct === "true";
  results[qIndex] = { correct, selectedId: Number(btn.dataset.id) };

  if (correct && settings.autoAdvanceOnCorrect) {
    document.getElementById("q-jyutping").textContent = q.word.jyutping;
    areaEl.querySelectorAll(".test-answer-btn").forEach((b) => {
      b.disabled = true;
      if (b.dataset.correct === "true") b.classList.add("correct");
    });
    setTimeout(goNext, 500);
  } else {
    renderQuestion();
  }
}

function finish() {
  areaEl.style.display = "none";
  progressEl.textContent = "";
  doneEl.style.display = "block";

  const finalResults = questions.map((q, i) => ({ word: q.word, correct: results[i].correct }));

  const correctCount = finalResults.filter((r) => r.correct).length;
  scoreEl.textContent = `${correctCount} / ${finalResults.length} correct`;

  const missed = finalResults.filter((r) => !r.correct);
  srsNoteEl.textContent = missed.length
    ? `${missed.length} word${missed.length === 1 ? "" : "s"} will show up sooner in Review.`
    : "All correct — nice! These words are scheduled further out in Review.";

  resultsEl.innerHTML = finalResults
    .map(
      (r) => `
      <div class="test-result-row">
        <span class="status ${r.correct ? "correct" : "wrong"}">${r.correct ? "✓" : "✗"}</span>
        <span class="hanzi" style="font-size:1.1rem;">${r.word.traditional}</span>
        <span class="jyutping" style="color:var(--accent); flex:1;">${r.word.jyutping}</span>
        <span class="muted">${r.word.english}</span>
      </div>`
    )
    .join("");

  applyToSRS(finalResults);
}

function applyToSRS(finalResults) {
  const cards = getCards();
  const today = todayStr();
  for (const { word, correct } of finalResults) {
    const card = getCard(cards, word.id);
    cards[word.id] = schedule(card, correct ? "good" : "again", today);
    if (!correct) logWrongAnswer(word.id);
  }
  saveCards(cards);
  logReviewToday();
}
