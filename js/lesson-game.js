import { renderNav } from "./nav.js";
import { getCourse, getLesson, getWordById } from "../data/lessons.js";

renderNav("lessons.html");

const params = new URLSearchParams(location.search);
const courseId = params.get("course");
const lessonNumber = Number(params.get("lesson"));
const course = getCourse(courseId);
const lesson = getLesson(courseId, lessonNumber);

const backLink = document.getElementById("back-link");
const doneBackLink = document.getElementById("done-back-link");
const titleEl = document.getElementById("game-title");
const gridEl = document.getElementById("game-grid");
const doneEl = document.getElementById("game-done");
const summaryEl = document.getElementById("game-summary");
const movesEl = document.getElementById("stat-moves");
const timeEl = document.getElementById("stat-time");
const matchedEl = document.getElementById("stat-matched");
const totalEl = document.getElementById("stat-total");
const replayBtn = document.getElementById("replay-btn");

let state = null;
let timerInterval = null;

if (!course || !lesson) {
  titleEl.textContent = "Lesson not found";
} else {
  const backHref = `lesson-detail.html?course=${course.id}&lesson=${lesson.number}`;
  backLink.href = backHref;
  doneBackLink.href = backHref;
  titleEl.textContent = `Matching Game: ${lesson.name}`;
  replayBtn.addEventListener("click", start);
  start();
}

function shortEnglish(en) {
  return en.split(" / ")[0].replace(/\s*\([^)]*\)\s*/g, "").trim() || en;
}

// Shortened glosses can collide (你 / 你哋 both -> "you"), which makes the
// game ambiguous. Fall back to the full gloss for any word whose short form
// isn't unique within this lesson.
function dedupeShortEnglish(words) {
  const counts = new Map();
  words.forEach((w) => {
    const short = shortEnglish(w.english);
    counts.set(short, (counts.get(short) || 0) + 1);
  });
  const result = new Map();
  words.forEach((w) => {
    const short = shortEnglish(w.english);
    result.set(w.id, counts.get(short) > 1 ? w.english : short);
  });
  return result;
}

function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function start() {
  clearInterval(timerInterval);
  doneEl.style.display = "none";
  gridEl.style.display = "block";

  const words = lesson.ids.map(getWordById).filter(Boolean);
  const displayText = dedupeShortEnglish(words);

  state = {
    left: shuffle(words.map((w) => ({ pairId: w.id, text: w.traditional }))),
    right: shuffle(words.map((w) => ({ pairId: w.id, text: displayText.get(w.id), jyutping: w.jyutping }))),
    selectedLeft: null,
    selectedRight: null,
    wrongPair: null, // [leftIndex, rightIndex] briefly shown red on a miss
    matchedPairs: new Set(),
    moves: 0,
    startTime: null,
    locked: false,
  };

  totalEl.textContent = words.length;
  matchedEl.textContent = 0;
  movesEl.textContent = 0;
  timeEl.textContent = "0:00";

  render();
}

function cardClass(card, side, index) {
  const classes = ["game-card"];
  if (state.matchedPairs.has(card.pairId)) classes.push("matched");
  const selectedIndex = side === "left" ? state.selectedLeft : state.selectedRight;
  if (selectedIndex === index) classes.push("selected");
  if (state.wrongPair) {
    const wrongIndex = side === "left" ? state.wrongPair[0] : state.wrongPair[1];
    if (wrongIndex === index) classes.push("wrong");
  }
  return classes.join(" ");
}

function render() {
  gridEl.innerHTML = `
    <div class="game-columns">
      <div class="game-column">
        ${state.left
          .map(
            (c, i) => `
          <button class="${cardClass(c, "left", i)} zh" data-side="left" data-index="${i}"
                  ${state.matchedPairs.has(c.pairId) ? "disabled" : ""}>
            ${c.text}
          </button>`
          )
          .join("")}
      </div>
      <div class="game-column">
        ${state.right
          .map(
            (c, i) => `
          <button class="${cardClass(c, "right", i)} en" data-side="right" data-index="${i}"
                  ${state.matchedPairs.has(c.pairId) ? "disabled" : ""}>
            <span class="game-card-en">${c.text}</span><span class="game-card-jyutping">${c.jyutping}</span>
          </button>`
          )
          .join("")}
      </div>
    </div>`;
}

gridEl.addEventListener("click", (e) => {
  const btn = e.target.closest(".game-card");
  if (!btn || state.locked) return;
  const side = btn.dataset.side;
  const index = Number(btn.dataset.index);
  onCardClick(side, index);
});

function onCardClick(side, index) {
  const list = side === "left" ? state.left : state.right;
  if (state.matchedPairs.has(list[index].pairId)) return;

  if (!state.startTime) {
    state.startTime = Date.now();
    timerInterval = setInterval(updateTimer, 1000);
  }

  if (side === "left") state.selectedLeft = index;
  else state.selectedRight = index;
  render();

  if (state.selectedLeft === null || state.selectedRight === null) return;

  state.moves += 1;
  movesEl.textContent = state.moves;

  const leftCard = state.left[state.selectedLeft];
  const rightCard = state.right[state.selectedRight];

  if (leftCard.pairId === rightCard.pairId) {
    state.matchedPairs.add(leftCard.pairId);
    state.selectedLeft = null;
    state.selectedRight = null;
    matchedEl.textContent = state.matchedPairs.size;
    render();
    if (state.matchedPairs.size === lesson.ids.length) finish();
  } else {
    state.locked = true;
    state.wrongPair = [state.selectedLeft, state.selectedRight];
    render();
    setTimeout(() => {
      state.selectedLeft = null;
      state.selectedRight = null;
      state.wrongPair = null;
      state.locked = false;
      render();
    }, 600);
  }
}

function updateTimer() {
  const secs = Math.floor((Date.now() - state.startTime) / 1000);
  const m = Math.floor(secs / 60);
  const s = secs % 60;
  timeEl.textContent = `${m}:${String(s).padStart(2, "0")}`;
}

function finish() {
  clearInterval(timerInterval);
  const secs = Math.floor((Date.now() - state.startTime) / 1000);
  gridEl.style.display = "none";
  doneEl.style.display = "block";
  summaryEl.textContent = `${lesson.ids.length} pairs matched in ${state.moves} moves and ${secs}s.`;
}
