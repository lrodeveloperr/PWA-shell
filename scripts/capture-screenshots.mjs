import { createRequire } from "node:module";
import { mkdirSync } from "node:fs";
import { stat } from "node:fs/promises";
import { createReadStream } from "node:fs";
import { createServer } from "node:http";
import path from "node:path";
import { fileURLToPath } from "node:url";

const require = createRequire(import.meta.url);
const { chromium } = require("playwright");

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, "..");
const outDir = path.join(root, "screenshots", "page-images");
mkdirSync(outDir, { recursive: true });

let server;
const baseUrl = process.env.PWA_CAPTURE_BASE_URL || await startServer(root);
const executablePath = process.env.CHROME_BIN || process.env.PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH;

const pages = [
  ["00-home.png", "#/"],
  ["01-support.png", "#/support"],
  ["02-about.png", "#/about"],
  ["03-policies.png", "#/policies"],
  ["04-health.png", "#/health"],
  ["05-diagnostic.png", "#/diagnostic"],
  ["06-analytics.png", "#/analytics"]
];

const launchOptions = {
  headless: true,
  args: ["--no-sandbox", "--disable-dev-shm-usage"]
};

if (executablePath) {
  launchOptions.executablePath = executablePath;
}

const browser = await chromium.launch(launchOptions);
const page = await browser.newPage({ viewport: { width: 1600, height: 900 }, deviceScaleFactor: 1 });

for (const [filename, route] of pages) {
  await page.goto(`${baseUrl}${route}`);
  await page.waitForSelector(".pwa-header");
  await page.screenshot({ path: path.join(outDir, filename), fullPage: false });
  console.log(filename);
}

await browser.close();
server?.close();

async function startServer(rootDir) {
  server = createServer(async (request, response) => {
    try {
      const url = new URL(request.url || "/", "http://127.0.0.1");
      const pathname = url.pathname === "/" ? "/index.html" : url.pathname;
      const filePath = path.normalize(path.join(rootDir, decodeURIComponent(pathname)));

      if (!filePath.startsWith(rootDir)) {
        response.writeHead(403);
        response.end("Forbidden");
        return;
      }

      const info = await stat(filePath);
      if (!info.isFile()) throw new Error("Not a file");

      response.writeHead(200, { "content-type": contentType(filePath) });
      createReadStream(filePath).pipe(response);
    } catch {
      response.writeHead(404);
      response.end("Not found");
    }
  });

  await new Promise((resolve) => server.listen(0, "127.0.0.1", resolve));
  const address = server.address();
  return `http://127.0.0.1:${address.port}/index.html`;
}

function contentType(filePath) {
  if (filePath.endsWith(".html")) return "text/html; charset=utf-8";
  if (filePath.endsWith(".js")) return "text/javascript; charset=utf-8";
  if (filePath.endsWith(".css")) return "text/css; charset=utf-8";
  if (filePath.endsWith(".svg")) return "image/svg+xml";
  if (filePath.endsWith(".webmanifest")) return "application/manifest+json";
  return "application/octet-stream";
}
