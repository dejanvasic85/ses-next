import React from 'react';

import { Container } from './Container';
import { Heading } from './Heading';
import { Team } from './Team';
import { Testimonial } from './Testimonial';

export function About({ about, team, testimonials }) {
  return (
    <>
      <Container>
        <Team about={about} introduction={team.introduction} members={team.members} />
      </Container>

      <Container>
        <div className="px-4 md:px-8 mx-auto mt-12 text-center">
          <Heading level={2}>What others say about us</Heading>
          <div className="grid md:grid-cols-3 gap-4 md:gap-8 mt-12">
            {testimonials.map((testimonial, idx) => (
              <Testimonial {...testimonial} key={idx} />
            ))}
          </div>
          <div className="mt-8">
            <button className="btn btn-primary btn-outline">Leave feedback</button>
          </div>
        </div>
      </Container>
    </>
  );
}
