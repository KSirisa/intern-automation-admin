import { Page, Locator } from "@playwright/test";
import { tryAction, safeClick } from "../../../helpers";
import { selectBUTreeviewNode } from "./bu-form.helpers";
import { handleAddItemsModal, SpecificItemConfig } from "./bu-add-modal.helper";

function escapeRegex(str: string): string {
  return str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

export const ALL_SPECIFIC_ITEMS = [
  "Custom POI (Public)",
  "Custom POI (Shared)",
  "Custom Areas",
  "Custom Routes",
  "Business Type",
  "Products",
  "Shipment Category",
  "Users",
  "Advance Driver Performance",
  "Shipment Alerts",
  "Line Configurations",
] as const;

function parseOptions(options?: string | string[]): string[] {
  if (typeof options === "string") {
    const trimmed = options.trim();
    if (trimmed.toLowerCase() === "all") return ["all"];
    if (trimmed !== "") return trimmed.split(",").map((s) => s.trim().toLowerCase());
    return [];
  }
  if (Array.isArray(options)) {
    return options.map((s) => s.trim().toLowerCase()).filter(Boolean);
  }
  return [];
}

export async function resetSubBlade(page: Page): Promise<void> {
  await tryAction(async () => {
    const cancelBtn = page.getByRole("button", { name: "Cancel" }).last();
    await cancelBtn.waitFor({ state: "visible", timeout: 5000 });
    await safeClick(cancelBtn, "Click Sub-blade Cancel to Reset");
    await page.waitForTimeout(500);

    const okBtn = page.getByText("OK").last();
    await okBtn.waitFor({ state: "visible", timeout: 5000 });
    await safeClick(okBtn, "Click Dialog OK");

    await page.waitForTimeout(1000);
  }, "Reset Sub-blade (Cancel -> OK)");
}

export async function confirmSubBlade(page: Page): Promise<void> {
  await tryAction(async () => {
    const okBtn = page
      .getByRole("button", { name: /^OK$/i })
      .or(page.locator("div.fxc-button, div.azc-button").filter({ hasText: /^OK$/i }))
      .or(page.getByText("OK"))
      .last();

    await okBtn.waitFor({ state: "visible", timeout: 5000 });
    await safeClick(okBtn, "Click Sub-blade OK to Confirm/Save");
    await page.waitForTimeout(1000);
  }, "Confirm Sub-blade (OK)");
}

export async function openApplyBUMenu(page: Page): Promise<void> {
  const applyBuLink = page.getByRole("link", { name: "Apply to this Business Unit" }).first();
  await applyBuLink.waitFor({ state: "visible", timeout: 5000 });
  await safeClick(applyBuLink, "Open Apply to Business Unit Menu");

  const subMenuContainer = page.locator("#sub-menu-items").last();
  await subMenuContainer.waitFor({ state: "visible", timeout: 10000 });
  await page.waitForTimeout(500);
}

async function syncCheckboxes(
  page: Page,
  checkboxesLocator: Locator,
  options?: string | string[]
): Promise<void> {
  const targetList = parseOptions(options);
  const isAll = targetList.includes("all");

  await checkboxesLocator.first().waitFor({ state: "visible", timeout: 5000 });
  const count = await checkboxesLocator.count();

  for (let i = 0; i < count; i++) {
    const cb = checkboxesLocator.nth(i);

    if (await cb.isVisible().catch(() => false)) {
      const fullText = (await cb.textContent().catch(() => "")) || "";
      const cleanText = fullText.trim();
      if (!cleanText) continue;

      const cleanTextLower = cleanText.toLowerCase();

      const shouldCheck =
        isAll ||
        targetList.some(
          (target) => cleanTextLower.includes(target) || target.includes(cleanTextLower)
        );

      const input = cb.locator('input[type="checkbox"]').first();
      const isChecked = await input.isChecked().catch(() => false);

      if (shouldCheck && !isChecked) {
        const clickTarget = cb.locator("label, .app-control-indicator").first();
        await safeClick(clickTarget, `Check: ${cleanText}`);
        await page.waitForTimeout(300);
      } else if (!shouldCheck && isChecked) {
        const clickTarget = cb.locator("label, .app-control-indicator").first();
        await safeClick(clickTarget, `Uncheck: ${cleanText}`);
        await page.waitForTimeout(300);
      }
    }
  }
}

export async function configureApplyToBUModal(
  page: Page,
  targetBu: string | undefined | null,
  options?: string | string[]
): Promise<void> {
  if (!targetBu?.trim()) return;

  await tryAction(async () => {
    await selectBUTreeviewNode(page, targetBu, "#ddlBusinessUnit");

    const applyToCheckboxes = page.locator(
      'gisc-ui-checkbox[params*="checked:isApplyTo"]:not([params*="isApplyToAll"])'
    );

    await syncCheckboxes(page, applyToCheckboxes, options);
  }, `Configure Copy From BU: "${targetBu}"`);
}

export async function configureApplyToAll(
  page: Page,
  options?: string | string[]
): Promise<void> {
  await tryAction(async () => {
    const applyToAllCheckboxes = page.locator('gisc-ui-checkbox[params*="isApplyToAll"]');

    await applyToAllCheckboxes.first().waitFor({ state: "visible", timeout: 8000 });
    await page.waitForTimeout(500);

    await syncCheckboxes(page, applyToAllCheckboxes, options);
  }, "Configure Apply To All");
}

export async function configureApplyToSpecific(
  page: Page,
  options?: string | string[],
  specificItemsConfig?: Record<string, SpecificItemConfig>
): Promise<void> {
  await tryAction(async () => {
    const targetList = parseOptions(options);
    if (targetList.length === 0) return;

    const subMenuContainer = page.locator("#sub-menu-items").last();
    await subMenuContainer.waitFor({ state: "visible", timeout: 10000 });

    const isAll = targetList.includes("all");
    const itemsToSelect = isAll
      ? ALL_SPECIFIC_ITEMS
      : ALL_SPECIFIC_ITEMS.filter((item) =>
          targetList.some(
            (target) => item.toLowerCase().includes(target) || target.includes(item.toLowerCase())
          )
        );

    for (const itemName of itemsToSelect) {
      const safeItemName = escapeRegex(itemName);
      const link = subMenuContainer
        .locator("a")
        .filter({
          has: page.locator(`[title*="${itemName}"], span:has-text("${itemName}")`),
        })
        .or(page.getByRole("link", { name: new RegExp(safeItemName, "i") }))
        .first();

      if (await link.isVisible({ timeout: 5000 }).catch(() => false)) {
        await link.click();
        await page.waitForTimeout(800);

        const itemConfig = specificItemsConfig?.[itemName];
        await handleAddItemsModal(page, itemName, itemConfig);
      }
    }
  }, "Configure Apply To Specific");
}

export async function configureApplyTo(page: Page, testData: any): Promise<void> {
  const activeModes: ("BU" | "ALL" | "SPECIFIC")[] = [];

  if (testData.isApplyToBUMode && testData.appliedBusinessUnitTarget) {
    activeModes.push("BU");
  }
  if (testData.isApplyToAllMode) {
    activeModes.push("ALL");
  }
  if (testData.isApplyToSpecificMode) {
    activeModes.push("SPECIFIC");
  }

  if (activeModes.length === 0) return;

  for (let i = 0; i < activeModes.length; i++) {
    const currentMode = activeModes[i];
    const isLastMode = i === activeModes.length - 1;

    await openApplyBUMenu(page);

    if (currentMode === "BU") {
      await configureApplyToBUModal(
        page,
        testData.appliedBusinessUnitTarget,
        testData.appliedBusinessUnitOptions
      );
    } else if (currentMode === "ALL") {
      await configureApplyToAll(page, testData.applyToAllOptions);
    } else if (currentMode === "SPECIFIC") {
      await configureApplyToSpecific(
        page,
        testData.applyToSpecificOptions,
        testData.specificItemsConfig
      );
    }

    if (!isLastMode) {
      await resetSubBlade(page);
    } else {
      await confirmSubBlade(page);
    }
  }
}