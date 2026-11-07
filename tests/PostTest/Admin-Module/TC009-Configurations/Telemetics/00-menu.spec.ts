import { test, expect } from "@playwright/test";

test("Configurations Telemetics PostTest", async ({ page }) => {
  await page.goto("/admin#/configuration");
  await page.getByRole("link", { name: "Telematics Configuration", exact: true }).click();

  await page.waitForTimeout(500);

  await page.getByRole("link", { name: "Telematics Configuration" }).click();
  await page.locator("#txtValue").click();
  await page.locator("#txtValue").fill("20");
  await page.getByRole("button", { name: "Cancel" }).click();
});
