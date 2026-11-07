import { test, expect, Page, Locator } from "@playwright/test";

const ACTION_DELAY = 300;

interface UpdateOptions {
  mode?: "append" | "overwrite";
  suffixText?: string;
  requireCheck?: boolean;       // true = กดติ๊ก Checkbox คอลัมน์ Required
  displayOnPodCheck?: boolean;  // true = กดติ๊ก Checkbox คอลัมน์ Display On POD (เฉพาะ Product)
}

/**
 * Helper สลับสถานะ Checkbox ภายใน Cell ที่กำหนด ให้ตรงกับ targetState
 */
async function setCellCheckbox(cellLocator: Locator, targetState: boolean) {
  if (await cellLocator.isVisible().catch(() => false)) {
    const input = cellLocator.locator('input[type="checkbox"]').first();
    const isChecked = await input.isChecked().catch(() => false);

    // ติ๊กเฉพาะเมื่อสถานะปัจจุบัน ไม่ตรงกับ targetState
    if (isChecked !== targetState) {
      const clickTarget = cellLocator.locator(".app-control-dt-indicator, label").first();
      
      if (await clickTarget.isVisible().catch(() => false)) {
        await clickTarget.click({ force: true });
      } else {
        await input.click({ force: true });
      }

      // กระตุ้น Knockout.js Data Binding
      await input.dispatchEvent("change").catch(() => {});
    }
  }
}

/**
 * สแกนหา <tr> จากชื่อฟิลด์ในคอลัมน์แรก แล้ว Update ข้อมูล พร้อมเลือกกด Checkbox แบบ Optional
 */
async function updateFieldByRowName(
  page: Page,
  rowName: string,
  englishValue: string,
  localValue: string,
  options: UpdateOptions = { mode: "append" }
) {
  // สโคปเฉพาะ Form / Blade ล่าสุดที่เปิดอยู่
  const activeBlade = page.locator(".app-blade-stacklayout, div[data-bind*='blade']").last();

  // 1. ค้นหาแถว <tr> ตามชื่อ Field Name ใน gridcell/td แรก
  const row = activeBlade
    .locator("tr")
    .filter({
      has: page.locator("td, gridcell").first().filter({
        hasText: new RegExp(`^\\s*${rowName}\\s*$`, "i"),
      }),
    })
    .first();

  await row.waitFor({ state: "visible", timeout: 5000 });

  // 2. ระบุ Input ช่อง English และ Local
  const englishInput = row.locator('input[data-target-field="english"], td:nth-child(2) input').first();
  const localInput = row.locator('input[data-target-field="local"], td:nth-child(3) input').first();

  // 3. Scan อ่านค่าเดิมจาก Input
  const currentEnglish = (await englishInput.inputValue().catch(() => "")).trim();
  const currentLocal = (await localInput.inputValue().catch(() => "")).trim();

  // 4. คำนวณค่าที่จะอัปเดต
  let finalEnglish = englishValue;
  let finalLocal = localValue;

  if (options.mode === "append") {
    const suffix = options.suffixText || `_${rowName}`;
    if (currentEnglish) finalEnglish = `${currentEnglish}${suffix}`;
    if (currentLocal) finalLocal = `${currentLocal}${suffix}`;
  }

  // 5. Fill ข้อมูลและ Dispatch Event
  await englishInput.click({ force: true });
  await englishInput.fill(finalEnglish);
  await englishInput.dispatchEvent("change").catch(() => {});

  await localInput.click({ force: true });
  await localInput.fill(finalLocal);
  await localInput.dispatchEvent("change").catch(() => {});

// 6. คลิก Checkbox คอลัมน์ที่ 4 (Required)
  if (options.requireCheck !== undefined) {
    const col4Cell = row.locator("td:nth-child(4)");
    await setCellCheckbox(col4Cell, options.requireCheck);
  }

  // 7. คลิก Checkbox คอลัมน์ที่ 5 (Display On POD)
  if (options.displayOnPodCheck !== undefined) {
    const col5Cell = row.locator("td:nth-child(5)");
    await setCellCheckbox(col5Cell, options.displayOnPodCheck);
  }

  await page.waitForTimeout(ACTION_DELAY);
}

/**
 * สลับ Tab ในหน้า Update Custom Fields Mapping
 */
async function clickTab(page: Page, tabName: string) {
  const tabLabel = page
    .locator('label[data-bind*="onTabClick"], div[cursor="pointer"]')
    .filter({ hasText: new RegExp(`^\\s*${tabName}\\s*$`, "i") })
    .last();
  await tabLabel.click({ force: true });
  await page.waitForTimeout(ACTION_DELAY);
}

// ============================================================================
// MAIN TEST SPEC
// ============================================================================

test("Master Data - Custom Fields Mapping PostTest", async ({ page }) => {
  test.setTimeout(180000);

  await page.goto("/#/shipment");

  // 1. นำทางเข้าหน้า Custom Fields Mapping
  await page.getByRole("link", { name: "Master Data", exact: true }).click();
  await page.waitForTimeout(1500);

  await page.getByRole("link", { name: "Custom Fields Mapping", exact: true }).click();
  await page.waitForTimeout(1500);

  await page.getByTitle("Update").click();
  await page.waitForTimeout(1500);

  // --------------------------------------------------------------------------
  // 2. Shipment Tab
  // --------------------------------------------------------------------------
  await clickTab(page, "Shipment");

  // ตัวอย่าง: ไม่ระบุ requireCheck -> จะไม่อัปเดตหรือกดปุ่ม Checkbox
  await updateFieldByRowName(page, "Text1", "Shipment", "การจัดส่ง", {
    mode: "append",
    suffixText: "_Copy Text1",
    requireCheck: true,
  });

  // ตัวอย่าง: ระบุ requireCheck: true -> จะทำการคลิก Checkbox Required
  await updateFieldByRowName(page, "Text2", "Seal No", "หมายเลข Seal", {
    mode: "overwrite",
    requireCheck: true,
  });

  await updateFieldByRowName(page, "Text10", "Test inputText10", "ทดสอบกรอกข้อมูลที่ Text10", {
    mode: "overwrite",
  });

  await updateFieldByRowName(page, "Int1", "12", "๑๒", {
    mode: "append",
    suffixText: "_Copy Int1",
    requireCheck: true,
  });

  await updateFieldByRowName(page, "Int2", "67", "๖๗", {
    mode: "overwrite",
  });

  await updateFieldByRowName(page, "Decimal1", "3.67", "๓.๖๗", {
    mode: "append",
    suffixText: "_Copy Decimal1",
  });

  await updateFieldByRowName(page, "Decimal2", "9.9999", "๙.๙๙๙๙", {
    mode: "overwrite",
  });

  await updateFieldByRowName(page, "DateTime1", "26/08/2026", "๒๖/๐๘/๒๕๖๙", {
    mode: "append",
    suffixText: "_Copy DateTime1",
  });

  await updateFieldByRowName(page, "DateTime2", "17/09/2026", "๑๗/๐๙/๒๕๖๙", {
    mode: "overwrite",
  });

  await updateFieldByRowName(page, "Bool1", "True", "จริง", {
    mode: "append",
    suffixText: "_Copy Bool1",
  });

  await updateFieldByRowName(page, "Bool2", "False", "เท็จ", {
    mode: "overwrite",
  });

  // --------------------------------------------------------------------------
  // 3. Delivery Order Tab
  // --------------------------------------------------------------------------
  await clickTab(page, "Delivery Order");

  await updateFieldByRowName(page, "Text1", "Delivery Order", "ใบสั่งส่งสินค้า", {
    mode: "append",
    suffixText: "_Copy Text1",
    requireCheck: true,
  });

  await updateFieldByRowName(page, "Int1", "200", "๒๐๐", {
    mode: "append",
    suffixText: "_Copy Int1",
  });

  await updateFieldByRowName(page, "Decimal1", "3.33", "๓.๓๓", {
    mode: "append",
    suffixText: "_Copy Decimal1",
  });

  await updateFieldByRowName(page, "DateTime1", "31/08/2026", "๓๑/๐๘/๒๕๖๙", {
    mode: "append",
    suffixText: "_Copy DateTime1",
  });

  await updateFieldByRowName(page, "Bool1", "TRUE", "จริง", {
    mode: "overwrite",
  });

  // --------------------------------------------------------------------------
  // 4. Product Tab (รองรับทั้ง requireCheck และ displayOnPodCheck)
  // --------------------------------------------------------------------------
  await clickTab(page, "Product");

  // เลือกกดเฉพาะ Checkbox Required
  await updateFieldByRowName(page, "Text1", "Product", "สินค้า", {
    mode: "append",
    suffixText: "_Copy Text1",
    requireCheck: true,
    displayOnPodCheck: true,
  });

  // เลือกกดเฉพาะ Checkbox Display On POD
  await updateFieldByRowName(page, "Int1", "80", "๘๐", {
    mode: "append",
    suffixText: "_Copy Int1",
    displayOnPodCheck: true,
  });

  // เลือกกดทั้ง 2 Checkboxes (Required และ Display On POD)
  await updateFieldByRowName(page, "Decimal1", "8.5000", "๘.๕๐๐๐", {
    mode: "append",
    suffixText: "_Copy Decimal1",
    requireCheck: true,
    displayOnPodCheck: true,
  });

  await updateFieldByRowName(page, "DateTime1", "01/08/2029", "๐๑/๐๘/๒๕๖๙", {
    mode: "append",
    suffixText: "_Copy DateTime1",
  });

  await updateFieldByRowName(page, "Bool1", "False", "เท็จ", {
    mode: "overwrite",
  });

  // --------------------------------------------------------------------------
  // 5. บันทึกผลลัพธ์
  // --------------------------------------------------------------------------
  await clickTab(page, "Shipment");

  await page.getByRole("button", { name: "Cancel" }).last().click();

});