import { test, expect } from "@playwright/test";

const testData = {
    url: "/admin#/configuration",
    menuName: "POI Icons",
    imagePath: "tests/Admin-Module/TC009-Configurations/POI-Icon/Data/warehouse.png",
    createName: "Warehouse",
    updateName: "Warehouse Update",
    offsetX: "10",
    offsetY: "10"
};

test.describe('Configurations - POI Icons RegressionTest', () => {
    
    test.beforeEach(async ({ page }) => {
        await page.goto(testData.url);
        await page.getByRole("link", { name: testData.menuName, exact: true }).click();
        await page.waitForTimeout(500); 
    });

    test('ตรวจสอบการสร้าง แก้ไข และลบข้อมูล (CRUD Flow)', async ({ page }) => {
        
        await page.getByTitle("Create", { exact: true }).click();
        await page.getByRole("button", { name: "Choose File" }).setInputFiles(testData.imagePath);
        await page.getByRole("textbox", { name: "Name" }).fill(testData.createName);
        await page.getByRole("button", { name: "Save" }).click();
        
        await page.getByTitle('Update').click();
        await page.getByRole('textbox', { name: 'Name' }).fill(testData.updateName);
        await page.getByRole('textbox', { name: 'Offset X' }).fill(testData.offsetX);
        await page.getByRole('textbox', { name: 'Offset Y' }).fill(testData.offsetY);
        await page.getByRole('button', { name: 'Save' }).click();

        await page.getByTitle('Delete').click();
        await page.getByText('Yes').click();

    });
});