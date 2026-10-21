import { test, expect } from "@playwright/test";

test("alert configurations test", async ({ page }) => {
  await page.goto("/admin#/configuration");
  await page.getByRole("link", { name: "Telematics Configuration", exact: true }).click();

  await page.waitForTimeout(500);

  await page.getByRole("link", { name: "Telematics Configuration" }).click();
  await page.locator("#txtValue").click();
  await page.locator("#txtValue").fill("20");
  await page.getByRole("button", { name: "Save" }).click();
  await page.pause();
});
