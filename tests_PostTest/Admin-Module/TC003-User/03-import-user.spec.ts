import { test, expect } from "@playwright/test";

test("users test", async ({ page }) => {

  await page.goto("/admin#/user");
  await page.waitForTimeout(500);
  await page.getByTitle("Import", { exact: true }).click();
  
  await page.getByTitle('Download Template').click();
  const downloadPromise = page.waitForEvent('download');
  await page.getByText('OK').last().click();
  const download = await downloadPromise;

  await page.locator('.file-upload-container input[type="file"]').setInputFiles(
  'C:\\Users\\4rmxi\\Downloads\\Import_Users.xlsx'
);
//   await page.getByRole('button', { name: 'OK' }).last().click();

  await page.pause();
});
