import { chromium } from 'playwright';
import fs from 'fs';
import path from 'path';
import os from 'os';

import { URL } from './constants.mjs';

const getChromiumPath = () => {
  const cacheDir = path.join(os.homedir(), '.cache', 'ms-playwright');
  const dirs = fs.readdirSync(cacheDir).filter((d) => d.startsWith('chromium-'));
  if (dirs.length === 0) return undefined;
  const latestChromium = dirs.sort().pop();
  const platform = process.platform === 'darwin' ? 'chrome-mac' : 'chrome-linux';
  const executable = process.platform === 'darwin' ? 'Chromium.app/Contents/MacOS/Chromium' : 'chrome';
  return path.join(cacheDir, latestChromium, platform, executable);
};

(async () => {
  console.log('Starting google rating scrape');
  let browser;
  try {
    const executablePath = getChromiumPath();
    browser = await chromium.launch({
      headless: true,
      executablePath,
    });

    const context = await browser.newContext({
      userAgent:
        'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
      viewport: { width: 1280, height: 720 },
    });

    const page = await context.newPage();

    // Remove webdriver property to avoid detection
    await page.addInitScript(() => {
      Object.defineProperty(navigator, 'webdriver', {
        get: () => false,
      });
    });

    await page.goto(URL, { waitUntil: 'networkidle', timeout: 30000 });

    // Wait for the rating element to be present
    await page.waitForSelector('.fontDisplayLarge', { timeout: 30000 });

    const data = await page.evaluate(() => {
      const [ratingElement] = document.getElementsByClassName('fontDisplayLarge');
      if (!ratingElement) {
        throw new Error('Rating element not found');
      }

      // The structure is now: rating (index 0), empty div (index 1), reviews (index 2)
      const siblings = Array.from(ratingElement.parentElement?.children || []);
      const reviewsElement = siblings.find((el) => el.textContent?.trim().match(/^\d+\s+reviews?$/));

      if (!reviewsElement) {
        throw new Error('Number of reviews element not found');
      }

      return { overallRatingValue: ratingElement.textContent, numberOfReviews: reviewsElement.textContent };
    });

    const result = JSON.stringify(data, null, 2);
    fs.writeFileSync('data/rating.json', result);
    console.log('Finished google rating scrape', result);
  } catch (err) {
    console.error(err);
    process.exit(1);
  } finally {
    await browser?.close();
    process.exit(0);
  }
})();
