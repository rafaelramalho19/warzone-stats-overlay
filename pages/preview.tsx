import React, { ReactNode } from 'react';
import type { NextPage } from 'next';
import Head from 'next/head';
import { Platforms, TodayKillsResponse } from '../types/call-of-duty';

type NextPageWithLayout = NextPage & {
  noLayout?: boolean
};

const getKills = async (gamertag: string, platform: Platforms, startingHour: string) => {
  const response: TodayKillsResponse = await (
    await fetch(`${process.env.URL || ''}/api/today-kills?gamertag=${
      gamertag
    }&platform=${platform}&startingHour=${startingHour}`)
  ).json();

  return {
    kdRatio: response.kdRatio,
    maxKills: response.maxKills,
    totalDeaths: response.totalDeaths,
    totalKills: response.totalKills,
    winsToday: response.winsToday,
  };
};

type Props = {
  kdRatio: string,
  maxKills: TodayKillsResponse['maxKills'],
  totalDeaths: TodayKillsResponse['totalDeaths'],
  totalKills: TodayKillsResponse['totalKills'],
  winsToday: TodayKillsResponse['winsToday'],

  color: string,
  fontFamily: string,
  showEmojies: string,
  showKD: string,
  showKills: string,
  showWins: string,
  startingHour: string,
  textShadow: string,
  useLocalFont: string,
  useUppercase: string,
};

type TextProps = {
  children: ReactNode
};

const Twitch: NextPageWithLayout = ({
  kdRatio,
  maxKills,
  totalKills,
  winsToday,

  color,
  fontFamily,
  showEmojies,
  showKD,
  showKills,
  showWins,
  textShadow,
  useLocalFont,
  useUppercase,
}: Props) => {
  // eslint-disable-next-line react/no-unstable-nested-components
  const Text = ({ children }: TextProps) => (
    <span style={{
      color,
      textShadow: `1px 1px ${textShadow}`,
    }}
    >
      {children}
    </span>
  );

  return (
    <div style={{
      fontFamily: `${fontFamily}, Arial`,
      fontSize: '7vw',
      textTransform: useUppercase ? 'uppercase' : 'none',
    }}
    >
      <Head>
        { useLocalFont !== 'false' ? null
          : <link href={`https://fonts.googleapis.com/css2?family=${fontFamily}&display=swap`} rel="stylesheet" />}
      </Head>
      { showWins === 'true' && (
      <div>
        { showEmojies === 'true' ? '🏆 ' : ' ' }
        <Text>
          Wins:
          {' '}
          {winsToday}
        </Text>
      </div>
      )}
      { showKills === 'true' && (
      <div>
        { showEmojies === 'true' ? '🔝 ' : ' ' }
        <Text>
          Top Kills:
          {' '}
          {maxKills}
        </Text>
      </div>
      )}
      { showKills === 'true' && (
      <div>
        { showEmojies === 'true' ? '⚔️ ' : ' ' }
        <Text>
          Total Kills:
          {' '}
          {totalKills}
        </Text>
      </div>
      )}
      { showKD === 'true' && (
      <div>
        { showEmojies === 'true' ? '⚔️/💀 ' : ' ' }
        <Text>
          KD:
          {' '}
          {kdRatio || 0}
        </Text>
      </div>
      )}
    </div>
  );
};

Twitch.getInitialProps = async ({ query }) => {
  const stats = await getKills(
    query.gamertag as string,
    (query.platform ?? Platforms.Battlenet) as Platforms,
    query.startingHour as string,
  );

  return {
    ...Object.entries(query).reduce((prev, [key, entry]) => ({
      ...prev,
      ...{ [key]: decodeURIComponent(entry as string) },
    }), {}),
    ...stats,
  };
};

Twitch.noLayout = true;

export default Twitch;
