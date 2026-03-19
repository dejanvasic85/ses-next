import classNames from 'class-names';

import { Container } from '@/components/Container';
import { Heading } from '@/components/Heading';
import { Icon } from '@/components/Icon/Icon';
import { Team } from '@/components/Team';
import { Testimonial } from '@/components/Testimonial';
import { Team as TeamType } from '@/types';

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
  team: TeamType;
  testimonials: TestimonialData[];
  training: TrainingData[];
  googleReviewsUrl: string | null;
}

export function About({ team, testimonials, training, googleReviewsUrl }: AboutProps) {
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
        {googleReviewsUrl && (
          <div className="mt-8 mb-12">
            <div className="mt-8 flex gap-4 justify-center items-center">
              <a
                href={googleReviewsUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="View more reviews on Google (opens in new tab)"
                className="btn btn-lg btn-primary btn-outline inline-flex items-center gap-2"
              >
                View more reviews on Google
                <Icon name="external-link" size="sm" />
              </a>
            </div>
          </div>
        )}
      </div>
    </Container>
  );
}
