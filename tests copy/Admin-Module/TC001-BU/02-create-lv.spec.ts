import { test, expect } from "@playwright/test";

const testData = {
  parentLevelName: "Temp",
  titleEnglish: "lvTest",
  titleLocal: "เทส",
  levelNameEnglish: "LevelTest",
  levelNameLocal: "ทดสอบเลเวล",
};

test("Business Unit Levels - Create New Level Test", async ({ page }) => {
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

  // === Step 2: Select Parent Level & Click Create ===
  await test.step("2. Select Parent Level & Open Create Form", async () => {
    await test.step(`2.1 Select Target Parent Level (${testData.parentLevelName})`, async () => {
      const parentCell = page.getByRole("gridcell", {
        name: testData.parentLevelName,
      });
      await parentCell.waitFor({ state: "visible" });
      await parentCell.click();
    });

    await test.step("2.2 Click Create Level Button", async () => {
      const createBtn = page.getByTitle("Create");
      await createBtn.waitFor({ state: "visible" });
      await createBtn.click();
    });
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

  // === Step 4: Save & Verify (For Regression Test) ===
  // await test.step("4. Save Level Form & Verify Creation", async () => {
  //   const saveBtn = page.getByRole("button", { name: "Save" });
  //   await saveBtn.click();
  //   await page.waitForLoadState("networkidle");
  // });

  await page.pause();
});