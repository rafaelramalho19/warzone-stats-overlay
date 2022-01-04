import React from 'react';
import '../styles/globals.css';
import { SessionProvider } from 'next-auth/react';
import { AppProps } from 'next/app';
import { NextPage } from 'next';
import Header from '../components/Header/Header';

type NextPageWithLayout = NextPage & {
  noLayout?: boolean
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout
};

function MyApp({ Component, pageProps }: AppPropsWithLayout): React.ReactElement {
  if (Component.noLayout) {
    return <Component {...pageProps} />;
  }

  return (
    <SessionProvider>
      <div className="globalContainer">
        <Header />
        <Component {...pageProps} />
      </div>
    </SessionProvider>
  );
}

export default MyApp;
