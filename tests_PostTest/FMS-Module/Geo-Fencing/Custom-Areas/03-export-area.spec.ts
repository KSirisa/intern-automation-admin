import { test, expect } from "@playwright/test";
import { tryAction, safeClick, selectDatePicker } from "../../../../helpers";

// ============================================================================
// GLOBAL CONFIG & TEST DATA (ฟิลด์ไหนไม่ต้องการกรอกให้ลบออก หรือเว้นว่างไว้ได้)
// ============================================================================
const TEST_CONFIG = {
  url: "/#/geo-fencing",
  searchData: {
    accessType: "", // Public | Shared | (เว้นว่างไว้หากไม่ต้องการเลือก)
    type: "", // Dangerous Area | Forbidden Area | Working Area | Distribution Zone
    dateFrom: { year: "2026", monthIndex: "6", day: "1" },
    dateTo: { year: "2026", monthIndex: "8", day: "30" },
    createdBy: "Trainee03",
  },
};

// ============================================================================
// MAIN TEST SUITE
// ============================================================================
test("geo-fencing custom area search & export test", async ({ page }) => {
  const { searchData } = TEST_CONFIG;

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
  // 2. SEARCH FILTERS (กรอกเฉพาะฟิลด์ที่มีข้อมูลใน Config)
  // --------------------------------------------------------------------------
  if (searchData?.accessType) {
    const accessTypeSelect = page.locator("select").filter({
      has: page.locator("option", { hasText: "Public" }),
    });
    await accessTypeSelect.selectOption({ label: searchData.accessType });
  }

  if (searchData?.type) {
    const typeAreaSelect = page.locator("select").filter({
      has: page.locator("option", { hasText: "Dangerous Area" }),
    });
    await typeAreaSelect.selectOption({ label: searchData.type });
  }

  if (searchData?.dateFrom) {
    await selectDatePicker(page, 'input[placeholder*="From"], #dtCreateDateFrom', searchData.dateFrom);
  }

  if (searchData?.dateTo) {
    await selectDatePicker(page, 'input[placeholder*="To"], #dtCreateDateTo', searchData.dateTo);
  }

  if (searchData?.createdBy) {
    await page.getByRole("textbox", { name: "Created By" }).fill(searchData.createdBy);
  }

  // Submit Search Filter
  await page.getByRole("button", { name: "Apply" }).click();
  await page.waitForLoadState("networkidle").catch(() => {});
  await page.waitForTimeout(1000);

  // --------------------------------------------------------------------------
  // 3. EXPORT FILE ACTION
  // --------------------------------------------------------------------------
  await page.getByTitle("Export", { exact: true }).click();

  // ดักจับ Event ดาวน์โหลดไฟล์เมื่อกด Confirm "Yes"
  const downloadPromise = page.waitForEvent("download");
  await page.getByRole("button", { name: "Yes" }).or(page.getByText("Yes")).first().click();
  const download = await downloadPromise;

  // ตรวจสอบสถานะการดาวน์โหลด
  expect(await download.failure()).toBeNull();

  await page.pause();
});