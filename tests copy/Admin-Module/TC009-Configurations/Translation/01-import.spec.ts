import { test, expect } from "@playwright/test";

test("alert configurations test", async ({ page }) => {
  await page.goto(
    "https://netcoresql.nostralogistics.com/admin#/configuration",
  );
  await page.getByRole("link", { name: "Translation", exact: true }).click();

  await page.waitForTimeout(500);
  await page
    .getByLabel("Language", { exact: true })
    .selectOption({ label: "Thai (Thailand)" });
  await page.getByLabel("Category").selectOption({ label: "Job Status" });
  await page.getByRole("button", { name: "Find" }).click();

  await page.getByTitle("Import").click();
  await page
    .locator("#ddLanguageImport")
    .selectOption({ label: "Thai (Thailand)" });
  await page.locator("#ddCategoryImport").selectOption({ label: "Job Status" });
  await page.locator("label").filter({ hasText: "Override" }).click();
  await page
    .getByRole("button", { name: "Choose File" })
    .setInputFiles("C:\\Users\\4rmxi\\Downloads\\Translation_JobStatus.xlsx");

  await page.getByRole("button", { name: "OK" }).click();

  await page.getByTitle("Export").click();
  await page
    .locator("#ddLanguageExport")
    .selectOption({ label: "Thai (Thailand)" });
  await page
    .locator("#ddCategoryExport")
    .selectOption({ label: "Job Waypoint Status" });
  const downloadPromise = page.waitForEvent("download");
  await page.getByRole("button", { name: "OK" }).click();
  const download = await downloadPromise;

  await page.pause();
});
