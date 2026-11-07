import { test, expect } from "@playwright/test";

const testData = {
  parentLevelName: "Temp",
  titleEnglish: "lvTest",
  titleLocal: "เทส",
  levelNameEnglish: "LevelTest",
  levelNameLocal: "ทดสอบเลเวล",
};

test("Business Unit Levels - Create or Update Level Test", async ({ page }) => {
  test.setTimeout(120000);

  // === Step 1: Open Navigation ===
  await test.step("1. Navigate to Business Unit Levels", async () => {
    await page.goto("/admin#/business-unit-menu");
    await page.waitForLoadState("networkidle");

    const levelsLink = page.getByRole("link", {
      name: "Business Unit Levels",
      exact: true,
    });
    await levelsLink.waitFor({ state: "visible" });
    await levelsLink.click();
    await page.waitForTimeout(500);
  });

  // === Step 2: Check Existing Data & Action (Add or Update) ===
  await test.step("2. Select Target Level and Decide Action (Add or Update)", async () => {
    // กำหนด Locator สำหรับค้นหารายการ Parent Level ใน Grid
    const parentCell = page.getByRole("gridcell", {
      name: testData.parentLevelName,
    }).first();

    // ตรวจสอบว่ามีข้อมูล parentLevelName อยู่บนหน้าจอหรือไม่ (ตั้ง Timeout สั้นๆ เพื่อไม่ให้รอนาน)
    const isExist = await parentCell.isVisible({ timeout: 3000 }).catch(() => false);

    if (isExist) {
      // -------------------------------------------------------------
      // Case 1: มีข้อมูลเดิมอยู่แล้ว -> เลือกรายการ แล้วกด "Update" (หรือ Edit)
      // -------------------------------------------------------------
      await test.step(`2.1 Existing data found (${testData.parentLevelName}) -> Update Action`, async () => {
        await parentCell.scrollIntoViewIfNeeded();
        await parentCell.click();

        // ปุ่ม Update หรือ Edit (ปรับ Title/Role ตามปุ่มจริงในระบบ)
        const updateBtn = page.getByTitle("Update").or(page.getByRole("button", { name: /Update|Edit/i }));
        await updateBtn.waitFor({ state: "visible" });
        await updateBtn.click();
      });

    } else {
      // -------------------------------------------------------------
      // Case 2: ไม่พบข้อมูล -> ให้กด "Add" หรือ "Create" เพื่อสร้างใหม่
      // -------------------------------------------------------------
      await test.step(`2.2 Target not found -> Create/Add Action`, async () => {
        // ลองหาปุ่ม Add หรือ Create
        const createBtn = page.getByTitle("Create")
          .or(page.locator("a, button").filter({ hasText: /^Add$/i }))
          .first();

        await createBtn.waitFor({ state: "visible" });
        await createBtn.click();

        // หากเป็นการกด Add แล้วต้องเลือก Dropdown parent เพิ่มเติม
        const dropdown = page.locator("select.app-dropdown-select");
        if (await dropdown.isVisible({ timeout: 2000 }).catch(() => false)) {
          await dropdown.selectOption({ label: testData.parentLevelName });
        }
      });
    }
  });

  // === Step 3: Fill Form Data ===
  await test.step("3. Fill Level Information Form", async () => {
    await test.step("3.1 Fill Titles (English & Local)", async () => {
      const titleEnInput = page.locator("#txtNameTitleEnglish");
      await titleEnInput.click();
      await titleEnInput.fill(testData.titleEnglish);

      const titleLocalInput = page.locator("#txtNameTitleLocal");
      await titleLocalInput.click();
      await titleLocalInput.fill(testData.titleLocal);
    });

    await test.step("3.2 Fill Required Names (English & Local)", async () => {
      const nameEnInput = page.getByRole("textbox", {
        name: "English",
        description: "Required field",
      });
      await nameEnInput.click();
      await nameEnInput.fill(testData.levelNameEnglish);

      const nameLocalInput = page.getByRole("textbox", {
        name: "Local",
        description: "Required field",
      });
      await nameLocalInput.click();
      await nameLocalInput.fill(testData.levelNameLocal);
    });
  });

  
  // ==============================================================================
  //  WARNING 
  //  บันทึกข้อมูลแล้ว "ไม่สามารถลบได้ด้วยตนเอง" 
  //  หากต้องการทดสอบการ Save ให้ปลด Comment สคริปต์ด้านล่างนี้ออกด้วยความระมัดระวัง
  // ==============================================================================
  // === Step 4: Save & Verify ===
  // await test.step("4. Save Level Form & Verify Creation", async () => {
  //   const saveBtn = page.getByRole("button", { name: "Save" });
  //   await saveBtn.click();
  //   await page.waitForLoadState("networkidle");
  // });

});