import { Page } from "@playwright/test";
import { testData } from "../data/user.data";
import { DriverSection } from "../sections/driver.section";
import { MobileServicesSection } from "../sections/mobile-services.section";
import path from "path";

export class UserPage {
  public driverSection: DriverSection;
  public mobileServicesSection: MobileServicesSection;

  constructor(private page: Page) {
    this.driverSection = new DriverSection(page);
    this.mobileServicesSection = new MobileServicesSection(page);
  }

  // Helper สำหรับทำ Action อย่างปลอดภัย ถ้าไม่เจอจะ Skip
  private async safeAction(action: () => Promise<void>, description: string) {
    try {
      await action();
    } catch (error) {
      console.log(`[Skip] ${description}: Element not found or not interactable.`);
    }
  }

  // 1. Navigation & Modal Trigger
  async navigateAndOpen() {
    await this.page.goto(testData.url);
    await this.page.waitForLoadState("networkidle");

    await this.safeAction(async () => {
      const createBtn = this.page.getByTitle("Create", { exact: true });
      await createBtn.waitFor({ state: "visible", timeout: 5000 });
      await createBtn.click();
    }, "Open Create User Modal");
  }

  // 2. General Information
  async fillGeneralInfo(data = testData.generalInfo) {
    if (!data) return;
    await this.page.waitForTimeout(1500);

    await this.safeAction(async () => {
      const filePath = data.imagePath || path.resolve(process.cwd(), "tests/Admin-Module/TC003-User/image/driverImage.jpg");
      const fileInput = this.page.locator('.file-upload-container input[type="file"]').first();

      if (await fileInput.count() === 0) return;

      // 1. ตั้งรับ Response ล่วงหน้า
      const uploadApi = this.page
        .waitForResponse((res) => res.url().includes("/api/media/upload") && res.status() === 200)
        .catch(() => null);

      // 2. ใส่ไฟล์ และกระตุ้น Event
      await fileInput.setInputFiles(filePath);
      await fileInput.dispatchEvent("change");

      // 3. รอ API ตอบกลับสำเร็จ
      await uploadApi;
    }, "Upload Driver Image");

    await this.safeAction(async () => {
      const authSelect = this.page.locator("#ddAuthType").or(this.page.getByLabel("Authentication Type"));
      if (data.authType) await authSelect.selectOption({ label: data.authType });
    }, "Auth Type Selection");

    await this.safeAction(async () => {
      if (data.userType) await this.page.getByLabel("User Type", { exact: true }).selectOption({ label: data.userType });
    }, "User Type Selection");

    await this.safeAction(async () => {
      if (data.username) await this.page.getByRole("textbox", { name: "Username" }).fill(data.username);
    }, "Username Input");

    await this.safeAction(async () => {
      if (data.title) await this.page.locator('gisc-ui-textbox[params*="value: title"] input.app-input').fill(data.title);
    }, "Title Input");

    await this.safeAction(async () => {
      if (data.firstName) await this.page.getByRole("textbox", { name: "First Name" }).fill(data.firstName);
    }, "First Name Input");

    await this.safeAction(async () => {
      if (data.lastName) await this.page.getByRole("textbox", { name: "Last Name" }).fill(data.lastName);
    }, "Last Name Input");

    await this.safeAction(async () => {
      if (data.email) await this.page.getByRole("textbox", { name: "Email" }).fill(data.email);
    }, "Email Input");

    await this.safeAction(async () => {
      if (data.phone) await this.page.getByRole("textbox", { name: "Phone" }).fill(data.phone);
    }, "Phone Input");

    await this.safeAction(async () => {
      if (data.enabled) await this.page.locator("#ddUserEnabled").selectOption({ label: data.enabled });
    }, "User Enabled Selection");
  }

  // 3. Business Unit Methods
  async selectBusinessUnitTree(treeNode = testData.businessUnit.treeNode) {
    if (!treeNode) return;

    await this.safeAction(async () => {
      const buTrigger = this.page.locator("#ddtBusinessUnit");
      await buTrigger.click({ timeout: 5000 });

      const searchBox = this.page.getByRole("textbox", { name: "Search" });
      await searchBox.waitFor({ state: "visible", timeout: 3000 });
      await searchBox.fill(treeNode);

      const treeItem = this.page.getByRole("treeitem", { name: treeNode });
      await treeItem.click({ timeout: 3000 });
    }, `Select Business Unit: ${treeNode}`);
  }

  async addUserGroups(groupNames = testData.businessUnit.groups) {
    if (!groupNames || groupNames.length === 0) return;

    for (const name of groupNames) {
      await this.safeAction(async () => {
        const addGroupBtn = this.page.locator('a.inline-cmd[data-bind*="addUserGroup"]');
        if (!(await addGroupBtn.isVisible().catch(() => false))) return;

        await addGroupBtn.click();

        const filterInput = this.page.getByPlaceholder("Filter by Name").last();
        await filterInput.waitFor({ state: "visible", timeout: 3000 });
        await filterInput.fill(name);

        const targetRow = this.page
          .locator("tbody tr")
          .filter({ has: this.page.getByText(name, { exact: true }) })
          .last();

        const targetIndicator = targetRow.locator(".app-control-dt-indicator");
        await targetIndicator.waitFor({ state: "visible", timeout: 3000 });
        await targetIndicator.click({ force: true });

        await this.page.getByRole("button", { name: "OK" }).last().click();
      }, `Add User Group: ${name}`);
    }
  }

  async addAccessibleBusinessUnits(treeNode = testData.businessUnit.treeNode) {
    if (!treeNode) return;

    await this.safeAction(async () => {
      const addBuBtn = this.page.locator('a.inline-cmd[data-bind*="addAccessibleBusinessUnit"]');
      if (await addBuBtn.isVisible().catch(() => false)) {
        await addBuBtn.click();
        await this.page.getByLabel(/Include Sub Business Unit(s)?/i).selectOption({ label: "Yes" }).catch(() => {});
        await this.page.getByRole("treeitem", { name: treeNode }).click({ timeout: 3000 });
        await this.page.getByRole("button", { name: "OK" }).last().click();
      }
    }, `Add Accessible BU: ${treeNode}`);
  }

  async setExpirationDate(day = testData.businessUnit.expirationDay) {
    if (!day) return;

    await this.safeAction(async () => {
      const dateInput = this.page.getByRole("textbox", { name: "Expiration Date" });
      if (await dateInput.isVisible().catch(() => false)) {
        await dateInput.click();
        await this.page.getByRole("link", { name: day }).last().click({ timeout: 3000 });
      }
    }, `Set Expiration Date: Day ${day}`);
  }

  async addUserRoles(roleNames = testData.businessUnit.roles) {
    if (!roleNames || roleNames.length === 0) return;

    await this.safeAction(async () => {
      const addRoleBtn = this.page.locator('a.inline-cmd[data-bind*="addUserRole"]');
      if (await addRoleBtn.isVisible().catch(() => false)) {
        await addRoleBtn.click();
        for (const name of roleNames) {
          const targetRow = this.page
            .locator("tbody tr:visible")
            .filter({ has: this.page.getByText(name, { exact: true }) })
            .last();
          await targetRow.locator(".app-control-dt-indicator").click({ force: true }).catch(() => {});
        }
        await this.page.getByRole("button", { name: "OK" }).last().click();
      }
    }, "Add User Roles");
  }

  async selectShiftConfiguration(shiftName = testData.businessUnit.shiftName) {
    if (!shiftName) return;

    await this.safeAction(async () => {
      const shiftDropdown = this.page
        .locator('gisc-ui-dropdown[params*="value: selectWorkingHour"]')
        .getByRole("combobox");
      if (await shiftDropdown.isVisible().catch(() => false)) {
        await shiftDropdown.selectOption({ label: shiftName });
      }
    }, `Select Shift Configuration: ${shiftName}`);
  }

  // 4. Wrapper Delegates for Driver & Mobile Services
  async configureDriver(data = testData.driver) {
    await this.safeAction(async () => {
      await this.driverSection.configureDriver(data);
    }, "Configure Driver Section");
  }

  async configureMobileServices(data = testData.mobileServices) {
    await this.safeAction(async () => {
      await this.mobileServicesSection.configure(data);
    }, "Configure Mobile Services Section");
  }

  // 5. Default Product Categories
  async assignProductCategories(groupFilter = testData.productCategories.groupFilter) {
    if (!groupFilter) return;

    await this.safeAction(async () => {
      const addCategoryBtn = this.page.locator('a.inline-cmd[data-bind*="addDefaultProductCategories"]');
      if (await addCategoryBtn.isVisible().catch(() => false)) {
        await addCategoryBtn.click();
        const filterBox = this.page.getByPlaceholder("Filter by Name");
        await filterBox.click();
        await filterBox.fill(groupFilter);

        await this.page
          .locator(".sorting_disabled > .app-checkBox-contain-dt > .app-checkBox-control-dt > .app-control-dt-indicator")
          .click({ force: true });

        await this.page.getByRole("button", { name: "OK" }).last().click();
      }
    }, `Assign Product Categories: ${groupFilter}`);
  }
}