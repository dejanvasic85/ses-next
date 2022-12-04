import React from 'react';

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

export const Services = ({ className, services }) => {
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
        <GalleryCarousel imageGallery={gallery} />
      </Container>
    </div>
  );
};

export const ServicesV2 = ({ className, services }) => {
  return (
    <div className={className}>
      <Heading level={2}>Our Services</Heading>
      <Container>
        <ul className="grid md:grid-cols-2 gap-6 mt-12">
          {services.map(({ name, description, icon = 'bolt', imageGallery }, idx) => {
            const [firstImage] = imageGallery || [];
            return (
              <li className="group h-80 flex items-end bg-gray-100 rounded-lg overflow-hidden shadow-lg relative p-4">
                <img
                  src={firstImage.src}
                  loading="lazy"
                  alt="Photo by Fakurian Design"
                  className="w-full h-full object-cover object-center absolute inset-0 group-hover:scale-110 transition duration-200 brightness-75"
                />
                <div className="bg-gradient-to-t from-black via-transparent to-transparent opacity-50 absolute inset-0 pointer-events-none"></div>
                <div className="flex flex-col relative">
                  <span className="text-gray-300">{name}</span>
                  <span className="flex items-start gap-2 text-white text-lg lg:text-xl font-semibold">
                    {description}
                  </span>
                </div>
              </li>
            );
          })}
        </ul>
      </Container>
    </div>
  );
};
