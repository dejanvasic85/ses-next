import { test, expect } from '@playwright/test';

const mobileViewport = { width: 390, height: 844 };

test.describe('Header', () => {
  test('marks the section you are in as the current page', async ({ page }) => {
    await page.goto('/locations/');

    const rail = page.getByRole('navigation', { name: 'Main' });
    await expect(rail.getByRole('link', { name: 'Locations' })).toHaveAttribute('aria-current', 'page');
    await expect(rail.getByRole('link', { name: 'Blog' })).not.toHaveAttribute('aria-current', 'page');
  });

  test('keeps Services current on a service detail page', async ({ page }) => {
    await page.goto('/services/air-conditioning');

    const rail = page.getByRole('navigation', { name: 'Main' });
    await expect(rail.getByRole('link', { name: 'Services' })).toHaveAttribute('aria-current', 'page');
  });

  test('offers the phone number as a call link', async ({ page }) => {
    await page.goto('/');

    await expect(page.getByRole('navigation', { name: 'Main' }).locator('a[href^="tel:"]').first()).toBeVisible();
  });
});

test.describe('Mobile drawer', () => {
  test.use({ viewport: mobileViewport });

  test('stays out of the page until it is opened', async ({ page }) => {
    await page.goto('/');

    await expect(page.getByRole('dialog', { name: 'Site menu' })).toBeHidden();
  });

  test('opens, navigates and closes', async ({ page }) => {
    await page.goto('/');

    const drawer = page.getByRole('dialog', { name: 'Site menu' });
    await page.getByRole('button', { name: 'Open menu' }).click();

    await expect(drawer).toBeVisible();
    await expect(drawer.getByRole('link', { name: 'FAQ' })).toBeVisible();

    await drawer.getByRole('link', { name: 'FAQ' }).click();
    await expect(page).toHaveURL(/\/faq/);
    await expect(drawer).toBeHidden();
  });

  test('closes on Escape and returns focus to the trigger', async ({ page }) => {
    await page.goto('/');

    const drawer = page.getByRole('dialog', { name: 'Site menu' });
    const trigger = page.getByRole('button', { name: 'Open menu' });

    await trigger.click();
    await expect(drawer).toBeVisible();

    await page.keyboard.press('Escape');
    await expect(drawer).toBeHidden();
    await expect(trigger).toBeFocused();
  });
});
