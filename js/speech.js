// Web Speech API wrapper for Cantonese (zh-HK) pronunciation.
let cachedVoices = [];

function loadVoices() {
  cachedVoices = window.speechSynthesis ? window.speechSynthesis.getVoices() : [];
  return cachedVoices;
}

if (window.speechSynthesis) {
  loadVoices();
  window.speechSynthesis.onvoiceschanged = loadVoices;
}

export function getCantoneseVoices() {
  const voices = cachedVoices.length ? cachedVoices : loadVoices();
  // Platforms label Cantonese differently: zh-HK, zh_HK, yue, yue-HK, zh-yue.
  return voices.filter((v) => /^(zh[-_]hk|yue|zh[-_]yue)([-_]|$)/i.test(v.lang));
}

export function hasCantoneseVoice() {
  return getCantoneseVoices().length > 0;
}

// Some outputs, USB audio especially, pop when the system closes the audio
// stream just after speech ends. A silent Web Audio stream holds the output
// open between clips, then lets it go after a long idle period.
const OUTPUT_HOLD_MS = 5 * 60 * 1000;
let outputContext = null;
let outputReleaseTimer = null;

function holdAudioOutput() {
  const AudioContextClass = window.AudioContext || window.webkitAudioContext;
  // Before the first user gesture the browser would refuse to start it.
  if (!AudioContextClass || navigator.userActivation?.hasBeenActive === false) return;

  if (!outputContext) {
    outputContext = new AudioContextClass();
    const silence = outputContext.createGain();
    silence.gain.value = 0;
    const source = outputContext.createConstantSource();
    source.connect(silence).connect(outputContext.destination);
    source.start();
  }
  outputContext.resume().catch(() => {});

  clearTimeout(outputReleaseTimer);
  outputReleaseTimer = setTimeout(() => outputContext.suspend().catch(() => {}), OUTPUT_HOLD_MS);
}

function makeUtterance(text, voiceURI, rate) {
  holdAudioOutput();
  const utter = new SpeechSynthesisUtterance(text);
  const candidates = getCantoneseVoices();
  const chosen =
    (voiceURI && candidates.find((v) => v.voiceURI === voiceURI)) || candidates[0];
  if (chosen) {
    utter.voice = chosen;
    utter.lang = chosen.lang;
  } else {
    utter.lang = "zh-HK";
  }
  utter.rate = rate;
  return utter;
}

export function speak(text, voiceURI) {
  if (!window.speechSynthesis) return false;
  window.speechSynthesis.cancel();
  window.speechSynthesis.speak(makeUtterance(text, voiceURI, 0.9));
  return true;
}

// Tracks the in-flight highlight run so a new call can cleanly cancel it
// (clearing timers, not just leaving old highlight spans stuck lit).
let activeStop = null;

// Speaks `text` while calling onChar(charIndex) as each character is
// spoken, so the caller can highlight it. Real per-character sync depends
// on the browser/voice firing SpeechSynthesisUtterance 'boundary' events —
// support is inconsistent, especially for CJK. If no boundary event arrives
// shortly after speech starts, falls back to evenly-timed stepping across
// the text so the highlight still animates, just without a guaranteed
// perfect sync. Calls onDone() when speech ends (or immediately if speech
// synthesis isn't available at all).
export function speakHighlighted(text, voiceURI, { onChar, onDone, rate = 0.85 } = {}) {
  if (activeStop) {
    activeStop();
    activeStop = null;
  }
  if (!window.speechSynthesis) {
    onDone?.();
    return () => {};
  }

  window.speechSynthesis.cancel();
  const utter = makeUtterance(text, voiceURI, rate);

  let gotBoundary = false;
  let startTimer = null;
  let fallbackInterval = null;
  let finished = false;
  let lastIndexSeen = -1;
  const n = text.length;

  function stop() {
    clearTimeout(startTimer);
    clearInterval(fallbackInterval);
  }

  function finish() {
    if (finished) return;
    finished = true;
    stop();
    onDone?.();
  }

  function fireChar(i) {
    lastIndexSeen = i;
    onChar?.(i);
  }

  utter.onboundary = (e) => {
    gotBoundary = true;
    clearInterval(fallbackInterval);
    if (typeof e.charIndex === "number") fireChar(e.charIndex);
  };

  utter.onstart = () => {
    startTimer = setTimeout(() => {
      if (gotBoundary || finished) return;
      // No boundary events arrived — approximate evenly-timed stepping.
      // 260ms/char is calibrated at the default 0.85 rate; scale for others.
      const msPerChar = 260 * (0.85 / rate);
      const estMs = Math.max(500, n * msPerChar);
      const step = estMs / n;
      let i = 0;
      fallbackInterval = setInterval(() => {
        fireChar(i);
        i += 1;
        if (i >= n) clearInterval(fallbackInterval);
      }, step);
    }, 200);
  };

  // Speech genuinely ends the instant the last character is spoken, which
  // is also exactly when onChar last fired — callers typically clear the
  // highlight on onDone, so without a beat of breathing room the final
  // character's highlight is never actually visible. onerror doesn't need
  // the same grace period.
  //
  // Separately, many browsers/voices simply never fire a 'boundary' event
  // for the LAST character (word-boundary events tend to mark the start of
  // each token, and there's no following token to anchor one for the
  // last) — so onChar(n - 1) may never have been called at all. Force it
  // here as a fallback so the last character always gets its moment.
  utter.onend = () => {
    if (n > 0 && lastIndexSeen < n - 1) fireChar(n - 1);
    setTimeout(finish, 200);
  };
  utter.onerror = finish;

  activeStop = finish;
  window.speechSynthesis.speak(utter);
  return finish;
}

// Immediately stops any in-flight speakHighlighted() call: cancels the
// browser's speech queue and fires onDone so callers can clear highlights.
export function stopSpeaking() {
  if (window.speechSynthesis) window.speechSynthesis.cancel();
  if (activeStop) {
    activeStop();
    activeStop = null;
  }
}

// True pause/resume (not cancel) — the in-flight utterance picks back up
// from where it left off, on browsers that support it. Callers that need a
// hard stop should use stopSpeaking() instead.
export function pauseSpeaking() {
  if (window.speechSynthesis) window.speechSynthesis.pause();
}

export function resumeSpeaking() {
  if (window.speechSynthesis) window.speechSynthesis.resume();
}
