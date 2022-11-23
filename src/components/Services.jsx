import React from 'react';

import { Container } from '.';
import { Icon } from '.';

function IconContainer({ name }) {
  return (
    <div className="w-24 h-24 inline-flex items-center justify-center rounded-full bg-gray-200 text-primary flex-shrink-0">
      <Icon name={name} size="xxxl" />
    </div>
  );
}

export function Services({ className, services }) {
  return (
    <section className={className}>
      <Container>
        <h2 className="font-title mb-2 font-bold text-2xl lg:text-3xl text-center">
          Our Services
        </h2>
        <ul className="px-4 py-8 flex flex-wrap gap-4 justify-evenly">
          {services.map(({ name, description, icon = 'bolt' }, idx) => (
            <li className="p-8 flex flex-col items-center text-center justify-center gap-4 w-full md:w-1/4" key={idx}>
              <IconContainer name={icon} />
              <h2 className="text-gray-900 text-lg title-font font-medium">{name}</h2>
              <p className="leading-relaxed text-base">{description}</p>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
