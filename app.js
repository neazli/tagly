// Daily Notes - Simple notes app grouped by tags

// Storage key used in localStorage
const STORAGE_KEY = "daily-notes";

// App state holds tags and notes
let state = {
  tags: [],
  notes: []
};

// Currently selected filter bubble ("all" or a tag id)
let currentFilter = "all";

// Load saved data from localStorage
function loadState() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      const parsed = JSON.parse(saved);
      if (Array.isArray(parsed.tags) && Array.isArray(parsed.notes)) {
        state = parsed;
        return;
      }
    }
  } catch (error) {
    console.warn("Could not read saved notes, starting fresh.", error);
  }
  state = { tags: [], notes: [] };
}

// Save current data to localStorage
function saveState() {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch (error) {
    console.error("Could not save to localStorage.", error);
  }
}

// Format today's date for display (e.g. "Oct 18, 2026")
function formatDisplayDate(date = new Date()) {
  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric"
  });
}

// Create a new tag with a name (emojis allowed)
function createTag(name) {
  const trimmed = name.trim();
  if (!trimmed) return null;

  const newTag = {
    id: "tag-" + Date.now() + "-" + Math.random().toString(36).slice(2, 6),
    name: trimmed
  };

  state.tags.push(newTag);
  saveState();
  renderApp();
  return newTag;
}

// Add a new note inside a specific tag card
function addNote(tagId, text) {
  const trimmed = text.trim();
  // Ignore blank notes
  if (!trimmed) return null;

  const newNote = {
    id: "note-" + Date.now() + "-" + Math.random().toString(36).slice(2, 6),
    tagId: tagId,
    text: trimmed,
    createdAt: formatDisplayDate(),
    deadline: null
  };

  state.notes.push(newNote);
  saveState();
  renderApp();
  return newNote;
}

// Render the top filter bubbles
function renderBubbles() {
  const container = document.getElementById("filter-bubbles");
  if (!container) return;

  if (state.tags.length === 0) {
    container.innerHTML = "";
    return;
  }

  // Create All bubble and one bubble per tag
  let html = `
    <button type="button" class="bubble ${currentFilter === 'all' ? 'active' : ''}" data-filter="all">
      All
    </button>
  `;

  state.tags.forEach(tag => {
    const isActive = currentFilter === tag.id;
    html += `
      <button type="button" class="bubble ${isActive ? 'active' : ''}" data-filter="${tag.id}">
        ${escapeHtml(tag.name)}
      </button>
    `;
  });

  container.innerHTML = html;
}

// Render all tag cards and their notes
function renderTagCards() {
  const container = document.getElementById("tag-cards-container");
  if (!container) return;

  container.innerHTML = "";

  // Which tags to display based on filter
  const tagsToShow = currentFilter === "all"
    ? state.tags
    : state.tags.filter(tag => tag.id === currentFilter);

  tagsToShow.forEach(tag => {
    const card = document.createElement("article");
    card.className = "tag-card";
    card.setAttribute("data-tag-id", tag.id);

    // Notes belonging to this tag
    const tagNotes = state.notes.filter(note => note.tagId === tag.id);

    // Card header
    const headerHtml = `
      <div class="tag-header">
        <h3 class="tag-title">${escapeHtml(tag.name)}</h3>
      </div>
    `;

    // Note input box inside the tag card
    const inputHtml = `
      <form class="note-creator" data-tag-id="${tag.id}">
        <textarea
          class="note-input"
          placeholder="Write your ${escapeHtml(tag.name)} notes here..."
          rows="2"
          required
        ></textarea>
        <div class="note-creator-actions">
          <button type="submit" class="btn btn-primary">Add note</button>
        </div>
      </form>
    `;

    // Notes list inside the card
    let notesListHtml = `<div class="notes-list">`;
    if (tagNotes.length === 0) {
      notesListHtml += `<p class="empty-tag-hint">Write your ${escapeHtml(tag.name)} notes here ✨</p>`;
    } else {
      tagNotes.forEach(note => {
        notesListHtml += `
          <div class="note-card" data-note-id="${note.id}">
            <p class="note-text">${escapeHtml(note.text)}</p>
            <div class="note-footer">
              <span class="note-tag-badge">${escapeHtml(tag.name)}</span>
              <span class="note-date">${escapeHtml(note.createdAt)}</span>
            </div>
          </div>
        `;
      });
    }
    notesListHtml += `</div>`;

    card.innerHTML = headerHtml + inputHtml + notesListHtml;

    // Attach event listener for adding notes
    const form = card.querySelector(".note-creator");
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const textarea = form.querySelector(".note-input");
      if (textarea) {
        addNote(tag.id, textarea.value);
        textarea.value = "";
      }
    });

    container.appendChild(card);
  });
}

// Update the overall page display
function renderApp() {
  const firstUseSection = document.getElementById("first-use-section");
  const addTagSection = document.getElementById("add-tag-section");

  if (state.tags.length === 0) {
    if (firstUseSection) firstUseSection.classList.remove("hidden");
    if (addTagSection) addTagSection.classList.add("hidden");
  } else {
    if (firstUseSection) firstUseSection.classList.add("hidden");
    if (addTagSection) addTagSection.classList.remove("hidden");
  }

  renderBubbles();
  renderTagCards();
}

// Utility to escape HTML and prevent issues with user text
function escapeHtml(text) {
  if (!text) return "";
  return String(text)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

// Set up page event listeners
function initApp() {
  loadState();

  // First-use tag form
  const firstTagForm = document.getElementById("first-tag-form");
  const firstTagInput = document.getElementById("first-tag-input");
  if (firstTagForm && firstTagInput) {
    firstTagForm.addEventListener("submit", (e) => {
      e.preventDefault();
      if (firstTagInput.value.trim()) {
        createTag(firstTagInput.value);
        firstTagInput.value = "";
      }
    });
  }

  // Header add-tag form
  const addTagForm = document.getElementById("add-tag-form");
  const tagNameInput = document.getElementById("tag-name-input");
  if (addTagForm && tagNameInput) {
    addTagForm.addEventListener("submit", (e) => {
      e.preventDefault();
      if (tagNameInput.value.trim()) {
        createTag(tagNameInput.value);
        tagNameInput.value = "";
      }
    });
  }

  // Bubble filter click handler
  const bubblesNav = document.getElementById("filter-bubbles");
  if (bubblesNav) {
    bubblesNav.addEventListener("click", (e) => {
      const bubble = e.target.closest(".bubble");
      if (!bubble) return;
      currentFilter = bubble.getAttribute("data-filter") || "all";
      renderBubbles();
      renderTagCards();
    });
  }

  renderApp();
}

// Start the app when HTML is loaded
document.addEventListener("DOMContentLoaded", initApp);
