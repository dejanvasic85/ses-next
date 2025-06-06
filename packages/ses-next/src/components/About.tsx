import React, { useEffect, useState } from 'react';
import classNames from 'class-names';

import { useFeedback } from '../hooks/useFeedback';

import { Container } from './Container';
import { Heading } from './Heading';
import { FeedbackForm } from './FeedbackForm';
import { Modal } from './Modal';
import { Team } from './Team';
import { Testimonial } from './Testimonial';

interface TeamData {
  blurbs?: string[];
  members: {
    avatar: string;
    fullName: string;
    role: string;
  }[];
}

interface TestimonialData {
  date: string;
  comment: string;
  starRating: number;
  reviewer: {
    profilePhotoUrl: string;
    profileUrl: string;
    displayName: string;
  };
  url: string;
}

interface TrainingData {
  trainingTitle: string;
  icon: string;
}

interface AboutProps {
  team: TeamData;
  testimonials: TestimonialData[];
  training: TrainingData[];
  googleReviewsUrl: string;
}

export function About({ team, testimonials, training, googleReviewsUrl }: AboutProps) {
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
      <Team blurbs={team.blurbs ?? []} members={team.members} training={training} />
      <div className="px-4 md:px-8 mx-auto mt-12 text-center">
        <Heading level={2}>What our customers say</Heading>
        <div className="grid lg:grid-cols-3 gap-4 md:gap-8 mt-8">
          {testimonials.map((testimonial, idx) => (
            <Testimonial {...testimonial} key={idx} />
          ))}
        </div>
        <div className="mt-4">
          {showFeedbackButton && (
            <div className="mt-8 flex gap-4 justify-center items-center">
              <a
                href={googleReviewsUrl}
                target="_blank"
                className={classNames('link link-primary link-hover underline')}
              >
                View more reviews on Google
              </a>
            </div>
          )}
        </div>
      </div>
      <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)}>
        <FeedbackForm loading={loading} onSubmit={sendFeedback} />
      </Modal>
    </Container>
  );
}
