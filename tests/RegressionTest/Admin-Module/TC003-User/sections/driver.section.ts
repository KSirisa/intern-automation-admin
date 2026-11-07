import { Page, Locator } from "@playwright/test";

export class DriverSection {
  constructor(private page: Page) {}

  // 🛠️ Helper method ภายในคลาสสำหรับเลือก Dropdown ตาม Label
  private async selectByLabel(
    scope: Page | Locator,
    labelTextOrParam: string,
    optionLabel: string | undefined | null
  ) {
    if (!optionLabel?.trim()) {
      console.log(`[Skip] ไม่มีการใส่ข้อมูล optionLabel สำหรับ "${labelTextOrParam}"`);
      return true;
    }

    const page = "page" in scope ? (scope.page() as Page) : (scope as Page);
    const escapedText = labelTextOrParam.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

    // 📌 ค้นหาเฉพาะภายใน scope ที่ส่งเข้ามาเท่านั้น (ไม่กวาดทั้งหน้า)
    let container = scope
      .locator(`gisc-ui-dropdown[params*="${labelTextOrParam}"], #${labelTextOrParam}`)
      .first();

    if ((await container.count()) === 0) {
      container = scope
        .locator("gisc-ui-dropdown, .form-group, .app-control-container, div")
        .filter({
          has: scope.locator("label").filter({ hasText: new RegExp(`^\\s*${escapedText}`, "i") }),
        })
        .first();
    }

    const select2Trigger = container.locator(".select2-selection, .app-dropdown-container, select").first();
    const dropdownResults = page.locator(".select2-dropdown, .select2-results, .app-dropdown-list").first();

    try {
      await select2Trigger.waitFor({ state: "visible", timeout: 3000 });
      await select2Trigger.click({ force: true });

      const searchInput = page.locator(".select2-search__field, input[type='search']").last();

      if (await searchInput.isVisible({ timeout: 1500 }).catch(() => false)) {
        await searchInput.fill(optionLabel);
        const option = page
          .getByRole("option", { name: optionLabel, exact: false })
          .or(page.locator(".select2-results__option", { hasText: new RegExp(optionLabel, "i") }))
          .first();

        await option.waitFor({ state: "visible", timeout: 3000 });
        await option.click({ force: true });
      } else {
        const popupOption = page
          .locator(".select2-results__option")
          .filter({ hasText: new RegExp(`^\\s*${optionLabel}`, "i") })
          .first();

        if (await popupOption.isVisible({ timeout: 1500 }).catch(() => false)) {
          await popupOption.click({ force: true });
        } else {
          const nativeSelect = container.locator("select").first();
          await nativeSelect.selectOption({ label: optionLabel }).catch(async () => {
            await nativeSelect.selectOption({ value: optionLabel }).catch(() => {});
          });
          await nativeSelect.dispatchEvent("change").catch(() => {});
        }
      }
    } catch (error) {
      console.error(`Select "${optionLabel}" in "${labelTextOrParam}" failed:`, error);
    } finally {
      if (await dropdownResults.isVisible().catch(() => false)) {
        await page.keyboard.press("Escape").catch(() => {});
      }
    }
  }

  // Safe Actions Helper
  private async safeFill(selector: string, value: string) {
    await this.page.locator(selector).fill(value).catch(() => {});
  }

  private async safeClick(selector: string) {
    await this.page.locator(selector).click({ force: true }).catch(() => {});
  }

  private async selectDatePicker(paramName: string, day: string) {
    const container = this.page
      .locator(`gisc-ui-datetime[params*="value: ${paramName}"], gisc-ui-datetime[params*="value:${paramName}"]`)
      .last();

    if (await container.isVisible().catch(() => false)) {
      const calendarIcon = container.locator(".app-icon-calender, .app-datetime-box").first();
      await calendarIcon.click({ force: true }).catch(() => {});

      const dayLink = this.page
        .locator("#ui-datepicker-div:visible, .ui-datepicker-calendar:visible")
        .getByRole("link", { name: day, exact: true })
        .last();

      if (await dayLink.isVisible({ timeout: 3000 }).catch(() => false)) {
        await dayLink.click().catch(() => {});
      } else {
        const input = container.locator("input.hasDatepicker").first();
        await input.evaluate((el: HTMLInputElement, dateValue: string) => {
          el.removeAttribute("readonly");
          el.value = dateValue;
          el.dispatchEvent(new Event("input", { bubbles: true }));
          el.dispatchEvent(new Event("change", { bubbles: true }));
        }, `${day.padStart(2, "0")}/09/2026`).catch(() => {});
      }
    }
  }

  async configureDriver(data: any) {
    const driverLink = this.page.getByRole("link", { name: "Drivers" });
    if (await driverLink.isVisible().catch(() => false)) {
      await driverLink.click().catch(() => {});

      // Basic Profile (Safe Fill)
      await this.page.getByRole("textbox", { name: "Employee ID" }).fill(data.employeeId).catch(() => {});
      await this.page.getByRole("textbox", { name: "National Id" }).fill(data.nationalId).catch(() => {});
      await this.page.locator("#ddGendere").selectOption({ label: data.gender }).catch(() => {});
      await this.page.getByRole("textbox", { name: "Minimum Rest Time (minutes)" }).fill(data.minRestTime).catch(() => {});
      await this.page.getByRole("textbox", { name: "Description ADR Driver" }).fill(data.adrDesc).catch(() => {});

      const trainerSelect = this.page.locator("select").filter({
        has: this.page.locator("option", { hasText: new RegExp(`^${data.trainer}$`) }),
      });
      if (await trainerSelect.isVisible().catch(() => false)) {
        await trainerSelect.selectOption({ label: data.trainer }).catch(() => {});
      }

      // Sub Sections
      await this.addLicense(data);
      await this.addPassport(data);
      await this.addADR(data);
      await this.addCertificate(data);

      // Save Main Driver Tab
      await this.page.getByRole("button", { name: "OK" }).last().click({ force: true }).catch(() => {});
    }
  }

    private async addLicense(data: any) {
    const addLicenseBtn = this.page.locator('a[data-bind*="addDriverCard"], a[data-bind*="addLicense"]');
    
    // เช็กว่ามีปุ่มให้กดหรือไม่ก่อนเริ่มทำงาน
    if (await addLicenseBtn.isVisible().catch(() => false)) {
      await addLicenseBtn.click();

      // เลือก Card Type & Card ID
      if (data.cardType) {
        await this.page.getByLabel("Card Type").last().selectOption({ label: data.cardType });
      }
      if (data.cardId) {
        await this.page.getByRole("textbox", { name: "Card ID" }).last().fill(data.cardId);
      }

      // เลือก Dropdowns ตาม Label บน UI
      if (data.licenseClass) {
        await this.selectByLabel(this.page, "License Class", data.licenseClass);
      }
      if (data.country) {
        await this.selectByLabel(this.page, "Country", data.country);
      }
      if (data.province) {
        await this.selectByLabel(this.page, "Province", data.province);
      }

      // เลือก License Type 
      if (data.licenseType) {
        await this.page.locator('select#ddLicenseType:not([aria-hidden="true"])').selectOption({ label: data.licenseType });
      }

      // เลือกวันที่ (รับจาก data หรือใช้ค่า default ถ้าไม่มีส่งมา)
      await this.selectDatePicker("issueDate", data.issueDate || "1");
      await this.selectDatePicker("expireDate", data.expireDate || "28");

      // ยืนยันการบันทึก
      await this.page.getByRole("button", { name: "OK" }).last().click();
    }
  }

  private async addPassport(data: any) {
    const passportAddBtn = this.page.locator('a[data-bind*="addPassportInformation"]');
    if (await passportAddBtn.isVisible().catch(() => false)) {
      await passportAddBtn.click().catch(() => {});
      await this.page.getByRole("textbox", { name: "Passport No." }).last().fill(data.passportNo).catch(() => {});
      await this.selectDatePicker("issueDate", "1");
      await this.selectDatePicker("expireDate", "28");
      await this.page.getByRole("button", { name: "OK" }).last().click().catch(() => {});
    }
  }

  private async addADR(data: any) {
    const adrAddBtn = this.page.locator('a[data-bind*="addADRDriver"]');
    if (await adrAddBtn.isVisible().catch(() => false)) {
      await adrAddBtn.click().catch(() => {});
      await this.page.getByRole("textbox", { name: "ADR No." }).last().fill(data.adrNo).catch(() => {});
      await this.selectDatePicker("issueDate", "1");
      await this.selectDatePicker("expireDate", "28");
      await this.page.getByRole("button", { name: "OK" }).last().click().catch(() => {});
    }
  }

  private async addCertificate(data: any) {
    const certAddBtn = this.page.locator('a[data-bind*="addCertificateItem"]');
    if (await certAddBtn.isVisible().catch(() => false)) {
      await certAddBtn.click().catch(() => {});
      const targetCert = data.certificateName || "1";
      
      // 📌 เรียกใช้งานผ่าน this.selectByLabel ภายในคลาส
      await this.selectByLabel(this.page, "certificate", targetCert);

      await this.selectDatePicker("startDate", "1");
      await this.selectDatePicker("endDate", "28");

      const enableSelect = this.page.locator("select#ddlEnable").last();
      if (await enableSelect.isVisible().catch(() => false)) {
        await enableSelect.selectOption({ label: "Yes" }).catch(() => {});
      }

      await this.page.getByRole("button", { name: "OK" }).last().click().catch(() => {});
    }
  }
}