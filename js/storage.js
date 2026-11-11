// localStorage persistence helpers. No backend — everything lives in the browser.
import { getWordById } from "../data/lessons.js";

const KEYS = {
  cards: "cantonese.cards.v1",
  settings: "cantonese.settings.v1",
  wordStatus: "cantonese.wordStatus.v1",
  reviewDays: "cantonese.reviewDays.v1",
  completedLessons: "cantonese.completedLessons.v1",
  wrongLog: "cantonese.wrongLog.v1",
  wordLists: "cantonese.wordLists.v1",
};

function read(key, fallback) {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch {
    return fallback;
  }
}

function write(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}

// --- SRS card state, keyed by vocab id ---
// { [id]: { interval, ease, reps, due (ISO date string), lastRating } }
export function getCards() {
  return read(KEYS.cards, {});
}

export function saveCards(cards) {
  write(KEYS.cards, cards);
}

export function getCard(cards, id) {
  return (
    cards[id] || {
      interval: 0,
      ease: 2.5,
      reps: 0,
      due: new Date().toISOString().slice(0, 10),
      lastRating: null,
    }
  );
}

// --- Word status: known / learning / new, keyed by vocab id ---
export function getWordStatus() {
  return read(KEYS.wordStatus, {});
}

export function setWordStatus(id, status) {
  const all = getWordStatus();
  all[id] = status;
  write(KEYS.wordStatus, all);
}

// --- Settings ---
const SETTINGS_DEFAULTS = {
  voiceURI: null,
  tierOverride: false, // if true, Tier 500 words show even before Tier 200 mastery gate
  includeRestaurantPack: false, // opt-in: fold the HK restaurant bonus pack into review/dashboard
  reviewScope: "auto", // "auto" | "completed" | "top200" | "top500" | "top1000" | "restaurant"
  autoAdvanceOnCorrect: false, // test mode: skip the manual "Next" click when the answer was correct
  immersionRate: 0.85, // TTS playback speed in Immersion mode
  speakRate: 0.85, // TTS playback speed on the Text to Speech page
  immersionPauseMs: 900, // pause before advancing to the next word in Immersion mode
  immersionPreSpeakMs: 1000, // think-time pause after a word appears, before it's read aloud
  immersionFontRem: 2.6, // Chinese word font size (rem) in Immersion mode
  immersionLoopCount: 1, // how many times to repeat the whole lesson in Immersion mode
};

// Merges over the defaults (not just falling back to them wholesale) so a
// settings blob saved before a new field existed still picks up that
// field's default, instead of silently reading as undefined forever.
export function getSettings() {
  return { ...SETTINGS_DEFAULTS, ...read(KEYS.settings, {}) };
}

export function saveSettings(settings) {
  write(KEYS.settings, settings);
}

export function resetAllProgress() {
  localStorage.removeItem(KEYS.cards);
  localStorage.removeItem(KEYS.wordStatus);
  localStorage.removeItem(KEYS.completedLessons);
  localStorage.removeItem(KEYS.wrongLog);
}

// --- Lesson completion, keyed by "${courseId}:${lessonNumber}" ---
export function getCompletedLessons() {
  return read(KEYS.completedLessons, {});
}

export function isLessonComplete(courseId, lessonNumber) {
  return !!getCompletedLessons()[`${courseId}:${lessonNumber}`];
}

export function setLessonComplete(courseId, lessonNumber, done) {
  const all = getCompletedLessons();
  const key = `${courseId}:${lessonNumber}`;
  if (done) {
    all[key] = true;
  } else {
    delete all[key];
  }
  write(KEYS.completedLessons, all);
}

export function todayStr() {
  return new Date().toISOString().slice(0, 10);
}

function daysAgoStr(days) {
  const d = new Date();
  d.setDate(d.getDate() - days);
  return d.toISOString().slice(0, 10);
}

// --- Wrong-answer log, for "words I got wrong recently" in Review ---
// Every time a word is rated "again" (flashcard, Review test mode, or a
// lesson test miss), it's appended here with the date. Pruned to the last
// 60 days on write so the log doesn't grow unbounded; callers pick their
// own shorter window (e.g. 7 days) when reading.
export function logWrongAnswer(id) {
  const log = read(KEYS.wrongLog, []);
  log.push({ id, date: todayStr() });
  const cutoff = daysAgoStr(60);
  write(KEYS.wrongLog, log.filter((e) => e.date >= cutoff));
}

// Returns a Set of vocab ids that were logged wrong within the last `days`
// days (inclusive of today).
export function getWrongIdsSince(days) {
  const log = read(KEYS.wrongLog, []);
  const cutoff = daysAgoStr(days);
  const ids = new Set();
  for (const e of log) {
    if (e.date >= cutoff) ids.add(e.id);
  }
  return ids;
}

// --- Word lists: user-created collections of saved words ---
// { [listId]: { id, name, createdAt, words: [{ traditional, jyutping,
// english, vocabId }, ...] } }
// vocabId (a VOCAB/RESTAURANT_VOCAB id) is set when the word matches the
// app's curated vocab and null otherwise — lists can hold any word you tap
// while reading (including untracked particles/filler), not just ones the
// app happens to track for SRS review. A word can belong to any number of
// lists.
export function getWordLists() {
  const lists = read(KEYS.wordLists, {});
  let migrated = false;
  for (const list of Object.values(lists)) {
    // Migrate the original shape (`wordIds: [number, ...]`) into word
    // records, resolving each id against the real vocab data one last time.
    if (!Array.isArray(list.words)) {
      const oldIds = Array.isArray(list.wordIds) ? list.wordIds : [];
      list.words = oldIds
        .map((id) => {
          const w = getWordById(id);
          return w ? { traditional: w.traditional, jyutping: w.jyutping, english: w.english, vocabId: id } : null;
        })
        .filter(Boolean);
      delete list.wordIds;
      migrated = true;
    }
  }
  if (migrated) write(KEYS.wordLists, lists);
  return lists;
}

function saveWordLists(lists) {
  write(KEYS.wordLists, lists);
}

export function createWordList(name) {
  const lists = getWordLists();
  const id = `list_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`;
  lists[id] = { id, name, createdAt: todayStr(), words: [] };
  saveWordLists(lists);
  return lists[id];
}

export function renameWordList(listId, name) {
  const lists = getWordLists();
  if (!lists[listId]) return;
  lists[listId].name = name;
  saveWordLists(lists);
}

export function deleteWordList(listId) {
  const lists = getWordLists();
  delete lists[listId];
  saveWordLists(lists);
}

// `word`: { traditional, jyutping, english, vocabId }. Dedupes by
// traditional text within the list.
export function addWordToList(listId, word) {
  const lists = getWordLists();
  const list = lists[listId];
  if (!list) return;
  if (!list.words.some((w) => w.traditional === word.traditional)) {
    list.words.push({ traditional: word.traditional, jyutping: word.jyutping, english: word.english, vocabId: word.vocabId ?? null });
  }
  saveWordLists(lists);
}

export function removeWordFromList(listId, traditional) {
  const lists = getWordLists();
  const list = lists[listId];
  if (!list) return;
  list.words = list.words.filter((w) => w.traditional !== traditional);
  saveWordLists(lists);
}

// --- Review streak ---
export function logReviewToday() {
  const days = read(KEYS.reviewDays, []);
  const today = todayStr();
  if (!days.includes(today)) {
    days.push(today);
    write(KEYS.reviewDays, days);
  }
}

export function computeStreak() {
  const days = new Set(read(KEYS.reviewDays, []));
  let streak = 0;
  let cursor = new Date();
  // if no review today yet, streak still counts back from yesterday
  if (!days.has(todayStr())) {
    cursor.setDate(cursor.getDate() - 1);
  }
  while (days.has(cursor.toISOString().slice(0, 10))) {
    streak += 1;
    cursor.setDate(cursor.getDate() - 1);
  }
  return streak;
}
