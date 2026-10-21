import { test } from "@playwright/test";
import {
  safeClick,
  fillByLabel,
  selectByLabel,
  tryAction,
} from "../../../../helpers";

test("maintenance test", async ({ page }) => {

  await page.goto("/admin#/maintenance");

  await page.getByRole("link", { name: "Dashboard", exact: true }).click();

  await page.waitForTimeout(500);

  // ------------------------------------ Maintenance Plan ------------------------------------
  await safeClick(
    page.getByText("ic_mt_maintenancesplans Maintenance Plan"),
    "Maintenance Plan Menu"
  );
  await page.waitForTimeout(1500);
  await safeClick(
    page.getByRole("button", { name: "Close" }).last(),
    "Close Maintenance Plan Modal"
  );

  // ------------------------------------ Appointments ------------------------------------
  await safeClick(
    page.getByTitle("Appointments", { exact: true }),
    "Appointments Menu"
  );
  await page.waitForTimeout(1500);
  await safeClick(
    page.getByRole("button", { name: "Close" }).last(),
    "Close Appointments Modal"
  );

  // ------------------------------------ Maintenance Type ------------------------------------
  await safeClick(
    page.getByText("ic_mt_maintenancestypes Maintenance Type"),
    "Maintenance Type Menu"
  );
  await page.waitForTimeout(1500);
  await safeClick(
    page.getByRole("button", { name: "Close" }).last(),
    "Close Maintenance Type Modal"
  );

  // ------------------------------------ Reports : Appointment ------------------------------------
  await safeClick(
    page.getByText("ic_mt_report Reports"),
    "Reports Menu"
  );

  await selectByLabel(page, "ddReportType", "Appointment");

  // ------------------------------------ Dropdown : Business Unit ------------------------------------
  await tryAction(async () => {
    await page.locator("#ddlBusinessUnit").click({ force: true });
    const searchBox = page.getByRole("textbox", { name: "Search" });
    await searchBox.click({ force: true });
    await searchBox.fill("___TEST");
    await page
      .getByRole("treeitem", { name: "___TEST" })
      .click({ force: true });
    await page.locator(".app-allow-icon").first().click({ force: true });
  }, 'Select Business Unit "___TEST"');

  // ------------------------------------ Checkbox : Include Sub Business Units ------------------------------------
  await safeClick(
    page
      .locator("label")
      .filter({ hasText: "Include Sub Business Units" }),
    "Include Sub Business Units Checkbox"
  );

  // ------------------------------------ Dropdown : Vehicle ------------------------------------
  await tryAction(async () => {
    const vehicleDropdown = page.locator(".app-dropdown-container", {
      has: page.locator("#ddVehicle"),
    });
    await vehicleDropdown
      .locator(".select2-selection__arrow")
      .click({ force: true });

    const searchBox = page.getByRole("searchbox");
    await searchBox.waitFor({ state: "visible", timeout: 2000 });
    await searchBox.fill("มม01-1234");
    await page
      .getByRole("option", { name: "มม01-1234", exact: true })
      .click({ force: true });
  }, 'Select Vehicle "มม01-1234"');

  // ------------------------------------ Dropdown : Maintenance Type ------------------------------------
  await selectByLabel(page, "ddMaintenanceType", "ตรวจสอบสภาพรถ");

  // ------------------------------------ Dropdown : Appointment Status ------------------------------------
  await selectByLabel(page, "ddAppointmentStatus", "Verified");

  // ------------------------------------ Calendar : From / To ------------------------------------
  await tryAction(async () => {
    await page.locator(".app-icon-calender.from").click({ force: true });
    await page
      .getByRole("link", { name: "1", exact: true })
      .click({ force: true });
  }, "Select Calendar From");

  await tryAction(async () => {
    await page.locator(".app-icon-calender.to").click({ force: true });
    await page
      .getByRole("link", { name: "28", exact: true })
      .click({ force: true });
  }, "Select Calendar To");

  // ------------------------------------ Time Input : Start / End Time ------------------------------------
  await tryAction(async () => {
    const timeInputs = page.locator('input[type="time"]');
    await timeInputs.nth(0).fill("08:00");
    await timeInputs.nth(1).fill("17:00");
  }, "Fill Time Inputs");

  // ------------------------------------ Textbox : Distance ------------------------------------
  await fillByLabel(page, "Distance Form (km)", "0");
  await fillByLabel(page, "Distance To (km)", "0");

  // ------------------------------------ Button : Preview & Close ------------------------------------
  await safeClick(
    page.getByRole("button", { name: "Preview" }),
    "Preview Button"
  );
  await page.waitForTimeout(5000);
  await safeClick(
    page.getByRole("button", { name: "Close" }).last(),
    "Close Preview Button"
  );

  // ------------------------------------ Tab : Report Filter ------------------------------------
  await safeClick(
    page.getByText("Report Filter Report Type"),
    "Report Filter Tab"
  );

  // ------------------------------------ Reports : Maintenance Plan ------------------------------------
  await selectByLabel(page, "ddReportType", "Maintenance Plan");

  // ------------------------------------ Dropdown : Maintenance Status ------------------------------------
  await selectByLabel(page, "ddMaintenanceStatus", "Pending");

  // ------------------------------------ Button : Preview & Close ------------------------------------
  await safeClick(
    page.getByRole("button", { name: "Preview" }),
    "Preview Button (Maintenance Plan)"
  );
  await page.waitForTimeout(5000);
  await safeClick(
    page.getByRole("button", { name: "Close" }).last(),
    "Close Preview Button"
  );

  // ------------------------------------ Tab : Report Filter & Close ------------------------------------
  await safeClick(
    page.getByText("Report Filter Report Type"),
    "Report Filter Tab"
  );
  await safeClick(
    page.getByRole("button", { name: "Close" }).last(),
    "Close Filter Modal"
  );

  // ------------------------------------ Tab : Dashboard ------------------------------------
  await tryAction(async () => {
    await page
      .locator("section")
      .filter({
        hasText:
          "Dashboard ic_mt_maintenancesplans Maintenance Plan Appointments",
      })
      .click({ force: true });
  }, "Click Dashboard Tab");

  // ------------------------------------ Refresh ------------------------------------
  await safeClick(page.getByTitle("Refresh"), "Refresh Button");
  await page.waitForTimeout(5000);

  // ------------------------------------ Notification Settings ------------------------------------
  await safeClick(
    page.getByTitle("Notification Settings"),
    "Notification Settings Button"
  );

  // ------------------------------------ Checkboxes : Maintenance Status ------------------------------------
  const notificationStatuses = [
    "Pendings",
    "Overdue",
    "Almost Due Date",
    "Inprogress",
    "Ready",
    "Complete",
    "Cancel",
  ];

  for (const status of notificationStatuses) {
    await safeClick(
      page.locator("label.app-checkBox-control").filter({ hasText: status }),
      `Checkbox "${status}"`
    );
  }

  await safeClick(
    page.getByRole("button", { name: "Save" }),
    "Save Notification Settings"
  );

  await page.pause();
});