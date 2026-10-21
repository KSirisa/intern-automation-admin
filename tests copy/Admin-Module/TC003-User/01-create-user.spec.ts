import { test } from "@playwright/test";
import { UserPage } from "./pages/user.page";

test("Users - Comprehensive Create & Configuration Test", async ({ page }) => {
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
  await page.pause();
});