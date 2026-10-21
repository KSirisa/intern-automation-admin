import { test } from "@playwright/test";
import { safeClick, tryAction } from "../../../../helpers";

// Config & Test Data
const searchData = {
  maintenanceType: " ",
  maintenanceSubTypeIndex: 0,
  appointmentStatus: "Active",
  businessUnitSearch: "__TEST",
  businessUnitNode: "___TEST",
  vehicle: "มม01-1234",
  assignTo: "Me",
  endDateDay: "28",
};

test("maintenance test", async ({ page }) => {
  await page.goto("/admin#/maintenance");

  // Navigation
  await safeClick(
    page.getByRole("link", { name: "Appointments Management", exact: true }),
    "Appointments Management Link",
  );
  await page.waitForTimeout(500);

  // 1. Open Search Modal
  await safeClick(page.getByTitle("Search"), "Search Button");
  await page.waitForTimeout(500); // รอให้ Modal Render เสร็จ

  // 2. Maintenance Type (เลือกผ่าน Native Select หรือ Select2)
  await tryAction(async () => {
    const typeSelect = page
      .locator(
        "select[id*='MaintenanceType'], select[name*='MaintenanceType'], gisc-ui-dropdown[params*='MaintenanceType'] select",
      )
      .or(page.getByLabel("Maintenance Type"))
      .first();

    if (await typeSelect.isVisible().catch(() => false)) {
      await typeSelect.selectOption({ label: searchData.maintenanceType });
      await typeSelect.dispatchEvent("change");
    } else {
      // Fallback: กรณีเป็น Select2 Trigger
      const trigger = page
        .locator(".select2-selection, .app-dropdown-container")
        .first();
      await trigger.click({ force: true });
      await page
        .getByRole("option", { name: searchData.maintenanceType })
        .first()
        .click({ force: true });
    }
  }, "Select Maintenance Type");

  // 3. Maintenance Sub Type
  await tryAction(async () => {
    const subTypeSelect = page
      .locator(
        "select[id*='MaintenanceSubType'], select[name*='MaintenanceSubType']",
      )
      .or(page.getByLabel("Maintenance Sub Type"))
      .first();

    await subTypeSelect.waitFor({ state: "attached", timeout: 3000 });
    await subTypeSelect.selectOption({
      index: searchData.maintenanceSubTypeIndex,
    });
    await subTypeSelect.dispatchEvent("change");
  }, "Select Maintenance Sub Type");

  // 4. Appointment Status
  await tryAction(async () => {
    const statusSelect = page
      .locator(
        "select[id*='AppointmentStatus'], select[name*='AppointmentStatus']",
      )
      .or(page.getByLabel("Appointment Status"))
      .first();

    if (await statusSelect.isVisible().catch(() => false)) {
      await statusSelect.selectOption({ label: searchData.appointmentStatus });
      await statusSelect.dispatchEvent("change");
    } else {
      await page
        .getByLabel("Appointment Status")
        .selectOption(searchData.appointmentStatus);
    }
  }, "Select Appointment Status");

  // 5. Business Unit Dropdown Tree
  await tryAction(async () => {
    await page.locator("#ddBusinessUnit").click({ force: true });
    const searchBox = page.getByRole("textbox", { name: "Search" });
    await searchBox.waitFor({ state: "visible", timeout: 3000 });
    await searchBox.fill(searchData.businessUnitSearch);
    await page
      .getByRole("treeitem", { name: searchData.businessUnitNode })
      .click({ force: true });
    await page.locator(".app-allow-icon").first().click({ force: true });
  }, "Select Business Unit");

    // 6. Assign To
  await tryAction(async () => {
    const assignToInput = page
      .getByPlaceholder(/Assign To/i)
      .or(page.locator('input[name*="AssignTo"], input[id*="AssignTo"]'))
      .or(
        page.locator(
          "label:has-text('Assign To') + input, label:has-text('Assign To') ~ div input",
        ),
      )
      .first();

    await assignToInput.waitFor({ state: "visible", timeout: 3000 });
    await assignToInput.fill(searchData.assignTo);
  }, "Fill Assign To");


    // 7. End Date Calendar
  await tryAction(async () => {
    const endDateInput = page.getByRole("textbox", { name: "End Date" });
    await endDateInput.click({ force: true });
    await page
      .getByRole("link", { name: searchData.endDateDay })
      .first()
      .click({ force: true });
  }, "Select End Date");

  // 8. Submit Search
  await safeClick(
    page.locator("button").filter({ hasText: "Search" }),
    "Submit Search Button",
  );


  // ดักรอการโหลดข้อมูลของตาราง
  await page.waitForLoadState("networkidle").catch(() => {});
  await page.waitForTimeout(1200);

  // 10. Select First Target Row in Grid
  await tryAction(async () => {
    // ดึง Cell แรกของตารางมาคลิกเลือก
    const firstCell = page
      .locator('td[role="gridcell"]')
      .filter({ hasText: searchData.vehicle })
      .or(
        page
          .locator('td[role="gridcell"]')
          .filter({ hasText: searchData.assignTo }),
      )
      .or(page.locator("table tbody tr:visible td").first())
      .first();

    await firstCell.waitFor({ state: "visible", timeout: 5000 });
    await firstCell.click({ force: true });
  }, "Select First Result Row");


  // 10. Click Verify Button & Confirm 'Yes'
  await safeClick(page.getByTitle("Verify").first(), "Verify Button");

  await safeClick(
    page.locator("button, a, span").filter({ hasText: /^Yes$/i }).first(),
    "Confirm Verify (Yes)"
  );


  await page.pause();
});
