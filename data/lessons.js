// Builds numbered, named lessons (~10 new words each) from the thematic
// categories already baked into vocab.js / restaurant.js (see the "//"
// section comments in those files — the id ranges here mirror them
// exactly). Four courses: Top 200, 201-500, 501-1000, and the Restaurant
// bonus pack.
import { VOCAB } from "./vocab.js";
import { RESTAURANT_VOCAB } from "./restaurant.js";

// Splits a category of `size` words into lesson-sized chunks. Categories of
// 15 or fewer stay as one lesson (still "approximately 10"); larger ones
// split into roughly-equal parts targeting ~10 words each.
function evenChunks(size, target = 10) {
  if (size <= 15) return [size];
  const count = Math.max(2, Math.round(size / target));
  const base = Math.floor(size / count);
  const rem = size % count;
  const chunks = [];
  for (let i = 0; i < count; i++) chunks.push(base + (i < rem ? 1 : 0));
  return chunks;
}

function idsInRange(pool, start, end) {
  return pool.filter((w) => w.id >= start && w.id <= end).map((w) => w.id);
}

function shareChar(a, b) {
  for (const ch of a.traditional) {
    if (b.traditional.includes(ch)) return true;
  }
  return false;
}

function permutations(arr) {
  if (arr.length <= 1) return [arr];
  const result = [];
  for (let i = 0; i < arr.length; i++) {
    const rest = [...arr.slice(0, i), ...arr.slice(i + 1)];
    for (const p of permutations(rest)) result.push([arr[i], ...p]);
  }
  return result;
}

// Orders one connected cluster of indices (all mutually reachable via
// shared characters) to maximize how many *adjacent* pairs actually share
// a character — a pure "grab the first match" greedy walk can strand a
// word next to the wrong neighbor when it has multiple valid connections
// (e.g. 唔該 links to both 唔/唔使 via 唔 and to 應該 via 該; greedy always
// took the 唔 link first, leaving 應該 stranded elsewhere). Small clusters
// (the norm — a handful of words sharing one character) get brute-forced
// for the true best arrangement; ties prefer staying close to the
// original rank order. Oversized clusters fall back to a greedy walk
// rather than blowing up factorially.
function orderCluster(indices, words) {
  if (indices.length <= 2) return indices;
  if (indices.length > 7) {
    const remaining = [...indices];
    const ordered = [remaining.shift()];
    while (remaining.length) {
      const last = words[ordered[ordered.length - 1]];
      const idx = remaining.findIndex((i) => shareChar(last, words[i]));
      ordered.push(idx >= 0 ? remaining.splice(idx, 1)[0] : remaining.shift());
    }
    return ordered;
  }
  let best = indices;
  let bestScore = -1;
  let bestDrift = Infinity;
  for (const perm of permutations(indices)) {
    let score = 0;
    for (let i = 0; i < perm.length - 1; i++) {
      if (shareChar(words[perm[i]], words[perm[i + 1]])) score++;
    }
    let drift = 0;
    for (let i = 0; i < perm.length; i++) drift += Math.abs(perm[i] - indices[i]);
    if (score > bestScore || (score === bestScore && drift < bestDrift)) {
      best = perm;
      bestScore = score;
      bestDrift = drift;
    }
  }
  return best;
}

// Reorders a lesson's words so ones sharing a Han character end up next to
// each other (e.g. 唔該 taught right next to 應該, both sharing 該) —
// seeing the shared character in context right away reinforces it, rather
// than the words landing in opposite corners of the lesson by coincidence
// of rank. Words are grouped into connected clusters (any chain of shared
// characters), each cluster ordered internally by orderCluster, then
// clusters are laid out in their original rank order.
function groupByChar(ids, pool) {
  const words = ids.map((id) => pool.find((w) => w.id === id)).filter(Boolean);
  const n = words.length;
  const parent = words.map((_, i) => i);
  function find(x) {
    while (parent[x] !== x) {
      parent[x] = parent[parent[x]];
      x = parent[x];
    }
    return x;
  }
  function union(a, b) {
    const ra = find(a);
    const rb = find(b);
    if (ra !== rb) parent[ra] = rb;
  }
  for (let i = 0; i < n; i++) {
    for (let j = i + 1; j < n; j++) {
      if (shareChar(words[i], words[j])) union(i, j);
    }
  }
  const clusters = new Map();
  for (let i = 0; i < n; i++) {
    const root = find(i);
    if (!clusters.has(root)) clusters.set(root, []);
    clusters.get(root).push(i);
  }
  const orderedClusters = [...clusters.values()].sort((a, b) => a[0] - b[0]);
  const result = [];
  for (const cluster of orderedClusters) result.push(...orderCluster(cluster, words));
  return result.map((i) => words[i].id);
}

function buildLessonsForCategory(cat, pool) {
  if (cat.override) return cat.override.map((l) => ({ ...l, ids: groupByChar(l.ids, pool) }));
  const ids = idsInRange(pool, cat.start, cat.end);
  const sizes = evenChunks(ids.length);
  const lessons = [];
  let cursor = 0;
  sizes.forEach((size, i) => {
    lessons.push({
      name: sizes.length > 1 ? `${cat.name} (Part ${i + 1} of ${sizes.length})` : cat.name,
      desc: cat.desc,
      ids: groupByChar(ids.slice(cursor, cursor + size), pool),
    });
    cursor += size;
  });
  return lessons;
}

function buildCourse(id, title, categories, pool) {
  const lessons = [];
  let num = 1;
  for (const cat of categories) {
    for (const l of buildLessonsForCategory(cat, pool)) {
      lessons.push({ number: num++, name: l.name, desc: l.desc, ids: l.ids });
    }
  }
  return { id, title, lessons };
}

// ---- Top 200 (ids 1-200) ----
const TOP200_CATS = [
  {
    name: "Grammar Essentials",
    desc: "Particles, aspect markers, classifiers, and connecting words — the scaffolding every other sentence leans on, taught first so it's available from lesson one.",
    override: [
      {
        name: "Particles, Markers & Classifiers",
        desc: "呀/㗎/喇 (particles), 咗/緊/晒 (aspect markers), 個/件/間 (classifiers), and everyday connectors like 就/又/喺/嘅.",
        ids: [1500, 1501, 1502, 1503, 1504, 1505, 1506, 1507, 1508, 1509, 1510, 1511, 1512, 1513, 1514, 1515, 1516],
      },
    ],
  },
  {
    name: "Basics: To Be & To Have",
    desc: "The three most essential verbs — 係, 有, and 冇 — taught first so every later lesson has a verb to build sentences with.",
    override: [
      {
        name: "To Be & To Have",
        desc: "係 (to be), 有 (to have), 冇 (to not have).",
        ids: [36, 37, 38],
      },
    ],
  },
  {
    name: "Pronouns & Question Words",
    desc: "The words you'll use in almost every question and every answer.",
    override: [
      {
        name: "Personal Pronouns",
        desc: "I, you, he/she/it, and their plurals — plus 'oneself'.",
        ids: [1, 2, 3, 4, 5, 6, 20],
      },
      {
        name: "Question Words & Demonstratives",
        desc: "What, who, where, when, why, how, and this/that/here/there.",
        ids: [7, 8, 9, 10, 11, 12, 13, 14, 19, 15, 16, 17, 18],
      },
    ],
  },
  { name: "Numbers", desc: "Zero through ten, plus hundred, thousand, and ten-thousand.", start: 21, end: 35 },
  { name: "Core Verbs", desc: "The verbs you'll use in almost every sentence: go, eat, see, want...", start: 39, end: 90 },
  { name: "Modal Words & Connectors", desc: "Small words that glue sentences together — and, but, because, so, maybe...", start: 91, end: 110 },
  { name: "Adjectives", desc: "Describing people, size, speed, temperature, price, and mood.", start: 111, end: 150 },
  { name: "Time Words", desc: "Today, tomorrow, yesterday, and other everyday time expressions.", start: 151, end: 170 },
  { name: "Family & People", desc: "Parents, siblings, spouses, and the people around you.", start: 171, end: 185 },
  { name: "Places", desc: "Common everyday locations — home, school, hospital, the MTR...", start: 186, end: 200 },
];

// ---- 201-500 ----
const TOP500_CATS = [
  { name: "Colors", desc: "The basic color words.", start: 201, end: 210 },
  { name: "Body Parts", desc: "Head, hands, and everything in between.", start: 211, end: 225 },
  { name: "Food & Drink", desc: "Rice, noodles, tea, and other everyday food words.", start: 226, end: 250 },
  { name: "Weather", desc: "Rain, wind, sun, and talking about the weather.", start: 251, end: 260 },
  { name: "Clothing", desc: "Shirts, shoes, and things you wear.", start: 261, end: 270 },
  { name: "Transport", desc: "Cars, buses, the MTR, and getting around.", start: 271, end: 280 },
  { name: "Shopping & Money", desc: "Prices, change, cards, and buying things.", start: 281, end: 295 },
  { name: "Tech", desc: "Phones, computers, and getting online.", start: 296, end: 305 },
  { name: "Emotions", desc: "How you feel — happy, angry, nervous, and more.", start: 306, end: 320 },
  { name: "Directions", desc: "Up, down, left, right, and finding your way.", start: 321, end: 330 },
  { name: "Classifiers", desc: "The measure words that go between numbers and nouns.", start: 331, end: 345 },
  { name: "Days of the Week", desc: "Monday through Sunday.", start: 346, end: 352 },
  { name: "More Verbs", desc: "Start, finish, choose, decide, explain — everyday action words.", start: 353, end: 400 },
  { name: "Everyday Nouns", desc: "Media, furniture, animals, nature, countries, and language.", start: 401, end: 460 },
  { name: "Greetings & Common Phrases", desc: "Hello, sorry, congratulations — ready-to-use expressions.", start: 461, end: 475 },
  { name: "More Adjectives", desc: "Quiet, bright, wet, heavy — more ways to describe things.", start: 476, end: 500 },
];

// ---- 501-1000 ----
const TOP1000_CATS = [
  { name: "Work & Office", desc: "Meetings, salaries, bosses, and the working world.", start: 501, end: 530 },
  { name: "Education", desc: "School, exams, and everything academic.", start: 531, end: 555 },
  { name: "Health", desc: "Doctors, symptoms, and talking about how you feel physically.", start: 556, end: 580 },
  { name: "Sports & Hobbies", desc: "Ball games, hiking, music, and things you do for fun.", start: 581, end: 605 },
  { name: "Travel", desc: "Passports, flights, hotels, and getting around abroad.", start: 606, end: 630 },
  { name: "Relationships", desc: "Dating, marriage, and talking about relationships.", start: 631, end: 650 },
  { name: "Abstract Concepts", desc: "Freedom, fairness, courage — bigger ideas.", start: 651, end: 675 },
  { name: "HK Culture & Food", desc: "Cha chaan teng, trams, and everyday Hong Kong life.", start: 676, end: 700 },
  { name: "Extended Verbs", desc: "Suggest, support, improve, discuss — more nuanced actions.", start: 701, end: 740 },
  { name: "Extended Adjectives", desc: "Personality words — brave, honest, stubborn, generous.", start: 741, end: 770 },
  { name: "Professions & Society", desc: "Jobs, government, and how society is organized.", start: 771, end: 800 },
  { name: "Festivals", desc: "Christmas, Lunar New Year, and other celebrations.", start: 801, end: 812 },
  { name: "Time & Quantity", desc: "Seasons, weekends, and talking about roughly how much or when.", start: 813, end: 832 },
  { name: "Comparison Words", desc: "More, most, similar, almost — comparing things.", start: 833, end: 847 },
  { name: "More Classifiers & Ordinals", desc: "Half, times, first, second — more counting words.", start: 848, end: 862 },
  { name: "Idioms & Expressions", desc: "Natural, colloquial phrases real speakers actually use.", start: 863, end: 882 },
  { name: "Tech Extra", desc: "Apps, passwords, social media, and charging your phone.", start: 883, end: 902 },
  { name: "Home & Furniture", desc: "Sofas, switches, and everything around the house.", start: 903, end: 922 },
  { name: "Nature & Animals", desc: "Pandas, mountains, and the natural world.", start: 923, end: 942 },
  { name: "Food Extra", desc: "More dishes, condiments, and things to eat.", start: 943, end: 962 },
  { name: "Materials & Science", desc: "Wood, metal, shapes, and basic science words.", start: 963, end: 982 },
  { name: "News & Environment", desc: "News, pollution, recycling, and the wider world.", start: 983, end: 1000 },
];

// ---- Restaurant bonus pack ----
const RESTAURANT_CATS = [
  { name: "Ordering & the Bill", desc: "Everything from booking a table to paying up.", start: 2001, end: 2020 },
  { name: "Cha Chaan Teng Classics", desc: "The HK café menu — milk tea, French toast, fried rice.", start: 2021, end: 2040 },
  { name: "Noodle & Congee Shop", desc: "Wonton noodles, congee, and rice noodle rolls.", start: 2041, end: 2055 },
  { name: "Dim Sum", desc: "Classic yum cha dishes.", start: 2056, end: 2065 },
  { name: "Roast Meats & BBQ", desc: "Roast goose, soy sauce chicken, and siu mei.", start: 2066, end: 2073 },
  { name: "Vegetables & Sides", desc: "Stir-fried greens and side dishes.", start: 2074, end: 2079 },
  { name: "Cooking Methods & Taste", desc: "How dishes are cooked, and describing how they taste.", start: 2080, end: 2095 },
  { name: "Allergies & Dietary Needs", desc: "Explaining allergies and dietary restrictions.", start: 2096, end: 2103 },
  { name: "Ordering Phrases", desc: "Full, ready-to-use restaurant questions and requests.", start: 2104, end: 2112 },
  { name: "Tableware", desc: "Chopsticks, napkins, and what's on the table.", start: 2113, end: 2118 },
  { name: "Soups", desc: "Classic Chinese restaurant soups.", start: 2119, end: 2122 },
  { name: "Sichuan & Mandarin Classics", desc: "Kung Pao chicken, mapo tofu, Peking duck, and more.", start: 2123, end: 2134 },
  { name: "Dumplings & Noodles", desc: "Xiao long bao, potstickers, and noodle dishes.", start: 2135, end: 2139 },
  { name: "Hot Pot", desc: "Hot pot vocabulary for your next 打邊爐 night.", start: 2140, end: 2144 },
  { name: "Seafood Dishes", desc: "Lobster, crab, scallops, and seafood classics.", start: 2145, end: 2152 },
  { name: "Spice Level & Flavor", desc: "Ordering your food exactly how you like it.", start: 2153, end: 2156 },
  // Appended (not interleaved) so existing lesson numbers — and anyone's
  // already-completed lessons — don't shift.
  { name: "Yum Cha Basics", desc: "Tea, trolleys, and the etiquette of a dim sum outing.", start: 2157, end: 2166 },
  { name: "Steamed Dim Sum", desc: "Har gow, siu mai, char siu bao, and other classic steamed dishes.", start: 2167, end: 2178 },
  { name: "Fried Dim Sum", desc: "Spring rolls, taro puffs, and other crispy dim sum favorites.", start: 2179, end: 2184 },
  { name: "Sweet Dim Sum & Desserts", desc: "Tofu pudding, mango sago, and other dim sum sweets.", start: 2185, end: 2191 },
  { name: "Noodle Shop Menu", desc: "Dish names and practical phrases from a real Hong Kong noodle shop menu — pairs with the Realistic Reader.", start: 2192, end: 2209 },
];

export const COURSES = [
  buildCourse("top200", "Top 200 Words", TOP200_CATS, VOCAB),
  buildCourse("top500", "201–500 Words", TOP500_CATS, VOCAB),
  buildCourse("top1000", "501–1000 Words", TOP1000_CATS, VOCAB),
  buildCourse("restaurant", "🍜 HK Restaurant (Bonus)", RESTAURANT_CATS, RESTAURANT_VOCAB),
];

export function getCourse(courseId) {
  return COURSES.find((c) => c.id === courseId);
}

export function getLesson(courseId, lessonNumber) {
  const course = getCourse(courseId);
  if (!course) return null;
  return course.lessons.find((l) => l.number === Number(lessonNumber)) || null;
}

export function getWordById(id) {
  return id >= 2000 ? RESTAURANT_VOCAB.find((w) => w.id === id) : VOCAB.find((w) => w.id === id);
}
