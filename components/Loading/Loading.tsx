import React, { ReactElement } from 'react';
import styles from './Loading.module.css';

export default function Loading(): ReactElement {
  return <div className={styles.spinner} />;
}
