# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: tests_PostTest\TMS-Module\Product\01-product-master.spec.ts >> Product Master - End to End Flow
- Location: tests_PostTest\TMS-Module\Product\01-product-master.spec.ts:25:5

# Error details

```
Error: ENOENT: no such file or directory, stat 'C:\Users\4rmxi\.vscode\AutomatedTesting\my-playwright-project\tests_PostTest\TMS-Module\Product\Data\Import_Product_Master.xlsx'
```

# Page snapshot

```yaml
- generic [ref=f3e1]:
  - generic [ref=f3e2]:
    - banner [ref=f3e5]:
      - generic [ref=f3e6]:
        - generic [ref=f3e7]:
          - button "menu" [ref=f3e9] [cursor=pointer]
          - separator [ref=f3e22]
          - paragraph [ref=f3e24]: Import
        - generic [ref=f3e25]:
          - generic [ref=f3e28]:
            - button [active] [ref=f3e29] [cursor=pointer]
            - button [ref=f3e33] [cursor=pointer]
          - separator [ref=f3e39]
          - generic [ref=f3e40]:
            - button [ref=f3e42] [cursor=pointer]
            - button [ref=f3e47] [cursor=pointer]
            - button "notifications" [ref=f3e57] [cursor=pointer]
            - button [ref=f3e67] [cursor=pointer]
            - button [ref=f3e74] [cursor=pointer]
            - button "notifications" [ref=f3e82] [cursor=pointer]
            - button [ref=f3e88] [cursor=pointer]
            - button [ref=f3e93] [cursor=pointer]
            - paragraph [ref=f3e98]: Welcome Back., Trainee
    - generic [ref=f3e102]:
      - generic [ref=f3e105]:
        - heading "File to Import*" [level=5] [ref=f3e108]
        - generic [ref=f3e110]:
          - generic [ref=f3e113]:
            - textbox [ref=f3e114]
            - group
          - generic [ref=f3e115]:
            - generic [ref=f3e116]:
              - button "Import" [disabled]
            - button "Clear" [ref=f3e119] [cursor=pointer]
        - button "Upload" [ref=f3e125] [cursor=pointer]
      - separator [ref=f3e130]
  - status [ref=f3e133]
```

# Test source

```ts
  17  | const TEST_DESC_UPDATE_2 = "ตัวอย่างข้อมูล UPDATE 2";
  18  | const TEST_CODE_COPY = "AT110";
  19  | const TEST_NAME_COPY = "ATest110";
  20  | const TEST_SHORT_NAME_COPY = "ATCopy110";
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
  103 |     await page.getByRole('button', { name: 'Cancel' }).click(); // Cancel Modal
  104 |     await page.getByRole('button', { name: 'Cancel' }).click(); // Cancel Main Page
  105 |     await page.getByRole('button', { name: 'OK' }).click();
  106 |     await page.waitForTimeout(WAIT_TIME);
  107 |   });
  108 | 
  109 |   await test.step("4. Import / Export Data", async () => {
  110 |     // Import Flow
  111 |     await page.waitForTimeout(WAIT_TIME);
  112 |     await page.getByRole("button").nth(2).click(); 
  113 |     await page.waitForTimeout(WAIT_TIME);
  114 |     await page.getByRole("button").nth(1).click(); // Download Template
  115 |     await page.getByRole('button', { name: 'Cancel' }).click();
  116 | 
> 117 |     await page.getByLabel("Upload").setInputFiles(IMPORT_FILE_PATH);
      |     ^ Error: ENOENT: no such file or directory, stat 'C:\Users\4rmxi\.vscode\AutomatedTesting\my-playwright-project\tests_PostTest\TMS-Module\Product\Data\Import_Product_Master.xlsx'
  118 |     await page.getByRole('button', { name: 'Clear' }).click();
  119 |     await page.getByRole("button").nth(2).click(); 
  120 | 
  121 |     // Export Flow
  122 |     await page.waitForTimeout(WAIT_TIME);
  123 |     await page.getByRole("button").nth(3).click(); 
  124 |     await page.getByRole('button', { name: 'Cancel' }).click();
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
  144 |     await page.getByRole('button', { name: 'Cancel' }).click();
  145 |     await page.getByRole('button', { name: 'OK' }).click();
  146 |     await page.waitForTimeout(WAIT_TIME);
  147 |     await page.getByRole("button").nth(3).click();
  148 |   });
  149 | 
  150 |   await test.step("6. Update Product (Details & Table)", async () => {
  151 |     // แก้ไขผ่านหน้ารายละเอียด (Details)
  152 |     await page.waitForTimeout(WAIT_TIME);
  153 |     await searchProduct(TEST_CODE);
  154 |     await page.getByText(TEST_CODE).click();
  155 |     await page.waitForTimeout(WAIT_TIME);
  156 |     
  157 |     await page.locator('button').nth(1).click(); // ปุ่ม Edit
  158 |     await page.waitForTimeout(WAIT_TIME);
  159 |     await page.locator('input[name="description"]').fill(TEST_DESC_UPDATE_1);
  160 |     await page.getByRole('button', { name: 'Cancel' }).click();
  161 |     await page.getByRole('button', { name: 'OK' }).click();
  162 |     await page.getByRole("button").nth(3).click();
  163 | 
  164 |     // แก้ไขผ่านหน้าตาราง (Table Row)
  165 |     await page.waitForTimeout(WAIT_TIME);
  166 |     await searchProduct(TEST_CODE);
  167 |     const row = page.locator('tr', { hasText: TEST_CODE });
  168 |     await row.locator('button').nth(0).click({ force: true }); 
  169 |     
  170 |     await page.waitForTimeout(WAIT_TIME);
  171 |     await page.locator('input[name="description"]').fill(TEST_DESC_UPDATE_2);
  172 |     await page.getByRole('button', { name: 'Cancel' }).click();
  173 |     await page.getByRole('button', { name: 'OK' }).click();
  174 |     await page.waitForTimeout(WAIT_TIME);
  175 |   });
  176 | 
  177 |   await test.step("7. Delete Product", async () => {
  178 |     await searchProduct(TEST_CODE);
  179 |     const row = page.locator('tr', { hasText: TEST_CODE });
  180 |     await row.locator('button').nth(1).click({ force: true }); // ปุ่ม Delete
  181 |     await page.getByRole('button', { name: 'Cancel' }).click();
  182 |   });
  183 | 
  184 |   await test.step("8. Advanced Search", async () => {
  185 |     await page.getByRole('button', { name: 'Search Total :' }).click();
  186 | 
  187 |     // ค้นหาด้วย Category
  188 |     await page.locator('div').filter({ hasText: /^Category$/ }).click();
  189 |     await page.getByRole('textbox').fill('BIG-C');
  190 |     await page.getByRole('option', { name: 'BIG-C' }).click();
  191 |     await page.keyboard.press('Escape'); 
  192 |     await page.getByRole('button', { name: 'Search', exact: true }).click();
  193 |     await page.getByRole('button', { name: 'clear' }).click();
  194 | 
  195 |     // ค้นหาด้วย Product Types
  196 |     await page.locator('div').filter({ hasText: /^Product Types$/ }).click();
  197 |     await page.getByRole('textbox').fill('EED');
  198 |     await page.getByRole('option', { name: 'EED' }).getByRole('checkbox').check();
  199 |     await page.keyboard.press('Escape');
  200 |     await page.getByRole('button', { name: 'Search', exact: true }).click();
  201 |     await page.getByRole('button', { name: 'clear' }).click();
  202 | 
  203 |     // ค้นหาด้วย Product SKU
  204 |     await page.locator('div').filter({ hasText: /^Product SKU$/ }).click();
  205 |     await page.getByRole('textbox').fill('กิโลกรัม');
  206 |     await page.getByRole('option', { name: 'กิโลกรัม' }).getByRole('checkbox').check();
  207 |     await page.keyboard.press('Escape');
  208 |     await page.getByRole('button', { name: 'Search', exact: true }).click();
  209 |     await page.getByRole('button', { name: 'clear' }).click();
  210 | 
  211 |     // ค้นหาด้วย Status (Enable)
  212 |     await page.locator('div').filter({ hasText: /^Enable$/ }).click();
  213 |     await page.getByRole('menuitem', { name: 'Active', exact: true }).click();
  214 |     await page.getByRole('button', { name: 'Search', exact: true }).click();
  215 |     await page.getByRole('button', { name: 'clear' }).click();
  216 | 
  217 |     // Reset ค่าทั้งหมด
```