import { getSiteSettings, getHomepage, mapSiteSettings, mapHomepageServices } from '@/lib/sanity/queries';
import { config } from '@/lib/config';
import { BasePageProps } from '@/types';

interface GetBasePagePropsParams {
  pageUrl: string;
}

export async function getBasePageProps({ pageUrl }: GetBasePagePropsParams): Promise<BasePageProps> {
  const [siteSettingsModel, homepageModel] = await Promise.all([getSiteSettings(), getHomepage()]);

  const siteSettings = mapSiteSettings(siteSettingsModel);
  const services = mapHomepageServices(homepageModel);

  const content = {
    ...siteSettings,
    contact: {
      phone: homepageModel.contact.phone,
      blurbs: homepageModel.contact.blurbs,
      callBack: homepageModel.contact.callBack,
    },
    services,
  };

  return {
    content,
    pageUrl: `${content.baseUrl}${pageUrl}`,
    publicConfig: {
      sanityProjectId: config.sanityProjectId,
      sanityDataset: config.sanityDataset,
    },
  };
}
