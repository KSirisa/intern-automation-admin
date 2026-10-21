import { Page } from "@playwright/test";
import { tryAction, safeClick } from "../../../helpers";

/**
 * Class จัดการตั้งค่าการจัดส่ง (Shipment Configuration Section)
 */
export class ShipmentConfigSection {
  constructor(private page: Page) {}

  /**
   * เปิดเมนู "Shipment Configuration" ฝั่งซ้ายมือ (ถ้ายังไม่ได้เปิด)
   */
  async navigateToShipmentConfig(): Promise<void> {
    const shipmentLink = this.page
      .locator("a", {
        has: this.page.locator("span", {
          hasText: /^Shipment Configuration$/i,
        }),
      })
      .first();

    await safeClick(shipmentLink, "Shipment Configuration SubMenu");

    // State-based waiting: รอจนกว่าช่อง Format จะแสดงผล
    await this.page
      .locator("gisc-ui-textbox[params*='containerJobOrderCodeFormat'] input, #ddReceiptResetType")
      .first()
      .waitFor({ state: "visible", timeout: 5000 })
      .catch(() => {});
  }

  /**
   * ตั้งค่า Shipment Configurations (หมวด Job Order)
   */
  async configureShipment(data: any): Promise<void> {
    await tryAction(async () => {
      // 1. Format (Textbox)
      const formatVal = data.containerJobOrderCodeFormat;
      if (formatVal !== undefined && formatVal !== null) {
        const formatInput = this.page
          .locator("gisc-ui-textbox[params*='containerJobOrderCodeFormat'] input")
          .first();

        await formatInput.waitFor({ state: "visible", timeout: 3000 });
        await formatInput.fill(String(formatVal));
        await formatInput.dispatchEvent("input").catch(() => {});
        await formatInput.dispatchEvent("change").catch(() => {});
      }

      // 2. Reset Type (Dropdown: #ddReceiptResetType)
      const resetType = data.containerJobOrderCodeResetCycle ?? data.containerJobOrderCodeResetType;
      if (resetType) {
        const selectElem = this.page.locator("#ddReceiptResetType").first();

        if (await selectElem.isVisible({ timeout: 2000 }).catch(() => false)) {
          // พยายามเลือก Option ผ่าน Element <select> โดยตรง
          await selectElem.selectOption({ label: resetType }).catch(async () => {
            await selectElem.selectOption(resetType).catch(() => {});
          });
          await selectElem.dispatchEvent("change").catch(() => {});
        } else {
          // สำรอง: คลิกที่ Container Dropdown Custom ของ GISC
          const dropdownTrigger = this.page
            .locator("gisc-ui-dropdown[params*='containerJobOrderCodeResetType'] .app-dropdown-container")
            .first();

          await safeClick(dropdownTrigger, "Reset Type Dropdown");
          const optionItem = this.page
            .locator("option, .app-dropdown-list option, li", {
              hasText: new RegExp(`^\\s*${resetType}\\s*$`, "i"),
            })
            .first();

          await safeClick(optionItem, `Option: ${resetType}`);
        }
      }

      // 3. Year is B.E. (Checkbox)
      const yearIsBE = data.containerJobOrderCodeYearIsBE;
      if (yearIsBE !== undefined && yearIsBE !== null) {
        const cbComponent = this.page
          .locator("gisc-ui-checkbox[params*='containerJobOrderCodeYearIsBE']")
          .or(this.page.locator("gisc-ui-checkbox", { hasText: "Year is B.E." }))
          .first();

        await cbComponent.waitFor({ state: "visible", timeout: 3000 }).catch(() => {});

        const input = cbComponent.locator("input[type='checkbox']").first();
        const isChecked = await input.isChecked().catch(() => false);

        // คลิกเปลี่ยนสถานะเฉพาะเมื่อสถานะปัจจุบันไม่ตรงกับเป้าหมาย
        if (isChecked !== yearIsBE) {
          const clickTarget = cbComponent.locator(".app-control-indicator, label").first();
          await safeClick(clickTarget, "Year is B.E. Checkbox");
        }
      }
    }, "Configure Shipment Section");
  }

  /**
   * บันทึกการตั้งค่า Shipment Configurations
   */
  async submitConfig(): Promise<void> {
    await tryAction(async () => {
      const okBtn = this.page
        .locator("button, a", {
          has: this.page.locator("span", { hasText: /^OK$/i }),
        })
        .last();

      await okBtn.waitFor({ state: "visible", timeout: 3000 });
      await safeClick(okBtn, "Submit Shipment Configuration OK Button");
      await this.page.waitForTimeout(500);
    }, "Submit Shipment Configuration");
  }
}