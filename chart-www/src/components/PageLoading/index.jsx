import React from 'react';
import ClassNames from 'classnames';
import Loading from '@/components/Loading';

import styles from './style.scss';

const PageLoading = ({ className, height }) => (
  <div className={ClassNames(styles.container, className)} style={{ height }}>
    <Loading />
  </div>
);

PageLoading.defaultProps = {
  height: '300px',
};

export default PageLoading;
