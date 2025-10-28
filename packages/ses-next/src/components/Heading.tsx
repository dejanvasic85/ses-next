import React from 'react';
import classNames from 'classnames';

interface HeadingProps {
  level: 1 | 2 | 3 | 4 | 5 | 6;
  children: React.ReactNode;
}

export function Heading({ level, children }: HeadingProps) {
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
