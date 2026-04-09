import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { PortableText } from '@portabletext/react';
import Link from 'next/link';
import { googleReviews } from 'ses-reviews';

import { getBlogPosts, getServices, getSiteSettings } from '@/lib/content/contentService';
import { faqJsonLd, safeJsonLd } from '@/lib/structuredData';
import { CustomImage } from '@/components/CustomImage';
import { ImageCarousel } from '@/components/ImageCarousel';
import { RelatedServices } from '@/components/RelatedServices/RelatedServices';
import { SanityImage } from '@/components/SanityImage';
import { ServiceBreadcrumb } from '@/components/ServiceBreadcrumb/ServiceBreadcrumb';
import type { GoogleReview, ServiceItem } from '@/types';

type ServicePageProps = {
  params: Promise<{ slug: string[] }>;
};

type BreadcrumbItem = {
  name: string;
  item?: string;
};

const portableTextComponents = {
  types: {
    image: ({ value }: { value: string }) => <CustomImage value={value} />,
  },
};

export async function generateStaticParams() {
  const services = await getServices();
  return services
    .filter(({ slug }) => slug)
    .map(({ slug, parentService }) => ({
      slug: parentService ? [parentService.slug, slug] : [slug],
    }));
}

export async function generateMetadata({ params }: ServicePageProps): Promise<Metadata> {
  const { slug: slugParam } = await params;
  const services = await getServices();

  let service: ServiceItem | undefined;

  if (slugParam.length === 2) {
    const [parentSlug, childSlug] = slugParam;
    service = services.find((s) => s.slug === childSlug && s.parentService?.slug === parentSlug);
  } else {
    const [parentSlug] = slugParam;
    service = services.find((s) => s.slug === parentSlug && !s.parentService);
  }

  if (!service) {
    return {};
  }

  const canonicalPath = service.parentService
    ? `/services/${service.parentService.slug}/${service.slug}`
    : `/services/${service.slug}`;

  const title = service.seoTitle || service.name;
  const description = service.seoDescription ?? undefined;

  return {
    title: `${title} | Storm Electrical Solutions`,
    description,
    alternates: {
      canonical: canonicalPath,
    },
    openGraph: {
      title,
      description,
    },
  };
}

export default async function ServicePage({ params }: ServicePageProps) {
  const { slug: slugParam } = await params;

  if (slugParam.length === 0) {
    notFound();
  }

  const [services, siteSettings, blogPosts] = await Promise.all([getServices(), getSiteSettings(), getBlogPosts()]);

  let service: ServiceItem | undefined;

  if (slugParam.length === 2) {
    const [parentSlug, childSlug] = slugParam;
    service = services.find((s) => s.slug === childSlug && s.parentService?.slug === parentSlug);
  } else {
    const [parentSlug] = slugParam;
    service = services.find((s) => s.slug === parentSlug && !s.parentService);
  }

  if (!service) {
    notFound();
  }

  const childServices = services.filter((s) => s.parentService?.slug === service!.slug);
  const filteredBlogPosts = blogPosts.filter(({ tags }) => tags.includes(service!.slug));

  const { baseUrl, companyName, phone, companyLogo } = siteSettings;
  const servicesUrl = new URL('services/', baseUrl).toString();
  const servicePath = service.parentService
    ? `services/${service.parentService.slug}/${service.slug}`
    : `services/${service.slug}`;
  const pageUrl = new URL(servicePath, baseUrl).toString();

  const breadcrumbItems: BreadcrumbItem[] = service.parentService
    ? [
        { name: 'Home', item: baseUrl },
        { name: 'Services', item: servicesUrl },
        {
          name: service.parentService.name,
          item: new URL(`services/${service.parentService.slug}`, baseUrl).toString(),
        },
        { name: service.name },
      ]
    : [{ name: 'Home', item: baseUrl }, { name: 'Services', item: servicesUrl }, { name: service.name }];

  const ratingCount = Number(googleReviews.numberOfReviews.replace('reviews', '').trim());
  const ratingValue = Number(googleReviews.overallRatingValue.replace('.0', '').trim());
  const reviewsJson = googleReviews.reviews.slice(0, 9).map(({ comment, reviewer, starRating }: GoogleReview) => ({
    author: reviewer.displayName,
    reviewBody: comment,
    reviewRating: {
      bestRating: '5',
      worstRating: '1',
      ratingValue: String(starRating),
    },
  }));

  const localBusinessJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: companyName,
    description: service.description,
    address: {
      '@type': 'PostalAddress',
      streetAddress: '61B Hansen St',
      addressLocality: 'Altona North',
      addressRegion: 'VIC',
      postalCode: '3025',
      addressCountry: 'AU',
    },
    telephone: phone,
    image: companyLogo,
    url: pageUrl,
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue,
      ratingCount,
      bestRating: 5,
      worstRating: 1,
    },
    review: reviewsJson,
  };

  const serviceJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: service.name,
    description: service.description,
    provider: {
      '@type': 'Electrician',
      name: companyName,
      url: baseUrl,
    },
    areaServed: { '@type': 'City', name: 'Melbourne' },
    serviceType: service.serviceType || service.name,
  };

  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: breadcrumbItems.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      ...(item.item ? { item: item.item } : {}),
    })),
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: safeJsonLd(localBusinessJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: safeJsonLd(serviceJsonLd) }} />
      {service.faqs && service.faqs.length > 0 && (
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: safeJsonLd(faqJsonLd(service.faqs)) }} />
      )}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: safeJsonLd(breadcrumbJsonLd) }} />
      <ServiceBreadcrumb items={breadcrumbItems} />
      <div className="bg-white py-6 sm:py-8 lg:py-12">
        <article className="mx-auto px-4 md:px-8 max-w-screen-lg prose lg:prose-lg">
          <h1 className="text-center">{service.name}</h1>
          {service.content && <PortableText value={service.content} components={portableTextComponents} />}
        </article>
        {service.imageGallery && <ImageCarousel images={service.imageGallery} serviceName={service.name} />}

        {childServices.length > 0 && <RelatedServices services={childServices} />}

        {service.faqs && service.faqs.length > 0 && (
          <section aria-labelledby="faq-heading" className="mx-auto px-4 md:px-8 max-w-screen-lg mt-12 mb-8">
            <h2 id="faq-heading" className="text-3xl font-bold text-gray-900 mb-6">
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

        {filteredBlogPosts.length > 0 && (
          <div className="mx-auto px-4 md:px-8 max-w-screen-lg mt-12 mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-2">Related Blog Posts</h2>
            <p className="text-gray-600 mb-6">Explore our {service.name.toLowerCase()} articles and insights</p>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {filteredBlogPosts.map(({ id, title, slug: postSlug, description, photo, publishedAt }) => (
                <Link
                  key={id}
                  href={`/blog/${postSlug}`}
                  className="group block bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 overflow-hidden"
                >
                  <div className="aspect-video relative overflow-hidden bg-gray-200">
                    <SanityImage
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
        )}
      </div>
    </>
  );
}
