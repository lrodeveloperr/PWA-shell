# PWA Shell

Reusable presentation shell for lightweight PWA products.

The shell owns the repeated product wrapper: header, navigation, public pages, policy/support/about layout, dashboard-style preview screens, PWA manifest, and screenshot capture. Individual apps should mainly replace the engine adapter and small config, not rebuild the shell.

## Locked Boundary

Work in future app repos should follow this split:

| Layer | Owns | Edit Frequency |
| --- | --- | --- |
| Shell | Layout, cards, navigation, public pages, PWA wrapper, screenshot routes, visual system | Rare, only when improving all apps |
| Config | App name, support email, public-page text, screenshot copy, route labels | Per app |
| Engine | Domain logic, validation, calculations, imports, storage, sync, app-specific data | Main day-to-day work |

Do not put app rules, legal/compliance decisions, pricing logic, imports, API calls, or data transformations inside `src/shell/`.

## Quick Start

```bash
python3 -m http.server 4173
```

Then open:

```text
http://localhost:4173
http://localhost:4173/#/support
http://localhost:4173/#/about
http://localhost:4173/#/policies
http://localhost:4173/#/health
http://localhost:4173/#/diagnostic
http://localhost:4173/#/analytics
```

## New App Workflow

1. Copy or fork this repo for the new PWA.
2. Edit `src/app.config.js` for the app name, support address, public pages, and screenshot copy.
3. Replace `src/engine/demo-engine.js` with the app engine adapter.
4. Keep the adapter methods in `docs/ENGINE_CONTRACT.md`.
5. Run the app locally and capture final images with `node scripts/capture-screenshots.mjs`.
6. Only edit `src/shell/` when the improvement should apply to every future PWA.

## Screenshot Set

The shell standardizes seven presentation screenshots:

| File | Route | Purpose |
| --- | --- | --- |
| `00-home.png` | `#/` | Primary value proposition and live app preview |
| `01-support.png` | `#/support` | Support page |
| `02-about.png` | `#/about` | Product explanation |
| `03-policies.png` | `#/policies` | Combined privacy and terms |
| `04-health.png` | `#/health` | Data/identifier health style page |
| `05-diagnostic.png` | `#/diagnostic` | Test/check/result style page |
| `06-analytics.png` | `#/analytics` | One-year analytics style page |

## Files That Should Stay Generic

- `src/shell/pwa-shell.js`
- `src/shell/pwa-shell.css`
- `index.html`
- `manifest.webmanifest`
- `sw.js`
- `scripts/capture-screenshots.mjs`

## Files Expected To Change Per App

- `src/app.config.js`
- `src/engine/demo-engine.js`, or a replacement engine module
- App-specific docs, tests, and fixtures

