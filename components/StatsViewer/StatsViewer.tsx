import React, { ReactElement } from 'react';
import { WZStats } from '../../types/call-of-duty';
import styles from './StatsViewer.module.css';

interface Props {
  stats: WZStats
}

export default function StatsViewer({ stats }: Props): ReactElement {
  return (
    <div className={styles.container}>
      {Object.entries(stats).filter((stat) => !!stat[1]).map(([key, stat]) => (
        <div className={styles.stat} key={key}>
          { key }
          :
          {' '}
          <b>
            { stat > 1000 ? stat.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') : stat }
          </b>
        </div>
      ))}
    </div>
  );
}
