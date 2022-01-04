import React, { ReactElement, useEffect, useRef } from 'react';
import { signOut, useSession } from 'next-auth/react';
import Image from 'next/image';
import classNames from 'classnames';
import styles from './Header.module.css';

export default function Header(): ReactElement | null {
  const { data } = useSession();
  const videoRef: React.RefObject<HTMLVideoElement> = useRef(null);

  useEffect(() => {
    videoRef.current?.play?.();
  });

  const user = data?.user || {};

  return (
    <>
      <div className={styles.background}>
        <video ref={videoRef} src="background.mp4" className={styles.video} width="320" height="240" loop muted>
          <source src="https://assets.codepen.io/3364143/7btrrd.mp4" type="video/mp4" />
        </video>
      </div>
      { user.image && (
        <header className={styles.container}>
          <button
            className={classNames(styles.circles, 'unstyledButton')}
            onClick={() => signOut()}
            type="button"
          />
          { user.image && (
            <div className={styles.avatar}>
              <Image src={user.image} width="30" height="30" alt="" />
            </div>
          )}
        </header>
      )}
    </>
  );
}
