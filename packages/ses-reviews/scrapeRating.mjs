import puppeteer from 'puppeteer';
import fs from 'fs';

import { URL } from './constants.mjs';

(async () => {
  console.log('Starting google rating scrape');
  let browser;
  try {
    browser = await puppeteer.launch({
      headless: 'new',
      timeout: 0,
      args: [
        '--no-sandbox',
        '--disable-setuid-sandbox',
        '--disable-blink-features=AutomationControlled',
        '--disable-dev-shm-usage',
      ],
    });
    const [page] = await browser.pages();

    // Set user agent to avoid detection
    await page.setUserAgent(
      'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
    );

    // Remove webdriver property
    await page.evaluateOnNewDocument(() => {
      Object.defineProperty(navigator, 'webdriver', {
        get: () => false,
      });
    });

    await page.goto(URL, { waitUntil: 'networkidle2', timeout: 30000 });

    // Wait for the rating element to be present with increased timeout
    await page.waitForSelector('.fontDisplayLarge', { timeout: 30000 });

    const data = await page.evaluate(() => {
      const [ratingElement] = document.getElementsByClassName('fontDisplayLarge');
      if (!ratingElement) {
        throw new Error('Rating element not found');
      }

      // The structure is now: rating (index 0), empty div (index 1), reviews (index 2)
      const siblings = Array.from(ratingElement.parentElement?.children || []);
      const reviewsElement = siblings.find((el) =>
        el.textContent?.trim().match(/^\d+\s+reviews?$/),
      );

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
    browser?.close();
    process.exit(0);
  }
})();
