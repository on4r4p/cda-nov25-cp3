import { expect, test } from "@playwright/test";

test("shows latest articles and opens an article from the homepage", async ({ page }) => {
  await page.goto("/");

  await expect(page.getByRole("heading", { name: "Last news" })).toBeVisible();

  const firstArticleLink = page.locator("main ul li a").first();
  const firstArticleTitle = await firstArticleLink.locator("h2").innerText();

  await firstArticleLink.click();

  await expect(page.getByRole("heading", { name: firstArticleTitle })).toBeVisible();
  await expect(page.getByText(/Category:/i)).toBeVisible();
});

test("searches an existing seeded article from the header", async ({ page }) => {
  await page.goto("/");

  await page.getByRole("textbox", { name: "Search articles" }).fill("GraphQL");
  await page.getByRole("button", { name: "Search articles" }).click();

  await expect(page).toHaveURL(/\/search\?title=GraphQL/);
  await expect(page.getByRole("heading", { name: "Search results" })).toBeVisible();

  const resultLink = page.getByRole("link", { name: /Building a GraphQL API with Apollo Server/i });
  await expect(resultLink).toBeVisible();

  await resultLink.click();

  await expect(
    page.getByRole("heading", { name: "Building a GraphQL API with Apollo Server" }),
  ).toBeVisible();
});
