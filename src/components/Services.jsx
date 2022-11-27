import React from 'react';

import { Container } from './Container';
import { Gallery } from './Gallery';
import { Heading } from './Heading';
import { Icon } from './Icon/Icon';

function IconContainer({ name }) {
  return (
    <div className="w-24 h-24 inline-flex items-center justify-center rounded-full bg-gray-200 text-primary flex-shrink-0">
      <Icon name={name} size="xxxl" />
    </div>
  );
}

export function Services({ className, services }) {
  const gallery = services
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
        <ul className="px-4 py-8 flex flex-wrap gap-4 justify-evenly">
          {services.map(({ name, description, icon = 'bolt' }, idx) => (
            <li className="p-8 flex flex-col items-center text-center justify-center gap-4 w-full md:w-1/4" key={idx}>
              <IconContainer name={icon} />
              <h3 className="text-gray-900 text-lg title-font font-medium">{name}</h3>
              <p className="leading-relaxed text-base">{description}</p>
            </li>
          ))}
        </ul>
      </Container>
      <Gallery imageGallery={gallery} />
    </div>
  );
}
