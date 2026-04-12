import React from 'react';
import classNames from 'class-names';

import { Icon } from '@/components/Icon/Icon';

interface PopSuccessProps {
  children: React.ReactNode;
}

export function PopSuccess({ children }: PopSuccessProps) {
  return (
    <div
      className={classNames(
        'motion-safe:animate-popin bg-success mx-auto flex items-start justify-center gap-1 rounded-lg p-4 text-sm text-white md:items-center md:text-base',
      )}
    >
      <Icon size="xl" name="tick-circle" />
      <span>{children}</span>
    </div>
  );
}
