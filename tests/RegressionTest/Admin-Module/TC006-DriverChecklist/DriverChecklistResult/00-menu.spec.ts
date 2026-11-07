import { test, expect } from "@playwright/test";
import { tryAction } from "../../../../helpers";

test("Driver Checklist - Menu RegressionTest", async ({ page }) => {
  await page.goto("/admin#/driver-checklist");
  await page.waitForLoadState("networkidle");

  await page
    .getByRole("link", { name: "Driver Checklist Result", exact: true })
    .click();
  await page.waitForLoadState("networkidle");

  // ------------------------------------ Refresh & Load ------------------------------------
  await page.getByTitle("Refresh").click();
  await page.waitForLoadState("networkidle");

  const count = await page.locator("#checkbox0").count();
  console.log("checkbox0 count:", count);

  // ------------------------------------ Button : Export ------------------------------------
  await tryAction(async () => {
    const downloadPromise = page.waitForEvent("download");
    await page.getByTitle("Export", { exact: true }).click();
    await page.getByText("Yes").click();
    const download = await downloadPromise;
    console.log(`Exported file: ${download.suggestedFilename()}`);
  }, "Export Main Report");

  // ------------------------------------ Button : Export Detail ------------------------------------
  await tryAction(async () => {
    const downloadDetailPromise = page.waitForEvent("download");
    await page.getByTitle("Export Detail").click();
    await page.getByText("Yes").click();
    const downloadDetail = await downloadDetailPromise;
    console.log(`Exported detail file: ${downloadDetail.suggestedFilename()}`);
  }, "Export Detail Report");

  // --------------------------------------------------------------------------
  // SECTION: QUICK STATUS FILTER CHECKBOX TOGGLES
  // --------------------------------------------------------------------------
  const checkboxes = page.locator("gisc-ui-checkbox");

  // Checkbox 3 (Wait For Approve / Approved Status)
  await tryAction(async () => {
    const cb3 = checkboxes.nth(3);
    await cb3.click({ force: true });
    await cb3.click({ force: true });
  }, "Toggle Checkbox Index 3");

  // Checkbox 2 (Approved / Failed Status)
  await tryAction(async () => {
    const cb2 = checkboxes.nth(2);
    await cb2.click({ force: true });
    await cb2.click({ force: true });
  }, "Toggle Checkbox Index 2");

  // Checkbox 1 (Pass / Pending Status)
  await tryAction(async () => {
    const cb1 = checkboxes.nth(1);
    await cb1.click({ force: true });
    await cb1.click({ force: true });
  }, "Toggle Checkbox Index 1");

  // Checkbox First (Not Submit / Check All)
  await tryAction(async () => {
    const cbFirst = checkboxes.first();
    await cbFirst.click({ force: true });
  }, "Toggle First Checkbox");

  // Checkbox 1 (Toggle อีกรอบ)
  // await tryAction(async () => {
  //   const cb1 = checkboxes.nth(1);
  //   await cb1.click({ force: true });
  // }, "Toggle Checkbox Index 1 Second Time");

  // ------------------------------------ Sort Columns ------------------------------------
  const columns = [
    "Employee ID",
    "Driver",
    "Checked Date",
    "Event",
    "Configuration",
    "Driver Status",
    "Risk Level",
    "Approval Status",
    "Shipment",
  ];

  for (const colName of columns) {
    await tryAction(async () => {
      // คลิกจัดเรียงครั้งที่ 1 (Ascending)
      const colHeader = page
        .getByRole("columnheader", { name: new RegExp(colName, "i") })
        .first();
      await colHeader.click();

      // คลิกจัดเรียงครั้งที่ 2 (Descending)
      await colHeader.click();
    }, `Sort column: ${colName}`);
  }

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
      // รอให้เครือข่ายโหลดข้อมูลตารางเสร็จ หาก Network ไม่นิ่งค่อย Fallback ไปรอ Timeout
      await page.waitForLoadState("networkidle").catch(() => {});
      await page.waitForTimeout(300);
    }
  };

  // กำหนด ลำดับปุ่มที่ต้องการกดทดสอบเรียงตาม Sequence
  const paginationSteps = [
    { name: "...", action: "Ellipsis Page (Next Batch)" },
    { name: "Go to the next page", action: "Next Page" },
    { name: "Go to the last page", action: "Last Page" },
    { name: "...", action: "Ellipsis Page (Prev Batch)" },
    { name: "Go to the previous page", action: "Previous Page" },
    { name: "Go to the first page", action: "First Page" },
  ];

  // วนลูปทำงานทีละขั้นตอน
  for (const step of paginationSteps) {
    await clickPageLink(step.name, step.action);
  }

});
