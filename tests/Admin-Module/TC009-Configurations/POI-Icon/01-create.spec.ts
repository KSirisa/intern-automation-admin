import { test, expect } from "@playwright/test";

test("alert configurations test", async ({ page }) => {
  await page.goto(
    "https://netcoresql.nostralogistics.com/admin#/configuration",
  );
  await page.getByRole("link", { name: "POI Icons", exact: true }).click();

  await page.waitForTimeout(500);
  await page.getByTitle("Create", { exact: true }).click(); // กดครั้งเดียวพอ + ใส่ exact กันชนล่วงหน้า

  await page
    .getByRole("button", { name: "Choose File" })
    .setInputFiles("C:\\Users\\4rmxi\\Downloads\\warehouse.png");

  await page.getByRole("textbox", { name: "Name" }).fill("Warehouse");
  await page.getByRole("button", { name: "Save" }).click();

  //   await page.getByRole('gridcell', { name: 'Warehouse' }).click();
  //   await page.getByTitle('Update').click();
  //   await page.getByRole('textbox', { name: 'Name' }).fill('Warehouse Update');
  //   await page.getByRole('textbox', { name: 'Offset X' }).fill('10');
  //   await page.getByRole('textbox', { name: 'Offset Y' }).fill('10');
  //   await page.getByRole('button', { name: 'Save' }).click();

  //   await page.getByTitle('Delete').click();
  //   await page.getByText('Yes').click();

  await page.pause();
});
