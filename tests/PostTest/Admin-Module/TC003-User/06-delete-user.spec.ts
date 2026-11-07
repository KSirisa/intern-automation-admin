import { test, expect } from "@playwright/test";

test("Users - Delete User PostTest", async ({ page }) => {
  const targetUsername = "arm000036";

  await test.step("1. เข้าสู่หน้าจัดการ User", async () => {
    await page.goto("/admin#/user");
    await page.waitForLoadState("networkidle");
  });

  await test.step("2. ค้นหาและเลือก User ที่ต้องการลบ", async () => {
    const filterInput = page.getByPlaceholder("Filter by Username or Email");
    await filterInput.waitFor({ state: "visible" });
    await filterInput.click();
    await filterInput.fill(targetUsername);
    await filterInput.press("Enter");

    // รอให้ตารางโหลดข้อมูลจากการกรอง
    await page.waitForLoadState("networkidle").catch(() => {});

    // เจาะจงหา Row ที่ตรงกับ Username และติ๊กเลือก Checkbox ใน Row นั้น
    const userRow = page
      .getByRole("row", { name: new RegExp(targetUsername, "i") })
      .first();

    const checkboxIndicator = userRow
      .locator(".app-control-dt-indicator, .app-checkBox-control-dt, label")
      .first();

    await checkboxIndicator.waitFor({ state: "visible" });
    await checkboxIndicator.click({ force: true });
  });

  await test.step("3. กดปุ่ม Delete และยืนยันการลบ", async () => {
    // กดปุ่ม Delete บน Toolbar
    const deleteBtn = page.getByTitle("Delete", { exact: true });
    await deleteBtn.waitFor({ state: "visible" });
    await deleteBtn.click();

    // กดปุ่มยืนยัน 'No' บน Modal/Confirm Box
    const confirmNoBtn = page
      .locator("button, a, span")
      .filter({ hasText: /^No$/i })
      .last();

    await confirmNoBtn.waitFor({ state: "visible" });
    await confirmNoBtn.click();
  });

  await test.step("4. ตรวจสอบว่า User ถูกลบเรียบร้อยแล้ว", async () => {
    await page.waitForLoadState("networkidle").catch(() => {});

    // ตรวจสอบว่าไม่มี Row ของ User คนนี้แสดงอยู่ในตารางแล้ว
    const deletedRow = page.getByRole("row", { name: new RegExp(targetUsername, "i") });
    await expect(deletedRow).not.toBeVisible({ timeout: 5000 });
  });

});