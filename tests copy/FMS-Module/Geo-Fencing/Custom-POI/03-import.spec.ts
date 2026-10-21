import { test, expect } from "@playwright/test";
import path from "path";
import os from "os";

test("geo-fencing test - dynamic user downloads path", async ({ page }) => {
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

  // 3. อ้างอิงโฟลเดอร์ Downloads ของผู้ใช้แต่ละคนโดยตรงอัตโนมัติ (ไม่ติด Hardcode Username)
  const userDownloadsPath = path.join(os.homedir(), "Downloads", "Import_CustomPOI.xlsx");

  // 4. นำไฟล์ขึ้นอัปโหลด
  await page.locator('.file-upload-container input[type="file"]').setInputFiles(userDownloadsPath);
  // await page.getByRole("button", { name: "OK" }).click();

  await page.pause();
});