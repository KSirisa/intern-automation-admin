import { test, expect } from "@playwright/test";

// ==========================================
// ⚙️ Global Config (แก้ไขข้อมูลเทสได้ที่นี่)
// ==========================================
const BASE_URL = "/#/global-search";
const TEST_ORDER = "0";
const TEST_CODE = "AT000";
const TEST_NAME = "ATest 000 Units";
const TEST_SHORT_NAME = "AT 0";
const TEST_CONV_RATE = "0";
const TEST_DESC_CREATE = "Automate Test";
const TEST_DESC_UPDATE_1 = "Automate Test Update";
const TEST_DESC_UPDATE_2 = "Automate Test Update 2";
const WAIT_TIME = 2000; // เวลาหน่วง (มิลลิวินาที)

test("Units - CRUD Flow", async ({ page }) => {
  // ---------- 1. เข้าหน้า TMS & Navigate Menu ----------
  await page.goto(BASE_URL);

  const tmsMode = page.getByTitle('Transportation Management').first();
  await tmsMode.waitFor({ state: 'visible' });
  await tmsMode.click();

  const transportMenu = page.getByRole('button', { name: 'menu' });
  await transportMenu.waitFor({ state: 'visible' }); 
  await page.waitForTimeout(WAIT_TIME);
  await transportMenu.click();
  
  await page.getByRole("button", { name: "Master Management" }).hover();
  await page.getByRole('button', { name: 'Shipments' }).click();
  await page.getByRole('button', { name: 'Product' }).click();
  await page.getByRole('button', { name: 'Units' }).click();

  // ---------- 2. Create (สร้างข้อมูลใหม่) ----------
  await page.waitForTimeout(WAIT_TIME);
  const createButton = page.locator('button').nth(1);
  await createButton.click();
    
  await page.locator('input[name="order"]').fill(TEST_ORDER);
  await page.locator('input[name="code"]').fill(TEST_CODE);
  await page.locator('input[name="name"]').fill(TEST_NAME);
  await page.locator('input[name="shortName"]').fill(TEST_SHORT_NAME);
  
  await page.locator('#dropdown-select-in-formik').getByRole('textbox').click();
  await page.getByRole('menuitem', { name: 'Active', exact: true }).click();
  
  await page.getByRole('paragraph').filter({ hasText: 'Required Dimension' }).getByRole('checkbox').check();
  await page.getByRole('paragraph').filter({ hasText: 'Mix' }).getByRole('checkbox').check();
  
  await page.locator('input[name="conversionRate"]').fill(TEST_CONV_RATE);
  await page.locator('textarea[name="description"]').fill(TEST_DESC_CREATE);
  
  await page.getByRole('button', { name: 'Save' }).click();
  await page.getByRole('button', { name: 'OK' }).click();

  // ---------- 3. View / Back (ดูรายละเอียดและกลับ) ----------
  await page.waitForTimeout(WAIT_TIME);

  const searchInput = page.getByPlaceholder('Search').or(page.getByRole('textbox').first());
  await searchInput.fill(TEST_CODE);
  await page.waitForTimeout(WAIT_TIME);
  await page.getByText(TEST_CODE).click();

  // ปุ่ม Back (ไอคอนดูรายละเอียด)
  const backBtn = page.locator('button').nth(2);
  await backBtn.click();

  // ---------- 4. Update ครั้งที่ 1 (แก้ผ่านเมนูด้านใน) ----------
  await searchInput.fill(TEST_CODE);
  await page.waitForTimeout(WAIT_TIME);
  await page.getByText(TEST_CODE).click();
  
  // ปุ่ม Update/Edit (ไอคอนแก้ไข)
  const updateBtnMenu = page.locator('button').nth(1);
  await updateBtnMenu.click();

  // แก้ไขรายละเอียด
  await page.locator('textarea[name="description"]').fill(TEST_DESC_UPDATE_1);
  
  await page.getByRole('button', { name: 'Save' }).click();
  await page.getByRole('button', { name: 'OK' }).click();

  // ---------- 5. Update ครั้งที่ 2 (แก้ผ่านปุ่มหน้าตาราง Grid) ----------
  await searchInput.fill(TEST_CODE);
  await page.waitForTimeout(WAIT_TIME);

  const row = page.locator('tr', { hasText: TEST_CODE });
  const updateBtn = row.locator('button').nth(0);
  await updateBtn.click({ force: true });  

  // แก้ไขรายละเอียด
  await page.locator('textarea[name="description"]').fill(TEST_DESC_UPDATE_2);

  await page.getByRole('button', { name: 'Save' }).click();
  await page.getByRole('button', { name: 'OK' }).click();
  await page.waitForTimeout(WAIT_TIME);

  // ---------- 6. Delete (ลบข้อมูล) ----------
  // await searchInput.fill(TEST_CODE);  
  // await page.waitForTimeout(WAIT_TIME);
  
  // const deleteBtn = row.locator('button').nth(1);
  // await deleteBtn.click({ force: true });  
  
  // // ยืนยันการลบ
  // await page.getByRole('button', { name: 'OK' }).click();

  await page.pause();
});