import { test, expect } from '@playwright/test';

test.describe('SES Next Website Smoke Tests', () => {
  test('homepage loads successfully', async ({ page }) => {
    await page.goto('/');

    await expect(page).toHaveTitle(/SES Melbourne Electricians/);
    await expect(page.locator('body')).toBeVisible();
    await expect(page.locator('nav')).toBeVisible();
  });

  test('service page loads successfully - air conditioning', async ({ page }) => {
    await page.goto('/services/air-conditioning');

    await expect(page.locator('body')).toBeVisible();
    await expect(page.locator('h1')).toBeVisible();
  });

  test('blogs page loads successfully', async ({ page }) => {
    await page.goto('/blog');
    await expect(page.locator('body')).toBeVisible();
  });

  test('sitemap.xml loads and contains content', async ({ page }) => {
    const response = await page.goto('/sitemap.xml');
    expect(response?.status()).toBe(200);
    expect(response?.headers()['content-type']).toContain('xml');

    const content = await page.content();
    expect(content).toContain('<urlset');
    expect(content).toContain('<url>');
    expect(content).toContain('<loc>');

    const urlMatches = content.match(/<url>/g);
    expect(urlMatches?.length).toBeGreaterThanOrEqual(2);
  });

  test('page is responsive on mobile', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto('/');
    await expect(page.locator('body')).toBeVisible();

    const bodyWidth = await page.locator('body').boundingBox();
    expect(bodyWidth?.width).toBeLessThanOrEqual(375);
  });
});
