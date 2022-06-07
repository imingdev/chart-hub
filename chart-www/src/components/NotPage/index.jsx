import React from 'react';
import { Link } from 'react-router-dom';
import LogoImage from '@/assets/images/logo.svg';

import styles from './style.scss';

const NotPage = () => (
  <main className={styles.container}>
    <div className={styles.wrapper}>
      <div className={styles.text}>4</div>
      <img className={styles.logo} src={LogoImage} />
      <div className={styles.text}>4</div>
    </div>
    <Link className={styles.button} to="/" replace>返回首页</Link>
  </main>
);

export default NotPage;
