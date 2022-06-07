import React from 'react';
import { Link } from 'react-router-dom';
import ClassNames from 'classnames';
import ZIndex from '@/components/ZIndex';
import Image from '@/components/Image';
import LogoImage from '@/assets/images/logo.svg';

import styles from './style.scss';

const Header = ({ isFixed }) => (
  <ZIndex className={styles.container} tag="header" value={ZIndex.value.header}>
    <div className={ClassNames(styles.inner, { [styles.isFixed]: isFixed })}>
      <Link className={styles.logo} to="/">
        <Image className={styles.logoIcon} src={LogoImage} />
        <div className={styles.logoText}>CHART</div>
      </Link>
    </div>
  </ZIndex>
);

Header.defaultProps = {
  isFixed: true,
};

export default Header;
