import { defineConfig, devices } from '@playwright/test';

// =========================================================================
//  TARGET BASE URL (แก้ไข URL หลักสำหรับการรันเทสได้ที่นี่)
// =========================================================================

const TARGET_BASE_URL = '';

export default defineConfig({
  // === 1. General Configuration ===
  testDir: './',
  timeout: 90000,
  fullyParallel: false,
  workers: 1,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,

  // === 2. Reporters Configuration ===
  reporter: [
    [
      'html', 
      { 
        open: 'always',
        host: '127.0.0.1',
        port: 0, // 0 หมายถึงให้ Playwright สุ่ม Port ที่ว่างให้อัตโนมัติ
      }
    ],
    ['allure-playwright'],
  ],

  // === 3. Shared Options for All Projects ===
  use: {
    baseURL: TARGET_BASE_URL, // อ้างอิงจากตัวแปรด้านบนสุด
    headless: false,
    trace: 'on',
    screenshot: 'on',
    video: 'on',
    permissions: [],
    launchOptions: {
      slowMo: 400,
    },
  },

  // === 4. Test Projects Setup ===
  projects: [
    {
      name: 'setup',
      testMatch: /auth\.setup\.ts$/,
    },
    {
      name: 'regression',
      testDir: './tests/RegressionTest',
      use: {
        ...devices['Desktop Chrome'],
        storageState: 'auth.json',
      },
      dependencies: ['setup'],
    },
    {
      name: 'posttest',
      testDir: './tests/PostTest',
      use: {
        ...devices['Desktop Chrome'],
        storageState: 'auth.json',
      },
      dependencies: ['setup'],
    },
  ],
});
