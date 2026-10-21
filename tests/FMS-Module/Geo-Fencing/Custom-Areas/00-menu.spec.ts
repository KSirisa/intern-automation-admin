import { test, expect, Page } from "@playwright/test";

// ============================================================================
// GLOBAL CONFIG & TEST DATA
// ============================================================================
const TEST_CONFIG = {
  url: "/#/geo-fencing",
  filterText: "AreaTest",
  pageSize: "20", // 20 | 50 | 100 | All
  // คอลัมน์ที่ต้องการทดสอบคลิกเรียงลำดับ (Sort)
  sortColumns: [
    "Name",
    "Code",
    "Access Type",
    "Type",
    "Size",
    "Number of Area Points",
    "Created Date",
    "Created By",
  ],
};

// ============================================================================
// REUSABLE HELPER FUNCTIONS
// ============================================================================

/** ฟังก์ชันช่วยคลิกเรียงลำดับคอลัมน์ (Sort) ทั้ง Ascending และ Descending */
async function testColumnSorting(page: Page, columnNames: string[]) {
  for (const name of columnNames) {
    const header = page.getByRole("columnheader", { name: new RegExp(name, "i") }).first();
    if (await header.isVisible().catch(() => false)) {
      await header.click(); // Sort ครั้งที่ 1
      await page.waitForTimeout(200);
      await header.click(); // Sort ครั้งที่ 2 (สลับน้อยไปมาก / มากไปน้อย)
      await page.waitForTimeout(200);
    }
  }
}

// ============================================================================
// MAIN TEST SUITE
// ============================================================================
test("geo-fencing custom areas grid test - global version", async ({ page }) => {
  const { filterText, pageSize, sortColumns } = TEST_CONFIG;

  // 1. NAVIGATION
  await page.goto(TEST_CONFIG.url);
  await page.waitForLoadState("networkidle");
  await page.getByRole("link", { name: "Custom Areas", exact: true }).click();
  await page.waitForTimeout(500);

  // 2. QUICK FILTER SEARCH & CLEAR
  const filterInput = page.getByPlaceholder(/Filter by Name/i);
  await filterInput.fill(filterText);
  await filterInput.press("Enter");
  await page.waitForTimeout(500);

  // คลิกปุ่ม เคลียร์ข้อความค้นหา (Clear Filter)
  await page.locator(".dt-filter-clear").first().click();
  await page.waitForTimeout(300);

  // 3. PAGINATION DROPDOWN
  await page.getByRole("combobox").selectOption(pageSize);
  await page.waitForTimeout(500);

  // 4. COLUMN SORTING TEST
  await testColumnSorting(page, sortColumns);

  // 5. ROW ACTION (คลิกปุ่ม Action/Icon แถวแรก)
  await page.locator(".dt-img-button, .dg-body-center #Layer_1").first().click();

  await page.pause();
});