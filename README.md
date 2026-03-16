# Elevator Pitch Agency – Instant Marketing Audit

A minimal, Apple-style single-page web tool that scores a business's marketing health and recommends a service package.

## Features

- **Marketing Score (0–100)** based on 5 yes/no questions and monthly budget
- **Top 3 Issues** — personalised pain points based on answers
- **3 Quick Wins** — actionable next steps the business can take immediately
- **Recommended Package** — Starter ($1,500), Growth ($2,500), or Authority ($3,000) per month

## Running Locally

No build step or server required — it's a single HTML file.

### Option 1: Open directly in a browser

```bash
open index.html          # macOS
xdg-open index.html      # Linux
start index.html         # Windows
```

### Option 2: Serve with Python (recommended to avoid any browser restrictions)

```bash
# Python 3
python3 -m http.server 8080

# Python 2
python -m SimpleHTTPServer 8080
```

Then visit [http://localhost:8080](http://localhost:8080).

### Option 3: Serve with Node.js

```bash
npx serve .
```

## File Structure

```
elevator-pitch-tools/
└── index.html   ← entire tool (HTML + CSS + JS, no dependencies)
```

## Design

- White background, navy blue typography
- Minimal Apple-style layout using system fonts (`-apple-system`, `SF Pro Display`)
- Fully responsive (mobile + desktop)
- Zero external dependencies — no CDN, no frameworks
