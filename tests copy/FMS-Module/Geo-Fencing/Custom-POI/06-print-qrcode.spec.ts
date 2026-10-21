import { test, expect } from "@playwright/test";

test("geo-fencing test - Search & Print QR Code", async ({ page }) => {
  await page.goto("/#/geo-fencing");
  await page.waitForLoadState("networkidle");

  // 1. เปิดแท็บ Custom POI
  await page.getByRole("link", { name: "Custom POI", exact: true }).click();
  await page.waitForTimeout(1500);

  // 2. ค้นหาด้วย Created By: trainee03
  await page.getByTitle("Search", { exact: true }).click();
  const createdByInput = page.getByRole("textbox", { name: "Created By" });
  await createdByInput.click();
  await createdByInput.fill("trainee03");
  await page.locator("button").filter({ hasText: "Search" }).click();
  await page.waitForTimeout(1500);
    
  // 3. เลือก Checkbox ตามข้อมูลจริงใน Datagrid
  const row1 = page.locator('tr.k-master-row', { hasText: 'ATest 006' }).first();
  await row1.locator('td[data-grid="table-column-cell-rowselector"]').click({ force: true });

  const row2 = page.locator('tr.k-master-row', { hasText: 'ATest 007' }).first();
  await row2.locator('td[data-grid="table-column-cell-rowselector"]').click({ force: true });

  // 4. สั่ง Print QR Code และจัดการปุ่มควบคุมต่าง ๆ ใน Viewer
  await page.getByTitle("Print QR Code").click();
  await page.waitForTimeout(1000);

// --------------------------------------------------------------------------
  // สั่งงานปุ่มบน Report Viewer Toolbar
  // --------------------------------------------------------------------------
  
  // 1. ตรวจสอบว่า Toolbar ลอยอยู่ใน iframe หรือไม่ (ถ้าอยู่ ให้สโคปเข้า iframe)
  const reportFrame = page.frames().find(f => f.url().includes("report") || f.url().includes("viewer")) || page;

  // 2. รอให้ Toolbar โหลดปุ่มต่างๆ ขึ้นมาจนสมบูรณ์
  const zoomInBtn = reportFrame.getByTitle("Zoom In").first();
  await zoomInBtn.waitFor({ state: "visible", timeout: 10000 }).catch(() => {});

  // 3. ทยอยคลิกทีละปุ่ม โดยเว้นระยะ ACTION_DELAY เล็กน้อย
  await reportFrame.getByTitle("Zoom In").first().click({ force: true }).catch(() => {});
  await page.waitForTimeout(300);

  await reportFrame.getByTitle("Zoom Out").first().click({ force: true }).catch(() => {});
  await page.waitForTimeout(300);

  await reportFrame.getByTitle("Next Page", { exact: true }).first().click({ force: true }).catch(() => {});
  await page.waitForTimeout(300);

  await reportFrame.getByTitle("Last Page", { exact: true }).first().click({ force: true }).catch(() => {});
  await page.waitForTimeout(300);

  await reportFrame.getByTitle("Toggle FullPage/PageWidth").first().click({ force: true }).catch(() => {});
  await page.waitForTimeout(300);

  await reportFrame.getByTitle("Print Preview", { exact: true }).first().click({ force: true }).catch(() => {});
  await page.waitForTimeout(300);

  await reportFrame.getByRole("link", { name: "Refresh", exact: false });

  await page.waitForTimeout(3000);
  await page.pause();
});