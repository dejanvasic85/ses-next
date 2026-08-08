import React from 'react';
import { clsx } from 'clsx';

type PageSectionTone = 'base' | 'muted';

interface PageSectionProps {
  tone?: PageSectionTone;
  className?: string;
  children: React.ReactNode;
}

const toneStyles: Record<PageSectionTone, string> = {
  base: 'bg-base-100',
  muted: 'bg-base-200',
};

export function PageSection({ tone = 'base', className, children }: PageSectionProps) {
  return <div className={clsx(toneStyles[tone], 'py-6 sm:py-8 lg:py-12', className)}>{children}</div>;
}
