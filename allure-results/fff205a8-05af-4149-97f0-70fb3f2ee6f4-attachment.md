# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: tests\TMS-Module\Shipment-Cat\01-shipment-cat.spec.ts >> Shipment Category - CRUD Flow
- Location: tests\TMS-Module\Shipment-Cat\01-shipment-cat.spec.ts:14:5

# Error details

```
Error: locator.click: Target page, context or browser has been closed
Call log:
  - waiting for locator('button').nth(1)
    - locator resolved to <button tabindex="0" type="button" class="MuiButtonBase-root MuiIconButton-root">…</button>
  - attempting click action
    2 × waiting for element to be visible, enabled and stable
      - element is visible, enabled and stable
      - scrolling into view if needed
      - done scrolling
      - <div aria-hidden="true" class="MuiBackdrop-root"></div> from <div role="presentation" class="MuiDrawer-root MuiDrawer-modal jss24">…</div> subtree intercepts pointer events
    - retrying click action
    - waiting 20ms
    - waiting for element to be visible, enabled and stable
    - element is visible, enabled and stable
    - scrolling into view if needed
    - done scrolling
    - <div aria-hidden="true" class="MuiBackdrop-root"></div> from <div role="presentation" class="MuiDrawer-root MuiDrawer-modal jss24">…</div> subtree intercepts pointer events
  2 × retrying click action
      - waiting 100ms
      - waiting for element to be visible, enabled and stable
      - element is visible, enabled and stable
      - scrolling into view if needed
      - done scrolling
      - <div aria-hidden="true" class="MuiBackdrop-root"></div> from <div aria-hidden="true" role="presentation" class="MuiDrawer-root MuiDrawer-modal jss24">…</div> subtree intercepts pointer events
  3 × retrying click action
      - waiting 500ms
      - waiting for element to be visible, enabled and stable
      - element is visible, enabled and stable
      - scrolling into view if needed
      - done scrolling
      - <div aria-hidden="true" class="MuiBackdrop-root"></div> from <div aria-hidden="true" role="presentation" class="MuiDrawer-root MuiDrawer-modal jss24">…</div> subtree intercepts pointer events
  2 × retrying click action
      - waiting 500ms
      - waiting for element to be visible, enabled and stable
      - element is visible, enabled and stable
      - scrolling into view if needed
      - done scrolling
      - <div aria-hidden="true" class="MuiBackdrop-root"></div> from <div role="presentation" class="MuiDrawer-root MuiDrawer-modal jss24">…</div> subtree intercepts pointer events
  2 × retrying click action
      - waiting 500ms
      - waiting for element to be visible, enabled and stable
      - element is visible, enabled and stable
      - scrolling into view if needed
      - done scrolling
      - <div aria-hidden="true" class="MuiBackdrop-root"></div> from <div aria-hidden="true" role="presentation" class="MuiDrawer-root MuiDrawer-modal jss24">…</div> subtree intercepts pointer events
  2 × retrying click action
      - waiting 500ms
      - waiting for element to be visible, enabled and stable
      - element is visible, enabled and stable
      - scrolling into view if needed
      - done scrolling
      - <div aria-hidden="true" class="MuiBackdrop-root"></div> from <div role="presentation" class="MuiDrawer-root MuiDrawer-modal jss24">…</div> subtree intercepts pointer events
  - retrying click action
    - waiting 500ms

```

# Test source

```ts
  1   | import { test, expect } from "@playwright/test";
  2   | 
  3   | // ==========================================
  4   | // ⚙️ Global Config (แก้ไขข้อมูลเทสได้ที่นี่)
  5   | // ==========================================
  6   | const BASE_URL = "/#/global-search";
  7   | const TEST_CODE = "AT000";
  8   | const TEST_NAME = "ATest Shipment Category";
  9   | const TEST_DESC_CREATE = "Automate Test";
  10  | const TEST_DESC_UPDATE_1 = "Automate Test Update";
  11  | const TEST_DESC_UPDATE_2 = "Automate Test Update 2";
  12  | const WAIT_TIME = 2000; // เวลาหน่วง (มิลลิวินาที)
  13  | 
  14  | test("Shipment Category - CRUD Flow", async ({ page }) => {
  15  |   // ---------- 1. เข้าหน้า TMS & Navigate Menu ----------
  16  |   await page.goto(BASE_URL);
  17  | 
  18  |   const tmsMode = page.getByTitle("Transportation Management").first();
  19  |   await tmsMode.waitFor({ state: "visible" });
  20  |   await tmsMode.click();
  21  | 
  22  |   const transportMenu = page.getByRole("button", { name: "menu" });
  23  |   await transportMenu.waitFor({ state: "visible" });
  24  |   await page.waitForTimeout(WAIT_TIME);
  25  |   await transportMenu.click();
  26  | 
  27  |   const masterMgmt = page.getByRole("button", { name: "Master Management" }); 
  28  |   await masterMgmt.waitFor({ state: "visible" });
  29  |   await masterMgmt.click();
  30  | 
  31  |   await page.getByRole("button", { name: "Shipments" }).click();
  32  |   await page.getByRole("button", { name: "Product" }).click();
  33  |   await page.getByRole("button", { name: "Shipment Category" }).click();
  34  | 
  35  |   // ---------- 2. Create (สร้างข้อมูลใหม่) ----------
  36  |   await page.waitForTimeout(WAIT_TIME);
  37  |   const createButton = page.locator("button").nth(1);
> 38  |   await createButton.click();
      |                      ^ Error: locator.click: Target page, context or browser has been closed
  39  | 
  40  |   await page.locator('input[name="code"]').click();
  41  |   await page.locator('input[name="code"]').fill(TEST_CODE);
  42  | 
  43  |   await page.locator('input[name="name"]').click();
  44  |   await page.locator('input[name="name"]').fill(TEST_NAME);
  45  | 
  46  |   await page.locator("#dropdown-select-in-formik").getByRole("textbox").click();
  47  |   await page.getByRole("menuitem", { name: "Active", exact: true }).click();
  48  | 
  49  |   await page.locator('textarea[name="description"]').fill(TEST_DESC_CREATE);
  50  | 
  51  |   // เลือกหน่วยงาน (AGG)
  52  |   await page.getByRole("textbox").nth(4).click();
  53  |   await page.getByRole("textbox").nth(4).fill("AGG");
  54  |   await page.waitForTimeout(WAIT_TIME);
  55  |   await page.getByText("AGG UAT", { exact: true }).click({ force: true });
  56  | 
  57  |   await page.getByRole("button", { name: "Save" }).click();
  58  |   await page.getByRole("button", { name: "OK" }).click();
  59  | 
  60  |   // ---------- 3. View / Back (ดูรายละเอียดและกลับ) ----------
  61  |   await page.waitForTimeout(WAIT_TIME);
  62  | 
  63  |   const searchInput = page.getByPlaceholder("Search").or(page.getByRole("textbox").first());
  64  |   await searchInput.fill(TEST_CODE);
  65  |   await page.waitForTimeout(WAIT_TIME);
  66  |   await page.getByText(TEST_CODE, { exact: true }).click();
  67  | 
  68  |   // ปุ่ม Back (ไอคอนดูรายละเอียด)
  69  |   const backBtn = page.locator("button").nth(2);
  70  |   await backBtn.click();
  71  | 
  72  |   // ---------- 4. Update ครั้งที่ 1 (แก้ผ่านเมนูด้านใน) ----------
  73  |   await searchInput.fill(TEST_CODE);
  74  |   await page.waitForTimeout(WAIT_TIME);
  75  |   await page.getByText(TEST_CODE, { exact: true }).click();
  76  | 
  77  |   // ปุ่ม Update/Edit (ไอคอนแก้ไข)
  78  |   const updateBtnMenu = page.locator("button").nth(1);
  79  |   await updateBtnMenu.click();
  80  | 
  81  |   // แก้ไขรายละเอียด
  82  |   await page.waitForTimeout(WAIT_TIME);
  83  |   await page.locator('textarea[name="description"]').fill(TEST_DESC_UPDATE_1);
  84  | 
  85  |   await page.getByRole("button", { name: "Save" }).click();
  86  |   await page.getByRole("button", { name: "OK" }).click();
  87  |   await page.waitForTimeout(WAIT_TIME);
  88  | 
  89  |   // ---------- 5. Update ครั้งที่ 2 (แก้ผ่านปุ่มหน้าตาราง Grid) ----------
  90  |   await searchInput.fill(TEST_CODE);
  91  |   await page.waitForTimeout(WAIT_TIME);
  92  | 
  93  |   const row = page.locator("tr", { hasText: TEST_CODE });
  94  |   const updateBtn = row.locator("button").nth(0);
  95  |   await updateBtn.click({ force: true });
  96  | 
  97  |   // แก้ไขรายละเอียด
  98  |   await page.waitForTimeout(WAIT_TIME);
  99  |   await page.locator('textarea[name="description"]').fill(TEST_DESC_UPDATE_2);
  100 | 
  101 |   await page.getByRole("button", { name: "Save" }).click();
  102 |   await page.getByRole("button", { name: "OK" }).click();
  103 |   await page.waitForTimeout(WAIT_TIME);
  104 | 
  105 |   // ---------- 6. Delete (ลบข้อมูล) ----------
  106 |   await searchInput.fill(TEST_CODE);
  107 |   await page.waitForTimeout(WAIT_TIME);
  108 |   
  109 |   const deleteBtn = row.locator("button").nth(1);
  110 |   await deleteBtn.click({ force: true });
  111 |   
  112 |   // ยืนยันการลบ
  113 |   await page.getByRole("button", { name: "OK" }).click();
  114 | 
  115 |   await page.pause();
  116 | });
```