import { chromium } from "playwright-core";

const edgePath = "C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe";
const browser = await chromium.launch({ executablePath: edgePath, headless: true });

try {
  const page = await browser.newPage({ viewport: { width: 1440, height: 1000 } });
  const consoleErrors = [];
  page.on("console", (message) => {
    if (message.type() === "error") consoleErrors.push(message.text());
  });
  page.on("pageerror", (error) => consoleErrors.push(error.message));

  const response = await page.goto("https://zhuanght-1201.github.io/defense-line/", {
    waitUntil: "networkidle",
    timeout: 60000
  });
  await page.emulateMedia({ reducedMotion: "reduce" });

  await page.locator('[data-filter="digital"]').click();
  const visibleDigitalCards = await page.locator(".domain-card:not(.is-hidden)").count();
  await page.locator('[data-domain="10"]').click();
  const modalTitle = await page.locator("#modal-title").textContent();
  await page.locator("#domain-modal [data-close-modal]").last().click();

  await page.locator("#simulation").scrollIntoViewIfNeeded();
  await page.locator("#scenario-choices .choice-button").first().click();
  await page.waitForTimeout(700);
  const safetyScore = await page.locator("#safety-score").textContent();

  const result = await page.evaluate(() => ({
    domainCards: document.querySelectorAll(".domain-card").length,
    scenarioTabs: document.querySelectorAll(".scenario-tab").length,
    checks: document.querySelectorAll("#check-list input").length,
    horizontalOverflow: document.documentElement.scrollWidth > document.documentElement.clientWidth
  }));

  const summary = {
    httpStatus: response?.status(),
    ...result,
    visibleDigitalCards,
    modalTitle,
    safetyScore,
    consoleErrors
  };

  if (
    summary.httpStatus !== 200 ||
    summary.domainCards !== 20 ||
    summary.scenarioTabs !== 3 ||
    summary.checks !== 8 ||
    summary.horizontalOverflow ||
    summary.visibleDigitalCards !== 3 ||
    summary.modalTitle !== "数据安全" ||
    Number(summary.safetyScore) <= 30 ||
    summary.consoleErrors.length
  ) {
    console.error(JSON.stringify(summary, null, 2));
    process.exitCode = 1;
  } else {
    console.log(JSON.stringify(summary, null, 2));
  }
} finally {
  await browser.close();
}
