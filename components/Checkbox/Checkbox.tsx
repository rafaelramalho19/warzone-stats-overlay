import React, { ReactElement } from 'react';
import styles from './Checkbox.module.css';

type Props = {
  label: string,
  value: any,
  onChange: Function
};

export const Checkbox = ({ label, value, onChange }: Props): ReactElement => (
  <label className={styles.label}>
    <input className={styles.input} type="checkbox" checked={value} onChange={() => onChange()} />
    <div className={styles.checkbox}>
      <svg viewBox="0 0 15 15" className={styles.icon}>
        <path d="M12.613 3.21967C12.9303 2.92678 13.4447 2.92678 13.762 3.21967C14.0793 3.51256 14.0793 3.98744 13.762 4.28033L5.63702 11.7803C5.31972 12.0732 4.80528 12.0732 4.48798 11.7803L1.23798 8.78033C0.920675 8.48744 0.920675 8.01256 1.23798 7.71967C1.55528 7.42678 2.06972 7.42678 2.38703 7.71967L5.0625 10.1893L12.613 3.21967Z" />
      </svg>
    </div>
    {label}
  </label>
);
