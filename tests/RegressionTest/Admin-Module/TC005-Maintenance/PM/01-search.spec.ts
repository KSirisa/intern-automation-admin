import { expect, test } from "@playwright/test";
import { safeClick, tryAction } from "../../../../helpers";

const searchData = {
  includeSubBU: true,
  businessUnitSearch: "___TEST",
  licenseOption: "มม01-1234",
  checkDateDayStart: "1",
  checkDateDayEnd: "TODAY", // ป้องกันการเลือกเกินวันปัจจุบัน
  checklistType: "ตรวจสอบก่อนใช้งาน",
  shiftConfig: "ตรวจสอบสภาพรถตามระยะทาง",
  resultStatus: "Pass", // Pass / Failed
  sectionName: "อื่นๆ",
  items: [
    "เปลี่ยนแผ่นคลัทช์",
    "เปลี่ยนใส้กรองโซล่า",
    "เปลี่ยนกรองน้ำมันเครื่อง",
    "เปลี่ยนกรองอากาศ",
    "เปลี่ยนถ่ายน้ำมันเครื่อง",
    "เปลี่ยนถ่ายน้ำมันคลัทช์",
    "เปลี่ยนถ่ายน้ำมันพาเวอร์และไส้กรอง",
  ],
};


test("Maintenance - PM Checklist Result Search Filter RegressionTest", async ({ page }) => {

  // --------------------------------------------------------------------------
  // HELPER FUNCTION: SELECT2 DROPDOWN HANDLER
  // --------------------------------------------------------------------------

  const selectDropdownOption = async (containerSelector: string, inputId: string, searchText: string, actionName: string) => {
    await tryAction(async () => {
      const container = page.locator(containerSelector, {
        has: page.locator(inputId),
      });

      // 1. คลิกเปิด Select2 Dropdown
      await container.locator(".select2-selection__arrow, .select2-selection").first().click({ force: true });

      // 2. พิมพ์ค้นหาใน Searchbox
      const searchBox = page.getByRole("searchbox").or(page.locator("input.select2-search__field"));
      if (await searchBox.isVisible().catch(() => false)) {
        await searchBox.fill(searchText);
      }

      // 3. คลิกเลือก Option ที่ตรงกัน
      await page.getByRole("option", { name: searchText, exact: true }).first().click({ force: true });
    }, actionName);
  };


  // --------------------------------------------------------------------------
  // NAVIGATION & INITIALIZATION
  // --------------------------------------------------------------------------

  await page.goto("/admin#/maintenance");

  await safeClick(
    page.getByRole("link", { name: "PM Checklist Result", exact: true }),
    "PM Checklist Result Link"
  );
  await page.waitForTimeout(500);


  // --------------------------------------------------------------------------
  // SEARCH MODAL INITIALIZATION
  // --------------------------------------------------------------------------

  // 1. Open Search Modal
  await safeClick(page.getByTitle("Search"), "Search Button");
  await page.waitForTimeout(500);


  // --------------------------------------------------------------------------
  // SECTION 1: BUSINESS UNIT & LICENSE FILTERS
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

    const searchInput = page.getByRole("textbox", { name: "Search" }).or(page.locator("input[placeholder='Search']"));
    if (await searchInput.isVisible().catch(() => false)) {
      await searchInput.fill(searchData.businessUnitSearch);
    }

    await page.getByRole("treeitem", { name: searchData.businessUnitSearch }).click({ force: true });
    await page.locator("#ddlBusinessUnit .app-allow-icon").first().click({ force: true });
  }, "Select Business Unit Node");


  // 4. License Dropdown (#txtLicense)
  await selectDropdownOption(
    ".app-dropdown-container",
    "#txtLicense",
    searchData.licenseOption,
    "Select License Option"
  );


  // --------------------------------------------------------------------------
  // SECTION 2: DATE SELECTION
  // --------------------------------------------------------------------------

  // 5. Check Date Selection (#dtStartDate / #dtEndDate)
  await tryAction(async () => {
    const today = new Date().getDate();
    const requestedEndDay = parseInt(searchData.checkDateDayEnd, 10);

    // ป้องกันการเลือก End Date เกินวันปัจจุบัน
    const finalEndDay = (!isNaN(requestedEndDay) && requestedEndDay > today)
      ? today.toString()
      : (searchData.checkDateDayEnd === "TODAY" ? today.toString() : searchData.checkDateDayEnd);

    // --- เลือก Start Date (#dtStartDate) ---
    await page.locator(".app-icon-calender").first().click({ force: true });
    await page.locator(".ui-datepicker-calendar").waitFor({ state: "visible", timeout: 3000 }).catch(() => {});
    await page.getByRole("link", { name: searchData.checkDateDayStart, exact: true }).first().click({ force: true });

    await page.waitForTimeout(300);

    // --- เลือก End Date (#dtEndDate) - หากมีช่องเลือกต่างหาก ---
    const endDateCalendar = page.locator("#dtEndDate, .app-icon-calender").nth(1);
    if (await endDateCalendar.isVisible().catch(() => false)) {
      await endDateCalendar.click({ force: true });
      await page.locator(".ui-datepicker-calendar").waitFor({ state: "visible", timeout: 3000 }).catch(() => {});
      await page.getByRole("link", { name: finalEndDay, exact: true }).first().click({ force: true });
    }
  }, "Select Date Range");


  // --------------------------------------------------------------------------
  // SECTION 3: CHECKLIST DETAILS & STATUS
  // --------------------------------------------------------------------------

  // 6. Event / Checklist Type Dropdown (#ddChecklistType)
  await selectDropdownOption(
    ".app-dropdown-container",
    "#ddChecklistType",
    searchData.checklistType,
    "Select Event Type"
  );


  // 7. Configuration / Shift Dropdown (#ddShift)
  await selectDropdownOption(
    ".app-dropdown-container",
    "#ddShift",
    searchData.shiftConfig,
    "Select Shift Configuration"
  );


  // 8. Result Status Dropdown (#ddResult)
  await selectDropdownOption(
    ".app-dropdown-container",
    "#ddResult",
    searchData.resultStatus,
    "Select Result Status"
  );


  // 9. Section Dropdown (#ddSection)
  await selectDropdownOption(
    ".app-dropdown-container",
    "#ddSection",
    searchData.sectionName,
    "Select Section Name"
  );


  // --------------------------------------------------------------------------
  // SECTION 4: MULTI-SELECT ITEM SELECTION
  // --------------------------------------------------------------------------

  // 10. Item Multi-select Dropdown (#ddItem)
  await tryAction(async () => {
    const itemDropdown = page.locator("#ddItem");
    await itemDropdown.click({ force: true });

    for (const itemName of searchData.items) {
      const treeItem = itemDropdown
        .getByRole("treeitem", { name: itemName, exact: true })
        .or(itemDropdown.locator(`li[title='${itemName}'] .jstree-anchor`));

      await treeItem.first().click({ force: true });
    }

    // คลิกปิด Dropdown หลังเลือกครบทุก Item
    await itemDropdown.locator(".app-allow-icon").click({ force: true });
  }, "Select Multi-select Items");


  // --------------------------------------------------------------------------
  // SECTION 5: SUBMIT & CLEANUP
  // --------------------------------------------------------------------------

  // 11. Submit Search
  await safeClick(
    page.locator("button").filter({ hasText: "Search" }),
    "Submit Search Button"
  );
  await page.waitForLoadState("networkidle").catch(() => {});
  await page.waitForTimeout(1000);


  // 12. Clear Search Filters
  await tryAction(async () => {
    await page.getByTitle("Clear").click({ force: true });
  }, "Click Clear Button");


});