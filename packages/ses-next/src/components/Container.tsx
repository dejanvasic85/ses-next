import React from 'react';

interface ContainerProps {
  children: React.ReactNode;
}

export function Container({ children }: ContainerProps) {
  return <div className="container mx-auto px-4 sm:px-6 lg:px-8">{children}</div>;
}
