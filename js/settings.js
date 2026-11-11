import { renderNav, toast } from "./nav.js";
import { getSettings, saveSettings, resetAllProgress } from "./storage.js";
import { getCantoneseVoices, speak } from "./speech.js";

renderNav("settings.html");

const settings = getSettings();
const statusEl = document.getElementById("voice-status");
const selectEl = document.getElementById("voice-select");
const overrideEl = document.getElementById("tier-override");

overrideEl.checked = !!settings.tierOverride;
overrideEl.addEventListener("change", () => {
  settings.tierOverride = overrideEl.checked;
  saveSettings(settings);
});

const restaurantToggleEl = document.getElementById("restaurant-pack-toggle");
restaurantToggleEl.checked = !!settings.includeRestaurantPack;
restaurantToggleEl.addEventListener("change", () => {
  settings.includeRestaurantPack = restaurantToggleEl.checked;
  saveSettings(settings);
  toast(
    settings.includeRestaurantPack
      ? "Restaurant pack added to your review queue"
      : "Restaurant pack removed from review"
  );
});

function populateVoices() {
  const voices = getCantoneseVoices();
  if (!voices.length) {
    statusEl.textContent =
      "No zh-HK (Cantonese) voice found in this browser. Audio playback may not work — try Chrome or Safari on macOS, or install a Cantonese voice in system settings.";
    selectEl.innerHTML = `<option value="">(none available)</option>`;
    selectEl.disabled = true;
    return;
  }
  statusEl.textContent = `${voices.length} Cantonese voice(s) available.`;
  selectEl.disabled = false;
  selectEl.innerHTML = voices
    .map(
      (v) =>
        `<option value="${v.voiceURI}" ${v.voiceURI === settings.voiceURI ? "selected" : ""}>${v.name} (${v.lang})</option>`
    )
    .join("");
}

selectEl.addEventListener("change", () => {
  settings.voiceURI = selectEl.value || null;
  saveSettings(settings);
});

document.getElementById("test-voice").addEventListener("click", () => {
  speak("你好，多謝！", settings.voiceURI);
});

document.getElementById("reset-btn").addEventListener("click", () => {
  if (confirm("This clears all flashcard progress and streaks. Continue?")) {
    resetAllProgress();
    toast("Progress reset");
  }
});

populateVoices();
setTimeout(populateVoices, 500); // voices list loads async in some browsers
