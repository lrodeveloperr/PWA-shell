import { shellConfig } from "./app.config.js";
import { demoEngine } from "./engine/demo-engine.js";
import { createPwaShell } from "./shell/pwa-shell.js";

createPwaShell({
  root: document.getElementById("app"),
  config: shellConfig,
  engine: demoEngine
});

if ("serviceWorker" in navigator && location.protocol !== "file:") {
  navigator.serviceWorker.register("./sw.js").catch(() => {
    // Local preview should never fail because service workers are unavailable.
  });
}

