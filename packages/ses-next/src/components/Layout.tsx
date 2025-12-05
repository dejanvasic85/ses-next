import React, { ReactNode } from 'react';
import { PageHead } from '@/components/PageHead';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { LayoutContent } from '@/types';

interface LayoutProps {
  children: ReactNode;
  content: LayoutContent;
  pageUrl: string;
  title?: string;
}

export function Layout({ children, content, pageUrl, title }: LayoutProps) {
  const { companyName, companyLogo, contact, meta, services, shortTitle, social } = content;
  return (
    <>
      <PageHead
        canonicalUrl={pageUrl}
        companyLogo={companyLogo}
        companyName={companyName}
        description={meta.description}
        phone={contact.phone}
        socialTitle={companyName}
        title={title || meta.title}
      />
      <Navbar contactPhone={contact.phone} title={shortTitle} />
      <main>{children}</main>
      <Footer social={social} services={services} />
    </>
  );
}
