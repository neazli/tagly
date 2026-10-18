# Tagly 🌿

A cute, soft web app for messy daily notes. Organize notes by tags, track deadlines easily, and switch smoothly between Home, All, your tags, and Deadlines.

- **GitHub Repository**: [https://github.com/neazli/tagly](https://github.com/neazli/tagly)
- **Live Demo (GitHub Pages)**: [https://neazli.github.io/tagly/](https://neazli.github.io/tagly/)
- **Demo Video**: [https://youtu.be/zOwwfNGtPKM](https://youtu.be/zOwwfNGtPKM)

## How to Try Tagly Locally

### Option 1: Double-click (Quick)
Open `index.html` directly in your favorite web browser.

### Option 2: Local Static Server (Recommended)
```bash
python3 -m http.server 8000
```
Then open `http://localhost:8000` in your browser.

## Features

- **Home Screen**: Simple places to create tags and write notes (with tag choices and optional 📅 deadlines).
- **All Screen**: Clean list of all your notes, each marked with a cute tag badge.
- **Tag Views**: Filter notes by any tag with one tap, or delete tags safely.
- **Deadline View**: Focus on notes with deadlines, showing friendly countdowns ("3 days left", "Last day today", "Time's up").
- **Edit & Delete**: Tap any note to reveal options.
- **Saved Automatically**: Everything is saved in your browser (`localStorage`).
