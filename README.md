# Daily Notes 🌿

A simple, soft web app for random short notes during the day. Organize messy notes by your own tags, write notes directly inside tag cards, and see days left for upcoming deadlines.

## How to Try the App Locally

You can run this project in any web browser without needing to install complex tools.

### Option 1: Double-click (Quick)
Open `index.html` directly in your favorite web browser (Chrome, Safari, Firefox, Edge).

### Option 2: Local Static Server (Recommended)
If your browser blocks saving notes on `file://` URLs, run a tiny local server from this directory:

```bash
# Using python (built-in on macOS)
python3 -m http.server 8000
```
Then open `http://localhost:8000` in your browser.

Or using Node:
```bash
npx serve .
```

## Features

- **Your Own Tags**: Create tags (emojis welcome, like `🛒 Shopping` or `📚 Homework`).
- **Notes in Tag Cards**: Type notes right inside the tag's card.
- **Saved Automatically**: Your notes and tags are saved in your browser (`localStorage`).
- **Mobile-Friendly**: Calm, rounded, pastel-green layout that works smoothly on phones and computers.
