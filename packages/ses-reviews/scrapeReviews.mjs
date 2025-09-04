import puppeteer from 'puppeteer';
import fs from 'fs';

import { URL } from './constants.mjs';

(async () => {
  console.log('Starting google reviews scrape');
  let browser;
  try {
    browser = await puppeteer.launch({
      headless: true,
      timeout: 0,
      args: ['--no-sandbox', '--disable-setuid-sandbox'],
    });
    const [page] = await browser.pages();
    await page.goto(URL, { waitUntil: 'networkidle2' });

    // Wait for reviews container to load
    await page.waitForSelector('div[data-review-id]', { timeout: 10000 });

    // Auto-scroll to load all reviews with multiple strategies
    let previousReviewCount = 0;
    let currentReviewCount = 0;
    let stableCount = 0;

    do {
      previousReviewCount = currentReviewCount;

      // Try multiple scrolling strategies
      await page.evaluate(() => {
        // Strategy 1: Scroll the main container
        const mainContainer = document.querySelector('div[role="main"]');
        if (mainContainer) {
          mainContainer.scrollTo(0, mainContainer.scrollHeight);
        }

        // Strategy 2: Scroll the reviews feed container
        const reviewsFeed = document.querySelector('div[data-value="Sort"]')?.parentElement?.parentElement;
        if (reviewsFeed) {
          reviewsFeed.scrollTo(0, reviewsFeed.scrollHeight);
        }

        // Strategy 3: Scroll the window itself
        window.scrollTo(0, document.body.scrollHeight);

        // Strategy 4: Find and scroll any scrollable div containing reviews
        const scrollableContainers = Array.from(document.querySelectorAll('div')).filter((div) => {
          return div.scrollHeight > div.clientHeight && div.querySelector('div[data-review-id]');
        });

        scrollableContainers.forEach((container) => {
          container.scrollTo(0, container.scrollHeight);
        });
      });

      // Wait for potential new reviews to load
      await new Promise((resolve) => setTimeout(resolve, 3000));

      currentReviewCount = await page.$$eval('div[data-review-id][aria-label]', (reviews) => reviews.length);
      console.log(`Found ${currentReviewCount} reviews`);

      // If count hasn't changed, increment stable counter
      if (currentReviewCount === previousReviewCount) {
        stableCount++;
      } else {
        stableCount = 0;
      }

      // Stop if we've had the same count for 2 consecutive attempts
    } while (currentReviewCount > previousReviewCount || stableCount < 2);

    // Expand all "See more" buttons
    await page.$$eval('button[aria-label="See more"]', (buttons) => {
      buttons.forEach((btn) => btn.click());
    });

    // Wait for expanded content to load
    await new Promise((resolve) => setTimeout(resolve, 1000));

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
        const [starsEl, dateEl] = starsAndDateEl.children;
        const commentEl = commentsEl.querySelector('span');
        const comment = commentEl ? commentEl.textContent : '';

        const review = {
          id,
          url: REVIEW_URL_TEMPLATE.replace('{{reviewId}}', id),
          reviewer: { profileUrl, profilePhotoUrl: profileImg.src, displayName: name },
          comment,
          starRating: Number(starsEl.getAttribute('aria-label').at(0)),
          date: dateEl.textContent,
        };

        reviews.push(review);
      });

      return { reviews };
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
