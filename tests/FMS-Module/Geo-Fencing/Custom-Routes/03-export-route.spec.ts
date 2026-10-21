import { test, expect } from "@playwright/test";

test("geo-fencing test", async ({ page }) => {
  await page.goto("/#/geo-fencing");
  await page.getByRole("link", { name: "Custom Routes", exact: true }).click();
  await page.waitForTimeout(1500); // small buffer before clicking
  await page.getByTitle("Search", { exact: true }).click();
  await page.getByRole("textbox", { name: "Created By" }).click();
  await page.getByRole("textbox", { name: "Created By" }).fill("trainee03");
  await page.locator("button").filter({ hasText: "Search" }).click();

  await page.getByTitle("Export", { exact: true }).click();
  await page.getByText("Yes").click();

  await page.pause();
});
