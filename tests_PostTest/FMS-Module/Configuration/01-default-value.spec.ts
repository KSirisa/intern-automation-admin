import { test, expect } from "@playwright/test";

test("default value test", async ({ page }) => {
  //---------- เข้าหน้า FMS เมนู Shipment Management ----------
  await page.goto("/#/shipment");

  //---------- คลิกแถบ Configuration ----------
  await page.getByRole("link", { name: "Configuration", exact: true }).click();
  await page.waitForTimeout(500);

  //---------- คลิกแถบ Default Value ----------
  await page.getByRole("link", { name: "Default Value", exact: true }).click();
  await page.waitForTimeout(500);

  await page.getByRole("textbox", { name: "Stop Time (Minutes)" }).fill("20");

  await page
    .getByRole("textbox", { name: "Pick up Time (Minutes)" })
    .fill("30");

  await page
    .getByRole("textbox", { name: "Delivery Time (Minutes)", exact: true })
    .fill("40");

  await page
    .getByRole("textbox", { name: "Pick Up & Delivery Time (" })
    .fill("50");

  await page
    .getByRole("textbox", { name: "Minimum Park Time (Minutes)" })
    .fill("60");

  await page
    .getByRole("textbox", { name: "Maximum Park Time (Minutes)" })
    .fill("90");

  await page.getByRole("textbox", { name: "Max Speed (km/hr)" }).fill("90");

  await page.getByRole("textbox", { name: "Radius (m)" }).fill("200");

  await page.locator("#ddshipmentStart").selectOption({ label: "Arrival" });

  await page.locator("#ddShipmentClose").selectOption({ label: "Depart" });

  await page.locator("#txtPickupWaypointTime").fill("20");

  await page.locator("#txtWaitingTime").fill("30");

  await page.locator("#txtSLA").fill("45");

  await page
    .locator("gisc-ui-dropdown")
    .filter({ hasText: "Manual Midnight of Plan" })
    .getByRole("combobox")
    .selectOption({ label: "After Plan End" });

  await page.getByRole("textbox", { name: "Duration (Minute)" }).fill("10");

  await page
    .locator("gisc-ui-dropdown")
    .filter({ hasText: "Shipment End Time Waypoint" })
    .getByRole("combobox")
    .selectOption({ label: "Waypoint Arrival" });

  await page
    .locator("#ddNotification")
    .selectOption({ label: "Before Job Start" });

  await page.getByRole("textbox", { name: "Required field" }).fill("10");

  await page.locator("#txtStartDCServiceTime").fill("60");

  await page.locator("#txtEndDCServiceTime").fill("70");

  await page.locator("#txtLatestStartTime").fill("40");

  await page
    .locator("label")
    .filter({ hasText: "Start shipment at the first" })
    .click();
  await page
    .locator("label")
    .filter({ hasText: "Start shipment at the first" })
    .click();

  await page.getByTitle("Add Favorite").click();
  await page
    .getByRole("textbox", { name: "Favorite Name" })
    .fill("Favorite From Default Value");

  await page.getByRole("button", { name: "OK" }).click();
  await page.getByTitle("Remove Favorite").click();

  // await page.getByRole('button', { name: 'Save' }).click();

  await page.pause();
});
