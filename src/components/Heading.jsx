import React from 'react';
import classNames from 'class-names';

export function Heading({ level, children }) {
  return React.createElement(
    `h${level}`,
    {
      className: classNames('text-gray-800 font-bold text-center mb-4 md:mb-6', {
        ['text-2xl lg:text-3xl']: level === 2,
      }),
    },
    children,
  );
}
