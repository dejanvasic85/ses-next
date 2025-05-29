import React from 'react';

interface LinkButtonProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  children: React.ReactNode;
}

export const LinkButton = ({ children, ...rest }: LinkButtonProps) => (
  <a className="btn btn-primary text-white" {...rest}>
    {children}
  </a>
);
