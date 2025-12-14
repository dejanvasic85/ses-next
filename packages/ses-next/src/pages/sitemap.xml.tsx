import { GetServerSideProps } from 'next';
import { getBlogPosts, getSiteSettings, getServices } from '@/lib/content/contentService';
import type { BlogPost, ServiceItem, SiteSettings } from '@/types';

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
  const servicePages = services.map(({ slug }) => createLocXmlForUrl(`${baseUrl}services/${slug}`)).join(' ');
  const blogPostUrls = blogPosts.map(({ slug }) => createLocXmlForUrl(`${baseUrl}blog/${slug}`)).join(' ');
  const blogPostTagUrls = blogPosts
    .flatMap(({ tags }) => tags)
    .map((tag) => createLocXmlForUrl(`${baseUrl}blog/tag/${tag}`))
    .join(' ');

  return `<?xml version="1.0" encoding="UTF-8"?>
   <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
    ${knownPages}
    ${servicePages}
    ${blogPostUrls}
    ${blogPostTagUrls}
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
