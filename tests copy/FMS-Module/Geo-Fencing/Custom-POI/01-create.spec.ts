import { test, expect, Page } from "@playwright/test";
import { safeClick, fillByLabel, selectByLabel, selectBusinessUnitNode } from "../../../../helpers";

const ACTION_DELAY = 500;

// กำหนดข้อมูล POI สำหรับการทดสอบ
const poiData = {
  name: "ATest001",
  code: "AT001",
  description: "Automated FMS POI Creation",
  accessType: "Public", // Shared | Public
  telephone: "0981234567",
  operatingFrom: "08:00",
  operatingTo: "17:00",
  serviceTimes: "10",
  webUrl: "https://test.com",
  subAreaName: "subPOIarea",
  subAreaCode: "ATsub001",
  subAreaDescription: "subtest description",
};

test("geo-fencing test - Create Custom POI & Sub POI Area", async ({ page }) => {
  test.setTimeout(180000); // ขยายเวลาเผื่อการโหลด Map Canvas

  await page.goto("/#/geo-fencing");

  // 1. เปิดหน้า Custom POI และเปิด Form Create
  await safeClick(page.getByRole("link", { name: "Custom POI", exact: true }));
  await page.waitForTimeout(1500);

  await safeClick(page.getByTitle("Create", { exact: true }));
  await page.waitForTimeout(ACTION_DELAY);

  // สโคปเฉพาะ Blade/Form Create ที่เปิดขึ้นมาล่าสุด
  const activeBlade = page.locator(".app-blade-stacklayout, div[data-bind*='blade']").last();

  // 2. กรอกข้อมูล General Information
  // --- [จุดแก้ไข] ปรับ Locator ชี้ไปที่ Input ผ่าน gisc-ui-label "Name" ---
  const nameInput = activeBlade
    .locator('gisc-ui-label:has-text("Name") + gisc-ui-textbox input.app-input')
    .first();
  await safeClick(nameInput);
  await nameInput.fill(poiData.name);

  const descriptionInput = activeBlade
    .locator('textarea[type="text"], textarea.app-textarea')
    .first();
  await safeClick(descriptionInput);
  await descriptionInput.fill(poiData.description);

  // --- [จุดแก้ไข] ปรับ Locator ชี้ไปที่ Input ผ่าน gisc-ui-label "Code" ---
  const codeInput = activeBlade
    .locator('gisc-ui-label:has-text("Code") + gisc-ui-textbox input.app-input')
    .first();
  await safeClick(codeInput);
  await codeInput.focus();
  await codeInput.fill("");
  await codeInput.fill(poiData.code);
  await codeInput.dispatchEvent("change").catch(() => {});

  // Checkbox Scan Check-In & Select Access Type
  await safeClick(activeBlade.locator("label").filter({ hasText: "Scan Check-In" }));

  const accessTypeSelect = activeBlade.locator("select").first();
  await accessTypeSelect.selectOption({ label: poiData.accessType }).catch(() => {});

  // 3. จัดการ Categories Modal
  await safeClick(activeBlade.locator("a").filter({ hasText: "Add" }).first());
  await safeClick(page.locator('[id="2"] > .dt-body-center > .app-checkBox-contain-dt'));
  await safeClick(page.getByRole("button", { name: "OK" }));

  await page
    .getByRole("button", { name: "Choose File" })
    .setInputFiles("C:\\Users\\4rmxi\\Downloads\\driverImage.jpg");


  // Combobox Icon & Telephone
  await safeClick(activeBlade.locator(".app-image-combobox").first());
  await safeClick(page.locator(".fnone").first());

  const phoneInput = activeBlade.getByRole("textbox", { name: "Telephone" });
  await safeClick(phoneInput);
  await phoneInput.fill(poiData.telephone);

  // Operating Hours & Days
  await activeBlade.getByRole("textbox").nth(4).fill(poiData.operatingFrom);
  await activeBlade.getByRole("textbox").nth(5).fill(poiData.operatingTo);

  // Select Working Days (Toggle All)
  await safeClick(activeBlade.getByText("All", { exact: true }));

  // Service & Queue Times
  await activeBlade.locator("#txtPickupWaypointTime").fill(poiData.serviceTimes);
  await activeBlade.locator("#txtPickupServiceTime").fill(poiData.serviceTimes);
  await activeBlade.locator("#txtDeliveryServiceTime").fill(poiData.serviceTimes);

  await safeClick(activeBlade.locator("label").filter({ hasText: "Enable Queue at Pick Up POI" }));
  await safeClick(activeBlade.locator("label").filter({ hasText: "Enable Queue at Deliver POI" }));

  // Web URL Field - ระบุผ่าน gisc-ui-label ที่มีคำว่า "Website"
  const urlInput = activeBlade
    .locator('gisc-ui-label:has-text("Website") + gisc-ui-textbox input.app-input')
    .first();
  await safeClick(urlInput);
  await urlInput.fill(poiData.webUrl);

  // 4. จัดการ Business Unit (BU) Modal
  await safeClick(activeBlade.locator("a").filter({ hasText: "Add" }).nth(1));
  await page.getByLabel("Include Sub Business Units").selectOption("Yes").catch(() => {});
  await safeClick(page.getByRole("treeitem", { name: "AGG" }));
  await safeClick(page.getByRole("button", { name: "OK" }));

  // --------------------------------------------------------------------------
  // 5. วาดพื้นที่ Custom POI บน Map Canvas
  // --------------------------------------------------------------------------
  await safeClick(activeBlade.locator(".img-custom-geofencing > #Layer_1").first());

  const mapFrame = page.locator("iframe").contentFrame();
  const mapCanvas = mapFrame.locator("#divMap_gc");

  // รอให้ Map Canvas โหลดเรียบร้อยก่อนโต้ตอบ
  await mapCanvas.waitFor({ state: "visible" });

  // คลิก 1 จุดบนแมพ (เช่น พิกัด X: 600, Y: 300) เพื่อเปิดโหมดการปักหมุด/วาด
  await mapCanvas.click({ position: { x: 600, y: 300 } });
  await page.waitForTimeout(ACTION_DELAY);

  // เปิดเครื่องมือ Polygon Editor
  await safeClick(activeBlade.locator("#Union_6"));
  await mapFrame
    .locator('[data-dojo-attach-point="divHiddingWidget"]')
    .filter({ hasText: "Polygon Editor" })
    .dispatchEvent("mouseover")
    .catch(() => {});
  await safeClick(mapFrame.locator(".msportalfx-svg-placeholder"));
  await safeClick(mapFrame.locator("div:nth-child(5) > .div-btn > #Layer_1 > path").first());

  // วาดรูปสี่เหลี่ยม POI หลัก
  const AreaPoints = [
    { x: 590, y: 300 },
    { x: 640, y: 300 },
    { x: 640, y: 350 },
    { x: 590, y: 350 },
  ];

  for (const point of AreaPoints) {
    await mapCanvas.click({ position: point });
  }
  await mapCanvas.dblclick({ position: AreaPoints[AreaPoints.length - 1] });
  await safeClick(mapFrame.getByText("OK"));

  // --------------------------------------------------------------------------
  // 6. สร้าง Sub POI Area
  // --------------------------------------------------------------------------

  const createPoiBlade = page.locator(".app-blade-stacklayout, div[data-bind*='blade']").first();
  await safeClick(createPoiBlade);
  await page.waitForTimeout(ACTION_DELAY);

  await safeClick(activeBlade.locator("a").filter({ hasText: "Add" }).last());
  await page.waitForTimeout(ACTION_DELAY);

  const subBlade = page.locator(".app-blade-stacklayout, div[data-bind*='blade']").last();

  const subNameInput = subBlade.getByRole("textbox", { name: "Required field" }).first();
  await safeClick(subNameInput);
  await subNameInput.fill(poiData.subAreaName);

  const subCodeInput = subBlade
    .locator('gisc-ui-textbox[params*="code"] input, gisc-ui-textbox[params*="Code"] input')
    .first();

  await safeClick(subCodeInput);
  await subCodeInput.fill(poiData.subAreaCode);

  // วนลูปทดสอบตัวเลือก Type ของ Sub Area
  const typeAreaSelect = subBlade
    .locator('gisc-ui-dropdown[params*="options:typeOptions"] select, select')
    .filter({
      has: page.locator("option", { hasText: "Parking Area" }),
    });

  await typeAreaSelect.selectOption({ label: "Loading Area" }).catch(() => {});
  await typeAreaSelect.selectOption({ label: "Unloading Area" }).catch(() => {});
  await typeAreaSelect.selectOption({ label: "Restrict Area" }).catch(() => {});

  // Description Sub Area
  const subDesc = subBlade.locator(
    'gisc-ui-textarea[params*="value:description"] textarea.app-textarea, textarea'
  );
  await safeClick(subDesc);
  await subDesc.fill(poiData.subAreaDescription);

  // วาดรูปสี่เหลี่ยม Sub POI Area บน Map
  await safeClick(subBlade.locator(".img-custom-geofencing svg, .img-custom-geofencing").first());
  await safeClick(mapFrame.locator("div:nth-child(5) > .div-btn > #Layer_1 > path").first());

  const subAreaPoints = [
    { x: 600, y: 310 },
    { x: 630, y: 310 },
    { x: 630, y: 340 },
    { x: 600, y: 340 },
  ];

  for (const point of subAreaPoints) {
    await mapCanvas.click({ position: point });
  }
  await mapCanvas.dblclick({ position: subAreaPoints[subAreaPoints.length - 1] });
  await safeClick(mapFrame.getByText("OK"));


  // --------------------------------------------------------------------------
  // 7. บันทึกข้อมูล Sub Area และ Main Custom POI
  // --------------------------------------------------------------------------

  await page.getByText('Create Sub POI Area Name Code').click();
  await safeClick(page.getByRole("button", { name: "Save" }));
  await page.waitForTimeout(ACTION_DELAY);

  await page.getByText('Create Custom POI Name').click();

  await safeClick(page.getByRole("button", { name: "Save" }));
  await page.waitForTimeout(2000);

  // Pause สำหรับ Manual Audit ในโหมด Headed
  await page.pause();
});