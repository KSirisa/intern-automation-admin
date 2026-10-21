import { test, expect } from "@playwright/test";

const testData = {
  groupName: "Test_Reg",
  description: "Automate Admin",
  descriptionUpdate: "Automate Admin Update",
};

test("Groups - Create, Filter, Update and Delete Test", async ({ page }) => {
  test.setTimeout(120000);

  let currentGroupName = testData.groupName;

  // === Step 1: Open Navigation & Click Create ===
  await test.step("1. Navigate to Groups Menu & Open Create Form", async () => {
    await page.goto("/admin#/group");
    await page.waitForLoadState("networkidle");
    await page.waitForTimeout(500);

    const createBtn = page.getByTitle("Create", { exact: true });
    await createBtn.waitFor({ state: "visible" });
    await createBtn.click();
  });

  // === Step 2: Fill Group Info & Save with Retry Logic (Loop 3 Times) ===
  await test.step("2. Fill Group Info & Save with Duplicate Handling", async () => {
    let saved = false;

    for (let attempt = 1; attempt <= 3; attempt++) {
      const groupNameInput = page.getByRole("textbox", { name: "Group Name" });
      await groupNameInput.click();
      await groupNameInput.fill("");
      await groupNameInput.fill(currentGroupName);

      const descInput = page.locator('textarea[type="text"]');
      await descInput.click();
      await descInput.fill(testData.description);

      if (attempt === 1) {
        const items = ["Asset Reference No.", "Delivery Man", "Business Unit Management", "Mobile Online"];
        for (const name of items) {
          const row = page.locator("tr").filter({
            has: page.getByRole("cell", { name, exact: true })
          });
          const checkbox = row.locator(".app-control-indicator");
          await checkbox.scrollIntoViewIfNeeded();
          await checkbox.click();
        }
      }

       await page.getByRole('button', { name: 'Save' }).click();

       const errorMsg = page.locator("text=There is an existing item with the same value.");
       const hasError = await errorMsg.isVisible({ timeout: 1500 }).catch(() => false);

       if (!hasError) {
         saved = true;
         break;
       }

       currentGroupName = `${testData.groupName} ${attempt}`;
    }

     if (!saved) {
       throw new Error("Failed to save after 3 retries due to duplicate names.");
     }
  });

  // === Step 3: Filter & Select Created Group ===
  await test.step("3. Filter & Select Created Group from Grid", async () => {
    const filterInput = page.locator('input[placeholder="Filter by Name"], input[aria-controls="dtCAGroupList"]').first();
    await filterInput.click();
    await filterInput.fill(currentGroupName);

    const targetRow = page.getByRole("gridcell", {
      name: currentGroupName,
      exact: true,
    });
    await targetRow.waitFor({ state: "visible" });
    await targetRow.click();
  });

  // === Step 4: Update Group (Edit description & uncheck an item) ===
  await test.step("4. Update Group Details", async () => {
    const updateBtn = page.getByTitle("Update", { exact: true });
    await updateBtn.waitFor({ state: "visible" });
    await updateBtn.click();

    // Uncheck "Asset Reference No."
    const itemToUncheck = "Asset Reference No.";
    const row = page.locator("tr").filter({
      has: page.getByRole("cell", { name: itemToUncheck, exact: true })
    });
    const checkbox = row.locator(".app-control-indicator");
    await checkbox.scrollIntoViewIfNeeded();
    await checkbox.click();

    // Update Description
    const descInput = page.locator('textarea[type="text"]');
    await descInput.click();
    await descInput.fill(testData.descriptionUpdate);

    // Save Update
    await page.getByRole('button', { name: 'Save' }).click();
  });

  // === Step 5: Delete Group ===
  await test.step("5. Delete Group", async () => {
    const deleteBtn = page.locator('a.app-commandBar-item[title="Delete"]');
    await deleteBtn.waitFor({ state: "visible" });
    await deleteBtn.scrollIntoViewIfNeeded();
    await deleteBtn.click();

    const confirmYesBtn = page.getByText("Yes", { exact: true });
    await confirmYesBtn.waitFor({ state: "visible" });
    await confirmYesBtn.click();
  });

  await page.pause();
});