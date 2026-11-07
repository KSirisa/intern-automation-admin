import { test, expect } from "@playwright/test";

test("Configuration - Shipment Detail Configuration RegressionTest", async ({ page }) => {
  //---------- เข้าหน้า FMS เมนู Shipment Management ----------
  await page.goto("/#/shipment");

  //---------- คลิกแถบ Configuration ----------
  await page.getByRole("link", { name: "Configuration", exact: true }).click();

  await page.waitForTimeout(500);

  //---------- คลิกแถบ Shipment Detail Configuration ----------
  await page
    .getByRole("link", { name: "Shipment Detail Configuration", exact: true })
    .click();

  await page.waitForTimeout(500);

  //---------------------------------------- Update ----------------------------------------
  await page.getByTitle("Update").click();

  //-------------------- Checkbox : Show Windows Time --------------------
  await page.waitForTimeout(1500);
  await page
    .locator("span")
    .filter({ hasText: /^Show Windows Time$/ })
    .click();

  // await page
  //   .locator("span")
  //   .filter({ hasText: /^Show Windows Time$/ })
  //   .click();

  //---------- Dropdown : Select Range ----------
  await page.getByLabel("Select Range").selectOption({ label: "Lowest" });

  //---------- Checkbox : Show Windows Time Status ----------
  await page
    .locator("span")
    .filter({ hasText: "Show Windows Time Status" })
    .click();

  //---------- Checkbox : On Time ----------
  await page.locator("span").filter({ hasText: "On Time" }).click();

  await page.locator("#ddlTimeTypeOntime").selectOption({ label: "Arrival" });

  await page
    .locator("gisc-ui-dropdown")
    .filter({ hasText: "Required field" })
    .getByLabel("Condition")
    .selectOption({ label: "Between" }); // or '=', '<', '<=', '>', '>=' — whichever you need

  //---------- Checkbox : Delay ----------
  await page.locator("span").filter({ hasText: "Delay" }).click();

  await page.locator("#ddlTimeTypeDelay").selectOption({ label: "Depart" });

  await page
    .locator("gisc-ui-dropdown")
    .filter({ hasText: "Required field" })
    .getByLabel("Condition")
    .selectOption({ label: ">" }); // or '=', '<', '<=', '>', '>=' — whichever you need

  await page
    .locator("gisc-ui-dropdown")
    .filter({ hasText: "Windows Time StartWindows Time EndRequired field" })
    .locator("#ddlWindowTimeOntime")
    .selectOption({ label: "Windows Time End" });

  //---------- Checkbox : Early ----------
  await page.locator("span").filter({ hasText: "Early" }).click();

  await page.locator("#ddlTimeTypeEarly").selectOption({ label: "Arrival" });
  
  await page
    .locator("gisc-ui-dropdown")
    .filter({ hasText: "=<<=>>=BetweenRequired field" })
    .locator("#ddlConditionOntime")
    .selectOption({ label: "<" });
    
  await page
    .locator("gisc-ui-dropdown")
    .filter({ hasText: "Windows Time StartWindows Time EndRequired field" })
    .locator("#ddlWindowTimeOntime")
    .selectOption({ label: "Windows Time Start" });

    await page.getByRole('button', { name: 'Save' }).click();

});
