'use client';

import type { ReactNode } from 'react';

import { phoneCallEvent, pushEvent } from '@/lib/analytics';
import { toTelHref } from '@/lib/phone';

type CallLinkProps = {
  phone: string;
  className?: string;
  'aria-label'?: string;
  onClick?: () => void;
  children: ReactNode;
};

/**
 * Call link that reports a phone tap as a custom dataLayer event.
 *
 * The event name carries no phone number, so GTM and GA4 keep matching it when
 * the number changes in Sanity. A GTM trigger keyed on the number silently
 * stopped counting when it last changed, see docs/seo-geo/scorecards/2026-09.md.
 */
export const CallLink = ({ phone, className, onClick, children, ...props }: CallLinkProps) => {
  const handleClick = (): void => {
    pushEvent({ event: phoneCallEvent });
    onClick?.();
  };

  return (
    <a href={toTelHref(phone)} className={className} onClick={handleClick} aria-label={props['aria-label']}>
      {children}
    </a>
  );
};
