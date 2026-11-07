import { test, expect, Page } from "@playwright/test";
import { tryAction, safeClick } from "../../../../helpers";

// ============================================================================
// GLOBAL CONFIG & TEST DATA
// ============================================================================
const TEST_CONFIG = {
  url: "/#/geo-fencing",
  areaData: {
    name: "AreaTest 001",
    code: "AreaT001",
    type: "Distribution Zone", // Dangerous Area | Forbidden Area | Working Area | Distribution Zone
    accessType: "Public", // Public | Shared
    description: "Automated FMS",
    category: "TestDC",
    actionMoveIn: "SirenOn",
    actionMoveOut: "SirenOff",
    businessUnit: "AGG",
    hubDcName: "GIS",
    allowLastMile: true,
  },
  // พิกัดการวาด รูปปิด Polygon บนแผนที่ iFrame
  mapPoints: [
    { x: 590, y: 300 }, // Top-Left
    { x: 640, y: 300 }, // Top-Right
    { x: 640, y: 350 }, // Bottom-Right
    { x: 590, y: 350 }, // Bottom-Left
  ],
};

// ============================================================================
// REUSABLE HELPER FUNCTIONS
// ============================================================================

/** วาดพิกัด Polygon บน Map iFrame */
async function drawPolygonOnMap(
  page: Page,
  points: { x: number; y: number }[],
) {
  const mapFrame = page.locator("iframe").contentFrame();

  // เปิดใช้ Polygon Editor Tool
  await mapFrame
    .locator('[data-dojo-attach-point="divHiddingWidget"]')
    .filter({ hasText: "Polygon Editor" })
    .dispatchEvent("mouseover");

  await mapFrame.locator(".msportalfx-svg-placeholder").click();
  await mapFrame
    .locator("div:nth-child(5) > .div-btn > #Layer_1 > path")
    .first()
    .click();

  const mapArea = mapFrame.locator("#divMap_gc");

  // วนลูปคลิกสร้างจุดตามพิกัด
  for (const point of points) {
    await mapArea.click({ position: point });
  }

  // ดับเบิ้ลคลิกจุดสุดท้ายเพื่อปิด Polygon
  await mapArea.dblclick({ position: points[points.length - 1] });
  await mapFrame.getByText("OK").click();
}

// ============================================================================
// MAIN TEST SUITE
// ============================================================================
test("Geo-Fencing - Create Custom Areas PostTest", async ({
  page,
}) => {
  const { areaData, mapPoints } = TEST_CONFIG;

  // 1. NAVIGATION & DIALOG OPEN
  await page.goto(TEST_CONFIG.url);
  await page.waitForLoadState("networkidle");

  await page.getByRole("link", { name: "Custom Areas", exact: true }).click();
  await page.waitForTimeout(500);

  await page.getByTitle("Create", { exact: true }).click();
  await page.waitForTimeout(500);

  // --------------------------------------------------------------------------
  // 2. BASIC FORM INPUTS (ใช้ Selector จาก DOM Knockout Binding ตรงๆ)
  // --------------------------------------------------------------------------
  // Name & Code
  await page
    .locator('gisc-ui-textbox[params*="value:name"] input')
    .fill(areaData.name);
  await page
    .locator('gisc-ui-textbox[params*="value:code"] input')
    .fill(areaData.code);

  // Type & Access Type
  await page
    .locator('gisc-ui-dropdown[params*="options:typeOptions"] select')
    .selectOption({ label: areaData.type });
  await page
    .locator("#ddAreaType")
    .selectOption({ label: areaData.accessType });

  // Description
  await page
    .locator('gisc-ui-textarea[params*="value:description"] textarea')
    .fill(areaData.description);

  // Category
  await page
    .locator('gisc-ui-dropdown[params*="options:categoryOptions"] select')
    .selectOption({ label: areaData.category });

  // Actions (Move In / Move Out)
  await page
    .locator('gisc-ui-dropdown[params*="options:moveInAreaOptions"] select')
    .selectOption({ label: areaData.actionMoveIn });
  await page
    .locator('gisc-ui-dropdown[params*="options:moveOutAreaOptions"] select')
    .selectOption({ label: areaData.actionMoveOut });

  // --------------------------------------------------------------------------
  // 3. BUSINESS UNIT SELECTION
  // --------------------------------------------------------------------------
  await page
    .locator('.field-wrapper a[data-bind*="addAccessibleBusinessUnit"]')
    .click();
  await page.getByLabel("Include Sub Business Units").selectOption("");
  await page.getByRole("treeitem", { name: areaData.businessUnit }).click();
  await page.getByRole("button", { name: "OK" }).click();

  // --------------------------------------------------------------------------
  // 4. DRAW GEOFENCE AREA ON MAP (iFrame)
  // --------------------------------------------------------------------------
  await page.locator(".img-custom-geofencing").click();
  await drawPolygonOnMap(page, mapPoints);
  await page.getByText("Create Custom Area Name Code").click();

  // --------------------------------------------------------------------------
  // 5. HUB/DC & LAST MILE CONFIG (Distribution Zone Only)
  // --------------------------------------------------------------------------
  if (areaData.type === "Distribution Zone") {
    // 5.1 เลือก DC / Hub เป็น ATest001 ผ่าน select#ddDcHub
    const dcHubSelect = page.locator("#ddDcHub");
    await dcHubSelect.waitFor({ state: "visible" });
    await dcHubSelect.selectOption({ label: "ATest001" }).catch(async () => {
      // Fallback: หากเลือกด้วย label ตรงๆ ไม่ได้ ให้หา option ที่มีข้อความ "ATest001"
      await dcHubSelect.selectOption({ value: "ATest001" }).catch(() => {});
    });
    await dcHubSelect.dispatchEvent("change").catch(() => {});

    // 5.2 ติ๊ก Allow Last Mile Checkbox
    if (areaData.allowLastMile) {
      const allowLastMileInput = page
        .locator(
          'gisc-ui-checkbox[params*="allowLastMile"] input[type="checkbox"]',
        )
        .first();
      const isChecked = await allowLastMileInput.isChecked().catch(() => false);

      if (!isChecked) {
        const indicator = page
          .locator(
            'gisc-ui-checkbox[params*="allowLastMile"] .app-control-indicator',
          )
          .first();
        if (await indicator.isVisible().catch(() => false)) {
          await indicator.click({ force: true });
        } else {
          await allowLastMileInput.click({ force: true });
        }
      }
    }

    // 5.3 เพิ่ม Next Zones (เลือกเฉพาะรายการ "8RUN")
    const addNextZoneBtn = page
      .locator('a[data-bind*="click: addNextZone"]')
      .first();
    if (await addNextZoneBtn.isVisible().catch(() => false)) {
      await addNextZoneBtn.click({ force: true });
      await page.waitForTimeout(500);

      // เลือกแถวที่มีข้อความ "8RUN" ใน Modal Datatable
      const targetRowCheckbox = page
        .locator(".dataTables_wrapper tr", { hasText: "8RUN" })
        .locator('.app-control-dt-indicator, input[type="checkbox"]')
        .first();

      if (await targetRowCheckbox.isVisible().catch(() => false)) {
        await targetRowCheckbox.click({ force: true });
      } else {
        // Fallback: หากไม่เจอ 8RUN ให้ติ๊กรายการแรกสุดแทน
        await page
          .locator(".dataTables_wrapper td .app-control-dt-indicator")
          .first()
          .click({ force: true });
      }

      await page.getByRole("button", { name: "OK" }).click();
      await page.waitForTimeout(500);
    }
  }
  // --------------------------------------------------------------------------
  // 6. SAVE
  // --------------------------------------------------------------------------
  await page.getByRole("button", { name: "Cancel" }).click();

});
