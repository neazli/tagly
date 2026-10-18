---
doc: checklist
status: approved
---

# Build Checklist

Build mode: fast mode

## Slices

- [x] **1. You can create a tag and see its card on one soft English page that fits a phone**
  Becomes usable: Open the app in a browser, including a phone-sized window. First visit shows a kind English greeting and **Create your first tag**. After you create a tag (emoji allowed), its card appears with a place to write notes. Layout stays one column, readable, easy to tap.
  Why now: Slice 1 includes the real files (`index.html`, `styles.css`, `app.js`) plus the first usable behavior. Phone layout from the start so later slices do not sit on a desktop-only page. A tag card on screen is the start of the kernel (your own tags).
  PRD ref: `prd.md > The Core Journey` (steps 1–3), `prd.md > Create tags`, `prd.md > Screens and Layout`, `prd.md > Look and Feel`
  Spec ref: `spec.md > File Structure`, `spec.md > Components > Page shell`, `spec.md > Components > First-use / create tag`, `spec.md > Components > Tag card`, `spec.md > Look and Feel`
  Build: Add `index.html`, `styles.css`, `app.js`, and a short `README.md`. One-page layout, pastel green/white, rounded cards, English UI. Viewport meta tag, one column, wrapping controls, large tap targets. First-use state, create-tag control with faded example, new tag card + bubble (All/tag bubbles can appear; filter behavior in slice 4). Add-tag still available after the first tag.
  Verify (mechanical): Serve the folder and confirm the page returns success; confirm viewport meta and a mobile-friendly max-width/one-column CSS rule; confirm `index.html` includes the English greeting and create-tag control; confirm creating a tag yields a tag card in the document.
  Learner check: Open the app, shrink the window to phone width (or use phone view), create a tag such as `🛒 Shopping`, and say whether it feels soft, clear, and usable on a small screen.
  Commit: `Add first-use page and create-tag cards`

- [x] **2. You can type a note in a tag card and it stays after refresh**
  Becomes usable: Type a note inside a tag card and see a note card (text, tag + emoji, small created date, edit/delete can wait). Refresh the browser: the tag and note are still there.
  Why now: Notes must exist before deadlines and filters. Saving now (`localStorage`) is a real risk (file:// vs server); catching it early is cheap, and later checks will not lose data.
  PRD ref: `prd.md > Write notes inside a tag card`, `prd.md > Note cards`, `prd.md > Stay saved`
  Spec ref: `spec.md > Components > Tag card`, `spec.md > Components > Note card`, `spec.md > Components > Storage`, `spec.md > Data Model`, `spec.md > Where It Runs and How Someone Tries It`
  Build: Note box inside the tag card; ignore blank notes; app-set created date; save/load JSON in `localStorage` key `daily-notes`. If `file://` blocks storage, use a tiny static server as the spec says and document it in README.
  Verify (mechanical): Create a tag and note via the running page or a small script using the same storage helpers; confirm `localStorage` JSON (or a simulated store) contains the note; confirm a second load reconstructs it.
  Learner check: Add “Buy milk and eggs” under Shopping, refresh the page, and confirm the note is still there.
  Commit: `Add in-card notes and localStorage`

- [x] **3. A note can have a deadline with days left, Last day today, or Time's up**
  Becomes usable: Next to the note box, **📅 Add deadline**. After a date, the note shows **N days left**, **Last day today** (deadline is today), or **Time's up** (already past). Never a negative number.
  Why now: This is half of the unique kernel. Date math is easy to get wrong, so it comes before extra UI.
  PRD ref: `prd.md > Optional deadline`, `prd.md > States and Boundaries`
  Spec ref: `spec.md > Components > Deadline control`, `spec.md > Components > Deadline status helper`
  Build: Date control on add (and keep the chosen date visible on the button). Compute status from local calendar dates. English labels only.
  Verify (mechanical): Run the status helper on fixed dates: future → days left; same day → `Last day today`; past → `Time's up`; never includes `-`.
  Learner check: Add a homework note with a deadline a few days away and one that is today or past if you can, and confirm the English status text looks right.
  Commit: `Add optional deadlines and status text`

- [x] **4. You can tap All, a tag, or Deadline and see the right notes**
  Becomes usable: Top bubbles: **All**, each tag, **Deadline**. Tap a tag → only that tag’s card. **Deadline** → only notes with a deadline, or the kind empty English message if none.
  Why now: This is the other half of the kernel (“the whole purpose”). It needs tags, notes, and deadlines already on screen so the demo is real, not last-minute chrome.
  PRD ref: `prd.md > Tap bubbles to see a category`, `prd.md > States and Boundaries` (empty Deadline)
  Spec ref: `spec.md > Components > Filter bubbles`, `spec.md > Components > Deadline empty state`
  Build: Filter is view-only (not stored). Empty Deadline copy from the PRD, in English. Phone-friendly wrapping bubbles.
  Verify (mechanical): With two tags and mixed notes, assert All shows both cards, a tag filter hides the other card, Deadline lists only notes with `deadline` set, and empty Deadline shows the friendly English message.
  Learner check: Create Homework and Shopping notes, tap each bubble, tap Deadline, and say whether the purpose (tap a tag, see that category) is clear.
  Commit: `Add All, tag, and Deadline filters`

- [ ] **5. You can edit notes, delete notes, and delete a tag (ask first if it has notes)**
  Becomes usable: Edit a note’s text and deadline. Delete a note. Delete an empty tag with no question. Delete a tag that has notes only after the in-page question: “The notes in this tag will also be deleted. Are you sure?” Yes removes the tag and those notes; No leaves everything. Last tag gone → first-use screen again. English UI; phone layout already from slice 1.
  Why now: Kernel is already visible. These complete `prd.md > What We're Building` without delaying the proof.
  PRD ref: `prd.md > Edit and delete a note`, `prd.md > Delete a tag`
  Spec ref: `spec.md > Components > Edit and delete a note`, `spec.md > Components > Delete-tag confirm`, `spec.md > Look and Feel`
  Build: In-page yes/no for tag-with-notes (not a harsh system popup). Empty tags delete immediately. Persist changes. If every tag is deleted, return to first-use.
  Verify (mechanical): Script edit, delete note, delete empty tag, cancel vs confirm delete-with-notes; confirm storage matches; confirm zero tags restores first-use markup.
  Learner check: Edit a note, delete a note, delete an empty tag, and delete a tag that has notes (cancel once, confirm once).
  Commit: `Add edit and delete for notes and tags`

## Hands-on Checkpoints

- [x] Early usable behavior explored — after slice 2 (page, tags, notes, save): look and feel can still change remaining slices
- [ ] Final kick-the-tires exploration and feedback completed

## Final Review

- [ ] Final review complete — feedback resolved and learner confirms ready to ship

## Code Tour and App Map

- [ ] Learning activity complete — guided route, focused alternative, prior practice connected, or brief recap
- [ ] Optional edit and transfer reflection addressed — offered/declined/already covered/not applicable as appropriate
- [ ] `devpost/app-map.html` generated from finished code, checked, and shown, including a project-grounded practice to reuse

Activity and evidence:
Route and stops:
Edit outcome:
Reflection:
Activity mode:

## Revisions

- Refined look and feel based on learner feedback after slice 2: soft mint & cream background gradient, pill-shaped buttons and bubbles, very rounded cards, friendly Nunito font, cute emojis, and unique pastel colors for each tag card.
- Updated layout and named app Tagly per learner request: app opens on "Home" bubble showing only two forms (add tag, write note with tag choice chips and deadline) without notes list. Next to Home are "All", tag bubbles, and "Deadline" showing clean note lists. Notes reveal edit/delete on tap. Tag deletion supported on active tag bubble.
