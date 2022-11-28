import React, { useState } from 'react';
import classNames from 'class-names';

import { Container } from './Container';
import { Heading } from './Heading';
import { FeedbackForm } from './FeedbackForm';
import { Modal } from './Modal';
import { PopSuccess } from './PopSuccess';
import { Team } from './Team';
import { Testimonial } from './Testimonial';

export function About({ aboutIntro, team, testimonials }) {
  const [loading, setLoading] = useState(false);
  const [feedbackSent, setFeedbackSent] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);

  const sendFeedback = (data) => {
    setLoading(true);
    fetch('/api/feedback', {
      method: 'POST',
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then(() => {
        setFeedbackSent(true);
        setLoading(false);
        setModalOpen(false);
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
        <div className="mt-4">
          <PopSuccess show={feedbackSent}>Thank you! We will review your feedback shortly.</PopSuccess>
          <button
            className={classNames('btn btn-primary btn-outline', { hidden: feedbackSent })}
            onClick={() => setModalOpen(true)}
          >
            Leave feedback
          </button>
        </div>
      </div>
      <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)}>
        <FeedbackForm loading={loading} onSubmit={sendFeedback} />
      </Modal>
    </Container>
  );
}
