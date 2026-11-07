import { Page, Locator } from "@playwright/test";
import {
  tryAction,
  safeClick,
  selectTreeviewNode,
  setGiscCheckbox,
} from "../../../helpers";

/**
 * [BU Specific] ตั้งค่า Checkbox เฉพาะของฟอร์ม Business Unit
 */
export async function setBUFormCheckbox(
  scope: Page | Locator,
  labelText: string,
  targetState: boolean | undefined | null
) {
  return await setGiscCheckbox(scope, labelText, targetState);
}

/**
 * [BU Specific] เลือก Treeview Node ในหน้า BU (ตรงตาม DOM จริงของ Knockout + jstree)
 */
export async function selectBUTreeviewNode(
  scope: Page | Locator,
  targetNodeName: string | undefined | null,
  containerSelector = "#ddlBusinessUnit"
) {

  return await selectTreeviewNode(
    scope,
    targetNodeName,
    containerSelector,
    "#ddlBusinessUnitFilterText, #ddtBusinessUnitFilterText"
  );
}

/**
 * [BU Specific] Modal เพิ่มผู้มีอำนาจอนุมัติ (Authorized Persons)
 */
export async function addAuthorizedUsersModal(
  page: Page,
  users: string[] | undefined | null
): Promise<void> {
  if (!users || users.length === 0) return;

  await tryAction(async () => {
    const addBtn = page.locator('a[data-bind*="addAuthorizedPersonName"]').first();
    await safeClick(addBtn, "Add Authorized Person Button");

    const filterInput = page
      .locator('input[placeholder="Filter"][aria-controls="ddtAuthorizedPersonsManage"]')
      .first();
    await filterInput.waitFor({ state: "visible", timeout: 3000 });

    for (const userName of users) {
      if (!userName?.trim()) continue;

      await filterInput.fill(userName);
      await filterInput.dispatchEvent("input").catch(() => {});
      await page.waitForTimeout(300);

      const targetRow = page.getByRole("row", { name: new RegExp(userName, "i") }).first();

      if (await targetRow.isVisible({ timeout: 2000 }).catch(() => false)) {
        const checkbox = targetRow.locator("label.app-checkBox-control-dt, input[type='checkbox']").first();
        await safeClick(checkbox, `User Checkbox: ${userName}`);
      }
    }

    const okBtn = page.getByRole("button", { name: "OK", exact: true }).last();
    await safeClick(okBtn, "Authorized Persons Modal OK Button");
  }, "Add Authorized Persons Modal");
}

/**
 * ตั้งค่า Modal "Apply to this Business Unit"
 */
export async function configureApplyToBUModal(
  page: Page,
  targetBu: string | undefined | null,
  options?: string | string[] // 👈 เพิ่มพารามิเตอร์ตัวที่ 3 ตรงนี้
): Promise<void> {
  if (!targetBu?.trim()) return;

  await tryAction(async () => {
    // 1. เลือก Business Unit ในป็อปอัป Treeview
    await selectBUTreeviewNode(page, targetBu, "#ddlBusinessUnit");

    // 2. แปลงค่า options (ถ้าเว้นว่างจะไม่ติ๊กเลย)
    let targetList: string[] = [];
    if (typeof options === "string") {
      const trimmed = options.trim();
      if (trimmed.toLowerCase() === "all") {
        targetList = ["all"];
      } else if (trimmed !== "") {
        targetList = trimmed.split(",").map((s) => s.trim().toLowerCase());
      }
    } else if (Array.isArray(options)) {
      targetList = options.map((s) => s.trim().toLowerCase()).filter(Boolean);
    }

    const isAll = targetList.includes("all");

    // 3. ค้นหาคอนเทนเนอร์ส่วน Apply To
    const applyToLabel = page.locator('label[for="txtApplyTo"], gisc-ui-label[params*="ApplyTo"]').first();
    const applyToSection = applyToLabel
      .locator("xpath=ancestor::div[contains(@class, 'form-group') or contains(@class, 'component-container')][1]")
      .or(page.locator(".modal-body, .app-blade-stacklayout").last());

    const checkboxes = applyToSection.locator("gisc-ui-checkbox, label.app-checkBox-control");
    const count = await checkboxes.count();

    for (let i = 0; i < count; i++) {
      const cbComponent = checkboxes.nth(i);

      if (await cbComponent.isVisible().catch(() => false)) {
        const fullText = (await cbComponent.textContent().catch(() => "")) || "";
        const cleanText = fullText.trim().toLowerCase();

        const shouldCheck = isAll || (targetList.length > 0 && targetList.some((target) => cleanText.includes(target)));

        const input = cbComponent.locator("input[type='checkbox']").first();
        const isChecked = await input.isChecked().catch(() => false);
        const clickTarget = cbComponent.locator(".app-control-indicator, label").first();
        const logName = fullText.trim() || `Apply BU Checkbox #${i + 1}`;

        if (shouldCheck && !isChecked) {
          await safeClick(clickTarget, `Check Apply BU: ${logName}`);
        } else if (!shouldCheck && isChecked) {
          await safeClick(clickTarget, `Uncheck Apply BU: ${logName}`);
        }
      }
    }

    // 4. ยืนยันปิด Modal
    const okBtn = page.getByRole("button", { name: "OK", exact: true }).last();
    await okBtn.waitFor({ state: "visible", timeout: 3000 });
    await safeClick(okBtn, "Apply BU Modal OK Button");
  }, `Configure Apply to BU Modal: "${targetBu}"`);
}

/**
 * [BU Specific] บันทึกฟอร์มหลัก Business Unit
 */
export async function saveAndVerifyMainBUForm(
  page: Page,
  buName: string
): Promise<void> {
  await tryAction(async () => {
    // สั่งกดปุ่ม Save โดยตรง
    await page.getByRole('button', { name: 'Save' }).click();

    console.log(`[Success] กดปุ่ม Save สำหรับ Business Unit: "${buName}" เรียบร้อยแล้ว`);
  }, `Save Main BU Form for "${buName}"`);
}