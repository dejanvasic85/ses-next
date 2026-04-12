import { test, expect } from '@playwright/test';

test.describe('Page Routes', () => {
  test('faq page loads and renders FAQ items', async ({ page }) => {
    await page.goto('/faq');

    await expect(page.locator('h1')).toContainText(/frequently asked questions/i);
    await expect(page.locator('h2').first()).toBeVisible();
  });

  test('terms page loads and renders content', async ({ page }) => {
    await page.goto('/terms');

    await expect(page.locator('h1')).toContainText(/terms/i);
    await expect(page.locator('body')).toBeVisible();
  });

  test('custom 404 page renders for unknown routes', async ({ page }) => {
    const response = await page.goto('/this-page-definitely-does-not-exist-xyz');

    expect(response?.status()).toBe(404);
    await expect(page.locator('h1')).toContainText(/not found/i);
    await expect(page.getByRole('link', { name: 'homepage.' })).toBeVisible();
  });
});

test.describe('Service Routes', () => {
  test('sub-service page loads correctly', async ({ page }) => {
    const sitemapResponse = await page.goto('/sitemap.xml');
    expect(sitemapResponse?.status()).toBe(200);

    const content = await page.content();
    const subServiceUrls = [...content.matchAll(/<loc>([^<]+\/services\/[^/]+\/[^/<]+)<\/loc>/g)].map((m) => m[1]);

    if (subServiceUrls.length === 0) {
      test.skip();
      return;
    }

    const subServicePath = new URL(subServiceUrls[0]).pathname;
    await page.goto(subServicePath);
    await expect(page.locator('h1')).toBeVisible();
    await expect(page.locator('nav')).toBeVisible();
  });
});

test.describe('Location Routes', () => {
  test('location page loads correctly', async ({ page }) => {
    const sitemapResponse = await page.goto('/sitemap.xml');
    expect(sitemapResponse?.status()).toBe(200);

    const content = await page.content();
    const locationUrls = [...content.matchAll(/<loc>([^<]+\/locations\/electrician-[^/<]+)<\/loc>/g)].map((m) => m[1]);

    if (locationUrls.length === 0) {
      test.skip();
      return;
    }

    const locationPath = new URL(locationUrls[0]).pathname;
    await page.goto(locationPath);
    await expect(page.locator('h1')).toBeVisible();
    await expect(page.locator('nav').first()).toBeVisible();
  });

  test('locations index page loads correctly', async ({ page }) => {
    const response = await page.goto('/locations');
    expect(response?.status()).toBe(200);
    await expect(page.locator('h1')).toBeVisible();
    await expect(page.locator('nav').first()).toBeVisible();
  });
});

test.describe('Blog Routes', () => {
  test('blog tag page renders filtered posts', async ({ page }) => {
    await page.goto('/blog');

    const tagLink = page.locator('a[href^="/blog/tag/"]').first();
    const tagLinkCount = await tagLink.count();

    if (tagLinkCount === 0) {
      test.skip();
      return;
    }

    const tagHref = await tagLink.getAttribute('href');
    await page.goto(tagHref!);

    await expect(page.locator('h1')).toBeVisible();
    const blogPost = page.locator('article, [data-testid="blog-post"]').first();
    const postCount = await blogPost.count();
    if (postCount > 0) {
      await expect(blogPost).toBeVisible();
    }
  });
});

test.describe('API Routes', () => {
  test('contact API returns 405 for GET requests', async ({ request }) => {
    const response = await request.get('/api/contact');
    expect(response.status()).toBe(405);
  });

  test('contact API returns 400 for malformed JSON body', async ({ request }) => {
    const response = await request.post('/api/contact', {
      headers: { 'Content-Type': 'application/json' },
      data: Buffer.from('{invalid json'),
    });
    expect(response.status()).toBe(400);
    const body = await response.json();
    expect(body.message).toMatch(/invalid request body/i);
  });

  test('contact API returns 200 for valid submission', async ({ request }) => {
    const response = await request.post('/api/contact', {
      headers: { 'Content-Type': 'application/json' },
      data: JSON.stringify({
        fullName: 'Test User',
        email: 'test@example.com',
        phone: '0400000000',
        message: 'Test message',
        address: '123 Test St',
        recaptchaToken: 'bypass-token',
      }),
    });
    expect(response.status()).toBe(200);
    const body = await response.json();
    expect(body.message).toBe('Message received');
  });
});
