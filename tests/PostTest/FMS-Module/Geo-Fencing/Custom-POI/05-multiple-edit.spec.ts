import { test, expect } from "@playwright/test";

// ตั้งค่าข้อมูลที่ต้องการเปลี่ยนตรงนี้
const TEST_CONFIG = {
  createdBy: "trainee03",
  targetPoiNames: ["ATest 006", "ATest 007"], // ระบุเฉพาะชื่อ POI ที่ต้องการเลือก
};

test("Geo-Fencing - Multiple Edit Custom POI PostTest", async ({ page }) => {
  await page.goto("/#/geo-fencing");
  await page.getByRole("link", { name: "Custom POI", exact: true }).click();
  await page.waitForTimeout(1500);

  // 1. ค้นหาข้อมูลตาม Created By
  await page.getByTitle("Search", { exact: true }).click();
  await page.getByRole("textbox", { name: "Created By" }).fill(TEST_CONFIG.createdBy);
  await page.locator("button").filter({ hasText: "Search" }).click();
  await page.waitForLoadState("networkidle").catch(() => {});
  await page.waitForTimeout(1500);

  // 2. ติ๊กเลือก Checkbox เฉพาะแถวที่มีชื่อที่ต้องการ (แก้จุดที่หาไม่เจอ)
  for (const name of TEST_CONFIG.targetPoiNames) {
    const row = page.locator("tr", { hasText: name }).first();
    await row.locator('input[type="checkbox"], label').first().click({ force: true });
  }

  // 3. ทำรายการ Multiple Edit
  await page.getByTitle("Multiple Edit").click();
  await page.waitForTimeout(500);

  await page.locator("label").filter({ hasText: "Scan Check-In" }).click();
  await page.locator("label").filter({ hasText: "Yes" }).click();
  
  await page.getByRole("button", { name: "Cancel" }).click();

});