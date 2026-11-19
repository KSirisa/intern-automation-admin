import { test, expect } from "@playwright/test";

const testData = {
  titleEnglish: "lvTest",
  titleLocal: "เทส",
  levelNameEnglish: "LevelTest",
  levelNameLocal: "ทดสอบเลเวล",
};

test("Business Unit Levels - Create Level Test", async ({ page }) => {
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
    await page.waitForLoadState("networkidle");
  });

  // === Step 2: Click Add -> Select First Option -> Click Create ===
  await test.step("2. Click Add, select first option, and click Create", async () => {
    await page.locator("a").filter({ hasText: "Add" }).first().click();

    const combobox = page.getByRole("combobox");
    await combobox.waitFor({ state: "visible" });
    await combobox.click();
    await combobox.selectOption({ index: 1 });

    await page.getByTitle("Create").click();
  });

  // === Step 3: Fill Form Data ===
  await test.step("3. Fill Level Information Form", async () => {
    await page.locator("#txtNameTitleEnglish").fill(testData.titleEnglish);
    await page.locator("#txtNameTitleLocal").fill(testData.titleLocal);

    await page.getByRole("textbox", {
      name: "English",
      description: "Required field",
    }).fill(testData.levelNameEnglish);

    await page.getByRole("textbox", {
      name: "Local",
      description: "Required field",
    }).fill(testData.levelNameLocal);
  });

  // === Step 4: Click Cancel ===
  await test.step("4. Click Cancel", async () => {
    await page.getByRole("button", { name: "Save" }).click();
  });
});
