import { test, expect } from "@playwright/test";

test("alert configurations test", async ({ page }) => {
  // await page.goto("https://l2stguat.nostralogistics.com/admin#/configuration");
  await page.goto("https://netcoresql.nostralogistics.com/admin#/configuration");

  await page.getByRole("link", { name: "Alerts", exact: true }).click();

  await page.waitForTimeout(500);
  
  await page.getByRole('columnheader', { name: 'Alert Type: activate to sort' }).click();
  await page.getByRole('columnheader', { name: 'Alert Type: activate to sort' }).click();
  await page.getByRole('columnheader', { name: 'Description: activate to sort' }).click();
  await page.getByRole('columnheader', { name: 'Description: activate to sort' }).click();
  await page.getByRole('columnheader', { name: 'Website: activate to sort' }).click();
  await page.getByRole('columnheader', { name: 'Website: activate to sort' }).click();
  await page.getByRole('columnheader', { name: 'Email: activate to sort' }).click();
  await page.getByRole('columnheader', { name: 'Email: activate to sort' }).click();
  await page.getByRole('columnheader', { name: 'SMS: activate to sort column' }).click();
  await page.getByRole('columnheader', { name: 'SMS: activate to sort column' }).click();
  await page.getByRole('columnheader', { name: 'Ticket: activate to sort' }).click();
  await page.getByRole('columnheader', { name: 'Ticket: activate to sort' }).click();
  await page.getByRole('columnheader', { name: 'MDVR: activate to sort column' }).click();
  await page.getByRole('columnheader', { name: 'MDVR: activate to sort column' }).click();
  await page.getByRole('columnheader', { name: 'Report: activate to sort' }).click();
  await page.getByRole('columnheader', { name: 'Report: activate to sort' }).click();
  await page.getByRole('columnheader', { name: 'Line: activate to sort column' }).click();
  await page.getByRole('columnheader', { name: 'Line: activate to sort column' }).click();
  await page.getByRole('columnheader', { name: 'Mobile: activate to sort' }).click();
  await page.getByRole('columnheader', { name: 'Mobile: activate to sort' }).click();
  await page.getByRole('columnheader', { name: 'Priority: activate to sort' }).click();
  await page.getByRole('columnheader', { name: 'Priority: activate to sort' }).click();
  await page.getByRole('columnheader', { name: 'Enable: activate to sort' }).click();
  await page.getByRole('columnheader', { name: 'Enable: activate to sort' }).click();
  await page.locator('.dt-page-size').click();
  await page.getByRole('combobox').selectOption('50');
  await page.locator('.dt-page-size').click();
  await page.getByRole('combobox').selectOption('100');
  await page.locator('.dt-page-size').click();
  await page.getByRole('combobox').selectOption('All');
  await page.locator('.dt-page-size').click();
  await page.getByRole('combobox').selectOption('20');

  await page.pause();
});
