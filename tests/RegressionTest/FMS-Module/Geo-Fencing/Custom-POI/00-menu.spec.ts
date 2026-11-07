import { test } from "@playwright/test";
import { tryAction, safeClick } from "../../../../helpers"; // ปรับ Path ../ ให้ตรงกับตำแหน่ง helpers.ts ในเครื่อง

test("Geo-Fencing - Menu Custom POI RegressionTest", async ({ page }) => {
  // 1. เข้าสู่หน้า Geo-fencing
  await page.goto("/#/geo-fencing");
  await page.waitForLoadState("networkidle");

  // 2. เลือก Tab Custom POI
  await page.getByRole("link", { name: "Custom POI", exact: true }).click();
  await page.waitForLoadState("networkidle");

  // 3. Maximize Table Grid
  await tryAction(async () => {
    const maxBtn = page.getByRole("button", { name: "Maximize" }).last();
    await maxBtn.waitFor({ state: "visible", timeout: 2000 });
    await maxBtn.click({ force: true });
    await page.waitForTimeout(1000);
  }, "Maximize Table Grid");

  // 4. Checkbox Toggle Check (เลือก/ยกเลิก แถวแรก)
  await tryAction(async () => {
    const firstCheckbox = page.locator("table tbody .app-control-dt-indicator").first();
    await safeClick(firstCheckbox, "Toggle Row Checkbox");
    await page.waitForTimeout(500);
    await safeClick(firstCheckbox, "Un-toggle Row Checkbox");
    await page.waitForTimeout(500);
  }, "Toggle Checkbox Row");
// ==========================================================================
  // PHASE 1: FILTER TESTS (ทำ FILTER ทั้งหมดก่อน)
  // ==========================================================================

  // 1. Filter Name: Contains 'test' -> Clear
  await tryAction(async () => {
    await page.getByRole("columnheader", { name: "Filter Name" }).getByLabel("Filter").click({ force: true });
    const valueInput = page.getByRole("textbox", { name: "Value" }).first();
    await valueInput.click();
    await valueInput.fill("test");
    await page.getByRole("button", { name: "Filter" }).click();
    await page.waitForLoadState("networkidle").catch(() => {});
    await page.waitForTimeout(500);

    await page.getByRole("columnheader", { name: "Filter Name" }).getByLabel("Filter").click({ force: true });
    await page.getByRole("button", { name: "Clear" }).click();
    await page.waitForLoadState("networkidle").catch(() => {});
    await page.waitForTimeout(500);
  }, "Filter Name: Contains test");

  // 2. Filter Code: Contains 'test' -> Clear
  await tryAction(async () => {
    await page.getByRole("columnheader", { name: "Filter Code" }).getByLabel("Filter").click({ force: true });
    const valueInput = page.getByRole("textbox", { name: "Value" }).first();
    await valueInput.click();
    await valueInput.fill("test");
    await page.getByRole("button", { name: "Filter" }).click();
    await page.waitForLoadState("networkidle").catch(() => {});
    await page.waitForTimeout(500);

    await page.getByRole("columnheader", { name: "Filter Code" }).getByLabel("Filter").click({ force: true });
    await page.getByRole("button", { name: "Clear" }).click();
    await page.waitForLoadState("networkidle").catch(() => {});
    await page.waitForTimeout(500);
  }, "Filter Code: Contains test");

  // 3. Filter Name: Is equal to 'test' -> Clear
  await tryAction(async () => {
    await page.getByRole("columnheader", { name: "Filter Name" }).getByLabel("Filter").click({ force: true });
    await page.getByText("Contains").first().click();
    await page.getByRole("option", { name: "Is equal to" }).click();
    const valueInput = page.getByRole("textbox", { name: "Value" }).first();
    await valueInput.click();
    await valueInput.fill("test");
    await page.getByRole("button", { name: "Filter" }).click();
    await page.waitForLoadState("networkidle").catch(() => {});
    await page.waitForTimeout(500);

    await page.getByRole("columnheader", { name: "Filter Name" }).getByLabel("Filter").click({ force: true });
    await page.getByRole("button", { name: "Clear" }).click();
    await page.waitForLoadState("networkidle").catch(() => {});
    await page.waitForTimeout(500);
  }, "Filter Name: Is equal to test");

  // 4. Filter Code: Is equal to 'test' -> Clear
  await tryAction(async () => {
    await page.getByRole("columnheader", { name: "Filter Code" }).getByLabel("Filter").click({ force: true });
    await page.getByText("Contains").nth(3).click();
    await page.getByRole("option", { name: "Is equal to" }).click();
    const valueInput = page.getByRole("textbox", { name: "Value" }).first();
    await valueInput.click();
    await valueInput.fill("test");
    await page.getByRole("button", { name: "Filter" }).click();
    await page.waitForLoadState("networkidle").catch(() => {});
    await page.waitForTimeout(500);

    await page.getByRole("columnheader", { name: "Filter Code" }).getByLabel("Filter").click({ force: true });
    await page.getByRole("button", { name: "Clear" }).click();
    await page.waitForLoadState("networkidle").catch(() => {});
    await page.waitForTimeout(500);
  }, "Filter Code: Is equal to test");

  // ==========================================================================
  // PHASE 1: SORT TESTS (บังคับรอ 3 วินาทีทุกการคลิก)
  // ==========================================================================

  // 1.1 คอลัมน์ Filter Name & Filter Code (ที่มีคำว่า Filter นำหน้า)
  const filterHeaderColumns = ["Filter Name", "Filter Code"];
  for (const colName of filterHeaderColumns) {
    await tryAction(async () => {
      const header = page.getByRole("columnheader", { name: new RegExp(colName, "i") }).first();

      await header.click({ force: true });
      await page.waitForLoadState("networkidle").catch(() => {});
      await page.waitForTimeout(500);

      await header.click({ force: true });
      await page.waitForLoadState("networkidle").catch(() => {});
      await page.waitForTimeout(500);
    }, `Sort column: ${colName}`);
  }

  // 1.2 คอลัมน์อื่นๆ ที่เหลือ (เรียงตามชุดที่เคยกดผ่าน)
  const standardColumns = [
    "Radius(m)/Size(km2)",
    "Access Type",
    "Latitude",
    "Longitude",
    "Subdistrict/Town",
    "District/City",
    "Province/State",
    "Country",
  ];

  for (const colName of standardColumns) {
    await tryAction(async () => {
      const header = page
        .getByRole("columnheader", { name: new RegExp(colName.replace(/[()]/g, "\\$&"), "i") })
        .first();

      await header.click({ force: true });
      await page.waitForLoadState("networkidle").catch(() => {});
      await page.waitForTimeout(500);

      await header.click({ force: true });
      await page.waitForLoadState("networkidle").catch(() => {});
      await page.waitForTimeout(500);
    }, `Sort column: ${colName}`);
  }

  // ==========================================================================
  // PHASE 2: PAGINATION TESTS (บังคับรอ 3 วินาทีทุกการคลิก)
  // ==========================================================================
  const clickPageLink = async (
    linkName: string,
    actionName: string,
    isLastEllipsis: boolean = false
  ) => {
    if (page.isClosed()) return;

    await tryAction(async () => {
      // กรณีเป็น ... ตัวหลัง ให้ดึง .last() เพื่อให้กดขยับย้อนกลับถูกต้อง
      const pageLink = page.getByRole("link", { name: linkName });
      const targetLink = isLastEllipsis ? pageLink.last() : pageLink.first();

      if (await targetLink.isVisible().catch(() => false)) {
        await targetLink.scrollIntoViewIfNeeded().catch(() => {});
        await targetLink.click({ force: true });

        // บังคับหยุดรอ 3 วินาทีทันทีภายใน action หลังกดปุ่มเสร็จ
        await page.waitForLoadState("networkidle").catch(() => {});
        await page.waitForTimeout(3000);
      }
    }, `Pagination: ${actionName}`);
  };

  // กำหนดลำดับปุ่มพร้อมระบุ Flag สำหรับ ... ตัวหลัง
  const paginationSteps = [
    { name: "...", action: "Ellipsis Page (Next Batch)", isLast: false },
    { name: "Go to the next page", action: "Next Page", isLast: false },
    { name: "Go to the last page", action: "Last Page", isLast: false },
    { name: "...", action: "Ellipsis Page (Prev Batch)", isLast: true }, // กด ... ฝั่งซ้าย/หลัง
    { name: "Go to the previous page", action: "Previous Page", isLast: false },
    { name: "Go to the first page", action: "First Page", isLast: false },
  ];

  // วนลูปทำงานทีละขั้นตอน
  for (const step of paginationSteps) {
    await clickPageLink(step.name, step.action, step.isLast);
  }

  await page.pause();
});