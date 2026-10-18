// Tagly - Simple daily notes organized by tags

// Storage key used in localStorage
const STORAGE_KEY = "daily-notes";

// App state holds tags and notes
let state = {
  tags: [],
  notes: []
};

// UI navigation & interaction state
// The app opens on "home" by default
let currentFilter = "home";
let selectedComposerTagId = null;
let currentComposerDeadline = null;
let activeNoteActionId = null;
let editingNoteId = null;
let activeDeleteTagConfirmId = null;

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

// Format date for display (e.g. "Oct 18, 2026")
function formatDisplayDate(date = new Date()) {
  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric"
  });
}

// Calculate deadline status text (days left / Last day today / Time's up)
function computeDeadlineStatus(deadlineStr) {
  if (!deadlineStr) return null;

  // Split YYYY-MM-DD into year, month, day to avoid timezone shifts
  const parts = deadlineStr.split("-").map(Number);
  if (parts.length !== 3) return null;
  const [year, month, day] = parts;

  const deadlineDate = new Date(year, month - 1, day);
  const now = new Date();
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());

  const msPerDay = 1000 * 60 * 60 * 24;
  const diffDays = Math.round((deadlineDate - today) / msPerDay);

  if (diffDays > 1) {
    return { text: `${diffDays} days left`, type: "future" };
  } else if (diffDays === 1) {
    return { text: "1 day left", type: "future" };
  } else if (diffDays === 0) {
    return { text: "Last day today", type: "today" };
  } else {
    return { text: "Time's up", type: "past" };
  }
}

// Create a new tag (emojis allowed)
function createTag(name) {
  const trimmed = name.trim();
  if (!trimmed) return null;

  const newTag = {
    id: "tag-" + Date.now() + "-" + Math.random().toString(36).slice(2, 6),
    name: trimmed
  };

  state.tags.push(newTag);
  selectedComposerTagId = newTag.id;
  saveState();
  renderApp();
  return newTag;
}

// Delete tag handler
function deleteTag(tagId) {
  const tagNotes = state.notes.filter(n => n.tagId === tagId);

  // If empty, delete immediately without asking
  if (tagNotes.length === 0) {
    state.tags = state.tags.filter(t => t.id !== tagId);
    if (currentFilter === tagId) currentFilter = "home";
    if (selectedComposerTagId === tagId) {
      selectedComposerTagId = state.tags.length > 0 ? state.tags[0].id : null;
    }
    activeDeleteTagConfirmId = null;
    saveState();
    renderApp();
    return;
  }

  // If tag has notes, show in-page confirmation
  activeDeleteTagConfirmId = tagId;
  renderApp();
}

// Confirm deletion of a tag with notes
function confirmDeleteTagWithNotes(tagId) {
  state.tags = state.tags.filter(t => t.id !== tagId);
  state.notes = state.notes.filter(n => n.tagId !== tagId);

  if (currentFilter === tagId) currentFilter = "home";
  if (selectedComposerTagId === tagId) {
    selectedComposerTagId = state.tags.length > 0 ? state.tags[0].id : null;
  }
  activeDeleteTagConfirmId = null;
  saveState();
  renderApp();
}

// Cancel tag deletion
function cancelDeleteTag() {
  activeDeleteTagConfirmId = null;
  renderApp();
}

// Add a new note
function addNote(tagId, text, deadline = null) {
  const trimmed = text.trim();
  if (!trimmed) return null;

  const now = new Date();
  const newNote = {
    id: "note-" + Date.now() + "-" + Math.random().toString(36).slice(2, 6),
    tagId: tagId,
    text: trimmed,
    createdAt: formatDisplayDate(now),
    createdTimestamp: now.toISOString(),
    deadline: deadline || null
  };

  state.notes.unshift(newNote);
  saveState();
  renderApp();
  return newNote;
}

// Update existing note
function updateNote(noteId, newText, newDeadline = null) {
  const trimmed = newText.trim();
  if (!trimmed) return;

  const note = state.notes.find(n => n.id === noteId);
  if (note) {
    note.text = trimmed;
    note.deadline = newDeadline || null;
    saveState();
  }
  editingNoteId = null;
  activeNoteActionId = null;
  renderApp();
}

// Delete a note
function deleteNote(noteId) {
  state.notes = state.notes.filter(n => n.id !== noteId);
  activeNoteActionId = null;
  editingNoteId = null;
  saveState();
  renderApp();
}

// Render top navigation bubbles: Home, All, each tag, Deadline
function renderBubbles() {
  const container = document.getElementById("filter-bubbles");
  if (!container) return;

  let html = `
    <button type="button" class="bubble ${currentFilter === 'home' ? 'active' : ''}" data-filter="home">
      🏠 Home
    </button>
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

  html += `
    <button type="button" class="bubble ${currentFilter === 'deadline' ? 'active' : ''}" data-filter="deadline">
      Deadline 📅
    </button>
  `;

  container.innerHTML = html;
}

// Render tag choice chips on the Home composer
function renderComposerTagChips() {
  const container = document.getElementById("composer-tag-chips");
  if (!container) return;

  if (!selectedComposerTagId && state.tags.length > 0) {
    selectedComposerTagId = state.tags[0].id;
  }

  let html = "";
  state.tags.forEach(tag => {
    const isSelected = selectedComposerTagId === tag.id;
    html += `
      <button
        type="button"
        class="tag-chip ${isSelected ? 'selected' : ''}"
        data-tag-id="${tag.id}"
      >
        ${escapeHtml(tag.name)}
      </button>
    `;
  });

  container.innerHTML = html;
}

// Render active tag banner on the Tag notes screen
function renderActiveTagBanner() {
  const banner = document.getElementById("active-tag-banner");
  if (!banner) return;

  // Banner only appears when viewing a specific tag
  if (currentFilter === "home" || currentFilter === "all" || currentFilter === "deadline") {
    banner.classList.add("hidden");
    banner.innerHTML = "";
    return;
  }

  const activeTag = state.tags.find(t => t.id === currentFilter);
  if (!activeTag) {
    banner.classList.add("hidden");
    return;
  }

  banner.classList.remove("hidden");

  // If confirm delete requested
  if (activeDeleteTagConfirmId === activeTag.id) {
    banner.innerHTML = `
      <div class="delete-tag-confirm-box">
        <p><strong>The notes in this tag will also be deleted. Are you sure?</strong></p>
        <div class="delete-tag-confirm-actions">
          <button type="button" class="btn btn-secondary btn-cancel-delete">Cancel</button>
          <button type="button" class="btn btn-danger btn-confirm-delete">Yes, delete tag & notes</button>
        </div>
      </div>
    `;

    banner.querySelector(".btn-cancel-delete").addEventListener("click", cancelDeleteTag);
    banner.querySelector(".btn-confirm-delete").addEventListener("click", () => {
      confirmDeleteTagWithNotes(activeTag.id);
    });
    return;
  }

  // Default banner with tag title and delete tag button
  banner.innerHTML = `
    <span>Showing <strong>${escapeHtml(activeTag.name)}</strong> notes</span>
    <button type="button" class="btn-subtle btn-delete-active-tag">
      🗑️ Delete tag
    </button>
  `;

  banner.querySelector(".btn-delete-active-tag").addEventListener("click", () => {
    deleteTag(activeTag.id);
  });
}

// Render notes list (for All, Tag, or Deadline screen)
function renderNotes() {
  const container = document.getElementById("notes-container");
  if (!container) return;

  container.innerHTML = "";

  // Filter notes based on screen
  let filteredNotes = [];
  if (currentFilter === "all") {
    filteredNotes = state.notes;
  } else if (currentFilter === "deadline") {
    filteredNotes = state.notes.filter(n => Boolean(n.deadline));
  } else if (currentFilter !== "home") {
    filteredNotes = state.notes.filter(n => n.tagId === currentFilter);
  }

  // Empty state handling
  if (filteredNotes.length === 0) {
    let emptyCard = document.createElement("div");
    emptyCard.className = "empty-state-card";

    if (currentFilter === "deadline") {
      emptyCard.innerHTML = `
        <p class="empty-state-title">You have no deadlines right now 🌿✨</p>
        <p class="empty-state-hint">To never miss a deadline, tap 📅 on Home when you write a note.</p>
      `;
    } else if (currentFilter === "all") {
      emptyCard.innerHTML = `
        <p class="empty-state-title">No notes yet ✨</p>
        <p class="empty-state-hint">Go to 🏠 Home to write your first note!</p>
      `;
    } else {
      const activeTag = state.tags.find(t => t.id === currentFilter);
      const tagName = activeTag ? activeTag.name : "this tag";
      emptyCard.innerHTML = `
        <p class="empty-state-title">No notes in ${escapeHtml(tagName)} yet ✨</p>
        <p class="empty-state-hint">Go to 🏠 Home to add notes for ${escapeHtml(tagName)}!</p>
      `;
    }

    container.appendChild(emptyCard);
    return;
  }

  // Render each note card
  filteredNotes.forEach(note => {
    const card = document.createElement("article");
    card.className = "note-card";
    card.setAttribute("data-note-id", note.id);

    const tag = state.tags.find(t => t.id === note.tagId) || { name: "Note" };
    const deadlineStatus = computeDeadlineStatus(note.deadline);

    // In-place edit mode
    if (editingNoteId === note.id) {
      card.innerHTML = `
        <form class="note-edit-box">
          <textarea class="note-textarea edit-text" rows="2" required>${escapeHtml(note.text)}</textarea>
          <div style="display:flex; align-items:center; gap:8px;">
            <label style="font-size:0.85rem; font-weight:700; color:var(--text-muted)">Deadline:</label>
            <input type="date" class="text-input edit-deadline" style="max-width:180px; min-height:36px; padding:6px 12px;" value="${escapeHtml(note.deadline || '')}">
          </div>
          <div class="edit-actions">
            <button type="button" class="btn btn-secondary btn-cancel-edit">Cancel</button>
            <button type="submit" class="btn btn-primary">Save ✨</button>
          </div>
        </form>
      `;

      const form = card.querySelector(".note-edit-box");
      form.addEventListener("submit", (e) => {
        e.preventDefault();
        const newText = form.querySelector(".edit-text").value;
        const newDeadline = form.querySelector(".edit-deadline").value;
        updateNote(note.id, newText, newDeadline);
      });

      card.querySelector(".btn-cancel-edit").addEventListener("click", (e) => {
        e.stopPropagation();
        editingNoteId = null;
        renderApp();
      });

      container.appendChild(card);
      return;
    }

    // Normal note display
    let deadlineBadgeHtml = "";
    if (deadlineStatus) {
      deadlineBadgeHtml = `<span class="deadline-badge ${deadlineStatus.type}">📅 ${escapeHtml(deadlineStatus.text)}</span>`;
    }

    let actionsDrawerHtml = "";
    if (activeNoteActionId === note.id) {
      actionsDrawerHtml = `
        <div class="note-actions-drawer">
          <button type="button" class="btn btn-secondary btn-drawer-action btn-edit-note">✏️ Edit</button>
          <button type="button" class="btn btn-danger btn-drawer-action btn-delete-note">🗑️ Delete</button>
        </div>
      `;
    }

    card.innerHTML = `
      <p class="note-text">${escapeHtml(note.text)}</p>
      <div class="note-footer">
        <div class="note-footer-left">
          <span class="note-tag-badge">${escapeHtml(tag.name)}</span>
          ${deadlineBadgeHtml}
        </div>
        <span class="note-date">🌱 Added on ${escapeHtml(note.createdAt || 'today')}</span>
      </div>
      ${actionsDrawerHtml}
    `;

    // Tap card to toggle edit/delete action drawer
    card.addEventListener("click", (e) => {
      if (e.target.closest(".note-actions-drawer")) return;
      activeNoteActionId = activeNoteActionId === note.id ? null : note.id;
      renderNotes();
    });

    if (activeNoteActionId === note.id) {
      const editBtn = card.querySelector(".btn-edit-note");
      const deleteBtn = card.querySelector(".btn-delete-note");

      if (editBtn) {
        editBtn.addEventListener("click", (e) => {
          e.stopPropagation();
          editingNoteId = note.id;
          renderNotes();
        });
      }

      if (deleteBtn) {
        deleteBtn.addEventListener("click", (e) => {
          e.stopPropagation();
          deleteNote(note.id);
        });
      }
    }

    container.appendChild(card);
  });
}

// Master render
function renderApp() {
  const homeScreen = document.getElementById("home-screen");
  const notesScreen = document.getElementById("notes-screen");
  const firstUseCard = document.getElementById("first-use-card");
  const homeFormsWrapper = document.getElementById("home-forms-wrapper");

  renderBubbles();

  // Screen routing
  if (currentFilter === "home") {
    // Show Home screen, hide notes list screen
    if (homeScreen) homeScreen.classList.remove("hidden");
    if (notesScreen) notesScreen.classList.add("hidden");

    if (state.tags.length === 0) {
      if (firstUseCard) firstUseCard.classList.remove("hidden");
      if (homeFormsWrapper) homeFormsWrapper.classList.add("hidden");
    } else {
      if (firstUseCard) firstUseCard.classList.add("hidden");
      if (homeFormsWrapper) homeFormsWrapper.classList.remove("hidden");
      renderComposerTagChips();
    }
  } else {
    // Show notes list screen, hide Home screen
    if (homeScreen) homeScreen.classList.add("hidden");
    if (notesScreen) notesScreen.classList.remove("hidden");

    renderActiveTagBanner();
    renderNotes();
  }
}

// Helper to escape HTML characters
function escapeHtml(text) {
  if (!text) return "";
  return String(text)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

// Initialize application
function initApp() {
  loadState();

  // First-use tag form on Home
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

  // Header add-tag form on Home
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

  // Top navigation bubble clicks
  const bubblesNav = document.getElementById("filter-bubbles");
  if (bubblesNav) {
    bubblesNav.addEventListener("click", (e) => {
      const bubble = e.target.closest(".bubble");
      if (!bubble) return;

      currentFilter = bubble.getAttribute("data-filter") || "home";
      activeDeleteTagConfirmId = null;
      activeNoteActionId = null;
      editingNoteId = null;

      // If switching to a specific tag, set it as default in composer too
      if (currentFilter !== "home" && currentFilter !== "all" && currentFilter !== "deadline") {
        selectedComposerTagId = currentFilter;
      }

      renderApp();
    });
  }

  // Tag chip click in Home composer
  const tagChipsContainer = document.getElementById("composer-tag-chips");
  if (tagChipsContainer) {
    tagChipsContainer.addEventListener("click", (e) => {
      const chip = e.target.closest(".tag-chip");
      if (!chip) return;
      selectedComposerTagId = chip.getAttribute("data-tag-id");
      renderComposerTagChips();
    });
  }

  // Deadline controls in composer
  const deadlineToggleBtn = document.getElementById("deadline-toggle-btn");
  const composerDeadlineInput = document.getElementById("composer-deadline-input");
  const clearDeadlineBtn = document.getElementById("clear-deadline-btn");

  if (deadlineToggleBtn && composerDeadlineInput) {
    deadlineToggleBtn.addEventListener("click", () => {
      if (composerDeadlineInput.showPicker) {
        composerDeadlineInput.showPicker();
      } else {
        composerDeadlineInput.focus();
        composerDeadlineInput.click();
      }
    });

    composerDeadlineInput.addEventListener("change", () => {
      const val = composerDeadlineInput.value;
      if (val) {
        currentComposerDeadline = val;
        deadlineToggleBtn.classList.add("has-deadline");
        deadlineToggleBtn.textContent = `📅 ${val}`;
        if (clearDeadlineBtn) clearDeadlineBtn.classList.remove("hidden");
      } else {
        currentComposerDeadline = null;
        deadlineToggleBtn.classList.remove("has-deadline");
        deadlineToggleBtn.textContent = "📅 Add deadline";
        if (clearDeadlineBtn) clearDeadlineBtn.classList.add("hidden");
      }
    });
  }

  if (clearDeadlineBtn && composerDeadlineInput && deadlineToggleBtn) {
    clearDeadlineBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      composerDeadlineInput.value = "";
      currentComposerDeadline = null;
      deadlineToggleBtn.classList.remove("has-deadline");
      deadlineToggleBtn.textContent = "📅 Add deadline";
      clearDeadlineBtn.classList.add("hidden");
    });
  }

  // Note composer submit
  const noteComposerForm = document.getElementById("note-composer-form");
  const composerText = document.getElementById("composer-text");

  if (noteComposerForm && composerText) {
    composerText.addEventListener("keydown", (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key === "Enter") {
        e.preventDefault();
        noteComposerForm.requestSubmit ? noteComposerForm.requestSubmit() : noteComposerForm.dispatchEvent(new Event("submit", { cancelable: true }));
      }
    });

    noteComposerForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const text = composerText.value.trim();
      if (!text) return;

      const tagId = selectedComposerTagId || (state.tags.length > 0 ? state.tags[0].id : null);
      if (!tagId) return;

      addNote(tagId, text, currentComposerDeadline);

      // Reset form
      composerText.value = "";
      if (composerDeadlineInput) composerDeadlineInput.value = "";
      currentComposerDeadline = null;
      if (deadlineToggleBtn) {
        deadlineToggleBtn.classList.remove("has-deadline");
        deadlineToggleBtn.textContent = "📅 Add deadline";
      }
      if (clearDeadlineBtn) clearDeadlineBtn.classList.add("hidden");
    });
  }

  renderApp();
}

document.addEventListener("DOMContentLoaded", initApp);
