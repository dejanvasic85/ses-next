import puppeteer from 'puppeteer';

(async () => {
  let browser;
  try {
    browser = await puppeteer.launch({ headless: false, timeout: 0 });
    const [page] = await browser.pages();
    page.goto(
      'https://www.google.com/maps/place/Storm+Electrical+Solutions/@-37.8354296,144.862506,17z/data=!4m8!3m7!1s0x6ad667c1a4bda469:0xd077705b9fe576ea!8m2!3d-37.8354339!4d144.8650809!9m1!1b1!16s%2Fg%2F11f5ttzvmw?entry=ttu',
    );

    await page.waitForNavigation();
    await page.$$eval('button[aria-label="See more"]', (buttons) => {
      buttons.forEach((btn) => btn.click());
    });

    const data = await page.evaluate(() => {
      // parse overall stars and number of reviews
      const [ratingElement] = document.getElementsByClassName('fontDisplayLarge');
      const numberOfReviewsElement = ratingElement.nextSibling.nextSibling;

      const reviews = [];
      // parse reviews
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
          reviewer: {
            profileUrl,
            profilePhotoUrl: profileImg.src,
            displayName: name,
          },
          comment,
          starRating: starsEl.getAttribute('aria-label'),
          date: dateEl.textContent,
        };

        reviews.push(review);
      });

      return {
        overallRatingValue: ratingElement.textContent,
        numberOfReviews: numberOfReviewsElement.textContent,
        reviews,
      };
    });

    console.log(JSON.stringify(data, null, 2));
  } catch (err) {
    console.error(err);
    process.exit(1);
  } finally {
    browser?.close();
    process.exit(0);
  }
})();
