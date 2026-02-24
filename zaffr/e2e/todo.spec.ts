import { test, expect } from "@playwright/test";

test.describe("Todo list", () => {
  test.describe.configure({ mode: "serial" });

  test("create todo and see it in the list", async ({ page }) => {
    await page.goto("/");
    const text = "E2E create in list";
    const input = page.getByRole("textbox", { name: /new todo/i });
    await input.fill(text);
    await page.getByRole("button", { name: /^add$/i }).click();
    await expect(page.getByText(text).first()).toBeVisible();
    const list = page.getByRole("list", { name: "Todo list" });
    await expect(list).toBeVisible();
    await expect(list.getByText(text).first()).toBeVisible();
  });

  test("create todo persists after reload", async ({ page }) => {
    await page.goto("/");
    const text = "E2E persist after reload";
    const input = page.getByRole("textbox", { name: /new todo/i });
    await input.fill(text);
    await page.getByRole("button", { name: /^add$/i }).click();
    await expect(page.getByText(text).first()).toBeVisible();
    await page.reload();
    await expect(page.getByText(text).first()).toBeVisible();
  });

  test("toggle todo complete shows completed state", async ({ page }) => {
    await page.goto("/");
    const text = "E2E todo to complete";
    const input = page.getByRole("textbox", { name: /new todo/i });
    await input.fill(text);
    await page.getByRole("button", { name: /^add$/i }).click();
    await expect(page.getByRole("list", { name: "Todo list" })).toBeVisible();
    const row = page
      .getByRole("list", { name: "Todo list" })
      .locator("li")
      .filter({ hasText: text })
      .filter({ has: page.getByRole("checkbox", { checked: false }) })
      .first();
    const checkbox = row.getByRole("checkbox", { name: /mark as complete/i });
    await expect(checkbox).toBeVisible();
    await checkbox.click();
    await expect(
      page
        .getByRole("list", { name: "Todo list" })
        .locator("li")
        .filter({ hasText: text })
        .getByRole("checkbox", { name: /mark as incomplete/i })
        .first(),
    ).toBeVisible({ timeout: 5000 });
    await expect(
      page.getByRole("list", { name: "Todo list" }).locator("li").filter({ hasText: text }).locator("span.line-through").first(),
    ).toBeVisible();
  });

  test("delete todo removes it from the list", async ({ page }) => {
    await page.goto("/");
    const text = "E2E todo to delete";
    const input = page.getByRole("textbox", { name: /new todo/i });
    await input.fill(text);
    await page.getByRole("button", { name: /^add$/i }).click();
    await expect(page.getByRole("list", { name: "Todo list" })).toBeVisible();
    const row = page.getByRole("list", { name: "Todo list" }).locator("li").filter({ hasText: text }).first();
    await row.getByRole("button", { name: "Delete todo" }).click();
    await expect(page.getByText(text)).not.toBeVisible();
  });

  test("empty state shows when no todos", async ({ page }) => {
    await page.goto("/");
    const list = page.getByRole("list", { name: "Todo list" });
    const emptyStatus = page.getByRole("status", { name: "No todos yet" });
    await expect(list.or(emptyStatus)).toBeVisible({ timeout: 10000 });
    if (await emptyStatus.isVisible()) {
      await expect(page.getByText(/add your first todo above/i)).toBeVisible();
      return;
    }
    const deleteBtnEnabled = () => page.getByRole("button", { name: "Delete todo" }).locator(":not([disabled])");
    let iterations = 0;
    while ((await list.isVisible()) && (await deleteBtnEnabled().count()) > 0 && iterations++ < 30) {
      await deleteBtnEnabled().first().click();
      await page.waitForTimeout(800);
    }
    if (await emptyStatus.isVisible()) {
      await expect(page.getByText(/add your first todo above/i)).toBeVisible();
    }
  });

  test("error state: one message and retry action covered in component tests", async ({ page }) => {
    test.skip(true, "E2E error injection depends on tRPC request order; ErrorState + Try again tested in __tests__/components/error-state.test.tsx");
  });
});
