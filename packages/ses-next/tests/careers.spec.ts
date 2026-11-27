import { test, expect } from '@playwright/test';

const careersPath = '/careers';

// The careers surfaces follow the "Currently hiring" switch in Sanity, so each
// test checks which state the content is in before asserting.
test.describe('Careers', () => {
  test('careers page, banner and team card follow the hiring switch', async ({ page }) => {
    const response = await page.goto(careersPath);
    const isHiring = response?.status() === 200;

    if (!isHiring) {
      expect(response?.status()).toBe(404);
      await page.goto('/');
      await expect(page.getByRole('complementary', { name: 'Job opening' })).toHaveCount(0);
      await expect(page.locator(`main a[href="${careersPath}"]`)).toHaveCount(0);
      return;
    }

    await expect(page.locator('h1')).toBeVisible();
    await expect(page.locator('#apply')).toBeVisible();
    await expect(page.getByRole('complementary', { name: 'Job opening' })).toHaveCount(0);

    const jobPosting = await page.locator('script[type="application/ld+json"]').first().textContent();
    expect(jobPosting).toContain('"JobPosting"');

    await page.goto('/');
    const banner = page.getByRole('complementary', { name: 'Job opening' });
    await expect(banner).toBeVisible();
    await expect(page.locator(`#about a[href="${careersPath}"]`)).toBeVisible();

    await banner.getByRole('button', { name: 'Close job opening banner' }).click();
    await expect(banner).toHaveCount(0);
    await page.reload();
    await expect(page.getByRole('complementary', { name: 'Job opening' })).toHaveCount(0);
  });
});
