import { Activity } from 'react';
import { GetStaticProps, GetStaticPaths } from 'next';
import { PortableText } from '@portabletext/react';
import { LocalBusinessJsonLd, BreadcrumbJsonLd } from 'next-seo';
import Link from 'next/link';
import Image from 'next/image';
import { googleReviews } from 'ses-reviews';

import { getBlogPosts, getServices } from '@/lib/content/contentService';

const serviceSeoTitles: Record<string, string> = {
  'air-conditioning': 'Air Conditioning Installation & Service Melbourne | SES',
  lighting: 'Lighting Installation & Repairs Melbourne | SES',
  'electrical-testing': 'Electrical Testing & Safety Inspections Melbourne | SES',
  'data-and-tv': 'Data & TV Point Installation Melbourne | SES',
  telecommunications: 'Data Cabling & Telecommunications Electrician Melbourne | SES',
  'renewable-energy': 'Solar Panel & Battery Installation Melbourne | SES',
  'catering-maintenance': 'Commercial Electrical Maintenance Melbourne | SES',
};

const serviceSeoDescriptions: Record<string, string> = {
  'air-conditioning':
    'Expert air conditioning installation & repair in Melbourne. Licensed electricians, 19+ years experience. 5-star rated. Free quotes. Call (03) 4050 7937.',
  lighting:
    'Professional lighting installation & repairs across Melbourne. Licensed electricians. Downlights, LED upgrades & more. 5-star rated. Call (03) 4050 7937.',
  'electrical-testing':
    'Electrical testing & safety inspections in Melbourne. Licensed SES electricians. Compliance testing, fault finding. Free quotes. Call (03) 4050 7937.',
  'data-and-tv':
    'Data & TV point installation across Melbourne. Licensed electricians, 19+ years experience. TV antennas, NBN, HDMI. Call (03) 4050 7937.',
  telecommunications:
    'Data cabling & telecommunications solutions in Melbourne. Licensed electricians. NBN, fibre, office cabling. Free quotes. Call (03) 4050 7937.',
  'renewable-energy':
    'Solar panel & battery installation in Melbourne. CEC accredited installer. 19+ years experience. Free quotes. Call (03) 4050 7937.',
  'catering-maintenance':
    'Commercial electrical maintenance for Melbourne restaurants. Licensed electricians. Emergency repairs & preventive maintenance. Call (03) 4050 7937.',
};
import { getBasePageProps } from '@/lib/basePageProps';
import { Layout, CustomImage, ImageCarousel } from '@/components';
import type { BlogPost, ServiceItem, GoogleReviews, BasePageProps } from '@/types';

interface ServiceProps extends BasePageProps {
  blogPosts: BlogPost[];
  googleReviews: GoogleReviews;
  service: ServiceItem;
  pageUrl: string;
  title: string;
  description?: string;
}

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
  const { name, content: serviceContent } = service;

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
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceJsonLd) }} />
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

  const title = service!.seoTitle || serviceSeoTitles[slug] || service!.name;
  const description = service!.seoDescription || serviceSeoDescriptions[slug];

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
