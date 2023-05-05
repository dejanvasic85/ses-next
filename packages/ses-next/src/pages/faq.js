import { getHomePageContent } from '../lib/content/contentService';
import { Footer, Navbar, PageHead } from '../components';

export default function Faq({ contact, companyLogo, companyName, faqItems, meta, navLinks, shortTitle, social }) {
  return (
    <>
      <PageHead
        canonicalUrl={'/faq'}
        companyLogo={companyLogo}
        companyName={companyName}
        description={meta.description}
        socialTitle={companyName}
        title={`Frequently asked questions - ${companyName}`}
      />
      <Navbar contactPhone={contact.phone} title={shortTitle} links={navLinks} />
      <div className="bg-white py-6 sm:py-8 lg:py-12">
        <div className="container mx-auto max-w-screen-xl px-4 md:px-8">
          <div className="mb-10 md:mb-16">
            <h1 className="mb-4 text-center text-2xl font-bold text-gray-800 md:mb-6 lg:text-3xl">
              Frequently asked questions
            </h1>
            <p className="mx-auto text-center text-gray-500 md:text-lg">
              Check out our frequently asked questions to learn more about our services.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 md:gap-8">
            {faqItems.map(({ question, answer }, idx) => (
              <div className="rounded-lg bg-gray-100 p-5" key={idx}>
                <div className="mb-4 flex items-center justify-between gap-4 border-b pb-4">
                  <h3 className="font-semibold text-indigo-500 sm:text-lg md:text-xl">{question}</h3>
                </div>
                <p className="text-gray-500">{answer}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
      <Footer social={social} />
    </>
  );
}

export const getStaticProps = async () => {
  const content = await getHomePageContent();
  const { contact, companyLogo, companyName, faqItems, meta, social, shortTitle } = content;

  return {
    props: {
      contact,
      companyLogo,
      companyName,
      faqItems,
      navLinks: { home: '/', services: '/#services', about: '/#about', contact: '/#contact' },
      meta,
      social,
      shortTitle,
    },
  };
};
