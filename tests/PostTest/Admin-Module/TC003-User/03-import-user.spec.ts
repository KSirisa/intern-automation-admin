import { test, expect } from "@playwright/test";

test("Users - Import PostTest", async ({ page }) => {

  await page.goto("/admin#/user");
  await page.waitForTimeout(500);
  await page.getByTitle("Import", { exact: true }).click();
  
  await page.getByTitle('Download Template').click();
  const downloadPromise = page.waitForEvent('download');
  await page.getByText('OK').last().click();
  const download = await downloadPromise;

  await page.locator('.file-upload-container input[type="file"]').setInputFiles(
  'tests/PostTes/Admin-Module/TC003-User/data/Import_Users.xlsx'
);
  await page.getByRole('button', { name: 'Cancel' }).last().click();

});
