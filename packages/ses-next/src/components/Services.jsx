import React from 'react';
import Link from 'next/link';

import { Container } from './Container';
import { Heading } from './Heading';
import { GalleryCarousel } from './GalleryCarousel';
import { Icon } from './Icon/Icon';

function IconContainer({ name }) {
  return (
    <div className="w-24 h-24 inline-flex items-center justify-center rounded-full bg-gray-200 text-primary flex-shrink-0">
      <Icon name={name} size="xxxl" />
    </div>
  );
}

const ReadMore = ({ linkToReadMore, slug }) => {
  if (!linkToReadMore || !slug) {
    return null;
  }

  return (
    <Link href={`/services/${slug}`} passHref={true} className="link link-primary">
      Read more
    </Link>
  );
};

export const Services = ({ className, services }) => {
  const { blurbs, items } = services;
  const gallery = items
    .reduce((prev, curr) => {
      const { name, imageGallery = [] } = curr;
      const imgs = imageGallery.map((imgMeta) => ({
        serviceName: name,
        ...imgMeta,
      }));

      return [...prev, ...imgs];
    }, [])
    .filter(Boolean);

  return (
    <div className={className}>
      <Container>
        <Heading level={2}>Our Services</Heading>
        {blurbs.map((blurb, idx) => (
          <p className="max-w-screen-md mb-12 text-gray-500 md:text-lg text-center mx-auto p-x-4" key={idx}>
            {blurb}
          </p>
        ))}

        <ul className="px-4 py-8 flex flex-wrap gap-4 justify-evenly">
          {items.map(({ name, description, linkToReadMore, slug, icon = 'bolt' }, idx) => (
            <li className="p-8 flex flex-col items-center text-center justify-center gap-4 w-full md:w-1/4" key={idx}>
              <IconContainer name={icon} />
              <h3 className="text-gray-900 text-lg title-font font-medium">{name}</h3>
              <p className="leading-relaxed text-base">{description}</p>
              <ReadMore linkToReadMore={linkToReadMore} slug={slug} />
            </li>
          ))}
        </ul>
        <GalleryCarousel imageGallery={gallery} />
      </Container>
    </div>
  );
};
