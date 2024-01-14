# Storm electrical services landing page

This is a play around home project for a friend's website.

It was used to experiment with [Sanity IO](https://www.sanity.io/) and [Nextjs](https://nextjs.org/) deployed to vercel.

## How does it work?

Nextjs uses static site generation to build the pages from the content in Sanity. During the build, it would query the content API and generate the pages.

The schema for the content is configured first in source code within ses-content (sanity project). Once ready, the sanity studio can be launched the edit as well as publish the content.

## Getting started

Ensure you have volta installed and run

```sh
npm install
```

### Running locally

This project makes use of the npm workspaces so each sub repo has scripts for building and running.

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
The project is deployed to vercel. It uses trunk based development where every main branch is pushed to production.

**Sanity studio:**
The sanity studio is deployed manually using the sanity cli.

Make the required schema changes in the content project and then deploy it straight to production using the following command.

```sh
npm run deploy -w ses-content
```

We don't use any other development database at the moment so just make sure that the content schema is backward compatible.

## Google reviews

The google reviews are not managed by content and instead they need to be fetched using puppeteer.

To update reviews run the following command:

```sh
npm run update:reviews
```

This should update the data.json file in the ses-reviews package which is then used by the nextjs App during build time to update the google reviews content.
