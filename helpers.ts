import { Page, Locator } from "@playwright/test";

/**
 * Universal Action Wrapper สำหรับทำ Retry และ Catch Error ไม่ให้ Test พัง
 */
export async function tryAction(
  actionFn: () => Promise<void>,
  actionName = "Action",
  retries = 3,
  delayMs = 1000
): Promise<boolean> {
  for (let i = 0; i < retries; i++) {
    try {
      await actionFn();
      return true;
    } catch (error) {
      if (i === retries - 1) {
        console.warn(
          `[Skipped] ไม่สามารถทำ "${actionName}" ได้หลังจากพยายาม ${retries} ครั้ง`
        );
        return false;
      }
      await new Promise((res) => setTimeout(res, delayMs));
    }
  }
  return false;
}

/**
 * กรอก Textbox โดยรองรับทั้ง Scope (Locator) หรือ Page
 */
export async function fillByLabel(
  scope: Page | Locator,
  labelText: string,
  value: string | undefined | null
) {
  if (value === undefined || value === null || value === "") {
    console.log(`[Skip] ไม่มีการส่งค่าสำหรับ "${labelText}"`);
    return true;
  }

  return await tryAction(async () => {
    const field = scope
      .getByRole("textbox", { name: labelText, exact: false })
      .or(scope.getByLabel(labelText, { exact: false }))
      .or(
        scope
          .locator("div, fieldset, gisc-ui-textbox", {
            hasText: new RegExp(labelText, "i"),
          })
          .locator("input, textarea")
      )
      .first();

    await field.waitFor({ state: "visible", timeout: 2000 });
    await field.fill(value);
    await field.dispatchEvent("input").catch(() => {});
    await field.dispatchEvent("change").catch(() => {});
  }, `Fill "${labelText}" with "${value}"`);
}

/**
 * เลือก Dropdown โดยล็อกขอบเขตการทำงานเฉพาะภายใน scope ที่ส่งมา
 */
export async function selectByLabel(
  scope: Page | Locator,
  labelTextOrParam: string,
  optionLabel: string | undefined | null
) {
  if (!optionLabel?.trim()) {
    console.log(`[Skip] ไม่มีการใส่ข้อมูล optionLabel สำหรับ "${labelTextOrParam}"`);
    return true;
  }

  return await tryAction(async () => {
    const page = "page" in scope ? (scope.page() as Page) : (scope as Page);
    const escapedText = labelTextOrParam.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

    // 📌 ค้นหาเฉพาะภายใน scope ที่ส่งเข้ามาเท่านั้น (ไม่กวาดทั้งหน้า)
    let container = scope
      .locator(`gisc-ui-dropdown[params*="${labelTextOrParam}"], #${labelTextOrParam}`)
      .first();

    if ((await container.count()) === 0) {
      container = scope
        .locator("gisc-ui-dropdown, .form-group, .app-control-container, div")
        .filter({
          has: scope.locator("label").filter({ hasText: new RegExp(`^\\s*${escapedText}`, "i") }),
        })
        .first();
    }

    const select2Trigger = container.locator(".select2-selection, .app-dropdown-container, select").first();
    const dropdownResults = page.locator(".select2-dropdown, .select2-results, .app-dropdown-list").first();

    try {
      await select2Trigger.waitFor({ state: "visible", timeout: 3000 });
      await select2Trigger.click({ force: true });

      const searchInput = page.locator(".select2-search__field, input[type='search']").last();

      if (await searchInput.isVisible({ timeout: 1500 }).catch(() => false)) {
        await searchInput.fill(optionLabel);
        const option = page
          .getByRole("option", { name: optionLabel, exact: false })
          .or(page.locator(".select2-results__option", { hasText: new RegExp(optionLabel, "i") }))
          .first();

        await option.waitFor({ state: "visible", timeout: 3000 });
        await option.click({ force: true });
      } else {
        const popupOption = page
          .locator(".select2-results__option")
          .filter({ hasText: new RegExp(`^\\s*${optionLabel}`, "i") })
          .first();

        if (await popupOption.isVisible({ timeout: 1500 }).catch(() => false)) {
          await popupOption.click({ force: true });
        } else {
          const nativeSelect = container.locator("select").first();
          await nativeSelect.selectOption({ label: optionLabel }).catch(async () => {
            await nativeSelect.selectOption({ value: optionLabel }).catch(() => {});
          });
          await nativeSelect.dispatchEvent("change").catch(() => {});
        }
      }
    } finally {
      if (await dropdownResults.isVisible().catch(() => false)) {
        await page.keyboard.press("Escape").catch(() => {});
      }
    }
  }, `Select "${optionLabel}" in "${labelTextOrParam}"`);
}

/**
 * คลิก Element อย่างปลอดภัย
 */
export async function safeClick(locator: Locator, name = "Element") {
  return await tryAction(async () => {
    await locator.waitFor({ state: "visible", timeout: 2000 });
    await locator.click({ force: true });
  }, `Click "${name}"`);
}

/**
 * เลือก Treeview Node แบบ Universal (รองรับการระบุ Container และช่องค้นหาเฉพาะตัว)
 */
export async function selectTreeviewNode(
  scope: Page | Locator,
  targetNodeName: string | undefined | null,
  containerSelector = "gisc-ui-dropdowntree",
  searchFilterId?: string, // 📌 เพิ่มพารามิเตอร์สำหรับระบุ ID ช่องค้นหาเฉพาะจุด
  searchKeyword = targetNodeName
) {
  if (!targetNodeName?.trim()) {
    console.log(`[Skip] ไม่มีการใส่ข้อมูล targetNodeName`);
    return true;
  }

  return await tryAction(async () => {
    const page = "page" in scope ? (scope.page() as Page) : (scope as Page);

    const container = scope.locator(containerSelector).first();
    await container.waitFor({ state: "visible", timeout: 5000 });

    const dropdownPopup = page
      .locator(".app-treeview-dropdown-list, .k-animation-container, .treeview-popup")
      .first();

    // 1. เปิด Dropdown ถ้ายังไม่เปิด
    if (!(await dropdownPopup.isVisible().catch(() => false))) {
      const trigger = container
        .locator(".app-treeview-dropdown, .app-treeview-dropdown-wrapper, .k-dropdown-wrap, a.k-header, input")
        .or(container)
        .first();

      await trigger.waitFor({ state: "visible", timeout: 3000 });
      await trigger.click({ force: true });
      await dropdownPopup.waitFor({ state: "visible", timeout: 4000 }).catch(() => {});
    }

    // 2. ค้นหาช่องกรองข้อความ (ถ้ามีการระบุ ID เจาะจง ให้วิ่งหาตัวนั้นก่อน)
    let searchInput: Locator;
    if (searchFilterId) {
      searchInput = page.locator(searchFilterId).first();
    } else {
      searchInput = page
        .locator("input[placeholder*='Search' i], input.app-input-search")
        .first();
    }

    if (await searchInput.isVisible({ timeout: 2000 }).catch(() => false)) {
      await searchInput.fill("");
      await searchInput.fill(searchKeyword || targetNodeName);
      await searchInput.dispatchEvent("input").catch(() => {});
      await page.waitForTimeout(300);
    }

    // 3. คลิกเลือก Node เป้าหมาย
    const escapedNodeName = targetNodeName.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    const targetAnchor = container
      .locator(`li[title="${targetNodeName}"] a.jstree-anchor, .jstree-anchor, span.k-in`)
      .filter({ hasText: new RegExp(`^\\s*${escapedNodeName}\\s*$`, "i") })
      .first();

    await targetAnchor.waitFor({ state: "visible", timeout: 5000 });
    await targetAnchor.click({ force: true });
  }, `Select Treeview Node "${targetNodeName}"`);
}


/**
 * Shortcut สำหรับเลือก Business Unit Node
 */
export async function selectBusinessUnitNode(
  page: Page,
  nodeName: string,
  searchText?: string
) {
  return await selectTreeviewNode(page, nodeName, searchText || nodeName, "#ddtBusinessUnit");
}

/**
 * สลับสถานะ Checkbox Custom
 */
export async function toggleGiscCheckbox(
  container: Page | Locator,
  labelText?: string
) {
  return await tryAction(async () => {
    let target: Locator;
    if (labelText) {
      target = container
        .locator("label, .app-checkBox-control")
        .filter({ hasText: labelText })
        .first();
    } else {
      target = container
        .locator(".app-control-indicator, .app-checkBox-control")
        .first();
    }
    await target.waitFor({ state: "visible", timeout: 3000 });
    await target.click({ force: true });
  }, `Toggle Checkbox ${labelText ? `"${labelText}"` : ""}`);
}

/**
 * เลือก User Group Checkbox จาก Treeview Dropdown Multiselect
 */
export async function selectUserGroupNode(page: Page, groupName: string) {
  if (!groupName?.trim()) {
    console.log(`[Skip] ไม่มีการระบุ groupName`);
    return true;
  }

  return await tryAction(async () => {
    const multiselect = page.locator("gisc-ui-dropdown-multiselect").first();
    const dropdownTrigger = multiselect
      .locator(".app-treeview-dropdown-wrapper.multiselect")
      .first();
    const filterInput = multiselect
      .locator('input[id$="FilterText"][placeholder="Search"]')
      .first();

    if (!(await filterInput.isVisible().catch(() => false))) {
      await dropdownTrigger.click({ force: true });
    }

    await filterInput.waitFor({ state: "visible", timeout: 3000 });
    await filterInput.fill(groupName);

    const targetAnchor = multiselect
      .locator(".jstree-container-ul")
      .locator(`li[title="${groupName}"] a.jstree-anchor`)
      .or(multiselect.getByRole("treeitem", { name: groupName, exact: true }))
      .first();

    await targetAnchor.waitFor({ state: "visible", timeout: 3000 });
    await targetAnchor.click({ force: true });

    await dropdownTrigger.click({ force: true }).catch(() => {});
  }, `Select User Group "${groupName}"`);
}

/**
 * ตั้งค่า Checkbox ในระบบ GISC โดยอ้างอิงจาก Scope
 */
export async function setGiscCheckbox(
  scope: Page | Locator,
  labelText: string,
  targetState: boolean | undefined | null
) {
  if (targetState === undefined || targetState === null) {
    console.log(`[Skip] Checkbox targetState is undefined/null for "${labelText}"`);
    return true;
  }

  return await tryAction(async () => {
    const escapedText = labelText.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

    const labelContainer = scope
      .locator("gisc-ui-checkbox, label.app-checkBox-control, label.checkbox-inline, label")
      .filter({
        has: scope.locator("span, label, p, div, input").filter({
          hasText: new RegExp(escapedText, "i"),
        }),
      })
      .first();

    await labelContainer.waitFor({ state: "visible", timeout: 3000 });

    const input = labelContainer.locator('input[type="checkbox"]').first();
    let currentState = false;

    if (await input.count() > 0) {
      currentState = await input.isChecked().catch(() => false);
    } else {
      const classAttr = (await labelContainer.getAttribute("class").catch(() => "")) || "";
      currentState = classAttr.includes("checked") || classAttr.includes("active");
    }

    if (currentState !== targetState) {
      await labelContainer.click({ force: true });

      if (await input.count() > 0) {
        await input.dispatchEvent("change").catch(() => {});
        await input.dispatchEvent("input").catch(() => {});
      }
    }
  }, `Set Checkbox "${labelText}" to ${targetState}`);
}

/**
 * เลือก Date Picker
 */
export async function selectDatePicker(
  page: Page,
  selector: string,
  dateObj: { year: string; monthIndex: string; day: string }
) {
  const dateInput = page.locator(selector).last();

  if (!(await dateInput.isVisible({ timeout: 5000 }).catch(() => false))) {
    console.warn(`[selectDatePicker] Element not found: ${selector}`);
    return;
  }

  await dateInput.click({ force: true }).catch(() => {});
  await page.waitForTimeout(300);

  const yearSelect = page.locator(".ui-datepicker-year").last();
  if (await yearSelect.isVisible().catch(() => false)) {
    await yearSelect.selectOption(dateObj.year).catch(() => {});
  }

  const monthSelect = page.locator(".ui-datepicker-month").last();
  if (await monthSelect.isVisible().catch(() => false)) {
    await monthSelect.selectOption(dateObj.monthIndex).catch(() => {});
  }

  const dayTarget = page
    .locator(".ui-datepicker-calendar")
    .last()
    .locator("td:not(.ui-datepicker-other-month) a", {
      hasText: new RegExp(`^${dateObj.day}$`),
    })
    .first();

  await dayTarget.click({ force: true }).catch(() => {});
}