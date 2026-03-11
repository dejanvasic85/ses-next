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
  description?: string;
  noIndex?: boolean;
}

export function Layout({ children, siteSettings, services, pageUrl, title, description, noIndex }: LayoutProps) {
  const { companyName, companyLogo, phone, meta, shortTitle, social } = siteSettings;
  return (
    <>
      <PageHead
        canonicalUrl={pageUrl}
        companyLogo={companyLogo}
        companyName={companyName}
        description={description || meta.description}
        title={title || meta.title}
        noIndex={noIndex}
      />
      <Navbar contactPhone={phone} title={shortTitle} />
      <main>{children}</main>
      <Footer social={social} services={services} />
    </>
  );
}
