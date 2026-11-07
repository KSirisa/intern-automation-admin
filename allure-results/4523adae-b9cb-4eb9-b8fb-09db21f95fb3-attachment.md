# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: tests\TMS-Module\Shipment-Cat\01-shipment-cat.spec.ts >> Shipment Category - CRUD Flow
- Location: tests\TMS-Module\Shipment-Cat\01-shipment-cat.spec.ts:20:5

# Error details

```
Error: locator.waitFor: Target page, context or browser has been closed
Call log:
  - waiting for getByText('AT000', { exact: true }) to be visible

```

# Test source

```ts
  1   | import { test, expect } from "@playwright/test";
  2   | import { safeClick } from "../../../helpers";
  3   | 
  4   | // ==========================================
  5   | // ⚙️ Global Config (แก้ไขข้อมูลเทสได้ที่นี่)
  6   | // ==========================================
  7   | const BASE_URL = "/#/global-search";
  8   | const TEST_CODE = "AT001";
  9   | const TEST_NAME = "ATest Shipment Category 1";
  10  | const TEST_DESC_CREATE = "Automate Test";
  11  | const TEST_DESC_UPDATE_1 = "Automate Test Update";
  12  | const TEST_DESC_UPDATE_2 = "Automate Test Update 2";
  13  | 
  14  | //  Business Unit Configuration
  15  | const TEST_BU_SEARCH = "AGG";
  16  | const TEST_BU_NAME = "AGG UAT";
  17  | 
  18  | const WAIT_TIME = 2000; // เวลาหน่วง (มิลลิวินาที)
  19  | 
  20  | test("Shipment Category - CRUD Flow", async ({ page }) => {
  21  |   // ---------- 1. เข้าหน้า TMS & Navigate Menu ----------
  22  |   await page.goto(BASE_URL);
  23  | 
  24  |   const tmsMode = page.getByTitle("Transportation Management").first();
  25  |   await tmsMode.waitFor({ state: "visible" });
  26  |   await safeClick(tmsMode, 'Tile Transportation Management');
  27  | 
  28  |   const transportMenu = page.getByRole("button", { name: "menu" });
  29  |   await transportMenu.waitFor({ state: "visible" });
  30  |   await page.waitForTimeout(WAIT_TIME);
  31  |   await safeClick(transportMenu, 'Main Menu');
  32  | 
  33  |   const masterMgmt = page.getByRole("button", { name: "Master Management" });
  34  |   await masterMgmt.waitFor({ state: "visible" });
  35  |   await masterMgmt.hover();
  36  | 
  37  |   await safeClick(page.getByRole("button", { name: "Shipments" }), 'Menu Shipments');
  38  |   await safeClick(page.getByRole("button", { name: "Product" }), 'Menu Product');
  39  |   await safeClick(
  40  |     page.getByRole("button", { name: "Shipment Category" }),
  41  |     'Submenu Shipment Category'
  42  |   );
  43  | 
  44  |   // ---------- 2. Create (สร้างข้อมูลใหม่) ----------
  45  |   await page.waitForTimeout(WAIT_TIME);
  46  |   const createButton = page.locator("button").nth(1);
  47  |   await safeClick(createButton, 'Button Create Category');
  48  | 
  49  |   await safeClick(page.locator('input[name="code"]'), 'Input Code');
  50  |   await page.locator('input[name="code"]').fill(TEST_CODE);
  51  | 
  52  |   await safeClick(page.locator('input[name="name"]'), 'Input Name');
  53  |   await page.locator('input[name="name"]').fill(TEST_NAME);
  54  | 
  55  |   await safeClick(
  56  |     page.locator("#dropdown-select-in-formik").getByRole("textbox"),
  57  |     'Dropdown Status'
  58  |   );
  59  |   await safeClick(
  60  |     page.getByRole("menuitem", { name: "Active", exact: true }),
  61  |     'Option Status Active'
  62  |   );
  63  | 
  64  |   await page.locator('textarea[name="description"]').fill(TEST_DESC_CREATE);
  65  | 
  66  |   //  เลือกหน่วยงาน (Accessible Business Units)
  67  |   const buInput = page.getByRole("textbox").nth(4);
  68  |   await safeClick(buInput, 'Input Business Unit Search');
  69  |   await buInput.fill(TEST_BU_SEARCH);
  70  |   await page.waitForTimeout(WAIT_TIME);
  71  | 
  72  |   await safeClick(
  73  |     page.getByText(TEST_BU_NAME, { exact: true }),
  74  |     `Business Unit ${TEST_BU_NAME}`
  75  |   );
  76  | 
  77  | 
  78  |   await safeClick(page.getByRole("button", { name: "Save" }), 'Button Save');
  79  |   await safeClick(page.getByRole("button", { name: "OK" }), 'Button OK Modal');
  80  | 
  81  |   // ---------- 3. View / Back (ดูรายละเอียดและกลับ) ----------
  82  |   await page.waitForTimeout(WAIT_TIME);
  83  | 
  84  |   const searchInput = page
  85  |     .getByPlaceholder("Search")
  86  |     .or(page.getByRole("textbox").first());
  87  |   await searchInput.fill(TEST_CODE);
  88  |   await page.waitForTimeout(WAIT_TIME);
  89  | 
  90  |   const codeRow = page.getByText(TEST_CODE, { exact: true });
> 91  |   await codeRow.waitFor({ state: "visible" });
      |                 ^ Error: locator.waitFor: Target page, context or browser has been closed
  92  |   await safeClick(codeRow, `Row Code ${TEST_CODE}`);
  93  | 
  94  |   // ปุ่ม Back (ไอคอนดูรายละเอียด)
  95  |   const backBtn = page.locator("button").nth(2);
  96  |   await safeClick(backBtn, 'Button Back');
  97  | 
  98  |   // ---------- 4. Update ครั้งที่ 1 (แก้ผ่านเมนูด้านใน) ----------
  99  |   await searchInput.fill(TEST_CODE);
  100 |   await page.waitForTimeout(WAIT_TIME);
  101 | 
  102 |   await safeClick(
  103 |     page.getByText(TEST_CODE, { exact: true }),
  104 |     `Row Code ${TEST_CODE} for Edit`
  105 |   );
  106 | 
  107 |   // ปุ่ม Update/Edit (ไอคอนแก้ไข)
  108 |   const updateBtnMenu = page.locator("button").nth(1);
  109 |   await safeClick(updateBtnMenu, 'Button Edit in Detail');
  110 | 
  111 |   // แก้ไขรายละเอียด
  112 |   await page.waitForTimeout(WAIT_TIME);
  113 |   await page.locator('textarea[name="description"]').fill(TEST_DESC_UPDATE_1);
  114 | 
  115 |   await safeClick(page.getByRole("button", { name: "Save" }), 'Button Save Update 1');
  116 |   await safeClick(page.getByRole("button", { name: "OK" }), 'Button OK Update 1');
  117 |   await page.waitForTimeout(WAIT_TIME);
  118 | 
  119 |   // ---------- 5. Update ครั้งที่ 2 (แก้ผ่านปุ่มหน้าตาราง Grid) ----------
  120 |   await searchInput.fill(TEST_CODE);
  121 |   await page.waitForTimeout(WAIT_TIME);
  122 | 
  123 |   const row = page.locator("tr", { hasText: TEST_CODE });
  124 |   const updateBtn = row.locator("button").nth(0);
  125 |   await safeClick(updateBtn, 'Button Edit Grid Row');
  126 | 
  127 |   // แก้ไขรายละเอียด
  128 |   await page.waitForTimeout(WAIT_TIME);
  129 |   await page.locator('textarea[name="description"]').fill(TEST_DESC_UPDATE_2);
  130 | 
  131 |   await safeClick(page.getByRole("button", { name: "Save" }), 'Button Save Update 2');
  132 |   await safeClick(page.getByRole("button", { name: "OK" }), 'Button OK Update 2');
  133 |   await page.waitForTimeout(WAIT_TIME);
  134 | 
  135 |   // ---------- 6. Delete (ลบข้อมูล) ----------
  136 |   await searchInput.fill(TEST_CODE);
  137 |   await page.waitForTimeout(WAIT_TIME);
  138 | 
  139 |   const deleteBtn = row.locator("button").nth(1);
  140 |   await safeClick(deleteBtn, 'Button Delete Row');
  141 | 
  142 |   // ยืนยันการลบ
  143 |   await safeClick(page.getByRole("button", { name: "OK" }), 'Button OK Confirm Delete');
  144 | 
  145 |   await page.pause();
  146 | });
```