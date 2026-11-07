import { test, expect } from "@playwright/test";


test("Geo-Fencing - Import Custom POI RegressionTest", async ({ page }) => {
  await page.goto("/#/geo-fencing");
  await page.getByRole("link", { name: "Custom POI", exact: true }).click();
  await page.waitForTimeout(1500);

  // 1. เปิด Dialog Import
  await page.getByTitle("Import", { exact: true }).click();
  await page.getByTitle("Download Template").click();

  // 2. ดาวน์โหลดไฟล์
  const downloadPromise = page.waitForEvent("download");
  await page.getByText("OK").last().click();
  await downloadPromise;

  // 3. นำไฟล์ขึ้นอัปโหลด
  await page.locator('.file-upload-container input[type="file"]').setInputFiles('tests/RegressionTest/FMS-Module/Geo-Fencing/Custom-POI/Data/Import_CustomPOI.xlsx');
  await page.getByRole("button", { name: "OK" }).click();

});