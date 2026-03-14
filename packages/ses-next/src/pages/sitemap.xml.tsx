import { GetServerSideProps } from 'next';
import { getBlogPosts, getSiteSettings, getServices } from '@/lib/content/contentService';
import type { BlogPost, ServiceItem, SiteSettings } from '@/types';

const servicesHubPath = 'services/';
const servicesHubPriority = 0.9;
const servicesHubChangefreq = 'weekly';

const createLocXmlForUrl = (url: string): string => `
    <url>
      <loc>${`${url}`}</loc>
    </url>
`;

type SitemapGenerateProps = {
  blogPosts: BlogPost[];
  services: ServiceItem[];
  siteSettings: SiteSettings;
};

const generateSitemap = ({ blogPosts, services, siteSettings }: SitemapGenerateProps): string => {
  const { baseUrl } = siteSettings;
  const knownPages = ['', 'faq', 'blog'].map((page) => createLocXmlForUrl(`${baseUrl}${page}`)).join(' ');
  const servicesHub = `
    <url>
      <loc>${baseUrl}${servicesHubPath}</loc>
      <priority>${servicesHubPriority}</priority>
      <changefreq>${servicesHubChangefreq}</changefreq>
    </url>
  `;
  const servicePages = services
    .map(({ slug, parentService }) => {
      const path = parentService ? `services/${parentService.slug}/${slug}` : `services/${slug}`;
      return createLocXmlForUrl(`${baseUrl}${path}`);
    })
    .join(' ');
  const blogPostUrls = blogPosts.map(({ slug }) => createLocXmlForUrl(`${baseUrl}blog/${slug}`)).join(' ');

  return `<?xml version="1.0" encoding="UTF-8"?>
   <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
    ${knownPages}
    ${servicesHub}
    ${servicePages}
    ${blogPostUrls}
   </urlset>
 `;
};

const Sitemap = () => {};

export const getServerSideProps: GetServerSideProps = async ({ res }) => {
  console.log('Page: sitemap getServerSideProps');
  const services = await getServices();
  const siteSettings = await getSiteSettings();
  const blogPosts = await getBlogPosts();

  const sitemap = generateSitemap({
    blogPosts,
    services,
    siteSettings,
  });

  res.setHeader('Content-Type', 'text/xml');
  // we send the XML to the browser
  res.write(sitemap);
  res.end();

  return {
    props: {},
  };
};

export default Sitemap;
