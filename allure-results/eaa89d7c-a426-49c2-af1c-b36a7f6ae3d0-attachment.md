# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: tests\TMS-Module\Product\01-product-master.spec.ts >> Product Master - End to End Flow
- Location: tests\TMS-Module\Product\01-product-master.spec.ts:25:5

# Error details

```
Error: page.waitForTimeout: Target page, context or browser has been closed
```

# Test source

```ts
  13  | const TEST_NAME = "ATest";
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
  53  |   await page.pause();
  54  | 
  55  |   await test.step("2. Create New Product & Upload Image", async () => {
  56  |     await page.locator('button').nth(1).click(); // กดปุ่ม Create
  57  | 
  58  |     // อัปโหลดและลบรูปภาพ
  59  |     await page.getByLabel('Add Picture').setInputFiles(IMAGE_PATH);
  60  |     await page.getByRole('img').filter({ hasText: /^$/ }).nth(4).click();
  61  |     await page.getByLabel('Add Picture').setInputFiles(IMAGE_PATH);
  62  | 
  63  |     // กรอกข้อมูลทั่วไป
  64  |     await page.locator('input[name="code"]').fill(TEST_CODE);
  65  |     await page.locator('input[name="name"]').fill(TEST_NAME);
  66  |     await page.locator('input[name="shortName"]').fill(TEST_SHORT_NAME);
  67  | 
  68  |     // เลือก Dropdowns
  69  |     await page.locator('#product-category-select').getByRole('textbox').click();
  70  |     await page.getByRole('menuitem', { name: 'ATest Product Categories' }).click();
  71  |     await page.locator('#product-type-select').getByRole('textbox').click();
  72  |     await page.getByRole('heading', { name: 'ATest Product Types' }).click();
  73  |     await page.locator('#product-status-select').getByRole('textbox').click();
  74  |     await page.getByRole('menuitem', { name: 'Active', exact: true }).click();
  75  |     await page.locator('#product-group-select').getByRole('textbox').click();
  76  |     await page.getByRole('heading', { name: 'Finished Goods', exact: true }).click();
  77  | 
  78  |     // ข้อมูล Hazardous & Description
  79  |     await page.getByRole('paragraph').filter({ hasText: 'Is Hazardous' }).getByRole('checkbox').check();
  80  |     await page.locator('input[name="hazardousClass"]').fill('HC');
  81  |     await page.locator('input[name="unNumber"]').fill('UN');
  82  |     await page.locator('input[name="description"]').fill(TEST_DESC);
  83  | 
  84  |     // เลือก Business Unit
  85  |     await page.locator('.MuiFormControl-root input[type="text"]').last().fill(TEST_BU_SEARCH);
  86  |     await page.getByText(TEST_BU_NAME, { exact: true }).click({ force: true });
  87  | 
  88  |   });
  89  | 
  90  |   await test.step("3. Product Unit Modal & Save", async () => {
  91  |     await page.getByRole('button', { name: 'Add' }).click();
  92  |     await page.getByRole('checkbox').check();
  93  | 
  94  |     await page.locator('#dialog-productUnit-unitSelected').getByRole('textbox').click();
  95  |     await page.getByRole('menuitem', { name: 'กิโลกรัม' }).click();
  96  | 
  97  |     await page.locator('#productUnit-productWeight').fill('10');
  98  |     await page.locator('#productUnit-productVolume').fill('100');
  99  |     await page.locator('#productUnit-conversionRate').fill('100');
  100 |     await page.locator('#productUnit-packageWeight').fill('0');
  101 |     await page.locator('#productUnit-packageVolume').fill('0');
  102 |     await page.locator('#productUnit-unitPrice').fill('100');
  103 | 
  104 |     await page.getByRole('button', { name: 'Save' }).click(); // Save Modal
  105 |     await page.getByRole('button', { name: 'Save' }).click(); // Save Main Page
  106 |     await page.getByRole('button', { name: 'OK' }).click();
  107 |     await page.waitForTimeout(WAIT_TIME);
  108 |   });
  109 | 
  110 |   await test.step("4. Import / Export Data", async () => {
  111 |     // Import Flow
  112 |     await page.getByRole("button").nth(2).click(); 
> 113 |     await page.waitForTimeout(WAIT_TIME);
      |                ^ Error: page.waitForTimeout: Target page, context or browser has been closed
  114 |     await page.getByRole("button").nth(1).click(); // Download Template
  115 |     await page.getByRole('button', { name: 'OK' }).click();
  116 | 
  117 |     await page.getByLabel("Upload").setInputFiles(IMPORT_FILE_PATH);
  118 |     await page.getByRole('button', { name: 'Clear' }).click();
  119 |     await page.getByLabel("Upload").setInputFiles(IMPORT_FILE_PATH);
  120 |     await page.getByRole('button', { name: 'Import' }).click();
  121 | 
  122 |     // Export Flow
  123 |     await page.waitForTimeout(WAIT_TIME);
  124 |     await page.getByRole("button").nth(3).click(); 
  125 |     await page.getByRole('button', { name: 'OK' }).click();
  126 |     await page.waitForTimeout(WAIT_TIME);
  127 |   });
  128 | 
  129 |   await test.step("5. View and Copy Product", async () => {
  130 |     // ดูรายละเอียด
  131 |     await searchProduct(TEST_CODE);
  132 |     await page.getByText(TEST_CODE).click();
  133 |     await page.waitForTimeout(WAIT_TIME);
  134 |     await page.locator('button').nth(3).click(); // ปุ่ม Back
  135 | 
  136 |     // Copy ข้อมูล
  137 |     await searchProduct(TEST_CODE);
  138 |     await page.getByText(TEST_CODE).click();
  139 |     await page.locator('button').nth(2).click(); // ปุ่ม Copy
  140 |     await page.waitForTimeout(WAIT_TIME);
  141 | 
  142 |     await page.locator('input[name="code"]').fill(TEST_CODE_COPY);
  143 |     await page.locator('input[name="name"]').fill(TEST_NAME_COPY);
  144 |     await page.locator('input[name="shortName"]').fill(TEST_SHORT_NAME_COPY);
  145 |     await page.getByRole('button', { name: 'Save' }).click();
  146 |     await page.getByRole('button', { name: 'OK' }).click();
  147 |   });
  148 | 
  149 |   await test.step("6. Update Product (Details & Table)", async () => {
  150 |     // แก้ไขผ่านหน้ารายละเอียด (Details)
  151 |     await searchProduct(TEST_CODE);
  152 |     await page.getByText(TEST_CODE).click();
  153 |     await page.waitForTimeout(WAIT_TIME);
  154 |     
  155 |     await page.locator('button').nth(1).click(); // ปุ่ม Edit
  156 |     await page.waitForTimeout(WAIT_TIME);
  157 |     await page.locator('input[name="description"]').fill(TEST_DESC_UPDATE_1);
  158 |     await page.getByRole('button', { name: 'Save' }).click();
  159 |     await page.getByRole('button', { name: 'OK' }).click();
  160 | 
  161 |     // แก้ไขผ่านหน้าตาราง (Table Row)
  162 |     await searchProduct(TEST_CODE);
  163 |     const row = page.locator('tr', { hasText: TEST_CODE });
  164 |     await row.locator('button').nth(0).click({ force: true }); 
  165 |     
  166 |     await page.waitForTimeout(WAIT_TIME);
  167 |     await page.locator('input[name="description"]').fill(TEST_DESC_UPDATE_2);
  168 |     await page.getByRole('button', { name: 'Save' }).click();
  169 |     await page.getByRole('button', { name: 'OK' }).click();
  170 |     await page.waitForTimeout(WAIT_TIME);
  171 |   });
  172 | 
  173 |   await test.step("7. Delete Product", async () => {
  174 |     await searchProduct(TEST_CODE);
  175 |     const row = page.locator('tr', { hasText: TEST_CODE });
  176 |     await row.locator('button').nth(1).click({ force: true }); // ปุ่ม Delete
  177 |     await page.getByRole('button', { name: 'OK' }).click();
  178 |   });
  179 | 
  180 |   await test.step("8. Advanced Search", async () => {
  181 |     await page.getByRole('button', { name: 'Search Total :' }).click();
  182 | 
  183 |     // ค้นหาด้วย Category
  184 |     await page.locator('div').filter({ hasText: /^Category$/ }).click();
  185 |     await page.getByRole('textbox').fill('BIG-C');
  186 |     await page.getByRole('option', { name: 'BIG-C' }).click();
  187 |     await page.keyboard.press('Escape'); 
  188 |     await page.getByRole('button', { name: 'Search', exact: true }).click();
  189 |     await page.getByRole('button', { name: 'clear' }).click();
  190 | 
  191 |     // ค้นหาด้วย Product Types
  192 |     await page.locator('div').filter({ hasText: /^Product Types$/ }).click();
  193 |     await page.getByRole('textbox').fill('EED');
  194 |     await page.getByRole('option', { name: 'EED' }).getByRole('checkbox').check();
  195 |     await page.keyboard.press('Escape');
  196 |     await page.getByRole('button', { name: 'Search', exact: true }).click();
  197 |     await page.getByRole('button', { name: 'clear' }).click();
  198 | 
  199 |     // ค้นหาด้วย Product SKU
  200 |     await page.locator('div').filter({ hasText: /^Product SKU$/ }).click();
  201 |     await page.getByRole('textbox').fill('กิโลกรัม');
  202 |     await page.getByRole('option', { name: 'กิโลกรัม' }).getByRole('checkbox').check();
  203 |     await page.keyboard.press('Escape');
  204 |     await page.getByRole('button', { name: 'Search', exact: true }).click();
  205 |     await page.getByRole('button', { name: 'clear' }).click();
  206 | 
  207 |     // ค้นหาด้วย Status (Enable)
  208 |     await page.locator('div').filter({ hasText: /^Enable$/ }).click();
  209 |     await page.getByRole('menuitem', { name: 'Active', exact: true }).click();
  210 |     await page.getByRole('button', { name: 'Search', exact: true }).click();
  211 |     await page.getByRole('button', { name: 'clear' }).click();
  212 | 
  213 |     // Reset ค่าทั้งหมด
```