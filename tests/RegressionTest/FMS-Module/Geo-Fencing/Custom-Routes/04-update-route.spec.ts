import { test, expect } from "@playwright/test";
import { safeClick, selectDatePicker } from "../../../../helpers";

const ACTION_DELAY = 500;

// สุ่มสร้างชื่อ Custom Area แบบ Dynamic เพื่อไม่ให้ซ้ำกับข้อมูลที่มีในระบบ
const uniqueAreaName = `Area_${Date.now()}`;

test("Geo-Fencing - Custom Routes Search & Update RegressionTest", async ({ page }) => {
  // ขยายเวลา Timeout เป็น 3 นาที ป้องกันติด Timeout จากข้อมูลจำนวนมาก
  test.setTimeout(180000);

  await page.goto("/#/geo-fencing");

  // 1. เปิดหน้า Custom Routes & เปิด Modal Search
  await safeClick(
    page.getByRole("link", { name: "Custom Routes", exact: true })
  );
  await page.waitForTimeout(ACTION_DELAY);

  await safeClick(page.getByTitle("Search", { exact: true }));
  await page.waitForTimeout(ACTION_DELAY);

  // 2. ตั้งค่าเงื่อนไขค้นหา
  const accessTypeSelect = page.locator("select").filter({
    has: page.locator("option", { hasText: "Public" }),
  });
  await accessTypeSelect.selectOption({ label: "Shared" }).catch(() => {});

  // เลือกวันที่ From
  await selectDatePicker(
    page,
    'gisc-ui-datetime[params*="dtCreateDateFrom"] input, gisc-ui-datetime:has-text("From") input',
    { year: "2026", monthIndex: "8", day: "1" }
  );
  await page.waitForTimeout(ACTION_DELAY);

  // เลือกวันที่ To
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

  // 3. กด Search และเปิดหน้า Update
  await safeClick(page.locator("button").filter({ hasText: "Search" }));
  await page.waitForTimeout(ACTION_DELAY);

  await page.getByRole("gridcell", { name: "ATRoute001" }).first().click();
  await safeClick(page.getByTitle("Update"));
  await page.waitForTimeout(ACTION_DELAY);

  // 4. สลับไปแท็บ Direction และเปิด Form Create Custom Area
  await safeClick(
    page.locator("#poiTab").getByRole("link", { name: "Direction" })
  );
  await safeClick(page.getByTitle("Create Custom Route"));
  await safeClick(page.getByTitle("Create Custom Area"));
  await page.waitForTimeout(ACTION_DELAY);

  // 5. กรอก Name แบบ Dynamic ไม่ให้ซ้ำเดิม
  const nameInput = page.getByRole("textbox", { name: "Required field" }).first();
  await safeClick(nameInput);
  await nameInput.focus();
  await page.keyboard.press("Control+A");
  await page.keyboard.press("Backspace");
  await nameInput.fill(uniqueAreaName);
  await nameInput.dispatchEvent("change").catch(() => {});
  await page.waitForTimeout(ACTION_DELAY);

  // 6. เลือก Type (Working Area)
  const typeSelect = page
    .locator("gisc-ui-dropdown[params*='areaType'], gisc-ui-dropdown:has(option:text('Dangerous Area'))")
    .locator("select")
    .last();
  await typeSelect.selectOption({ label: "Working Area" }).catch(() => {});
  await typeSelect.dispatchEvent("change").catch(() => {});
  await page.waitForTimeout(ACTION_DELAY);

  // 7. เลือก Access Type (Shared)
  const poiTypeSelect = page.locator("#ddAreaType");
  await poiTypeSelect.selectOption({ label: "Shared" }).catch(() => {});
  await poiTypeSelect.dispatchEvent("change").catch(() => {});
  await page.waitForTimeout(ACTION_DELAY);

  // 8. กรอก Description
  const descriptionTextarea = page
    .locator("gisc-ui-component")
    .filter({ hasText: "Name Type Working Area" })
    .locator('textarea[type="text"]');
  await safeClick(descriptionTextarea);
  await descriptionTextarea.fill("Test");

  // 9. กรอก Buffer (m) และ Generalize (m)
  const bufferInput = page.locator('input[type="text"]').nth(4);
  await safeClick(bufferInput);
  await bufferInput.fill("100");

  const generalizeInput = page.locator('input[type="text"]').nth(5);
  await safeClick(generalizeInput);
  await generalizeInput.fill("100");

  // 10. Refresh Map และ View On Map
  await safeClick(page.getByRole("button", { name: "Refresh Map" }));
  await page.waitForTimeout(ACTION_DELAY);
  await safeClick(page.getByRole("button", { name: "Save" }).last());

  await safeClick(page.getByTitle("View On Map", { exact: true }));
  await page.waitForTimeout(ACTION_DELAY);

  const page1Promise = page.waitForEvent('popup');
  await page.getByTitle('Print Map').click();
  const page1 = await page1Promise;

  // 11. กด Save Custom Route
  await safeClick(page.getByRole("button", { name: "Save" }).last());
  await page.waitForTimeout(2000);

  // await page.getByTitle('Delete').click();
  // await page.getByText('Yes').click();
  await page.waitForTimeout(2000);

});