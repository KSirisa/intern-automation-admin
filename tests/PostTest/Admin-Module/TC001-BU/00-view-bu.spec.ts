import { test, expect } from "@playwright/test";
import { safeClick } from "../../../helpers";

const testData = {
  buName: "___TEST (RT1)",
};

test("View Business Unit Hierarchy", async ({ page }) => {
  test.setTimeout(180000);

  // === Step 1: Open Navigation ===
    await test.step("1. Navigate to Business Unit Hierarchy and Select Node", async () => {
    await page.goto("/admin#/business-unit-menu");
    await page.waitForLoadState("networkidle");

    await safeClick(
      page.getByRole("link", { name: "Business Unit Hierarchy", exact: true }),
      "Hierarchy Link"
    );

    const treeItem = page.getByRole("treeitem", { name: testData.buName });
    await treeItem.waitFor({ state: "visible", timeout: 15000 });
    await treeItem.click();
    await page.waitForLoadState("networkidle").catch(() => {});
  });
  
  // === Step 2: Test Action Toolbar ===
  await test.step("2. Inspect Toolbar Actions", async () => {
    await test.step("2.1 Test Update Modal", async () => {
      await safeClick(page.getByTitle("Update"), "Update Button");
      await safeClick(page.getByRole("button", { name: "Cancel" }), "Cancel Update");
    });

    await test.step("2.2 Test Delete Modal Dialog", async () => {
      await safeClick(page.getByTitle("Delete"), "Delete Button");
      await safeClick(page.getByText("No", { exact: true }), "Cancel Delete Modal");
    });
  });

  // === Step 3: Test User Management Modals ===
  await test.step("3. Inspect User Management Toolbar Actions", async () => {
    await test.step("3.1 Test Remove User Flow", async () => {
      await safeClick(page.getByTitle("Remove User"), "Remove User Button");
      await page.locator("label").filter({ hasText: "Permanence" }).click();
      await page.locator("label").filter({ hasText: "Temporary" }).click();
      await page.getByRole("textbox", { name: "Required field" }).click();
      await safeClick(page.getByRole("button", { name: "Cancel" }), "Cancel Remove User");
    });

    await test.step("3.2 Test Manage Temporary User Flow", async () => {
      await safeClick(page.getByTitle("Manage Temporary User").nth(1), "Manage Temp User");
      await safeClick(page.getByTitle("Recovery"), "Recovery Button");
      await page.getByText("Cancel", { exact: true }).click();

      await safeClick(page.getByTitle("Delete").nth(1), "Delete Temp User");
      await page.getByText("Cancel", { exact: true }).click();

      await page.getByRole("button", { name: "Close" }).nth(3).click();
    });
  });

  // === Step 4: Verify Resource Grid Items ===
  await test.step("4. Inspect Resources Grid Items", async () => {
    await page.getByRole("columnheader", { name: "Resource Type" }).waitFor({ state: "visible" });

    const resourceTypes = [
      "Users",
      "Boxes",
      "Drivers",
      "Vehicles",
      "Custom POI (Public)",
      "Custom POI (Shared)",
      "Custom Areas",
      "Custom Routes",
      "Business Type",
      "Products",
      "Shipment Category",
      "Shipment Alerts",
      "Line Configurations",
    ];

    for (const resource of resourceTypes) {
      // ใส่ test.step ย่อยแยกตามชื่อ Resource ให้โชว์ใน Report
      await test.step(`Inspect Grid Item: ${resource}`, async () => {
        const gridCell = page.getByRole("gridcell", { name: resource }).first();
        if (await gridCell.isVisible().catch(() => false)) {
          await gridCell.scrollIntoViewIfNeeded();
          await gridCell.click({ force: true }).catch(() => {});
          await page.waitForTimeout(200);
        }
      });
    }

    await page.waitForTimeout(500);
  });

  // === Step 5: Verify Sub-menu Links ===
  await test.step("5. Inspect Sub-menu Configuration Tabs", async () => {
    const subMenus = [
      "TMS Configurations",
      "POD Configurations",
      "Maintenance Management Configuration",
      "Shipment Configuration",
      "System Configuration",
    ];

    for (const menuName of subMenus) {
      // ใส่ test.step ย่อยแยกตามชื่อ Tab ให้โชว์ใน Report
      await test.step(`Switch Tab: ${menuName}`, async () => {
        const menuLink = page.getByRole("link", { name: new RegExp(menuName, "i") }).first();
        await menuLink.scrollIntoViewIfNeeded();
        await menuLink.waitFor({ state: "visible", timeout: 10000 });
        await menuLink.click({ force: true });
        await page.waitForLoadState("networkidle").catch(() => {});
        await page.waitForTimeout(300);
      });
    }
  });

});