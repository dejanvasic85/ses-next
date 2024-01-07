export const ConditionalWrap = ({ children, condition, wrapper }) => {
  return condition ? wrapper(children) : children;
};
