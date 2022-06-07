import React from 'react';

const defaultZIndex = 1000;
const vars = {
  normal: defaultZIndex,
  header: defaultZIndex + 1,
};

const ZIndex = ({ tag, value, className, style, children, ...props }) => React.createElement(
  tag,
  { ...props || {}, className, style: { ...style || {}, zIndex: value } },
  children,
);

ZIndex.defaultProps = {
  tag: 'div',
  value: vars.normal,
};

ZIndex.value = vars;

export default ZIndex;
