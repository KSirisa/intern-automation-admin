import { Page } from "@playwright/test";

export interface MultipleEditData {
  userList: string[];
  authType?: string;
  enabled?: string;
  businessUnit?: string;
  groups?: string[];
  accessibleBusinessUnit?: string;
  expirationDay?: string;
  roles?: string[];
  shiftName?: string;
}

export const multipleEditData: MultipleEditData = {
  userList: ["010", "100000001"],
  authType: "Form",
  enabled: "No",
  businessUnit: "___TEST",
  groups: ["Auto Test Update", "Cashier", "All Alert"],
  accessibleBusinessUnit: "___TEST",
  expirationDay: "28",
  roles: ["Transporter", "Technician"],
  shiftName: "Night Shift",
};

export class MultipleEditSection {
  constructor(private page: Page) {}

  /**
   * วนลูปค้นหา User ตามรายชื่อใน List และติ๊กเลือก Checkbox รายคนในตาราง Search หน้าหลัก
   */
  async searchAndSelectUsers(userList: string[] = multipleEditData.userList) {
    const filterInput = this.page.getByPlaceholder(
      "Filter by Username or Email",
    );

    for (const username of userList) {
      await filterInput.waitFor({ state: "visible", timeout: 5000 });
      await filterInput.click();
      await filterInput.fill(username);
      await filterInput.press("Enter");
      await this.page.waitForLoadState("networkidle").catch(() => {});

      const userRow = this.page
        .getByRole("row", { name: new RegExp(username, "i") })
        .first();

      if (await userRow.isVisible({ timeout: 3000 }).catch(() => false)) {
        const checkboxIndicator = userRow
          .locator(".app-control-dt-indicator, .app-checkBox-control-dt, label")
          .first();

        await checkboxIndicator.scrollIntoViewIfNeeded().catch(() => {});

        try {
          await checkboxIndicator.click({ force: true, timeout: 2000 });
        } catch {
          const rawInput = userRow.locator("input[type='checkbox']").first();
          await rawInput.dispatchEvent("click").catch(() => {});
        }
      } else {
        const firstRowIndicator = this.page
          .locator("table tbody tr")
          .first()
          .locator(".app-control-dt-indicator, .app-checkBox-control-dt")
          .first();

        await firstRowIndicator.scrollIntoViewIfNeeded().catch(() => {});
        await firstRowIndicator.click({ force: true }).catch(() => {});
      }
    }
  }

  // Helper สำหรับกด Checkbox ของแต่ละ Control
  private async toggleCheckboxByParam(paramName: string) {
    const container = this.page
      .locator(`gisc-ui-checkbox[params*="${paramName}"]`)
      .first();

    const trigger = container
      .locator("label.app-checkBox-control, .app-control-indicator")
      .first();

    await trigger.scrollIntoViewIfNeeded().catch(() => {});
    await trigger.click({ force: true });
    await this.page.waitForTimeout(300); // รอให้ Focus หรือ UI ปลดล็อก
  }

  // ==========================================
  // Form Actions Using Keyboard Control
  // ==========================================

  // 1. Authentication Type
  async setAuthenticationType(authType = multipleEditData.authType) {
    if (!authType) return;
    await this.toggleCheckboxByParam("isAuthenticationType");
    await this.page.keyboard.press("Tab");
    await this.page.waitForTimeout(200);
    await this.page.keyboard.type(authType);
    await this.page.keyboard.press("Enter");
  }

  // 2. Enable
  async setEnabled(enabled = multipleEditData.enabled) {
    if (!enabled) return;
    await this.toggleCheckboxByParam("isUserEnabled");
    await this.page.keyboard.press("Tab");
    await this.page.waitForTimeout(200);
    await this.page.keyboard.type(enabled);
    await this.page.keyboard.press("Enter");
  }

  // 3. Business Unit
  async setBusinessUnit(treeNode = multipleEditData.businessUnit) {
    if (!treeNode) return;
    await this.toggleCheckboxByParam("isBusinessUnit");
    await this.page.locator("#ddtBusinessUnit").click();
    const searchBox = this.page.getByRole("textbox", { name: "Search" });
    await searchBox.click();
    await searchBox.fill(treeNode);
    await this.page.getByRole("treeitem", { name: treeNode }).click();
  }

  // 4. User Groups
  async addUserGroups(groupNames = multipleEditData.groups) {
    if (!groupNames || groupNames.length === 0) return;
    await this.toggleCheckboxByParam("isUserGroups");

    for (const name of groupNames) {
      const addGroupBtn = this.page.locator(
        'a.inline-cmd[data-bind*="addUserGroup"]',
      );
      await addGroupBtn.click();

      const filterInput = this.page.getByPlaceholder("Filter by Name").last();
      await filterInput.waitFor({ state: "visible" });
      await filterInput.fill(name);

      const targetRow = this.page
        .locator("tbody tr")
        .filter({ has: this.page.getByText(name, { exact: true }) })
        .last();

      await targetRow.locator(".app-control-dt-indicator").click();
      await this.page.getByRole("button", { name: "OK" }).last().click();
    }
  }

  // 5. Accessible Business Units
  async addAccessibleBusinessUnits(
    treeNode = multipleEditData.accessibleBusinessUnit,
  ) {
    if (!treeNode) return;
    await this.toggleCheckboxByParam("isAccessibleBusinessUnits");

    const addBuBtn = this.page.locator(
      'a.inline-cmd[data-bind*="addAccessibleBusinessUnit"]',
    );
    if (await addBuBtn.isVisible().catch(() => false)) {
      await addBuBtn.click();
      await this.page
        .getByLabel("Include Sub Business Units")
        .selectOption({ label: "Yes" });
      await this.page.getByRole("treeitem", { name: treeNode }).click();
      await this.page.getByRole("button", { name: "OK" }).last().click();
    }
  }

  // 6. Expiration Date
  async setExpirationDate(day = multipleEditData.expirationDay) {
    if (!day) return;
    await this.toggleCheckboxByParam("isExpDate");

    // 1. คลิกที่ช่อง Datepicker (ไอดี dtExpDate) เพื่อเปิดปฏิทิน
    const dateInput = this.page.locator("#dtExpDate");
    await dateInput.click({ force: true });
    await this.page.waitForTimeout(300); // รอ popup ปฏิทินแสดงผล

    // 2. เจาะจงเลือกวันที่ในตารางปฏิทิน (ไม่เลือกวันจางๆ ของเดือนก่อน/หลัง)
    const dayCell = this.page
      .locator(
        "#ui-datepicker-div td:not(.ui-datepicker-other-month) a, .ui-datepicker-calendar td:not(.ui-datepicker-other-month) a",
      )
      .filter({ hasText: new RegExp(`^${day}$`) })
      .first();

    await dayCell.waitFor({ state: "visible", timeout: 3000 });
    await dayCell.click({ force: true });
  }

  // 7. User Roles
  async addUserRoles(roleNames = multipleEditData.roles) {
    if (!roleNames || roleNames.length === 0) return;
    await this.toggleCheckboxByParam("isUserRoles");

    const addRoleBtn = this.page.locator(
      'a.inline-cmd[data-bind*="addUserRole"]',
    );
    if (await addRoleBtn.isVisible().catch(() => false)) {
      await addRoleBtn.click();
      for (const name of roleNames) {
        const targetRow = this.page
          .locator("tbody tr:visible")
          .filter({ has: this.page.getByText(name, { exact: true }) })
          .last();
        await targetRow.locator(".app-control-dt-indicator").click();
      }
      await this.page.getByRole("button", { name: "OK" }).last().click();
    }
  }

  // 8. Working Hours (Shift Configuration)
  async setWorkingHours(shiftName = multipleEditData.shiftName) {
    if (!shiftName) return;
    await this.toggleCheckboxByParam("isWorkingHours");
    await this.page.keyboard.press("Tab");
    await this.page.waitForTimeout(200);
    await this.page.keyboard.type(shiftName);
    await this.page.keyboard.press("Enter");
  }

  /**
   * ฟังก์ชันสั้นสำหรับรวบกรอกข้อมูลทุก Field ใน Multiple Edit
   */
  async fillAllMultipleEditFields(data: MultipleEditData = multipleEditData) {
    await this.setAuthenticationType(data.authType);
    await this.setEnabled(data.enabled);
    await this.setBusinessUnit(data.businessUnit);
    await this.addUserGroups(data.groups);
    await this.addAccessibleBusinessUnits(data.accessibleBusinessUnit);
    await this.setExpirationDate(data.expirationDay);
    await this.addUserRoles(data.roles);
    await this.setWorkingHours(data.shiftName);
  }
}
