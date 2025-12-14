import { config } from '@/lib/config';
import { BasePageProps } from '@/types';
import { getSiteSettings, getServices } from '@/lib/content/contentService';

interface GetBasePagePropsParams {
  pageUrl: string;
}

export async function getBasePageProps({ pageUrl }: GetBasePagePropsParams): Promise<BasePageProps> {
  const [siteSettings, services] = await Promise.all([getSiteSettings(), getServices()]);
  const canonicalUrl = new URL(pageUrl, siteSettings.baseUrl);

  return {
    siteSettings,
    services,
    pageUrl: canonicalUrl.toString(),
    publicConfig: {
      sanityProjectId: config.sanityProjectId,
      sanityDataset: config.sanityDataset,
    },
  };
}
