// Shared "word revealed" panel: pronunciation + meaning, a play-audio
// button, a "+ flashcard" quick-add, and an "+ list" control for adding the
// word to a user-created list (or creating a new one on the spot). Used by
// any page that lets you tap a word to see its info — Reading passages
// and, per-lesson, the Reading Practice and Story Practice pages.
import { getWordLists, createWordList, addWordToList } from "./storage.js";
import { toast } from "./nav.js";
import { speak } from "./speech.js";

function escapeHtml(s) {
  return String(s)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

// Returns the inner HTML for a reveal panel. `word` is
// { traditional, jyutping, english, vocabId }. `vocabId` may be
// null/undefined for words with no stable id (dictionary-only lookups) —
// those still get play + add-to-list, just no "+ flashcard" (SRS review
// needs a real vocab id to schedule against).
export function wordInfoHtml(word) {
  const { traditional, jyutping, english, vocabId } = word;
  const data = `data-traditional="${escapeHtml(traditional)}" data-jyutping="${escapeHtml(jyutping)}" data-english="${escapeHtml(english)}"${vocabId != null ? ` data-vid="${vocabId}"` : ""}`;
  const flashBtn =
    vocabId != null
      ? `<button type="button" class="btn ghost add-flash" data-vid="${vocabId}" style="margin-left:8px; padding:3px 10px; font-size:0.8rem;">+ flashcard</button>`
      : "";
  return `<button type="button" class="icon-btn play-word" ${data} title="Play word" style="vertical-align:middle;">🔊</button>
    <b>${jyutping}</b> — ${escapeHtml(english)}${flashBtn}
    <span class="list-add-wrap" ${data} style="position:relative; display:inline-block;">
      <button type="button" class="btn ghost list-add-toggle" style="margin-left:6px; padding:3px 10px; font-size:0.8rem;">+ list ▾</button>
      <div class="list-add-menu" hidden></div>
    </span>`;
}

function wordFromDataset(el) {
  const vid = el.dataset.vid;
  return {
    traditional: el.dataset.traditional,
    jyutping: el.dataset.jyutping,
    english: el.dataset.english,
    vocabId: vid != null ? Number(vid) : null,
  };
}

function renderListMenu() {
  const lists = Object.values(getWordLists()).sort((a, b) => b.createdAt.localeCompare(a.createdAt));
  const items = lists.length
    ? lists
        .map(
          (l) =>
            `<button type="button" class="list-add-item" data-list-id="${l.id}" data-name="${escapeHtml(l.name)}">${escapeHtml(l.name)} <span class="muted">(${l.words.length})</span></button>`
        )
        .join("")
    : `<div class="muted" style="padding:6px 10px; font-size:0.85rem;">No lists yet</div>`;
  return `
    ${items}
    <div class="list-add-new">
      <input type="text" class="list-add-input" placeholder="New list name" />
      <button type="button" class="list-add-create">Create</button>
    </div>`;
}

// Wires click-delegation for every wordInfoHtml() control rendered inside
// `root`. Call once per page. `voiceURI` is used for the play-word button.
// `onFlashAdd(vocabId)` fires for the "+ flashcard" button; list add/create
// is handled entirely in here.
export function wireWordListControls(root, { voiceURI, onFlashAdd } = {}) {
  root.addEventListener("click", (e) => {
    const playBtn = e.target.closest(".play-word");
    if (playBtn) {
      speak(playBtn.dataset.traditional, voiceURI);
      return;
    }

    const flashBtn = e.target.closest(".add-flash");
    if (flashBtn) {
      onFlashAdd?.(Number(flashBtn.dataset.vid));
      return;
    }

    const toggleBtn = e.target.closest(".list-add-toggle");
    if (toggleBtn) {
      const wrap = toggleBtn.closest(".list-add-wrap");
      const menu = wrap.querySelector(".list-add-menu");
      const wasHidden = menu.hasAttribute("hidden");
      root.querySelectorAll(".list-add-menu").forEach((m) => m.setAttribute("hidden", ""));
      if (wasHidden) {
        menu.innerHTML = renderListMenu();
        menu.removeAttribute("hidden");
      }
      return;
    }

    const itemBtn = e.target.closest(".list-add-item");
    if (itemBtn) {
      const word = wordFromDataset(itemBtn.closest(".list-add-wrap"));
      addWordToList(itemBtn.dataset.listId, word);
      toast(`Added to ${itemBtn.dataset.name}`);
      itemBtn.closest(".list-add-menu")?.setAttribute("hidden", "");
      return;
    }

    const createBtn = e.target.closest(".list-add-create");
    if (createBtn) {
      const input = createBtn.closest(".list-add-new").querySelector(".list-add-input");
      const name = input.value.trim();
      if (!name) {
        input.focus();
        return;
      }
      const word = wordFromDataset(createBtn.closest(".list-add-wrap"));
      const list = createWordList(name);
      addWordToList(list.id, word);
      toast(`Created "${name}" and added`);
      createBtn.closest(".list-add-menu")?.setAttribute("hidden", "");
      return;
    }

    // Any other click within root closes open menus, unless it's inside
    // the wrap itself (e.g. clicking the text input to type a name).
    if (!e.target.closest(".list-add-wrap")) {
      root.querySelectorAll(".list-add-menu").forEach((m) => m.setAttribute("hidden", ""));
    }
  });

  // Close open menus on any click outside this panel entirely.
  document.addEventListener("click", (e) => {
    if (!root.contains(e.target)) {
      root.querySelectorAll(".list-add-menu").forEach((m) => m.setAttribute("hidden", ""));
    }
  });
}
