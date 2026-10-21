import { test, expect, Page } from "@playwright/test";
import { safeClick } from "../../../../helpers";

const ACTION_DELAY = 500;

async function selectFromDropdown(
  page: Page,
  dropdownId: string,
  optionText: string,
  verify: boolean = true
) {
  const dropdownArrow = page.locator(
    `span[aria-labelledby="select2-${dropdownId}-container"] .select2-selection__arrow`
  );
  await safeClick(dropdownArrow);

  // scope searchbox Specific เพื่อไม่ให้ตีกับ Popup หรือ Dropdown อื่น
  const searchInput = page.locator(
    `input[aria-controls="select2-${dropdownId}-results"]`
  );
  await searchInput.fill(optionText);

  await safeClick(page.getByRole("option", { name: optionText, exact: true }));

  if (verify) {
    await expect(page.locator(`#select2-${dropdownId}-container`)).toHaveText(
      optionText
    );
  }
}

// ===== Common fields (ทุก type ใช้ร่วมกัน) =====

async function fillCommonBasicFields(page: Page) {
  const shipmentOnlyLabel = page
    .locator("label")
    .filter({ hasText: "Alert when work under shipment only." });
  if (await shipmentOnlyLabel.isVisible().catch(() => false)) {
    await safeClick(shipmentOnlyLabel);
  }

  // const alertCategoryDropdown = page.locator(
  //   `span[aria-labelledby="select2-ddAlertCategory-container"]`
  // );
  // if (await alertCategoryDropdown.isVisible().catch(() => false)) {
  //   await selectFromDropdown(page, "ddAlertCategory", "My Business");
  // }

  await page.getByRole("textbox", { name: "Priority" }).fill("111");
  await page
    .getByLabel("Enable", { exact: true })
    .selectOption({ label: "Yes" })
    .catch(() => {});
  await page.locator("#txMailTo").fill("someone@example.com");

  await safeClick(
    page.locator("label").filter({ hasText: "Auto Generate Ticket" })
  );
  await safeClick(page.locator("label").filter({ hasText: "MDVR" }));
  await safeClick(
    page.locator("label").filter({ hasText: "Remove Default Driver" })
  );
  await safeClick(
    page.locator("label").filter({ hasText: "Use Driver's Business Unit" })
  );
}

async function fillAlertViaSection(page: Page) {
  // Website
  const websiteLabel = page
    .locator("label")
    .filter({ hasText: "Website" })
    .first();
  await safeClick(websiteLabel);
  await page
    .locator("#ddNotificationSound")
    .selectOption({ label: "Mute" })
    .catch(() => {});
  await safeClick(page.locator("#btn__playsound_press"));
  await safeClick(websiteLabel);

  // Toggle Channels
  const channels = ["Email", "SMS", "Interface", "Report", "Mobile"];
  for (const channel of channels) {
    const channelLabel = page.locator("label").filter({ hasText: channel });
    await safeClick(channelLabel);
    await safeClick(channelLabel);
  }

  // Device
  const deviceLabel = page
    .locator("label")
    .filter({ hasText: /^\s*Device\s*$/ });
  await safeClick(deviceLabel);
  await page.waitForTimeout(500);
  await selectFromDropdown(
    page,
    "ddBoxTemplate",
    "GIS_ERM_Starlink_MCR_eFuel_RFID_Belt_Siren"
  );
  await page.waitForTimeout(500);
  await selectFromDropdown(page, "ddOutput", "Siren");
  await page.waitForTimeout(500);
  await selectFromDropdown(page, "ddCommandTemplate", "SirenOff");
  await safeClick(deviceLabel);

  // Line
  const lineLabel = page.locator("label").filter({ hasText: "Line" });
  await safeClick(lineLabel);
  await safeClick(page.getByRole("link", { name: "Line", exact: true }));
  await safeClick(
    page
      .locator("tr", { hasText: "LineAlert1" })
      .locator(".app-control-dt-indicator")
  );
  await safeClick(page.getByRole("button", { name: "OK" }));
  await page.waitForTimeout(500);
  await safeClick(lineLabel);
}

async function fillDescriptionAndPermissions(page: Page) {
  await page.getByRole("textbox", { name: "Description" }).fill("Automate");

  await safeClick(page.getByRole("link", { name: "Permissions" }));
  await page.waitForTimeout(500);

  // 1. กำหนดรายชื่อ User ที่ต้องการเลือกใน Array
  const usersPermToSelect = [
    "Arm Trainee (Trainee03)",
    "Krittayoch Sirisa (EID000036)",
  ];

  // 2. เปิด Modal Add Users
  await safeClick(page.locator('a[data-bind="click: addUsers"]'));
  await page.waitForTimeout(2000);

  // 3. Loop เลือก User จาก Array
  for (const userName of usersPermToSelect) {
    const userRowIndicator = page
      .locator("tr", { hasText: userName })
      .locator(".app-control-dt-indicator");

    if (await userRowIndicator.isVisible().catch(() => false)) {
      await safeClick(userRowIndicator);
    }
  }

  // 4. กดยืนยัน OK Modal Add Users
  await safeClick(page.getByRole("button", { name: "OK" }).last());
  await page.waitForTimeout(500);

  // 5. Add Group Modal
  await safeClick(page.locator('a[data-bind="click: addGroups"]'));
  await page.waitForTimeout(2000);
  await safeClick(
    page.locator('#dttGroupShared tr[id="132"] .app-control-dt-indicator')
  );
  await safeClick(page.getByRole("button", { name: "OK" }).last());
  await page.waitForTimeout(500);

  // Confirm Main Permission Dialog
  await safeClick(page.getByRole("button", { name: "OK" }));
}

async function fillAreaSetting(page: Page) {
  const areaSettingLink = page.getByRole("link", { name: "Area Setting" });
  if (await areaSettingLink.isVisible().catch(() => false)) {
    await safeClick(areaSettingLink);
    await selectFromDropdown(page, "ddCustomAreas", "8RUN");
    await selectFromDropdown(page, "ddCustomAreaTypes", "Dangerous Area");
    await selectFromDropdown(page, "ddCustomAreaCategoies", "TestDC");
    await safeClick(page.getByRole("button", { name: "Save" }).nth(1));
    await page.waitForTimeout(500);
  }
}

async function fillDateTimeSetting(page: Page) {
  const dateSettingLink = page.getByRole("link", {
    name: "Date / Time Setting",
  });
  if (await dateSettingLink.isVisible().catch(() => false)) {
    await safeClick(dateSettingLink);

    const days = [
      "All",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
      "Sunday",
      "All",
    ];
    for (const day of days) {
      await safeClick(
        page
          .locator("label")
          .filter({ hasText: new RegExp(`^\\s*${day}\\s*$`) })
      );
    }

    const timeInputs = page.locator('input[type="time"]');
    await timeInputs.nth(0).fill("08:00");
    await timeInputs.nth(1).fill("17:00");

    await safeClick(page.getByRole("button", { name: "Save" }).nth(1));
    await page.waitForTimeout(500);
  }
}

async function fillAssets(page: Page) {
  const assetSettingLink = page.getByRole("link", {
    name: "Assets* Required field",
  });
  if (await assetSettingLink.isVisible().catch(() => false)) {
    await safeClick(assetSettingLink);
    await safeClick(page.getByTitle("Find Assets"));
    await safeClick(page.locator("#ddBusinessUnit"));
    await safeClick(
      page.getByRole("treeitem", { name: "_ePOD Test Distance" })
    );
    await safeClick(page.getByRole("button", { name: "OK" }));
    await page.waitForTimeout(500);

    await safeClick(
      page
        .locator(
          ".checkbox > .app-checkBox-contain-dt > .app-checkBox-control-dt > .app-control-dt-indicator"
        )
        .first()
    );
    await safeClick(page.getByRole("button", { name: "Apply" }));
    await page.waitForTimeout(500);
  }
}

// ===== Type-specific fields (แต่ละ type ไม่เหมือนกัน) =====

async function fillNoExtraFieldsSpecific(page: Page) {}

async function fillAccelerationSpecific(page: Page) {
  await selectFromDropdown(page, "ddMlevel", "Normal Only");
  await page
    .getByRole("textbox", { name: "Minimum Duration(second)" })
    .fill("3");
}

async function fillDurationDistanceFields(page: Page) {
  await page.getByRole("textbox", { name: "Duration (seconds)" }).fill("5");
  await page.getByRole("textbox", { name: "Distance (meter)" }).fill("50");
}

async function fillAreaInOutSpecific(page: Page) {
  await safeClick(
    page.locator("label").filter({ hasText: "Alert when work under working" })
  );
  await page.waitForTimeout(500);
  await selectFromDropdown(page, "ddCustomArea", "8RUN");
  await selectFromDropdown(page, "ddCustomAreaType", "Dangerous Area");
  await selectFromDropdown(page, "ddCustomAreaCategory", "TestDC");

  await page
    .locator("#ddDrivingType")
    .selectOption({ label: "In" })
    .catch(() => {});

  // Working Period From
  await safeClick(page.getByRole("textbox", { name: "Working Period From" }));
  await page
    .locator(".ui-timepicker-select")
    .first()
    .selectOption("1")
    .catch(() => {});
  await page
    .locator(".ui_tpicker_minute_slider > .ui-timepicker-select")
    .selectOption("1")
    .catch(() => {});
  await safeClick(page.getByRole("button", { name: "Save" }));

  // Working Period To
  await safeClick(page.getByRole("textbox", { name: "Working Period To" }));
  await page
    .locator(".ui-timepicker-select")
    .first()
    .selectOption("23")
    .catch(() => {});
  await page
    .locator(".ui_tpicker_minute_slider > .ui-timepicker-select")
    .selectOption("59")
    .catch(() => {});
  await safeClick(page.getByRole("button", { name: "Save" }));
}

async function fillAreaParkingSpecific(page: Page) {
  await page.waitForTimeout(500);
  await selectFromDropdown(page, "ddCustomArea", "8RUN");
  await selectFromDropdown(page, "ddCustomAreaType", "Dangerous Area");
  await selectFromDropdown(page, "ddCustomAreaCategory", "TestDC");
  await page
    .getByLabel("Stop Type")
    .selectOption({ label: "In" })
    .catch(() => {});
}

async function fillMinimumDurationField(page: Page, seconds: string) {
  await page
    .getByRole("textbox", { name: "Minimum Duration(second)" })
    .fill(seconds);
}

async function fillCustomSpecific(page: Page) {
  await page.getByRole("textbox", { name: "Speed Limit (km/hr)" }).fill("40");
  await page.getByRole("textbox", { name: "Custom Message" }).fill("40 km/hr");
  await safeClick(page.getByRole("link", { name: "Features*" }));

  await safeClick(page.locator("a").filter({ hasText: "Add" }).first());
  await page
    .locator('select[data-target-field="featureId"]')
    .selectOption({ label: "Engine" })
    .catch(() => {});
  await page
    .locator('select[data-target-field="matchDigitalValue"]')
    .selectOption({ label: "On" })
    .catch(() => {});
  await safeClick(page.locator(".dt-row-remover > .gisc-ui-icon"));

  await safeClick(page.locator("a").filter({ hasText: "Add" }).nth(1));
  await page
    .locator('select[data-target-field="featureId"]')
    .selectOption({ label: "Fuel Level" })
    .catch(() => {});
  await page.locator("#minAnalogValue1").fill("1");
  await page.locator("#maxAnalogValue1").fill("10");
  await page
    .locator(".dt-row-remover > .gisc-ui-icon")
    .dblclick()
    .catch(() => {});

  await safeClick(page.locator("a").filter({ hasText: "Add" }).nth(2));
  await page
    .locator('[id="1"]')
    .getByRole("combobox")
    .selectOption({ label: "Test" })
    .catch(() => {});
  await page.locator("#matchTextValue1").fill("test");

  await safeClick(page.getByRole("button", { name: "OK" }));
}

async function fillDeviceBatteryLowSpecific(page: Page) {
  await page
    .getByRole("textbox", { name: "Device Battery Low Limit (%)" })
    .fill("30");
}

async function fillExceedLimitDrivingDriverSpecific(page: Page) {
  await page.locator("#txIntegerMax24").fill("360");
}

async function fillExceedLimitDrivingVehicleSpecific(page: Page) {
  await page.locator("#txIntegerMax24").fill("360");
  await page.getByRole("textbox", { name: "Parking Time (mins)" }).fill("60");
}

async function fillFreeWheelingSpecific(page: Page) {
  await page.getByRole("textbox", { name: "Min Speed (km/hr)" }).fill("40");
  await page.getByRole("textbox", { name: "Max Speed (km/hr)" }).fill("80");
  await page.getByRole("textbox", { name: "Min RPM" }).fill("600");
}

async function fillFuelIncreasingSpecific(page: Page) {
  await page
    .getByRole("textbox", { name: "Fuel Increase Limit(%)" })
    .fill("15");
}

async function fillGateCloseSpecific(page: Page) {
  await selectFromDropdown(page, "ddFeatureUnit", "Gate 1");
}

async function fillGateOpenSpecific(page: Page) {
  await selectFromDropdown(page, "ddFeatureUnit", "Gate 1");
}

async function fillLaneChangeSpecific(page: Page) {
  await selectFromDropdown(page, "ddMlevel", "Aggressive Only");
  await page
    .getByRole("textbox", { name: "Minimum Duration(second)" })
    .fill("10");
}

async function fillMobileOfflineSpecific(page: Page) {
  await safeClick(
    page.locator("label").filter({ hasText: "Alert when work under working" })
  );
  await page.getByRole("textbox", { name: "Duration (seconds)" }).fill("30");
}

async function fillMobileOnlineSpecific(page: Page) {
  await safeClick(
    page.locator("label").filter({ hasText: "Alert when work under working" })
  );
  await page.getByRole("textbox", { name: "Duration (seconds)" }).fill("30");
}

async function fillNoSeatBeltSpecific(page: Page) {
  await page.getByRole("textbox", { name: "Max Speed (km/hr)" }).fill("60");
}

async function fillOutOfGreenBandSpecific(page: Page) {
  await page.getByRole("textbox", { name: "Min Speed (km/hr)" }).fill("20");
  await page.getByRole("textbox", { name: "Max Speed (km/hr)" }).fill("80");
  await page.getByRole("textbox", { name: "Min RPM" }).fill("1000");
  await page.getByRole("textbox", { name: "Max RPM" }).fill("2500");
}

async function fillOverSpeedSpecific(page: Page) {
  await page.getByRole("textbox", { name: "Speed Limit (km/hr)" }).fill("120");
  await page
    .getByRole("textbox", { name: "Over Speed Delay (second)" })
    .fill("3");

  const firstTimeLabel = page
    .locator("label")
    .filter({ hasText: "Only First Time" });
  await safeClick(firstTimeLabel);
  await safeClick(firstTimeLabel);

  await selectFromDropdown(page, "ddCustomArea", "8RUN");
  await selectFromDropdown(page, "ddCustomAreaType", "Dangerous Area");
}

async function fillOverTemperatureSpecific(page: Page) {
  await selectFromDropdown(page, "ddFeatureUnit", "Temperature 1");
  await page.getByRole("textbox", { name: "Max Temperature (°C)" }).fill("36");
  await page.getByRole("textbox", { name: "Duration (seconds)" }).fill("10");
}

async function fillOverWorkingTimeMovingSpecific(page: Page) {
  await safeClick(page.locator("#dtInputFromTime"));
  await page
    .locator(".ui-timepicker-select")
    .first()
    .selectOption("8")
    .catch(() => {});
  await safeClick(page.getByRole("button", { name: "Save" }));

  await safeClick(page.locator("#dtInputToTime"));
  await page
    .locator(".ui-timepicker-select")
    .first()
    .selectOption("17")
    .catch(() => {});
  await safeClick(page.getByRole("button", { name: "Save" }));
}

async function fillOverRPMSpecific(page: Page) {
  await page.getByRole("textbox", { name: "Min Speed (km/hr)" }).fill("20");
  await page.getByRole("textbox", { name: "Max RPM" }).fill("2500");
}

async function fillParkingSpecific(page: Page) {
  await safeClick(
    page.locator("label").filter({ hasText: "Alert when work under working" })
  );
  await page
    .locator("#ddAlertParkingType")
    .selectOption({ label: "Park" })
    .catch(() => {});
}

async function fillParkingInsidePOISpecific(page: Page) {
  await page.getByRole("searchbox", { name: "Required field" }).fill("Auto");
  await safeClick(page.locator("#ui-id-2"));

  await page
    .locator("#ddAlertParkingType")
    .selectOption({ label: "Park Over Time" })
    .catch(() => {});
  await page.getByRole("textbox", { name: "Duration (minutes)" }).fill("60");
}

async function fillPOIInOutSpecific(page: Page) {
  await page.getByRole("searchbox", { name: "Required field" }).fill("Auto");
  await safeClick(page.locator("#ui-id-2"));

  await page
    .getByLabel("Movement")
    .selectOption({ label: "In" })
    .catch(() => {});

  await safeClick(page.locator("#dtInputFromTime"));
  await page
    .locator(".ui-timepicker-select")
    .first()
    .selectOption("8")
    .catch(() => {});
  await safeClick(page.getByRole("button", { name: "Save" }));

  await safeClick(page.locator("#dtInputToTime"));
  await page
    .locator(".ui-timepicker-select")
    .first()
    .selectOption("17")
    .catch(() => {});
  await safeClick(page.getByRole("button", { name: "Save" }));
}

async function fillRapidAccelerationSpecific(page: Page) {
  await page
    .getByRole("textbox", { name: "Rapid Acceleration Limit (km/" })
    .fill("7.2");
}

async function fillRapidDecelerationSpecific(page: Page) {
  await page
    .getByRole("textbox", { name: "Rapid Deceleration Limit (km/" })
    .fill("10");
}

async function fillRoundaboutSpecific(page: Page) {
  await page
    .getByRole("textbox", { name: "Minimum Duration(second)" })
    .fill("2");
}

async function fillSwerveDrivingSpecific(page: Page) {
  await page.getByRole("textbox", { name: "Swerve Limit (degree)" }).fill("20");
}

async function fillSwerveAcceleratingSpecific(page: Page) {
  await page
    .getByRole("textbox", { name: "Minimum Duration(second)" })
    .fill("10");
}

async function fillSwerveDeceleratingSpecific(page: Page) {
  await page
    .getByRole("textbox", { name: "Minimum Duration(second)" })
    .fill("20");
}

async function fillTurnSpecific(page: Page) {
  const direction = page.getByLabel("Direction");
  await direction.selectOption({ label: "Turn Left" }).catch(() => {});
  await direction.selectOption({ label: "Turn Right" }).catch(() => {});
  await direction.selectOption({ label: "Both" }).catch(() => {});

  await selectFromDropdown(page, "ddMlevel", "Normal Only");
  await page
    .getByRole("textbox", { name: "Minimum Duration(second)" })
    .fill("5");
}

async function fillUnauthorizedStopSpecific(page: Page) {
  await safeClick(page.locator('a[data-bind="click: addAllow"]'));
  await page
    .getByLabel("Condition")
    .selectOption({ label: "Custom POI" })
    .catch(() => {});
  await page
    .getByLabel("Category Type")
    .selectOption({ label: "Customer POI" })
    .catch(() => {});
  await safeClick(page.locator("#ddCategoryName"));
  await safeClick(page.getByRole("treeitem", { name: "Check All" }));
  await safeClick(page.locator(".app-allow-icon"));
  await safeClick(page.locator("label").filter({ hasText: "Unlimited" }));
  await safeClick(page.locator("label").filter({ hasText: "Limited" }).first());
  await page
    .getByRole("textbox", { name: "Parking Not Overtime (minutes)" })
    .fill("180");
  await safeClick(page.getByRole("button", { name: "Save" }).nth(1));

  await safeClick(page.locator('a[data-bind="click: addNotAllow"]'));
  await page
    .getByLabel("Condition")
    .selectOption({ label: "Custom Areas" })
    .catch(() => {});
  await page
    .getByLabel("Category Type")
    .selectOption({ label: "DC" })
    .catch(() => {});
  await safeClick(page.locator("#ddCategoryName"));
  await safeClick(page.getByRole("treeitem", { name: "Check All" }));
  await safeClick(page.locator(".app-allow-icon"));
  await page
    .getByLabel("Speed Type")
    .selectOption({ label: "Inside" })
    .catch(() => {});
  await safeClick(page.getByRole("button", { name: "Save" }).nth(1));

  await safeClick(
    page.locator('a[data-bind="click: addStopOvertimeProvince"]')
  );
  await page
    .getByRole("textbox", { name: "Province Group Name" })
    .fill("Automate Test");
  await page
    .getByLabel("Zone/Region")
    .selectOption({ label: "Central" })
    .catch(() => {});
  await safeClick(page.locator("#ddProvince"));
  await safeClick(page.getByRole("treeitem", { name: "Check All" }));
  await safeClick(page.locator(".app-allow-icon"));
  await page
    .getByRole("textbox", { name: "Stop Duration (minutes)" })
    .fill("180");
  await safeClick(page.getByRole("button", { name: "Save" }).nth(1));
}

async function fillUnderTemperatureSpecific(page: Page) {
  await selectFromDropdown(page, "ddFeatureUnit", "Temperature 1");
  await page.getByRole("textbox", { name: "Min Temperature (°C)" }).fill("15");
  await page.getByRole("textbox", { name: "Duration (seconds)" }).fill("10");
}

async function fillUnusualFuelDecreaseSpecific(page: Page) {
  await page.getByRole("textbox", { name: "Fuel Dec Limit (%)" }).fill("15");
  await page
    .getByRole("textbox", { name: "Focus Move Duration (minutes)" })
    .fill("30");
}

async function fillVehicleBatteryLowSpecific(page: Page) {
  await page
    .getByRole("textbox", { name: "Vehicle Battery Low Limit (%)" })
    .fill("20");
}

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
  await page
    .getByRole("textbox", { name: "Minimum Duration (second)" })
    .fill(minDuration);
}

const typeSpecificHandlers: Record<string, (page: Page) => Promise<void>> = {
  Abnormal: fillNoExtraFieldsSpecific,
  Acceleration: fillAccelerationSpecific,
  "Anonymous Drive": fillDurationDistanceFields,
  "Area In/ Out (Asset)": fillAreaInOutSpecific,
  "Area Parking": fillAreaParkingSpecific,
  "Bad GPS": fillDurationDistanceFields,
  Breaking: (page) => fillMinimumDurationField(page, "3"),
  Bypassing: (page) => fillMinimumDurationField(page, "4"),
  Custom: fillCustomSpecific,
  "Device Battery Low": fillDeviceBatteryLowSpecific,
  Distraction: fillNoExtraFieldsSpecific,
  "Engine Idling": fillNoExtraFieldsSpecific,
  "Engine Off": fillNoExtraFieldsSpecific,
  "Engine On": fillNoExtraFieldsSpecific,
  "Exceed limit driving (Driver)": fillExceedLimitDrivingDriverSpecific,
  "Exceed limit driving (Vehicle)": fillExceedLimitDrivingVehicleSpecific,
  "Exceed limit driving in 24 hours": fillExceedLimitDrivingDriverSpecific,
  "Fatigue - Drowsiness": fillNoExtraFieldsSpecific,
  "Fatigue - Micro Sleep": fillNoExtraFieldsSpecific,
  "Fatigue - Other": fillNoExtraFieldsSpecific,
  "Fatigue - Yawning": fillNoExtraFieldsSpecific,
  FCW: fillNoExtraFieldsSpecific,
  "Field of View Exception": fillNoExtraFieldsSpecific,
  "Free Wheeling": fillFreeWheelingSpecific,
  "Fuel Increasing": fillFuelIncreasingSpecific,
  "Gate Close": fillGateCloseSpecific,
  "Gate Open": fillGateOpenSpecific,
  "GPS Disconnected": fillNoExtraFieldsSpecific,
  "GPS Reconnected": fillNoExtraFieldsSpecific,
  HMW: fillNoExtraFieldsSpecific,
  "Lane change": fillLaneChangeSpecific,
  LDW: fillNoExtraFieldsSpecific,
  "Mobile Offline": fillMobileOfflineSpecific,
  "Mobile Online": fillMobileOnlineSpecific,
  Moving: fillNoExtraFieldsSpecific,
  NoSeatBelt: fillNoSeatBeltSpecific,
  OutOfGreenBand: fillOutOfGreenBandSpecific,
  "Over Speed": fillOverSpeedSpecific,
  "Over Temperature": fillOverTemperatureSpecific,
  "Over working-time moving": fillOverWorkingTimeMovingSpecific,
  OverRPM: fillOverRPMSpecific,
  Parking: fillParkingSpecific,
  "Parking Inside POI": fillParkingInsidePOISpecific,
  PCW: fillNoExtraFieldsSpecific,
  Phoning: fillNoExtraFieldsSpecific,
  "POI In/ Out": fillPOIInOutSpecific,
  "Power Disconnected": fillNoExtraFieldsSpecific,
  "Power Reconnected": fillNoExtraFieldsSpecific,
  "Rapid Acceleration Driving": fillRapidAccelerationSpecific,
  "Rapid Deceleration Driving": fillRapidDecelerationSpecific,
  "Real Accident": fillNoExtraFieldsSpecific,
  Roundabout: fillRoundaboutSpecific,
  Smoking: fillNoExtraFieldsSpecific,
  "SOS !": fillNoExtraFieldsSpecific,
  "Speed Bump": fillNoExtraFieldsSpecific,
  "Swerve Driving": fillSwerveDrivingSpecific,
  "Swerve while accelerating": fillSwerveAcceleratingSpecific,
  "Swerve while decelerating": fillSwerveDeceleratingSpecific,
  Tow: fillNoExtraFieldsSpecific,
  TSR: fillNoExtraFieldsSpecific,
  Turn: fillTurnSpecific,
  UFCW: fillNoExtraFieldsSpecific,
  "Unauthorized Stop": fillUnauthorizedStopSpecific,
  "Under Temperature": fillUnderTemperatureSpecific,
  "Unusual Fuel Decrease": fillUnusualFuelDecreaseSpecific,
  "Vehicle Battery Low": fillVehicleBatteryLowSpecific,
  "Wide Swerve while accelerating": (page) =>
    fillDirectionAndLevelSpecific(page, "Aggressive Only", "3"),
  "Wide Swerve while decelerating": (page) =>
    fillDirectionAndLevelSpecific(page, "Normal And Above", "4"),
  "Wide Turn": (page) =>
    fillDirectionAndLevelSpecific(page, "Aggressive And Above", "5"),
};

// ===== Main test =====

test("alert configurations test", async ({ page }) => {
  const alertType = "Wide Turn";

  await page.goto(
    "https://tmsprod.tipcoasphalt.com/admin#/configuration/alert"
  );

  await safeClick(page.getByRole("link", { name: "Alerts", exact: true }));
  await page.waitForTimeout(500);
  await safeClick(page.getByTitle("Create", { exact: true }));

  // 1. เลือก Type ก่อนเสมอ
  await selectFromDropdown(page, "ddType", alertType);

  // 2. ฟิลด์เฉพาะ type ที่โผล่ทันทีใต้ Type
  const specificHandler = typeSpecificHandlers[alertType];
  if (specificHandler) await specificHandler(page);

  // 3. ฟิลด์ร่วมทั่วไป
  await fillCommonBasicFields(page);
  await fillAlertViaSection(page);
  await fillDescriptionAndPermissions(page);

  // 4. Area Setting — มีทุก type ต้องมาก่อน Date/Time เสมอ
  await fillAreaSetting(page);

  // 5. Date/Time Setting
  await fillDateTimeSetting(page);

  // 6. Assets
  await fillAssets(page);

  // await safeClick(page.getByRole("button", { name: "Save" }));
  // await page.waitForTimeout(2500);

  // await page.getByPlaceholder("Filter by Description").fill("Wide Turn");
  // await safeClick(page.getByRole("gridcell", { name: "Automate" }));

  // await page.getByTitle("Delete").click();
  // await page
  //   .locator("div[data-bind=\"click:click.bind($data,'yes')\"]")
  //   .click();
  // await page.waitForTimeout(2500);

  await page.pause();
});
