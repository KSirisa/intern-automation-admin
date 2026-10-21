import { test } from "@playwright/test";
import { safeClick, tryAction } from "../../../../helpers";

test("maintenance test - Vehicle Checklist Result", async ({ page }) => {
  test.setTimeout(180000);

  await page.goto("/admin#/maintenance");

  // Navigation
  await safeClick(
    page.getByRole("link", { name: "Vehicle Checklist Result", exact: true }),
    "Vehicle Checklist Result Link",
  );
  await page.waitForTimeout(500);

  // ---------------- 1. Checkboxes ----------------
  const checkboxSelectors = [
    ".checkBox > .component-container > .app-checkBox-contain > .app-checkBox-control > .app-control-indicator",
    "div:nth-child(2) > div > .checkBox > .component-container > .app-checkBox-contain > .app-checkBox-control > .app-control-indicator",
    "div:nth-child(3) > div > .checkBox > .component-container > .app-checkBox-contain > .app-checkBox-control > .app-control-indicator",
    "div:nth-child(2) > div > div > .checkBox > .component-container > .app-checkBox-contain > .app-checkBox-control > .app-control-indicator",
    "div:nth-child(2) > div:nth-child(2) > div > .checkBox > .component-container > .app-checkBox-contain > .app-checkBox-control > .app-control-indicator",
    "div:nth-child(2) > div:nth-child(3) > div > .checkBox > .component-container > .app-checkBox-contain > .app-checkBox-control > .app-control-indicator",
    ".checkBox > .component-container > .app-checkBox-contain > .app-checkBox-control > .app-control-indicator",
  ];

  for (let i = 0; i < checkboxSelectors.length; i++) {
    await safeClick(
      page.locator(checkboxSelectors[i]).first(),
      `Toggle Checkbox #${i + 1}`,
    );
  }

  // ---------------- 2. Column Sorting (เลื่อนหน้าจอตามคอลัมน์) ----------------
  const gridTable = page.locator("#dgVehicleChecklistResult");

  const clickSort = async (columnName: string) => {
    const cleanName = columnName.trim();
    await tryAction(
      async () => {
        // ค้นหาหัวคอลัมน์ในตาราง
        const colHeader = gridTable
          .locator("th")
          .filter({ hasText: cleanName })
          .or(gridTable.getByRole("columnheader", { name: cleanName }))
          .or(gridTable.getByRole("link", { name: cleanName }))
          .first();

        await colHeader.waitFor({ state: "attached", timeout: 3000 });

        // เลื่อน Scrollbar ให้หัวคอลัมน์มาแสดงบนหน้าจอจริง
        await colHeader
          .scrollIntoViewIfNeeded({ timeout: 2000 })
          .catch(() => {});

        await colHeader.click({ force: true });
        await page.waitForTimeout(700); // Delay รอให้ตารางโหลดจัดเรียงข้อมูล
      },
      `Sort Column "${cleanName}"`,
      3,
      1000,
    );
  };

  // Sorting Steps
  await clickSort("License");
  await clickSort("License");

  await clickSort("Reference No.");
  await clickSort("Reference No.");

  await clickSort("Business Unit");
  await clickSort("Business Unit");

  await clickSort("Driver");
  await clickSort("Driver");

  await clickSort("Check Date");
  await clickSort("Check Date");

  await clickSort("Event");
  await clickSort("Event");

  await clickSort("Configuration");
  await clickSort("Configuration");

  await clickSort("Result");
  await clickSort("Result");

  await clickSort("Risk Level");
  await clickSort("Risk Level");

  await clickSort("Approval Status");
  await clickSort("Approval Status");

  await clickSort("Approval Duration");
  await clickSort("Approval Duration");

  await clickSort("Next Approval By");
  await clickSort("Next Approval By");

  await clickSort("Shipment");
  await clickSort("Shipment");

  await clickSort("Mileage");
  await clickSort("Mileage");

  await clickSort("Movement");
  await clickSort("Movement");

  // ---------------- 3. Refresh ----------------
  await safeClick(page.getByTitle("Refresh"), "Refresh Button");

  // ---------------- 4. Export Summary ----------------
  await tryAction(async () => {
    await page.getByTitle("Export", { exact: true }).click({ force: true });
    const downloadPromise = page.waitForEvent("download", { timeout: 10000 });
    await page.getByText("Yes").click({ force: true });
    await downloadPromise;
  }, "Export Summary Report");

  // ---------------- 5. Export Detail ----------------
  await tryAction(async () => {
    await page.getByTitle("Export Detail").click({ force: true });
    const downloadPromise = page.waitForEvent("download", { timeout: 10000 });
    await page.getByText("Yes").click({ force: true });
    await downloadPromise;
  }, "Export Detail Report");

  // 6. Change Items Per Page
  const pageSizes = ["10", "50", "100"];
  for (const size of pageSizes) {
    await tryAction(async () => {
      const dropdownTrigger = page
        .locator(".k-pager-sizes .k-icon, .k-dropdown-wrap")
        .first();
      await dropdownTrigger.click({ force: true });
      await page
        .getByRole("option", { name: size, exact: true })
        .click({ force: true });
      await page.waitForLoadState("networkidle").catch(() => {});
      await page.waitForTimeout(1500);
    }, `Change Page Size to ${size}`);
  }

  // ---------------- 7. Pagination ----------------
  const clickPageLink = async (
    linkName: string,
    actionName: string,
    isLastEllipsis: boolean = false,
  ) => {
    if (page.isClosed()) return;

    await tryAction(async () => {
      // กรณีเป็น ... ตัวหลัง ให้ดึง .last() เพื่อให้กดขยับย้อนกลับถูกต้อง
      let pageLink = page.getByRole("link", { name: linkName });
      const targetLink = isLastEllipsis ? pageLink.last() : pageLink.first();

      if (await targetLink.isVisible().catch(() => false)) {
        await targetLink.scrollIntoViewIfNeeded().catch(() => {});
        await targetLink.click({ force: true });
      }
    }, `Pagination: ${actionName}`);

    if (!page.isClosed()) {
      // 1. รอ API โหลดข้อมูลเสร็จ
      await page.waitForLoadState("networkidle").catch(() => {});

      // 2. หน่วงเวลา (Delay) เพื่อรอให้ Kendo UI Grid Render ตารางใหม่บน DOM เรียบร้อย
      await page.waitForTimeout(1000);
    }
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
    await page.waitForTimeout(3000);

  }
  await page.pause();
});
