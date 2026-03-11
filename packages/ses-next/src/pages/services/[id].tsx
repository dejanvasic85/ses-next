import { Activity } from 'react';
import { GetStaticProps, GetStaticPaths } from 'next';
import { PortableText } from '@portabletext/react';
import { LocalBusinessJsonLd, BreadcrumbJsonLd, JsonLdScript } from 'next-seo';
import Link from 'next/link';
import Image from 'next/image';
import { googleReviews } from 'ses-reviews';

import { getBlogPosts, getServices } from '@/lib/content/contentService';
import { getBasePageProps } from '@/lib/basePageProps';
import { Layout, CustomImage, ImageCarousel } from '@/components';
import type { BlogPost, ServiceFaq, ServiceItem, GoogleReviews, BasePageProps } from '@/types';

interface ServiceProps extends BasePageProps {
  blogPosts: BlogPost[];
  googleReviews: GoogleReviews;
  service: ServiceItem;
  pageUrl: string;
  title: string;
  description?: string;
}

const faqJsonLd = (faqs: ServiceFaq[]) => ({
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

export default function Service({
  blogPosts,
  googleReviews: reviews,
  pageUrl,
  service,
  title,
  description,
  services,
  siteSettings,
}: ServiceProps) {
  const { name, content: serviceContent, faqs } = service;

  const serviceJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: service.name,
    description: service.description,
    provider: {
      '@type': 'Electrician',
      name: siteSettings.companyName,
      url: siteSettings.baseUrl,
    },
    areaServed: { '@type': 'City', name: 'Melbourne' },
    serviceType: service.name,
  };

  const ratingCount = Number(reviews.numberOfReviews.replace('reviews', '').trim());
  const ratingValue = Number(reviews.overallRatingValue.replace('.0', '').trim());
  const reviewsJson = reviews.reviews.slice(0, 9).map(({ comment, reviewer, starRating }) => ({
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
      <LocalBusinessJsonLd
        type="LocalBusiness"
        name={siteSettings.companyName}
        description={service.description}
        address={{
          streetAddress: '61B Hansen St',
          addressLocality: 'Altona North',
          addressRegion: 'VIC',
          postalCode: '3025',
          addressCountry: 'AU',
        }}
        telephone={siteSettings.phone}
        image={siteSettings.companyLogo}
        url={pageUrl}
        aggregateRating={{
          ratingValue: ratingValue,
          ratingCount: ratingCount,
          bestRating: 5,
          worstRating: 0,
        }}
        review={reviewsJson}
      />
      <JsonLdScript data={serviceJsonLd} scriptKey="service" />
      {faqs && faqs.length > 0 && <JsonLdScript data={faqJsonLd(faqs)} scriptKey="faq" />}
      <BreadcrumbJsonLd
        items={[
          { name: 'Home', item: siteSettings.baseUrl },
          { name: 'Services', item: new URL('/#services', siteSettings.baseUrl).toString() },
          { name: service.name },
        ]}
      />
      <Layout services={services} siteSettings={siteSettings} pageUrl={pageUrl} title={title} description={description}>
        <div className="bg-white py-6 sm:py-8 lg:py-12">
          <article className="mx-auto px-4 md:px-8 max-w-screen-lg prose lg:prose-lg">
            <h1 className="text-center">{name}</h1>
            {serviceContent && (
              <PortableText
                value={serviceContent}
                components={{
                  types: {
                    image: ({ value }) => <CustomImage value={value} />,
                  },
                }}
              />
            )}
          </article>
          {service.imageGallery && <ImageCarousel images={service.imageGallery} serviceName={service.name} />}

          {faqs && faqs.length > 0 && (
            <section aria-labelledby="faq-heading" className="mx-auto px-4 md:px-8 max-w-screen-lg mt-12 mb-8">
              <h2 id="faq-heading" className="text-3xl font-bold text-gray-900 mb-6">
                Frequently Asked Questions
              </h2>
              <dl className="divide-y divide-gray-200">
                {faqs.map(({ question, answer }) => (
                  <div key={question} className="py-6">
                    <dt className="text-lg font-semibold text-gray-900">{question}</dt>
                    <dd className="mt-2 text-gray-600">{answer}</dd>
                  </div>
                ))}
              </dl>
            </section>
          )}

          <Activity mode={blogPosts.length > 0 ? 'visible' : 'hidden'}>
            <div className="mx-auto px-4 md:px-8 max-w-screen-lg mt-12 mb-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-2">Related Blog Posts</h2>
              <p className="text-gray-600 mb-6">Explore our {service.name.toLowerCase()} articles and insights</p>
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {blogPosts.map(({ id, title, slug, description, photo, publishedAt }) => (
                  <Link
                    key={id}
                    href={`/blog/${slug}`}
                    className="group block bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 overflow-hidden"
                  >
                    <div className="aspect-video relative overflow-hidden bg-gray-200">
                      <Image
                        src={photo}
                        alt={title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                        sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      />
                    </div>
                    <div className="p-5">
                      <h3 className="text-xl font-semibold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors line-clamp-2">
                        {title}
                      </h3>
                      <p className="text-gray-600 text-sm mb-3 line-clamp-3">{description}</p>
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-gray-500">
                          {new Date(publishedAt).toLocaleDateString('en-AU', {
                            year: 'numeric',
                            month: 'short',
                            day: 'numeric',
                          })}
                        </span>
                        <span className="text-blue-600 text-sm font-medium group-hover:underline">Read more →</span>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </Activity>
        </div>
      </Layout>
    </>
  );
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const slug = params?.id as string;
  const props = await getBasePageProps({ pageUrl: `services/${slug}` });
  const service = props.services.find(({ slug: s }) => s === slug);
  const posts = await getBlogPosts();
  const blogPosts = posts.filter(({ tags }) => tags.includes(slug));

  const title = service!.seoTitle || service!.name;
  const description = service!.seoDescription;

  return {
    props: {
      ...props,
      googleReviews,
      service: service!,
      title,
      description,
      blogPosts,
    },
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const services = await getServices();
  const paths = services
    .filter(({ slug }) => slug)
    .map(({ slug }) => ({
      params: { id: slug },
    }));

  return {
    paths,
    fallback: false,
  };
};
