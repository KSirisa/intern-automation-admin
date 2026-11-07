import { test, expect } from "@playwright/test";
import { safeClick } from "../../../../helpers";

test("Configurations - Alert Menu PostTest", async ({ page }) => {
  await page.goto("/admin#/configuration");

  await safeClick(
    page.getByRole("link", { name: "Alerts", exact: true }),
    'Menu Link "Alerts"'
  );

  await page.waitForTimeout(500);

  // =========================================================================
  // 1. TEST COLUMN SORTING (ดับเบิ้ลคลิกเพื่อทดสอบ Ascending / Descending)
  // =========================================================================

  // Sort: Alert Type
  const alertTypeHeader = page.getByRole("columnheader", { name: /Alert Type/i });
  await safeClick(alertTypeHeader, 'Sort Column "Alert Type" (Asc)');
  await safeClick(alertTypeHeader, 'Sort Column "Alert Type" (Desc)');

  // Sort: Description
  const descriptionHeader = page.getByRole("columnheader", { name: /Description/i });
  await safeClick(descriptionHeader, 'Sort Column "Description" (Asc)');
  await safeClick(descriptionHeader, 'Sort Column "Description" (Desc)');

  // Sort: Website
  const websiteHeader = page.getByRole("columnheader", { name: /Website/i });
  await safeClick(websiteHeader, 'Sort Column "Website" (Asc)');
  await safeClick(websiteHeader, 'Sort Column "Website" (Desc)');

  // Sort: Email
  const emailHeader = page.getByRole("columnheader", { name: /Email/i });
  await safeClick(emailHeader, 'Sort Column "Email" (Asc)');
  await safeClick(emailHeader, 'Sort Column "Email" (Desc)');

  // Sort: SMS
  const smsHeader = page.getByRole("columnheader", { name: /SMS/i });
  await safeClick(smsHeader, 'Sort Column "SMS" (Asc)');
  await safeClick(smsHeader, 'Sort Column "SMS" (Desc)');

  // Sort: Ticket
  const ticketHeader = page.getByRole("columnheader", { name: /Ticket/i });
  await safeClick(ticketHeader, 'Sort Column "Ticket" (Asc)');
  await safeClick(ticketHeader, 'Sort Column "Ticket" (Desc)');

  // Sort: MDVR
  const mdvrHeader = page.getByRole("columnheader", { name: /MDVR/i });
  await safeClick(mdvrHeader, 'Sort Column "MDVR" (Asc)');
  await safeClick(mdvrHeader, 'Sort Column "MDVR" (Desc)');

  // Sort: Report
  const reportHeader = page.getByRole("columnheader", { name: /Report/i });
  await safeClick(reportHeader, 'Sort Column "Report" (Asc)');
  await safeClick(reportHeader, 'Sort Column "Report" (Desc)');

  // Sort: Line
  const lineHeader = page.getByRole("columnheader", { name: /Line/i });
  await safeClick(lineHeader, 'Sort Column "Line" (Asc)');
  await safeClick(lineHeader, 'Sort Column "Line" (Desc)');

  // Sort: Mobile
  const mobileHeader = page.getByRole("columnheader", { name: /Mobile/i });
  await safeClick(mobileHeader, 'Sort Column "Mobile" (Asc)');
  await safeClick(mobileHeader, 'Sort Column "Mobile" (Desc)');

  // Sort: Priority
  const priorityHeader = page.getByRole("columnheader", { name: /Priority/i });
  await safeClick(priorityHeader, 'Sort Column "Priority" (Asc)');
  await safeClick(priorityHeader, 'Sort Column "Priority" (Desc)');

  // Sort: Enable
  const enableHeader = page.getByRole("columnheader", { name: /Enable/i });
  await safeClick(enableHeader, 'Sort Column "Enable" (Asc)');
  await safeClick(enableHeader, 'Sort Column "Enable" (Desc)');

  // =========================================================================
  // 2. TEST PAGE SIZE DROPDOWN
  // =========================================================================

  const pageSizeDropdown = page.locator(".dt-page-size");

  // Select 50
  await safeClick(pageSizeDropdown, 'Dropdown "Page Size"');
  await page.getByRole("combobox").selectOption("50");

  // Select 100
  await safeClick(pageSizeDropdown, 'Dropdown "Page Size"');
  await page.getByRole("combobox").selectOption("100");

  // Select All
  await safeClick(pageSizeDropdown, 'Dropdown "Page Size"');
  await page.getByRole("combobox").selectOption("All");

  // Select 20
  await safeClick(pageSizeDropdown, 'Dropdown "Page Size"');
  await page.getByRole("combobox").selectOption("20");

});