import React from 'react';
import classNames from 'class-names';

interface HeadingProps {
  level: 1 | 2 | 3 | 4 | 5 | 6;
  className?: string;
  children: React.ReactNode;
}

const baseStyles = 'font-display text-base-content text-center mb-4 md:mb-6 text-balance';

const levelStyles: Partial<Record<HeadingProps['level'], string>> = {
  1: 'text-3xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl',
  2: 'text-2xl font-bold tracking-tight lg:text-3xl',
  3: 'text-xl font-semibold tracking-tight lg:text-2xl',
};

export function Heading({ level, className, children }: HeadingProps) {
  return React.createElement(
    `h${level}`,
    {
      className: classNames(baseStyles, levelStyles[level], className),
    },
    children,
  );
}
