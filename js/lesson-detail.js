import { renderNav, toast } from "./nav.js";
import { getCourse, getLesson, getWordById } from "../data/lessons.js";
import { buildExamplePair, buildUsageHint } from "./examples.js";
import { STORIES } from "../data/stories.js";
import { getSettings, isLessonComplete, setLessonComplete } from "./storage.js";
import { speakHighlighted, stopSpeaking } from "./speech.js";

renderNav("lessons.html");

const settings = getSettings();
const params = new URLSearchParams(location.search);
const courseId = params.get("course");
const lessonNumber = Number(params.get("lesson"));
const course = getCourse(courseId);
const lesson = getLesson(courseId, lessonNumber);

const backLink = document.getElementById("back-link");
const titleEl = document.getElementById("lesson-title");
const descEl = document.getElementById("lesson-desc");
const wordListEl = document.getElementById("word-list");
const completeCheckbox = document.getElementById("complete-checkbox");
const prevBtn = document.getElementById("prev-lesson");
const nextBtn = document.getElementById("next-lesson");

if (!course || !lesson) {
  titleEl.textContent = "Lesson not found";
  wordListEl.innerHTML = "";
} else {
  backLink.href = `lessons.html?course=${course.id}`;
  titleEl.textContent = `Lesson ${lesson.number}: ${lesson.name}`;
  descEl.textContent = `${lesson.desc} (${course.title})`;

  document.getElementById("game-link").href = `lesson-game.html?course=${course.id}&lesson=${lesson.number}`;
  document.getElementById("test-link").href = `lesson-test.html?course=${course.id}&lesson=${lesson.number}`;
  document.getElementById("reading-link").href = `lesson-reading.html?course=${course.id}&lesson=${lesson.number}`;
  document.getElementById("immersion-link").href = `lesson-immersion.html?course=${course.id}&lesson=${lesson.number}`;

  const storyLink = document.getElementById("story-link");
  if (STORIES[`${course.id}:${lesson.number}`]) {
    storyLink.href = `lesson-story.html?course=${course.id}&lesson=${lesson.number}`;
    storyLink.style.display = "";
  }

  wordListEl.innerHTML = lesson.ids.map((id) => renderWordCard(id)).join("");

  completeCheckbox.checked = isLessonComplete(course.id, lesson.number);
  completeCheckbox.addEventListener("change", () => {
    setLessonComplete(course.id, lesson.number, completeCheckbox.checked);
    toast(completeCheckbox.checked ? "Lesson marked complete" : "Lesson unmarked");
  });

  setupNav();
  wireAudioButtons();
}

function renderCharSpans(text, highlight) {
  const idx = highlight ? text.indexOf(highlight) : -1;
  const end = idx >= 0 ? idx + highlight.length : -1;
  return [...text]
    .map((ch, i) => {
      const isTarget = idx >= 0 && i >= idx && i < end;
      return `<span class="char${isTarget ? " target" : ""}" data-i="${i}">${ch}</span>`;
    })
    .join("");
}

function renderSentenceBlock(label, ex, containerId) {
  return `
    <div class="sentence-card">
      <div class="sentence-label">${label}</div>
      <div style="display:flex; align-items:flex-start; gap:8px;">
        <div class="sentence-zh" id="${containerId}">${renderCharSpans(ex.zh, ex.highlight)}</div>
        <button class="icon-btn play-btn" data-target="${containerId}" data-text="${encodeURIComponent(ex.zh)}" title="Play sentence" style="flex-shrink:0;">🔊</button>
        <button class="icon-btn stop-btn" title="Stop" style="flex-shrink:0;">⏹</button>
      </div>
      <div class="sentence-jyut">${ex.jyut}</div>
      <div class="sentence-en">${ex.en}</div>
    </div>`;
}

function renderWordCard(id) {
  const word = getWordById(id);
  if (!word) return "";
  const wordContainerId = `word-${id}`;
  const [s1, s2] = buildExamplePair(word);
  const hint = !s1 ? buildUsageHint(word) : null;

  let extra = "";
  if (s1) {
    extra += renderSentenceBlock("Sentence 1", s1, `s1-${id}`);
    if (s2) extra += renderSentenceBlock("Sentence 2", s2, `s2-${id}`);
  } else if (hint) {
    extra += renderSentenceBlock("Common pattern", hint, `hint-${id}`);
  }

  return `
    <div class="card word-card">
      <div class="whead">
        <span class="hanzi" id="${wordContainerId}">${renderCharSpans(word.traditional, null)}</span>
        <span class="jyutping">${word.jyutping}</span>
        <span class="english">${word.english}</span>
        <button class="icon-btn play-btn" data-target="${wordContainerId}" data-text="${encodeURIComponent(word.traditional)}" title="Play word" style="margin-left:auto;">🔊</button>
      </div>
      ${extra}
    </div>`;
}

function wireAudioButtons() {
  wordListEl.addEventListener("click", (e) => {
    if (e.target.closest(".stop-btn")) {
      stopSpeaking();
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
}

function setupNav() {
  const idx = course.lessons.findIndex((l) => l.number === lesson.number);
  const prev = course.lessons[idx - 1];
  const next = course.lessons[idx + 1];

  if (prev) {
    prevBtn.href = `lesson-detail.html?course=${course.id}&lesson=${prev.number}`;
    prevBtn.textContent = "← Previous";
  } else {
    prevBtn.href = `lessons.html?course=${course.id}`;
    prevBtn.textContent = "← All lessons";
  }

  if (next) {
    nextBtn.href = `lesson-detail.html?course=${course.id}&lesson=${next.number}`;
    nextBtn.textContent = "Next →";
  } else {
    nextBtn.href = `lessons.html?course=${course.id}`;
    nextBtn.textContent = "Finish course →";
  }
}
