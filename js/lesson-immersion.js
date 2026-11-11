import { renderNav } from "./nav.js";
import { getCourse, getLesson, getWordById } from "../data/lessons.js";
import { buildExamplePair } from "./examples.js";
import { getSettings, saveSettings, getWrongIdsSince } from "./storage.js";
import { speakHighlighted, stopSpeaking, pauseSpeaking, resumeSpeaking } from "./speech.js";

renderNav("lessons.html");

const settings = getSettings();
const params = new URLSearchParams(location.search);
const courseId = params.get("course");
const lessonNumber = Number(params.get("lesson"));
const course = getCourse(courseId);
const lesson = getLesson(courseId, lessonNumber);

const backLink = document.getElementById("back-link");
const titleEl = document.getElementById("immersion-title");
const descEl = document.getElementById("immersion-desc");
const progressEl = document.getElementById("immersion-progress");
const areaEl = document.getElementById("immersion-area");
const autoplayToggle = document.getElementById("autoplay-toggle");
const shadowToggle = document.getElementById("shadow-toggle");
const extraPracticeToggle = document.getElementById("extra-practice-toggle");
const shuffleToggle = document.getElementById("shuffle-toggle");
const ambientToggle = document.getElementById("ambient-toggle");
const loopSelect = document.getElementById("loop-select");
const rateSlider = document.getElementById("rate-slider");
const rateValueEl = document.getElementById("rate-value");
const pauseSlider = document.getElementById("pause-slider");
const pauseValueEl = document.getElementById("pause-value");
const prespeakSlider = document.getElementById("prespeak-slider");
const prespeakValueEl = document.getElementById("prespeak-value");
const fontSlider = document.getElementById("font-slider");
const fontValueEl = document.getElementById("font-value");
const prevBtn = document.getElementById("prev-btn");
const pauseBtn = document.getElementById("pause-btn");
const replayBtn = document.getElementById("replay-btn");
const nextBtn = document.getElementById("next-btn");

// Fixed short pause between phases of the SAME word (word -> sentence ->
// word); only the longer inter-word pause is user-adjustable (see the
// "Pause before next word" slider).
const PAUSE_PHASE_MS = 500;
const EXTRA_REPEATS = 2; // additional word2 replays for recently-missed words

let originalWords = [];
let words = [];
let idx = 0;
let phase = "word1"; // "word1" -> "sentence" -> "word2"
let pendingTimeout = null;
let pendingFn = null;
let rate = settings.immersionRate;
let pauseWordMs = settings.immersionPauseMs;
let preSpeakMs = settings.immersionPreSpeakMs;
let fontRem = settings.immersionFontRem;
let wrongIds = new Set();
let extraRepeatsRemaining = 0;
let paused = false;
let pausedPendingFn = null;
let loopsCompleted = 0; // full passes through the lesson finished so far

if (!course || !lesson) {
  titleEl.textContent = "Lesson not found";
} else {
  backLink.href = `lesson-detail.html?course=${course.id}&lesson=${lesson.number}`;
  titleEl.textContent = `Immersion: ${lesson.name}`;
  descEl.textContent = "Listen, see the word used in a sentence, then hear it once more.";

  originalWords = lesson.ids.map(getWordById).filter(Boolean);
  words = [...originalWords];
  wrongIds = getWrongIdsSince(7);

  rateSlider.value = rate;
  rateValueEl.textContent = `${rate.toFixed(2)}x`;
  pauseSlider.value = pauseWordMs / 1000;
  pauseValueEl.textContent = `${(pauseWordMs / 1000).toFixed(1)}s`;
  prespeakSlider.value = preSpeakMs / 1000;
  prespeakValueEl.textContent = `${(preSpeakMs / 1000).toFixed(1)}s`;
  fontSlider.value = fontRem;
  fontValueEl.textContent = `${fontRem.toFixed(1)}rem`;
  applyFontSize();
  loopSelect.value = String(settings.immersionLoopCount);

  prevBtn.addEventListener("click", () => {
    unpause();
    clearTimeout(pendingTimeout);
    if (idx > 0) {
      idx -= 1;
      phase = "word1";
      playPhase();
    }
  });
  nextBtn.addEventListener("click", () => {
    unpause();
    clearTimeout(pendingTimeout);
    goNext();
  });
  replayBtn.addEventListener("click", () => {
    unpause();
    clearTimeout(pendingTimeout);
    phase = "word1";
    playPhase();
  });
  pauseBtn.addEventListener("click", togglePause);

  rateSlider.addEventListener("input", () => {
    rate = Number(rateSlider.value);
    rateValueEl.textContent = `${rate.toFixed(2)}x`;
    settings.immersionRate = rate;
    saveSettings(settings);
  });
  rateSlider.addEventListener("change", () => {
    // The rate on an utterance already queued/speaking can't change
    // mid-flight, so without this the new speed wouldn't be heard until
    // the *next* phase — restart the current one immediately instead.
    if (paused) return;
    clearTimeout(pendingTimeout);
    playPhase();
  });

  pauseSlider.addEventListener("input", () => {
    pauseWordMs = Math.round(Number(pauseSlider.value) * 1000);
    pauseValueEl.textContent = `${(pauseWordMs / 1000).toFixed(1)}s`;
    settings.immersionPauseMs = pauseWordMs;
    saveSettings(settings);
  });

  prespeakSlider.addEventListener("input", () => {
    preSpeakMs = Math.round(Number(prespeakSlider.value) * 1000);
    prespeakValueEl.textContent = `${(preSpeakMs / 1000).toFixed(1)}s`;
    settings.immersionPreSpeakMs = preSpeakMs;
    saveSettings(settings);
  });

  fontSlider.addEventListener("input", () => {
    fontRem = Number(fontSlider.value);
    fontValueEl.textContent = `${fontRem.toFixed(1)}rem`;
    settings.immersionFontRem = fontRem;
    saveSettings(settings);
    applyFontSize();
  });

  loopSelect.addEventListener("change", () => {
    settings.immersionLoopCount = Number(loopSelect.value);
    saveSettings(settings);
  });

  shuffleToggle.addEventListener("change", () => {
    unpause();
    clearTimeout(pendingTimeout);
    words = shuffleToggle.checked ? shuffle(originalWords) : [...originalWords];
    idx = 0;
    phase = "word1";
    playPhase();
  });

  if (words.length) playPhase();
  else areaEl.innerHTML = `<p class="muted">No words in this lesson.</p>`;
}

function applyFontSize() {
  document.documentElement.style.setProperty("--immersion-font", `${fontRem}rem`);
}

function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function schedule(fn, ms) {
  clearTimeout(pendingTimeout);
  pendingFn = fn;
  pendingTimeout = setTimeout(() => {
    pendingFn = null;
    fn();
  }, ms);
}

function unpause() {
  // Manual navigation always wins over a pause — resync speechSynthesis's
  // own paused flag too, harmless if it wasn't paused.
  paused = false;
  pausedPendingFn = null;
  pauseBtn.textContent = "⏸ Pause";
  resumeSpeaking();
}

function togglePause() {
  if (!paused) {
    paused = true;
    pauseBtn.textContent = "▶ Resume";
    if (pendingTimeout) {
      pausedPendingFn = pendingFn;
      clearTimeout(pendingTimeout);
      pendingTimeout = null;
      pendingFn = null;
    } else {
      pauseSpeaking();
    }
  } else {
    paused = false;
    pauseBtn.textContent = "⏸ Pause";
    if (pausedPendingFn) {
      const fn = pausedPendingFn;
      pausedPendingFn = null;
      fn();
    } else {
      resumeSpeaking();
    }
  }
}

function goNext() {
  if (idx < words.length - 1) {
    idx += 1;
    phase = "word1";
    playPhase();
    return;
  }
  loopsCompleted += 1;
  // Ambient mode loops forever, hands-off; otherwise repeat up to the
  // chosen "Repeat lesson" count before showing the completion screen.
  const keepGoing = ambientToggle.checked || loopsCompleted < Number(loopSelect.value);
  if (keepGoing) {
    if (shuffleToggle.checked) words = shuffle(originalWords);
    idx = 0;
    phase = "word1";
    playPhase();
  } else {
    showComplete();
  }
}

function renderCharSpans(text, highlight) {
  const idx2 = highlight ? text.indexOf(highlight) : -1;
  const end = idx2 >= 0 ? idx2 + highlight.length : -1;
  return [...text]
    .map((ch, i) => {
      const isTarget = idx2 >= 0 && i >= idx2 && i < end;
      return `<span class="char${isTarget ? " target" : ""}" data-i="${i}">${ch}</span>`;
    })
    .join("");
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

function isWrongWord(word) {
  return extraPracticeToggle.checked && wrongIds.has(word.id);
}

function playPhase() {
  if (paused) return;
  const word = words[idx];
  const totalLoops = Number(loopSelect.value);
  const loopLabel = ambientToggle.checked
    ? ` • Pass ${loopsCompleted + 1}`
    : totalLoops > 1
    ? ` • Pass ${loopsCompleted + 1} of ${totalLoops}`
    : "";
  progressEl.textContent = `Word ${idx + 1} of ${words.length}${loopLabel}`;
  prevBtn.disabled = idx === 0;

  if (phase === "sentence") {
    const [, s2] = buildExamplePair(word);
    if (!s2) {
      // Nothing to show in context — skip straight to the closing word.
      phase = "word2";
      extraRepeatsRemaining = isWrongWord(word) ? EXTRA_REPEATS : 0;
      playPhase();
      return;
    }
    areaEl.innerHTML = `
      <div class="test-progress" style="text-align:center;">📖 In a sentence</div>
      <div class="card sentence-card">
        <div class="sentence-zh" id="immersion-sentence" style="font-size:calc(var(--immersion-font) * 0.55); text-align:center;">${renderCharSpans(
          s2.zh,
          word.traditional
        )}</div>
        <div class="sentence-jyut" style="text-align:center;">${s2.jyut}</div>
        <div class="sentence-en" style="text-align:center;">${s2.en}</div>
        <div class="muted" id="shadow-prompt" style="text-align:center; margin-top:8px; font-weight:600; color:var(--accent); min-height:1.2em;"></div>
      </div>`;
    speakHighlighted(s2.zh, settings.voiceURI, {
      rate,
      onChar: (i) => highlightChar("immersion-sentence", i),
      onDone: () => {
        clearHighlight("immersion-sentence");
        const enterWord2 = () => {
          phase = "word2";
          extraRepeatsRemaining = isWrongWord(word) ? EXTRA_REPEATS : 0;
          playPhase();
        };
        if (shadowToggle.checked) {
          const promptEl = document.getElementById("shadow-prompt");
          if (promptEl) promptEl.textContent = "🗣️ Your turn — repeat it aloud";
          const shadowMs = Math.max(1500, s2.zh.length * 450);
          schedule(enterWord2, shadowMs);
        } else {
          schedule(enterWord2, PAUSE_PHASE_MS);
        }
      },
    });
    return;
  }

  // "word1" (first pass) or "word2" (closing pass, possibly repeated for
  // words the learner has gotten wrong recently)
  const wrongWord = isWrongWord(word);
  let label = "🔤 Word";
  if (phase === "word2") {
    label = wrongWord && extraRepeatsRemaining > 0 ? `🔁 Extra practice (${extraRepeatsRemaining} more)` : "🔁 Once more";
  }
  areaEl.innerHTML = `
    <div class="test-progress" style="text-align:center;">${label}</div>
    <div class="card test-question">
      <div class="hanzi" id="immersion-word" style="font-size:var(--immersion-font);">${renderCharSpans(word.traditional, null)}</div>
      <div class="jyutping">${word.jyutping}</div>
      <div class="english">${word.english}</div>
    </div>`;
  // Give the learner a moment to look at (and try to say) the word
  // themselves before it's read aloud, instead of speaking the instant it
  // appears on screen.
  schedule(() => {
    speakHighlighted(word.traditional, settings.voiceURI, {
      rate,
      onChar: (i) => highlightChar("immersion-word", i),
      onDone: () => {
        clearHighlight("immersion-word");
        if (phase === "word1") {
          schedule(() => {
            phase = "sentence";
            playPhase();
          }, PAUSE_PHASE_MS);
        } else if (phase === "word2") {
          if (wrongWord && extraRepeatsRemaining > 0) {
            extraRepeatsRemaining -= 1;
            schedule(playPhase, PAUSE_PHASE_MS);
          } else if (autoplayToggle.checked) {
            schedule(goNext, pauseWordMs);
          }
          // autoplay off and no repeats left: stop and wait for the
          // Prev/Replay/Next buttons, which are always live.
        }
      },
    });
  }, preSpeakMs);
}

function showComplete() {
  areaEl.innerHTML = `
    <div class="card" style="text-align:center;">
      <h2 style="margin-top:0;">🎉 Immersion complete!</h2>
      <p class="muted">You've gone through every word in this lesson.</p>
      <div class="btn-row" style="justify-content:center;">
        <button class="btn secondary" id="restart-btn">Restart</button>
        <a class="btn" href="lesson-detail.html?course=${course.id}&lesson=${lesson.number}">Back to lesson</a>
      </div>
    </div>`;
  progressEl.textContent = "";
  document.getElementById("restart-btn").addEventListener("click", () => {
    if (shuffleToggle.checked) words = shuffle(originalWords);
    loopsCompleted = 0;
    idx = 0;
    phase = "word1";
    playPhase();
  });
}
