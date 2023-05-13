import React from 'react';

export const LinkButton = ({ children, ...rest }) => (
  <a className="btn btn-primary text-white" {...rest}>
    {children}
  </a>
);
