import Head from 'next/head';
import { NextSeo, LocalBusinessJsonLd } from 'next-seo';

export function PageHead({
  canonicalUrl,
  companyName,
  companyLogo,
  description,
  googleReviews,
  phone,
  title,
  socialTitle,
}) {
  const ratingCount = googleReviews.numberOfReviews.replace(' reviews', '');
  const reviews = googleReviews.reviews.map(({ comment, reviewer, starRating }) => ({
    author: reviewer.displayName,
    reviewBody: comment,
    reviewRating: {
      bestRating: '5',
      worstRating: '1',
      reviewAspect: 'Ambiance',
      ratingValue: String(starRating),
    },
  }));

  return (
    <>
      <Head>
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:title" content={companyName} />
        <meta name="twitter:image" content={companyLogo} />
        <meta name="twitter:description" content={description} />
      </Head>
      <NextSeo
        title={title}
        description={description}
        canonical={canonicalUrl}
        openGraph={{
          url: canonicalUrl,
          title: socialTitle,
          description,
          images: [{ url: companyLogo, alt: companyName }],
          siteName: companyName,
        }}
      />
      <LocalBusinessJsonLd
        type="LocalBusiness"
        images={[companyLogo]}
        name={companyName}
        telephone={phone}
        rating={{
          ratingValue: googleReviews.overallRatingValue,
          ratingCount,
        }}
        review={reviews}
      />
    </>
  );
}
