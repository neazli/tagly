---
doc: scope
status: approved
---

# Tagly

A simple web app for random short notes during the day: you write a note, pick your own tag, and the app groups it. If the note has a deadline, you see how many days are left. Anyone can use it—not only students.

## The Unique Kernel
You do not make folders or sort by hand. You write a note, choose a tag you created, and the app groups notes by those tags. On notes with a deadline, you see **days left**, so you are less likely to forget.

## Who It's For
Anyone who takes messy daily notes (students, people at work, any job). Notes today live on a phone, on paper, and in mixed categories, so things get lost.

The first version uses **student examples** (homework, shopping) because that is what you know best. The product itself is **not only for students**: tags and notes can be anything (work tasks, shopping, reminders).

## The Core Loop
Open the web app (computer or phone) → add a tag if needed (for example Homework, Shopping) → type a short note, pick one tag → the app adds the date → optional: pick a deadline → see notes grouped by tag, with days left on deadline notes. Edit or delete a note when it is wrong or done. Close and reopen: the notes are still there. Come back to drop another random note without organizing anything.

## Inspiration & Identity
Inspired by [Notion](https://www.notion.so): order and options, but not Notion’s many uses. This app does one job. Feel: simple, easy to understand, very soft colors that match. One simple look as the base (suits anyone). Emojis allowed in tag names. It is a **web app** that also looks good and works well on a phone screen.

## Why This Matters to the Learner
“I have this need myself, and I see it in my friends too.” Forgotten homework and a confusing supermarket list. Excitement: a simple app anyone can use in daily life.

## What "Working" Looks Like
On a web page, including a phone-sized screen, in about one minute:
1. Create tags **Homework** and **Shopping** (emojis in tag names allowed).
2. Add “Buy milk and eggs” with tag Shopping → the app puts the date on it.
3. Add “Send database report” with tag Homework and a deadline date.
4. Notes appear in two groups: Shopping and Homework.
5. The homework note shows days left, for example “3 days left.”
6. Edit a note and delete a note; both work.
7. Close and reopen the app: the notes are still there.

Grouped notes plus days left is the “oh, it works” moment. Staying saved, plus edit and delete, are also part of done.

## The POC Boundary
- For anyone, any job—not a student-only app. First-version examples may be homework and shopping.
- Type notes in yourself (even if they started on paper or another phone app).
- Create your own tags; each new note gets one tag.
- App sets the note date; user sets a deadline only when needed; show days left.
- Group notes by tag.
- Edit a note and delete a note.
- Notes stay saved when you close and reopen the app.
- A web app that looks good and works well on a phone screen (not an App Store / Play Store app).
- One simple base look. Emojis allowed in tag names.
- Demo on a screen; public GitHub; short demo video. Putting the app on the internet is optional.

## Later
- **Stretch after the core works:** 2–3 ready color themes (only listed here, not in Now)
- Notifications
- Photo scan of paper notes
- Import from other apps
- Bigger style options (cute vs formal beyond a simple base look)

## Explicitly Cut
- Notion-like extras (many tools, databases, complicated setup) — this app only organizes daily random notes
- Building folders or manual sort as the main way to organize — tags and grouping do that
- Photo scanning and import for this first version — typing is enough
- Notifications for this hackathon — too much for 2–4 hours
- A large personalization system — one simple look in the first version
- A native phone app for the App Store or Play Store — this version is a web app that works on a phone screen
- Making the first version student-only — examples can be school-like; the app is for anyone
