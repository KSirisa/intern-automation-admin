import { test } from "@playwright/test";
import { UserPage } from "./pages/user.page";

test("Users - Comprehensive Create & Configuration RegressionTest", async ({ page }) => {
  test.setTimeout(180000);
  const user = new UserPage(page);

  await test.step("1. Initialize and Fill General Form", async () => {
    await user.navigateAndOpen();
    await user.fillGeneralInfo();
  }); 

  await test.step("2. Configure Business Units & Permissions", async () => {
    await user.selectBusinessUnitTree();
    await user.addUserGroups();
    await user.addAccessibleBusinessUnits();
    await user.setExpirationDate();
    await user.addUserRoles();
    await user.selectShiftConfiguration();
  });

  await test.step("3. Configure Driver Details & Qualifications", async () => {
    await user.configureDriver();
  });

  await test.step("4. Configure Mobile Services", async () => {
    await user.configureMobileServices(); // เรียกใช้เมธอดที่ปรับแก้แล้วจาก UserPage
  });

  await test.step("5. Assign Product Categories", async () => {
    await user.assignProductCategories();
  });

  await test.step("6. Save User and Confirm", async () => {
    // 1. กดปุ่ม Save
    const saveBtn = page.getByRole("button", { name: "Save" }).first();
    await saveBtn.scrollIntoViewIfNeeded().catch(() => {});
    await saveBtn.click();

    // 2. กดปุ่ม OK ใน Modal / Dialog ยืนยันการบันทึก
    const confirmOkBtn = page.getByRole("button", { name: "OK" }).last();
    await confirmOkBtn.waitFor({ state: "visible", timeout: 5000 });
    await confirmOkBtn.click();

    // รอให้ Network ทำงานสำเร็จหลังบันทึก
    await page.waitForLoadState("networkidle").catch(() => {});
  });

});