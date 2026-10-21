import { test, expect } from "@playwright/test";

test("pod setting test", async ({ page }) => {
  //---------- เข้าหน้า FMS เมนู Shipment Management ----------
  await page.goto("/#/shipment");

  //---------- คลิกแถบ Configuration ----------
  await page.getByRole("link", { name: "Configuration", exact: true }).click();
  await page.waitForTimeout(500);

  //---------- คลิกแถบ POD Setting ----------
  await page.getByRole("link", { name: "POD Setting", exact: true }).click();
  await page.waitForTimeout(500);

  await page.getByTitle('Add').click();

  //---------- Checkbox : ตัวแรก ----------
  await page.locator('td > .app-checkBox-contain-dt > .app-checkBox-control-dt > .app-control-dt-indicator').first().click();
  await page.getByRole('button', { name: 'Save' }).click();

  //---------- Button : x (remove) ----------
  await page.locator('.dt-row-remover > .gisc-ui-icon > #Layer_1').first().click();
  await page.getByText('Yes').click();

  await page.pause();
});
