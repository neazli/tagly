---
doc: prd
status: approved
---

# Daily Notes — Product Requirements

A soft, one-page web app for anyone who takes messy daily notes: you create your own tags, write notes inside each tag’s card, and tap a bubble to see that category. Deadline notes show days left, **Last day today**, or **Time’s up**.
Source: `scope.md > Who It's For`, `scope.md > The Unique Kernel`.

## The Core Journey
Source: `scope.md > The Core Loop`, `scope.md > What "Working" Looks Like`.

1. Open the web app on a computer or a phone. One page. Soft background. Kind line at the top, like “Hello, have a nice day!”, with a friendly emoji.
2. First visit: no tags yet. One clear button: **Create your first tag**. The tag box shows a faded example, like `e.g. 🛒 Shopping`. No ready-made tags.
3. After a tag is created (for example Shopping), its **tag card** appears on the page. Inside: a soft hint like “Write your Shopping notes here” and a **note box**.
4. Type a note in that card. The app adds the created date. Optional: tap **📅 Add deadline**, pick a date; the button then shows that date (for example `📅 Oct 24`). No date means a normal note.
5. Each note appears as a rounded card inside its tag: text, tag + emoji, small created date, deadline status if any (easy to see), small **Edit** and **Delete**.
6. Add more tags the same way. Each new tag is a new card **below** the others. Scroll the page. If a tag name is wrong, **delete the tag**.
7. At the top, bubbles: **All**, one bubble per tag, and **Deadline**. All shows every tag card. A tag bubble shows only that tag’s card and notes. Deadline shows only notes that have a deadline.
8. Success in a short demo: two tags (for example Homework and Shopping), a shopping note with an auto date, a homework note with days left, tap bubbles to switch, edit and delete a note, delete a tag, close and reopen and the remaining data is still there.

## Screens and Layout
One single page. Looks good and works well on a phone. Source: `scope.md > The POC Boundary`.

**Top**
- Kind greeting + friendly emoji
- Tag bubbles in a row (wrap on a small screen): **All**, each user tag, **Deadline**
- A way to create a new tag (first visit: the big first-tag button; later: still possible to add another tag)

**Below, one tag card under another (scroll)**
- Tag name with emoji, and a small **delete tag** control (for a wrong name)
- Note box **inside** the card (a note typed here belongs to this tag)
- Next to the note box: **📅 Add deadline**
- Notes stacked inside the card as they are added

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

- [ ] Each tag card has a small way to delete that tag
- [ ] If the tag is empty, it is deleted right away (no question)
- [ ] If the tag has notes, the app asks first, for example: “The notes in this tag will also be deleted. Are you sure?”
- [ ] Only after yes: the tag, its bubble, and the notes inside it go away. No: nothing is deleted
- [ ] If that was the last tag, the first-use screen returns (**Create your first tag**)
- [ ] After delete, close and reopen: the deleted tag is still gone

### Write notes inside a tag card
The note box lives in the tag card, so the tag is already chosen. Source: `scope.md > The Core Loop`.

- [ ] Typing “Buy milk and eggs” in Shopping creates a note in that card with an app-set date
- [ ] The note is not asked to pick a tag again
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

- [ ] **All** shows every tag card and its notes
- [ ] Tapping **Shopping** shows only the Shopping card and its notes
- [ ] Tapping **Deadline** shows only notes that have a deadline (order of those notes is not important)
- [ ] The page stays one screen, clean on a phone

### Note cards
- [ ] Each card shows: note text; tag with emoji; small created date; deadline status if any; small Edit and Delete
- [ ] Cards are rounded and uncluttered

### Edit and delete a note
Source: `scope.md > The POC Boundary`.

- [ ] Edit can change the note text and the deadline (including adding or removing a deadline)
- [ ] Delete removes the note from the card and from Deadline
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
