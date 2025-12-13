import { GetServerSideProps } from 'next';
import { getHomePageContent, getBlogPosts } from '@/lib/content/contentService';
import type { HomePageContentResult } from '@/lib/content/contentService';
import type { ProcessedBlogPost } from '@/types';

const createLocXmlForUrl = (url: string): string => `
    <url>
      <loc>${`${url}`}</loc>
    </url>
`;

const generateSitemap = (content: HomePageContentResult, blogPosts: ProcessedBlogPost[]): string => {
  const {
    baseUrl,
    services: { items = [] },
  } = content;

  const knownPages = ['', 'faq', 'blog'].map((page) => createLocXmlForUrl(`${baseUrl}${page}`)).join(' ');
  const servicePages = items.map(({ slug }) => createLocXmlForUrl(`${baseUrl}services/${slug}`)).join(' ');
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
  console.log('Page: sitemap getStaticProps');
  const content = await getHomePageContent();
  const blogPosts = await getBlogPosts();

  const sitemap = generateSitemap(content, blogPosts);

  res.setHeader('Content-Type', 'text/xml');
  // we send the XML to the browser
  res.write(sitemap);
  res.end();

  return {
    props: {},
  };
};

export default Sitemap;
