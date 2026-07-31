import React from 'react';
import { clsx } from 'clsx';

import { Icon } from '@/components/Icon/Icon';

interface PopSuccessProps {
  children: React.ReactNode;
}

export function PopSuccess({ children }: PopSuccessProps) {
  return (
    <div
      className={clsx(
        'motion-safe:animate-popin bg-success text-success-content mx-auto flex items-start justify-center gap-1 rounded-lg p-4 text-sm md:items-center md:text-base',
      )}
    >
      <Icon size="xl" name="tick-circle" />
      <span>{children}</span>
    </div>
  );
}
