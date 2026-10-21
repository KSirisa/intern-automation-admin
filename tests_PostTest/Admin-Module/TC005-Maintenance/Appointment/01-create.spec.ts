import { test } from "@playwright/test";
import { safeClick, tryAction } from "../../../../helpers";

// Config & Test Data
const LOOP_COUNT = 3;
const createData = {
  day: "14",
  startTime: "08:00",
  endTime: "17:00",
  description: "Automate",
  businessUnitSearch: "__TEST",
  businessUnitNode: "___TEST",
  vehicle: "มม01-1234",
  contact: "0123456789",
  locationSearch: "Car",
  assignTo: "Me",
  includeSubBU: true,
};

test("maintenance test", async ({ page }) => {
  await page.goto("/admin#/maintenance");

  // Navigation
  await safeClick(
    page.getByRole("link", { name: "Appointments Management", exact: true }),
    "Appointments Management Link",
  );

  for (let i = 0; i < LOOP_COUNT; i++) {
    await page.waitForTimeout(500);

    // 1. กดปุ่ม Create
    await safeClick(page.getByTitle("Create"), "Create Button");

    // 2. เลือกวันที่และเวลารอบเดียว
    await tryAction(async () => {
      const dateInput = page
        .getByTitle("Date time must be greater")
        .getByRole("textbox");
      await dateInput.click({ force: true });
      await dateInput.press("ArrowRight");
      await page
        .getByRole("link", { name: createData.day })
        .first()
        .click({ force: true });

      // กรอกเวลาทั้ง Start / End
      const timeInputs = page
        .locator('input[type="time"], .app-datetimepicker input')
        .or(page.getByRole("textbox"));
      await timeInputs.nth(1).fill(createData.startTime);
      await timeInputs.nth(2).fill(createData.endTime);
    }, "Set Date and Time");

    // 3. กรอก Description
    await page
      .getByRole("textbox", { name: "Description" })
      .fill(createData.description);

    // 4. เลือก Business Unit Treeview
    await tryAction(async () => {
      await page.locator("#ddlBU").click({ force: true });
      const searchBox = page.getByRole("textbox", { name: "Search" });
      await searchBox.waitFor({ state: "visible", timeout: 2000 });
      await searchBox.fill(createData.businessUnitSearch);
      await page
        .getByRole("treeitem", { name: createData.businessUnitNode })
        .click({ force: true });
    }, "Select Business Unit");

    // 5. ติ๊ก Include sub Business Unit ตามค่าที่ระบุ
    await tryAction(async () => {
      const labelContainer = page
        .locator("label")
        .filter({ hasText: "Include sub Business Unit" })
        .first();

      if (await labelContainer.isVisible().catch(() => false)) {
        // หา input checkbox ที่อยู่ข้างใน (หรืออาจซ่อนอยู่ใกล้ๆ)
        const input = labelContainer.locator('input[type="checkbox"]');
        const currentState = await input.isChecked().catch(() => false);

        // ถ้าสถานะปัจจุบัน ไม่ตรง กับที่ตั้งใจไว้ ค่อยกดคลิก
        if (currentState !== createData.includeSubBU) {
          await labelContainer.click({ force: true });
        }
      }
    }, "Set Include Sub BU Checkbox");

    // 6. เลือก Vehicle Combobox
    await tryAction(async () => {
      const vehicleBox = page
        .getByRole("combobox", { name: "Required field" })
        .first();
      await vehicleBox.click({ force: true });
      await page
        .getByRole("option", { name: createData.vehicle })
        .first()
        .click({ force: true });
    }, "Select Vehicle");

    // 7. กรอก Contact
    await page
      .getByRole("textbox", { name: "Contact" })
      .fill(createData.contact);

    // 8. เลือก Maintenance Plan
    await tryAction(async () => {
      const planSelect = page
        .getByLabel("Maintenance Plan")
        .or(page.getByRole("combobox", { name: "Maintenance Plan" }));
      await planSelect.selectOption({ index: 1 }).catch(async () => {
        await planSelect.click({ force: true });
        await page.getByRole("option").nth(1).click({ force: true });
      });
    }, "Select Maintenance Plan");

    // 9. เลือก Location
    await tryAction(async () => {
      const locationInput = page.getByRole("searchbox");
      await locationInput.click({ force: true });
      await locationInput.fill(createData.locationSearch);
      await page.waitForTimeout(1000);
      await locationInput.press("ArrowDown");
      await locationInput.press("Enter");
    }, "Select Location");

    // 10. กรอก Assign To
    await page
      .getByRole("textbox", { name: "Assign To" })
      .fill(createData.assignTo);

    // await page.pause();
    // 11. กดปุ่ม Save
    await safeClick(page.getByRole("button", { name: "Save" }), "Save Button");

    // รอให้ Modal ปิดลงก่อนขึ้นรอบถัดไป
    await page.waitForTimeout(1000);
  }

  await page.pause();
});
