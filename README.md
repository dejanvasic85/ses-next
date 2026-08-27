# Storm electrical services landing page

This is a personal project built for a friend's website.

It started as an experiment with [Sanity](https://www.sanity.io/) and [Next.js](https://nextjs.org/), deployed on Vercel.

## How does it work?

Next.js statically generates the pages from content stored in Sanity. During the build, it queries the content API and builds each page.

The content schema is defined first in code, in the `ses-content` package (the Sanity project). Once the schema is ready, launch Sanity Studio to edit and publish content.

## Getting started

Ensure you have volta installed and run

```sh
npm install
```

### Running locally

This project uses npm workspaces, so each package has its own scripts for building and running.

Starting the sanity studio editor:

```sh
npm run dev -w ses-content
```

Running the nextjs app:

```sh
npm run dev -w ses-next
```

## Deploying

**Website:**
The site deploys to Vercel using trunk-based development: every push to `main` goes straight to production.

**Sanity studio:**
Deploy Sanity Studio manually with the Sanity CLI.

Make the schema changes in the content project, then deploy straight to production with:

```sh
npm run deploy:content
```

There's no separate development database, so keep the content schema backward compatible.

## Google reviews

Google reviews aren't managed in Sanity — fetch them with Puppeteer instead.

To update reviews, run:

```sh
npm run update:reviews
```

This updates `data.json` in the `ses-reviews` package, which the Next.js app reads at build time to populate the Google reviews content.
