import React from 'react';

interface ConditionalWrapProps {
  children: React.ReactNode;
  condition: boolean;
  wrapper: (children: React.ReactNode) => React.ReactNode;
}

export const ConditionalWrap = ({ children, condition, wrapper }: ConditionalWrapProps) => {
  return condition ? wrapper(children) : children;
};
