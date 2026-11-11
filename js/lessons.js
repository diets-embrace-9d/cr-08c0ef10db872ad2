import { renderNav } from "./nav.js";
import { COURSES } from "../data/lessons.js";
import { getCompletedLessons } from "./storage.js";

renderNav("lessons.html");

const courseListEl = document.getElementById("course-list");
const courseDetailEl = document.getElementById("course-detail");
const lessonListEl = document.getElementById("lesson-list");
const courseTitleEl = document.getElementById("course-title");
const courseProgressBarEl = document.getElementById("course-progress-bar");
const courseProgressTextEl = document.getElementById("course-progress-text");

function estMinutes(wordCount) {
  return Math.max(2, Math.round(wordCount * 0.75));
}

function courseProgress(course, completed) {
  const done = course.lessons.filter((l) => completed[`${course.id}:${l.number}`]).length;
  return { done, total: course.lessons.length };
}

function renderCourseList() {
  const completed = getCompletedLessons();
  courseListEl.innerHTML = COURSES.map((course) => {
    const { done, total } = courseProgress(course, completed);
    const words = course.lessons.reduce((s, l) => s + l.ids.length, 0);
    const pct = total ? Math.round((done / total) * 100) : 0;
    return `
      <a class="card course-card" href="#" data-course="${course.id}">
        <div class="course-title">${course.title}</div>
        <p class="muted" style="margin:4px 0 8px;">${total} lessons &middot; ${words} words</p>
        <div class="progress-bar"><div style="width:${pct}%"></div></div>
        <p class="muted" style="margin:4px 0 0; font-size:0.85rem;">${done}/${total} lessons complete</p>
      </a>`;
  }).join("");
}

function renderLessonList(courseId) {
  const course = COURSES.find((c) => c.id === courseId);
  if (!course) return;
  const completed = getCompletedLessons();
  const { done, total } = courseProgress(course, completed);
  const pct = total ? Math.round((done / total) * 100) : 0;

  courseTitleEl.textContent = course.title;
  courseProgressBarEl.style.width = pct + "%";
  courseProgressTextEl.textContent = `${done}/${total} lessons complete`;

  lessonListEl.innerHTML = course.lessons
    .map((l) => {
      const isDone = !!completed[`${course.id}:${l.number}`];
      return `
      <a class="card lesson-card ${isDone ? "done" : ""}" href="lesson-detail.html?course=${course.id}&lesson=${l.number}">
        <div class="lesson-head">
          <span class="lesson-number">${l.number}</span>
          <span class="lesson-name">${l.name}</span>
          ${isDone ? '<span class="lesson-check">✓</span>' : ""}
        </div>
        <div class="lesson-meta">${l.desc}</div>
        <div class="lesson-meta">${l.ids.length} words &middot; ~${estMinutes(l.ids.length)} min</div>
      </a>`;
    })
    .join("");

  courseListEl.style.display = "none";
  courseDetailEl.style.display = "block";
}

function showCourseList() {
  courseListEl.style.display = "block";
  courseDetailEl.style.display = "none";
  renderCourseList();
  history.replaceState(null, "", "lessons.html");
}

courseListEl.addEventListener("click", (e) => {
  const link = e.target.closest("a[data-course]");
  if (!link) return;
  e.preventDefault();
  const courseId = link.dataset.course;
  history.replaceState(null, "", `lessons.html?course=${courseId}`);
  renderLessonList(courseId);
});

document.getElementById("back-to-courses").addEventListener("click", (e) => {
  e.preventDefault();
  showCourseList();
});

const params = new URLSearchParams(location.search);
const initialCourse = params.get("course");
renderCourseList();
if (initialCourse && COURSES.some((c) => c.id === initialCourse)) {
  renderLessonList(initialCourse);
} else {
  showCourseList();
}
