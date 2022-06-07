import React from 'react';
import ClassNames from 'classnames';

import styles from './style.scss';

const Loading = ({ className, width, color, ...props }) => (
  <div className={ClassNames(styles.container, className)} {...props}>
    <svg viewBox="25 25 50 50" className={styles.svg}>
      <circle cx="50" cy="50" r="20" fill="none" className={styles.circle} style={{ color, strokeWidth: `${width}px` }} />
    </svg>
  </div>
);

Loading.defaultProps = {
  width: 3,
  color: '#5470c6',
};

export default Loading;
