# Elevator Pitch Audit — PWA

A mobile-first Progressive Web App (PWA) that scores a business's marketing health and recommends a service package. Built with plain HTML, CSS, and JavaScript — no frameworks, no build step, no dependencies.

---

## Features

- **Marketing Score (0–100)** based on 5 yes/no questions + monthly budget
- **Top 3 Issues** — personalised pain points
- **3 Quick Wins** — actionable next steps
- **Recommended Package** — Starter ($1,500), Growth ($2,500), or Authority ($3,000)/month
- **PWA** — installable to iPhone/Android home screen, works offline

---

## File Structure

```
elevator-pitch-tools/
├── index.html            Main app (mobile-first, PWA shell)
├── manifest.json         PWA manifest (name, theme, icons)
├── sw.js                 Service worker (offline cache)
├── generate-icons.html   Run once in browser → downloads PNG icons
├── icons/
│   ├── icon.svg          Source vector icon
│   ├── icon-192.png      Generated — required for PWA
│   └── icon-512.png      Generated — required for PWA
└── README.md
```

---

## Quick Start (Local)

### Step 1 — Generate the app icons (one-time setup)

Open `generate-icons.html` in any browser, then click **Download Both Icons**. Move the two downloaded files into the `icons/` folder:

```
icons/icon-192.png
icons/icon-512.png
```

> The icons are drawn on an HTML Canvas and exported as PNG. No external tools needed.

### Step 2 — Serve locally

A local HTTP server is required for the service worker to register (browsers block SW on `file://`).

**Python 3** (recommended, no install needed on macOS/Linux):
```bash
python3 -m http.server 8080
```

**Python 2:**
```bash
python -m SimpleHTTPServer 8080
```

**Node.js (npx):**
```bash
npx serve .
```

**VS Code:** Install the *Live Server* extension, right-click `index.html` → *Open with Live Server*.

Then open [http://localhost:8080](http://localhost:8080) in your browser.

---

## Installing on iPhone from Safari

The PWA can be added to your iPhone home screen and runs like a native app — full screen, no browser chrome, with the navy status bar.

### Steps

1. **Open Safari** on your iPhone — the app must be opened in Safari (Chrome on iOS cannot install PWAs).

2. **Navigate** to your hosted URL or your local server address (e.g. `http://192.168.x.x:8080`).
   > To find your Mac's local IP: `System Preferences → Network` or run `ifconfig | grep "inet "` in Terminal.

3. **Tap the Share button** — the box-with-arrow icon at the bottom of Safari.

4. **Scroll down** in the share sheet and tap **"Add to Home Screen"**.

5. **Confirm the name** — it will pre-fill as *EP Audit*. Tap **Add**.

6. The **EP Audit icon** now appears on your home screen. Tap it to launch in full-screen standalone mode.

### What it looks like installed

| Feature | Value |
|---|---|
| App name | Elevator Pitch Audit |
| Short name (icon label) | EP Audit |
| Status bar | Navy (`#0a1628`) |
| Display mode | Standalone (no browser UI) |
| Offline support | Yes — cached app shell loads without internet |

---

## Testing the PWA (Desktop — Chrome DevTools)

1. Open the app in Chrome at `localhost:8080`.
2. Open DevTools → **Application** tab.
3. Check **Manifest** — should show name, icons, theme colour.
4. Check **Service Workers** — should show `sw.js` as *activated and running*.
5. Check **Cache Storage** — should show `ep-audit-v1` with `index.html` and `manifest.json`.
6. Tick **Offline** in the Network tab, reload — the app should still load from cache.
7. Click the install icon (⊕) in Chrome's address bar to install as a desktop PWA.

### Lighthouse PWA Audit

Run a Lighthouse audit in Chrome DevTools → **Lighthouse** tab → select *Progressive Web App* → **Analyse page load**.

---

## Offline Behaviour

The service worker uses a **cache-first** strategy:

- On first load, `index.html` and `manifest.json` are pre-cached.
- All other same-origin GET responses are cached dynamically as they load.
- If offline and a page isn't cached, the app shell (`index.html`) is served as a fallback.
- Stale caches from old versions are automatically deleted on activation.

---

## Branding

| Token | Value |
|---|---|
| Primary | Navy `#0a1628` |
| Accent | Blue `#0055ff` |
| Background | `#f2f2f7` (iOS system gray) |
| Cards | White `#ffffff` |
| Font | `-apple-system`, SF Pro Text, Segoe UI |
