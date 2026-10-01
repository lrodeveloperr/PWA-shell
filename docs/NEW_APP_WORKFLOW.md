# New App Workflow

Use this workflow to avoid rebuilding the shell for each PWA.

## 1. Start From The Shell

Copy or fork `lrodeveloperr/PWA-shell`.

Keep the shell folders unchanged at first:

```text
src/shell/
scripts/
index.html
manifest.webmanifest
sw.js
```

## 2. Define The Product In Config

Edit only:

```text
src/app.config.js
```

Set:

- app name
- support email
- hero copy
- about page
- support page
- combined policies page
- health, diagnostic, and analytics screen copy

## 3. Build The Engine

Replace or wrap:

```text
src/engine/demo-engine.js
```

The engine should expose the adapter in `docs/ENGINE_CONTRACT.md`.

Recommended engine folders for larger apps:

```text
src/engine/domain/
src/engine/imports/
src/engine/storage/
src/engine/sync/
src/engine/fixtures/
src/engine/tests/
```

## 4. Add Safe Demo Data

Screenshots and listings should use fictitious data only.

Do not use live merchant, customer, client, or production records in screenshots.

## 5. Capture Final Screenshots

```bash
node scripts/capture-screenshots.mjs
```

If Chrome is installed outside Playwright, set:

```bash
CHROME_BIN=/usr/bin/google-chrome node scripts/capture-screenshots.mjs
```

## 6. Lock The App

Before final screenshots:

- no duplicate public pages
- support/about/policies reflect the app
- policies are one combined page
- no old brand names
- no floating logo unless the app explicitly requires one
- status header colors match in-page blinkers
- analytics boxes fit without cramped labels
- engine fixtures are safe and fictitious

