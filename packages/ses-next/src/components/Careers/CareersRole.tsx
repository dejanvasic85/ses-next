import { CareersApply } from '@/components/Careers/CareersApply';
import { CareersList } from '@/components/Careers/CareersList';
import { Container } from '@/components/Container';
import { Heading } from '@/components/Heading';
import { Icon } from '@/components/Icon/Icon';
import { PageSection } from '@/components/PageSection';
import type { CareersContent, EmploymentType } from '@/types';

const employmentTypeLabelValue: Record<EmploymentType, string> = {
  FULL_TIME: 'Full time',
  PART_TIME: 'Part time',
  CONTRACTOR: 'Contractor',
  TEMPORARY: 'Casual',
};

const chipStyles = 'bg-base-200 text-base-content/80 inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-sm';

interface CareersRoleProps {
  careers: CareersContent;
  location: string | null;
  phone: string;
  email: string | null;
}

export function CareersRole({ careers, location, phone, email }: CareersRoleProps) {
  const { roleTitle, heading, intro, employmentType, responsibilities, requirements, benefits, applyText } = careers;

  return (
    <PageSection>
      <Container width="wide" as="article">
        <header className="mb-10 text-center md:mb-14">
          <p className="text-primary mb-3 text-sm font-semibold tracking-widest uppercase">Careers</p>
          <Heading level={1}>{heading}</Heading>
          <div className="mb-6 flex flex-wrap justify-center gap-2">
            <span className={chipStyles}>
              <Icon name="clock" size="sm" />
              {employmentTypeLabelValue[employmentType]}
            </span>
            {location && (
              <span className={chipStyles}>
                <Icon name="home" size="sm" />
                {location}
              </span>
            )}
          </div>
          {intro.map((paragraph) => (
            <p key={paragraph} className="text-base-content/70 mx-auto mb-4 max-w-prose md:text-lg">
              {paragraph}
            </p>
          ))}
          <a href="#apply" className="btn btn-primary mt-2 rounded-full">
            Apply now
            <Icon name="arrow-right" size="sm" />
          </a>
        </header>

        <div className="mb-10 grid gap-6 md:mb-14 lg:grid-cols-3">
          <CareersList title="What you'll do" items={responsibilities} />
          <CareersList title="What you'll need" items={requirements} />
          <CareersList title="What we offer" items={benefits} />
        </div>

        <CareersApply roleTitle={roleTitle} applyText={applyText} phone={phone} email={email} />
      </Container>
    </PageSection>
  );
}
