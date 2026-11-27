import { CallLink } from '@/components/CallLink';
import { Heading } from '@/components/Heading';
import { Icon } from '@/components/Icon/Icon';

const defaultApplyText = 'Send us an email with your resume, or give us a call for a chat.';

interface CareersApplyProps {
  roleTitle: string;
  applyText: string | null;
  referralText: string | null;
  phone: string;
  email: string | null;
}

export function CareersApply({ roleTitle, applyText, referralText, phone, email }: CareersApplyProps) {
  const mailtoHref = email ? `mailto:${email}?subject=${encodeURIComponent(`Application: ${roleTitle}`)}` : null;

  return (
    <section id="apply" className="surface-card bg-ambient rounded-xl px-6 py-8 text-center sm:px-10">
      <Heading level={2}>How to apply</Heading>
      <p className="text-base-content/70 mx-auto mb-2 max-w-prose md:text-lg">{applyText ?? defaultApplyText}</p>
      {mailtoHref && (
        <p className="mb-6 md:text-lg">
          Email{' '}
          <a href={mailtoHref} className="link link-primary font-semibold break-all">
            {email}
          </a>
        </p>
      )}
      <div className="flex flex-col items-center justify-center gap-3 sm:flex-row">
        {mailtoHref && (
          <a href={mailtoHref} className="btn btn-primary btn-lg gap-2 rounded-full">
            <Icon name="envelope" size="md" />
            Email your resume
          </a>
        )}
        <CallLink phone={phone} className="btn btn-outline btn-primary btn-lg gap-2 rounded-full">
          <Icon name="phone" size="md" />
          Call {phone}
        </CallLink>
      </div>
      {referralText && (
        <div className="border-base-300 mx-auto mt-8 max-w-prose border-t pt-6">
          <p className="text-primary mb-1 inline-flex items-center gap-2 font-semibold">
            <Icon name="user-plus" size="sm" />
            Know someone?
          </p>
          <p className="text-base-content/70">{referralText}</p>
        </div>
      )}
    </section>
  );
}
