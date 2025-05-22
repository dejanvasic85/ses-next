import { getHomePageContent } from './content/contentService';
import { config } from '@/src/lib/config';
import { BasePageProps } from '@/src/types';

interface GetBasePagePropsParams {
  pageUrl: string;
}

export async function getBasePageProps({ pageUrl }: GetBasePagePropsParams): Promise<BasePageProps> {
  const content = await getHomePageContent();

  return {
    content,
    pageUrl: `${content.baseUrl}${pageUrl}`,
    publicConfig: {
      sanityProjectId: config.sanityProjectId,
      sanityDataset: config.sanityDataset,
    },
  };
}
