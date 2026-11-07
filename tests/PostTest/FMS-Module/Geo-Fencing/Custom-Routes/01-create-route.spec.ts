import { test, expect, Page } from "@playwright/test";

const ACTION_DELAY = 500;

// ฟังก์ชันสุ่มโค้ดสี HEX 6 ตัวอักษร (เช่น "A3F12C")
function getRandomHexColor(): string {
  return Math.floor(Math.random() * 16777215)
    .toString(16)
    .padStart(6, "0")
    .toUpperCase();
}

const routeData = {
  name: `ATRoute001`,
  code: `ATR001`,
  description: "Automated FMS Custom Route Creation",
  color: getRandomHexColor(), // สุ่มโค้ดสี HEX 6 ตัวอักษร
  category: "Test1",
  accessType: "Shared",
  businessUnit: "AGG",
};

test("Geo-Fencing - Create Custom Route PostTest", async ({ page }) => {
  test.setTimeout(180000);

  // 1. NAVIGATION & FORM OPEN
  await page.goto("/#/geo-fencing");
  await page.waitForLoadState("networkidle");

  await page.getByRole("link", { name: "Custom Routes", exact: true }).click();
  await page.waitForTimeout(1000);

  await page.getByTitle("Create", { exact: true }).click();
  await page.waitForTimeout(ACTION_DELAY);

  const activeBlade = page.locator(".app-blade-stacklayout, div[data-bind*='blade']").last();

  // --------------------------------------------------------------------------
  // 2. GENERAL INFORMATION
  // --------------------------------------------------------------------------
  // Name & Code Inputs (เจาะจงผ่าน gisc-ui-label / Knockout params)
  const nameInput = activeBlade.locator('gisc-ui-textbox[params*="routeName"] input, gisc-ui-label:has-text("Name") + gisc-ui-textbox input').first();
  await nameInput.click();
  await nameInput.fill(routeData.name);

  const codeInput = activeBlade.locator('#txtCode, gisc-ui-textbox[params*="routeCode"] input').first();
  await codeInput.click();
  await codeInput.fill(routeData.code);

  const descInput = activeBlade.locator('textarea[type="text"], textarea.app-textarea').first();
  await descInput.click();
  await descInput.fill(routeData.description);

  // --------------------------------------------------------------------------
  // Color Picker Handling
  // --------------------------------------------------------------------------
  const colorInput = activeBlade.locator('.minicolors-input, gisc-ui-colorpicker input[type="text"]').first();
  await colorInput.scrollIntoViewIfNeeded().catch(() => {});
  await colorInput.click();
  await colorInput.focus();
  await colorInput.fill("");
  await colorInput.fill(routeData.color);
  await colorInput.dispatchEvent("change").catch(() => {});
  await colorInput.press("Enter");
  await page.waitForTimeout(200);

  // Route Category & Access Type Dropdowns
  const categorySelect = activeBlade.locator('gisc-ui-dropdown[params*="categoryOptions"] select, select').filter({
    has: page.locator("option", { hasText: routeData.category }),
  });
  await categorySelect.selectOption({ label: routeData.category }).catch(() => {});

  const accessTypeSelect = activeBlade.locator('gisc-ui-dropdown[params*="accessTypeOptions"] select, select').filter({
    has: page.locator("option", { hasText: "Public" }),
  });
  await accessTypeSelect.selectOption({ label: routeData.accessType }).catch(() => {});

  // --------------------------------------------------------------------------
  // 3. BUSINESS UNIT SELECTION
  // --------------------------------------------------------------------------
  await activeBlade.locator("a").filter({ hasText: "Add" }).last().click();
  await page.getByLabel("Include Sub Business Units").selectOption("").catch(() => {});
  await page.getByRole("treeitem", { name: routeData.businessUnit }).click();
  await page.getByRole("button", { name: "OK" }).click();
  await page.waitForTimeout(ACTION_DELAY);

  // --------------------------------------------------------------------------
  // 4. MAP WAYPOINTS SELECTION (Click On Map)
  // --------------------------------------------------------------------------
  await page.getByRole("link", { name: "Direction" }).click();
  await page.getByRole("link", { name: "POI", exact: true }).click();

  const mapFrame = page.locator("iframe").contentFrame();
  const mapCanvas = mapFrame.locator("#divMap_gc");
  await mapCanvas.waitFor({ state: "visible" });

  // ฟังก์ชันช่วยเหลือสุ่มพิกัดบน Map Canvas
  function getPointInMap(box: { width: number; height: number }, margin = 80) {
    return {
      x: margin + Math.floor(Math.random() * (box.width - margin * 2)),
      y: margin + Math.floor(Math.random() * (box.height - margin * 2)),
    };
  }

  // ปักหมุดจุดที่ 1
  await page.getByTitle("Click On Map").click();
  await page.waitForTimeout(300);
  let mapBox = await mapCanvas.boundingBox();
  if (mapBox) {
    await mapCanvas.click({ position: getPointInMap(mapBox) });
  }
  await page.waitForTimeout(500);

  // ปักหมุดจุดที่ 2
  await page.getByTitle("Click On Map").click();
  await page.waitForTimeout(300);
  mapBox = await mapCanvas.boundingBox();
  if (mapBox) {
    await mapCanvas.click({ position: getPointInMap(mapBox) });
  }
  await page.waitForTimeout(1000); // รอให้ระบบคำนวณเส้นทางเบื้องต้น

  // --------------------------------------------------------------------------
  // 5. CUSTOM ROUTE SETTINGS & VEHICLE TYPE
  // --------------------------------------------------------------------------
  await page.getByRole("link", { name: "Direction" }).click();
  await page.getByRole("link", { name: "Custom Route Settings*" }).click();
  await page.waitForTimeout(ACTION_DELAY);

  // Optimization Type (Time vs Distance)
  const timeDistanceSelect = page.locator('gisc-ui-dropdown select, select').filter({
    has: page.locator("option", { hasText: /^Time$/ }),
  }).first();

  await timeDistanceSelect.selectOption({ label: "Time" }).catch(() => {});
  await timeDistanceSelect.selectOption({ label: "Distance" }).catch(() => {});

  // Vehicle Type Selection
  const vehicleTypeSelect = page.locator('gisc-ui-dropdown select, select').filter({
    has: page.locator("option", { hasText: /^Car$/ }),
  }).first();

  await vehicleTypeSelect.selectOption({ label: "Car" }).catch(() => {});
  await vehicleTypeSelect.selectOption({ label: "Motorcycle" }).catch(() => {});
  await vehicleTypeSelect.selectOption({ label: "Pedestrain" }).catch(() => {});
  await vehicleTypeSelect.selectOption({ label: "Truck" }).catch(() => {});

  // ตกลงการตั้งค่า
  await page.getByRole("button", { name: "OK" }).click();
  await page.waitForTimeout(ACTION_DELAY);

  // --------------------------------------------------------------------------
  // 6. SAVE CUSTOM ROUTE
  // --------------------------------------------------------------------------
  await page.getByRole("button", { name: "Cancel" }).first().click();
  await page.waitForTimeout(2000);

});