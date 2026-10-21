import { test, expect } from "@playwright/test";

// ==========================================
// ⚙️ Global Config (แก้ไขข้อมูลเทสได้ที่นี่)
// ==========================================
const BASE_URL = "/#/global-search";
const TEST_CODE = "AT000";
const TEST_NAME = "ATest Business Type";
const TEST_DESC_CREATE = "Automate Test";
const TEST_DESC_UPDATE_1 = "Automate Test Update";
const TEST_DESC_UPDATE_2 = "Automate Test Update 2";
const WAIT_TIME = 2000; // เวลาหน่วง (มิลลิวินาที)

test("Business Type - CRUD Flow", async ({ page }) => {
  // ==========================================
  // 1. Navigate to Menu (เข้าสู่หน้าระบบ)
  // ==========================================
  await page.goto(BASE_URL);

  // เปิดเมนูหลัก
  await page.getByTitle("Transportation Management").first().click();
  const transportMenu = page.getByRole("button", { name: "menu" });
  await transportMenu.waitFor({ state: "visible" });
  await page.waitForTimeout(WAIT_TIME);
  await transportMenu.click();

  // เข้าสู่หน้า Employees
  await page.getByRole("button", { name: "Master Management" }).hover();

  await page.getByRole("button", { name: "Shipments" }).click();
  await page.getByRole("button", { name: "Product" }).click();
  await page.getByRole("button", { name: "Business Type" }).click();

  // ==========================================
  // 2. Create Business Type (สร้างข้อมูลใหม่)
  // ==========================================
  // รอให้หน้าโหลดเสร็จ (เช็คจากปุ่ม Create/Add ปรากฏ)
  const createButton = page.locator("button").nth(1);
  await createButton.waitFor({ state: "visible" });
  await createButton.click();

  // กรอกข้อมูลทั่วไป
  await page.locator('input[name="code"]').fill(TEST_CODE);
  await page.locator('input[name="name"]').fill(TEST_NAME);
  await page.locator('input[name="description"]').fill(TEST_DESC_CREATE);

  // เลือก Dropdown: Business Group
  const businessGroup = page.getByRole("textbox").nth(2);
  await businessGroup.waitFor({ state: "visible" });
  await businessGroup.click();
  await page.getByRole("menuitem", { name: "Domestic" }).click();

  // เลือก Dropdown: Status (Enable Choice)
  const enableChoice = page.getByRole("textbox").nth(3);
  await enableChoice.click();
  await page.getByRole("menuitem", { name: "Active", exact: true }).click();

  // ติ๊ก Checkbox ต่างๆ
  await page
    .getByRole("paragraph")
    .filter({ hasText: "Is Cross Docking" })
    .getByRole("checkbox")
    .check();
  await page
    .getByRole("paragraph")
    .filter({ hasText: "Enable Assign Quota" })
    .getByRole("checkbox")
    .check();
  await page
    .getByRole("paragraph")
    .filter({ hasText: "Single Leg" })
    .getByRole("checkbox")
    .check();
  await page
    .getByRole("paragraph")
    .filter({ hasText: "Multi Leg" })
    .getByRole("checkbox")
    .check();
  await page
    .getByRole("paragraph")
    .filter({ hasText: "Shuttle" })
    .getByRole("checkbox")
    .check();
  await page
    .getByRole("paragraph")
    .filter({ hasText: "Distribution" })
    .getByRole("checkbox")
    .check();

  // Checkbox (สถานะ Empty/Loading)
  await page.locator('[label="EMPTY-EMPTY"] input').check();
  await page.locator('[label="EMPTY-LOADING"] input').check();
  await page.locator('[label="LOADING-EMPTY"] input').check();
  await page.locator('[label="LOADING-LOADING"] input').check();

  // จัดการข้อมูลในตาราง (Table Rows)
  const targetRow = page.getByRole("row", { name: "delete" });

  // -----------------------------------------------------
  // กดช่องที่ 1 (Index 0)
  await page.getByRole("button", { name: "Add" }).first().click();
  await targetRow.getByRole("textbox").nth(0).click();
  await page.getByRole("textbox").fill("__All POD Step2");
  await page
    .getByRole("menuitem", { name: "__All POD Step2", exact: true })
    .click();

  // -----------------------------------------------------
  // กดช่องที่ 2 (Index 1)
  await page.getByRole("button", { name: "Add" }).first().click();
  await targetRow.getByRole("textbox").nth(1).click();
  await page.getByRole("textbox").fill("_Return");
  await page.getByRole("menuitem", { name: "_Return", exact: true }).click();

  // -----------------------------------------------------
  // กดช่องที่ 3 (Index 2)
  await page.getByRole("button", { name: "Add" }).first().click();
  await targetRow.getByRole("textbox").nth(2).click();
  await page.getByRole("textbox").fill("Standard");
  await page.getByRole("menuitem", { name: "Standard", exact: true }).click();

  // ล้างข้อมูลช่อง Standard และลบแถว
  await page
    .getByRole("cell", { name: "Standard clear" })
    .getByLabel("clear")
    .click();
  await page
    .getByRole("row", { name: "delete", exact: true })
    .getByLabel("delete")
    .click();

  // ช่อง Department/Business Unit
  const aggInput = page
    .locator('.MuiFormControl-root input[type="text"]')
    .last(); // ดึง input ตัวสุดท้าย
  await aggInput.fill("AGG");
  await page.waitForTimeout(WAIT_TIME);
  await page.getByText("AGG UAT", { exact: true }).click({ force: true });

  // บันทึกข้อมูล
  await page.getByRole("button", { name: "Save" }).click();
  await page.getByRole("button", { name: "OK" }).click();

  // ==========================================
  // 3. Search & View (ค้นหาและดูรายละเอียด)
  // ==========================================
  await page.waitForTimeout(WAIT_TIME);

  const searchInput = page
    .getByPlaceholder("Search")
    .or(page.getByRole("textbox").first());
  await searchInput.fill(TEST_CODE);
  await page.waitForTimeout(WAIT_TIME);
  await page.getByText(TEST_CODE).click();

  // ปุ่ม Back (ไอคอนดูรายละเอียด)
  const backBtn = page.locator("button").nth(2);
  await backBtn.click();

  // ==========================================
  // 4. Update (แก้ไขข้อมูล)
  // ==========================================
  // --- อัปเดตครั้งที่ 1 (ผ่านเมนูด้านใน) ---
  await searchInput.fill(TEST_CODE);
  await page.waitForTimeout(WAIT_TIME);
  await page.getByText(TEST_CODE).click();

  // ปุ่ม Update/Edit (ไอคอนแก้ไข)
  const updateBtnMenu = page.locator("button").nth(1);
  await updateBtnMenu.click();

  // แก้ไขรายละเอียด
  await page.waitForTimeout(WAIT_TIME);
  await page.locator('input[name="description"]').fill(TEST_DESC_UPDATE_1);
  await page.getByRole("button", { name: "Save" }).click();
  await page.getByRole("button", { name: "OK" }).click();
  await page.waitForTimeout(WAIT_TIME);

  // --- อัปเดตครั้งที่ 2 (ผ่านปุ่มหน้าตาราง Grid) ---
  await searchInput.fill(TEST_CODE);
  await page.waitForTimeout(WAIT_TIME);

  const row = page.locator("tr", { hasText: TEST_CODE });
  const updateBtn = row.locator("button").nth(0);
  await updateBtn.click({ force: true });

  // แก้ไขรายละเอียดครั้งที่ 2
  await page.waitForTimeout(WAIT_TIME);
  await page.locator('input[name="description"]').fill(TEST_DESC_UPDATE_2);
  await page.getByRole("button", { name: "Save" }).click();
  await page.getByRole("button", { name: "OK" }).click();
  await page.waitForTimeout(WAIT_TIME);

  // ==========================================
  // 5. Delete (ลบข้อมูล)
  // ==========================================
  await searchInput.fill(TEST_CODE);
  await page.waitForTimeout(WAIT_TIME);

  const deleteBtn = row.locator("button").nth(1);
  await deleteBtn.click({ force: true });

  // ยืนยันการลบ
  await page.getByRole("button", { name: "OK" }).click();

  await page.pause();
});
