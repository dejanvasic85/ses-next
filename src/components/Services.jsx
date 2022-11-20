import React from 'react';

import { Container } from '.';

function Icon() {
  return (
    <div className="w-16 h-16 inline-flex items-center justify-center rounded-full bg-gray-200 text-primary flex-shrink-0">
      <svg
        viewBox="0 0 24 24"
        height="48"
        width="48"
        focusable="false"
        role="img"
        fill="currentColor"
        xmlns="http://www.w3.org/2000/svg"
      >
        <title>OfflineBolt icon</title>
        <path fill="none" d="M0 0h24v24H0z"></path>
        <path d="M12 2.02c-5.51 0-9.98 4.47-9.98 9.98s4.47 9.98 9.98 9.98 9.98-4.47 9.98-9.98S17.51 2.02 12 2.02zm0 17.96c-4.4 0-7.98-3.58-7.98-7.98S7.6 4.02 12 4.02 19.98 7.6 19.98 12 16.4 19.98 12 19.98zM12.75 5l-4.5 8.5h3.14V19l4.36-8.5h-3z"></path>
      </svg>
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
          {services.map(({ name, description }, idx) => (
            <li className="border-gray-200 border rounded-lg p-4 flex gap-4 xl:w-1/3 md:w-1/2" key={idx}>
              <Icon />
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
