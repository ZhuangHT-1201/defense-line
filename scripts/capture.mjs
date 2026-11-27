import { mkdir } from "node:fs/promises";
import { resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { chromium } from "playwright-core";
import { startServer } from "./serve.mjs";

const root = resolve(fileURLToPath(new URL("..", import.meta.url)));
const outputDir = resolve(root, "docs", "screenshots");
const edgePath = "C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe";

await mkdir(outputDir, { recursive: true });
const server = await startServer(4173);
const browser = await chromium.launch({
  executablePath: edgePath,
  headless: true,
  args: ["--disable-gpu", "--font-render-hinting=none"]
});

const pause = (ms = 450) => new Promise((resolvePromise) => setTimeout(resolvePromise, ms));

try {
  const desktop = await browser.newPage({
    viewport: { width: 1440, height: 1000 },
    deviceScaleFactor: 1
  });
  const consoleErrors = [];
  desktop.on("console", (message) => {
    if (message.type() === "error") consoleErrors.push(message.text());
  });
  await desktop.goto("http://127.0.0.1:4173/", { waitUntil: "networkidle" });
  await desktop.emulateMedia({ reducedMotion: "reduce" });
  await desktop.reload({ waitUntil: "networkidle" });
  await pause(500);
  await desktop.screenshot({ path: resolve(outputDir, "01-hero-desktop.png") });
  await desktop.addStyleTag({ content: "#top,.progress-track,.ambient-cursor,.toast,.skip-link{display:none!important}" });

  await desktop.locator("#domains").scrollIntoViewIfNeeded();
  await pause(600);
  await desktop.locator("#domains").screenshot({ path: resolve(outputDir, "02-risk-atlas.png") });
  await desktop.locator('[data-domain="10"]').click();
  await pause(250);
  await desktop.screenshot({ path: resolve(outputDir, "03-domain-detail.png") });
  await desktop.locator("#domain-modal [data-close-modal]").last().click();

  await desktop.locator("#simulation").scrollIntoViewIfNeeded();
  await pause(500);
  await desktop.locator("#scenario-choices .choice-button").first().click();
  await pause(650);
  await desktop.locator("#simulation").screenshot({ path: resolve(outputDir, "04-scenario-simulation.png") });

  await desktop.locator("#check-list").scrollIntoViewIfNeeded();
  await pause(400);
  const checkItems = desktop.locator(".check-item");
  for (const index of [0, 2, 3, 5, 6, 7]) await checkItems.nth(index).click();
  await desktop.locator("#check-submit").click();
  await pause(350);
  await desktop.locator(".check-panel").screenshot({ path: resolve(outputDir, "05-self-check.png") });

  await desktop.locator("#actions").scrollIntoViewIfNeeded();
  await pause(500);
  await desktop.locator("#actions").screenshot({ path: resolve(outputDir, "06-action-guide.png") });

  await desktop.locator('article[data-case="ai"] .case-open').click();
  await pause(250);
  await desktop.screenshot({ path: resolve(outputDir, "07-case-closeup.png") });
  await desktop.locator("[data-close-case]").last().click();

  await desktop.locator(".pledge").scrollIntoViewIfNeeded();
  await pause(350);
  const downloadPromise = desktop.waitForEvent("download");
  await desktop.locator("#generate-card").click();
  const download = await downloadPromise;
  await download.saveAs(resolve(outputDir, "09-pledge-card.png"));
  await desktop.locator(".pledge").screenshot({ path: resolve(outputDir, "10-pledge-section.png") });

  await desktop.reload({ waitUntil: "networkidle" });
  await pause(300);
  const pageState = await desktop.evaluate(() => ({
    title: document.title,
    domainCards: document.querySelectorAll(".domain-card").length,
    scenarioTabs: document.querySelectorAll(".scenario-tab").length,
    checks: document.querySelectorAll("#check-list input").length,
    horizontalOverflow: document.documentElement.scrollWidth > document.documentElement.clientWidth
  }));

  const mobile = await browser.newPage({
    viewport: { width: 390, height: 844 },
    deviceScaleFactor: 2,
    isMobile: true,
    hasTouch: true
  });
  await mobile.goto("http://127.0.0.1:4173/", { waitUntil: "networkidle" });
  await mobile.emulateMedia({ reducedMotion: "reduce" });
  await mobile.reload({ waitUntil: "networkidle" });
  await pause(350);
  await mobile.screenshot({ path: resolve(outputDir, "08-mobile-hero.png") });
  const mobileState = await mobile.evaluate(() => ({
    overflow: document.documentElement.scrollWidth > document.documentElement.clientWidth,
    width: document.documentElement.scrollWidth,
    viewport: document.documentElement.clientWidth
  }));

  console.log(JSON.stringify({ pageState, mobileState, consoleErrors }, null, 2));
} finally {
  await browser.close();
  await new Promise((resolvePromise) => server.close(resolvePromise));
}
