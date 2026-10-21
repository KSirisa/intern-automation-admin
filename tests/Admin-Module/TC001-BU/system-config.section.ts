import { Page } from "@playwright/test";
import { tryAction, safeClick } from "../../../helpers";

/**
 * Class จัดการตั้งค่าระบบทั่วไป (System Configuration Section)
 */
export default class SystemConfigSection {
  constructor(private page: Page) {}

  /**
   * เปิดเมนู "System Configuration" ฝั่งซ้ายมือ (ถ้ายังไม่ได้เปิด)
   */
  async navigateToSystemConfig(): Promise<void> {
    const systemLink = this.page
      .locator("a", {
        has: this.page.locator("span", {
          hasText: /^System Configuration$/i,
        }),
      })
      .first();

    await safeClick(systemLink, "System Configuration SubMenu");

    // State-based waiting: รอจนกว่าฟอร์ม System จะเรนเดอร์สำเร็จ
    await this.page
      .locator("#referenceCode1, gisc-ui-checkbox[params*='viewEventVideoOnCloud']")
      .first()
      .waitFor({ state: "visible", timeout: 5000 })
      .catch(() => {});
  }

  /**
   * ตั้งค่า System Configuration ทั้งหมด
   */
  async configureSystem(data: any): Promise<void> {
    await tryAction(async () => {
      // Helper สำหรับกรอก Text Input + Trigger Events
      const fillTextInput = async (selector: string, value: any, labelName: string) => {
        if (value !== undefined && value !== null) {
          const input = this.page.locator(selector).first();
          await input.waitFor({ state: "visible", timeout: 3000 }).catch(() => {});
          
          if (await input.isVisible().catch(() => false)) {
            await input.fill(String(value));
            await input.dispatchEvent("input").catch(() => {});
            await input.dispatchEvent("change").catch(() => {});
          }
        }
      };

      // Helper สำหรับตั้งค่า Checkbox โดยเช็คสถานะปัจจุบันก่อนกด
      const setCheckbox = async (paramKey: string, labelText: string, targetState: boolean | undefined) => {
        if (targetState === undefined || targetState === null) return;

        const cbComponent = this.page
          .locator(`gisc-ui-checkbox[params*='${paramKey}']`)
          .or(this.page.locator("gisc-ui-checkbox", { hasText: labelText }))
          .first();

        await cbComponent.waitFor({ state: "visible", timeout: 3000 }).catch(() => {});

        const input = cbComponent.locator("input[type='checkbox']").first();
        const isChecked = await input.isChecked().catch(() => false);

        // คลิกเปลี่ยนสถานะเฉพาะเมื่อสถานะปัจจุบันไม่ตรงกับค่าเป้าหมาย
        if (isChecked !== targetState) {
          const clickTarget = cbComponent.locator(".app-control-indicator, label").first();
          await safeClick(clickTarget, `${labelText} Checkbox`);
        }
      };

      // 1. Reference Code Textboxes (1-3)
      const ref1 = data.systemReferenceCode1 ?? data.referenceCode1;
      await fillTextInput("#referenceCode1", ref1, "Reference Code 1");

      const ref2 = data.systemReferenceCode2 ?? data.referenceCode2;
      await fillTextInput("#referenceCode2", ref2, "Reference Code 2");

      const ref3 = data.systemReferenceCode3 ?? data.referenceCode3;
      await fillTextInput("#referenceCode3", ref3, "Reference Code 3");

      // 2. View Event Video On Cloud Checkbox
      const isViewEvent = data.isViewEventVideoOnCloudEnabled ?? data.viewEventVideoOnCloud;
      await setCheckbox("viewEventVideoOnCloud", "View Event Video On Cloud", isViewEvent);

      // 3. Ignore View Event Video On Cloud Checkbox
      const isIgnoreViewEvent = data.isIgnoreViewEventVideoOnCloudEnabled ?? data.ignoreViewEventVideoOnCloud;
      await setCheckbox("ignoreViewEventVideoOnCloud", "Ignore View Event Video On Cloud", isIgnoreViewEvent);
    }, "Configure System Section");
  }

  /**
   * บันทึกการตั้งค่า System Configuration
   */
  async submitConfig(): Promise<void> {
    await tryAction(async () => {
      const okBtn = this.page
        .locator("button, a", {
          has: this.page.locator("span", { hasText: /^OK$/i }),
        })
        .last();

      await okBtn.waitFor({ state: "visible", timeout: 3000 });
      await safeClick(okBtn, "Submit System Configuration OK Button");
      await this.page.waitForTimeout(500);
    }, "Submit System Configuration");
  }
}