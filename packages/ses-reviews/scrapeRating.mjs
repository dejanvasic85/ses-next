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
    page.goto(URL);

    await page.waitForNavigation();

    const data = await page.evaluate(() => {
      const [ratingElement] = document.getElementsByClassName('fontDisplayLarge');
      const numberOfReviewsElement = ratingElement.nextSibling.nextSibling;

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
