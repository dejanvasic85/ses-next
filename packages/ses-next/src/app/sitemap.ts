import type { MetadataRoute } from 'next';
import { getBlogPosts, getServices, getSiteSettings } from '@/lib/content/contentService';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [services, siteSettings, blogPosts] = await Promise.all([getServices(), getSiteSettings(), getBlogPosts()]);

  const { baseUrl } = siteSettings;

  const staticPages: MetadataRoute.Sitemap = ['', 'faq', 'blog'].map((page) => ({
    url: `${baseUrl}${page}`,
  }));

  const servicesHub: MetadataRoute.Sitemap = [
    {
      url: `${baseUrl}services/`,
      changeFrequency: 'weekly',
      priority: 0.9,
    },
  ];

  const servicePages: MetadataRoute.Sitemap = services.map(({ slug, parentService }) => {
    const path = parentService ? `services/${parentService.slug}/${slug}` : `services/${slug}`;
    return { url: `${baseUrl}${path}` };
  });

  const blogPostPages: MetadataRoute.Sitemap = blogPosts.map(({ slug }) => ({
    url: `${baseUrl}blog/${slug}`,
  }));

  return [...staticPages, ...servicesHub, ...servicePages, ...blogPostPages];
}
