import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

import { Container } from './Container';
import { Heading } from './Heading';
import { Icon } from './Icon/Icon';
import type { IconMap } from './Icon/IconMap';

const ConditionalWrap = ({
  children,
  condition,
  wrapper,
}: {
  children: React.ReactNode;
  condition: boolean;
  wrapper: (children: React.ReactNode) => React.ReactNode;
}) => {
  return condition ? wrapper(children) : children;
};

interface ServiceItem {
  name: string;
  blurb: string;
  linkToReadMore: boolean;
  slug: string;
  icon: string;
  featuredImage: {
    src: string;
    alt: string;
  };
}

interface ServicesData {
  blurbs: string[];
  items: ServiceItem[];
}

interface ServicesProps {
  className?: string;
  services: ServicesData;
}

export const Services = ({ className, services }: ServicesProps) => {
  const { blurbs, items } = services;

  return (
    <div className={className}>
      <Container>
        <Heading level={2}>Our Services</Heading>
        {blurbs.map((blurb, idx) => (
          <p className="max-w-screen-md mb-12 text-gray-500 md:text-lg text-center mx-auto p-x-4" key={idx}>
            {blurb}
          </p>
        ))}

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 justify-items-center">
          {items.map(({ name, blurb, linkToReadMore, slug, icon = 'bolt', featuredImage }, idx) => (
            <div className="group relative overflow-hidden rounded-lg " key={idx}>
              <Link href={`/services/${slug}`} className="absolute inset-0 z-10" prefetch={false}>
                <span className="sr-only">View {name}</span>
              </Link>
              <div className="flex h-full flex-col justify-between p-6">
                <div className="space-y-2">
                  <div className="flex items-center gap-3">
                    <div className="rounded-full bg-primary p-2 text-primary-foreground">
                      <Icon name={icon as keyof typeof IconMap} size="xl" className="text-white" />
                    </div>
                    <h3 className="text-lg font-semibold border-b-2 border-primary">
                      <ConditionalWrap
                        condition={Boolean(linkToReadMore && slug)}
                        wrapper={(children) => <Link href={`/services/${slug}`}>{children}</Link>}
                      >
                        {name}
                      </ConditionalWrap>
                    </h3>
                  </div>
                  <p className="text-gray-500">{blurb}</p>
                </div>
                <div className="mt-4 aspect-video w-full rounded-lg overflow-hidden relative">
                  <Image
                    src={featuredImage.src}
                    alt={featuredImage.alt}
                    fill
                    className="object-cover object-center transition-all group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </div>
  );
};
