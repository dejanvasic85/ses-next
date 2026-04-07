import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { PortableText } from '@portabletext/react';
import Link from 'next/link';
import { googleReviews } from 'ses-reviews';

import { CustomImage, ImageCarousel, RelatedServices, SanityImage, ServiceBreadcrumb } from '@/components';
import { getBasePageProps } from '@/lib/basePageProps';
import { getBlogPosts, getServices } from '@/lib/content/contentService';
import { faqJsonLd, safeJsonLd } from '@/lib/structuredData';
import type { BlogPost, GoogleReview, ServiceItem } from '@/types';

type ServicePageParams = {
  slug: string[];
};

type ServicePageProps = {
  params: Promise<ServicePageParams>;
};

type BreadcrumbItem = {
  name: string;
  item?: string;
};

type PortableTextImageProps = {
  value: string;
};

const servicesPathValue = 'services/';
const serviceAddressValue = {
  '@type': 'PostalAddress',
  streetAddress: '61B Hansen St',
  addressLocality: 'Altona North',
  addressRegion: 'VIC',
  postalCode: '3025',
  addressCountry: 'AU',
} as const;
const dateFormatValue = {
  year: 'numeric',
  month: 'short',
  day: 'numeric',
} as const;

async function getServiceBySlugParts(slugParts: string[]): Promise<ServiceItem | null> {
  if (slugParts.length === 0) {
    return null;
  }

  if (slugParts.length > 2) {
    return null;
  }

  const allServices = await getServices();

  if (slugParts.length === 2) {
    const [parentSlug, childSlug] = slugParts;
    return (
      allServices.find((service) => service.slug === childSlug && service.parentService?.slug === parentSlug) ?? null
    );
  }

  const [topLevelSlug] = slugParts;
  return allServices.find((service) => service.slug === topLevelSlug && !service.parentService) ?? null;
}

function getServicePath(service: ServiceItem): string {
  if (service.parentService) {
    return `services/${service.parentService.slug}/${service.slug}`;
  }

  return `services/${service.slug}`;
}

function buildBreadcrumbItems(service: ServiceItem, baseUrl: string): BreadcrumbItem[] {
  const servicesUrl = new URL('services/', baseUrl).toString();

  if (!service.parentService) {
    return [{ name: 'Home', item: baseUrl }, { name: 'Services', item: servicesUrl }, { name: service.name }];
  }

  return [
    { name: 'Home', item: baseUrl },
    { name: 'Services', item: servicesUrl },
    {
      name: service.parentService.name,
      item: new URL(`services/${service.parentService.slug}`, baseUrl).toString(),
    },
    { name: service.name },
  ];
}

export async function generateStaticParams() {
  const services = await getServices();
  return services
    .filter(({ slug }) => typeof slug === 'string' && slug.length > 0)
    .map(({ slug, parentService }) => ({
      slug: parentService ? [parentService.slug, slug] : [slug],
    }));
}

export async function generateMetadata({ params }: ServicePageProps): Promise<Metadata> {
  const { slug } = await params;
  const service = await getServiceBySlugParts(slug);

  if (!service) {
    return {};
  }

  const { siteSettings } = await getBasePageProps({ pageUrl: getServicePath(service) });
  const title = service.seoTitle ?? service.name;
  const description = service.seoDescription ?? service.description;

  return {
    title,
    description,
    alternates: {
      canonical: `/${getServicePath(service)}`,
    },
    openGraph: {
      title,
      description,
      url: new URL(getServicePath(service), siteSettings.baseUrl).toString(),
      type: 'website',
    },
  };
}

export default async function ServicePage({ params }: ServicePageProps) {
  const { slug } = await params;
  const service = await getServiceBySlugParts(slug);

  if (!service) {
    notFound();
  }

  const servicePath = getServicePath(service);
  const [baseProps, allServices, posts] = await Promise.all([
    getBasePageProps({ pageUrl: servicePath }),
    getServices(),
    getBlogPosts(),
  ]);

  const { siteSettings, pageUrl } = baseProps;
  const blogPosts = posts.filter(({ tags }) => tags.includes(service.slug));
  const childServices = allServices.filter(({ parentService }) => parentService?.slug === service.slug);

  const ratingCount = Number.parseInt(googleReviews.numberOfReviews, 10);
  const ratingValue = Number.parseFloat(googleReviews.overallRatingValue);
  const hasValidRatings = Number.isFinite(ratingCount) && Number.isFinite(ratingValue);
  const reviewsJson = googleReviews.reviews.slice(0, 9).map(({ comment, reviewer, starRating }: GoogleReview) => ({
    author: reviewer.displayName,
    reviewBody: comment,
    reviewRating: {
      bestRating: '5',
      worstRating: '1',
      ratingValue: String(starRating),
    },
  }));

  const breadcrumbItems = buildBreadcrumbItems(service, siteSettings.baseUrl);
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
    serviceType: service.serviceType ?? service.name,
  };
  const localBusinessJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: siteSettings.companyName,
    description: service.description,
    address: serviceAddressValue,
    telephone: siteSettings.phone,
    image: siteSettings.companyLogo,
    url: pageUrl,
    ...(hasValidRatings
      ? {
          aggregateRating: {
            '@type': 'AggregateRating',
            ratingValue,
            ratingCount,
            bestRating: 5,
            worstRating: 1,
          },
        }
      : {}),
    review: reviewsJson,
  };
  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: breadcrumbItems.map(({ name, item }, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name,
      ...(item ? { item } : {}),
    })),
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: safeJsonLd(localBusinessJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: safeJsonLd(serviceJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: safeJsonLd(breadcrumbJsonLd) }} />
      {service.faqs && service.faqs.length > 0 && (
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: safeJsonLd(faqJsonLd(service.faqs)) }} />
      )}
      <ServiceBreadcrumb items={breadcrumbItems} />
      <div className="bg-white py-6 sm:py-8 lg:py-12">
        <article className="prose mx-auto max-w-screen-lg px-4 md:px-8 lg:prose-lg">
          <h1 className="text-center">{service.name}</h1>
          {service.content && (
            <PortableText
              value={service.content}
              components={{
                types: {
                  image: ({ value }: PortableTextImageProps) => <CustomImage value={value} />,
                },
              }}
            />
          )}
        </article>
        {service.imageGallery && <ImageCarousel images={service.imageGallery} serviceName={service.name} />}

        {childServices.length > 0 && <RelatedServices services={childServices} />}

        {service.faqs && service.faqs.length > 0 && (
          <section aria-labelledby="faq-heading" className="mx-auto mt-12 mb-8 max-w-screen-lg px-4 md:px-8">
            <h2 id="faq-heading" className="mb-6 text-3xl font-bold text-gray-900">
              Frequently Asked Questions
            </h2>
            <dl className="divide-y divide-gray-200">
              {service.faqs.map(({ question, answer }) => (
                <div key={question} className="py-6">
                  <dt className="text-lg font-semibold text-gray-900">{question}</dt>
                  <dd className="mt-2 text-gray-600">{answer}</dd>
                </div>
              ))}
            </dl>
          </section>
        )}

        {blogPosts.length > 0 && (
          <div className="mx-auto mt-12 mb-8 max-w-screen-lg px-4 md:px-8">
            <h2 className="mb-2 text-3xl font-bold text-gray-900">Related Blog Posts</h2>
            <p className="mb-6 text-gray-600">Explore our {service.name.toLowerCase()} articles and insights</p>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {blogPosts.map(({ id, title, slug: postSlug, description, photo, publishedAt }: BlogPost) => (
                <Link
                  key={id}
                  href={`/blog/${postSlug}`}
                  className="group block overflow-hidden rounded-lg bg-white shadow-md transition-shadow duration-300 hover:shadow-xl"
                >
                  <div className="relative aspect-video overflow-hidden bg-gray-200">
                    <SanityImage
                      src={photo}
                      alt={title}
                      fill
                      className="object-cover transition-transform duration-300 group-hover:scale-105"
                      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />
                  </div>
                  <div className="p-5">
                    <h3 className="mb-2 line-clamp-2 text-xl font-semibold text-gray-900 transition-colors group-hover:text-blue-600">
                      {title}
                    </h3>
                    <p className="mb-3 line-clamp-3 text-sm text-gray-600">{description}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-gray-500">
                        {new Date(publishedAt).toLocaleDateString('en-AU', dateFormatValue)}
                      </span>
                      <span className="text-sm text-blue-600 group-hover:underline">Read more -&gt;</span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </>
  );
}
