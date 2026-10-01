# Engine Contract

The shell calls a small engine adapter. Future app work should primarily happen here.

## Required Adapter

```js
export const appEngine = {
  async getOverview() {},
  async getHealth() {},
  async getDiagnostic() {},
  async getAnalytics() {}
};
```

Each method may return fixture data, local storage data, imported CSV results, browser storage results, or API-backed results. The shell does not care where the data comes from.

## Responsibilities

| Area | Engine | Shell |
| --- | --- | --- |
| Domain rules | Owns | Never |
| Calculations and validations | Owns | Never |
| Imports, parsing, storage, sync | Owns | Never |
| Pricing, limits, plan rules | Owns | Never |
| PWA navigation and layout | Never | Owns |
| Public pages | Supplies copy through config | Renders |
| Screenshots | Supplies safe demo values | Captures layout |
| Status colors | Supplies semantic tone names | Renders |

## Data Shape

Use these tone values unless the shell is intentionally expanded:

```text
blue, green, amber, orange, purple, red, muted
```

Metric:

```js
{ label: "Processed", value: "24,618", note: "records", tone: "blue" }
```

Issue:

```js
{ label: "Duplicate values", value: "8", tone: "orange" }
```

Search or result row:

```js
{ title: "Primary record", meta: "Direct match", tone: "green" }
```

## Rule For New Apps

If a change answers "what should this app calculate, validate, import, store, sync, price, or decide?", it belongs in the engine.

If a change answers "how should all apps present pages, screenshots, support, policies, and cards?", it belongs in the shell.

