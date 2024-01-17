import puppeteer from 'puppeteer';
import fs from 'fs';

import { URL } from './constants.mjs';

(async () => {
  console.log('Starting google reviews scrape');
  let browser;
  try {
    browser = await puppeteer.launch({ headless: false, timeout: 0 });
    const [page] = await browser.pages();
    page.goto(URL);

    await page.waitForNavigation();
    // pause for 5 seconds
    await new Promise((resolve) => setTimeout(resolve, 5000));
    await page.$$eval('button[aria-label="See more"]', (buttons) => {
      buttons.forEach((btn) => btn.click());
    });

    const data = await page.evaluate(() => {
      const reviews = [];
      const REVIEW_URL_TEMPLATE =
        'https://www.google.com/maps/reviews/@-37.8354339,144.8650809,17z/data=!3m1!4b1!4m6!14m5!1m4!2m3!1s{{reviewId}}!2m1!1s0x0:0xd077705b9fe576ea?hl=en&entry=ttu';

      document.querySelectorAll('div[data-review-id][aria-label]').forEach((parentEl) => {
        parentEl.querySelector('button[aria-label="See more"]');

        const id = parentEl.getAttribute('data-review-id');
        const name = parentEl.getAttribute('aria-label');
        const [firstChild] = parentEl.children;
        const [secondChild] = firstChild.children;
        const photoButton = secondChild.querySelector('button[data-href]');
        const profileUrl = photoButton.getAttribute('data-href');
        const profileImg = photoButton.querySelector('img');
        const [, , , reviewDetailsEl] = secondChild.children;
        const [starsAndDateEl, commentsEl] = reviewDetailsEl.children;
        const [starsEl, dateEl] = starsAndDateEl.querySelectorAll('span');
        const comment = commentsEl.querySelector('span').textContent;

        const review = {
          id,
          url: REVIEW_URL_TEMPLATE.replace('{{reviewId}}', id),
          reviewer: {
            profileUrl,
            profilePhotoUrl: profileImg.src,
            displayName: name,
          },
          comment,
          starRating: Number(starsEl.getAttribute('aria-label').at(0)),
          date: dateEl.textContent,
        };

        reviews.push(review);
      });

      return {
        reviews,
      };
    });

    const result = JSON.stringify(data, null, 2);
    fs.writeFileSync('data/reviews.json', result);
    console.log('Finished google reviews scrape', result);
  } catch (err) {
    console.error(err);
    process.exit(1);
  } finally {
    browser?.close();
    process.exit(0);
  }
})();
