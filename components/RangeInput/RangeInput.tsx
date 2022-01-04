import React, { ReactElement } from 'react';
import styles from './RangeInput.module.css';

type Props = {
  label: string,
  value: any,
  onChange: Function
};

export const RangeInput = ({ label, value, onChange }: Props): ReactElement => (
  <label className={styles.label}>
    {label}
    :
    {' '}
    <input
      className={styles.rangeInput}
      type="number"
      step="1"
      min="0"
      max="23"
      value={value}
      onChange={(ev) => onChange(ev.target.value)}
    />
  </label>
);
