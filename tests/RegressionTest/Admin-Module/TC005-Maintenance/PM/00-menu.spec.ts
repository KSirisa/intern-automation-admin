import { expect, test } from "@playwright/test";
import { safeClick, tryAction } from "../../../../helpers";


test("Maintenance - PM Checklist Result Actions & Grid Controls RegressionTest", async ({ page }) => {

  await page.goto("/admin#/maintenance");

  await safeClick(
    page.getByRole("link", { name: "PM Checklist Result", exact: true }),
    "PM Checklist Result Link"
  );
  await page.waitForTimeout(500);


  // --------------------------------------------------------------------------
  // SECTION 1: TOOLBAR ACTIONS (REFRESH & EXPORTS)
  // --------------------------------------------------------------------------

  // Refresh Grid
  await tryAction(async () => {
    await page.getByTitle("Refresh").click({ force: true });
    await page.waitForTimeout(1000);
  }, "Click Refresh Button");


  // Export Summary Report
  await tryAction(async () => {
    await page.getByTitle("Export", { exact: true }).click({ force: true });

    const downloadPromise = page.waitForEvent("download");
    await page.getByText("Yes", { exact: true }).click({ force: true });
    await downloadPromise;

    await page.waitForTimeout(700);
  }, "Export Summary Data");


  // Export Detail Report
  await tryAction(async () => {
    await page.getByTitle("Export Detail").click({ force: true });

    const downloadPromise = page.waitForEvent("download");
    await page.getByText("Yes", { exact: true }).click({ force: true });
    await downloadPromise;

    await page.waitForTimeout(700);
  }, "Export Detail Data");


  // --------------------------------------------------------------------------
  // SECTION 2: STATUS FILTER CHECKBOXES
  // --------------------------------------------------------------------------

  // Checkbox: Pass Toggle
  await tryAction(async () => {
    const cbPass = page.locator("gisc-ui-checkbox").nth(1);
    await cbPass.click({ force: true });
    await page.waitForTimeout(300);
    await cbPass.click({ force: true });
  }, "Toggle Pass Checkbox");


  // Checkbox: Failed Toggle
  await tryAction(async () => {
    const cbFailed = page.locator("gisc-ui-checkbox").nth(2);
    await cbFailed.click({ force: true });
    await page.waitForTimeout(300);
    await cbFailed.click({ force: true });
  }, "Toggle Failed Checkbox");


  // Checkbox: Waiting Approve Toggle
  await tryAction(async () => {
    const cbWaitingApprove = page.locator("gisc-ui-checkbox").nth(3);
    await cbWaitingApprove.click({ force: true });
    await page.waitForTimeout(300);
    await cbWaitingApprove.click({ force: true });
  }, "Toggle Waiting Approve Checkbox");


  // Checkbox: Approved Toggle
  await tryAction(async () => {
    const cbApproved = page.locator("gisc-ui-checkbox").nth(4);
    await cbApproved.click({ force: true });
    await page.waitForTimeout(300);
    await cbApproved.click({ force: true });
  }, "Toggle Approved Checkbox");


  // Checkbox: Not Approved Toggle
  await tryAction(async () => {
    const cbNotApproved = page.locator("gisc-ui-checkbox").nth(5);
    await cbNotApproved.click({ force: true });
    await page.waitForTimeout(300);
    await cbNotApproved.click({ force: true });
  }, "Toggle Not Approved Checkbox");


  // Checkbox: Not Submit Toggle
  await tryAction(async () => {
    await page.locator(".app-control-indicator").first().click({ force: true });
  }, "Toggle Not Submit Checkbox");


  // --------------------------------------------------------------------------
  // SECTION 3: GRID PAGINATION & PAGE SIZE
  // --------------------------------------------------------------------------

  // Change Page Size Options
  await tryAction(async () => {
    const pageSizeSelect = page.getByLabel("select");

    await pageSizeSelect.click({ force: true });
    await page.getByRole("option", { name: "50" }).click({ force: true });
    await page.waitForTimeout(300);

    await pageSizeSelect.click({ force: true });
    await page.getByRole("option", { name: "100" }).click({ force: true });
    await page.waitForTimeout(300);

    await pageSizeSelect.click({ force: true });
    await page.getByRole("option", { name: "10", exact: true }).click({ force: true });
    await page.waitForTimeout(300);

  }, "Change Page Size Options");


  // ---------------- Pagination ----------------
  const clickPageLink = async (linkName: string, actionName: string) => {
    if (page.isClosed()) return;
    await tryAction(async () => {
      const pageLink = page.getByRole("link", { name: linkName }).first();
      if (await pageLink.isVisible().catch(() => false)) {
        await pageLink.click({ force: true });
      }
    }, `Pagination: ${actionName}`);
    
    if (!page.isClosed()) {
      await page.waitForTimeout(500);
    }
  };

  await clickPageLink("...", "Ellipsis Page"); await page.waitForTimeout(700);
  await clickPageLink("Go to the next page", "Next Page"); await page.waitForTimeout(700);
  await clickPageLink("Go to the last page", "Last Page"); await page.waitForTimeout(700);
  await clickPageLink("...", "Ellipsis Page"); await page.waitForTimeout(700);
  await clickPageLink("Go to the previous page", "Previous Page"); await page.waitForTimeout(700);
  await clickPageLink("Go to the first page", "First Page"); await page.waitForTimeout(700);


// --------------------------------------------------------------------------
  // SECTION 4: GRID COLUMN SORTING
  // --------------------------------------------------------------------------

  // ระบุ Container ตารางหลักของหน้า PM Checklist Result
  const gridTable = page.locator(".app-grid, .dg-container, table").first();

  const clickSort = async (columnName: string) => {
    const cleanName = columnName.trim();
    await tryAction(async () => {
      // ค้นหาหัวคอลัมน์ในตาราง
      const colHeader = gridTable
        .locator("th")
        .filter({ hasText: cleanName })
        .or(gridTable.getByRole("columnheader", { name: cleanName }))
        .or(gridTable.getByRole("link", { name: cleanName }))
        .first();

      await colHeader.waitFor({ state: "attached", timeout: 3000 });
      
      // เลื่อน Scrollbar ให้หัวคอลัมน์มาแสดงบนหน้าจอจริง
      await colHeader.scrollIntoViewIfNeeded({ timeout: 2000 }).catch(() => {});
      
      await colHeader.click({ force: true });
      await page.waitForTimeout(500); // Delay รอให้ตารางโหลดจัดเรียงข้อมูล
    }, `Sort Column "${cleanName}"`, 3, 1000);
  };

  // Sorting Steps (คลิก Ascending / Descending ตามลำดับ)
  await clickSort("License");
  await clickSort("License");

  await clickSort("Check By");
  await clickSort("Check By");

  await clickSort("Check Date");
  await clickSort("Check Date");

  await clickSort("Event");
  await clickSort("Event");

  await clickSort("Configuration");
  await clickSort("Configuration");

  await clickSort("Result");
  await clickSort("Result");

  await clickSort("Movement");
  await clickSort("Movement");

  await clickSort("Approve Status");
  await clickSort("Approve Status");

  await clickSort("Approved Date");
  await clickSort("Approved Date");

  await clickSort("Approved By");
  await clickSort("Approved By");

  await clickSort("Shipment");
  await clickSort("Shipment");


  // --------------------------------------------------------------------------
  // SECTION 5: GRID ROW VIEW & SIDE MENU NAVIGATION
  // --------------------------------------------------------------------------

  // View Row Detail
  await tryAction(async () => {
    await page.locator(".dg-body-center").first().click({ force: true });
    await page.waitForTimeout(700);
  }, "Click First Row in Grid");


  // Navigate to Reports Menu
  await safeClick(
    page.getByText("ic_mt_report Reports"),
    "Reports Side Menu Link"
  );


});