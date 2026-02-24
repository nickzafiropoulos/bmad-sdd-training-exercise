import AxeBuilder from "@axe-core/playwright";
import { test, expect } from "@playwright/test";

test.describe("Accessibility", () => {
  test("home page has no critical or serious axe violations (WCAG 2.1 AA)", async ({ page }) => {
    await page.goto("/");
    const results = await new AxeBuilder({ page })
      .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa"])
      .analyze();

    const violations = results.violations;
    if (violations.length > 0) {
      const summary = violations.map((v) => ({
        id: v.id,
        impact: v.impact,
        description: v.description,
        help: v.help,
        nodes: v.nodes.length,
        wcag: v.tags?.filter((t) => t.startsWith("wcag")) ?? [],
      }));
      console.error("A11y violations:", JSON.stringify(summary, null, 2));
      violations.forEach((v) => {
        console.error(`\n[${v.impact}] ${v.id}: ${v.help}`);
        v.nodes.forEach((n) => console.error(`  - ${n.html}`));
      });
    }
    expect(violations, `Expected 0 axe violations. Found: ${violations.map((v) => v.id).join(", ")}`).toHaveLength(0);
  });

  test("home page (light theme) has no critical or serious axe violations", async ({ page }) => {
    await page.goto("/");
    await page.evaluate(() => {
      document.documentElement.setAttribute("data-theme", "light");
    });
    const results = await new AxeBuilder({ page })
      .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa"])
      .analyze();

    const violations = results.violations;
    if (violations.length > 0) {
      violations.forEach((v) => {
        console.error(`\n[${v.impact}] ${v.id}: ${v.help}`);
        v.nodes.forEach((n) => console.error(`  - ${n.html}`));
      });
    }
    expect(violations, `Expected 0 axe violations (light). Found: ${violations.map((v) => v.id).join(", ")}`).toHaveLength(0);
  });
});
