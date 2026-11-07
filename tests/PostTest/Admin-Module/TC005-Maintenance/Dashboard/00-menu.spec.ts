import { test } from "@playwright/test";
import {
  safeClick,
  fillByLabel,
  selectByLabel,
  tryAction,
} from "../../../../helpers";

export interface MaintenanceDashboardTestData {
  businessUnit?: string;
  vehicleName?: string;
  maintenanceType?: string;
  appointmentStatus?: string;
  calendarFromDay?: string;
  calendarToDay?: string;
  startTime?: string;
  endTime?: string;
  distanceFrom?: string;
  distanceTo?: string;
  maintenanceStatus?: string;
  notificationStatuses?: string[];
}

export const maintenanceDashboardTestData: MaintenanceDashboardTestData = {
  businessUnit: "___TEST",
  vehicleName: "มม01-1234",
  maintenanceType: "ตรวจสอบสภาพรถ",
  appointmentStatus: "Verified",
  calendarFromDay: "1",
  calendarToDay: "28",
  startTime: "08:00",
  endTime: "17:00",
  distanceFrom: "0",
  distanceTo: "0",
  maintenanceStatus: "Pending",
  notificationStatuses: [
    "Pendings",
    "Overdue",
    "Almost Due Date",
    "Inprogress",
    "Ready",
    "Complete",
    "Cancel",
  ],
};

test("Maintenance - Dashboard PostTest", async ({ page }) => {
  const data = maintenanceDashboardTestData;

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
  if (data.businessUnit) {
    await tryAction(async () => {
      await page.locator("#ddlBusinessUnit").click({ force: true });
      const searchBox = page.getByRole("textbox", { name: "Search" });
      await searchBox.click({ force: true });
      await searchBox.fill(data.businessUnit!);
      await page
        .getByRole("treeitem", { name: data.businessUnit })
        .click({ force: true });
      await page.locator(".app-allow-icon").first().click({ force: true });
    }, `Select Business Unit "${data.businessUnit}"`);
  }

  // ------------------------------------ Checkbox : Include Sub Business Units ------------------------------------
  await safeClick(
    page
      .locator("label")
      .filter({ hasText: "Include Sub Business Units" }),
    "Include Sub Business Units Checkbox"
  );

  // ------------------------------------ Dropdown : Vehicle ------------------------------------
  if (data.vehicleName) {
    await tryAction(async () => {
      const vehicleDropdown = page.locator(".app-dropdown-container", {
        has: page.locator("#ddVehicle"),
      });
      await vehicleDropdown
        .locator(".select2-selection__arrow")
        .click({ force: true });

      const searchBox = page.getByRole("searchbox");
      await searchBox.waitFor({ state: "visible", timeout: 2000 });
      await searchBox.fill(data.vehicleName!);
      await page
        .getByRole("option", { name: data.vehicleName, exact: true })
        .click({ force: true });
    }, `Select Vehicle "${data.vehicleName}"`);
  }

  // ------------------------------------ Dropdown : Maintenance Type ------------------------------------
  if (data.maintenanceType) {
    await selectByLabel(page, "ddMaintenanceType", data.maintenanceType);
  }

  // ------------------------------------ Dropdown : Appointment Status ------------------------------------
  if (data.appointmentStatus) {
    await selectByLabel(page, "ddAppointmentStatus", data.appointmentStatus);
  }

  // ------------------------------------ Calendar : From / To ------------------------------------
  if (data.calendarFromDay) {
    await tryAction(async () => {
      await page.locator(".app-icon-calender.from").click({ force: true });
      await page
        .getByRole("link", { name: data.calendarFromDay, exact: true })
        .click({ force: true });
    }, "Select Calendar From");
  }

  if (data.calendarToDay) {
    await tryAction(async () => {
      await page.locator(".app-icon-calender.to").click({ force: true });
      await page
        .getByRole("link", { name: data.calendarToDay, exact: true })
        .click({ force: true });
    }, "Select Calendar To");
  }

  // ------------------------------------ Time Input : Start / End Time ------------------------------------
  if (data.startTime || data.endTime) {
    await tryAction(async () => {
      const timeInputs = page.locator('input[type="time"]');
      if (data.startTime) await timeInputs.nth(0).fill(data.startTime);
      if (data.endTime) await timeInputs.nth(1).fill(data.endTime);
    }, "Fill Time Inputs");
  }

  // ------------------------------------ Textbox : Distance ------------------------------------
  if (data.distanceFrom) {
    await fillByLabel(page, "Distance Form (km)", data.distanceFrom);
  }
  if (data.distanceTo) {
    await fillByLabel(page, "Distance To (km)", data.distanceTo);
  }

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
  if (data.maintenanceStatus) {
    await selectByLabel(page, "ddMaintenanceStatus", data.maintenanceStatus);
  }

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
  if (data.notificationStatuses?.length) {
    for (const status of data.notificationStatuses) {
      await safeClick(
        page.locator("label.app-checkBox-control").filter({ hasText: status }),
        `Checkbox "${status}"`
      );
    }
  }

  await safeClick(
    page.getByRole("button", { name: "Cancel" }),
    "Cancel Notification Settings"
  );
});