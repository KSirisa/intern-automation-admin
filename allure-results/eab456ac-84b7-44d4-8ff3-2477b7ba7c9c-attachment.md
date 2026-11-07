# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: tests\TMS-Module\Business-Type\01-business-type.spec.ts >> Business Type - CRUD Flow
- Location: tests\TMS-Module\Business-Type\01-business-type.spec.ts:14:5

# Error details

```
Error: locator.click: Target page, context or browser has been closed
Call log:
  - waiting for getByText('AT000')

```

# Test source

```ts
  54  |   const enableChoice = page.getByRole("textbox").nth(3);
  55  |   await enableChoice.click();
  56  |   await page.getByRole("menuitem", { name: "Active", exact: true }).click();
  57  | 
  58  |   // ติ๊ก Checkbox ต่างๆ
  59  |   await page
  60  |     .getByRole("paragraph")
  61  |     .filter({ hasText: "Is Cross Docking" })
  62  |     .getByRole("checkbox")
  63  |     .check();
  64  |   await page
  65  |     .getByRole("paragraph")
  66  |     .filter({ hasText: "Enable Assign Quota" })
  67  |     .getByRole("checkbox")
  68  |     .check();
  69  |   await page
  70  |     .getByRole("paragraph")
  71  |     .filter({ hasText: "Single Leg" })
  72  |     .getByRole("checkbox")
  73  |     .check();
  74  |   await page
  75  |     .getByRole("paragraph")
  76  |     .filter({ hasText: "Multi Leg" })
  77  |     .getByRole("checkbox")
  78  |     .check();
  79  |   await page
  80  |     .getByRole("paragraph")
  81  |     .filter({ hasText: "Shuttle" })
  82  |     .getByRole("checkbox")
  83  |     .check();
  84  |   await page
  85  |     .getByRole("paragraph")
  86  |     .filter({ hasText: "Distribution" })
  87  |     .getByRole("checkbox")
  88  |     .check();
  89  | 
  90  |   // Checkbox (สถานะ Empty/Loading)
  91  |   await page.locator('[label="EMPTY-EMPTY"] input').check();
  92  |   await page.locator('[label="EMPTY-LOADING"] input').check();
  93  |   await page.locator('[label="LOADING-EMPTY"] input').check();
  94  |   await page.locator('[label="LOADING-LOADING"] input').check();
  95  | 
  96  |   // จัดการข้อมูลในตาราง (Table Rows)
  97  |   const targetRow = page.getByRole("row", { name: "delete" });
  98  | 
  99  |   // -----------------------------------------------------
  100 |   // กดช่องที่ 1 (Index 0)
  101 |   await page.getByRole("button", { name: "Add" }).first().click();
  102 |   await targetRow.getByRole("textbox").nth(0).click();
  103 |   await page.getByRole("textbox").fill("__All POD Step2");
  104 |   await page
  105 |     .getByRole("menuitem", { name: "__All POD Step2", exact: true })
  106 |     .click();
  107 | 
  108 |   // -----------------------------------------------------
  109 |   // กดช่องที่ 2 (Index 1)
  110 |   await page.getByRole("button", { name: "Add" }).first().click();
  111 |   await targetRow.getByRole("textbox").nth(1).click();
  112 |   await page.getByRole("textbox").fill("_Return");
  113 |   await page.getByRole("menuitem", { name: "_Return", exact: true }).click();
  114 | 
  115 |   // -----------------------------------------------------
  116 |   // กดช่องที่ 3 (Index 2)
  117 |   await page.getByRole("button", { name: "Add" }).first().click();
  118 |   await targetRow.getByRole("textbox").nth(2).click();
  119 |   await page.getByRole("textbox").fill("Standard");
  120 |   await page.getByRole("menuitem", { name: "Standard", exact: true }).click();
  121 | 
  122 |   // ล้างข้อมูลช่อง Standard และลบแถว
  123 |   await page
  124 |     .getByRole("cell", { name: "Standard clear" })
  125 |     .getByLabel("clear")
  126 |     .click();
  127 |   await page
  128 |     .getByRole("row", { name: "delete", exact: true })
  129 |     .getByLabel("delete")
  130 |     .click();
  131 | 
  132 |   // ช่อง Department/Business Unit
  133 |   const aggInput = page
  134 |     .locator('.MuiFormControl-root input[type="text"]')
  135 |     .last(); // ดึง input ตัวสุดท้าย
  136 |   await aggInput.fill("AGG");
  137 |   await page.waitForTimeout(WAIT_TIME);
  138 |   await page.getByText("AGG UAT", { exact: true }).click({ force: true });
  139 | 
  140 |   // บันทึกข้อมูล
  141 |   await page.getByRole("button", { name: "Save" }).click();
  142 |   await page.getByRole("button", { name: "OK" }).click();
  143 | 
  144 |   // ==========================================
  145 |   // 3. Search & View (ค้นหาและดูรายละเอียด)
  146 |   // ==========================================
  147 |   await page.waitForTimeout(WAIT_TIME);
  148 | 
  149 |   const searchInput = page
  150 |     .getByPlaceholder("Search")
  151 |     .or(page.getByRole("textbox").first());
  152 |   await searchInput.fill(TEST_CODE);
  153 |   await page.waitForTimeout(WAIT_TIME);
> 154 |   await page.getByText(TEST_CODE).click();
      |                                   ^ Error: locator.click: Target page, context or browser has been closed
  155 | 
  156 |   // ปุ่ม Back (ไอคอนดูรายละเอียด)
  157 |   const backBtn = page.locator("button").nth(2);
  158 |   await backBtn.click();
  159 | 
  160 |   // ==========================================
  161 |   // 4. Update (แก้ไขข้อมูล)
  162 |   // ==========================================
  163 |   // --- อัปเดตครั้งที่ 1 (ผ่านเมนูด้านใน) ---
  164 |   await searchInput.fill(TEST_CODE);
  165 |   await page.waitForTimeout(WAIT_TIME);
  166 |   await page.getByText(TEST_CODE).click();
  167 | 
  168 |   // ปุ่ม Update/Edit (ไอคอนแก้ไข)
  169 |   const updateBtnMenu = page.locator("button").nth(1);
  170 |   await updateBtnMenu.click();
  171 | 
  172 |   // แก้ไขรายละเอียด
  173 |   await page.waitForTimeout(WAIT_TIME);
  174 |   await page.locator('input[name="description"]').fill(TEST_DESC_UPDATE_1);
  175 |   await page.getByRole("button", { name: "Save" }).click();
  176 |   await page.getByRole("button", { name: "OK" }).click();
  177 |   await page.waitForTimeout(WAIT_TIME);
  178 | 
  179 |   // --- อัปเดตครั้งที่ 2 (ผ่านปุ่มหน้าตาราง Grid) ---
  180 |   await searchInput.fill(TEST_CODE);
  181 |   await page.waitForTimeout(WAIT_TIME);
  182 | 
  183 |   const row = page.locator("tr", { hasText: TEST_CODE });
  184 |   const updateBtn = row.locator("button").nth(0);
  185 |   await updateBtn.click({ force: true });
  186 | 
  187 |   // แก้ไขรายละเอียดครั้งที่ 2
  188 |   await page.waitForTimeout(WAIT_TIME);
  189 |   await page.locator('input[name="description"]').fill(TEST_DESC_UPDATE_2);
  190 |   await page.getByRole("button", { name: "Save" }).click();
  191 |   await page.getByRole("button", { name: "OK" }).click();
  192 |   await page.waitForTimeout(WAIT_TIME);
  193 | 
  194 |   // ==========================================
  195 |   // 5. Delete (ลบข้อมูล)
  196 |   // ==========================================
  197 |   await searchInput.fill(TEST_CODE);
  198 |   await page.waitForTimeout(WAIT_TIME);
  199 | 
  200 |   const deleteBtn = row.locator("button").nth(1);
  201 |   await deleteBtn.click({ force: true });
  202 | 
  203 |   // ยืนยันการลบ
  204 |   await page.getByRole("button", { name: "OK" }).click();
  205 | 
  206 |   await page.pause();
  207 | });
  208 | 
```