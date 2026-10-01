const ROUTES = ["home", "support", "about", "policies", "health", "diagnostic", "analytics"];

export function createPwaShell({ root, config, engine }) {
  if (!root) throw new Error("PWA shell root element is required.");

  const render = async () => {
    const route = getRoute();
    document.title = `${config.appName} - ${route === "home" ? "Home" : titleCase(route)}`;
    root.innerHTML = await renderRoute(route, config, engine);
    bindLinks(render);
  };

  window.addEventListener("hashchange", render);
  render();
}

function getRoute() {
  const route = location.hash.replace(/^#\/?/, "") || "home";
  return ROUTES.includes(route) ? route : "home";
}

async function renderRoute(route, config, engine) {
  if (["support", "about", "policies"].includes(route)) {
    return renderPublicShell(config, route);
  }

  if (route === "health") {
    return renderHealth(config, await engine.getHealth());
  }

  if (route === "diagnostic") {
    return renderDiagnostic(config, await engine.getDiagnostic());
  }

  if (route === "analytics") {
    return renderAnalytics(config, await engine.getAnalytics());
  }

  return renderHome(config, await engine.getOverview());
}

function renderHeader(config) {
  const nav = config.nav
    .map((item) => `<a href="#/${escapeHtml(item.route)}">${escapeHtml(item.label)}</a>`)
    .join("");
  return `<header class="pwa-header"><a class="pwa-brand" href="#/">${escapeHtml(config.appName)}</a><nav class="pwa-nav" aria-label="Main navigation">${nav}</nav></header>`;
}

function renderHome(config, data) {
  return `<main class="pwa-screen">${renderHeader(config)}<section class="pwa-hero"><div class="pwa-copy"><p class="pwa-eyebrow">${escapeHtml(config.overview.eyebrow)}</p><h1>${escapeHtml(config.overview.title)}</h1><p>${escapeHtml(config.overview.intro)}</p></div>${renderSearchWindow(data.preview)}</section><section class="pwa-card-row pwa-overview-row"><article class="pwa-info-card pwa-soft"><h2>${escapeHtml(config.overview.featureTitle)}</h2><p>${escapeHtml(config.overview.featureCopy)}</p></article>${data.metrics.map(renderMetric).join("")}</section><section class="pwa-feature-grid">${config.overview.features.map(([title, copy]) => `<article><h3>${escapeHtml(title)}</h3><p>${escapeHtml(copy)}</p></article>`).join("")}</section></main>`;
}

function renderHealth(config, data) {
  const aside = renderWindow({
    title: data.windowTitle,
    tones: data.tones,
    className: "pwa-health-window",
    body: `<h2>${escapeHtml(data.heading)}</h2><p>${escapeHtml(data.subheading)}</p><div class="pwa-metric-grid">${data.metrics.map(renderMetric).join("")}</div>${data.issues.map(renderIssue).join("")}`
  });
  return `<main class="pwa-screen">${renderHeader(config)}<section class="pwa-hero"><div class="pwa-copy"><p class="pwa-eyebrow">${escapeHtml(config.health.eyebrow)}</p><h1>${escapeHtml(config.health.title)}</h1><p>${escapeHtml(config.health.intro)}</p></div>${aside}</section><section class="pwa-info-card pwa-soft pwa-maintenance"><h2>${escapeHtml(config.health.maintenanceTitle)}</h2><p>${escapeHtml(config.health.maintenanceCopy)}</p></section></main>`;
}

function renderDiagnostic(config, data) {
  const table = `<section class="pwa-table-card"><h2>${escapeHtml(data.tableTitle)}</h2><table><thead><tr><th>Input</th><th>Result</th><th>Route</th></tr></thead><tbody>${data.rows.map((row) => `<tr><td>${escapeHtml(row[0])}</td><td>${escapeHtml(row[1])}</td><td><strong>${escapeHtml(row[2])}</strong></td></tr>`).join("")}</tbody></table></section>`;
  const result = renderWindow({
    title: data.result.title,
    tones: data.result.tones,
    className: "pwa-diagnostic-window",
    body: `<span class="pwa-muted-label">${escapeHtml(data.result.label)}</span><div class="pwa-diagnostic-line"><strong>${escapeHtml(data.result.query)}</strong><b>${escapeHtml(data.result.badge)}</b></div><p>${escapeHtml(data.result.detail)}</p>`
  });
  return `<main class="pwa-screen">${renderHeader(config)}<section class="pwa-hero"><div class="pwa-copy"><p class="pwa-eyebrow">${escapeHtml(config.diagnostic.eyebrow)}</p><h1>${escapeHtml(config.diagnostic.title)}</h1><p>${escapeHtml(config.diagnostic.intro)}</p></div>${table}</section>${result}</main>`;
}

function renderAnalytics(config, data) {
  const max = Math.max(...data.bars);
  const bars = data.bars.map((value) => `<i style="height:${Math.round((value / max) * 92)}px"></i>`).join("");
  const aside = renderWindow({
    title: data.windowTitle,
    tones: data.tones,
    className: "pwa-analytics-window",
    body: `<h2>${escapeHtml(data.heading)}</h2><p>${escapeHtml(data.subheading)}</p><div class="pwa-metric-grid">${data.metrics.map(renderMetric).join("")}</div><div class="pwa-chart">${bars}</div><div class="pwa-chart-labels">${data.labels.map((label) => `<span>${escapeHtml(label)}</span>`).join("")}</div>`
  });
  return `<main class="pwa-screen">${renderHeader(config)}<section class="pwa-hero"><div class="pwa-copy"><p class="pwa-eyebrow">${escapeHtml(config.analytics.eyebrow)}</p><h1>${escapeHtml(config.analytics.title)}</h1><p>${escapeHtml(config.analytics.intro)}</p></div>${aside}</section><section class="pwa-card-row pwa-analytics-cards">${data.footerMetrics.map(renderMetric).join("")}</section></main>`;
}

function renderPublicShell(config, route) {
  const page = config.publicPages[route];
  const body = page.body.map((paragraph) => `<p>${interpolate(paragraph, config)}</p>`).join("");
  const sections = page.sections
    .map((section) => `<section><h2>${escapeHtml(section.title)}</h2><p>${interpolate(section.body, config)}</p></section>`)
    .join("");
  return `<main class="pwa-public">${renderHeader(config)}<section class="pwa-public-main"><p class="pwa-eyebrow">${escapeHtml(page.eyebrow)}</p><h1>${escapeHtml(page.title)}</h1>${body}${sections}</section></main>`;
}

function renderSearchWindow(preview) {
  const body = `<h2>${escapeHtml(preview.heading)}</h2><div class="pwa-search-box"><span>${escapeHtml(preview.query)}</span><strong>${escapeHtml(preview.cta)}</strong></div>${preview.results.map((result) => `<div class="pwa-result-row"><div><strong>${escapeHtml(result.title)}</strong><span>${escapeHtml(result.meta)}</span></div><i class="pwa-status pwa-tone-${escapeHtml(result.tone)}"></i></div>`).join("")}`;
  return renderWindow({ title: preview.title, tones: preview.tones, className: "pwa-search-preview", body });
}

function renderWindow({ title, tones, className, body }) {
  const dots = tones.map((tone) => `<span class="pwa-dot pwa-tone-${escapeHtml(tone)}"></span>`).join("");
  return `<section class="pwa-window ${escapeHtml(className || "")}"><div class="pwa-window-bar">${dots}<strong>${escapeHtml(title)}</strong></div><div class="pwa-window-body">${body}</div></section>`;
}

function renderMetric(metric) {
  return `<article class="pwa-metric"><div class="pwa-metric-dot pwa-tone-${escapeHtml(metric.tone || "blue")}"></div><span>${escapeHtml(metric.label)}</span><strong>${escapeHtml(metric.value)}</strong>${metric.note ? `<small>${escapeHtml(metric.note)}</small>` : ""}</article>`;
}

function renderIssue(issue) {
  return `<div class="pwa-issue-row"><span class="pwa-status pwa-tone-${escapeHtml(issue.tone)}"></span><strong>${escapeHtml(issue.label)}</strong><b>${escapeHtml(issue.value)}</b></div>`;
}

function bindLinks(render) {
  document.querySelectorAll("[data-route]").forEach((link) => {
    link.addEventListener("click", (event) => {
      event.preventDefault();
      location.hash = `#/${event.currentTarget.dataset.route}`;
      render();
    });
  });
}

function interpolate(value, config) {
  return escapeHtml(value).replaceAll("{{supportEmail}}", `<a href="mailto:${escapeHtml(config.supportEmail)}">${escapeHtml(config.supportEmail)}</a>`);
}

function titleCase(value) {
  return value.charAt(0).toUpperCase() + value.slice(1);
}

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

