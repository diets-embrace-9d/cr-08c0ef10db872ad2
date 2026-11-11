// Simplified SM-2 spaced repetition scheduling.
const MIN_EASE = 1.3;

function addDays(dateStr, days) {
  const d = new Date(dateStr + "T00:00:00");
  d.setDate(d.getDate() + Math.max(0, Math.round(days)));
  return d.toISOString().slice(0, 10);
}

// rating: "again" | "hard" | "good" | "easy"
export function schedule(card, rating, today) {
  let { interval, ease, reps } = card;

  if (rating === "again") {
    interval = 0;
    reps = 0;
    ease = Math.max(MIN_EASE, ease - 0.2);
  } else if (rating === "hard") {
    ease = Math.max(MIN_EASE, ease - 0.15);
    interval = interval === 0 ? 1 : Math.max(1, interval * 1.2);
    reps += 1;
  } else if (rating === "good") {
    interval = interval === 0 ? 1 : interval * ease;
    reps += 1;
  } else if (rating === "easy") {
    ease = ease + 0.15;
    interval = interval === 0 ? 4 : interval * ease * 1.3;
    reps += 1;
  }

  return {
    interval,
    ease,
    reps,
    due: rating === "again" ? today : addDays(today, interval),
    lastRating: rating,
  };
}

export function isDue(card, today) {
  return card.due <= today;
}

// A card counts as "mature" once its interval is at least 21 days.
export function isMature(card) {
  return card.interval >= 21;
}
