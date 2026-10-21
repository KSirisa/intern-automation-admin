import { expect, test } from "@playwright/test";
import { safeClick, tryAction } from "../../../../helpers";

// ============================================================================
// CONFIG & TEST DATA
// ============================================================================

const searchData = {
  includeSubBU: true,
  businessUnitSearch: "___TEST",
  businessUnitSubNode: "__Warehouse",
  driverSearch: "Krittayoch",
  driverOption: "Krittayoch -Sirisa (EID000036)",
  checkDateDayStart: "1",
  checkDateDayEnd: "TODAY", // หากระบุเกินวันปัจจุบัน ระบบจะเลือกวันปัจจุบันให้อัตโนมัติ
  events: ["ก่อนใช้รถ"],
  configurations: ["รอบเช้า", "รอบดึก", "รอบบ่าย"],
  checklistStatuses: [""],
  driverStatuses: ["Check All"],
  riskLevels: ["Check All"],
};

// ============================================================================
// MAIN TEST SUITE: DRIVER CHECKLIST RESULT SEARCH
// ============================================================================

test("driver checklist test - Search Filter & Modal Controls", async ({
  page,
}) => {
  // --------------------------------------------------------------------------
  // NAVIGATION & INITIALIZATION
  // --------------------------------------------------------------------------

  await page.goto(
    "https://l2stguat.nostralogistics.com/admin#/driver-checklist",
  );

  await safeClick(
    page.getByRole("link", { name: "Driver Checklist Result", exact: true }),
    "Driver Checklist Result Link",
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
    const buDropdown = page.locator("#ddlBusinessUnit");
    await buDropdown.click({ force: true });

    const searchInput = page
      .getByRole("textbox", { name: "Search" })
      .or(page.locator("input[placeholder='Search']"));

    // เลือก Node หลัก
    if (await searchInput.isVisible().catch(() => false)) {
      await searchInput.fill(searchData.businessUnitSearch);
    }
    await page
      .getByRole("treeitem", { name: searchData.businessUnitSearch })
      .click({ force: true });

    // เลือก Sub Node
    if (await searchInput.isVisible().catch(() => false)) {
      await searchInput.fill(searchData.businessUnitSubNode);
    }
    await page
      .getByRole("treeitem", { name: searchData.businessUnitSubNode })
      .click({ force: true });

    await page
      .locator("#ddlBusinessUnit .app-allow-icon")
      .first()
      .click({ force: true });
  }, "Select Business Unit Nodes");

  // 4. Driver Multi-select Dropdown (#txtDriver)
  await tryAction(async () => {
    const driverDropdown = page.locator("#txtDriver");
    await driverDropdown.click({ force: true });

    const searchInput = driverDropdown
      .getByRole("textbox", { name: "Search" })
      .or(page.getByRole("textbox", { name: "Search" }));

    if (await searchInput.isVisible().catch(() => false)) {
      await searchInput.fill(searchData.driverSearch);
    }

    await page
      .getByRole("treeitem", { name: searchData.driverOption })
      .click({ force: true });
    await page.locator("#txtDriver > .app-allow-icon").click({ force: true });
  }, "Select Driver Multi-select Option");

  // --------------------------------------------------------------------------
  // SECTION 2: DATE SELECTION
  // --------------------------------------------------------------------------

  // 5. Check Date Selection (#dtStartDate / #dtEndDate)
  await tryAction(async () => {
    const today = new Date().getDate();
    const requestedEndDay = parseInt(searchData.checkDateDayEnd, 10);

    // ป้องกันการเลือก End Date เกินวันปัจจุบัน
    const finalEndDay =
      !isNaN(requestedEndDay) && requestedEndDay > today
        ? today.toString()
        : searchData.checkDateDayEnd === "TODAY"
          ? today.toString()
          : searchData.checkDateDayEnd;

    // --- เลือก Start Date (#dtStartDate) ---
    await page.locator(".app-icon-calender").first().click({ force: true });
    await page
      .locator(".ui-datepicker-calendar")
      .waitFor({ state: "visible", timeout: 3000 })
      .catch(() => {});
    await page
      .getByRole("link", { name: searchData.checkDateDayStart, exact: true })
      .first()
      .click({ force: true });

    await page.waitForTimeout(300);

    // --- เลือก End Date (#dtEndDate) - หากมีช่องเลือกต่างหาก ---
    const endDateCalendar = page
      .locator("#dtEndDate, .app-icon-calender")
      .nth(1);
    if (await endDateCalendar.isVisible().catch(() => false)) {
      await endDateCalendar.click({ force: true });
      await page
        .locator(".ui-datepicker-calendar")
        .waitFor({ state: "visible", timeout: 3000 })
        .catch(() => {});
      await page
        .getByRole("link", { name: finalEndDay, exact: true })
        .first()
        .click({ force: true });
    }
  }, "Select Date Range");

  // --------------------------------------------------------------------------
  // SECTION 3: CHECKLIST EVENT & CONFIGURATION FILTERS
  // --------------------------------------------------------------------------

  // 6. Event Multi-select Dropdown (#ddEvent)
  await tryAction(async () => {
    const eventDropdown = page.locator("#ddEvent");
    await eventDropdown.click({ force: true });

    for (const eventName of searchData.events) {
      await page
        .getByRole("treeitem", { name: eventName, exact: true })
        .click({ force: true });
    }

    await page.locator("#ddEvent > .app-allow-icon").click({ force: true });
  }, "Select Event Multi-select Items");

  // 7. Configuration Multi-select Dropdown (#ddConfiguration)
  await tryAction(async () => {
    const configDropdown = page.locator("#ddConfiguration");
    await configDropdown.click({ force: true });

    for (const configName of searchData.configurations) {
      await page
        .getByRole("treeitem", { name: configName, exact: true })
        .click({ force: true });
    }

    await page
      .locator("#ddConfiguration > .app-allow-icon")
      .click({ force: true });
  }, "Select Configuration Multi-select Items");

  // --------------------------------------------------------------------------
  // SECTION 4: STATUS & RISK LEVEL FILTERS
  // --------------------------------------------------------------------------

  // 8. Checklist Status Multi-select Dropdown (#ddChecklistStatus)
  await tryAction(async () => {
    // กรองเอาเฉพาะค่าที่ไม่ใช่ string ว่าง
    const validStatuses = searchData.checklistStatuses.filter(
      (s) => s && s.trim() !== "",
    );

    // หากระบุค่าสถานะมา ค่อยทำการเปิด Dropdown และเลือกรายการ
    if (validStatuses.length > 0) {
      const statusDropdown = page.locator("#ddChecklistStatus");
      await statusDropdown.click({ force: true });

      for (const statusName of validStatuses) {
        const searchInput = statusDropdown.locator(
          "#ddChecklistStatusFilterText, input[placeholder='Search']",
        );
        if (await searchInput.isVisible().catch(() => false)) {
          await searchInput.fill(statusName);
        }

        const targetItem = statusDropdown
          .locator(`li[title='${statusName}'] > .jstree-anchor`)
          .or(
            statusDropdown.getByRole("treeitem", {
              name: statusName,
              exact: true,
            }),
          );

        await targetItem.first().waitFor({ state: "visible", timeout: 3000 });
        await targetItem.first().click({ force: true });
      }

      // คลิกปิด Dropdown หลังเลือกครบ
      await statusDropdown.locator(".app-allow-icon").click({ force: true });
    }
    // หากเป็นค่าว่าง [""], [] สคริปต์จะไม่คลิก และปล่อยให้ใช้ค่า Default (Check All) เดิมของหน้าจอ
  }, "Select Checklist Status Options");

// 9. Driver Status Multi-select Dropdown (#ddDriverStatus)
  await tryAction(async () => {
    // กรองเอาเฉพาะค่าที่ไม่ใช่ string ว่าง
    const validStatuses = searchData.driverStatuses.filter(s => s && s.trim() !== "");

    if (validStatuses.length > 0) {
      const driverStatusDropdown = page.locator("#ddDriverStatus");

      // 1. คลิกเปิด Dropdown
      await driverStatusDropdown.click({ force: true });

      // 2. วนลูปเลือกรายการตามที่ระบุใน searchData.driverStatuses
      for (const statusName of validStatuses) {
        // ค้นหาผ่านช่อง Search Input เฉพาะของ ddDriverStatus
        const searchInput = driverStatusDropdown.locator("#ddDriverStatusFilterText, input[placeholder='Search']");
        if (await searchInput.isVisible().catch(() => false)) {
          await searchInput.fill(statusName);
        }

        // เล็งเป้าไปที่ li[title='...'] > .jstree-anchor โดยตรงตาม DOM
        const targetItem = driverStatusDropdown
          .locator(`li[title='${statusName}'] > .jstree-anchor`)
          .or(driverStatusDropdown.getByRole("treeitem", { name: statusName, exact: true }));

        await targetItem.first().waitFor({ state: "visible", timeout: 3000 });
        await targetItem.first().click({ force: true });
      }

      // 3. คลิกปิด Dropdown
      await driverStatusDropdown.locator(".app-allow-icon").click({ force: true });
    }
  }, "Select Driver Status Options");

  // 10. Risk Level Multi-select Dropdown (Optional / Commented Out)

  await tryAction(async () => {
    const riskLevelDropdown = page
      .locator(".app-treeview-dropdown-wrapper.multiselect")
      .filter({ has: page.getByText("High Risk") });

    await riskLevelDropdown.click({ force: true });

    for (const level of searchData.riskLevels) {
      await page
        .getByRole("treeitem", { name: level, exact: true })
        .click({ force: true });
    }

    await riskLevelDropdown.locator(".app-allow-icon").click({ force: true });
  }, "Select Risk Level Options");

  // --------------------------------------------------------------------------
  // SECTION 5: SUBMIT, CLEAR & CANCEL MODAL
  // --------------------------------------------------------------------------

  // 11. Submit Search
  await safeClick(
    page.locator("button").filter({ hasText: "Search" }),
    "Submit Search Button",
  );
  await page.waitForLoadState("networkidle").catch(() => {});
  await page.waitForTimeout(1000);

  // 12. Clear Search Filters
  await tryAction(async () => {
    await page.getByTitle("Clear").click({ force: true });
  }, "Click Clear Button");

  // 13. Cancel Modal
  await safeClick(
    page.getByRole("button", { name: "Cancel" }),
    "Cancel Search Modal Button",
  );

  await page.pause();
});
