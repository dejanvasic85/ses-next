import React from 'react';
import { clsx } from 'clsx';

type ContainerWidth = 'full' | 'narrow' | 'standard' | 'wide' | 'expanded';
type ContainerElement = 'div' | 'article' | 'section' | 'nav';

interface ContainerOwnProps {
  width?: ContainerWidth;
  as?: ContainerElement;
  className?: string;
  children: React.ReactNode;
}

type ContainerProps = ContainerOwnProps & Omit<React.ComponentPropsWithoutRef<'div'>, keyof ContainerOwnProps>;

const widthStyles: Record<ContainerWidth, string> = {
  full: '',
  narrow: 'max-w-4xl',
  standard: 'max-w-screen-xl',
  wide: 'max-w-screen-lg',
  expanded: 'max-w-screen-2xl',
};

export function Container({ width = 'full', as: Tag = 'div', className, children, ...rest }: ContainerProps) {
  return (
    <Tag className={clsx('container mx-auto px-4 sm:px-6 lg:px-8', widthStyles[width], className)} {...rest}>
      {children}
    </Tag>
  );
}
