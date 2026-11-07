import { test as setup } from '@playwright/test';

setup('Login Page', async ({ page }) => {

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