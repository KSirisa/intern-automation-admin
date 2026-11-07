# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: tests\TMS-Module\Employees\01-employee.spec.ts >> Employees
- Location: tests\TMS-Module\Employees\01-employee.spec.ts:24:5

# Error details

```
Error: locator.fill: Target page, context or browser has been closed
Call log:
  - waiting for getByPlaceholder(/Filter|Search/i).or(locator('label').filter({ hasText: /Filter by/i }).locator('..').locator('input')).first()
    - locator resolved to <input value="" type="text" maxlength="100" autocomplete="off" aria-invalid="false" class="MuiInputBase-input MuiOutlinedInput-input MuiInputBase-inputAdornedEnd MuiOutlinedInput-inputAdornedEnd MuiInputBase-inputMarginDense MuiOutlinedInput-inputMarginDense"/>
    - fill("T2610271046")
  - attempting fill action
    - waiting for element to be visible, enabled and editable

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
  10  | const pad = (n: number) => String(n).padStart(2, "0");
  11  | const now = new Date();
  12  | 
  13  | const TEST_EMPLOYEE_ID = `T${pad(now.getFullYear() % 100)}${pad(now.getMonth() + 1)}${pad(now.getDate())}${pad(now.getHours())}${pad(now.getMinutes())}`;
  14  | const TEST_TITLE = "นาย";
  15  | const TEST_FIRSTNAME = "ชื่อ";
  16  | const TEST_LASTNAME = "สกุล";
  17  | const TEST_PHONE = "0987654321";
  18  | const TEST_GENDER = "Male";
  19  | const TEST_NATIONAL_ID = `${pad(now.getFullYear() % 100)}${pad(now.getMonth() + 1)}${pad(now.getDate())}${pad(now.getHours())}${pad(now.getMinutes())}`;
  20  | 
  21  | const TEST_FIRSTNAME_UPDATE = "ชื่อจริง";
  22  | const TEST_LASTNAME_UPDATE = "นามสกุล";
  23  | 
  24  | test("Employees", async ({ page }) => {
  25  |   // ==========================================
  26  |   // 🛠️ Helper Functions (ตัวช่วยลดความซ้ำซ้อน)
  27  |   // ==========================================
  28  | 
  29  |   // 1. ตัวช่วยค้นหาพนักงานผ่านช่อง ค้นหาหลัก
  30  |   const searchEmployee = async (keyword: string) => {
  31  |     await page.waitForTimeout(WAIT_TIME);
  32  |     // เลือก Input ด้วย Placeholder หรือ Filter By Label
  33  |     const searchInput = page
  34  |       .getByPlaceholder(/Filter|Search/i)
  35  |       .or(
  36  |         page
  37  |           .locator("label")
  38  |           .filter({ hasText: /Filter by/i })
  39  |           .locator("..")
  40  |           .locator("input")
  41  |       )
  42  |       .first();
  43  | 
  44  |     await searchInput.waitFor({ state: "visible" });
  45  |     await searchInput.click();
  46  | 
  47  |     // ล้างค่าเก่าก่อนพิมพ์ค่าใหม่เสมอ
  48  |     await searchInput.clear();
> 49  |     await searchInput.fill(keyword);
      |                       ^ Error: locator.fill: Target page, context or browser has been closed
  50  |     await searchInput.press("Enter");
  51  |     
  52  |     await page.waitForTimeout(WAIT_TIME);
  53  |   };
  54  | 
  55  |   // 2. ตัวช่วยคลิกเปิด Dropdown (Material-UI) ด้วยชื่อ Label
  56  |   const openDropdown = async (labelRegex: RegExp) => {
  57  |     await page
  58  |       .locator("label")
  59  |       .filter({ hasText: labelRegex })
  60  |       .locator("..") // ถอยขึ้นไปหากล่อง div ด้านนอก 1 ขั้น
  61  |       .click();
  62  |   };
  63  | 
  64  |   // ==========================================
  65  |   //  Test Steps
  66  |   // ==========================================
  67  | 
  68  |   await test.step("1. Navigate to Product Master", async () => {
  69  |     await page.goto(BASE_URL);
  70  | 
  71  |     // เปิดเมนูหลัก
  72  |     await page.getByTitle("Transportation Management").first().click();
  73  |     const transportMenu = page.getByRole("button", { name: "menu" });
  74  |     await transportMenu.waitFor({ state: "visible" });
  75  |     await page.waitForTimeout(WAIT_TIME);
  76  |     await transportMenu.click();
  77  | 
  78  |     // เข้าสู่หน้า Employees
  79  |     await page.getByRole("button", { name: "Master Management" }).hover();
  80  |     await page.getByRole("button", { name: "Employees" }).click();
  81  |     await page.waitForTimeout(WAIT_TIME);
  82  |   });
  83  | 
  84  |   await test.step("2. Create New Employee", async () => {
  85  |     await page.locator("button").nth(1).click(); // ปุ่ม Create
  86  | 
  87  |     // --- กรอกข้อมูล Textbox ทั่วไป ---
  88  |     await page.locator('input[name="employeeId"]').fill(TEST_EMPLOYEE_ID);
  89  |     await page.locator('input[name="title"]').fill(TEST_TITLE);
  90  |     await page.locator('input[name="firstName"]').fill(TEST_FIRSTNAME);
  91  |     await page.locator('input[name="lastName"]').fill(TEST_LASTNAME);
  92  |     await page.locator('input[name="phone"]').fill(TEST_PHONE);
  93  |     await page.locator('input[name="nationalId"]').fill(TEST_NATIONAL_ID);
  94  | 
  95  |     // --- เลือกข้อมูล Dropdown (ใช้ Helper) ---
  96  |     await openDropdown(/Gender/i);
  97  |     await page
  98  |       .getByRole("menuitem", { name: TEST_GENDER, exact: true })
  99  |       .click();
  100 | 
  101 |     await openDropdown(/Business Unit/i);
  102 |     await page.getByRole("textbox").fill("AGG");
  103 |     await page.getByText("AGG UAT").click();
  104 | 
  105 |     await openDropdown(/Enable/i);
  106 |     await page.getByRole("menuitem", { name: "Active", exact: true }).click();
  107 | 
  108 |     await openDropdown(/Type/i);
  109 |     await page.getByRole("menuitem", { name: "Employee" }).click();
  110 | 
  111 |     // --- บันทึกข้อมูล ---
  112 |     await page.getByRole("button", { name: "Save" }).click();
  113 |     await page.getByRole("button", { name: "OK" }).click();
  114 |     await page.waitForTimeout(WAIT_TIME);
  115 |   });
  116 | 
  117 |   await test.step("3. Import / Export Data", async () => {
  118 |     // --- Import Flow ---
  119 |     await page.locator("button").nth(2).click(); // ปุ่ม Import
  120 |     await page.locator("button").nth(1).click(); // ปุ่ม Download Template
  121 |     await page.getByRole("button", { name: "OK" }).click();
  122 | 
  123 |     await page.getByLabel("Upload").setInputFiles(IMPORT_FILE_PATH);
  124 |     await page.getByRole("button", { name: "Clear" }).click();
  125 |     await page.getByLabel("Upload").setInputFiles(IMPORT_FILE_PATH);
  126 |     await page.getByRole("button", { name: "Import" }).click();
  127 |     await page.waitForTimeout(WAIT_TIME);
  128 | 
  129 |     // --- Export Flow ---
  130 |     await page.locator("button").nth(3).click(); // ปุ่ม Export
  131 |     await page.getByRole("button", { name: "OK" }).click();
  132 |     await page.waitForTimeout(WAIT_TIME);
  133 |   });
  134 |   
  135 |   await test.step("4. Advanced Search", async () => {
  136 |     await page.getByRole("button", { name: "Search Total :" }).click();
  137 | 
  138 |     // --- ค้นหาด้วย Business Unit ---
  139 |     await openDropdown(/Business Unit/i);
  140 |     await page
  141 |       .getByRole("checkbox", { name: "Include Sub Business Units" })
  142 |       .uncheck();
  143 |     await page
  144 |       .getByRole("checkbox", { name: "Include Sub Business Units" })
  145 |       .check();
  146 |     await page.getByRole("textbox").fill("AGG");
  147 |     await page.waitForTimeout(WAIT_TIME);
  148 |     await page.getByText("AGG UAT", { exact: true }).click({ force: true });
  149 |     await page.keyboard.press("Escape");
```