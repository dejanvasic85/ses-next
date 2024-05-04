import { getHomePageContent } from './content/contentService';

export async function getBasePageProps({ pageUrl }) {
  const content = await getHomePageContent();

  return {
    content,
    pageUrl: `${content.baseUrl}${pageUrl}`,
  };
}
