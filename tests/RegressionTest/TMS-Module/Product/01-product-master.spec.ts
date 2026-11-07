import { test, expect } from "@playwright/test";

// ==========================================
// ⚙️ Global Config
// ==========================================
const BASE_URL = "/#/global-search";
const IMAGE_PATH = "tests_PostTest/TMS-Module/Product/Data/product-1.jpg";
const IMPORT_FILE_PATH = "tests_PostTest/TMS-Module/Product/Data/Import_Product_Master.xlsx";
const WAIT_TIME = 1500;

// Test Data
const TEST_CODE = "AT101";
const TEST_NAME = "ATest";
const TEST_SHORT_NAME = "AT";
const TEST_DESC = "Automate Test";
const TEST_DESC_UPDATE_1 = "ตัวอย่างข้อมูล UPDATE";
const TEST_DESC_UPDATE_2 = "ตัวอย่างข้อมูล UPDATE 2";
const TEST_CODE_COPY = "AT110";
const TEST_NAME_COPY = "ATest110";
const TEST_SHORT_NAME_COPY = "ATCopy110";

const TEST_BU_SEARCH = "AGG";
const TEST_BU_NAME = "AGG UAT";

test("Product Master - End to End Flow RegressionTest", async ({ page }) => {

  // ----------------------------------------------------
  // 🛠️ Helper Function: สำหรับพิมพ์ค้นหา จะได้ไม่เปลืองบรรทัด
  // ----------------------------------------------------
  const searchProduct = async (keyword: string) => {
    const searchInput = page.getByPlaceholder('Search').or(page.getByRole('textbox').first());
    await searchInput.fill(keyword);
    await searchInput.press('Enter');
    await page.waitForTimeout(WAIT_TIME);
  };

  await test.step("1. Navigate to Product Master", async () => {
    await page.goto(BASE_URL);
    
    await page.getByTitle("Transportation Management").first().click();

    const transportMenu = page.getByRole("button", { name: "menu" });
    await transportMenu.waitFor({ state: "visible" });
    await page.waitForTimeout(WAIT_TIME);
    await transportMenu.click();

    await page.getByRole("button", { name: "Master Management" }).hover();
    await page.getByRole("button", { name: "Shipments" }).click();
    await page.getByRole("button", { name: "Product" }).click();
    await page.getByRole("button", { name: "Product Master" }).click();
    await page.waitForTimeout(WAIT_TIME);
  });
  
  await test.step("2. Create New Product & Upload Image", async () => {
    await page.locator('button').nth(1).click(); // กดปุ่ม Create

    // อัปโหลดและลบรูปภาพ
    await page.getByLabel('Add Picture').setInputFiles(IMAGE_PATH);
    await page.getByRole('img').filter({ hasText: /^$/ }).nth(4).click();
    await page.getByLabel('Add Picture').setInputFiles(IMAGE_PATH);

    // กรอกข้อมูลทั่วไป
    await page.locator('input[name="code"]').fill(TEST_CODE);
    await page.locator('input[name="name"]').fill(TEST_NAME);
    await page.locator('input[name="shortName"]').fill(TEST_SHORT_NAME);

    // เลือก Dropdowns
    await page.locator('#product-category-select').getByRole('textbox').click();
    await page.getByRole('menuitem', { name: 'ATest Product Categories' }).click();
    await page.locator('#product-type-select').getByRole('textbox').click();
    await page.getByRole('heading', { name: 'ATest Product Types' }).click();
    await page.locator('#product-status-select').getByRole('textbox').click();
    await page.getByRole('menuitem', { name: 'Active', exact: true }).click();
    await page.locator('#product-group-select').getByRole('textbox').click();
    await page.getByRole('heading', { name: 'Finished Goods', exact: true }).click();

    // ข้อมูล Hazardous & Description
    await page.getByRole('paragraph').filter({ hasText: 'Is Hazardous' }).getByRole('checkbox').check();
    await page.locator('input[name="hazardousClass"]').fill('HC');
    await page.locator('input[name="unNumber"]').fill('UN');
    await page.locator('input[name="description"]').fill(TEST_DESC);

    // เลือก Business Unit
    await page.locator('.MuiFormControl-root input[type="text"]').last().fill(TEST_BU_SEARCH);
    await page.getByText(TEST_BU_NAME, { exact: true }).click({ force: true });

  });

  await test.step("3. Product Unit Modal & Save", async () => {
    await page.getByRole('button', { name: 'Add' }).click();
    await page.getByRole('checkbox').check();

    await page.locator('#dialog-productUnit-unitSelected').getByRole('textbox').click();
    await page.getByRole('menuitem', { name: 'กิโลกรัม' }).click();

    await page.locator('#productUnit-productWeight').fill('10');
    await page.locator('#productUnit-productVolume').fill('100');
    await page.locator('#productUnit-conversionRate').fill('100');
    await page.locator('#productUnit-packageWeight').fill('0');
    await page.locator('#productUnit-packageVolume').fill('0');
    await page.locator('#productUnit-unitPrice').fill('100');

    await page.getByRole('button', { name: 'Save' }).click(); // Save Modal
    await page.getByRole('button', { name: 'Save' }).click(); // Save Main Page
    await page.getByRole('button', { name: 'OK' }).click();
    await page.waitForTimeout(WAIT_TIME);
  });

  await test.step("4. Import / Export Data", async () => {
    // Import Flow
    await page.waitForTimeout(WAIT_TIME);
    await page.getByRole("button").nth(2).click(); 
    await page.waitForTimeout(WAIT_TIME);
    await page.getByRole("button").nth(1).click(); // Download Template
    await page.getByRole('button', { name: 'OK' }).click();

    await page.getByLabel("Upload").setInputFiles(IMPORT_FILE_PATH);
    await page.getByRole('button', { name: 'Clear' }).click();
    await page.getByLabel("Upload").setInputFiles(IMPORT_FILE_PATH);
    await page.getByRole('button', { name: 'Import' }).click();

    // Export Flow
    await page.waitForTimeout(WAIT_TIME);
    await page.getByRole("button").nth(3).click(); 
    await page.getByRole('button', { name: 'OK' }).click();
    await page.waitForTimeout(WAIT_TIME);
  });

  await test.step("5. View and Copy Product", async () => {
    // ดูรายละเอียด
    await searchProduct(TEST_CODE);
    await page.getByText(TEST_CODE).click();
    await page.waitForTimeout(WAIT_TIME);
    await page.locator('button').nth(3).click(); // ปุ่ม Back

    // Copy ข้อมูล
    await searchProduct(TEST_CODE);
    await page.getByText(TEST_CODE).click();
    await page.locator('button').nth(2).click(); // ปุ่ม Copy
    await page.waitForTimeout(WAIT_TIME);

    await page.locator('input[name="code"]').fill(TEST_CODE_COPY);
    await page.locator('input[name="name"]').fill(TEST_NAME_COPY);
    await page.locator('input[name="shortName"]').fill(TEST_SHORT_NAME_COPY);
    await page.getByRole('button', { name: 'Save' }).click();
    await page.getByRole('button', { name: 'OK' }).click();
  });

  await test.step("6. Update Product (Details & Table)", async () => {
    // แก้ไขผ่านหน้ารายละเอียด (Details)
    await searchProduct(TEST_CODE);
    await page.getByText(TEST_CODE).click();
    await page.waitForTimeout(WAIT_TIME);
    
    await page.locator('button').nth(1).click(); // ปุ่ม Edit
    await page.waitForTimeout(WAIT_TIME);
    await page.locator('input[name="description"]').fill(TEST_DESC_UPDATE_1);
    await page.getByRole('button', { name: 'Save' }).click();
    await page.getByRole('button', { name: 'OK' }).click();

    // แก้ไขผ่านหน้าตาราง (Table Row)
    await searchProduct(TEST_CODE);
    const row = page.locator('tr', { hasText: TEST_CODE });
    await row.locator('button').nth(0).click({ force: true }); 
    
    await page.waitForTimeout(WAIT_TIME);
    await page.locator('input[name="description"]').fill(TEST_DESC_UPDATE_2);
    await page.getByRole('button', { name: 'Save' }).click();
    await page.getByRole('button', { name: 'OK' }).click();
    await page.waitForTimeout(WAIT_TIME);
  });

  await test.step("7. Delete Product", async () => {
    await searchProduct(TEST_CODE);
    const row = page.locator('tr', { hasText: TEST_CODE });
    await row.locator('button').nth(1).click({ force: true }); // ปุ่ม Delete
    await page.getByRole('button', { name: 'OK' }).click();
  });

  await test.step("8. Advanced Search", async () => {
    await page.getByRole('button', { name: 'Search Total :' }).click();

    // ค้นหาด้วย Category
    await page.locator('div').filter({ hasText: /^Category$/ }).click();
    await page.getByRole('textbox').fill('BIG-C');
    await page.getByRole('option', { name: 'BIG-C' }).click();
    await page.keyboard.press('Escape'); 
    await page.getByRole('button', { name: 'Search', exact: true }).click();
    await page.getByRole('button', { name: 'clear' }).click();

    // ค้นหาด้วย Product Types
    await page.locator('div').filter({ hasText: /^Product Types$/ }).click();
    await page.getByRole('textbox').fill('EED');
    await page.getByRole('option', { name: 'EED' }).getByRole('checkbox').check();
    await page.keyboard.press('Escape');
    await page.getByRole('button', { name: 'Search', exact: true }).click();
    await page.getByRole('button', { name: 'clear' }).click();

    // ค้นหาด้วย Product SKU
    await page.locator('div').filter({ hasText: /^Product SKU$/ }).click();
    await page.getByRole('textbox').fill('กิโลกรัม');
    await page.getByRole('option', { name: 'กิโลกรัม' }).getByRole('checkbox').check();
    await page.keyboard.press('Escape');
    await page.getByRole('button', { name: 'Search', exact: true }).click();
    await page.getByRole('button', { name: 'clear' }).click();

    // ค้นหาด้วย Status (Enable)
    await page.locator('div').filter({ hasText: /^Enable$/ }).click();
    await page.getByRole('menuitem', { name: 'Active', exact: true }).click();
    await page.getByRole('button', { name: 'Search', exact: true }).click();
    await page.getByRole('button', { name: 'clear' }).click();

    // Reset ค่าทั้งหมด
    await page.getByRole('button', { name: 'Reset' }).click();
  });

});