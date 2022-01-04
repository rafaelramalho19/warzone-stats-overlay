import React, { ReactElement } from 'react';
import styles from './ColorPicker.module.css';

type Props = {
  label: string,
  value: any,
  onChange: Function
};

export const ColorPicker = ({ label, value, onChange }: Props): ReactElement => (
  <label className={styles.label}>
    {label}
    :
    {' '}
    <input
      className={styles.colorPickerInput}
      type="color"
      value={value}
      onChange={(ev) => onChange(ev.target.value)}
    />
    <div className={styles.colorPicker} style={{ backgroundColor: value }} />
  </label>
);
