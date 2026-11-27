import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

import { CareersRole } from '@/components/Careers/CareersRole';
import { careersPath } from '@/lib/careers';
import { getCareers, getSiteSettings } from '@/lib/content/contentService';
import { jobPostingJsonLd, safeJsonLd } from '@/lib/structuredData';

export async function generateMetadata(): Promise<Metadata> {
  const [careers, { companyName }] = await Promise.all([getCareers(), getSiteSettings()]);

  if (!careers) {
    return { title: `Careers | ${companyName}`, robots: { index: false } };
  }

  const title = careers.seoTitle ?? `${careers.roleTitle} Job in Melbourne | ${companyName}`;
  const description =
    careers.seoDescription ?? `${companyName} is hiring an ${careers.roleTitle} to join our Melbourne team.`;

  return {
    title,
    description,
    alternates: { canonical: careersPath },
    openGraph: { title, description },
  };
}

export default async function CareersPage() {
  const [careers, siteSettings] = await Promise.all([getCareers(), getSiteSettings()]);

  if (!careers) {
    notFound();
  }

  const { companyName, baseUrl, companyLogo, phone, email, streetAddress, suburb, state, postcode } = siteSettings;
  const location = suburb && state ? `${suburb}, ${state}` : null;
  const { datePosted } = careers;
  const hasDescription = careers.intro.length > 0 || careers.responsibilities.length > 0;

  const jobPosting =
    datePosted &&
    hasDescription &&
    jobPostingJsonLd({
      title: careers.roleTitle,
      intro: careers.intro,
      responsibilities: careers.responsibilities,
      requirements: careers.requirements,
      benefits: careers.benefits,
      employmentType: careers.employmentType,
      datePosted,
      companyName,
      companyUrl: baseUrl,
      companyLogo,
      streetAddress,
      suburb,
      state,
      postcode,
    });

  return (
    <>
      {jobPosting && <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: safeJsonLd(jobPosting) }} />}
      <CareersRole careers={careers} location={location} phone={phone} email={careers.applyEmail ?? email ?? null} />
    </>
  );
}
