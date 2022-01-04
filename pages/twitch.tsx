import classNames from 'classnames';
import type { NextPage } from 'next';
import { Session } from 'next-auth';
import { useSession } from 'next-auth/react';
import React, { useEffect, useState } from 'react';
import LinkGenerator from '../components/LinkGenerator/LinkGenerator';
import Loading from '../components/Loading/Loading';
import styles from '../styles/Twitch.module.css';
import CheckmarkIcon from '../svgs/checkmark';
import CrossIcon from '../svgs/cross';
import ErrorIcon from '../svgs/error';
import { TwitchSubStatusResponse, TwitchStatus } from '../types/twitch';

const renderSubscriptionStatus = (subscriptionStatus : TwitchStatus) => (
  <b>
    {subscriptionStatus}
    {subscriptionStatus === TwitchStatus.Verified
    && <CheckmarkIcon width="20" height="20" alt="checkmark" fill="#0F0" />}
    {subscriptionStatus === TwitchStatus.NotVerified
     && <CrossIcon width="20" height="20" alt="" fill="#F00" />}
    {subscriptionStatus === TwitchStatus.Failed
     && <ErrorIcon width="20" height="20" alt="" fill="#F00" />}
  </b>
);

const Twitch: NextPage = () => {
  const [subscriptionStatus, setSubscriptionStatus] = useState('');
  const { data } = useSession();

  useEffect(() => {
    const fetchSubscriptionStatus = async ({ user }: Session) => {
      const res = await fetch(`/api/twitch-sub-status?id=${encodeURIComponent(user?.name ?? '')}`);
      const response: TwitchSubStatusResponse = await res.json();

      if (response.error) {
        console.error(response.error);
      }

      return setSubscriptionStatus(response.status);
    };

    if (data?.user) {
      fetchSubscriptionStatus(data);
    }
  }, [data]);

  const user = data?.user || {};

  return (
    <div className={styles.container}>
      <main className={classNames(styles.main, subscriptionStatus !== '' && styles.subscribed)}>
        <div>
          Your twitch:
          {' '}
          <b>{user.name}</b>
        </div>
        <div>
          Subscription status:
          {' '}
          {subscriptionStatus !== ''
            ? renderSubscriptionStatus(subscriptionStatus as TwitchStatus)
            : (<Loading />)}
        </div>

        { subscriptionStatus === TwitchStatus.Verified && <LinkGenerator  />}
      </main>
    </div>
  );
};

export default Twitch;
