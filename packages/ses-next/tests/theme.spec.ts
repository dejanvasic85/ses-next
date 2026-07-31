import { test, expect, type Page } from '@playwright/test';

const minimumBodyContrast = 4.5;

type Rgba = { r: number; g: number; b: number; a: number };

type ThemeSnapshot = {
  colorScheme: string;
  base100: Rgba;
  baseContent: Rgba;
  measurements: Record<string, { color: Rgba; background: Rgba } | null>;
};

function relativeLuminance({ r, g, b }: Rgba): number {
  const channel = (raw: number) => {
    const srgb = raw / 255;
    return srgb <= 0.03928 ? srgb / 12.92 : Math.pow((srgb + 0.055) / 1.055, 2.4);
  };
  return 0.2126 * channel(r) + 0.7152 * channel(g) + 0.0722 * channel(b);
}

function contrastRatio(foreground: Rgba, background: Rgba): number {
  const lighter = Math.max(relativeLuminance(foreground), relativeLuminance(background));
  const darker = Math.min(relativeLuminance(foreground), relativeLuminance(background));
  return (lighter + 0.05) / (darker + 0.05);
}

/*
 * Everything is read in one pass in the browser. Colours arrive in whatever
 * notation they were authored in — hex from the DaisyUI theme blocks, oklab once
 * color-mix() is involved — so each one is painted to a single canvas pixel and
 * read back, which normalises all of them to sRGB.
 */
async function readThemeSnapshot(page: Page, selectors: string[]): Promise<ThemeSnapshot> {
  return page.evaluate<ThemeSnapshot, string[]>((sels) => {
    const canvas = document.createElement('canvas');
    canvas.width = canvas.height = 1;
    const ctx = canvas.getContext('2d');
    if (!ctx) {
      throw new Error('2d canvas context unavailable');
    }

    const resolveColor = (value: string): Rgba => {
      ctx.clearRect(0, 0, 1, 1);
      ctx.fillStyle = value;
      ctx.fillRect(0, 0, 1, 1);
      const [r, g, b, a] = ctx.getImageData(0, 0, 1, 1).data;
      return { r, g, b, a: a / 255 };
    };

    // The first opaque background behind an element is what the eye compares
    // against; most surfaces here are translucent or leave it unset.
    const measure = (selector: string) => {
      const element = document.querySelector(selector);
      if (!element) return null;

      let node: Element | null = element;
      let background = resolveColor('white');
      while (node) {
        const candidate = resolveColor(getComputedStyle(node).backgroundColor);
        if (candidate.a > 0.85) {
          background = candidate;
          break;
        }
        node = node.parentElement;
      }

      return { color: resolveColor(getComputedStyle(element).color), background };
    };

    const root = getComputedStyle(document.documentElement);
    const measurements: Record<string, ReturnType<typeof measure>> = {};
    for (const selector of sels) {
      measurements[selector] = measure(selector);
    }

    return {
      colorScheme: root.colorScheme,
      base100: resolveColor(root.getPropertyValue('--color-base-100').trim()),
      baseContent: resolveColor(root.getPropertyValue('--color-base-content').trim()),
      measurements,
    };
  }, selectors);
}

/*
 * Note: the foreground's alpha is not composited over the background before
 * measuring, so a translucent text colour reads slightly more contrasty here
 * than on screen. That makes this a floor rather than a precise audit — enough
 * to catch a theme inverting the wrong way, not a substitute for a real
 * accessibility pass.
 */
function expectLegible(snapshot: ThemeSnapshot, selector: string) {
  const measured = snapshot.measurements[selector];
  if (!measured) {
    throw new Error(`no element matched ${selector}`);
  }
  const ratio = contrastRatio(measured.color, measured.background);
  expect(ratio, `${selector} contrast ratio`).toBeGreaterThanOrEqual(minimumBodyContrast);
}

test.describe('Theme tokens', () => {
  test.describe('light', () => {
    test.use({ colorScheme: 'light' });

    test('resolves the light token set and stays legible', async ({ page }) => {
      await page.goto('/');
      const snapshot = await readThemeSnapshot(page, ['h1 + h2', 'footer a']);

      expect(snapshot.colorScheme).toBe('light');
      expect(relativeLuminance(snapshot.base100)).toBeGreaterThan(0.7);
      expect(relativeLuminance(snapshot.baseContent)).toBeLessThan(0.2);

      expectLegible(snapshot, 'h1 + h2');
      expectLegible(snapshot, 'footer a');
    });
  });

  test.describe('dark', () => {
    test.use({ colorScheme: 'dark' });

    /*
     * Guards against the dark theme silently failing to register with DaisyUI,
     * which would leave every page on the light tokens.
     */
    test('resolves the dark token set via prefers-color-scheme', async ({ page }) => {
      await page.goto('/');
      const snapshot = await readThemeSnapshot(page, ['h1 + h2', 'footer a']);

      expect(snapshot.colorScheme).toBe('dark');
      expect(relativeLuminance(snapshot.base100)).toBeLessThan(0.1);
      expect(relativeLuminance(snapshot.baseContent)).toBeGreaterThan(0.7);

      expectLegible(snapshot, 'h1 + h2');
      expectLegible(snapshot, 'footer a');
    });

    /*
     * The typography plugin ships hardcoded greys, so prose is the one place
     * dark mode can regress to dark-on-dark without anything else breaking.
     */
    test('prose body copy is not dark-on-dark', async ({ page }) => {
      // A blog post, not /terms — the terms page sets an explicit text colour on
      // its wrapper, so prose's own body variable would never be exercised.
      await page.goto('/blog');
      const firstPost = await page.locator('a[href^="/blog/"]').first().getAttribute('href');
      if (!firstPost) {
        throw new Error('no blog posts to sample');
      }

      await page.goto(firstPost);
      const snapshot = await readThemeSnapshot(page, ['.prose p']);

      expectLegible(snapshot, '.prose p');
    });
  });

  /*
   * Reads the font face registry rather than counting .woff2 responses. Response
   * counting was flaky: it depends on HTTP cache state, and the Google Maps
   * iframe pulls its own Roboto, so a page could "see" a font load without
   * either of ours arriving.
   */
  test('both self-hosted fonts load', async ({ page }) => {
    await page.goto('/');

    const fonts = await page.evaluate(async () => {
      await document.fonts.ready;
      const firstFamily = (stack: string) =>
        stack
          .split(',')[0]
          .trim()
          .replace(/^["']|["']$/g, '');

      const heading = document.querySelector('h1');
      if (!heading) {
        throw new Error('no h1 found');
      }
      const headingStack = getComputedStyle(heading).fontFamily;
      const bodyStack = getComputedStyle(document.body).fontFamily;
      const loaded = [...document.fonts].filter((face) => face.status === 'loaded').map((face) => face.family);

      return {
        headingStack,
        bodyStack,
        headingFamily: firstFamily(headingStack),
        bodyFamily: firstFamily(bodyStack),
        loaded,
      };
    });

    // next/font mangles family names per build, so assert the two roles resolve
    // to different faces rather than matching a literal name.
    expect(fonts.headingStack).not.toBe(fonts.bodyStack);
    expect(fonts.loaded, `loaded faces: ${JSON.stringify(fonts.loaded)}`).toContain(fonts.headingFamily);
    expect(fonts.loaded, `loaded faces: ${JSON.stringify(fonts.loaded)}`).toContain(fonts.bodyFamily);
  });
});

test.describe('Design system page', () => {
  test('renders and stays out of the index', async ({ page }) => {
    await page.goto('/design-system');

    await expect(page.locator('h1')).toContainText(/design system/i);
    await expect(page.locator('meta[name="robots"]')).toHaveAttribute('content', /noindex/);
    await expect(page.getByText('.surface-glass')).toBeVisible();
  });
});
