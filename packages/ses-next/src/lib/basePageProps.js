import { googleReviews } from 'ses-reviews';

import { getHomePageContent } from './content/contentService';

export async function getBasePageProps({ pageUrl }) {
  const content = await getHomePageContent();
  const reviews = googleReviews.reviews.slice(0, 6);

  return {
    content,
    googleReviews: {
      ...googleReviews,
      reviews,
    },
    pageUrl: `${content.baseUrl}${pageUrl}`,
  };
}
