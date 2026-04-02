import type { MetadataRoute } from 'next';
import { getBlogPosts, getServices, getSiteSettings } from '@/lib/content/contentService';

const changeFrequencyValue = {
  home: 'weekly',
  faq: 'monthly',
  blog: 'weekly',
  servicesHub: 'weekly',
  service: 'monthly',
  blogPost: 'yearly',
} as const;

const staticPageConfig = [
  { path: '', changeFrequency: changeFrequencyValue.home },
  { path: 'faq', changeFrequency: changeFrequencyValue.faq },
  { path: 'blog', changeFrequency: changeFrequencyValue.blog },
];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [services, siteSettings, blogPosts] = await Promise.all([getServices(), getSiteSettings(), getBlogPosts()]);

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

  const servicePages: MetadataRoute.Sitemap = services.map(({ slug, parentService }) => {
    const path = parentService ? `services/${parentService.slug}/${slug}` : `services/${slug}`;
    return {
      url: new URL(path, baseUrl).toString(),
      changeFrequency: changeFrequencyValue.service,
    };
  });

  const blogPostPages: MetadataRoute.Sitemap = blogPosts.map(({ slug }) => ({
    url: new URL(`blog/${slug}`, baseUrl).toString(),
    changeFrequency: changeFrequencyValue.blogPost,
  }));

  return [...staticPages, ...servicesHub, ...servicePages, ...blogPostPages];
}
