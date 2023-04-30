import Head from 'next/head';

import { Navbar, Footer, PageHead } from '../../components';
import { getHomePageContent } from '../../lib/content/contentService';
import { slugify } from '../../lib/slugify';

export default function Service({
  canonicalUrl,
  companyName,
  companyLogo,
  contact,
  meta,
  navLinks,
  social,
  shortTitle,
  service,
}) {
  const { name } = service;
  return (
    <>
      <PageHead
        canonicalUrl={canonicalUrl}
        companyLogo={companyLogo}
        companyName={companyName}
        description={meta.description}
        socialTitle={companyName}
        title={`${service.name} - ${meta.title}`}
      />
      <Navbar contactPhone={contact.phone} title={shortTitle} links={navLinks} />
      <div class="bg-white py-6 sm:py-8 lg:py-12">
        <div class="mx-auto max-w-screen-md px-4 md:px-8">
          <article className="prose lg:prose-lg">
            <h1 class="text-center">{name}</h1>
            <p>
              This is a section of some simple filler text, also known as placeholder text. It shares some
              characteristics of a real written text but is random or otherwise generated. It may be used to display a
              sample of fonts or generate text for testing. Filler text is dummy text which has no meaning however looks
              very similar to real text. The important factor when using filler text is that the text looks realistic
              otherwise it will not look very good.
              <br />
              <br />
              This is a section of some simple filler text, also known as placeholder text. It shares some
              characteristics of a real written text but is{' '}
              <a href="#" class="">
                random
              </a>{' '}
              or otherwise generated. It may be used to display a sample of fonts or generate text for testing. Filler
              text is dummy text which has no meaning however looks very similar to real text.
            </p>

            <h2>About us</h2>

            <p>
              This is a section of some simple filler text, also known as placeholder text. It shares some
              characteristics of a real written text but is random or otherwise generated. It may be used to display a
              sample of fonts or generate text for testing. Filler text is dummy text which has no meaning however looks
              very similar to real text.
            </p>

            <ul>
              <li>This is a section of some simple filler text</li>
              <li>Also known as placeholder text</li>
              <li>It shares some characteristics of a real written text</li>
            </ul>

            <blockquote>
              “This is a section of some simple filler text, also known as placeholder text. It shares some
              characteristics of a real written text but is random or otherwise generated.”
            </blockquote>

            <h2>Features</h2>

            <p>
              This is a section of some simple filler text, also known as placeholder text. It shares some
              characteristics of a real written text but is random or otherwise generated. It may be used to display a
              sample of fonts or generate text for testing. Filler text is dummy text which has no meaning however looks
              very similar to real text.
            </p>
          </article>
        </div>
      </div>
      <Footer social={social} />
    </>
  );
}

export const getStaticProps = async ({ params }) => {
  console.log('Page: Services getStaticProps, params: ', params);
  const content = await getHomePageContent();
  const { baseUrl, companyName, companyLogo, contact, meta, social, shortTitle } = content;
  const service = content.services.items.find(({ name }) => slugify(name) === params.id);
  const canonicalUrl = `${baseUrl}services/${params.id}`;

  return {
    props: {
      canonicalUrl,
      companyName,
      companyLogo,
      contact,
      meta,
      navLinks: { home: '/', services: '/#services', about: '/#about', contact: '/#contact' },
      social,
      shortTitle,
      service,
    },
  };
};

export const getStaticPaths = async () => {
  const content = await getHomePageContent();
  const paths = content.services.items.map(({ name }) => ({
    params: { id: slugify(name) },
  }));

  return {
    paths,
    fallback: false,
  };
};
