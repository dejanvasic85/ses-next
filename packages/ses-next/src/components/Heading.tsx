import React from 'react';
import classNames from 'class-names';

type HeadingAlign = 'center' | 'left';

interface HeadingProps {
  level: 1 | 2 | 3 | 4 | 5 | 6;
  align?: HeadingAlign;
  className?: string;
  children: React.ReactNode;
}

const baseStyles = 'font-display text-base-content mb-4 md:mb-6 text-balance';

const alignStyles: Record<HeadingAlign, string> = {
  center: 'text-center',
  left: 'text-left',
};

const levelStyles: Partial<Record<HeadingProps['level'], string>> = {
  1: 'text-3xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl',
  2: 'text-2xl font-bold tracking-tight lg:text-3xl',
  3: 'text-xl font-semibold tracking-tight lg:text-2xl',
};

export function Heading({ level, align = 'center', className, children }: HeadingProps) {
  return React.createElement(
    `h${level}`,
    {
      className: classNames(baseStyles, alignStyles[align], levelStyles[level], className),
    },
    children,
  );
}
