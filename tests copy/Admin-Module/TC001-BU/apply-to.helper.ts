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
 * [BU Specific] เลือก Treeview Node ในหน้า BU
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
 * [BU Specific] บันทึกฟอร์มหลัก Business Unit
 */
// export async function saveAndVerifyMainBUForm(
//   page: Page,
//   buName: string
// ): Promise<void> {
//   await tryAction(async () => {
//     const saveMainBtn = page
//       .locator("button, a")
//       .filter({ has: page.locator("span", { hasText: /^Save$\vert{}^บันทึก$/i }) })
//       .first();

//     await Promise.all([
//       page.waitForResponse((res) => res.status() === 200, { timeout: 10000 }).catch(() => {}),
//       safeClick(saveMainBtn, "Save Main BU Form Button"),
//     ]);

//     console.log(`[Success] บันทึกข้อมูล Business Unit: "${buName}" สำเร็จ`);
//   }, `Save Main BU Form for "${buName}"`);
// }