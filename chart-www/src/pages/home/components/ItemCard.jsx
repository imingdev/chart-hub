import React from 'react';
import { Link } from 'react-router-dom';
import Image from '@/components/Image';

import styles from '../style/ItemCard.scss';

const ItemCard = ({ id, label, image }) => (
  <div className={styles.container}>
    <Link className={styles.image} to={`/chart/${id}`} target="_blank">
      <Image className={styles.imageInner} src={image} defaultSrc={image.replace(/.[^/.]+$/, '.jpg')} alt={label} />
    </Link>
    <div className={styles.label} title={label}>{label}</div>
  </div>
);

export default ItemCard;
