import React from 'react';
import { Heading } from './Heading';

import { Team } from './Team';
import { Testimonial } from './Testimonial';

export function About({ team, testimonials }) {
  return (
    <>
      <Team introduction={team.introduction} members={team.members} />
      <div className="max-w-screen-md px-4 md:px-8 mx-auto mt-8 text-center">
        <Heading level={2}>Our competitive advantage</Heading>
        <p className="text-gray-500 sm:text-lg mb-6 md:mb-8">
          At Storm Electrical Solutions we pride ourselves on being a forward thinking and innovative company offering a
          customer focused, quality service within the electrical industry to all areas of Melbourne.
        </p>
        <p className="text-gray-500 sm:text-lg mb-6 md:mb-8">
          We can offer a great deal of experience and expertise in a wide range of commercial, industrial and
          residential projects large or small including installations, maintenance, fault finding and testing.
        </p>
        <p className="text-gray-500 sm:text-lg mb-6 md:mb-8">
          We keep abreast of the latest developments in renewable energy and the electrical industry to ensure our
          customers get the best possible service available.
        </p>
      </div>
      <div className="max-w-screen-md px-4 md:px-8 mx-auto mt-12 text-center">
        <Heading level={2}>What others say about us</Heading>
        <div className="grid md:grid-cols-2 gap-4 md:gap-8 mt-8">
          {testimonials.map((testimonial, idx) => (
            <Testimonial {...testimonial} key={idx} />
          ))}
        </div>
      </div>
    </>
  );
}
