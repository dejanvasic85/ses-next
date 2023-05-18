import { getHomePageContent } from '../lib/content/contentService';

const createLocXmlForUrl = (url) => `
    <url>
      <loc>${`${url}`}</loc>
    </url>
`;

const generateSitemap = (content) => {
  const {
    baseUrl,
    services: { items = [] },
  } = content;

  const knownPages = ['', 'faq'].map((page) => createLocXmlForUrl(`${baseUrl}${page}`)).join(' ');
  const servicePages = items.map(({ slug }) => createLocXmlForUrl(`${baseUrl}services/${slug}`)).join(' ');

  return `<?xml version="1.0" encoding="UTF-8"?>
   <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
    ${knownPages}
    ${servicePages}
   </urlset>
 `;
};

const Sitemap = () => {};

export const getServerSideProps = async ({ res }) => {
  console.log('Page: sitemap getStaticProps');
  const content = await getHomePageContent();

  const sitemap = generateSitemap(content);

  res.setHeader('Content-Type', 'text/xml');
  // we send the XML to the browser
  res.write(sitemap);
  res.end();

  return {
    props: {},
  };
};

export default Sitemap;
