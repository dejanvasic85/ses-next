import React from 'react';
import classNames from 'class-names';

import { IconMap } from './IconMap';

const sizeClassMap = {
  xs: 'h-3 w-3',
  sm: 'h-4 w-4',
  md: 'h-5 w-5',
  lg: 'h-6 w-6',
  xl: 'h-7 w-7',
  xxl: 'h-10 w-10',
  xxxl: 'h-12 w-12',
} as const;

type IconSize = keyof typeof sizeClassMap;
type IconName = keyof typeof IconMap;

interface IconProps {
  className?: string;
  name: IconName;
  size?: IconSize;
}

export function Icon({ className = '', name, size = 'md' }: IconProps) {
  const sizeClass = className.includes('h-') || className.includes('w-') ? '' : sizeClassMap[size];
  return React.cloneElement(IconMap[name], { className: classNames(sizeClass, className) });
}
