import { test, expect } from "@playwright/test";
import { safeClick, selectDatePicker } from "../../../../helpers";

const ACTION_DELAY = 500;

test("Geo-Fencing - Search Custom Route RegressionTest", async ({ page }) => {
  await page.goto("/#/geo-fencing");

  // 1. เปิดหน้า Custom Routes & เปิด Modal Search
  await safeClick(page.getByRole("link", { name: "Custom Routes", exact: true }));
  await page.waitForTimeout(ACTION_DELAY);

  await safeClick(page.getByTitle("Search", { exact: true }));
  await page.waitForTimeout(ACTION_DELAY);

  // 2. ตั้งค่าเงื่อนไขค้นหา
  const accessTypeSelect = page.locator("select").filter({
    has: page.locator("option", { hasText: "Public" }),
  });
  await accessTypeSelect.selectOption({ label: "Shared" }).catch(() => {});

  // เลือกวันที่ From (เจาะจง container ของ From)
  await selectDatePicker(
    page,
    'gisc-ui-datetime[params*="dtCreateDateFrom"] input, gisc-ui-datetime:has-text("From") input',
    { year: "2026", monthIndex: "8", day: "1" }
  );
  await page.waitForTimeout(ACTION_DELAY);

  // เลือกวันที่ To (เจาะจง container ของ To)
  await selectDatePicker(
    page,
    'gisc-ui-datetime[params*="dtCreateDateTo"] input, gisc-ui-datetime:has-text("To") input',
    { year: "2026", monthIndex: "8", day: "28" }
  );
  await page.waitForTimeout(ACTION_DELAY);

  // Clear Date Range Icons
  await safeClick(page.locator(".app-remove-icon > #Layer_1").first());
  await safeClick(page.locator(".app-remove-icon.dtCreateDateTo > #Layer_1"));

  // Created By Field
  const createdByInput = page.getByRole("textbox", { name: "Created By" });
  await createdByInput.fill("trainee03");

  // 3. กด Search
  await safeClick(page.locator("button").filter({ hasText: "Search" }));
  await page.waitForTimeout(ACTION_DELAY);

  // 4. Clear & Search ใหม่
  await safeClick(page.locator("a").filter({ hasText: "Clear" }));
  await page.waitForTimeout(ACTION_DELAY);

  await safeClick(page.locator("button").filter({ hasText: "Search" }));
  await page.waitForTimeout(ACTION_DELAY);

});