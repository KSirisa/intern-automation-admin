import { Page } from "@playwright/test";
import { tryAction, safeClick } from "../../../helpers";

/**
 * Class จัดการตั้งค่าการซ่อมบำรุง (Maintenance Management Configuration Section)
 */
export class MaintenanceConfigSection {
  constructor(private page: Page) {}

  /**
   * ตั้งค่า Maintenance Management Configurations
   */
  async configureMaintenance(data: any): Promise<void> {
    await tryAction(async () => {
      // Helper ย่อยสำหรับตั้งค่า Checkbox โดยเช็คสถานะปัจจุบันก่อนกด
      const setCheckbox = async (paramKey: string, labelText: string, targetState: boolean | undefined) => {
        if (targetState === undefined || targetState === null) return;

        // ค้นหา gisc-ui-checkbox จาก Knockout params หรือข้อความ Label
        const cbComponent = this.page 
          .locator(`gisc-ui-checkbox[params*='${paramKey}']`)
          .or(this.page.locator("gisc-ui-checkbox", { hasText: labelText }))
          .first();

        await cbComponent.waitFor({ state: "visible", timeout: 5000 }).catch(() => {});

        const input = cbComponent.locator("input[type='checkbox']").first();
        const isChecked = await input.isChecked().catch(() => false);

        // คลิกเปลี่ยนสถานะเฉพาะเมื่อสถานะปัจจุบันไม่ตรงกับค่าใน testData
        if (isChecked !== targetState) {
          const clickTarget = cbComponent.locator(".app-control-indicator, label").first();
          await safeClick(clickTarget, `${labelText} Checkbox`);
        }
      };

      // 1. MMS Checkboxes (From MMS)
      const syncVehicle = data.isSyncVehicleChecklist ?? data.syncVehicleChecklist;
      await setCheckbox("isSyncMileageFromVehicleCheckList", "Vehicle Checklist", syncVehicle);

      const syncPM = data.isSyncPMChecklist ?? data.syncPMChecklist;
      await setCheckbox("isSyncMileageFromPMCheckList", "PM Checklist", syncPM);

      // 2. ePOD Checkboxes (From ePOD)
      const syncStartMileage = data.isSyncStartMileagePhoto ?? data.syncStartMileagePhoto;
      await setCheckbox("isSyncMileageFromStartMileage", "Start Mileage Photo", syncStartMileage);

      const syncEndMileage = data.isSyncEndMileagePhoto ?? data.syncEndMileagePhoto;
      await setCheckbox("isSyncMileageFromEndMileage", "End Mileage Photo", syncEndMileage);

      // 3. Input Tolerance (KM)
      const kmTolerance = data.inputToleranceKilometers ?? data.inputToleranceKm;
      if (kmTolerance !== undefined && kmTolerance !== null) {
        const kmInput = this.page.locator("#txtkm").first();
        await kmInput.waitFor({ state: "visible", timeout: 3000 });
        await kmInput.fill(String(kmTolerance));
        await kmInput.dispatchEvent("input").catch(() => {});
        await kmInput.dispatchEvent("change").catch(() => {});
      }
    }, "Configure Maintenance Section");
  }

  /**
   * บันทึกการตั้งค่า Maintenance Configurations
   */
  async submitConfig(): Promise<void> {
    await tryAction(async () => {
      const okBtn = this.page
        .locator("button, a", {
          has: this.page.locator("span", { hasText: /^OK$/i }),
        })
        .last();

      await okBtn.waitFor({ state: "visible", timeout: 3000 });
      await safeClick(okBtn, "Submit Maintenance Configuration OK Button");
      await this.page.waitForTimeout(500);
    }, "Submit Maintenance Configuration");
  }
}