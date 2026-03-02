import { expect, test } from "@playwright/test";

test("creates then deletes an article through the real application flow", async ({ page }) => {
  const uniqueTitle = `Playwright article ${Date.now()}`;

  await page.goto("/articles/new");

  await page.getByLabel("Title").fill(uniqueTitle);
  await page
    .getByLabel("Main image URL")
    .fill("https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?w=800");
  await page.getByLabel("Category").selectOption({ label: "TypeScript" });
  await page
    .getByLabel("Article body")
    .fill("This article was created by the Playwright E2E suite.");

  await page.getByRole("button", { name: "Create article" }).click();

  await expect(page).toHaveURL(/\/articles\/\d+$/);
  await expect(page.getByRole("heading", { name: uniqueTitle })).toBeVisible();
  await expect(page.getByText("TypeScript")).toBeVisible();

  page.once("dialog", (dialog) => dialog.accept());
  await page.getByRole("button", { name: "Delete this article" }).click();

  await expect(page).toHaveURL("/");

  await page.getByRole("textbox", { name: "Search articles" }).fill(uniqueTitle);
  await page.getByRole("button", { name: "Search articles" }).click();

  await expect(page.getByText("No articles found.")).toBeVisible();
});
