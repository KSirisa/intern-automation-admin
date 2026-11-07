import { test as setup } from '@playwright/test';
import * as dotenv from 'dotenv';

dotenv.config();

setup('Login Page', async ({ page }) => {
  const username = process.env.TEST_USERNAME || '';
  const password = process.env.TEST_PASSWORD || '';

  if (!username || !password) {
    throw new Error('[Security Alert] Missing TEST_USERNAME or TEST_PASSWORD in .env file!');
  }

  // ===================== Base URL ========================
  await page.goto('/account/login');

  await page.getByRole('textbox', { name: 'Username' }).fill(username);
  await page.getByRole('textbox', { name: 'Password' }).fill(password);

  await page.getByRole('button', { name: 'Login' }).click();

  // รอจนกระทั่ง Redirect เข้าหน้าหลักสำเร็จ
  await page.waitForURL('**/#/**');

  // บันทึก Session ลงไฟล์ auth.json
  await page.context().storageState({ path: 'auth.json' });
});