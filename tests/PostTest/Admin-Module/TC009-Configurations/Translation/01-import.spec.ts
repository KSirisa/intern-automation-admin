import { test, expect } from "@playwright/test";


export interface TranslationTestData {
  language: string;
  category: string;
  importLanguage: string;
  importCategory: string;
  importFilePath: string;
  exportLanguage: string;
  exportCategory: string;
}

export const translationTestData: TranslationTestData = {
  language: "Thai (Thailand)",
  category: "Job Status",
  importLanguage: "Thai (Thailand)",
  importCategory: "Job Status",
  importFilePath:
    "tests/Admin-Module/TC009-Configurations/Translation/Data/Translation_JobStatus.xlsx",
  exportLanguage: "Thai (Thailand)",
  exportCategory: "Job Waypoint Status",
};


test("Configurations - Translation PostTest", async ({ page }) => {
  const data = translationTestData;

  await page.goto("/admin#/configuration");
  await page.getByRole("link", { name: "Translation", exact: true }).click();

  await page.waitForTimeout(500);
  await page
    .getByLabel("Language", { exact: true })
    .selectOption({ label: data.language });
  await page.getByLabel("Category").selectOption({ label: data.category });
  await page.getByRole("button", { name: "Find" }).click();

  // Import Section
  await page.getByTitle("Import").click();
  await page
    .locator("#ddLanguageImport")
    .selectOption({ label: data.importLanguage });
  await page
    .locator("#ddCategoryImport")
    .selectOption({ label: data.importCategory });
  await page.locator("label").filter({ hasText: "Override" }).click();
  await page
    .getByRole("button", { name: "Choose File" })
    .setInputFiles(data.importFilePath);

  await page.getByRole("button", { name: "Cancel" }).click();

  // Export Section
  await page.getByTitle("Export").click();
  await page
    .locator("#ddLanguageExport")
    .selectOption({ label: data.exportLanguage });
  await page
    .locator("#ddCategoryExport")
    .selectOption({ label: data.exportCategory });
  const downloadPromise = page.waitForEvent("download");
  await page.getByRole("button", { name: "OK" }).click();
  const download = await downloadPromise;
});