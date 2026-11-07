import { test, expect } from "@playwright/test";

export interface DefaultValueTestData {
  stopTimeMinutes?: string;
  pickupTimeMinutes?: string;
  deliveryTimeMinutes?: string;
  pickupAndDeliveryTimeMinutes?: string;
  minimumParkTimeMinutes?: string;
  maximumParkTimeMinutes?: string;
  maxSpeedKmHr?: string;
  radiusMeter?: string;
  shipmentStart?: string;
  shipmentClose?: string;
  pickupWaypointTime?: string;
  waitingTime?: string;
  sla?: string;
  manualMidnightOfPlan?: string;
  durationMinute?: string;
  shipmentEndTimeWaypoint?: string;
  notificationOption?: string;
  requiredFieldMinute?: string;
  startDcServiceTime?: string;
  endDcServiceTime?: string;
  latestStartTime?: string;
  favoriteName?: string;
}

export const defaultValueTestData: DefaultValueTestData = {
  stopTimeMinutes: "20",
  pickupTimeMinutes: "30",
  deliveryTimeMinutes: "40",
  pickupAndDeliveryTimeMinutes: "50",
  minimumParkTimeMinutes: "60",
  maximumParkTimeMinutes: "90",
  maxSpeedKmHr: "90",
  radiusMeter: "200",
  shipmentStart: "Arrival",
  shipmentClose: "Depart",
  pickupWaypointTime: "20",
  waitingTime: "30",
  sla: "45",
  manualMidnightOfPlan: "After Plan End",
  durationMinute: "10",
  shipmentEndTimeWaypoint: "Waypoint Arrival",
  notificationOption: "Before Job Start",
  requiredFieldMinute: "10",
  startDcServiceTime: "60",
  endDcServiceTime: "70",
  latestStartTime: "40",
  favoriteName: "Favorite From Default Value",
};

test("Configuration - Default Value PostTest", async ({ page }) => {
  const data = defaultValueTestData;

  //---------- เข้าหน้า FMS เมนู Shipment Management ----------
  await page.goto("/#/shipment");

  //---------- คลิกแถบ Configuration ----------
  await page.getByRole("link", { name: "Configuration", exact: true }).click();
  await page.waitForTimeout(500);

  //---------- คลิกแถบ Default Value ----------
  await page.getByRole("link", { name: "Default Value", exact: true }).click();
  await page.waitForTimeout(500);

  //---------- กรอกข้อมูล Form Default Value ----------
  if (data.stopTimeMinutes) {
    await page.getByRole("textbox", { name: "Stop Time (Minutes)" }).fill(data.stopTimeMinutes);
  }

  if (data.pickupTimeMinutes) {
    await page.getByRole("textbox", { name: "Pick up Time (Minutes)" }).fill(data.pickupTimeMinutes);
  }

  if (data.deliveryTimeMinutes) {
    await page.getByRole("textbox", { name: "Delivery Time (Minutes)", exact: true }).fill(data.deliveryTimeMinutes);
  }

  if (data.pickupAndDeliveryTimeMinutes) {
    await page.getByRole("textbox", { name: "Pick Up & Delivery Time (" }).fill(data.pickupAndDeliveryTimeMinutes);
  }

  if (data.minimumParkTimeMinutes) {
    await page.getByRole("textbox", { name: "Minimum Park Time (Minutes)" }).fill(data.minimumParkTimeMinutes);
  }

  if (data.maximumParkTimeMinutes) {
    await page.getByRole("textbox", { name: "Maximum Park Time (Minutes)" }).fill(data.maximumParkTimeMinutes);
  }

  if (data.maxSpeedKmHr) {
    await page.getByRole("textbox", { name: "Max Speed (km/hr)" }).fill(data.maxSpeedKmHr);
  }

  if (data.radiusMeter) {
    await page.getByRole("textbox", { name: "Radius (m)" }).fill(data.radiusMeter);
  }

  if (data.shipmentStart) {
    await page.locator("#ddshipmentStart").selectOption({ label: data.shipmentStart });
  }

  if (data.shipmentClose) {
    await page.locator("#ddShipmentClose").selectOption({ label: data.shipmentClose });
  }

  if (data.pickupWaypointTime) {
    await page.locator("#txtPickupWaypointTime").fill(data.pickupWaypointTime);
  }

  if (data.waitingTime) {
    await page.locator("#txtWaitingTime").fill(data.waitingTime);
  }

  if (data.sla) {
    await page.locator("#txtSLA").fill(data.sla);
  }

  if (data.manualMidnightOfPlan) {
    await page
      .locator("gisc-ui-dropdown")
      .filter({ hasText: "Manual Midnight of Plan" })
      .getByRole("combobox")
      .selectOption({ label: data.manualMidnightOfPlan });
  }

  if (data.durationMinute) {
    await page.getByRole("textbox", { name: "Duration (Minute)" }).fill(data.durationMinute);
  }

  if (data.shipmentEndTimeWaypoint) {
    await page
      .locator("gisc-ui-dropdown")
      .filter({ hasText: "Shipment End Time Waypoint" })
      .getByRole("combobox")
      .selectOption({ label: data.shipmentEndTimeWaypoint });
  }

  if (data.notificationOption) {
    await page.locator("#ddNotification").selectOption({ label: data.notificationOption });
  }

  if (data.requiredFieldMinute) {
    await page.getByRole("textbox", { name: "Required field" }).fill(data.requiredFieldMinute);
  }

  if (data.startDcServiceTime) {
    await page.locator("#txtStartDCServiceTime").fill(data.startDcServiceTime);
  }

  if (data.endDcServiceTime) {
    await page.locator("#txtEndDCServiceTime").fill(data.endDcServiceTime);
  }

  if (data.latestStartTime) {
    await page.locator("#txtLatestStartTime").fill(data.latestStartTime);
  }

  //---------- Toggle Checkbox ----------
  await page.locator("label").filter({ hasText: "Start shipment at the first" }).click();
  await page.locator("label").filter({ hasText: "Start shipment at the first" }).click();

  //---------- Favorite Management ----------
  if (data.favoriteName) {
    await page.getByTitle("Add Favorite").click();
    await page.getByRole("textbox", { name: "Favorite Name" }).fill(data.favoriteName);
    await page.getByRole("button", { name: "OK" }).click();
    await page.getByTitle("Remove Favorite").click();
  }

  //---------- Cancel ----------
  await page.getByRole("button", { name: "Cancel" }).click();

});