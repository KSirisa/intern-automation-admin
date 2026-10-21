import { test, expect } from "@playwright/test";

test("users test", async ({ page }) => {
  await page.goto("/admin#/user");

  

  await page.waitForTimeout(500);
  await page.getByTitle("Export", { exact: true }).click();
  
  await page.locator('label').filter({ hasText: 'Include Business Unit' }).click();
  await page.locator('label').filter({ hasText: 'Include Accessible Business' }).click();
  await page.locator('label').filter({ hasText: 'Include Driver' }).click();
  await page.locator('label').filter({ hasText: 'Include Mobile Service' }).click();
  const downloadPromise = page.waitForEvent('download');
  await page.getByRole('button', { name: 'OK' }).last().click();
  const download = await downloadPromise;

  await page.pause();
});