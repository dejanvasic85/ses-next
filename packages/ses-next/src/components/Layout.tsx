import React, { ReactNode } from 'react';
import { PageHead } from '@/components/PageHead';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { ServiceItem, SiteSettings } from '@/types';

interface LayoutProps {
  children: ReactNode;
  siteSettings: SiteSettings;
  services: ServiceItem[];
  pageUrl: string;
  title?: string;
}

export function Layout({ children, siteSettings, services, pageUrl, title }: LayoutProps) {
  const { companyName, companyLogo, phone, meta, shortTitle, social } = siteSettings;
  return (
    <>
      <PageHead
        canonicalUrl={pageUrl}
        companyLogo={companyLogo}
        companyName={companyName}
        description={meta.description}
        phone={phone}
        socialTitle={companyName}
        title={title || meta.title}
      />
      <Navbar contactPhone={phone} title={shortTitle} />
      <main>{children}</main>
      <Footer social={social} services={services} />
    </>
  );
}
