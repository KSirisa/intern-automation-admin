import { expect, test } from "@playwright/test";
import { safeClick, tryAction } from "../../../../helpers";


const searchData = {
  includeSubBU: true,
  businessUnitSearch: "AGG UAT",
  businessUnitSubNode: "__Warehouse",
  licenseOption: "อออ",
  driverOption: "Krittayoch",
  checkDateDayStart: "2",
  checkDateDayEnd: "9", // หากระบุเกินวันปัจจุบัน ระบบจะเลือกวันปัจจุบันให้อัตโนมัติ
  checklistType: "ตรวจเช็ครายวัน",
  shiftConfig: "แฮนด์",
  resultStatus: "Pass", // Pass / Failed
  sectionName: "ระบบไฟ",
  itemName: "ตรวจเช็คระบบ",
  licenseText: "กข 1234",
  referenceNo: "REF-2026-001",
  riskLevel: "Check All", // High Risk / Medium Risk / Low Risk / Normal / Check All
  categorySearch: "Check All",
  subCategorySearch: "Test",
};


test("Maintenance - Vehicle Checklist Search & Detail View PostTest", async ({ page }) => {

  await page.goto("/admin#/maintenance");

  await safeClick(
    page.getByRole("link", { name: "Vehicle Checklist Result", exact: true }),
    "Vehicle Checklist Result Link"
  );
  await page.waitForTimeout(500);


  // --------------------------------------------------------------------------
  // SEARCH MODAL INITIALIZATION
  // --------------------------------------------------------------------------

  // 1. Open Search Modal
  await safeClick(page.getByTitle("Search"), "Search Button");
  await page.waitForTimeout(500);


  // --------------------------------------------------------------------------
  // SECTION 1: BUSINESS UNIT & DRIVER FILTERS
  // --------------------------------------------------------------------------

  // 2. Include Sub Business Units Checkbox
  await tryAction(async () => {
    if (searchData.includeSubBU) {
      const subBuLabel = page
        .locator("label, span")
        .filter({ hasText: /^Include Sub Business Units$/i })
        .first();

      await subBuLabel.click({ force: true });
    }
  }, "Set Include Sub Business Units");


  // 3. Business Unit Treeview Selection (#ddlBusinessUnit)
  await tryAction(async () => {
    await page.locator("#ddlBusinessUnit").click({ force: true });

    await page.getByRole("treeitem", { name: searchData.businessUnitSearch }).click({ force: true });
    await page.getByRole("treeitem", { name: searchData.businessUnitSubNode }).click({ force: true });

    await page.locator("#ddlBusinessUnit .app-allow-icon").click({ force: true });
  }, "Select Business Unit Nodes");


  // 4. License Dropdown (#txtLicense)
  await tryAction(async () => {
    await page.locator("#txtLicense").click({ force: true });

    const searchbox = page.getByRole("searchbox").or(page.locator("input[type='search']"));
    if (await searchbox.isVisible().catch(() => false)) {
      await searchbox.fill(searchData.licenseOption);
    }

    await page.getByRole("option", { name: searchData.licenseOption }).first().click({ force: true });
  }, "Select License Option");


  // 5. Driver Dropdown (#txtDriver)
  await tryAction(async () => {
    await page.locator("#txtDriver").click({ force: true });

    const searchbox = page.getByRole("searchbox").or(page.locator("input[type='search']"));
    if (await searchbox.isVisible().catch(() => false)) {
      await searchbox.fill(searchData.driverOption);
    }

    await page.getByRole("option", { name: searchData.driverOption }).click({ force: true });
  }, "Select Driver Option");


  // --------------------------------------------------------------------------
  // SECTION 2: DATE RANGE SELECTION
  // --------------------------------------------------------------------------

  // 6. Check Date Selection (#dtStartDate / #dtEndDate)
  await tryAction(async () => {
    const today = new Date().getDate();
    const requestedEndDay = parseInt(searchData.checkDateDayEnd, 10);

    // ป้องกันการเลือก End Date เกินวันปัจจุบัน
    const finalEndDay = (!isNaN(requestedEndDay) && requestedEndDay > today)
      ? today.toString()
      : (searchData.checkDateDayEnd === "TODAY" ? today.toString() : searchData.checkDateDayEnd);

    // --- เลือก Start Date (#dtStartDate) ---
    await page.locator("#dtStartDate").click({ force: true });
    await page.locator(".ui-datepicker-calendar").waitFor({ state: "visible", timeout: 3000 }).catch(() => {});
    await page.getByRole("link", { name: searchData.checkDateDayStart, exact: true }).first().click({ force: true });

    await page.waitForTimeout(300); // เว้นจังหวะให้ปฏิทินชุดแรกปิด

    // --- เลือก End Date (#dtEndDate) ---
    await page.locator("#dtEndDate").click({ force: true });
    await page.locator(".ui-datepicker-calendar").waitFor({ state: "visible", timeout: 3000 }).catch(() => {});
    await page.getByRole("link", { name: finalEndDay, exact: true }).first().click({ force: true });
  }, "Select Check Date Range");


  // --------------------------------------------------------------------------
  // SECTION 3: CHECKLIST DETAILS & STATUS
  // --------------------------------------------------------------------------

  // 7. Event / Checklist Type Dropdown (#ddChecklistType)
  await tryAction(async () => {
    await page.locator("#ddChecklistType").click({ force: true });
    await page.getByRole("option", { name: searchData.checklistType }).click({ force: true });
  }, "Select Checklist Type");


  // 8. Configuration / Shift Dropdown (#ddShift)
  await tryAction(async () => {
    await page.locator("#ddShift").click({ force: true });
    await page.getByRole("option", { name: searchData.shiftConfig }).click({ force: true });
  }, "Select Shift Configuration");


  // 9. Result Dropdown (#ddResult)
  await tryAction(async () => {
    await page.locator("#ddResult").click({ force: true });
    await page.getByRole("option", { name: searchData.resultStatus, exact: true }).click({ force: true });
  }, "Select Result Status");


  // 10. Section Dropdown (#ddSection)
  await tryAction(async () => {
    await page.locator("#ddSection").click({ force: true });
    await page.getByRole("option", { name: searchData.sectionName }).click({ force: true });
  }, "Select Section");


  // 11. Item Multi-select Dropdown (#ddItem)
  await tryAction(async () => {
    await page.locator("#ddItem").click({ force: true });

    await page
      .getByRole("treeitem", { name: searchData.itemName })
      .or(page.getByText(searchData.itemName))
      .click({ force: true });

    await page.locator("#ddItem .app-allow-icon").click({ force: true });
  }, "Select Item");


  // 12. License Textbox (#txtLicenseText)
  await tryAction(async () => {
    await page.locator("#txtLicenseText").fill(searchData.licenseText);
  }, "Fill License Text");


  // 13. Reference No. Textbox (#txtReferenceNo)
  await tryAction(async () => {
    await page.locator("#txtReferenceNo").fill(searchData.referenceNo);
  }, "Fill Reference No");


  // --------------------------------------------------------------------------
  // SECTION 4: RISK & CATEGORY MULTI-SELECT DROPDOWNS
  // --------------------------------------------------------------------------

  // 14. Risk Level Multi-select Dropdown
  await tryAction(async () => {
    const riskDropdown = page.locator("gisc-ui-dropdown-multiselect:nth-child(26)");
    await riskDropdown.locator("div > .app-treeview-dropdown").first().click({ force: true });

    if (searchData.riskLevel !== "Check All") {
      const searchInput = riskDropdown
        .getByRole("textbox", { name: "Search" })
        .or(riskDropdown.locator('input[placeholder="Search"]'));

      if (await searchInput.isVisible().catch(() => false)) {
        await searchInput.fill(searchData.riskLevel);
      }
    }

    const targetItem = riskDropdown
      .getByRole("treeitem", { name: searchData.riskLevel })
      .or(riskDropdown.locator(`li[title='${searchData.riskLevel}'] .jstree-anchor`))
      .first();

    await targetItem.waitFor({ state: "visible", timeout: 3000 });
    await targetItem.click({ force: true });

    await riskDropdown.locator("div > .app-treeview-dropdown").first().click({ force: true });
  }, "Select Risk Level");


  // 15. Vehicle Category Multi-select Dropdown (#ddlCategory)
  await tryAction(async () => {
    const categoryDropdown = page.locator("#ddlCategory");
    await categoryDropdown.click({ force: true });

    if (searchData.categorySearch !== "Check All") {
      const searchInput = categoryDropdown
        .getByRole("textbox", { name: "Search" })
        .or(categoryDropdown.locator("input[type='text'], input[placeholder='Search']"))
        .first();

      if (await searchInput.isVisible().catch(() => false)) {
        await searchInput.fill(searchData.categorySearch);
      }
    }

    const exactTitleItem = categoryDropdown.locator(`li[title='${searchData.categorySearch}'] > .jstree-anchor`);
    const exactRoleItem = categoryDropdown.getByRole("treeitem", { name: searchData.categorySearch, exact: true });
    const targetItem = exactTitleItem.or(exactRoleItem).first();

    await targetItem.waitFor({ state: "visible", timeout: 3000 });
    await targetItem.click({ force: true });

    await categoryDropdown.locator(".app-allow-icon").click({ force: true });
  }, "Select Vehicle Category");


  // 16. Vehicle Sub Category Multi-select Dropdown (#ddlSubCategory)
  await tryAction(async () => {
    const subCategoryDropdown = page.locator("#ddlSubCategory");
    await subCategoryDropdown.click({ force: true });

    if (searchData.subCategorySearch !== "Check All") {
      const searchInput = subCategoryDropdown
        .getByRole("textbox", { name: "Search" })
        .or(subCategoryDropdown.locator("input[type='text'], input[placeholder='Search']"))
        .first();

      if (await searchInput.isVisible().catch(() => false)) {
        await searchInput.fill(searchData.subCategorySearch);
      }
    }

    const exactTitleItem = subCategoryDropdown.locator(`li[title='${searchData.subCategorySearch}'] > .jstree-anchor`);
    const exactRoleItem = subCategoryDropdown.getByRole("treeitem", { name: searchData.subCategorySearch, exact: true });
    const targetItem = exactTitleItem
      .or(exactRoleItem)
      .or(subCategoryDropdown.getByText(searchData.subCategorySearch, { exact: true }))
      .first();

    await targetItem.waitFor({ state: "visible", timeout: 3000 });
    await targetItem.click({ force: true });

    await subCategoryDropdown.locator(".app-allow-icon").click({ force: true });
  }, "Select Vehicle Sub Category");


  // --------------------------------------------------------------------------
  // SECTION 5: SUBMIT & CLEANUP
  // --------------------------------------------------------------------------

  // 17. Submit Search
  await safeClick(
    page.locator("button").filter({ hasText: "Search" }),
    "Submit Search Button"
  );
  await page.waitForLoadState("networkidle").catch(() => {});
  await page.waitForTimeout(1000);


  // 18. Clear Search Filters
  await tryAction(async () => {
    await page.getByTitle("Clear").click({ force: true });
  }, "Click Clear Button");


  // 19. Close Search Modal
  await tryAction(async () => {
    await page.getByRole("button", { name: "Close" }).last().click({ force: true });
  }, "Click Close Modal Button");


});