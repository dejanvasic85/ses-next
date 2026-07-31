import React from 'react';
import { clsx } from 'clsx';

type LinkButtonVariant = 'primary' | 'glass' | 'ghost';

interface LinkButtonProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  variant?: LinkButtonVariant;
  children: React.ReactNode;
}

const variantStyles: Record<LinkButtonVariant, string> = {
  primary: 'btn-primary',
  glass: 'surface-glass text-base-content hover:bg-base-200 border-0',
  ghost: 'btn-outline btn-primary',
};

export const LinkButton = ({ variant = 'primary', className, children, ...rest }: LinkButtonProps) => (
  <a className={clsx('btn', variantStyles[variant], className)} {...rest}>
    {children}
  </a>
);
