import React from 'react';
import ClassNames from 'classnames';

import styles from './style.scss';

const Iconfont = ({ tag, name, className, style, children, ...props }) => React.createElement(
  tag,
  { ...props || {}, className: ClassNames(styles.iconfont, styles[`icon-${name}`], className), style },
  children,
);

Iconfont.defaultProps = {
  tag: 'i',
};

export default Iconfont;
