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
