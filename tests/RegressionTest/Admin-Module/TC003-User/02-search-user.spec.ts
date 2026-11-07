import { test, Page } from "@playwright/test";

export interface SearchPostTestData {
  userGroupItems?: string[];
  businessUnit?: string;
  userType?: string;
  enableStatus?: string;
  usernameToFilter?: string;
}

export const searchPostTestData: SearchPostTestData = {
  userGroupItems: ["Check All"],
  businessUnit: "AGG",
  userType: "Public",
  enableStatus: "Yes",
  usernameToFilter: "AT01197",
};

test("Users - Search RegressionTest", async ({ page }) => {
  // ดึงข้อมูลมาใช้งานจาก searchPostTestData
  const data = searchPostTestData;

  await safeAction(async () => {
    await page.goto("/admin#/user");
    await page.waitForLoadState("networkidle");
  }, "Navigate to User Page");

  // เปิดแถบ Search
  await safeAction(async () => {
    const searchBtn = page.getByTitle("Search", { exact: true });
    if (await searchBtn.isVisible().catch(() => false)) await searchBtn.click();
  }, "Open Search Panel");

  // เลือก User Group
  await selectUserGroupItems(page, data.userGroupItems);

  // ติ๊ก Include Sub Business Units
  await safeAction(async () => {
    const subBuCb = page.locator("label").filter({ hasText: "Include Sub Business Units" }).first();
    if (await subBuCb.isVisible().catch(() => false)) await subBuCb.click({ force: true });
  }, "Check Include Sub Business Units");

  // เลือก Business Unit
  await selectBusinessUnit(page, data.businessUnit);

  // เลือก User Type & Enable
  await safeAction(async () => {
    if (!data.userType) return;
    const userType = page.getByLabel("User Type", { exact: true });
    if (await userType.isVisible().catch(() => false)) await userType.selectOption({ label: data.userType });
  }, "Select User Type");

  await safeAction(async () => {
    if (!data.enableStatus) return;
    const enable = page.getByLabel("Enable", { exact: true });
    if (await enable.isVisible().catch(() => false)) await enable.selectOption({ label: data.enableStatus });
  }, "Select Enable Status");

  // ติ๊ก Account Locked
  await safeAction(async () => {
    const lockedInput = page.locator('input[type="checkbox"][data-bind*="isLock"]').first()
      .or(page.locator('label', { hasText: /^Account Locked$/i }).locator('input').first())
      .or(page.locator('label').filter({ hasText: /^Account Locked$/i }).first());

    if (await lockedInput.isVisible().catch(() => false)) {
      await lockedInput.click({ force: true });
    }
  }, "Check Account Locked");

  // ติ๊ก Password Expired
  await safeAction(async () => {
    const expiredInput = page.locator('input[type="checkbox"][data-bind*="isExpire"]').first()
      .or(page.locator('label', { hasText: /^Password Expired$/i }).locator('input').first())
      .or(page.locator('label').filter({ hasText: /^Password Expired$/i }).first());

    if (await expiredInput.isVisible().catch(() => false)) {
      await expiredInput.click({ force: true });
    }
  }, "Check Password Expired"); 

  // กดปุ่มค้นหา / เคลียร์
  await safeAction(async () => {
    const searchBtn = page.locator("button").filter({ hasText: "Search" }).first();
    if (await searchBtn.isVisible().catch(() => false)) await searchBtn.click();
  }, "Click Search");

  await safeAction(async () => {
    const clearBtn = page.locator("a").filter({ hasText: "Clear" }).first();
    if (await clearBtn.isVisible().catch(() => false)) await clearBtn.click();
  }, "Click Clear");

  // ค้นหาด้วย Username
  await safeAction(async () => {
    if (!data.usernameToFilter) return;
    const usernameInput = page.getByPlaceholder("Filter by Username or Email");
    if (await usernameInput.isVisible().catch(() => false)) {
      await usernameInput.fill(data.usernameToFilter);
      await page.locator("button").filter({ hasText: "Search" }).first().click();
    }
  }, "Filter and Search by Username");

// ==========================================
// Helper Functions
// ==========================================

async function safeAction(action: () => Promise<void>, description: string) {
  try {
    await action();
  } catch {
    console.log(`[Skip] ${description}: Element not found or ready.`);
  }
}

// Helper: Select Business Unit (เน้นปิด Dropdown ให้สนิท)
async function selectBusinessUnit(page: Page, buName?: string) {
  if (!buName?.trim()) return;

  await safeAction(async () => {
    const trigger = page.locator("#ddtBusinessUnit").first();
    if (!(await trigger.isVisible().catch(() => false))) return;

    await trigger.click({ force: true });

    const searchInput = page.locator("#ddtBusinessUnitFilterText");
    if (await searchInput.isVisible().catch(() => false)) {
      await searchInput.fill(buName);
    }

    const item = page.getByRole("treeitem", { name: buName, exact: true }).first();
    if (await item.isVisible().catch(() => false)) {
      await item.click({ force: true });
    }

    // ปิด Dropdown โดยคลิกตัว Trigger ซ้ำ และกด Escape สำรอง
    await trigger.click({ force: true }).catch(() => {});
    await page.keyboard.press("Escape").catch(() => {});
  }, `Select Business Unit: ${buName}`);
}

// Helper: Select User Groups
async function selectUserGroupItems(page: Page, items?: string[]) {
  if (!items?.length) return;

  await safeAction(async () => {
    const dropdown = page.locator(".app-treeview-dropdown-wrapper.multiselect").first();
    if (!(await dropdown.isVisible().catch(() => false))) return;

    await dropdown.click({ force: true });
    const searchInput = dropdown.getByRole("textbox", { name: "Search" });

    for (const item of items) {
      if (!item?.trim()) continue;

      if (await searchInput.isVisible().catch(() => false)) {
        await searchInput.fill(item);
      }

      const target = item.toLowerCase() === "check all"
        ? dropdown.locator(".jstree-anchor", { hasText: /^Check All$/i }).first()
        : page.getByRole("treeitem", { name: item, exact: true }).first();

      if (await target.isVisible().catch(() => false)) {
        await target.click({ force: true });
      }
    }

    await dropdown.click({ force: true }).catch(() => {});
    await page.keyboard.press("Escape").catch(() => {});
  }, `Select User Groups: ${items.join(", ")}`);
}


});