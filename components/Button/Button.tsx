import React, { MouseEventHandler, ReactElement } from 'react';
import classNames from 'classnames';
import styles from './Button.module.css';

interface Props {
  className?: string,
  children: React.ReactNode,
  onClick: MouseEventHandler,
  theme?: string,
  type?: 'button' | 'submit',
}

export default function Button({
  className, children, onClick, type = 'button', theme,
}: Props): ReactElement {
  const themeClass = theme === 'twitch' ? styles.buttonTwitchThemed : styles.buttonNormal;
  return (
    // eslint-disable-next-line react/button-has-type
    <button className={classNames(styles.button, className, themeClass)} type={type} onClick={onClick}>
      { children }
    </button>
  );
}
