import { test, expect } from "@playwright/test";

test("alert configurations test", async ({ page }) => {
  await page.goto("/admin#/configuration");
  await page.getByRole("link", { name: "Alerts", exact: true }).click();
  // ------------------------------------ Search ------------------------------------
  await page.waitForTimeout(500);

  await page.getByTitle("Search").click();
  await page.getByRole("combobox").filter({ hasText: /^$/ }).click();
  await page.getByRole("option", { name: "Wide Turn" }).click();
  await page.locator("#ddEnable").selectOption({ label: "Yes" });
  await page.locator("button").filter({ hasText: "Search" }).click();
  
  await page.locator('a').filter({ hasText: 'Clear' }).click();
  await page.locator('button').filter({ hasText: 'Search' }).click();
//   await page.getByRole("gridcell", { name: "Automate" }).click();
//   await page.getByTitle("Delete").click();
//   await page
//     .locator("div[data-bind=\"click:click.bind($data,'yes')\"]")
//     .click();
  await page.pause();
});
