import React from 'react';
import { clsx } from 'clsx';

type SectionTone = 'plain' | 'quiet';

interface SectionProps {
  id?: string;
  tone?: SectionTone;
  className?: string;
  children: React.ReactNode;
}

const toneStyles: Record<SectionTone, string> = {
  plain: '',
  quiet: 'surface-quiet border-x-0',
};

/*
 * Consistent vertical rhythm for full-width page sections. The scroll offset
 * clears the sticky navbar (h-16) when a section is reached by anchor link,
 * which the old ad-hoc top padding was standing in for.
 */
export function Section({ id, tone = 'plain', className, children }: SectionProps) {
  return (
    <section id={id} className={clsx('py-16 md:py-24', id && 'scroll-mt-20', toneStyles[tone], className)}>
      {children}
    </section>
  );
}
