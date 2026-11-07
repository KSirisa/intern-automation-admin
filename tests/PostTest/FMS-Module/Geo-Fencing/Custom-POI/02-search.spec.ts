import { test, expect } from "@playwright/test";
import { tryAction, safeClick, selectDatePicker } from "../../../../helpers"; // ดึง selectDatePicker จาก Helpers

// ============================================================================
// GLOBAL CONFIG & TEST DATA
// ============================================================================
const TEST_CONFIG = {
  url: "/#/geo-fencing",
  searchData: {
    permissionType: "Public", // Shared / Public / Private
    code: "AT001",
    name: "ATest001",
    country: "Thailand",
    province: "BANGKOK",
    city: "BANG RAK",
    town: "SI LOM",
    telephone: "0981234567",
    timeStartFrom: "08:00",
    timeStartTo: "17:00",
    categoryType: "Check All",
    hasSubPoiArea: true,
    category: "Check All",
    subPoiCode: "ATsub001",
    subPoiAreaName: "subPOIarea",
    subAreaType: "Restrict Area",
    dateFrom: { year: "2026", monthIndex: "7", day: "1" }, // monthIndex: 0=ม.ค., 7=ส.ค., 8=ก.ย.
    dateTo: { year: "2026", monthIndex: "8", day: "30" },
    createdBy: "trainee03",
  },
};

// ============================================================================
// MAIN TEST SUITE
// ============================================================================
test("Geo-Fencing - Search Custom POI PostTest", async ({
  page,
}) => {
  const { searchData } = TEST_CONFIG;

  // 1. NAVIGATION & DIALOG OPEN
  await page.goto(TEST_CONFIG.url);
  await page.waitForLoadState("networkidle");

  await page.getByRole("link", { name: "Custom POI", exact: true }).click();
  await page.waitForTimeout(1500);

  await tryAction(async () => {
    const searchBtn = page.getByTitle("Search", { exact: true }).first();
    await page.waitForTimeout(500);
    await safeClick(searchBtn, "Search Button");
  }, "Open Search Dialog");
  await page.waitForTimeout(500);

  // --------------------------------------------------------------------------
  // 2. BASIC FORM CONTROLS
  // --------------------------------------------------------------------------
  await page
    .locator("select")
    .first()
    .selectOption({ label: searchData.permissionType });

  const codeInput = page
    .locator('input[placeholder*="Code"]')
    .or(page.getByRole("textbox").first());
  await codeInput.fill(searchData.code);

  const nameInput = page
    .locator('input[placeholder*="Name"]')
    .or(page.getByRole("textbox").nth(1));
  await nameInput.fill(searchData.name);

  await page.locator("#ddlCountry").selectOption({ label: searchData.country });
  await page
    .locator("#ddlProvince")
    .selectOption({ label: searchData.province });
  await page.locator("#ddlCity").selectOption({ label: searchData.city });
  await page.locator("#ddlTown").selectOption({ label: searchData.town });

  await page.locator(".ddTitle").click();
  await page.locator(".fnone").first().click();

  await page
    .getByRole("textbox", { name: "Telephone" })
    .fill(searchData.telephone);
  await page
    .locator('input[data-bind*="timeStartFrom"]')
    .fill(searchData.timeStartFrom);
  await page
    .locator('input[data-bind*="timeStartTo"]')
    .fill(searchData.timeStartTo);

  await page.locator("label").filter({ hasText: "All" }).click();

  // --------------------------------------------------------------------------
  // 3. CATEGORY TYPE DROPDOWN
  // --------------------------------------------------------------------------
  const categoryTypeWrapper = page
    .locator(".app-treeview-dropdown-wrapper.multiselect")
    .first();
  await categoryTypeWrapper.click();
  await page.waitForTimeout(300);

  const searchCatTypeInput = categoryTypeWrapper
    .locator('input[type="text"]')
    .first();
  await searchCatTypeInput.fill(searchData.categoryType);
  await page.waitForTimeout(300);

  await categoryTypeWrapper
    .locator(`li[title="${searchData.categoryType}"] a.jstree-anchor`)
    .first()
    .click({ force: true });
  await categoryTypeWrapper.click();

  // Toggle Sub POI Area
  if (searchData.hasSubPoiArea) {
    await page.locator("label").filter({ hasText: "Has Sub POI Area" }).click();
    await page.waitForTimeout(500);
  }

  // --------------------------------------------------------------------------
  // 4. CATEGORY DROPDOWN
  // --------------------------------------------------------------------------
  const categoryWrapper = page
    .locator(".app-treeview-dropdown-wrapper.multiselect")
    .filter({ has: page.locator(".jstree-4") })
    .or(page.locator(".app-treeview-dropdown-wrapper.multiselect").last());

  await categoryWrapper.click();
  await page.waitForTimeout(300);

  const searchCatInput = categoryWrapper.locator('input[type="text"]').first();
  await searchCatInput.fill(searchData.category);
  await page.waitForTimeout(300);

  await categoryWrapper
    .locator(`li[title="${searchData.category}"] a.jstree-anchor`)
    .first()
    .click({ force: true });
  await categoryWrapper.click();

  // --------------------------------------------------------------------------
  // 5. SUB POI DETAILS & CREATED DATE RANGE
  // --------------------------------------------------------------------------
  if (searchData.hasSubPoiArea) {
    const subPoiCodeInput = page
      .locator(
        'input[data-bind*="subPoiCode"], input[data-bind*="SubPoiCode"], gisc-ui-textbox:nth-child(29) input',
      )
      .first();
    await subPoiCodeInput.fill(searchData.subPoiCode);

    const subPoiNameInput = page
      .locator(
        'input[data-bind*="subPoiAreaName"], input[data-bind*="subPoiName"], gisc-ui-textbox:nth-child(31) input',
      )
      .first();
    await subPoiNameInput.fill(searchData.subPoiAreaName);

    await page
      .locator("#ddlSubareaType")
      .selectOption({ label: searchData.subAreaType });
  }

  // เรียกใช้ selectDatePicker จาก Helpers File Direct
  await selectDatePicker(page, "#dtCreateDateFrom", searchData.dateFrom);
  await selectDatePicker(page, "#dtCreateDateTo", searchData.dateTo);

  // Created By Textbox
  await page
    .locator(
      'input[data-bind*="txtCreateBy"], #txtCreateBy, input[name*="CreatedBy"]',
    )
    .last()
    .fill(searchData.createdBy);

  // --------------------------------------------------------------------------
  // 6. SUBMIT SEARCH & VIEW ON MAP
  // --------------------------------------------------------------------------
  await page.locator("button").filter({ hasText: "Search" }).first().click();
  await page.waitForLoadState("networkidle").catch(() => {});
  await page.waitForTimeout(1000);

  await page.getByRole("link", { name: "Expand" }).click();
  await page.getByRole("gridcell", { name: searchData.name }).first().click();
  await page.getByTitle("View on Map").click();

  await page.waitForTimeout(500);

});