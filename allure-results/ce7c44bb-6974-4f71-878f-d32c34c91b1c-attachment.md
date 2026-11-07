# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: tests\TMS-Module\Employees\01-employee.spec.ts >> Employees
- Location: tests\TMS-Module\Employees\01-employee.spec.ts:24:5

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
  45  |     
  46  |     // Focus ที่กล่องข้อความแล้วใช้ Global Keyboard พิมพ์
  47  |     await searchInput.focus();
  48  |     await page.keyboard.press("Control+A"); // เลือกทั้งหมดเพื่อลบ
  49  |     await page.keyboard.press("Backspace");
  50  |     
> 51  |     await page.keyboard.type(keyword, { delay: 100 }); // พิมพ์ทีละตัว
      |                         ^ Error: keyboard.type: Target page, context or browser has been closed
  52  |     await page.keyboard.press("Enter");
  53  | 
  54  |     await page.waitForTimeout(WAIT_TIME);
  55  |   };
  56  | 
  57  |   // 2. ตัวช่วยคลิกเปิด Dropdown (Material-UI) ด้วยชื่อ Label
  58  |   const openDropdown = async (labelRegex: RegExp) => {
  59  |     await page
  60  |       .locator("label")
  61  |       .filter({ hasText: labelRegex })
  62  |       .locator("..") // ถอยขึ้นไปหากล่อง div ด้านนอก 1 ขั้น
  63  |       .click();
  64  |   };
  65  | 
  66  |   // ==========================================
  67  |   //  Test Steps
  68  |   // ==========================================
  69  | 
  70  |   await test.step("1. Navigate to Product Master", async () => {
  71  |     await page.goto(BASE_URL);
  72  | 
  73  |     // เปิดเมนูหลัก
  74  |     await page.getByTitle("Transportation Management").first().click();
  75  |     const transportMenu = page.getByRole("button", { name: "menu" });
  76  |     await transportMenu.waitFor({ state: "visible" });
  77  |     await page.waitForTimeout(WAIT_TIME);
  78  |     await transportMenu.click();
  79  | 
  80  |     // เข้าสู่หน้า Employees
  81  |     await page.getByRole("button", { name: "Master Management" }).hover();
  82  |     await page.getByRole("button", { name: "Employees" }).click();
  83  |     await page.waitForTimeout(WAIT_TIME);
  84  |   });
  85  | 
  86  |   await test.step("2. Create New Employee", async () => {
  87  |     await page.locator("button").nth(1).click(); // ปุ่ม Create
  88  | 
  89  |     // --- กรอกข้อมูล Textbox ทั่วไป ---
  90  |     await page.locator('input[name="employeeId"]').fill(TEST_EMPLOYEE_ID);
  91  |     await page.locator('input[name="title"]').fill(TEST_TITLE);
  92  |     await page.locator('input[name="firstName"]').fill(TEST_FIRSTNAME);
  93  |     await page.locator('input[name="lastName"]').fill(TEST_LASTNAME);
  94  |     await page.locator('input[name="phone"]').fill(TEST_PHONE);
  95  |     await page.locator('input[name="nationalId"]').fill(TEST_NATIONAL_ID);
  96  | 
  97  |     // --- เลือกข้อมูล Dropdown (ใช้ Helper) ---
  98  |     await openDropdown(/Gender/i);
  99  |     await page
  100 |       .getByRole("menuitem", { name: TEST_GENDER, exact: true })
  101 |       .click();
  102 | 
  103 |     await openDropdown(/Business Unit/i);
  104 |     await page.getByRole("textbox").fill("AGG");
  105 |     await page.getByText("AGG UAT").click();
  106 | 
  107 |     await openDropdown(/Enable/i);
  108 |     await page.getByRole("menuitem", { name: "Active", exact: true }).click();
  109 | 
  110 |     await openDropdown(/Type/i);
  111 |     await page.getByRole("menuitem", { name: "Employee" }).click();
  112 | 
  113 |     // --- บันทึกข้อมูล ---
  114 |     await page.getByRole("button", { name: "Save" }).click();
  115 |     await page.getByRole("button", { name: "OK" }).click();
  116 |     await page.waitForTimeout(WAIT_TIME);
  117 |   });
  118 | 
  119 |   await test.step("3. Import / Export Data", async () => {
  120 |     // --- Import Flow ---
  121 |     await page.locator("button").nth(2).click(); // ปุ่ม Import
  122 |     await page.locator("button").nth(1).click(); // ปุ่ม Download Template
  123 |     await page.getByRole("button", { name: "OK" }).click();
  124 | 
  125 |     await page.getByLabel("Upload").setInputFiles(IMPORT_FILE_PATH);
  126 |     await page.getByRole("button", { name: "Clear" }).click();
  127 |     await page.getByLabel("Upload").setInputFiles(IMPORT_FILE_PATH);
  128 |     await page.getByRole("button", { name: "Import" }).click();
  129 |     await page.waitForTimeout(WAIT_TIME);
  130 | 
  131 |     // --- Export Flow ---
  132 |     await page.locator("button").nth(3).click(); // ปุ่ม Export
  133 |     await page.getByRole("button", { name: "OK" }).click();
  134 |     await page.waitForTimeout(WAIT_TIME);
  135 |   });
  136 |   
  137 |   await test.step("4. Advanced Search", async () => {
  138 |     await page.getByRole("button", { name: "Search Total :" }).click();
  139 | 
  140 |     // --- ค้นหาด้วย Business Unit ---
  141 |     await openDropdown(/Business Unit/i);
  142 |     await page
  143 |       .getByRole("checkbox", { name: "Include Sub Business Units" })
  144 |       .uncheck();
  145 |     await page
  146 |       .getByRole("checkbox", { name: "Include Sub Business Units" })
  147 |       .check();
  148 |     await page.getByRole("textbox").fill("AGG");
  149 |     await page.waitForTimeout(WAIT_TIME);
  150 |     await page.getByText("AGG UAT", { exact: true }).click({ force: true });
  151 |     await page.keyboard.press("Escape");
```