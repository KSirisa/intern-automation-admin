import { test, expect } from "@playwright/test";
import { tryAction, safeClick, selectDatePicker } from "../../../../helpers";

// ============================================================================
// GLOBAL CONFIG & TEST DATA
// ============================================================================
const TEST_CONFIG = {
  url: "/#/geo-fencing",
  searchData: {
    accessType: "Public", // Public | Shared
    type: "Distribution Zone", // Dangerous Area | Forbidden Area | Working Area | Distribution Zone
    dateFrom: { year: "2026", monthIndex: "7", day: "15" }, // 15 ส.ค. 2026
    dateTo: { year: "2026", monthIndex: "8", day: "30" }, // 30 ก.ย. 2026
    createdBy: "trainee03",
    targetAreaName: "AreaTest 001",
  },
  updateData: {
    description: "Automated FMS Update",
  },
};

// ============================================================================
// MAIN TEST SUITE
// ============================================================================
test("Geo-Fencing - Search & Update Custom Areas PostTest", async ({ page }) => {
  const { searchData, updateData } = TEST_CONFIG;

  // 1. NAVIGATION & DIALOG OPEN
  await page.goto(TEST_CONFIG.url);
  await page.waitForLoadState("networkidle");

  await page.getByRole("link", { name: "Custom Areas", exact: true }).click();
  await page.waitForTimeout(500);

  await tryAction(async () => {
    await safeClick(page.getByTitle("Search", { exact: true }).first(), "Search Button");
  }, "Open Search Dialog");
  await page.waitForTimeout(500);

  // --------------------------------------------------------------------------
  // 2. SEARCH FILTERS
  // --------------------------------------------------------------------------
  const accessTypeSelect = page.locator("select").filter({
    has: page.locator("option", { hasText: "Public" }),
  });
  await accessTypeSelect.selectOption({ label: searchData.accessType });

  const typeAreaSelect = page.locator("select").filter({
    has: page.locator("option", { hasText: "Dangerous Area" }),
  });
  await typeAreaSelect.selectOption({ label: searchData.type });

  // เลือกวันที่ From / To ผ่าน helper แบบ Date
  await selectDatePicker(page, 'input[placeholder*="From"], #dtCreateDateFrom', searchData.dateFrom);
  await selectDatePicker(page, 'input[placeholder*="To"], #dtCreateDateTo', searchData.dateTo);

  // Created By Textbox
  await page.getByRole("textbox", { name: "Created By" }).fill(searchData.createdBy);

  // Submit Search Filter
  await page.getByRole("button", { name: "Apply" }).click();
  await page.waitForLoadState("networkidle").catch(() => {});
  await page.waitForTimeout(1000);

  // --------------------------------------------------------------------------
  // 3. GRID SELECTION & UPDATE ACTION
  // --------------------------------------------------------------------------
  await page.getByRole("gridcell", { name: searchData.targetAreaName }).first().click();

  await page.getByTitle("Update").click();
  await page.waitForTimeout(500);

  await page.locator('textarea[type="text"]').fill(updateData.description);
  await page.getByRole("button", { name: "Cancel" }).click();
  await page.waitForTimeout(1500);

  // --------------------------------------------------------------------------
  // 4. VIEW ON MAP
  // --------------------------------------------------------------------------
  await page.getByTitle("View on Map").click();

  await page.getByTitle('Delete').click();
  await page.getByText('No').last().click();

});