import { Page } from "@playwright/test";

export class MobileServicesSection {
  constructor(private page: Page) {}

  async configure(data: any) {
    const mobileServicesLink = this.page.getByRole("link", { name: "Mobile Services" });

    if (await mobileServicesLink.isVisible().catch(() => false)) {
      await mobileServicesLink.click().catch(() => {});

      // Fill Textboxes (Safe Fill)
      await this.page.locator("#txtStopDuration").fill(data.stopDuration).catch(() => {});
      await this.page.locator("#txtOverSpeedDelay").fill(data.overSpeedDelay).catch(() => {});

      const clickCheckbox = async (paramName: string) => {
        const cb = this.page
          .locator(`gisc-ui-checkbox[params*="${paramName}"] .app-checkBox-control, label:has(input[data-bind*="${paramName}"])`)
          .first();
        if (await cb.isVisible().catch(() => false)) {
          await cb.click({ force: true }).catch(() => {});
        }
      };

      await clickCheckbox("allowScanUnassignSMDO");
      await clickCheckbox("startJobInBeginWaypointOnly");
      await clickCheckbox("finishJobInEndWaypointOnly");
      await clickCheckbox("checkInInWaypointOnly");
      await clickCheckbox("forceCheckin");

      // Log Out Options
      await clickCheckbox("logoutOption");
      const radioLogout1 = this.page.locator('label.control-radio:has-text("Disable Log Out")').first();
      const radioLogout2 = this.page.locator('label.control-radio:has-text("Disable Log Out only Working Hour")').first();
      if (await radioLogout1.isVisible({ timeout: 2000 }).catch(() => false)) {
        await radioLogout1.click({ force: true }).catch(() => {});
        await radioLogout2.click({ force: true }).catch(() => {});
      }

      // Tracking Options
      await clickCheckbox("trackingOption");
      const radioTracking1 = this.page.locator('label.control-radio:has-text("Always Tracking")').first();
      const radioTracking2 = this.page.locator('label.control-radio:has-text("Tracking only Working Hour")').first();
      if (await radioTracking1.isVisible({ timeout: 2000 }).catch(() => false)) {
        await radioTracking1.click({ force: true }).catch(() => {});
        await radioTracking2.click({ force: true }).catch(() => {});
      }

      // Save/OK Button
      await this.page.getByRole("button", { name: "OK" }).last().click({ force: true }).catch(() => {});
    }
  }
}