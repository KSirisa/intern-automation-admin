# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: tests\TMS-Module\Employees\01-employee.spec.ts >> Employees
- Location: tests\TMS-Module\Employees\01-employee.spec.ts:23:5

# Error details

```
Error: keyboard.type: Target page, context or browser has been closed
```

# Test source

```ts
  1   | import { test, expect } from "@playwright/test";
  2   | 
  3   | // ==========================================
  4   | // ⚙️ Global Config & Test Data
  5   | // ==========================================
  6   | const BASE_URL = "/#/global-search";
  7   | const IMPORT_FILE_PATH = "tests/TMS-Module/Employees/Data/Import_Employee.xlsx"; // ต้องเปลี่ยน
  8   | const WAIT_TIME = 1500;
  9   | 
  10  | const UNIQUE_SEED = Date.now().toString().slice(-6); // ดึงเลขท้าย 6 หลักของ Timestamp
  11  | const CURRENT_EMPLOYEE_ID = `T${UNIQUE_SEED}`; 
  12  | const CURRENT_NATIONAL_ID = `1100${UNIQUE_SEED}123`;
  13  | 
  14  | const TEST_TITLE = "นาย";
  15  | const TEST_FIRSTNAME = "ชื่อ";
  16  | const TEST_LASTNAME = "สกุล";
  17  | const TEST_PHONE = "0987654321";
  18  | const TEST_GENDER = "Male";
  19  | 
  20  | const TEST_FIRSTNAME_UPDATE = "ชื่อจริง";
  21  | const TEST_LASTNAME_UPDATE = "นามสกุล";
  22  | 
  23  | test("Employees", async ({ page }) => {
  24  |   // ==========================================
  25  |   // 🛠️ Helper Functions (ตัวช่วยลดความซ้ำซ้อน)
  26  |   // ==========================================
  27  | 
  28  |   // 1. ตัวช่วยค้นหาพนักงานผ่านช่อง ค้นหาหลัก
  29  |   const searchEmployee = async (keyword: string) => {
  30  |     await page.waitForTimeout(WAIT_TIME);
  31  |     // เลือก Input ด้วย Placeholder หรือ Filter By Label
  32  |     const searchInput = page
  33  |       .getByPlaceholder(/Filter|Search/i)
  34  |       .or(
  35  |         page
  36  |           .locator("label")
  37  |           .filter({ hasText: /Filter by/i })
  38  |           .locator("..")
  39  |           .locator("input")
  40  |       )
  41  |       .first();
  42  | 
  43  |     await searchInput.waitFor({ state: "visible" });
  44  | 
  45  |     // Focus ที่กล่องข้อความแล้วใช้ Global Keyboard พิมพ์
  46  |     await searchInput.focus();
  47  |     await page.keyboard.press("Control+A"); // เลือกทั้งหมดเพื่อลบ
  48  |     await page.keyboard.press("Backspace");
  49  |     
> 50  |     await page.keyboard.type(keyword, { delay: 100 }); // พิมพ์ทีละตัว
      |                         ^ Error: keyboard.type: Target page, context or browser has been closed
  51  |     await page.keyboard.press("Enter");
  52  | 
  53  |     await page.waitForTimeout(WAIT_TIME);
  54  |   };
  55  | 
  56  |   // 2. ตัวช่วยคลิกเปิด Dropdown (Material-UI) ด้วยชื่อ Label
  57  |   const openDropdown = async (labelRegex: RegExp) => {
  58  |     await page
  59  |       .locator("label")
  60  |       .filter({ hasText: labelRegex })
  61  |       .locator("..") // ถอยขึ้นไปหากล่อง div ด้านนอก 1 ขั้น
  62  |       .click();
  63  |   };
  64  | 
  65  |   // ==========================================
  66  |   //  Test Steps
  67  |   // ==========================================
  68  | 
  69  |   await test.step("1. Navigate to Product Master", async () => {
  70  |     await page.goto(BASE_URL);
  71  | 
  72  |     // เปิดเมนูหลัก
  73  |     await page.getByTitle("Transportation Management").first().click();
  74  |     const transportMenu = page.getByRole("button", { name: "menu" });
  75  |     await transportMenu.waitFor({ state: "visible" });
  76  |     await page.waitForTimeout(WAIT_TIME);
  77  |     await transportMenu.click();
  78  | 
  79  |     // เข้าสู่หน้า Employees
  80  |     await page.getByRole("button", { name: "Master Management" }).hover();
  81  |     await page.getByRole("button", { name: "Employees" }).click();
  82  |     await page.waitForTimeout(WAIT_TIME);
  83  |   });
  84  | 
  85  |   await test.step("2. Create New Employee", async () => {
  86  |     await page.locator("button").nth(1).click(); // ปุ่ม Create
  87  | 
  88  |     // --- กรอกข้อมูล Textbox ทั่วไป ---
  89  |     await page.locator('input[name="employeeId"]').fill(CURRENT_EMPLOYEE_ID);
  90  |     await page.locator('input[name="title"]').fill(TEST_TITLE);
  91  |     await page.locator('input[name="firstName"]').fill(TEST_FIRSTNAME);
  92  |     await page.locator('input[name="lastName"]').fill(TEST_LASTNAME);
  93  |     await page.locator('input[name="phone"]').fill(TEST_PHONE);
  94  |     await page.locator('input[name="nationalId"]').fill(CURRENT_NATIONAL_ID);
  95  | 
  96  |     // --- เลือกข้อมูล Dropdown (ใช้ Helper) ---
  97  |     await openDropdown(/Gender/i);
  98  |     await page
  99  |       .getByRole("menuitem", { name: TEST_GENDER, exact: true })
  100 |       .click();
  101 | 
  102 |     await openDropdown(/Business Unit/i);
  103 |     await page.getByRole("textbox").fill("AGG");
  104 |     await page.getByText("AGG UAT").click();
  105 | 
  106 |     await openDropdown(/Enable/i);
  107 |     await page.getByRole("menuitem", { name: "Active", exact: true }).click();
  108 | 
  109 |     await openDropdown(/Type/i);
  110 |     await page.getByRole("menuitem", { name: "Employee" }).click();
  111 | 
  112 |     // --- บันทึกข้อมูล ---
  113 |     await page.getByRole("button", { name: "Save" }).click();
  114 |     await page.getByRole("button", { name: "OK" }).click();
  115 |     await page.waitForTimeout(WAIT_TIME);
  116 |   });
  117 | 
  118 |   await test.step("3. Import / Export Data", async () => {
  119 |     // --- Import Flow ---
  120 |     await page.locator("button").nth(2).click(); // ปุ่ม Import
  121 |     await page.locator("button").nth(1).click(); // ปุ่ม Download Template
  122 |     await page.getByRole("button", { name: "OK" }).click();
  123 | 
  124 |     await page.getByLabel("Upload").setInputFiles(IMPORT_FILE_PATH);
  125 |     await page.getByRole("button", { name: "Clear" }).click();
  126 |     await page.getByLabel("Upload").setInputFiles(IMPORT_FILE_PATH);
  127 |     await page.getByRole("button", { name: "Import" }).click();
  128 |     await page.waitForTimeout(WAIT_TIME);
  129 | 
  130 |     // --- Export Flow ---
  131 |     await page.locator("button").nth(3).click(); // ปุ่ม Export
  132 |     await page.getByRole("button", { name: "OK" }).click();
  133 |     await page.waitForTimeout(WAIT_TIME);
  134 |   });
  135 |   
  136 |   await test.step("4. Advanced Search", async () => {
  137 |     await page.getByRole("button", { name: "Search Total :" }).click();
  138 | 
  139 |     // --- ค้นหาด้วย Business Unit ---
  140 |     await openDropdown(/Business Unit/i);
  141 |     await page
  142 |       .getByRole("checkbox", { name: "Include Sub Business Units" })
  143 |       .uncheck();
  144 |     await page
  145 |       .getByRole("checkbox", { name: "Include Sub Business Units" })
  146 |       .check();
  147 |     await page.getByRole("textbox").fill("AGG");
  148 |     await page.waitForTimeout(WAIT_TIME);
  149 |     await page.getByText("AGG UAT", { exact: true }).click({ force: true });
  150 |     await page.keyboard.press("Escape");
```