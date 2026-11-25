import { CallLink } from '@/components/CallLink';
import { Heading } from '@/components/Heading';
import { Icon } from '@/components/Icon/Icon';

const defaultApplyText = 'Give us a call for a chat, or email your resume and we will get back to you.';

interface CareersApplyProps {
  roleTitle: string;
  applyText: string | null;
  phone: string;
  email: string | null;
}

export function CareersApply({ roleTitle, applyText, phone, email }: CareersApplyProps) {
  const mailtoHref = email ? `mailto:${email}?subject=${encodeURIComponent(`Application: ${roleTitle}`)}` : null;

  return (
    <section id="apply" className="surface-card bg-ambient rounded-xl px-6 py-8 text-center sm:px-10">
      <Heading level={2}>How to apply</Heading>
      <p className="text-base-content/70 mx-auto mb-6 max-w-prose md:text-lg">{applyText ?? defaultApplyText}</p>
      <div className="flex flex-col items-center justify-center gap-3 sm:flex-row">
        <CallLink phone={phone} className="btn btn-primary btn-lg gap-2 rounded-full">
          <Icon name="phone" size="md" />
          Call {phone}
        </CallLink>
        {mailtoHref && (
          <a href={mailtoHref} className="btn btn-outline btn-primary btn-lg gap-2 rounded-full">
            <Icon name="envelope" size="md" />
            Email your resume
          </a>
        )}
      </div>
    </section>
  );
}
