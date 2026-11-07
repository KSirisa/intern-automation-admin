import { Page } from "@playwright/test";

export interface SpecificItemConfig {
  code?: string;
  name?: string;
  searchValue?: string | string[];
}

export const SINGLE_SEARCH_ITEMS = [
  "Custom Areas",
  "Custom Routes",
  "Business Type",
  "Shipment Category",
  "Users",
  "Advance Driver Performance",
  "Shipment Alerts",
  "Line Configurations",
] as const;

export async function handleAddItemsModal(
  page: Page,
  itemName: string,
  itemConfig?: SpecificItemConfig
): Promise<void> {
  const isSearchType = SINGLE_SEARCH_ITEMS.some((item) =>
    itemName.toLowerCase().includes(item.toLowerCase())
  );

  // =========================================================================
  // 🟢 1. กลุ่ม Search Grid (คงเดิมตามตัวที่ใช้งานได้ดีแล้ว)
  // Sequence: fill -> check -> clear -> fill -> check -> OK
  // =========================================================================
  if (isSearchType) {
    console.log(`[Search Mode] ${itemName}`);

    const rawValue = itemConfig?.searchValue || itemConfig?.name || itemConfig?.code || "";
    const searchTerms = Array.isArray(rawValue) ? rawValue : [rawValue];

    const searchInput = page
      .getByPlaceholder(/Filter by/i)
      .or(page.locator(".dataTables_filter input:visible"))
      .last();

    await searchInput.waitFor({ state: "visible", timeout: 10000 });

    for (let i = 0; i < searchTerms.length; i++) {
      const term = searchTerms[i];
      if (!term) continue;

      if (i > 0) {
        const dtClearBtn = page.locator(".dt-filter-clear:visible").last();
        if (await dtClearBtn.isVisible().catch(() => false)) {
          await dtClearBtn.click();
        } else {
          await searchInput.clear();
        }
        await page.waitForTimeout(300);
      }

      await searchInput.click();
      await searchInput.fill(term);
      await page.waitForTimeout(600);

      const checkbox = page
        .locator("td > .app-checkBox-contain-dt > .app-checkBox-control-dt > .app-control-dt-indicator")
        .first();

      await checkbox.waitFor({ state: "visible", timeout: 5000 });
      await checkbox.click();
      await page.waitForTimeout(300);
    }

    const sectionOkBtn = page.getByRole("button", { name: /^OK$/i }).last();
    if (await sectionOkBtn.isVisible({ timeout: 3000 }).catch(() => false)) {
      await sectionOkBtn.click();
      await page.waitForTimeout(800);
    }

    return;
  }

  // =========================================================================
  // 🟡 2. กลุ่ม Add Modal (ตรงตาม Codegen Sequence เป๊ะ)
  // Sequence: Add -> Filter Code -> Check -> OK .nth(2) -> Clear -> Filter Name -> Check -> OK .nth(2) -> Clear -> Close -> OK .last()
  // =========================================================================
  console.log(`[Add Modal Mode] ${itemName}`);

  // 1. กดปุ่ม Add
  const addBtn = page
    .getByRole("button", { name: "Add" })
    .or(page.getByTitle("Add"))
    .last();

  await addBtn.waitFor({ state: "visible", timeout: 5000 });
  await addBtn.click();
  await page.waitForTimeout(800);

  // --- 2. Filter Code ---
  if (itemConfig?.code) {
    const codeHeader = page.getByRole("columnheader", { name: "Filter Code" }).getByLabel("Filter");
    const codeLinkNth = page.getByRole("link", { name: "Filter" }).nth(2);

    const codeFilter = (await codeHeader.isVisible({ timeout: 3000 }).catch(() => false))
      ? codeHeader
      : codeLinkNth;

    if (await codeFilter.isVisible({ timeout: 5000 }).catch(() => false)) {
      await codeFilter.click();

      const inputVal = page.getByRole("textbox", { name: "Value" });
      await inputVal.waitFor({ state: "visible", timeout: 3000 });
      await inputVal.click();
      await inputVal.fill(itemConfig.code);

      await page.getByRole("button", { name: "Filter" }).click();
      await page.waitForTimeout(600);

      const checkbox = page
        .locator("td > .app-checkBox-contain-dt > .app-checkBox-control-dt > .app-control-dt-indicator")
        .first();

      if (await checkbox.isVisible({ timeout: 5000 }).catch(() => false)) {
        await checkbox.click();
        await page.waitForTimeout(300);
      }

      // กด OK .nth(2) ใน Modal
      const okNth2 = page.getByRole("button", { name: "OK" }).nth(2);
      if (await okNth2.isVisible({ timeout: 3000 }).catch(() => false)) {
        await okNth2.click();
        await page.waitForTimeout(500);
      }

      // Re-open Code Filter -> Clear
      if (await codeHeader.isVisible().catch(() => false)) {
        await codeHeader.click();
      } else {
        await page.getByRole("link", { name: "Filter" }).nth(2).click();
      }
      await page.getByRole("button", { name: "Clear" }).click();
      await page.waitForTimeout(500);
    }
  }

  // --- 3. Filter Name ---
  if (itemConfig?.name) {
    const nameFilter = page.getByRole("link", { name: "Filter" }).nth(3);

    if (await nameFilter.isVisible({ timeout: 5000 }).catch(() => false)) {
      await nameFilter.click();

      const inputVal = page.getByRole("textbox", { name: "Value" });
      await inputVal.waitFor({ state: "visible", timeout: 3000 });
      await inputVal.click();
      await inputVal.fill(itemConfig.name);

      await page.getByRole("button", { name: "Filter" }).click();
      await page.waitForTimeout(600);

      const checkbox = page
        .locator("td > .app-checkBox-contain-dt > .app-checkBox-control-dt > .app-control-dt-indicator")
        .first();

      if (await checkbox.isVisible({ timeout: 5000 }).catch(() => false)) {
        await checkbox.click();
        await page.waitForTimeout(300);
      }

      // กด OK .nth(2) ใน Modal
      const okNth2 = page.getByRole("button", { name: "OK" }).nth(2);
      if (await okNth2.isVisible({ timeout: 3000 }).catch(() => false)) {
        await okNth2.click();
        await page.waitForTimeout(500);
      }

      // Re-open Name Filter -> Clear
      await page.getByRole("link", { name: "Filter" }).nth(3).click();
      await page.getByRole("button", { name: "Clear" }).click();
      await page.waitForTimeout(500);
    }
  }

  // 4. กด Close ปิด Modal
  const closeBtn = page.getByRole("button", { name: "Close" }).last();
  if (await closeBtn.isVisible({ timeout: 3000 }).catch(() => false)) {
    await closeBtn.click();
    await page.waitForTimeout(500);
  }

  // 5. กด OK บันทึกรายการประจำ Section บนหน้าหลัก
  const sectionOkBtn = page.getByRole("button", { name: /^OK$/i }).last();
  if (await sectionOkBtn.isVisible({ timeout: 3000 }).catch(() => false)) {
    await sectionOkBtn.click();
    await page.waitForTimeout(800);
  }
}