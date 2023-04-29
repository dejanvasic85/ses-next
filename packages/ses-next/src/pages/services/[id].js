import Head from 'next/head';

import { Navbar, Footer } from '../../components';
import { getHomePageContent } from '../../lib/content/contentService';
import { slugify } from '../../lib/slugify';

export default function Service({
  baseUrl,
  companyName,
  companyLogo,
  contact,
  meta,
  social,
  shortTitle,
  navLinks,
  service,
}) {
  const { name } = service;
  return (
    <>
      <Head>
        <title>{meta.title}</title>
        <link rel="canonical" href={baseUrl} />
        <meta name="description" content={meta.description} />
        <meta property="og:image" content={companyLogo} />
        <meta name="twitter:description" content={meta.description} />
        <meta property="og:title" content="Storm Electrical Solutions Melbourne" />
        <meta property="og:description" content={meta.description} />
        <meta property="og:url" content={baseUrl} />
        <meta property="og:site_name" content={companyName} />
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:title" content={companyName} />
        <meta name="twitter:image" content={companyLogo} />
      </Head>
      <Navbar contactPhone={contact.phone} title={shortTitle} links={navLinks} />
      <div class="bg-white py-6 sm:py-8 lg:py-12">
        <div class="mx-auto max-w-screen-md px-4 md:px-8">
          <h1 class="mb-4 text-center text-2xl font-bold text-gray-800 sm:text-3xl md:mb-6">{name}</h1>

          <p class="mb-6 text-gray-500 sm:text-lg md:mb-8">
            This is a section of some simple filler text, also known as placeholder text. It shares some characteristics
            of a real written text but is random or otherwise generated. It may be used to display a sample of fonts or
            generate text for testing. Filler text is dummy text which has no meaning however looks very similar to real
            text. The important factor when using filler text is that the text looks realistic otherwise it will not
            look very good.
            <br />
            <br />
            This is a section of some simple filler text, also known as placeholder text. It shares some characteristics
            of a real written text but is{' '}
            <a
              href="#"
              class="text-indigo-500 underline transition duration-100 hover:text-indigo-600 active:text-indigo-700"
            >
              random
            </a>{' '}
            or otherwise generated. It may be used to display a sample of fonts or generate text for testing. Filler
            text is dummy text which has no meaning however looks very similar to real text.
          </p>

          <h2 class="mb-2 text-xl font-semibold text-gray-800 sm:text-2xl md:mb-4">About us</h2>

          <p class="mb-6 text-gray-500 sm:text-lg md:mb-8">
            This is a section of some simple filler text, also known as placeholder text. It shares some characteristics
            of a real written text but is random or otherwise generated. It may be used to display a sample of fonts or
            generate text for testing. Filler text is dummy text which has no meaning however looks very similar to real
            text.
          </p>

          <ul class="mb-6 list-inside list-disc text-gray-500 sm:text-lg md:mb-8">
            <li>This is a section of some simple filler text</li>
            <li>Also known as placeholder text</li>
            <li>It shares some characteristics of a real written text</li>
          </ul>

          <blockquote class="mb-6 border-l-4 pl-4 italic text-gray-500 sm:text-lg md:mb-8 md:pl-6">
            “This is a section of some simple filler text, also known as placeholder text. It shares some
            characteristics of a real written text but is random or otherwise generated.”
          </blockquote>

          <div class="relative mb-6 overflow-hidden rounded-lg bg-gray-100 shadow-lg md:mb-8">
            <img
              src="https://images.unsplash.com/photo-1593508512255-86ab42a8e620?auto=format&q=75&fit=crop&w=600&h=350"
              loading="lazy"
              alt="Photo by Minh Pham"
              class="h-full w-full object-cover object-center"
            />
          </div>

          <h2 class="mb-2 text-xl font-semibold text-gray-800 sm:text-2xl md:mb-4">Features</h2>

          <p class="text-gray-500 sm:text-lg">
            This is a section of some simple filler text, also known as placeholder text. It shares some characteristics
            of a real written text but is random or otherwise generated. It may be used to display a sample of fonts or
            generate text for testing. Filler text is dummy text which has no meaning however looks very similar to real
            text.
          </p>
        </div>
      </div>
      <Footer social={social} />
    </>
  );
}

export const getStaticProps = async ({ params }) => {
  console.log('Page: Services getStaticProps, params: ', params);
  const content = await getHomePageContent();
  const service = content.services.items.find(({ name }) => slugify(name) === params.id);

  return {
    props: {
      ...content,
      navLinks: { home: '/', services: '/#services', about: '/#about', contact: '/#contact' },
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
