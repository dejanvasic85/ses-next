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
