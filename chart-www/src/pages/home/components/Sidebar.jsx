import React from 'react';
import ClassNames from 'classnames';
import Iconfont from '@/components/Iconfont';
import { empty } from '@/common/utils';
import list from '../data/classify';

import styles from '../style/Sidebar.scss';

const Sidebar = ({ value, onChange }) => {
  const onChangeHandle = (v) => {
    if (v === value) return;

    return onChange(v);
  };

  return (
    <nav className={styles.container}>
      {list.map((row, index) => (
        <div
          className={ClassNames(styles.item, { [styles.isActive]: value === row.value })}
          onClick={() => onChangeHandle(row.value)}
          key={index}
        >
          <Iconfont className={styles.icon} name={row.icon} />
          <span className={styles.label}>{row.label}</span>
        </div>
      ))}
    </nav>
  );
};

Sidebar.defaultProps = {
  onChange: empty,
};

export default Sidebar;
