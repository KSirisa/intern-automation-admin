import { test, expect } from "@playwright/test";

// ==========================================
// ⚙️ Global Config & Fixed Test Data
// ==========================================
const BASE_URL = "/#/global-search";
const IMPORT_FILE_PATH = "tests/TMS-Module/Employees/Data/Import_Employee.xlsx";
const WAIT_TIME = 1500;

const TARGET_EMPLOYEE_ID = "EMP26102701"; 

const TEST_TITLE = "นาย";
const TEST_FIRSTNAME = "ชื่อ";
const TEST_LASTNAME = "สกุล";
const TEST_PHONE = "0987654321";
const TEST_GENDER = "Male";
const TEST_NATIONAL_ID = "11261027101";

const TEST_BU_SEARCH = "AGG";
const TEST_BU_NAME = "AGG UAT";
const TEST_ENABLE_STATUS = "Active";
const TEST_EMPLOYEE_TYPE = "Employee";

const TEST_FIRSTNAME_UPDATE = "ชื่อจริง";
const TEST_LASTNAME_UPDATE = "นามสกุล";

test("Employees - RegressionTest", async ({ page }) => {
  // ==========================================
  // 🛠️ Helper Functions
  // ==========================================

  // ตัวช่วยคลิกเปิด Dropdown (Material-UI) ด้วยชื่อ Label
  const openDropdown = async (labelRegex: RegExp) => {
    await page
      .locator("label")
      .filter({ hasText: labelRegex })
      .locator("..")
      .click();
  };

  // ==========================================
  //  Test Steps
  // ==========================================

  await test.step("1. Navigate to Product Master", async () => {
    await page.goto(BASE_URL);

    // เปิดเมนูหลัก
    await page.getByTitle("Transportation Management").first().click();
    const transportMenu = page.getByRole("button", { name: "menu" });
    await transportMenu.waitFor({ state: "visible" });
    await page.waitForTimeout(WAIT_TIME);
    await transportMenu.click();

    // เข้าสู่หน้า Employees
    await page.getByRole("button", { name: "Master Management" }).hover();
    await page.getByRole("button", { name: "Employees" }).click();
    await page.waitForTimeout(WAIT_TIME);
  });

  await test.step("2. Create New Employee (Fixed ID)", async () => {
    await page.locator("button").nth(1).click(); // ปุ่ม Create

    // --- กรอกข้อมูล Textbox ทั่วไป ---
    await page.locator('input[name="employeeId"]').fill(TARGET_EMPLOYEE_ID);
    await page.locator('input[name="title"]').fill(TEST_TITLE);
    await page.locator('input[name="firstName"]').fill(TEST_FIRSTNAME);
    await page.locator('input[name="lastName"]').fill(TEST_LASTNAME);
    await page.locator('input[name="phone"]').fill(TEST_PHONE);
    await page.locator('input[name="nationalId"]').fill(TEST_NATIONAL_ID);

    // --- เลือกข้อมูล Dropdown ---
    await openDropdown(/Gender/i);
    await page
      .getByRole("menuitem", { name: TEST_GENDER, exact: true })
      .click();

    await openDropdown(/Business Unit/i);
    await page.getByRole("textbox").fill(TEST_BU_SEARCH);
    await page.getByText(TEST_BU_NAME).click();

    await openDropdown(/Enable/i);
    await page.getByRole("menuitem", { name: TEST_ENABLE_STATUS, exact: true }).click();

    await openDropdown(/Type/i);
    await page.getByRole("menuitem", { name: TEST_EMPLOYEE_TYPE }).click();

    // --- บันทึกข้อมูล ---
    await page.getByRole("button", { name: "Save" }).click();
    await page.getByRole("button", { name: "OK" }).click();
    await page.waitForTimeout(WAIT_TIME);
  });

  await test.step("3. Import / Export Data", async () => {
    // --- Import Flow ---
    await page.locator("button").nth(2).click(); // ปุ่ม Import
    await page.locator("button").nth(1).click(); // ปุ่ม Download Template
    await page.getByRole("button", { name: "OK" }).click();

    await page.getByLabel("Upload").setInputFiles(IMPORT_FILE_PATH);
    await page.getByRole("button", { name: "Clear" }).click();
    await page.getByLabel("Upload").setInputFiles(IMPORT_FILE_PATH);
    await page.getByRole("button", { name: "Import" }).click();
    await page.waitForTimeout(WAIT_TIME);

    // --- Export Flow ---
    await page.locator("button").nth(3).click(); // ปุ่ม Export
    await page.getByRole("button", { name: "OK" }).click();
    await page.waitForTimeout(WAIT_TIME);
  });
  
  

  await test.step("5. View Employee", async () => {
    // ค้นหาโดยใช้ตัวแปร TARGET_EMPLOYEE_ID โดยตรง
    const searchInput = page
      .locator("label")
      .filter({ hasText: /Filter by/i })
      .locator("..")
      .locator("input");
    await searchInput.waitFor({ state: "visible" });
    await searchInput.click();
    await searchInput.fill(TARGET_EMPLOYEE_ID);
    await searchInput.press("Enter");
    await page.waitForTimeout(WAIT_TIME);

    await page.getByText(TARGET_EMPLOYEE_ID, { exact: true }).click();
    await page.waitForTimeout(WAIT_TIME);

    await page.locator("button").nth(2).click(); // ปุ่ม Back
  });

  await test.step("6. Update Product (Details & Table)", async () => {
    const searchInput = page
      .locator("label")
      .filter({ hasText: /Filter by/i })
      .locator("..")
      .locator("input");

    // --- แก้ไขผ่านหน้ารายละเอียด (Details) ---
    await searchInput.click();
    await searchInput.fill(TARGET_EMPLOYEE_ID);
    await searchInput.press("Enter");
    await page.waitForTimeout(WAIT_TIME);

    await page.getByText(TARGET_EMPLOYEE_ID, { exact: true }).click();
    await page.waitForTimeout(WAIT_TIME);

    await page.locator("button").nth(1).click(); // ปุ่ม Edit
    await page.waitForTimeout(WAIT_TIME);
    await page.locator('input[name="firstName"]').fill(TEST_FIRSTNAME_UPDATE);
    await page.getByRole("button", { name: "Save" }).click();
    await page.getByRole("button", { name: "OK" }).click();
    await page.waitForTimeout(WAIT_TIME);

    // --- แก้ไขผ่าน row (Details) ---
    await searchInput.click();
    await searchInput.fill(TARGET_EMPLOYEE_ID);
    await searchInput.press("Enter");
    await page.waitForTimeout(WAIT_TIME);

    const row = page.locator("tr").filter({
      has: page.getByRole("cell", { name: TARGET_EMPLOYEE_ID, exact: true }),
    });
    const editBtn = row.locator("button").first();
    await editBtn.waitFor({ state: "visible" });
    await editBtn.click();

    await page.waitForTimeout(WAIT_TIME);
    await page.locator('input[name="lastName"]').fill(TEST_LASTNAME_UPDATE);
    await page.getByRole("button", { name: "Save" }).click();
    await page.getByRole("button", { name: "OK" }).click();
    await page.waitForTimeout(WAIT_TIME);
  });

  await test.step("7. Delete Product", async () => {
    const searchInput = page
      .locator("label")
      .filter({ hasText: /Filter by/i })
      .locator("..")
      .locator("input");

    await searchInput.click();
    await searchInput.fill(TARGET_EMPLOYEE_ID);
    await searchInput.press("Enter");
    await page.waitForTimeout(WAIT_TIME);

    const row = page.locator("tr").filter({
      has: page.getByRole("cell", { name: TARGET_EMPLOYEE_ID, exact: true }),
    });
    const deleteBtn = row.locator("button").nth(1);
    await deleteBtn.waitFor({ state: "visible" });
    await deleteBtn.click();

    await page.getByRole("button", { name: "Cancel" }).click();
    await page.waitForTimeout(WAIT_TIME);
  });


  await test.step("4. Advanced Search", async () => {
    await page.getByRole("button", { name: "Search Total :" }).click();

    // --- ค้นหาด้วย Business Unit ---
    await openDropdown(/Business Unit/i);
    await page
      .getByRole("checkbox", { name: "Include Sub Business Units" })
      .uncheck();
    await page
      .getByRole("checkbox", { name: "Include Sub Business Units" })
      .check();
    await page.getByRole("textbox").fill(TEST_BU_SEARCH);
    await page.waitForTimeout(WAIT_TIME);
    await page.getByRole('heading', { name: TEST_BU_NAME }).click({ force: true });
    await page.keyboard.press("Escape");
    await page.getByRole("button", { name: "Search", exact: true }).click();
    await page.getByRole("button", { name: "clear" }).click();

    // --- ค้นหาด้วย Type ---
    await openDropdown(/Type/i);
    await page.getByRole("textbox").fill(TEST_EMPLOYEE_TYPE);
    await page.getByRole("menuitem", { name: TEST_EMPLOYEE_TYPE }).click();
    await page.keyboard.press("Escape");
    await page.getByRole("button", { name: "Search", exact: true }).click();

    // --- Reset ค่าทั้งหมด ---
    await page.getByRole("button", { name: "Reset" }).click();
    await page.waitForTimeout(WAIT_TIME);
  });

});