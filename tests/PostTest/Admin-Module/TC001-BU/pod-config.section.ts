import { Page } from "@playwright/test";
import { tryAction, safeClick } from "../../../helpers";

/**
 * Class จัดการตั้งค่า Proof of Delivery (POD Configurations Section)
 */
export class PODConfigSection {
  constructor(private page: Page) {}

  /**
   * ตั้งค่า POD Configurations ทั้งหมด
   */
  async configurePOD(data: any): Promise<void> {
    await tryAction(async () => {
      // 1. General Checkboxes
      const generalConfigs = [
        {
          value: data.isAllowSelfAssignShipment ?? data.allowSelfAssignShipment,
          text: "Allow Self-Assign Shipment",
          param: "allowSelfAssignShipment",
        },
        {
          value: data.isAllowOverlapShipment ?? data.allowOverlapShipment,
          text: "Allow Overlap Shipments",
          param: "allowOverlapShipment",
        },
        {
          value: data.isAllowAcceptRejectJobByDriver ?? data.allowAcceptRejectJobByDriver,
          text: "Allow Accept/Reject Job",
          param: "allowAcceptRejectJobByDriver",
        },
        {
          value: data.isAllowAppendWaypoint ?? data.allowAppendWaypoint,
          text: "Allow Append Waypoint",
          param: "allowAppendWaypoint",
        },
      ];

      for (const item of generalConfigs) {
        if (item.value) {
          const cbComponent = this.page
            .locator(`gisc-ui-checkbox[params*='${item.param}']`)
            .or(this.page.locator("gisc-ui-checkbox", { hasText: item.text }))
            .first();

          const clickTarget = cbComponent.locator(".app-control-indicator, label").first();
          await safeClick(clickTarget, item.text);
        }
      }

      // Helper สำหรับเลือก Accuracy (Android / iOS) แบบอ่านค่าทั้งหมดก่อนกด (Exact Match)
      const selectAccuracyOption = async (containerClass: "Android" | "iOS", key: string) => {
        if (!key) return;

        const container = this.page.locator(`.${containerClass}`);

        // ถ้าเป็น "All" ให้กดติ๊กทั้งหมดในกลุ่มนั้น
        if (key === "All") {
          const checkboxes = container.locator("gisc-ui-checkbox");
          const count = await checkboxes.count();
          for (let i = 0; i < count; i++) {
            const target = checkboxes.nth(i).locator(".app-control-indicator, label").first();
            await safeClick(target, `${containerClass} Checkbox #${i + 1}`);
          }
          return;
        }

        // 📌 1. วนลูปอ่านรายการทั้งหมดในหมวดนั้นก่อน เพื่อเปรียบเทียบ Exact Match
        const checkboxes = container.locator("gisc-ui-checkbox");
        const count = await checkboxes.count();
        let matched = false;

        for (let i = 0; i < count; i++) {
          const cb = checkboxes.nth(i);
          
          // ดึง span ข้อความที่อยู่ข้างๆ Checkbox ตัวนั้นๆ
          const labelSpan = cb
            .locator("xpath=ancestor::div[contains(@style, 'float')][1]/following-sibling::div[1]//span")
            .or(cb.locator("xpath=following::span[1]"))
            .first();

          const textContent = (await labelSpan.textContent().catch(() => "")) || "";
          
          // ตรวจสอบข้อความแบบ Exact Match (เปรียบเทียบตรงๆ ไม่ใช้ Partial Match)
          if (textContent.trim().toLowerCase() === key.trim().toLowerCase()) {
            const clickTarget = cb.locator(".app-control-indicator, label").first();
            await safeClick(clickTarget, `${containerClass} Accuracy: ${key}`);
            matched = true;
            break;
          }
        }

        // 📌 2. สำรอง: ถ้าวนลูปยังไม่เจอ ให้ใช้ Regex แบบจำกัดขอบเขตจุดเริ่มต้นและจุดสิ้นสุด (^...$)
        if (!matched) {
          const escapedKey = key.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
          const exactSpan = container
            .locator("span")
            .filter({ hasText: new RegExp(`^\\s*${escapedKey}\\s*$`, "i") })
            .first();

          if (await exactSpan.isVisible({ timeout: 2000 }).catch(() => false)) {
            const targetCb = exactSpan
              .locator("xpath=ancestor::div[1]/preceding-sibling::div[.//gisc-ui-checkbox or contains(@style, 'float')][1]")
              .locator("gisc-ui-checkbox")
              .first();

            const clickTarget = targetCb.locator(".app-control-indicator, label").first();
            await safeClick(clickTarget, `${containerClass} Accuracy: ${key}`);
          }
        }
      };

      // 2. Android Location Accuracy
      const androidKey = data.androidLocationAccuracyKey ?? data.androidAccuracyKey;
      if (androidKey) {
        await selectAccuracyOption("Android", androidKey);
      }

      // 3. iOS Location Accuracy
      const iosKey = data.iosLocationAccuracyKey ?? data.iosAccuracyKey;
      if (iosKey) {
        await selectAccuracyOption("iOS", iosKey);
      }

      // 4. Location Updates Inputs
      const minDistance = data.minimumUpdateDistanceMeters ?? data.minimumUpdateDistance;
      if (minDistance !== undefined && minDistance !== null) {
        const input = this.page.locator("#txtMinimumUpdateDistance").first();
        await input.waitFor({ state: "visible", timeout: 3000 });
        await input.fill(String(minDistance));
        await input.dispatchEvent("input").catch(() => {});
        await input.dispatchEvent("change").catch(() => {});
      }

      const minInterval = data.minimumLocationUpdateIntervalSeconds ?? data.minimumLocationUpdateInterval;
      if (minInterval !== undefined && minInterval !== null) {
        const input = this.page.locator("#txMinimumLocationUpdateInterval, #txtMinimumLocationUpdateInterval").first();
        await input.waitFor({ state: "visible", timeout: 3000 });
        await input.fill(String(minInterval));
        await input.dispatchEvent("input").catch(() => {});
        await input.dispatchEvent("change").catch(() => {});
      }

      const intervalUpdated = data.intervalUpdatedLocationSeconds ?? data.intervalUpdatedLocation;
      if (intervalUpdated !== undefined && intervalUpdated !== null) {
        const input = this.page.locator("#txtIntervalUpdatedLocation").first();
        await input.waitFor({ state: "visible", timeout: 3000 });
        await input.fill(String(intervalUpdated));
        await input.dispatchEvent("input").catch(() => {});
        await input.dispatchEvent("change").catch(() => {});
      }
    }, "Configure POD Section");
  }

  /**
   * บันทึกการตั้งค่า POD Configurations
   */
  async submitConfig(): Promise<void> {
    await tryAction(async () => {
      const okBtn = this.page.getByRole("button", { name: "OK" }).last();
      await okBtn.waitFor({ state: "visible", timeout: 3000 });
      await safeClick(okBtn, "Submit POD OK Button");
      await this.page.waitForTimeout(500);
    }, "Submit POD Configuration");
  }
}