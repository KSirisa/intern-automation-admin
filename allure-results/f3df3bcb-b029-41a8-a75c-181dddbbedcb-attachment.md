# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: tests\TMS-Module\Employees\01-employee.spec.ts >> Employees
- Location: tests\TMS-Module\Employees\01-employee.spec.ts:24:5

# Error details

```
Error: page.goto: Target page, context or browser has been closed
Call log:
  - navigating to "https://netcoresql.nostralogistics.com/#/global-search", waiting until "load"

```

# Test source

```ts
  1   | import { test, expect } from "@playwright/test";
  2   | 
  3   | // ==========================================
  4   | // ⚙️ Global Config & Test Data
  5   | // ==========================================
  6   | const BASE_URL = "/#/global-search";
  7   | const IMPORT_FILE_PATH = "C:/Users/4rmxi/Downloads/Import_Employee.xlsx"; // ต้องเปลี่ยน
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
  31  |     const searchInput = page
  32  |       .locator("label")
  33  |       .filter({ hasText: /Filter by/i })
  34  |       .locator("..")
  35  |       .locator("input");
  36  | 
  37  |     await searchInput.click();
  38  |     await searchInput.fill(keyword);
  39  |     await searchInput.press("Enter");
  40  |     await page.waitForTimeout(WAIT_TIME);
  41  |   };
  42  | 
  43  |   // 2. ตัวช่วยคลิกเปิด Dropdown (Material-UI) ด้วยชื่อ Label
  44  |   const openDropdown = async (labelRegex: RegExp) => {
  45  |     await page
  46  |       .locator("label")
  47  |       .filter({ hasText: labelRegex })
  48  |       .locator("..") // ถอยขึ้นไปหากล่อง div ด้านนอก 1 ขั้น
  49  |       .click();
  50  |   };
  51  | 
  52  |   // ==========================================
  53  |   //  Test Steps
  54  |   // ==========================================
  55  | 
  56  |   await test.step("1. Navigate to Product Master", async () => {
> 57  |     await page.goto(BASE_URL);
      |                ^ Error: page.goto: Target page, context or browser has been closed
  58  | 
  59  |     // เปิดเมนูหลัก
  60  |     await page.getByTitle("Transportation Management").first().click();
  61  |     const transportMenu = page.getByRole("button", { name: "menu" });
  62  |     await transportMenu.waitFor({ state: "visible" });
  63  |     await page.waitForTimeout(WAIT_TIME);
  64  |     await transportMenu.click();
  65  | 
  66  |     // เข้าสู่หน้า Employees
  67  |     await page.getByRole("button", { name: "Master Management" }).hover();
  68  |     await page.getByRole("button", { name: "Employees" }).click();
  69  |     await page.waitForTimeout(WAIT_TIME);
  70  |   });
  71  | 
  72  |   await test.step("2. Create New Employee", async () => {
  73  |     await page.locator("button").nth(1).click(); // ปุ่ม Create
  74  | 
  75  |     // --- กรอกข้อมูล Textbox ทั่วไป ---
  76  |     await page.locator('input[name="employeeId"]').fill(TEST_EMPLOYEE_ID);
  77  |     await page.locator('input[name="title"]').fill(TEST_TITLE);
  78  |     await page.locator('input[name="firstName"]').fill(TEST_FIRSTNAME);
  79  |     await page.locator('input[name="lastName"]').fill(TEST_LASTNAME);
  80  |     await page.locator('input[name="phone"]').fill(TEST_PHONE);
  81  |     await page.locator('input[name="nationalId"]').fill(TEST_NATIONAL_ID);
  82  | 
  83  |     // --- เลือกข้อมูล Dropdown (ใช้ Helper) ---
  84  |     await openDropdown(/Gender/i);
  85  |     await page
  86  |       .getByRole("menuitem", { name: TEST_GENDER, exact: true })
  87  |       .click();
  88  | 
  89  |     await openDropdown(/Business Unit/i);
  90  |     await page.getByRole("textbox").fill("AGG");
  91  |     await page.getByText("AGG UAT").click();
  92  | 
  93  |     await openDropdown(/Enable/i);
  94  |     await page.getByRole("menuitem", { name: "Active", exact: true }).click();
  95  | 
  96  |     await openDropdown(/Type/i);
  97  |     await page.getByRole("menuitem", { name: "Employee" }).click();
  98  | 
  99  |     // --- บันทึกข้อมูล ---
  100 |     await page.getByRole("button", { name: "Save" }).click();
  101 |     await page.getByRole("button", { name: "OK" }).click();
  102 |     await page.waitForTimeout(WAIT_TIME);
  103 |   });
  104 | 
  105 |   await test.step("3. Import / Export Data", async () => {
  106 |     // --- Import Flow ---
  107 |     await page.locator("button").nth(2).click(); // ปุ่ม Import
  108 |     await page.locator("button").nth(1).click(); // ปุ่ม Download Template
  109 |     await page.getByRole("button", { name: "OK" }).click();
  110 | 
  111 |     await page.getByLabel("Upload").setInputFiles(IMPORT_FILE_PATH);
  112 |     await page.getByRole("button", { name: "Clear" }).click();
  113 |     await page.getByLabel("Upload").setInputFiles(IMPORT_FILE_PATH);
  114 |     await page.getByRole("button", { name: "Import" }).click();
  115 |     await page.waitForTimeout(WAIT_TIME);
  116 | 
  117 |     // --- Export Flow ---
  118 |     await page.locator("button").nth(3).click(); // ปุ่ม Export
  119 |     await page.getByRole("button", { name: "OK" }).click();
  120 |     await page.waitForTimeout(WAIT_TIME);
  121 |   });
  122 |   
  123 |   await test.step("4. Advanced Search", async () => {
  124 |     await page.getByRole("button", { name: "Search Total :" }).click();
  125 | 
  126 |     // --- ค้นหาด้วย Business Unit ---
  127 |     await openDropdown(/Business Unit/i);
  128 |     await page
  129 |       .getByRole("checkbox", { name: "Include Sub Business Units" })
  130 |       .uncheck();
  131 |     await page
  132 |       .getByRole("checkbox", { name: "Include Sub Business Units" })
  133 |       .check();
  134 |     await page.getByRole("textbox").fill("AGG");
  135 |     await page.waitForTimeout(WAIT_TIME);
  136 |     await page.getByText("AGG UAT", { exact: true }).click({ force: true });
  137 |     await page.keyboard.press("Escape");
  138 |     await page.getByRole("button", { name: "Search", exact: true }).click();
  139 |     await page.getByRole("button", { name: "clear" }).click();
  140 | 
  141 |     // --- ค้นหาด้วย Type ---
  142 |     await openDropdown(/Type/i);
  143 |     await page.getByRole("textbox").fill("Employee");
  144 |     await page.getByRole("menuitem", { name: "Employee" }).click();
  145 |     await page.keyboard.press("Escape");
  146 |     await page.getByRole("button", { name: "Search", exact: true }).click();
  147 | 
  148 |     // --- Reset ค่าทั้งหมด ---
  149 |     await page.getByRole("button", { name: "Reset" }).click();
  150 |     await page.waitForTimeout(WAIT_TIME);
  151 |   });
  152 | 
  153 |   await test.step("5. View Employee", async () => {
  154 |     await searchEmployee(TEST_EMPLOYEE_ID);
  155 |     await page.getByText(TEST_EMPLOYEE_ID, { exact: true }).click();
  156 |     await page.waitForTimeout(WAIT_TIME);
  157 | 
```