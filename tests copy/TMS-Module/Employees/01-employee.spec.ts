import { test, expect } from "@playwright/test";

// ==========================================
// ⚙️ Global Config & Test Data
// ==========================================
const BASE_URL = "/#/global-search";
const IMPORT_FILE_PATH = "C:/Users/4rmxi/Downloads/Import_Employee.xlsx"; // ต้องเปลี่ยน
const WAIT_TIME = 1500;

const pad = (n: number) => String(n).padStart(2, "0");
const now = new Date();

const TEST_EMPLOYEE_ID = `T${pad(now.getFullYear() % 100)}${pad(now.getMonth() + 1)}${pad(now.getDate())}${pad(now.getHours())}${pad(now.getMinutes())}`;
const TEST_TITLE = "นาย";
const TEST_FIRSTNAME = "ชื่อ";
const TEST_LASTNAME = "สกุล";
const TEST_PHONE = "0987654321";
const TEST_GENDER = "Male";
const TEST_NATIONAL_ID = `${pad(now.getFullYear() % 100)}${pad(now.getMonth() + 1)}${pad(now.getDate())}${pad(now.getHours())}${pad(now.getMinutes())}`;

const TEST_FIRSTNAME_UPDATE = "ชื่อจริง";
const TEST_LASTNAME_UPDATE = "นามสกุล";

test("Employees", async ({ page }) => {
  // ==========================================
  // 🛠️ Helper Functions (ตัวช่วยลดความซ้ำซ้อน)
  // ==========================================

  // 1. ตัวช่วยค้นหาพนักงานผ่านช่อง ค้นหาหลัก
  const searchEmployee = async (keyword: string) => {
    const searchInput = page
      .locator("label")
      .filter({ hasText: /Filter by/i })
      .locator("..")
      .locator("input");

    await searchInput.click();
    await searchInput.fill(keyword);
    await searchInput.press("Enter");
    await page.waitForTimeout(WAIT_TIME);
  };

  // 2. ตัวช่วยคลิกเปิด Dropdown (Material-UI) ด้วยชื่อ Label
  const openDropdown = async (labelRegex: RegExp) => {
    await page
      .locator("label")
      .filter({ hasText: labelRegex })
      .locator("..") // ถอยขึ้นไปหากล่อง div ด้านนอก 1 ขั้น
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

  await test.step("2. Create New Employee", async () => {
    await page.locator("button").nth(1).click(); // ปุ่ม Create

    // --- กรอกข้อมูล Textbox ทั่วไป ---
    await page.locator('input[name="employeeId"]').fill(TEST_EMPLOYEE_ID);
    await page.locator('input[name="title"]').fill(TEST_TITLE);
    await page.locator('input[name="firstName"]').fill(TEST_FIRSTNAME);
    await page.locator('input[name="lastName"]').fill(TEST_LASTNAME);
    await page.locator('input[name="phone"]').fill(TEST_PHONE);
    await page.locator('input[name="nationalId"]').fill(TEST_NATIONAL_ID);

    // --- เลือกข้อมูล Dropdown (ใช้ Helper) ---
    await openDropdown(/Gender/i);
    await page
      .getByRole("menuitem", { name: TEST_GENDER, exact: true })
      .click();

    await openDropdown(/Business Unit/i);
    await page.getByRole("textbox").fill("AGG");
    await page.getByText("AGG UAT").click();

    await openDropdown(/Enable/i);
    await page.getByRole("menuitem", { name: "Active", exact: true }).click();

    await openDropdown(/Type/i);
    await page.getByRole("menuitem", { name: "Employee" }).click();

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
    await page.getByRole("textbox").fill("AGG");
    await page.waitForTimeout(WAIT_TIME);
    await page.getByText("AGG UAT", { exact: true }).click({ force: true });
    await page.keyboard.press("Escape");
    await page.getByRole("button", { name: "Search", exact: true }).click();
    await page.getByRole("button", { name: "clear" }).click();

    // --- ค้นหาด้วย Type ---
    await openDropdown(/Type/i);
    await page.getByRole("textbox").fill("Employee");
    await page.getByRole("menuitem", { name: "Employee" }).click();
    await page.keyboard.press("Escape");
    await page.getByRole("button", { name: "Search", exact: true }).click();

    // --- Reset ค่าทั้งหมด ---
    await page.getByRole("button", { name: "Reset" }).click();
    await page.waitForTimeout(WAIT_TIME);
  });

  await test.step("5. View Employee", async () => {
    await searchEmployee(TEST_EMPLOYEE_ID);
    await page.getByText(TEST_EMPLOYEE_ID, { exact: true }).click();
    await page.waitForTimeout(WAIT_TIME);

    await page.locator("button").nth(2).click(); // ปุ่ม Back
  });

  await test.step("6. Update Product (Details & Table)", async () => {
    // --- แก้ไขผ่านหน้ารายละเอียด (Details) ---
    await searchEmployee(TEST_EMPLOYEE_ID);
    await page.getByText(TEST_EMPLOYEE_ID, { exact: true }).click();
    await page.waitForTimeout(WAIT_TIME);

    await page.locator("button").nth(1).click(); // ปุ่ม Edit
    await page.waitForTimeout(WAIT_TIME);
    await page.locator('input[name="firstName"]').fill(TEST_FIRSTNAME_UPDATE);
    await page.getByRole("button", { name: "Save" }).click();
    await page.getByRole("button", { name: "OK" }).click();
    await page.waitForTimeout(WAIT_TIME);

    // --- แก้ไขผ่าน row (Details) ---
    await searchEmployee(TEST_EMPLOYEE_ID);
    const row = page.locator("tr").filter({
      has: page.getByRole("cell", { name: TEST_EMPLOYEE_ID, exact: true }),
    });
    const editBtn = row.locator("button").first();
    await editBtn.waitFor({ state: "visible" });
    await editBtn.click();

    // --- ส่วนกรอกข้อมูลทำตามเดิม ---
    await page.waitForTimeout(WAIT_TIME);
    await page.locator('input[name="lastName"]').fill(TEST_LASTNAME_UPDATE);
    await page.getByRole("button", { name: "Save" }).click();
    await page.getByRole("button", { name: "OK" }).click();
    await page.waitForTimeout(WAIT_TIME);
  });

  await test.step("7. Delete Product", async () => {
    await searchEmployee(TEST_EMPLOYEE_ID);
    const row = page.locator("tr").filter({
      has: page.getByRole("cell", { name: TEST_EMPLOYEE_ID, exact: true }),
    });
    const deleteBtn = row.locator("button").nth(1);
    await deleteBtn.waitFor({ state: "visible" });
    await deleteBtn.click();

    await page.getByRole("button", { name: "OK" }).click();
    await page.waitForTimeout(WAIT_TIME);
  });

  await page.pause();
});
