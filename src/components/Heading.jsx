import React from 'react';
import classNames from 'class-names';

export function Heading({ level, children }) {
  return React.createElement(
    `h${level}`,
    {
      className: classNames('text-gray-700 text-center mb-4 md:mb-6', {
        ['text-2xl sm:text-5xl lg:text-6xl, font-extrabold']: level === 1,
        ['text-2xl lg:text-3xl font-bold']: level === 2,
      }),
    },
    children,
  );
}
