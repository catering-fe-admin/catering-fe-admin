import React from 'react';

const ConditionalWrapper = ({
  condition,
  wrapper,
  children,
  passProps = false,
  ...rest
}) => {
  if (passProps) {
    return condition
      ? wrapper({ children, ...rest })
      : React.cloneElement(children, { ...rest });
  } else {
    return condition ? wrapper(children) : children;
  }
};

export default ConditionalWrapper;
