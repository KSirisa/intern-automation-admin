import { defineConfig, devices } from '@playwright/test';
import * as dotenv from 'dotenv';
import path from 'path';

// โหลดตัวแปรสภาพแวดล้อมจากไฟล์ .env
dotenv.config({ path: path.resolve(__dirname, '.env') });

// =========================================================================
//  TARGET BASE URL (ดึงจากไฟล์ .env หากไม่พบจะใช้ค่า Default)
// =========================================================================
<<<<<<< HEAD
const TARGET_BASE_URL = process.env.TARGET_BASE_URL || 'https://netcoresql.nostralogistics.com';
=======

const TARGET_BASE_URL = '';
>>>>>>> 33efda9faaa7f92cac1c44a8a0621e74eaa00f64

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
