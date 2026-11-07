import { test, expect, Page } from "@playwright/test";
import { safeClick } from "../../../../helpers";

test("Configurations - Create Alert RegressionTest", async ({ page }) => {
  //  1. Master Data สำหรับรอบการทดสอบนี้
  const alertType = "Abnormal";
  const description = "Automate";

  await page.goto("/admin#/configuration");

  await safeClick(
    page.getByRole("link", { name: "Alerts", exact: true }),
    'Menu Link "Alerts"'
  );
  await page.waitForTimeout(500);
  await safeClick(
    page.getByTitle("Create", { exact: true }),
    'Button "Create Alert"'
  );

  // เลือก Type
  await selectFromDropdown(page, "ddType", alertType);

  // กรอกฟิลด์เฉพาะ Type
  const specificHandler = typeSpecificHandlers[alertType];
  if (specificHandler) {
    await specificHandler(page);
  }

  // กรอกฟิลด์ร่วมทั่วไป
  await fillCommonBasicFields(page);
  await fillAlertViaSection(page);
  
  await fillDescriptionAndPermissions(page, {
    description: description,
    usersToSelect: ["Arm Trainee (Trainee03)", "Krittayoch Sirisa (EID000036)"],
    groupId: "132",
  });

  // Settings ต่างๆ
  await fillAreaSetting(page);
  await fillDateTimeSetting(page);
  await fillAssets(page);

  // บันทึก
  await safeClick(
    page.getByRole("button", { name: "Save" }),
    'Button "Save Alert Configuration"'
  );
  await page.waitForTimeout(2500);

  //  2. Search & Delete
  const searchDescription = `${description} ${alertType}`; // ได้เป็น "Automate Abnormal"

  await page.getByPlaceholder("Filter by Description").fill(searchDescription);
  await page.waitForTimeout(500);

  await safeClick(
    page.getByRole("gridcell", { name: description }),
    `Select Grid Cell "${description}"`
  );

  await safeClick(
    page.getByTitle("Delete"),
    'Button "Delete Alert"'
  );
  await safeClick(
    page.locator("div[data-bind=\"click:click.bind($data,'yes')\"]"),
    'Confirm Dialog "Yes"'
  );
  await page.waitForTimeout(2500);

});

// =========================================================================
//  HELPER FUNCTIONS
// =========================================================================

async function selectFromDropdown(
  page: Page,
  dropdownId: string,
  optionText: string,
  verify: boolean = true
) {
  const dropdownArrow = page.locator(
    `span[aria-labelledby="select2-${dropdownId}-container"] .select2-selection__arrow`
  );
  await safeClick(dropdownArrow, `Dropdown Arrow (${dropdownId})`);

  // scope searchbox Specific เพื่อไม่ให้ตีกับ Popup หรือ Dropdown อื่น
  const searchInput = page.locator(
    `input[aria-controls="select2-${dropdownId}-results"]`
  );
  await searchInput.fill(optionText);

  await safeClick(
    page.getByRole("option", { name: optionText, exact: true }),
    `Select Option "${optionText}"`
  );

  if (verify) {
    await expect(page.locator(`#select2-${dropdownId}-container`)).toHaveText(
      optionText
    );
  }
}

// =========================================================================
//  COMMON SECTIONS (ฟิลด์ร่วมที่ใช้ในหลาย Alert Type)
// =========================================================================

/**
 * กรอกข้อมูลส่วน Basic Configuration ทั่วไป
 */
async function fillCommonBasicFields(
  page: Page,
  data = {
    alertCategory: "My Business",
    priority: "111",
    enableStatus: "Yes",
    email: "someone@example.com",
  }
) {
  const shipmentOnlyLabel = page
    .locator("label")
    .filter({ hasText: "Alert when work under shipment only." });
  if (await shipmentOnlyLabel.isVisible().catch(() => false)) {
    await safeClick(shipmentOnlyLabel, 'Checkbox "Alert when work under shipment only"');
  }

  const alertCategoryDropdown = page.locator(
    `span[aria-labelledby="select2-ddAlertCategory-container"]`
  );
  if (await alertCategoryDropdown.isVisible().catch(() => false)) {
    await selectFromDropdown(page, "ddAlertCategory", data.alertCategory);
  }

  await page.getByRole("textbox", { name: /^\s*Priority\s*$/i }).fill(data.priority);
  await page
    .getByLabel("Enable", { exact: true })
    .selectOption({ label: data.enableStatus })
    .catch(() => {});
  await page.locator("#txMailTo").fill(data.email);

  await safeClick(
    page.locator("label").filter({ hasText: "Auto Generate Ticket" }),
    'Checkbox "Auto Generate Ticket"'
  );
  await safeClick(page.locator("label").filter({ hasText: "MDVR" }), 'Checkbox "MDVR"');
  await safeClick(
    page.locator("label").filter({ hasText: "Remove Default Driver" }),
    'Checkbox "Remove Default Driver"'
  );
  await safeClick(
    page.locator("label").filter({ hasText: "Use Driver's Business Unit" }),
    'Checkbox "Use Driver\'s Business Unit"'
  );
}

/**
 * กรอกข้อมูลช่องทางแจ้งเตือน Alert Via (Website, Device, Line ฯลฯ)
 */
async function fillAlertViaSection(
  page: Page,
  data = {
    notificationSound: "Mute",
    boxTemplate: "GIS_ERM_Starlink_MCR_eFuel_RFID_Belt_Siren",
    outputDevice: "Siren",
    commandTemplate: "SirenOff",
    lineAlertName: "LineAlert1",
  }
) {
  // Website
  const websiteLabel = page.locator("label").filter({ hasText: "Website" }).first();
  await safeClick(websiteLabel, 'Checkbox "Website"');
  await page
    .locator("#ddNotificationSound")
    .selectOption({ label: data.notificationSound })
    .catch(() => {});
  await safeClick(page.locator("#btn__playsound_press"), 'Button "Play Sound Test"');
  await safeClick(websiteLabel, 'Uncheck "Website"');

  // Toggle Channels
  const channels = ["Email", "SMS", "Interface", "Report", "Mobile"];
  for (const channel of channels) {
    const channelLabel = page.locator("label").filter({ hasText: channel });
    await safeClick(channelLabel, `Toggle Channel "${channel}" On`);
    await safeClick(channelLabel, `Toggle Channel "${channel}" Off`);
  }

  // Device
  const deviceLabel = page.locator("label").filter({ hasText: /^\s*Device\s*$/i });
  await safeClick(deviceLabel, 'Checkbox "Device"');
  await page.waitForTimeout(500);
  await selectFromDropdown(page, "ddBoxTemplate", data.boxTemplate);
  await page.waitForTimeout(500);
  await selectFromDropdown(page, "ddOutput", data.outputDevice);
  await page.waitForTimeout(500);
  await selectFromDropdown(page, "ddCommandTemplate", data.commandTemplate);
  await safeClick(deviceLabel, 'Uncheck "Device"');

  // Line
  const lineLabel = page.locator("label").filter({ hasText: "Line" });
  await safeClick(lineLabel, 'Checkbox "Line"');
  await safeClick(
    page.getByRole("link", { name: "Line", exact: true }),
    'Tab "Line Setup"'
  );
  await safeClick(
    page
      .locator("tr", { hasText: data.lineAlertName })
      .locator(".app-control-dt-indicator"),
    `Select Line Alert Group "${data.lineAlertName}"`
  );
  await safeClick(
    page.getByRole("button", { name: "OK" }),
    'Button "OK Modal Line"'
  );
  await page.waitForTimeout(500);
  await safeClick(lineLabel, 'Uncheck "Line"');
}

/**
 * กรอก Description และกำหนด Permissions ให้ User / Group
 */
async function fillDescriptionAndPermissions(
  page: Page,
  data = {
    description: "Automate",
    usersToSelect: ["Arm Trainee (Trainee03)", "Krittayoch Sirisa (EID000036)"],
    groupId: "132",
  }
) {
  await page
    .getByRole("textbox", { name: /^\s*Description\s*$/i })
    .fill(data.description);

  await safeClick(
    page.getByRole("link", { name: "Permissions" }),
    'Tab "Permissions"'
  );
  await page.waitForTimeout(500);

  // 1. เปิด Modal Add Users
  await safeClick(
    page.locator('a[data-bind="click: addUsers"]'),
    'Button "Add Users"'
  );
  await page.waitForTimeout(2000);

  // 2. Loop เลือก User จาก Array
  for (const userName of data.usersToSelect) {
    const userRowIndicator = page
      .locator("tr", { hasText: userName })
      .locator(".app-control-dt-indicator");

    if (await userRowIndicator.isVisible().catch(() => false)) {
      await safeClick(userRowIndicator, `Select User "${userName}"`);
    }
  }

  // 3. กดยืนยัน OK Modal Add Users
  await safeClick(
    page.getByRole("button", { name: "OK" }).last(),
    'Button "OK Add Users Modal"'
  );
  await page.waitForTimeout(500);

  // 4. Add Group Modal
  await safeClick(
    page.locator('a[data-bind="click: addGroups"]'),
    'Button "Add Groups"'
  );
  await page.waitForTimeout(2000);
  await safeClick(
    page.locator(`#dttGroupShared tr[id="${data.groupId}"] .app-control-dt-indicator`),
    `Select Group ID "${data.groupId}"`
  );
  await safeClick(
    page.getByRole("button", { name: "OK" }).last(),
    'Button "OK Add Groups Modal"'
  );
  await page.waitForTimeout(500);

  // Confirm Main Permission Dialog
  await safeClick(
    page.getByRole("button", { name: "OK" }),
    'Button "OK Confirm Permissions"'
  );
}

/**
 * กรอกการตั้งค่าพื้นที่ Area Setting
 */
async function fillAreaSetting(
  page: Page,
  data = {
    customArea: "8RUN",
    customAreaType: "Dangerous Area",
    customAreaCategory: "TestDC",
  }
) {
  const areaSettingLink = page.getByRole("link", { name: "Area Setting" });
  if (await areaSettingLink.isVisible().catch(() => false)) {
    await safeClick(areaSettingLink, 'Tab "Area Setting"');
    await selectFromDropdown(page, "ddCustomAreas", data.customArea);
    await selectFromDropdown(page, "ddCustomAreaTypes", data.customAreaType);
    await selectFromDropdown(page, "ddCustomAreaCategoies", data.customAreaCategory);
    await safeClick(
      page.getByRole("button", { name: "Save" }).nth(1),
      'Button "Save Area Setting"'
    );
    await page.waitForTimeout(500);
  }
}

/**
 * กรอกการตั้งค่าช่วงเวลา Date / Time Setting
 */
async function fillDateTimeSetting(
  page: Page,
  data = { startTime: "08:00", endTime: "17:00" }
) {
  const dateSettingLink = page.getByRole("link", { name: "Date / Time Setting" });
  if (await dateSettingLink.isVisible().catch(() => false)) {
    await safeClick(dateSettingLink, 'Tab "Date / Time Setting"');

    const days = [
      "All", "Monday", "Tuesday", "Wednesday", "Thursday",
      "Friday", "Saturday", "Sunday", "All"
    ];
    for (const day of days) {
      await safeClick(
        page.locator("label").filter({ hasText: new RegExp(`^\\s*${day}\\s*$`, "i") }),
        `Checkbox Day "${day}"`
      );
    }

    const timeInputs = page.locator('input[type="time"]');
    await timeInputs.nth(0).fill(data.startTime);
    await timeInputs.nth(1).fill(data.endTime);

    await safeClick(
      page.getByRole("button", { name: "Save" }).nth(1),
      'Button "Save Date/Time Setting"'
    );
    await page.waitForTimeout(500);
  }
}

/**
 * ผูก Assets / Business Unit
 */
async function fillAssets(
  page: Page,
  data = { businessUnit: "_ePOD Test Distance" }
) {
  const assetSettingLink = page.getByRole("link", { name: /Assets.*Required field/i });
  if (await assetSettingLink.isVisible().catch(() => false)) {
    await safeClick(assetSettingLink, 'Tab "Assets"');
    await safeClick(page.getByTitle("Find Assets"), 'Button "Find Assets"');
    await safeClick(page.locator("#ddBusinessUnit"), 'Dropdown "Business Unit Tree"');
    await safeClick(
      page.getByRole("treeitem", { name: data.businessUnit }),
      `Select Tree Item "${data.businessUnit}"`
    );
    await safeClick(
      page.getByRole("button", { name: "OK" }),
      'Button "OK Assets Search"'
    );
    await page.waitForTimeout(500);

    await safeClick(
      page
        .locator(".checkbox > .app-checkBox-contain-dt > .app-checkBox-control-dt > .app-control-dt-indicator")
        .first(),
      'Select First Asset Checkbox'
    );
    await safeClick(
      page.getByRole("button", { name: "Apply" }),
      'Button "Apply Assets"'
    );
    await page.waitForTimeout(500);
  }
}

// =========================================================================
//  TYPE-SPECIFIC HANDLERS
// =========================================================================

/**  Type: ไม่ต้องกรอกฟิลด์พิเศษเพิ่มเติม */
async function fillNoExtraFieldsSpecific(page: Page) {}

/**  Type: Acceleration | ฟิลด์: Level, Minimum Duration */
async function fillAccelerationSpecific(
  page: Page,
  mLevel: string = "Normal Only",
  minDurationSec: string = "3"
) {
  await selectFromDropdown(page, "ddMlevel", mLevel);
  await page
    .getByRole("textbox", { name: /Minimum Duration\s*\(second\)/i })
    .fill(minDurationSec);
}

/**  Helper ร่วมสำหรับ Type ที่ใช้ Duration (seconds) และ Distance (meter) */
async function fillDurationDistanceFields(
  page: Page,
  durationSec: string = "5",
  distanceMeter: string = "50"
) {
  await page.getByRole("textbox", { name: /Duration\s*\(seconds\)/i }).fill(durationSec);
  await page.getByRole("textbox", { name: /Distance\s*\(meter\)/i }).fill(distanceMeter);
}

/**  Type: Area In/ Out (Asset) | ฟิลด์: Area, Working Period */
async function fillAreaInOutSpecific(
  page: Page,
  data = {
    customArea: "8RUN",
    customAreaType: "Dangerous Area",
    customAreaCategory: "TestDC",
    drivingType: "In",
    fromHour: "1",
    toHour: "23",
  }
) {
  await safeClick(
    page.locator("label").filter({ hasText: "Alert when work under working" }),
    'Checkbox "Alert when work under working"'
  );
  await page.waitForTimeout(500);
  await selectFromDropdown(page, "ddCustomArea", data.customArea);
  await selectFromDropdown(page, "ddCustomAreaType", data.customAreaType);
  await selectFromDropdown(page, "ddCustomAreaCategory", data.customAreaCategory);

  await page.locator("#ddDrivingType").selectOption({ label: data.drivingType }).catch(() => {});

  // Working Period From
  await safeClick(
    page.getByRole("textbox", { name: /Working Period From/i }),
    'Input "Working Period From"'
  );
  await page.locator(".ui-timepicker-select").first().selectOption(data.fromHour).catch(() => {});
  await page.locator(".ui_tpicker_minute_slider > .ui-timepicker-select").selectOption("1").catch(() => {});
  await safeClick(
    page.getByRole("button", { name: "Save" }),
    'Button "Save Timepicker From"'
  );

  // Working Period To
  await safeClick(
    page.getByRole("textbox", { name: /Working Period To/i }),
    'Input "Working Period To"'
  );
  await page.locator(".ui-timepicker-select").first().selectOption(data.toHour).catch(() => {});
  await page.locator(".ui_tpicker_minute_slider > .ui-timepicker-select").selectOption("59").catch(() => {});
  await safeClick(
    page.getByRole("button", { name: "Save" }),
    'Button "Save Timepicker To"'
  );
}

/**  Type: Area Parking | ฟิลด์: Area, Stop Type */
async function fillAreaParkingSpecific(
  page: Page,
  data = {
    customArea: "8RUN",
    customAreaType: "Dangerous Area",
    customAreaCategory: "TestDC",
    stopType: "In",
  }
) {
  await page.waitForTimeout(500);
  await selectFromDropdown(page, "ddCustomArea", data.customArea);
  await selectFromDropdown(page, "ddCustomAreaType", data.customAreaType);
  await selectFromDropdown(page, "ddCustomAreaCategory", data.customAreaCategory);
  await page.getByLabel("Stop Type").selectOption({ label: data.stopType }).catch(() => {});
}

/**  Helper ร่วมสำหรับ Type ที่ใช้แค่ Minimum Duration (seconds) */
async function fillMinimumDurationField(page: Page, seconds: string = "3") {
  await page
    .getByRole("textbox", { name: /Minimum Duration\s*\(second\)/i })
    .fill(seconds);
}

/**  Type: Custom | ฟิลด์: Speed Limit, Custom Message, Features List */
async function fillCustomSpecific(
  page: Page,
  data = { speedLimit: "40", customMessage: "40 km/hr" }
) {
  await page.getByRole("textbox", { name: /Speed Limit\s*\(km\/hr\)/i }).fill(data.speedLimit);
  await page.getByRole("textbox", { name: /Custom Message/i }).fill(data.customMessage);
  await safeClick(
    page.getByRole("link", { name: /Features\*/i }),
    'Tab "Features"'
  );

  // Add Feature 1: Engine
  await safeClick(
    page.locator("a").filter({ hasText: "Add" }).first(),
    'Button "Add Feature 1"'
  );
  await page.locator('select[data-target-field="featureId"]').selectOption({ label: "Engine" }).catch(() => {});
  await page.locator('select[data-target-field="matchDigitalValue"]').selectOption({ label: "On" }).catch(() => {});
  await safeClick(
    page.locator(".dt-row-remover > .gisc-ui-icon"),
    'Button "Remove Row Feature 1"'
  );

  // Add Feature 2: Fuel Level
  await safeClick(
    page.locator("a").filter({ hasText: "Add" }).nth(1),
    'Button "Add Feature 2"'
  );
  await page.locator('select[data-target-field="featureId"]').selectOption({ label: "Fuel Level" }).catch(() => {});
  await page.locator("#minAnalogValue1").fill("1");
  await page.locator("#maxAnalogValue1").fill("10");
  await page.locator(".dt-row-remover > .gisc-ui-icon").dblclick().catch(() => {});

  // Add Feature 3: Test Text
  await safeClick(
    page.locator("a").filter({ hasText: "Add" }).nth(2),
    'Button "Add Feature 3"'
  );
  await page.locator('[id="1"]').getByRole("combobox").selectOption({ label: "Test" }).catch(() => {});
  await page.locator("#matchTextValue1").fill("test");

  await safeClick(
    page.getByRole("button", { name: "OK" }),
    'Button "OK Features Modal"'
  );
}

/**  Type: Device Battery Low | ฟิลด์: Battery Limit % */
async function fillDeviceBatteryLowSpecific(page: Page, pct: string = "30") {
  await page.getByRole("textbox", { name: /Device Battery Low Limit\s*\(%\)/i }).fill(pct);
}

/**  Type: Exceed Limit Driving (Driver) | ฟิลด์: Max Minutes */
async function fillExceedLimitDrivingDriverSpecific(page: Page, minutes: string = "360") {
  await page.locator("#txIntegerMax24").fill(minutes);
}

/**  Type: Exceed Limit Driving (Vehicle) | ฟิลด์: Max Minutes, Parking Time */
async function fillExceedLimitDrivingVehicleSpecific(
  page: Page,
  minutes: string = "360",
  parkingMins: string = "60"
) {
  await page.locator("#txIntegerMax24").fill(minutes);
  await page.getByRole("textbox", { name: /Parking Time\s*\(mins\)/i }).fill(parkingMins);
}

/**  Type: Free Wheeling | ฟิลด์: Speed Range, Min RPM */
async function fillFreeWheelingSpecific(
  page: Page,
  data = { minSpeed: "40", maxSpeed: "80", minRpm: "600" }
) {
  await page.getByRole("textbox", { name: /Min Speed\s*\(km\/hr\)/i }).fill(data.minSpeed);
  await page.getByRole("textbox", { name: /Max Speed\s*\(km\/hr\)/i }).fill(data.maxSpeed);
  await page.getByRole("textbox", { name: /Min RPM/i }).fill(data.minRpm);
}

/**  Type: Fuel Increasing | ฟิลด์: Fuel Increase Limit % */
async function fillFuelIncreasingSpecific(page: Page, limitPct: string = "15") {
  await page.getByRole("textbox", { name: /Fuel Increase Limit\s*\(%\)/i }).fill(limitPct);
}

/**  Type: Gate Close / Open | ฟิลด์: Feature Unit */
async function fillGateSpecific(page: Page, unit: string = "Gate 1") {
  await selectFromDropdown(page, "ddFeatureUnit", unit);
}

/**  Type: Lane Change | ฟิลด์: Level, Minimum Duration */
async function fillLaneChangeSpecific(
  page: Page,
  level: string = "Aggressive Only",
  minDurationSec: string = "10"
) {
  await selectFromDropdown(page, "ddMlevel", level);
  await page.getByRole("textbox", { name: /Minimum Duration\s*\(second\)/i }).fill(minDurationSec);
}

/**  Type: Mobile Offline / Online | ฟิลด์: Duration (seconds) */
async function fillMobileStatusSpecific(page: Page, durationSec: string = "30") {
  await safeClick(
    page.locator("label").filter({ hasText: "Alert when work under working" }),
    'Checkbox "Alert when work under working"'
  );
  await page.getByRole("textbox", { name: /Duration\s*\(seconds\)/i }).fill(durationSec);
}

/**  Type: No SeatBelt | ฟิลด์: Max Speed */
async function fillNoSeatBeltSpecific(page: Page, maxSpeed: string = "60") {
  await page.getByRole("textbox", { name: /Max Speed\s*\(km\/hr\)/i }).fill(maxSpeed);
}

/**  Type: Out Of Green Band | ฟิลด์: Speed Range, RPM Range */
async function fillOutOfGreenBandSpecific(
  page: Page,
  data = { minSpeed: "20", maxSpeed: "80", minRpm: "1000", maxRpm: "2500" }
) {
  await page.getByRole("textbox", { name: /Min Speed\s*\(km\/hr\)/i }).fill(data.minSpeed);
  await page.getByRole("textbox", { name: /Max Speed\s*\(km\/hr\)/i }).fill(data.maxSpeed);
  await page.getByRole("textbox", { name: /Min RPM/i }).fill(data.minRpm);
  await page.getByRole("textbox", { name: /Max RPM/i }).fill(data.maxRpm);
}

/**  Type: Over Speed | ฟิลด์: Speed Limit, Delay Sec, Area */
async function fillOverSpeedSpecific(
  page: Page,
  data = {
    speedLimit: "120",
    delaySec: "3",
    customArea: "8RUN",
    customAreaType: "Dangerous Area",
  }
) {
  await page.getByRole("textbox", { name: /Speed Limit\s*\(km\/hr\)/i }).fill(data.speedLimit);
  await page.getByRole("textbox", { name: /Over Speed Delay\s*\(second\)/i }).fill(data.delaySec);

  const firstTimeLabel = page.locator("label").filter({ hasText: "Only First Time" });
  await safeClick(firstTimeLabel, 'Checkbox "Only First Time" On');
  await safeClick(firstTimeLabel, 'Checkbox "Only First Time" Off');

  await selectFromDropdown(page, "ddCustomArea", data.customArea);
  await selectFromDropdown(page, "ddCustomAreaType", data.customAreaType);
}

/**  Type: Over Temperature | ฟิลด์: Feature Unit, Max Temp, Duration */
async function fillOverTemperatureSpecific(
  page: Page,
  data = { unit: "Temperature 1", maxTemp: "36", durationSec: "10" }
) {
  await selectFromDropdown(page, "ddFeatureUnit", data.unit);
  await page.getByRole("textbox", { name: /Max Temperature\s*\(\s*°C\s*\)/i }).fill(data.maxTemp);
  await page.getByRole("textbox", { name: /Duration\s*\(seconds\)/i }).fill(data.durationSec);
}

/**  Type: Over Working-Time Moving | ฟิลด์: Time Range */
async function fillOverWorkingTimeMovingSpecific(
  page: Page,
  fromHour: string = "8",
  toHour: string = "17"
) {
  await safeClick(page.locator("#dtInputFromTime"), 'Input "From Time"');
  await page.locator(".ui-timepicker-select").first().selectOption(fromHour).catch(() => {});
  await safeClick(
    page.getByRole("button", { name: "Save" }),
    'Button "Save From Time"'
  );

  await safeClick(page.locator("#dtInputToTime"), 'Input "To Time"');
  await page.locator(".ui-timepicker-select").first().selectOption(toHour).catch(() => {});
  await safeClick(
    page.getByRole("button", { name: "Save" }),
    'Button "Save To Time"'
  );
}

/**  Type: Over RPM | ฟิลด์: Min Speed, Max RPM */
async function fillOverRPMSpecific(
  page: Page,
  minSpeed: string = "20",
  maxRpm: string = "2500"
) {
  await page.getByRole("textbox", { name: /Min Speed\s*\(km\/hr\)/i }).fill(minSpeed);
  await page.getByRole("textbox", { name: /Max RPM/i }).fill(maxRpm);
}

/**  Type: Parking | ฟิลด์: Alert Parking Type */
async function fillParkingSpecific(page: Page, parkingType: string = "Park") {
  await safeClick(
    page.locator("label").filter({ hasText: "Alert when work under working" }),
    'Checkbox "Alert when work under working"'
  );
  await page.locator("#ddAlertParkingType").selectOption({ label: parkingType }).catch(() => {});
}

/**  Type: Parking Inside POI | ฟิลด์: POI Search, Parking Type, Duration */
async function fillParkingInsidePOISpecific(
  page: Page,
  poiKeyword: string = "Auto",
  durationMins: string = "60"
) {
  await page.getByRole("searchbox", { name: /Required field/i }).fill(poiKeyword);
  await safeClick(page.locator("#ui-id-2"), 'Select POI Autocomplete Item');
  await page.locator("#ddAlertParkingType").selectOption({ label: "Park Over Time" }).catch(() => {});
  await page.getByRole("textbox", { name: /Duration\s*\(minutes\)/i }).fill(durationMins);
}

/**  Type: POI In/ Out | ฟิลด์: POI Search, Movement, Time Range */
async function fillPOIInOutSpecific(
  page: Page,
  poiKeyword: string = "Auto",
  movement: string = "In",
  fromHour: string = "8",
  toHour: string = "17"
) {
  await page.getByRole("searchbox", { name: /Required field/i }).fill(poiKeyword);
  await safeClick(page.locator("#ui-id-2"), 'Select POI Autocomplete Item');
  await page.getByLabel("Movement").selectOption({ label: movement }).catch(() => {});

  await safeClick(page.locator("#dtInputFromTime"), 'Input "From Time"');
  await page.locator(".ui-timepicker-select").first().selectOption(fromHour).catch(() => {});
  await safeClick(
    page.getByRole("button", { name: "Save" }),
    'Button "Save From Time"'
  );

  await safeClick(page.locator("#dtInputToTime"), 'Input "To Time"');
  await page.locator(".ui-timepicker-select").first().selectOption(toHour).catch(() => {});
  await safeClick(
    page.getByRole("button", { name: "Save" }),
    'Button "Save To Time"'
  );
}

/**  Type: Rapid Acceleration Driving | ฟิลด์: Limit Limit (km/h/s) */
async function fillRapidAccelerationSpecific(page: Page, limit: string = "7.2") {
  await page.getByRole("textbox", { name: /Rapid Acceleration Limit\s*\(km/i }).fill(limit);
}

/**  Type: Rapid Deceleration Driving | ฟิลด์: Limit (km/h/s) */
async function fillRapidDecelerationSpecific(page: Page, limit: string = "10") {
  await page.getByRole("textbox", { name: /Rapid Deceleration Limit\s*\(km/i }).fill(limit);
}

/**  Type: Swerve Driving | ฟิลด์: Swerve Limit (degree) */
async function fillSwerveDrivingSpecific(page: Page, degree: string = "20") {
  await page.getByRole("textbox", { name: /Swerve Limit\s*\(degree\)/i }).fill(degree);
}

/**  Type: Unauthorized Stop | ฟิลด์: Custom POI, Areas, Province Settings */
async function fillUnauthorizedStopSpecific(
  page: Page,
  data = { provinceGroup: "Automate Test", zone: "Central", parkMins: "180" }
) {
  // Allow Condition
  await safeClick(
    page.locator('a[data-bind="click: addAllow"]'),
    'Button "Add Allow Condition"'
  );
  await page.getByLabel("Condition").selectOption({ label: "Custom POI" }).catch(() => {});
  await page.getByLabel("Category Type").selectOption({ label: "Customer POI" }).catch(() => {});
  await safeClick(page.locator("#ddCategoryName"), 'Dropdown "Category Name"');
  await safeClick(
    page.getByRole("treeitem", { name: "Check All" }),
    'Select Tree Item "Check All"'
  );
  await safeClick(page.locator(".app-allow-icon"), 'Icon "Allow Transfer"');
  await safeClick(
    page.locator("label").filter({ hasText: "Unlimited" }),
    'Radio "Unlimited"'
  );
  await safeClick(
    page.locator("label").filter({ hasText: "Limited" }).first(),
    'Radio "Limited"'
  );
  await page.getByRole("textbox", { name: /Parking Not Overtime\s*\(minutes\)/i }).fill(data.parkMins);
  await safeClick(
    page.getByRole("button", { name: "Save" }).nth(1),
    'Button "Save Allow Modal"'
  );

  // Not Allow Condition
  await safeClick(
    page.locator('a[data-bind="click: addNotAllow"]'),
    'Button "Add Not Allow Condition"'
  );
  await page.getByLabel("Condition").selectOption({ label: "Custom Areas" }).catch(() => {});
  await page.getByLabel("Category Type").selectOption({ label: "DC" }).catch(() => {});
  await safeClick(page.locator("#ddCategoryName"), 'Dropdown "Category Name"');
  await safeClick(
    page.getByRole("treeitem", { name: "Check All" }),
    'Select Tree Item "Check All"'
  );
  await safeClick(page.locator(".app-allow-icon"), 'Icon "Allow Transfer"');
  await page.getByLabel("Speed Type").selectOption({ label: "Inside" }).catch(() => {});
  await safeClick(
    page.getByRole("button", { name: "Save" }).nth(1),
    'Button "Save Not Allow Modal"'
  );

  // Province Group
  await safeClick(
    page.locator('a[data-bind="click: addStopOvertimeProvince"]'),
    'Button "Add Province Overtime"'
  );
  await page.getByRole("textbox", { name: /Province Group Name/i }).fill(data.provinceGroup);
  await page.getByLabel("Zone/Region").selectOption({ label: data.zone }).catch(() => {});
  await safeClick(page.locator("#ddProvince"), 'Dropdown "Province"');
  await safeClick(
    page.getByRole("treeitem", { name: "Check All" }),
    'Select Tree Item "Check All"'
  );
  await safeClick(page.locator(".app-allow-icon"), 'Icon "Allow Transfer"');
  await page.getByRole("textbox", { name: /Stop Duration\s*\(minutes\)/i }).fill(data.parkMins);
  await safeClick(
    page.getByRole("button", { name: "Save" }).nth(1),
    'Button "Save Province Modal"'
  );
}

/**  Type: Under Temperature | ฟิลด์: Min Temp, Duration */
async function fillUnderTemperatureSpecific(
  page: Page,
  data = { unit: "Temperature 1", minTemp: "15", durationSec: "10" }
) {
  await selectFromDropdown(page, "ddFeatureUnit", data.unit);
  await page.getByRole("textbox", { name: /Min Temperature\s*\(\s*°C\s*\)/i }).fill(data.minTemp);
  await page.getByRole("textbox", { name: /Duration\s*\(seconds\)/i }).fill(data.durationSec);
}

/**  Type: Unusual Fuel Decrease | ฟิลด์: Fuel Dec Limit %, Focus Move Duration */
async function fillUnusualFuelDecreaseSpecific(
  page: Page,
  limitPct: string = "15",
  focusMins: string = "30"
) {
  await page.getByRole("textbox", { name: /Fuel Dec Limit\s*\(%\)/i }).fill(limitPct);
  await page.getByRole("textbox", { name: /Focus Move Duration\s*\(minutes\)/i }).fill(focusMins);
}

/**  Type: Vehicle Battery Low | ฟิลด์: Battery Limit % */
async function fillVehicleBatteryLowSpecific(page: Page, limitPct: string = "20") {
  await page.getByRole("textbox", { name: /Vehicle Battery Low Limit\s*\(%\)/i }).fill(limitPct);
}

/**  Helper ร่วมสำหรับ Type ตระกูล Turn และ Wide Turn/Swerve */
async function fillDirectionAndLevelSpecific(
  page: Page,
  mLevel: string,
  minDuration: string
) {
  const direction = page.getByLabel("Direction");
  await direction.selectOption({ label: "Turn Left" }).catch(() => {});
  await direction.selectOption({ label: "Turn Right" }).catch(() => {});
  await direction.selectOption({ label: "Both" }).catch(() => {});

  await selectFromDropdown(page, "ddMlevel", mLevel);
  await page.getByRole("textbox", { name: /Minimum Duration\s*\(second\)/i }).fill(minDuration);
}

// =========================================================================
// MAPPING TABLE: ALERT TYPE -> HANDLER
// =========================================================================

const typeSpecificHandlers: Record<string, (page: Page) => Promise<void>> = {
  Abnormal: fillNoExtraFieldsSpecific,
  Distraction: fillNoExtraFieldsSpecific,
  "Engine Idling": fillNoExtraFieldsSpecific,
  "Engine Off": fillNoExtraFieldsSpecific,
  "Engine On": fillNoExtraFieldsSpecific,
  "Fatigue - Drowsiness": fillNoExtraFieldsSpecific,
  "Fatigue - Micro Sleep": fillNoExtraFieldsSpecific,
  "Fatigue - Other": fillNoExtraFieldsSpecific,
  "Fatigue - Yawning": fillNoExtraFieldsSpecific,
  FCW: fillNoExtraFieldsSpecific,
  "Field of View Exception": fillNoExtraFieldsSpecific,
  "GPS Disconnected": fillNoExtraFieldsSpecific,
  "GPS Reconnected": fillNoExtraFieldsSpecific,
  HMW: fillNoExtraFieldsSpecific,
  LDW: fillNoExtraFieldsSpecific,
  Moving: fillNoExtraFieldsSpecific,
  PCW: fillNoExtraFieldsSpecific,
  Phoning: fillNoExtraFieldsSpecific,
  "Power Disconnected": fillNoExtraFieldsSpecific,
  "Power Reconnected": fillNoExtraFieldsSpecific,
  "Real Accident": fillNoExtraFieldsSpecific,
  Smoking: fillNoExtraFieldsSpecific,
  "SOS !": fillNoExtraFieldsSpecific,
  "Speed Bump": fillNoExtraFieldsSpecific,
  Tow: fillNoExtraFieldsSpecific,
  TSR: fillNoExtraFieldsSpecific,
  UFCW: fillNoExtraFieldsSpecific,

  "Anonymous Drive": (page) => fillDurationDistanceFields(page, "5", "50"),
  "Bad GPS": (page) => fillDurationDistanceFields(page, "5", "50"),
  Breaking: (page) => fillMinimumDurationField(page, "3"),
  Bypassing: (page) => fillMinimumDurationField(page, "4"),
  Roundabout: (page) => fillMinimumDurationField(page, "2"),
  "Swerve while accelerating": (page) => fillMinimumDurationField(page, "10"),
  "Swerve while decelerating": (page) => fillMinimumDurationField(page, "20"),

  Acceleration: (page) => fillAccelerationSpecific(page, "Normal Only", "3"),
  "Free Wheeling": fillFreeWheelingSpecific,
  "Lane change": (page) => fillLaneChangeSpecific(page, "Aggressive Only", "10"),
  NoSeatBelt: (page) => fillNoSeatBeltSpecific(page, "60"),
  OutOfGreenBand: fillOutOfGreenBandSpecific,
  "Over Speed": fillOverSpeedSpecific,
  OverRPM: (page) => fillOverRPMSpecific(page, "20", "2500"),
  "Rapid Acceleration Driving": (page) => fillRapidAccelerationSpecific(page, "7.2"),
  "Rapid Deceleration Driving": (page) => fillRapidDecelerationSpecific(page, "10"),
  "Swerve Driving": (page) => fillSwerveDrivingSpecific(page, "20"),
  Turn: (page) => fillDirectionAndLevelSpecific(page, "Normal Only", "5"),
  "Wide Swerve while accelerating": (page) => fillDirectionAndLevelSpecific(page, "Aggressive Only", "3"),
  "Wide Swerve while decelerating": (page) => fillDirectionAndLevelSpecific(page, "Normal And Above", "4"),
  "Wide Turn": (page) => fillDirectionAndLevelSpecific(page, "Aggressive And Above", "5"),

  "Area In/ Out (Asset)": fillAreaInOutSpecific,
  "Area Parking": fillAreaParkingSpecific,
  Parking: (page) => fillParkingSpecific(page, "Park"),
  "Parking Inside POI": (page) => fillParkingInsidePOISpecific(page, "Auto", "60"),
  "POI In/ Out": (page) => fillPOIInOutSpecific(page, "Auto", "In", "8", "17"),
  "Unauthorized Stop": fillUnauthorizedStopSpecific,

  Custom: fillCustomSpecific,
  "Device Battery Low": (page) => fillDeviceBatteryLowSpecific(page, "30"),
  "Vehicle Battery Low": (page) => fillVehicleBatteryLowSpecific(page, "20"),
  "Exceed limit driving (Driver)": (page) => fillExceedLimitDrivingDriverSpecific(page, "360"),
  "Exceed limit driving (Vehicle)": (page) => fillExceedLimitDrivingVehicleSpecific(page, "360", "60"),
  "Exceed limit driving in 24 hours": (page) => fillExceedLimitDrivingDriverSpecific(page, "360"),
  "Fuel Increasing": (page) => fillFuelIncreasingSpecific(page, "15"),
  "Unusual Fuel Decrease": (page) => fillUnusualFuelDecreaseSpecific(page, "15", "30"),
  "Gate Close": (page) => fillGateSpecific(page, "Gate 1"),
  "Gate Open": (page) => fillGateSpecific(page, "Gate 1"),
  "Mobile Offline": (page) => fillMobileStatusSpecific(page, "30"),
  "Mobile Online": (page) => fillMobileStatusSpecific(page, "30"),
  "Over Temperature": fillOverTemperatureSpecific,
  "Under Temperature": fillUnderTemperatureSpecific,
  "Over working-time moving": (page) => fillOverWorkingTimeMovingSpecific(page, "8", "17"),
};