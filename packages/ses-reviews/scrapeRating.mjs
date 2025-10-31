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
      args: ['--no-sandbox', '--disable-setuid-sandbox'],
    });
    const [page] = await browser.pages();
    await page.goto(URL, { waitUntil: 'networkidle2' });

    // Wait for the rating element to be present
    await page.waitForSelector('.fontDisplayLarge', { timeout: 10000 });

    const data = await page.evaluate(() => {
      const [ratingElement] = document.getElementsByClassName('fontDisplayLarge');
      if (!ratingElement) {
        throw new Error('Rating element not found');
      }

      const numberOfReviewsElement = ratingElement.nextElementSibling?.nextElementSibling;
      if (!numberOfReviewsElement) {
        throw new Error('Number of reviews element not found');
      }

      return { overallRatingValue: ratingElement.textContent, numberOfReviews: numberOfReviewsElement.textContent };
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
