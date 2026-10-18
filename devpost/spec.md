---
doc: spec
status: approved
---

# Tagly — Technical Spec

## How This Works, In Plain Language
The app is **one web page** named **Tagly**. HTML is the structure (boxes on the screen). CSS is the look (soft pastel mint and cream, rounded cards). JavaScript is the behavior (create a tag, save a note, switch bubbles between Home, All, tags, and Deadline).

When you type a tag or a note, JavaScript saves a copy in **`localStorage`**: a sticky note the **browser** keeps for this website on **this device**. When you open the page again, JavaScript reads that sticky note and draws the same tags and notes.

There is **no login** and **no database on the internet**. A friend’s phone has its own empty sticky note until they type their own notes.

We chose this shape because you already know HTML and JavaScript, you want to **read and understand** the code, and the PRD does not need accounts. A PHP server would be extra work and would not prove tap-a-tag + days left.

**GitHub** holds the code so people can read it. **GitHub Pages** (free, public) turns the same files into a website link people can open on a computer or a phone and *use* the app.

While we build, explanations of the code stay simple, in your words.

## The Core Journey Through the System
PRD ref: `prd.md > The Core Journey`.

1. User opens the page → browser loads `index.html`, `styles.css`, `app.js`.
2. `app.js` reads `localStorage`. If empty → first-use screen on Home: greeting + **Create your first tag**.
3. App opens on **Home**: shows only two forms:
   - One place to add a tag.
   - One place to write a note (note text, tag chips, optional 📅 deadline, Add note button). No notes list on Home.
4. Top bubbles allow instant switching: **Home**, **All**, each tag (e.g. 🛒 Shopping), and **Deadline**.
5. Tapping **All** shows all notes in one clean list with tag badges.
6. Tapping a tag bubble shows only notes for that tag and a delete-tag button.
7. Tapping **Deadline** shows only notes that have a deadline (or kind empty message if none).
8. Tapping a note card reveals **Edit** and **Delete** options.
9. Close and reopen → reads `localStorage` → same data preserved.

```
User taps / types
       ↓
  app.js updates the list
       ↓
  save to localStorage (this browser)
       ↓
  draw the page (HTML + CSS)
```

## Stack
Learner accepted this approach.

| Piece | What | Why / tradeoff |
|---|---|---|
| HTML | Page structure | You already know it; one page (`prd.md > Screens and Layout`). |
| CSS | Look, phone layout | Soft pastel green/white, rounded cards; no extra design tool. |
| JavaScript | All behavior | You can read each function; no framework to learn first. |
| `localStorage` | Save tags and notes | [MDN: Window.localStorage](https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage). Tradeoff accepted: data stays on one browser/device. |
| GitHub Pages | Public use-the-app link | [GitHub Pages docs](https://docs.github.com/en/pages). Free for a public repo. Not a substitute for the demo video. |

No PHP, no database, no npm app framework. No paid services.

**Check early in the build:** `localStorage` on a phone browser; date math (today vs past) on that phone; GitHub Pages serving `index.html` from this repo.

## Where It Runs and How Someone Tries It
- **During build:** open `index.html` in a desktop browser. If the browser blocks `localStorage` on a raw `file://` page, use a tiny local static server (for example `npx serve .` from the project folder) and open the URL it prints. Record this in the README if we need it.
- **Demo video:** same page on desktop and/or phone-sized window. Show: create two tags, add notes, deadline text, tap bubbles, edit/delete, refresh/reopen, delete a tag (empty vs with notes).
- **Required for submission:** short demo video **and** public GitHub repository.
- **Optional but chosen:** **GitHub Pages** so others (and you on a phone) can use the app from a link like `https://<username>.github.io/<repo>/`. Enable Pages on the public repo (root, `index.html`). Cost: free. Each visitor has their own `localStorage`.

## Look and Feel
From `prd.md > Look and Feel` and `scope.md > Inspiration & Identity`. CSS in this stack can honor all of this.

- Soft, cute, gentle, clean, calm. Spacious, not dense.
- Rounded cards, friendly emojis.
- Palette lean: pastel greens and white (pick concrete CSS colors in the build; not locked to a brand).
- Kind interface words (“Hello, have a nice day!”, empty Deadline copy from the PRD).
- **All app interface text is English** (hackathon is international). Tag names and note text are whatever the user types (any language).
- Deadline status large enough to read; created date small.
- Phone: one column, bubbles wrap, big enough tap targets.
- Avoid: Notion-like clutter, harsh red error walls, native ugly popups if we can use a small in-page yes/no for delete-tag-with-notes.

## Components

### Page shell
Greeting, background, one-column layout that works on a phone.
PRD ref: `prd.md > Screens and Layout`, `prd.md > Look and Feel`.

### First-use / create tag
**Create your first tag** (and later a smaller add-tag control). Faded example `e.g. 🛒 Shopping`. No starter tags. After the last tag is deleted, this screen returns.
PRD ref: `prd.md > Create tags`, `prd.md > States and Boundaries`.

### Filter bubbles & tag actions
**All**, one bubble per tag, **Deadline**. Tapping filters what is visible. When an active tag bubble is selected, an option to delete that tag is accessible.
PRD ref: `prd.md > Tap bubbles to see a category`, `prd.md > Delete a tag`.

### Central note composer
One single place to write a note. Contains text input, tag choice chips (user taps to choose the tag), optional **📅 Add deadline** button, and **Add note ✨**.
PRD ref: `prd.md > Write notes in the note composer`, `prd.md > Optional deadline`.

### Deadline control
Calendar button/label: “📅 Add deadline” until a date is chosen, then “📅 Oct 24” (or similar). Uses the phone-friendly date picker. Optional; skip = normal note.
PRD ref: `prd.md > Optional deadline`.

### Note card
Text, cute tag badge with emoji, small created date, deadline status. Cards are rounded and uncluttered (no permanent action buttons). Tapping a note reveals Edit and Delete actions.
PRD ref: `prd.md > Note cards`.

### Edit and delete a note
Tap a note card to reveal Edit and Delete. Edit opens in-place editing for text and deadline. Delete removes the note from the list and storage. Blank notes are not added.
PRD ref: `prd.md > Edit and delete a note`.

### Delete-tag confirm
When an active tag bubble is selected, delete tag is available. Empty tag: delete immediately. Tag with notes: in-page kind question, e.g. “The notes in this tag will also be deleted. Are you sure?” Yes deletes tag + notes; No does nothing.
PRD ref: `prd.md > Delete a tag`.

### Deadline empty state
Kind message and hint from the PRD; not a broken screen.
PRD ref: `prd.md > States and Boundaries`.

### Storage
Read/write the whole tags+notes list as JSON in `localStorage`. One key, e.g. `daily-notes`.
PRD ref: `prd.md > Stay saved`.

### Deadline status helper
Compare the deadline **calendar date** to **today** in the user’s local time. Future: `N days left`. Same day: `Last day today`. Past: `Time's up`. Never show a negative number.
PRD ref: `prd.md > Optional deadline`.

## Data Model
One list in `localStorage` (JSON).

**Tag:** `id`, `name` (may include emoji). Order = create order.

**Note:** `id`, `tagId`, `text`, `createdAt` (date the app set), `deadline` (`null` or a `YYYY-MM-DD` date).

- **Origin:** user typing on the page.
- **Stored:** `localStorage` on this browser.
- **Updated:** every create / edit / delete of a tag or note, then save the whole list.
- **Come back:** load JSON, draw the page. If missing or broken JSON → treat as empty (first-use), do not crash.

Filter (All / tag / Deadline) is **not** stored; default **All** each visit.

No accounts. No server copy.

## File Structure

```
devpost/                 # learning docs (scope, prd, spec, profile)
.agents/                 # course skills — not part of the app
index.html               # one page: greeting, bubbles, tag cards
styles.css               # soft green/white, rounded cards, phone layout
app.js                   # tags, notes, filters, dates, localStorage
README.md                # how to open locally + GitHub Pages link later
```

`index.html` at the repo root so GitHub Pages can serve it as the website.

## External Services and Dependencies
- **GitHub + GitHub Pages** — host code and the public app URL. No API keys. Free for a public repo. Docs: [GitHub Pages](https://docs.github.com/en/pages). Enable in repo Settings → Pages → Deploy from branch (root). Exact username/repo URL is unknown until the public repo exists (`6-ship`).
- **Google Fonts** — loads the handwritten font **Caveat** for the Tagly title and **Nunito** for rounded text. Free public stylesheet with system fallbacks (`cursive`, `sans-serif`) if offline.
- No other APIs. No paid plans.

## Important Failure Modes

- **`localStorage` full or blocked** → kind message that notes could not be saved; keep what is on screen until refresh if possible.
- **Broken saved data** → ignore it, show first-use, do not dump a technical error.
- **GitHub Pages not enabled yet** → still demo from a local browser; Pages is extra, not required for the video.

## What Was Simplified and Why

- **Browser `localStorage`** instead of PHP + a database — proves the kernel; you can read the code; tradeoff: one device. Fuller version would need a server, accounts, and sync.
- **No JavaScript framework** — one page does not need React/Vue setup for this PoC.
- **In-page yes/no** instead of a big modal system — enough for delete-tag-with-notes.
- **No week strip, themes, notifications** — already deferred in the PRD.

## Decisions and Open Issues

**Learner choices**
- HTML, CSS, JavaScript, `localStorage` — accepted. Tradeoff: notes stay on one browser/device.
- Public GitHub Pages link so people (and a phone) can *use* the app, not only see code. Accepted that the site is public and notes are still per device.
- Explain the code simply during the build (learning goal).
- App interface in English (international hackathon). User-typed tag names and notes may be any language.

**Derived from those choices (not extra product interviews)**
- One `index.html` + `styles.css` + `app.js`.
- JSON list of tags and notes; date status computed when drawing.
- Pages from repo root; `localStorage` key `daily-notes`.
- In-page confirm for delete-tag-with-notes (fits soft look better than a harsh system popup).

**One useful unknown (from the learner)**
“If I share my GitHub repo, can people use the app?” **Clarified:** the repo shows code; **GitHub Pages** is the free public website link. Notes still do not sync between devices. Check during ship: Pages URL opens the app on a phone.

**From `prd.md > Open Questions`**
- Exact pastel green CSS values — pick in the build from the lean; does not block this spec.
