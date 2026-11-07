import { test, expect } from "@playwright/test";
import { safeClick } from "../../../helpers";

// ==========================================
// ⚙️ Global Config (แก้ไขข้อมูลเทสได้ที่นี่)
// ==========================================
const BASE_URL = "/#/global-search";
const TEST_CODE = "AT001";
const TEST_NAME_CREATE = "ATest Shipment Zone 1";
const TEST_NAME_UPDATE_1 = "ATest Shipment Zone Update on View";
const TEST_NAME_UPDATE_2 = "ATest Shipment Zone Update on Column";
const WAIT_TIME = 2000; // เวลาหน่วง (มิลลิวินาที)

test("Shipment Zone - CRUD Flow RegressionTest", async ({ page }) => {
  // ---------- 1. เข้าหน้า TMS & Navigate Menu ----------
  await page.goto(BASE_URL);

  const tmsMode = page.getByTitle("Transportation Management").first();
  await tmsMode.waitFor({ state: "visible" });
  await safeClick(tmsMode, 'Tile Transportation Management');

  const transportMenu = page.getByRole("button", { name: "menu" });
  await transportMenu.waitFor({ state: "visible" });
  await page.waitForTimeout(WAIT_TIME);
  await safeClick(transportMenu, 'Main Menu');

  const masterMgmt = page.getByRole("button", { name: "Master Management" });
  await masterMgmt.waitFor({ state: "visible" });
  await masterMgmt.hover();

  await safeClick(page.getByRole("button", { name: "Shipments" }), 'Menu Shipments');
  await safeClick(page.getByRole("button", { name: "Product" }), 'Menu Product');
  await safeClick(
    page.getByRole("button", { name: "Shipment Zone" }),
    'Submenu Shipment Zone'
  );

  // ---------- 2. Create (สร้างข้อมูลใหม่) ----------
  await page.waitForTimeout(WAIT_TIME);
  const createButton = page.locator("button").nth(1);
  await safeClick(createButton, 'Button Create Zone');

  await safeClick(page.locator('input[name="code"]'), 'Input Code');
  await page.locator('input[name="code"]').fill(TEST_CODE);

  await safeClick(page.locator('input[name="name"]'), 'Input Name');
  await page.locator('input[name="name"]').fill(TEST_NAME_CREATE);

  await safeClick(
    page.locator('#dropdown-select-in-formik').getByRole('textbox'),
    'Dropdown Status'
  );
  await safeClick(
    page.getByRole('menuitem', { name: 'Active', exact: true }),
    'Option Status Active'
  );

  await safeClick(page.getByRole("button", { name: "Save" }), 'Button Save');
  await safeClick(page.getByRole("button", { name: "OK" }), 'Button OK Modal');

  // ---------- 3. View / Back (ดูรายละเอียดและกลับ) ----------
  await page.waitForTimeout(WAIT_TIME);

  const searchInput = page.getByPlaceholder("Search").or(page.getByRole("textbox").first());
  await searchInput.fill(TEST_CODE);
  await page.waitForTimeout(WAIT_TIME);

  const codeRow = page.getByText(TEST_CODE, { exact: true });
  await codeRow.waitFor({ state: "visible" });
  await safeClick(codeRow, `Row Code ${TEST_CODE}`);

  // ปุ่ม Back (ไอคอนดูรายละเอียด)
  await page.waitForTimeout(WAIT_TIME);
  const backBtn = page.locator("button").nth(2);
  await safeClick(backBtn, 'Button Back');

  // ---------- 4. Update ครั้งที่ 1 (แก้ผ่านเมนูด้านใน) ----------
  await searchInput.fill(TEST_CODE);
  await page.waitForTimeout(WAIT_TIME);

  await safeClick(
    page.getByText(TEST_CODE, { exact: true }),
    `Row Code ${TEST_CODE} for Edit`
  );

  // ปุ่ม Update/Edit (ไอคอนแก้ไข)
  await page.waitForTimeout(WAIT_TIME);
  const updateBtnMenu = page.locator("button").nth(1);
  await safeClick(updateBtnMenu, 'Button Edit in Detail');

  // แก้ไขรายละเอียด
  await page.waitForTimeout(WAIT_TIME);
  await page.locator('input[name="name"]').fill(TEST_NAME_UPDATE_1);

  await safeClick(page.getByRole("button", { name: "Save" }), 'Button Save Update 1');
  await safeClick(page.getByRole("button", { name: "OK" }), 'Button OK Update 1');
  await page.waitForTimeout(WAIT_TIME);

  // ---------- 5. Update ครั้งที่ 2 (แก้ผ่านปุ่มหน้าตาราง Grid) ----------
  await searchInput.fill(TEST_CODE);
  await page.waitForTimeout(WAIT_TIME);

  const row = page.locator("tr", { hasText: TEST_CODE });
  const updateBtn = row.locator("button").nth(0);
  await safeClick(updateBtn, 'Button Edit Grid Row');

  // แก้ไขรายละเอียด
  await page.waitForTimeout(WAIT_TIME);
  await page.locator('input[name="name"]').fill(TEST_NAME_UPDATE_2);

  await safeClick(page.getByRole("button", { name: "Save" }), 'Button Save Update 2');
  await safeClick(page.getByRole("button", { name: "OK" }), 'Button OK Update 2');
  await page.waitForTimeout(WAIT_TIME);

  // ---------- 6. Delete (ลบข้อมูล) ----------
  await searchInput.fill(TEST_CODE);
  await page.waitForTimeout(WAIT_TIME);
  
  const deleteBtn = row.locator("button").nth(1);
  await safeClick(deleteBtn, 'Button Delete Row');
  
  // ยืนยันการลบ
  await safeClick(page.getByRole("button", { name: "OK" }), 'Button OK Confirm Delete');

});