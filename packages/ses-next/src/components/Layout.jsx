import { PageHead } from './PageHead';
import { Navbar } from './Navbar';
import { Footer } from './Footer';

export function Layout({ children, content, googleReviews, pageUrl, title }) {
  const { companyName, companyLogo, contact, meta, services, shortTitle, social } = content;
  return (
    <>
      <PageHead
        canonicalUrl={pageUrl}
        companyLogo={companyLogo}
        companyName={companyName}
        description={meta.description}
        googleReviews={googleReviews}
        phone={contact.phone}
        socialTitle={companyName}
        title={title || meta.title}
      />
      <Navbar contactPhone={contact.phone} title={shortTitle} />
      {children}
      <Footer social={social} services={services} />
    </>
  );
}
