import React from 'react';
import classNames from 'class-names';

import { Icon } from './Icon/Icon';

export function PopSuccess({ children }) {
  return (
    <div
      className={classNames(
        'motion-safe:animate-popin flex items-start md:items-center text-white text-sm md:text-base rounded-lg mx-auto gap-1 p-4 bg-success justify-center',
      )}
    >
      <Icon size="xl" name="tick-circle" />
      <span>{children}</span>
    </div>
  );
}
