import React from 'react';

import { Container } from '.';
import { Icon } from '.';

function IconContainer({ name }) {
  return (
    <div className="w-16 h-16 inline-flex items-center justify-center rounded-full bg-gray-200 text-primary flex-shrink-0">
      <Icon name={name} size="xxl" />
    </div>
  );
}

export function Services({ className, services }) {
  return (
    <section className={className}>
      <Container>
        <h2 id="services" className="font-title mb-2 font-bold text-xl sm:text-3xl text-center lg:text-4xl">
          Our Services
        </h2>
        <ul className="px-4 py-8 flex flex-wrap gap-4 justify-evenly">
          {services.map(({ name, description, icon = 'bolt' }, idx) => (
            <li className="border-gray-200 border rounded-lg p-4 flex gap-4 w-full md:w-1/3" key={idx}>
              <IconContainer name={icon} />
              <div>
                <h2 className="text-gray-900 text-lg title-font font-medium">{name}</h2>
                <p className="leading-relaxed text-base">{description}</p>
              </div>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
