import { test as setup } from '@playwright/test';

setup('authenticate', async ({ page }) => {
  // await page.goto('https://l2stguat.nostralogistics.com/account/login');
  // await page.getByRole('textbox', { name: 'Username' }).fill('trainee03');
  // await page.getByRole('textbox', { name: 'Password' }).fill('o%6QMauS');

  // await page.goto('https://netcoresql.nostralogistics.com/account/login');
  // await page.getByRole('textbox', { name: 'Username' }).fill('Trainee03');
  // await page.getByRole('textbox', { name: 'Password' }).fill('P@ssw0rd');

  // ===================== PG UAT ========================
  // await page.goto('https://l2.nostralogistics.com/account/login');
  // await page.getByRole('textbox', { name: 'Username' }).fill('Krittayoch.s');
  // await page.getByRole('textbox', { name: 'Password' }).fill('sF_8C?4D');

  // ===================== TIPCO ========================
  // await page.goto('https://tmsprod.tipcoasphalt.com/account/login');
  // await page.getByRole('textbox', { name: 'Username' }).fill('krittayoch');
  // await page.getByRole('textbox', { name: 'Password' }).fill('B:8aYqyA');

  // ===================== Base URL ========================
  await page.goto('/account/login');
  await page.getByRole('textbox', { name: 'Username' }).fill('trainee03');
  await page.getByRole('textbox', { name: 'Password' }).fill('o%6QMauS');

  await page.getByRole('button', { name: 'Login' }).click();

  // Wait until the app redirects away from the login page after a successful login.
  // Adjust this if your app redirects somewhere specific, e.g. '**/#/dashboard'
  await page.waitForURL('**/#/**');

  // Save the logged-in session to disk so other tests can reuse it
  await page.context().storageState({ path: 'auth.json' });
});