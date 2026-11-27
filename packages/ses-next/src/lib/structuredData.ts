type FaqItem = {
  question: string;
  answer: string;
};

type PersonJsonLdInput = {
  name: string;
  role: string;
  licenceNumber?: string;
  accreditations?: string[];
  companyName: string;
  url: string;
};

export const safeJsonLd = (data: unknown): string =>
  JSON.stringify(data)
    .replace(/</g, '\\u003c')
    .replace(/\u2028/g, '\\u2028')
    .replace(/\u2029/g, '\\u2029');

export const personJsonLd = ({ name, role, licenceNumber, accreditations, companyName, url }: PersonJsonLdInput) => {
  const credentialItems = accreditations
    ?.filter((credName) => credName.trim().length > 0)
    .map((credName) => ({ '@type': 'EducationalOccupationalCredential', name: credName.trim() }));

  return {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name,
    jobTitle: role,
    worksFor: {
      '@type': 'Organization',
      name: companyName,
      url,
    },
    url,
    ...(licenceNumber && { identifier: licenceNumber }),
    ...(credentialItems?.length && { hasCredential: credentialItems }),
  };
};

export const faqJsonLd = (faqs: FaqItem[]) => ({
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faqs.map(({ question, answer }) => ({
    '@type': 'Question',
    name: question,
    acceptedAnswer: {
      '@type': 'Answer',
      text: answer,
    },
  })),
});

type JobPostingJsonLdInput = {
  title: string;
  intro: string[];
  responsibilities: string[];
  requirements: string[];
  benefits: string[];
  employmentType: string;
  datePosted: string;
  companyName: string;
  companyUrl: string;
  companyLogo: string;
  streetAddress?: string;
  suburb?: string;
  state?: string;
  postcode?: string;
};

const escapeHtml = (text: string): string => text.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

const htmlList = (heading: string, items: string[]): string =>
  items.length > 0 ? `<h3>${heading}</h3><ul>${items.map((item) => `<li>${escapeHtml(item)}</li>`).join('')}</ul>` : '';

/** Google for Jobs needs the description as HTML, so the page sections are rebuilt here. */
export const jobPostingJsonLd = ({
  title,
  intro,
  responsibilities,
  requirements,
  benefits,
  employmentType,
  datePosted,
  companyName,
  companyUrl,
  companyLogo,
  streetAddress,
  suburb,
  state,
  postcode,
}: JobPostingJsonLdInput) => ({
  '@context': 'https://schema.org',
  '@type': 'JobPosting',
  title,
  description: [
    intro.map((paragraph) => `<p>${escapeHtml(paragraph)}</p>`).join(''),
    htmlList("What you'll do", responsibilities),
    htmlList("What you'll need", requirements),
    htmlList('What we offer', benefits),
  ].join(''),
  datePosted,
  employmentType,
  directApply: false,
  hiringOrganization: {
    '@type': 'Organization',
    name: companyName,
    sameAs: companyUrl,
    logo: companyLogo,
  },
  jobLocation: {
    '@type': 'Place',
    address: {
      '@type': 'PostalAddress',
      streetAddress,
      addressLocality: suburb,
      addressRegion: state,
      postalCode: postcode,
      addressCountry: 'AU',
    },
  },
});
