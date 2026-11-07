import { test } from "@playwright/test";
import { MultipleEditSection, MultipleEditData } from "./sections/multiple-edit.section";

// กำหนด Test Data ไว้ที่นี่ เพื่อให้แก้ไขชุดข้อมูลใน spec.ts ได้ทีเดียว
export const testMultipleEditData: MultipleEditData = {
  userList: ["010", "100000001"],
  authType: "Form",
  enabled: "No",
  businessUnit: "___TEST",
  groups: ["Auto Test Update", "Cashier", "All Alert"],
  accessibleBusinessUnit: "___TEST",
  expirationDay: "28",
  roles: ["Transporter", "Technician"],
  shiftName: "Night Shift",
};

test("Users - Multiple Edit PostTest", async ({ page }) => {
  const multipleEditSection = new MultipleEditSection(page);

  await test.step("1. เข้าสู่หน้าจัดการ User", async () => {
    await page.goto("/admin#/user");
    await page.waitForLoadState("networkidle");
  });

  await test.step("2. ค้นหาและเลือก Users ในตาราง Search", async () => {
    // ส่ง userList จาก testData เข้าไป
    await multipleEditSection.searchAndSelectUsers(testMultipleEditData.userList);
  });

  await test.step("3. เปิด Modal และทำการแก้ไขข้อมูลทั้งหมด", async () => {
    await page.getByTitle("Multiple Edit").click();
    await page.waitForLoadState("networkidle");

    // ส่งชุดข้อมูล testMultipleEditData ทั้งหมดเข้าไปกรอกใน Form
    await multipleEditSection.fillAllMultipleEditFields(testMultipleEditData);
  });

  await page.getByRole("button", { name: "Cancel" }).click();
});