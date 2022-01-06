import React from 'react';
import type { NextPage } from 'next';
import { signIn } from 'next-auth/react';
import Head from 'next/head';
import Button from '../components/Button/Button';
import styles from '../styles/Home.module.css';
import GoogleLogo from '../svgs/google';
import TwitchLogo from '../svgs/twitch';

const Home: NextPage = () => (
  <div className={styles.container}>
    <Head>
      <title>Create my Stats Preview</title>
      <meta name="description" content="Generate your stats preview for Call of Duty: Warzone" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <link rel="icon" href="/favicon.ico" />
    </Head>

    <main className={styles.main}>
      <h1 className={styles.title}>
        Welcome to Warzone Stats Overlay Generator.
      </h1>

      <p className={styles.description}>
        Twitch subscribers automatically have access to the bot.
      </p>
      <p className={styles.description}>
        <Button
          className={styles.buttonWrapper}
          theme="twitch"
          onClick={() => signIn('twitch', { callbackUrl: '/twitch' })}
        >
          Login with
          {' '}
          <TwitchLogo width="20" height="20" fill="#FFF" alt="twitch" />
        </Button>
        <Button className={styles.buttonWrapper} onClick={() => signIn('google', { callbackUrl: '/google' })}>
          Login with
          {' '}
          <GoogleLogo width="20" height="20" alt="google" />
        </Button>
      </p>

      <footer className={styles.footer}>
        <i className={styles.footerInfo}>
          Powered by
          {' '}
          <a href="https://twitch.tv/raisingz">Raisingz</a>
        </i>
        <div className={styles.footerInfo}>
          Love my work?
          <a href="https://www.buymeacoffee.com/raisingz"> Pay me a coffee</a>
          <span className={styles.heart}> 💙</span>
        </div>
        <div className={styles.footerInfo}>
          Source Code available
          <a href="https://github.com/rafaelramalho19/warzone-stats-overlay"> in Github</a>
        </div>
      </footer>
    </main>
  </div>
);

export default Home;
