# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: tests\TMS-Module\Product\01-product-master.spec.ts >> Product Master - End to End Flow
- Location: tests\TMS-Module\Product\01-product-master.spec.ts:25:5

# Error details

```
Error: locator.click: Target page, context or browser has been closed
Call log:
  - waiting for getByRole('button', { name: 'OK' })

```

# Test source

```ts
  14  | const TEST_SHORT_NAME = "AT";
  15  | const TEST_DESC = "Automate Test";
  16  | const TEST_DESC_UPDATE_1 = "ตัวอย่างข้อมูล UPDATE";
  17  | const TEST_DESC_UPDATE_2 = "ตัวอย่างข้อมูล UPDATE 2";
  18  | const TEST_CODE_COPY = "AT1010";
  19  | const TEST_NAME_COPY = "ATest1010";
  20  | const TEST_SHORT_NAME_COPY = "ATCopy1010";
  21  | 
  22  | const TEST_BU_SEARCH = "AGG";
  23  | const TEST_BU_NAME = "AGG UAT";
  24  | 
  25  | test("Product Master - End to End Flow", async ({ page }) => {
  26  | 
  27  |   // ----------------------------------------------------
  28  |   // 🛠️ Helper Function: สำหรับพิมพ์ค้นหา จะได้ไม่เปลืองบรรทัด
  29  |   // ----------------------------------------------------
  30  |   const searchProduct = async (keyword: string) => {
  31  |     const searchInput = page.getByPlaceholder('Search').or(page.getByRole('textbox').first());
  32  |     await searchInput.fill(keyword);
  33  |     await searchInput.press('Enter');
  34  |     await page.waitForTimeout(WAIT_TIME);
  35  |   };
  36  | 
  37  |   await test.step("1. Navigate to Product Master", async () => {
  38  |     await page.goto(BASE_URL);
  39  |     
  40  |     await page.getByTitle("Transportation Management").first().click();
  41  | 
  42  |     const transportMenu = page.getByRole("button", { name: "menu" });
  43  |     await transportMenu.waitFor({ state: "visible" });
  44  |     await page.waitForTimeout(WAIT_TIME);
  45  |     await transportMenu.click();
  46  | 
  47  |     await page.getByRole("button", { name: "Master Management" }).hover();
  48  |     await page.getByRole("button", { name: "Shipments" }).click();
  49  |     await page.getByRole("button", { name: "Product" }).click();
  50  |     await page.getByRole("button", { name: "Product Master" }).click();
  51  |     await page.waitForTimeout(WAIT_TIME);
  52  |   });
  53  | 
  54  |   await test.step("2. Create New Product & Upload Image", async () => {
  55  |     await page.locator('button').nth(1).click(); // กดปุ่ม Create
  56  | 
  57  |     // อัปโหลดและลบรูปภาพ
  58  |     await page.getByLabel('Add Picture').setInputFiles(IMAGE_PATH);
  59  |     await page.getByRole('img').filter({ hasText: /^$/ }).nth(4).click();
  60  |     await page.getByLabel('Add Picture').setInputFiles(IMAGE_PATH);
  61  | 
  62  |     // กรอกข้อมูลทั่วไป
  63  |     await page.locator('input[name="code"]').fill(TEST_CODE);
  64  |     await page.locator('input[name="name"]').fill(TEST_NAME);
  65  |     await page.locator('input[name="shortName"]').fill(TEST_SHORT_NAME);
  66  | 
  67  |     // เลือก Dropdowns
  68  |     await page.locator('#product-category-select').getByRole('textbox').click();
  69  |     await page.getByRole('menuitem', { name: 'ATest Product Categories' }).click();
  70  |     await page.locator('#product-type-select').getByRole('textbox').click();
  71  |     await page.getByRole('heading', { name: 'ATest Product Types' }).click();
  72  |     await page.locator('#product-status-select').getByRole('textbox').click();
  73  |     await page.getByRole('menuitem', { name: 'Active', exact: true }).click();
  74  |     await page.locator('#product-group-select').getByRole('textbox').click();
  75  |     await page.getByRole('heading', { name: 'Finished Goods', exact: true }).click();
  76  | 
  77  |     // ข้อมูล Hazardous & Description
  78  |     await page.getByRole('paragraph').filter({ hasText: 'Is Hazardous' }).getByRole('checkbox').check();
  79  |     await page.locator('input[name="hazardousClass"]').fill('HC');
  80  |     await page.locator('input[name="unNumber"]').fill('UN');
  81  |     await page.locator('input[name="description"]').fill(TEST_DESC);
  82  | 
  83  |     // เลือก Business Unit
  84  |     await page.locator('.MuiFormControl-root input[type="text"]').last().fill(TEST_BU_SEARCH);
  85  |     await page.getByText(TEST_BU_NAME, { exact: true }).click({ force: true });
  86  | 
  87  |   });
  88  | 
  89  |   await test.step("3. Product Unit Modal & Save", async () => {
  90  |     await page.getByRole('button', { name: 'Add' }).click();
  91  |     await page.getByRole('checkbox').check();
  92  | 
  93  |     await page.locator('#dialog-productUnit-unitSelected').getByRole('textbox').click();
  94  |     await page.getByRole('menuitem', { name: 'กิโลกรัม' }).click();
  95  | 
  96  |     await page.locator('#productUnit-productWeight').fill('10');
  97  |     await page.locator('#productUnit-productVolume').fill('100');
  98  |     await page.locator('#productUnit-conversionRate').fill('100');
  99  |     await page.locator('#productUnit-packageWeight').fill('0');
  100 |     await page.locator('#productUnit-packageVolume').fill('0');
  101 |     await page.locator('#productUnit-unitPrice').fill('100');
  102 | 
  103 |     await page.getByRole('button', { name: 'Save' }).click(); // Save Modal
  104 |     await page.getByRole('button', { name: 'Save' }).click(); // Save Main Page
  105 |     await page.getByRole('button', { name: 'OK' }).click();
  106 |     await page.waitForTimeout(WAIT_TIME);
  107 |   });
  108 | 
  109 |   await test.step("4. Import / Export Data", async () => {
  110 |     // Import Flow
  111 |     await page.getByRole("button").nth(2).click(); 
  112 |     await page.waitForTimeout(WAIT_TIME);
  113 |     await page.getByRole("button").nth(1).click(); // Download Template
> 114 |     await page.getByRole('button', { name: 'OK' }).click();
      |                                                    ^ Error: locator.click: Target page, context or browser has been closed
  115 | 
  116 |     await page.getByLabel("Upload").setInputFiles(IMPORT_FILE_PATH);
  117 |     await page.getByRole('button', { name: 'Clear' }).click();
  118 |     await page.getByLabel("Upload").setInputFiles(IMPORT_FILE_PATH);
  119 |     await page.getByRole('button', { name: 'Import' }).click();
  120 | 
  121 |     // Export Flow
  122 |     await page.waitForTimeout(WAIT_TIME);
  123 |     await page.getByRole("button").nth(3).click(); 
  124 |     await page.getByRole('button', { name: 'OK' }).click();
  125 |     await page.waitForTimeout(WAIT_TIME);
  126 |   });
  127 | 
  128 |   await test.step("5. View and Copy Product", async () => {
  129 |     // ดูรายละเอียด
  130 |     await searchProduct(TEST_CODE);
  131 |     await page.getByText(TEST_CODE).click();
  132 |     await page.waitForTimeout(WAIT_TIME);
  133 |     await page.locator('button').nth(3).click(); // ปุ่ม Back
  134 | 
  135 |     // Copy ข้อมูล
  136 |     await searchProduct(TEST_CODE);
  137 |     await page.getByText(TEST_CODE).click();
  138 |     await page.locator('button').nth(2).click(); // ปุ่ม Copy
  139 |     await page.waitForTimeout(WAIT_TIME);
  140 | 
  141 |     await page.locator('input[name="code"]').fill(TEST_CODE_COPY);
  142 |     await page.locator('input[name="name"]').fill(TEST_NAME_COPY);
  143 |     await page.locator('input[name="shortName"]').fill(TEST_SHORT_NAME_COPY);
  144 |     await page.getByRole('button', { name: 'Save' }).click();
  145 |     await page.getByRole('button', { name: 'OK' }).click();
  146 |   });
  147 | 
  148 |   await test.step("6. Update Product (Details & Table)", async () => {
  149 |     // แก้ไขผ่านหน้ารายละเอียด (Details)
  150 |     await searchProduct(TEST_CODE);
  151 |     await page.getByText(TEST_CODE).click();
  152 |     await page.waitForTimeout(WAIT_TIME);
  153 |     
  154 |     await page.locator('button').nth(1).click(); // ปุ่ม Edit
  155 |     await page.waitForTimeout(WAIT_TIME);
  156 |     await page.locator('input[name="description"]').fill(TEST_DESC_UPDATE_1);
  157 |     await page.getByRole('button', { name: 'Save' }).click();
  158 |     await page.getByRole('button', { name: 'OK' }).click();
  159 | 
  160 |     // แก้ไขผ่านหน้าตาราง (Table Row)
  161 |     await searchProduct(TEST_CODE);
  162 |     const row = page.locator('tr', { hasText: TEST_CODE });
  163 |     await row.locator('button').nth(0).click({ force: true }); 
  164 |     
  165 |     await page.waitForTimeout(WAIT_TIME);
  166 |     await page.locator('input[name="description"]').fill(TEST_DESC_UPDATE_2);
  167 |     await page.getByRole('button', { name: 'Save' }).click();
  168 |     await page.getByRole('button', { name: 'OK' }).click();
  169 |     await page.waitForTimeout(WAIT_TIME);
  170 |   });
  171 | 
  172 |   await test.step("7. Delete Product", async () => {
  173 |     await searchProduct(TEST_CODE);
  174 |     const row = page.locator('tr', { hasText: TEST_CODE });
  175 |     await row.locator('button').nth(1).click({ force: true }); // ปุ่ม Delete
  176 |     await page.getByRole('button', { name: 'OK' }).click();
  177 |   });
  178 | 
  179 |   await test.step("8. Advanced Search", async () => {
  180 |     await page.getByRole('button', { name: 'Search Total :' }).click();
  181 | 
  182 |     // ค้นหาด้วย Category
  183 |     await page.locator('div').filter({ hasText: /^Category$/ }).click();
  184 |     await page.getByRole('textbox').fill('BIG-C');
  185 |     await page.getByRole('option', { name: 'BIG-C' }).click();
  186 |     await page.keyboard.press('Escape'); 
  187 |     await page.getByRole('button', { name: 'Search', exact: true }).click();
  188 |     await page.getByRole('button', { name: 'clear' }).click();
  189 | 
  190 |     // ค้นหาด้วย Product Types
  191 |     await page.locator('div').filter({ hasText: /^Product Types$/ }).click();
  192 |     await page.getByRole('textbox').fill('EED');
  193 |     await page.getByRole('option', { name: 'EED' }).getByRole('checkbox').check();
  194 |     await page.keyboard.press('Escape');
  195 |     await page.getByRole('button', { name: 'Search', exact: true }).click();
  196 |     await page.getByRole('button', { name: 'clear' }).click();
  197 | 
  198 |     // ค้นหาด้วย Product SKU
  199 |     await page.locator('div').filter({ hasText: /^Product SKU$/ }).click();
  200 |     await page.getByRole('textbox').fill('กิโลกรัม');
  201 |     await page.getByRole('option', { name: 'กิโลกรัม' }).getByRole('checkbox').check();
  202 |     await page.keyboard.press('Escape');
  203 |     await page.getByRole('button', { name: 'Search', exact: true }).click();
  204 |     await page.getByRole('button', { name: 'clear' }).click();
  205 | 
  206 |     // ค้นหาด้วย Status (Enable)
  207 |     await page.locator('div').filter({ hasText: /^Enable$/ }).click();
  208 |     await page.getByRole('menuitem', { name: 'Active', exact: true }).click();
  209 |     await page.getByRole('button', { name: 'Search', exact: true }).click();
  210 |     await page.getByRole('button', { name: 'clear' }).click();
  211 | 
  212 |     // Reset ค่าทั้งหมด
  213 |     await page.getByRole('button', { name: 'Reset' }).click();
  214 |   });
```