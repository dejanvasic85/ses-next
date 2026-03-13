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
import { Icon } from '@/components/Icon/Icon';
import type { BlogPost, ServiceFaq, ServiceItem, GoogleReviews, BasePageProps } from '@/types';

interface ServiceProps extends BasePageProps {
  blogPosts: BlogPost[];
  googleReviews: GoogleReviews;
  service: ServiceItem;
  childServices: ServiceItem[];
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

const getServicePath = (service: ServiceItem): string => {
  return service.parentService
    ? `/services/${service.parentService.slug}/${service.slug}`
    : `/services/${service.slug}`;
};

interface BreadcrumbItem {
  name: string;
  item?: string;
}

interface ServiceBreadcrumbProps {
  items: BreadcrumbItem[];
}

function ServiceBreadcrumb({ items }: ServiceBreadcrumbProps) {
  return (
    <nav aria-label="Breadcrumb" className="mx-auto px-4 md:px-8 max-w-screen-lg pt-4">
      <ol className="flex flex-wrap items-center gap-1 text-sm text-gray-500">
        {items.map((item, index) => {
          const isLast = index === items.length - 1;
          return (
            <li key={item.name} className="flex items-center gap-1">
              {index > 0 && <span aria-hidden="true">›</span>}
              {isLast || !item.item ? (
                <span className="text-gray-900 font-medium" aria-current={isLast ? 'page' : undefined}>
                  {item.name}
                </span>
              ) : (
                <Link href={item.item} className="hover:text-primary hover:underline transition-colors">
                  {item.name}
                </Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}

interface RelatedServicesProps {
  services: ServiceItem[];
}

function RelatedServices({ services }: RelatedServicesProps) {
  return (
    <section aria-labelledby="related-services-heading" className="mx-auto px-4 md:px-8 max-w-screen-lg mt-12 mb-8">
      <h2 id="related-services-heading" className="text-3xl font-bold text-gray-900 mb-6">
        Specialist Services
      </h2>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {services.map((service) => (
          <article
            key={service.id}
            className="group relative overflow-hidden rounded-lg border border-gray-200 hover:shadow-md transition-shadow duration-200"
          >
            <Link href={getServicePath(service)} className="absolute inset-0 z-10" prefetch={false}>
              <span className="sr-only">View {service.name} service</span>
            </Link>
            <div className="flex h-full flex-col justify-between p-6">
              <div className="space-y-2">
                <div className="flex items-center gap-3">
                  <div className="rounded-full bg-primary p-2">
                    <Icon name={service.icon} size="xl" className="text-white" />
                  </div>
                  <h3 className="text-lg font-semibold border-b-2 border-primary">{service.name}</h3>
                </div>
                <p className="text-gray-500">{service.blurb}</p>
              </div>
              <span className="mt-4 inline-block text-primary font-medium group-hover:underline">Learn more →</span>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

export default function Service({
  blogPosts,
  googleReviews: reviews,
  pageUrl,
  service,
  childServices,
  title,
  description,
  services,
  siteSettings,
}: ServiceProps) {
  const { name, content: serviceContent, faqs, parentService } = service;

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

  const servicesUrl = new URL('services/', siteSettings.baseUrl).toString();

  const breadcrumbItems: BreadcrumbItem[] = parentService
    ? [
        { name: 'Home', item: siteSettings.baseUrl },
        { name: 'Services', item: servicesUrl },
        {
          name: parentService.name,
          item: new URL(`services/${parentService.slug}`, siteSettings.baseUrl).toString(),
        },
        { name: service.name },
      ]
    : [{ name: 'Home', item: siteSettings.baseUrl }, { name: 'Services', item: servicesUrl }, { name: service.name }];

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
      <BreadcrumbJsonLd items={breadcrumbItems} />
      <Layout services={services} siteSettings={siteSettings} pageUrl={pageUrl} title={title} description={description}>
        <ServiceBreadcrumb items={breadcrumbItems} />
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

          {childServices.length > 0 && <RelatedServices services={childServices} />}

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
                {blogPosts.map(
                  ({ id, title: postTitle, slug: postSlug, description: postDesc, photo, publishedAt }) => (
                    <Link
                      key={id}
                      href={`/blog/${postSlug}`}
                      className="group block bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 overflow-hidden"
                    >
                      <div className="aspect-video relative overflow-hidden bg-gray-200">
                        <Image
                          src={photo}
                          alt={postTitle}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-300"
                          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        />
                      </div>
                      <div className="p-5">
                        <h3 className="text-xl font-semibold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors line-clamp-2">
                          {postTitle}
                        </h3>
                        <p className="text-gray-600 text-sm mb-3 line-clamp-3">{postDesc}</p>
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
                  ),
                )}
              </div>
            </div>
          </Activity>
        </div>
      </Layout>
    </>
  );
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const slugParam = params?.slug as string[];
  const allServices = (await getBasePageProps({ pageUrl: 'services/' })).services;

  let service: ServiceItem | undefined;

  if (slugParam.length === 2) {
    const [parentSlug, childSlug] = slugParam;
    service = allServices.find((s) => s.slug === childSlug && s.parentService?.slug === parentSlug);
  } else {
    const [parentSlug] = slugParam;
    service = allServices.find((s) => s.slug === parentSlug && !s.parentService);
  }

  if (!service) {
    return { notFound: true };
  }

  const childServices = allServices.filter((s) => s.parentService?.slug === service!.slug);

  const servicePath = service.parentService
    ? `services/${service.parentService.slug}/${service.slug}`
    : `services/${service.slug}`;

  const props = await getBasePageProps({ pageUrl: servicePath });
  const posts = await getBlogPosts();
  const blogPosts = posts.filter(({ tags }) => tags.includes(service!.slug));

  const title = service.seoTitle || service.name;
  const description = service.seoDescription;

  return {
    props: {
      ...props,
      googleReviews,
      service,
      childServices,
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
    .map(({ slug, parentService }) => ({
      params: {
        slug: parentService ? [parentService.slug, slug] : [slug],
      },
    }));

  return {
    paths,
    fallback: false,
  };
};
