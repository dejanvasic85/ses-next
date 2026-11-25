import type { MetadataRoute } from 'next';
import { careersPath } from '@/lib/careers';
import {
  getAllLocationPages,
  getBlogPosts,
  getCareers,
  getServices,
  getSiteSettings,
} from '@/lib/content/contentService';

const changeFrequencyValue = {
  home: 'weekly',
  faq: 'monthly',
  blog: 'weekly',
  servicesHub: 'weekly',
  service: 'monthly',
  blogPost: 'yearly',
  locationsHub: 'weekly',
  locationPage: 'monthly',
  careers: 'weekly',
} as const;

const staticPageConfig = [
  { path: '', changeFrequency: changeFrequencyValue.home },
  { path: 'faq', changeFrequency: changeFrequencyValue.faq },
  { path: 'blog', changeFrequency: changeFrequencyValue.blog },
];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [services, siteSettings, blogPosts, locationPages, careers] = await Promise.all([
    getServices(),
    getSiteSettings(),
    getBlogPosts(),
    getAllLocationPages(),
    getCareers(),
  ]);

  const { baseUrl } = siteSettings;

  const staticPages: MetadataRoute.Sitemap = staticPageConfig.map(({ path, changeFrequency }) => ({
    url: new URL(path, baseUrl).toString(),
    changeFrequency,
  }));

  const servicesHub: MetadataRoute.Sitemap = [
    {
      url: new URL('services/', baseUrl).toString(),
      changeFrequency: changeFrequencyValue.servicesHub,
      priority: 0.9,
    },
  ];

  const servicePages: MetadataRoute.Sitemap = services.map(({ slug, parentService, updatedAt }) => {
    const path = parentService ? `services/${parentService.slug}/${slug}` : `services/${slug}`;
    return {
      url: new URL(path, baseUrl).toString(),
      lastModified: updatedAt ?? undefined,
      changeFrequency: changeFrequencyValue.service,
    };
  });

  const blogPostPages: MetadataRoute.Sitemap = blogPosts.map(({ slug, publishedAt, updatedAt }) => ({
    url: new URL(`blog/${slug}`, baseUrl).toString(),
    lastModified: updatedAt ?? publishedAt,
    changeFrequency: changeFrequencyValue.blogPost,
  }));

  const locationsHub: MetadataRoute.Sitemap = [
    {
      url: new URL('locations/', baseUrl).toString(),
      changeFrequency: changeFrequencyValue.locationsHub,
      priority: 0.8,
    },
  ];

  const locationPageEntries: MetadataRoute.Sitemap = locationPages.map(({ slug, updatedAt }) => ({
    url: new URL(`locations/${slug}`, baseUrl).toString(),
    lastModified: updatedAt ?? undefined,
    changeFrequency: changeFrequencyValue.locationPage,
  }));

  const careersPage: MetadataRoute.Sitemap = careers
    ? [
        {
          url: new URL(careersPath.slice(1), baseUrl).toString(),
          lastModified: careers.updatedAt ?? undefined,
          changeFrequency: changeFrequencyValue.careers,
        },
      ]
    : [];

  return [
    ...staticPages,
    ...servicesHub,
    ...servicePages,
    ...blogPostPages,
    ...locationsHub,
    ...locationPageEntries,
    ...careersPage,
  ];
}
