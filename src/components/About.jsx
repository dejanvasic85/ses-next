import React, { useEffect, useState } from 'react';
import classNames from 'class-names';

import { useFeedback } from '../hooks/useFeedback';

import { Container } from './Container';
import { Heading } from './Heading';
import { FeedbackForm } from './FeedbackForm';
import { Modal } from './Modal';
import { PopSuccess } from './PopSuccess';
import { Team } from './Team';
import { Testimonial } from './Testimonial';

export function About({ aboutIntro, team, testimonials }) {
  const [showFeedbackButton, setShowFeedbackButton] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const { sendFeedback, loading, feedbackSent } = useFeedback();

  useEffect(() => {
    setShowFeedbackButton(!feedbackSent);
    if (feedbackSent) {
      setModalOpen(false);
    }
  }, [feedbackSent]);

  return (
    <Container>
      <Team blurbs={team.blurbs ?? []} members={team.members} />
      <div className="px-4 md:px-8 mx-auto mt-12 text-center">
        <Heading level={2}>What others say about us</Heading>
        <div className="grid lg:grid-cols-3 gap-4 md:gap-8 mt-8">
          {testimonials.map((testimonial, idx) => (
            <Testimonial {...testimonial} key={idx} />
          ))}
        </div>
        <div className="mt-4">
          <PopSuccess show={feedbackSent}>Thank you! We will review your feedback shortly.</PopSuccess>
          {showFeedbackButton && (
            <button className={classNames('btn btn-primary btn-outline')} onClick={() => setModalOpen(true)}>
              Leave feedback
            </button>
          )}
        </div>
      </div>
      <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)}>
        <FeedbackForm loading={loading} onSubmit={sendFeedback} />
      </Modal>
    </Container>
  );
}
