---
doc: prd
status: approved
---

# Tagly — Product Requirements

A soft, cute web app for anyone who takes messy daily notes: you add tags, write notes picking a tag, and switch between Home, All, specific tags, and Deadline. Deadline notes show days left, **Last day today**, or **Time’s up**.
Source: `scope.md > Who It's For`, `scope.md > The Unique Kernel`.

## The Core Journey
Source: `scope.md > The Core Loop`, `scope.md > What "Working" Looks Like`.

1. Open the web app on a computer or a phone. Name **Tagly** is at the top with a kind greeting like “✨ Tagly 🌸”.
2. The app opens on the **Home** bubble. Home is the screen to add things: one place to add a tag, and one place to write a note (with tag choice chips and optional 📅 deadline). The Home screen shows only these two forms—no notes list.
3. Top navigation bubbles: **Home**, **All**, one bubble for each tag (e.g. 🛒 Shopping), and **Deadline**.
4. First visit: if no tags exist yet, Home shows **Create your first tag** with a faded example `e.g. 🛒 Shopping`.
5. Once tags exist, user writes a note on Home, chooses its tag, adds an optional deadline, and taps **Add note ✨**.
6. User taps **All** to see all notes in one list, each with its tag badge.
7. User taps a tag bubble (like 🛒 Shopping) to see only notes for that tag, plus a simple control to delete the tag (empty tag deletes immediately; tag with notes asks first).
8. User taps **Deadline** to see only notes that have an upcoming or past deadline.
9. Tap on any note card to reveal **Edit** and **Delete** actions.
10. Refresh/reopen: all data stays saved in `localStorage`.

## Screens and Layout
One single page with soft bubble views. Looks good and works well on a phone. Source: `scope.md > The POC Boundary`.

**Top**
- App name **Tagly** + kind greeting and friendly emojis
- Top bubbles row: **Home**, **All**, each user tag, **Deadline**

**Home Screen (The app opens on Home)**
- One place to add a tag (`+ Add tag 🌸`)
- One place to write a note:
  - Note text box: “Write a note... 📝”
  - Small tag choice chips (tap to pick which tag it belongs to)
  - **📅 Add deadline** button
  - **Add note ✨** button
- *No notes list on Home screen.*

**"All" Screen**
- Clean list of all notes, each showing: note text, tag badge, created date, deadline status
- Tap note to reveal Edit / Delete

**Tag Screens (e.g. 🛒 Shopping)**
- Shows only notes belonging to that tag
- Banner with tag name and option to **🗑️ Delete tag** (asks first if it has notes)
- Tap note to reveal Edit / Delete

**"Deadline" Screen**
- Shows only notes that have a deadline
- If no deadlines exist, shows kind empty message: “You have no deadlines right now 🌿✨”

No extra pages. No side deadline list. No week strip in this version.

## Look and Feel
Source: `scope.md > Inspiration & Identity`, plus this PRD interview.

- Soft, cute, gentle, clean, calm. Rounded cards.
- Emojis welcome in tag names and in the kind empty messages.
- Lean (not locked): pastel, shades of green and white, colors closer to green.
- Deadline status is easy to see. Other dates are small.
- Empty states feel kind, never broken.
- Avoid: a busy Notion-like workspace, harsh empty errors, a large theme system in v1.

## Features and Behavior

### Create tags
Anyone can create tags. No starter tags. Emojis allowed in the name. Each tag becomes its own card on the page, in the order created. Source: `scope.md > The Unique Kernel`.

- [ ] First visit shows **Create your first tag** and a faded example, not a list of notes
- [ ] Creating “🛒 Shopping” adds a Shopping card right away
- [ ] A second tag (for example Homework) appears as its own card below, and a bubble for it appears at the top

### Delete a tag
In the first version, because a tag name can be typed wrong.

- [ ] Available when a tag bubble is active
- [ ] If the tag is empty, it is deleted right away (no question)
- [ ] If the tag has notes, the app asks first, for example: “The notes in this tag will also be deleted. Are you sure?”
- [ ] Only after yes: the tag, its bubble, and the notes inside it go away. No: nothing is deleted
- [ ] If that was the last tag, the first-use screen returns (**Create your first tag**)
- [ ] After delete, close and reopen: the deleted tag is still gone

### Write notes in the note composer
One single place to write a note, choosing which tag it belongs to. Source: `scope.md > The Core Loop`.

- [ ] Typing note text and selecting a tag creates a note with an app-set date
- [ ] Tag choices appear as small chips/buttons for each created tag
- [ ] A blank note is not added

### Optional deadline
Source: `scope.md > The Unique Kernel`.

- [ ] **📅 Add deadline** is next to the note box and is clearly about the deadline
- [ ] After picking a date, the label becomes that date (for example `📅 Oct 24`)
- [ ] Skipping the date creates a normal note with no deadline status
- [ ] If the deadline is still in the future, the note shows days left (for example “3 days left”), large enough to read quickly
- [ ] If the deadline is **today** (zero days left), the note shows **Last day today** — not “Time’s up”, and not “0 days left”
- [ ] If the deadline has **already passed** (would be a negative number of days), the note shows only **Time’s up** — never a negative number
- [ ] Deadline notes also appear when **Deadline** is tapped

### Tap bubbles to see a category
This is the purpose of the app. Source: `scope.md > The Unique Kernel`.

- [ ] **All** shows all notes in one list, each with its tag badge
- [ ] Tapping a tag bubble shows only notes for that tag
- [ ] Tapping **Deadline** shows only notes that have a deadline (order of those notes is not important)
- [ ] The page stays one screen, clean on a phone

### Note cards
- [ ] Each card shows: note text; cute tag badge with emoji; small created date; deadline status if any
- [ ] Cards are rounded, clean, and uncluttered
- [ ] No permanent edit/delete buttons cluttering the card; tap the note to reveal actions

### Edit and delete a note
Source: `scope.md > The POC Boundary`.

- [ ] Tap a note to reveal Edit and Delete options
- [ ] Edit can change the note text and the deadline (including adding or removing a deadline)
- [ ] Delete removes the note from the list and from Deadline
- [ ] After edit or delete, the screen matches the new data

### Stay saved
Source: `scope.md > The POC Boundary`.

- [ ] Close and reopen: tags, notes, dates, and deadlines are still there

## States and Boundaries

- **First use** — Greeting, emoji, **Create your first tag**, faded example. No ready-made tags. Also shown if every tag is deleted.
- **Empty tag card** — Soft line like “Write your Shopping notes here” until the first note.
- **Empty Deadline** — Soft message like “You have no deadlines right now 🌿” and hint: “To never miss a deadline, tap the 📅 icon when you write a note.”
- **Normal use** — Several tag cards, scroll, bubbles filter the same page.
- **Last day today** — Deadline is today: show **Last day today**.
- **Time’s up** — Deadline date is already in the past: show **Time’s up**. Never show a negative day count.
- **Delete tag with notes** — Ask first: “The notes in this tag will also be deleted. Are you sure?” Empty tags do not ask.
- **Persistence** — Data remains after close and reopen. No accounts, no sign-in.
- **Who** — Anyone, any job. Demo examples may be homework and shopping. Not student-only.

## Product Decisions

- One page, tag cards stacked, notes written inside the card — so a note already belongs to that tag.
- Top bubbles: All, each tag, Deadline — tapping a tag to see that category is “the whole purpose.”
- Deadline order is not important; a Deadline bubble is enough.
- Deadline wording: future = “N days left”; today = “Last day today”; past = “Time’s up”; never a negative number.
- Tags can be deleted in v1 so a wrong name can be removed. Empty tags delete immediately. Tags with notes ask first, then remove the tag and those notes.
- First-time empty is a kind create-tag screen, not leftover sample data.
- Empty Deadline is calm and kind, with a hint to use 📅.
- Look: soft, cute, rounded, emojis; pastel green/white is a lean, not a locked brand.
- Week strip is stretch after the core, look-only at first.
- Blank notes are not added. Edit can change text and deadline.

## What We're Building
Source: `scope.md > The POC Boundary`.

One-page phone-friendly web app: create and delete tags, write notes inside tag cards, optional deadline with days left / Last day today / Time’s up, All / tag / Deadline bubbles, edit and delete notes, data stays after reopen, one soft look, emojis in tag names. Short on-screen demo.

## Deferred From the POC

- **Week strip / mini calendar** — stretch after the core; first it would only show the week, later maybe tap a day. Extra UI.
- **2–3 color themes** — stretch after the core (`scope.md > Later`).
- **Completed / faded notes** — extra state machine; delete is enough for now.
- **Full overdue system** — only the three deadline phrases above.
- **Sorted side list of deadlines** — Deadline bubble instead.
- **Special Today filter** — extra organizing rule besides tags.
- **Notifications, photo scan, import** — `scope.md > Later` / `Explicitly Cut`.

## Possible Later Enhancements
Color themes after the core. Week strip, then tap a day for that day’s deadline notes. Notifications. Photo of paper notes. Import. Bigger cute vs formal styles. Rename a tag without deleting it.

## Non-Goals
Source: `scope.md > Explicitly Cut`.

- Notion-like extras (many tools, databases)
- Folders as the main organize method
- Photo scan or import in this version
- Notifications in this hackathon
- A large personalization system
- Native App Store / Play Store app
- Student-only product copy
- Showing negative day counts

## Open Questions
- **Must not block spec:** exact green/pastel values — build can pick a soft green-and-white palette from the lean.
