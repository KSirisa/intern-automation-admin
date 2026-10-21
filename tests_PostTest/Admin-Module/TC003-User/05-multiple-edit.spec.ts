import { test } from "@playwright/test";
import { MultipleEditSection } from "./sections/multiple-edit.section";

test("TC003-User: Multiple Edit Test", async ({ page }) => {
  const multipleEditSection = new MultipleEditSection(page);

  await test.step("1. เข้าสู่หน้าจัดการ User", async () => {
    await page.goto("/admin#/user");
    await page.waitForLoadState("networkidle");
  });

  await test.step("2. ค้นหาและเลือก Users ในตาราง Search", async () => {
    await multipleEditSection.searchAndSelectUsers();
  });

  await test.step("3. เปิด Modal และทำการแก้ไขข้อมูลทั้งหมด", async () => {
    await page.getByTitle("Multiple Edit").click();
    await page.waitForLoadState("networkidle");

    // รวบทำทุกอย่างในคำสั่งเดียว (Toggle Checkbox + Select Data)
    await multipleEditSection.fillAllMultipleEditFields();

    await page.pause();
  });
  // ------------ For Regression Test -----------------
  // await page.getByRole('button', { name: 'Save' }).click();

});