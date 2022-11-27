import React, { useState } from 'react';
import { faker } from '@faker-js/faker';

import { Container } from './Container';
import { Heading } from './Heading';
import { Team } from './Team';
import { Testimonial } from './Testimonial';

export function About({ aboutIntro, team, testimonials }) {
  const [loading, setLoading] = useState(false);
  const [feedbackSent, setFeedbackSent] = useState(false);

  const handleLeaveFeedback = () => {
    setLoading(true);
    fetch('/api/feedback', {
      method: 'POST',
      body: JSON.stringify({
        fullName: faker.name.fullName(),
        comment: faker.lorem.paragraph(),
        rating: faker.datatype.number({ min: 4, max: 5 }),
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log('response', data);
        setFeedbackSent(true);
        setLoading(false);
      });
  };

  return (
    <Container>
      <Team aboutIntro={aboutIntro} introduction={team.introduction} members={team.members} />
      <div className="px-4 md:px-8 mx-auto mt-12 text-center">
        <Heading level={2}>What others say about us</Heading>
        <div className="grid lg:grid-cols-3 gap-4 md:gap-8 mt-8">
          {testimonials.map((testimonial, idx) => (
            <Testimonial {...testimonial} key={idx} />
          ))}
        </div>
        <div className="mt-8">
          <button className="btn btn-primary btn-outline">Leave feedback</button>
        </div>
      </div>
    </Container>
  );
}
