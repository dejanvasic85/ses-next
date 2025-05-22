import { getHomePageContent } from './content/contentService';

interface GetBasePagePropsParams {
  pageUrl: string;
}

export async function getBasePageProps({ pageUrl }: GetBasePagePropsParams) {
  const content = await getHomePageContent();

  return {
    content,
    pageUrl: `${content.baseUrl}${pageUrl}`,
  };
}
