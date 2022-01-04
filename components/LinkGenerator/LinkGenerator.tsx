import React, {
  ReactElement, useCallback, useEffect, useState,
} from 'react';
import classNames from 'classnames';
import styles from './LinkGenerator.module.css';
import BattlenetIcon from '../../svgs/battlenet';
import PlaystationIcon from '../../svgs/playstation';
import XBOXIcon from '../../svgs/xbox';
import { Platforms, ValidateGametagResponse } from '../../types/call-of-duty';
import { useDebounce } from '../../hooks/useDebounce';
import CheckmarkIcon from '../../svgs/checkmark';
import CrossIcon from '../../svgs/cross';
import StatsViewer from '../StatsViewer/StatsViewer';
import LinkGeneratorInputs from './LinkGeneratorInputs';

export default function Loading(): ReactElement {
  const platforms = [
    { name: Platforms.Battlenet, Icon: BattlenetIcon, height: '20' },
    { name: Platforms.PSN, Icon: PlaystationIcon, height: '30' },
    { name: Platforms.XBOX, Icon: XBOXIcon, height: '20' },
  ];
  const defaultPlatform = platforms[0];
  const [selectedPlatform, setSelectedPlatform] = useState(defaultPlatform.name);
  const [selectedTag, setSelectedTag] = useState('');
  const [debouncedGametag, setDebouncedGametag] = useDebounce('', 500);
  const [isTagValid, setTagValid] = useState({ isValid: false, stats: {} });

  const handleOnPlatformChange = useCallback((name: Platforms) => {
    setSelectedPlatform(name);
  }, []);

  const handleOnTagChange = useCallback(({ target }) => {
    setSelectedTag(target.value);
    setDebouncedGametag(target.value);
  }, [setDebouncedGametag]);

  useEffect(() => {
    (async function validateGameTag() {
      const { valid, stats }: ValidateGametagResponse = await (await fetch(`/api/gamertag-validation?gamertag=${
        encodeURIComponent(selectedTag)
      }&platform=${selectedPlatform}`)).json();

      setTagValid({ isValid: !!valid, stats: stats ?? {} });
    }());
  }, [debouncedGametag, selectedPlatform]);

  return (
    <div className={styles.container}>
      <div className={styles.platformContainer}>
        Platform:
        <div className={styles.platforms}>
          {platforms.map(({ height, name, Icon }) => (
            <button
              key={name}
              className={classNames('unstyledButton', styles.platformButton)}
              type="button"
              onClick={() => handleOnPlatformChange(name)}
            >
              <Icon
                alt={name}
                className={classNames(styles.platformIcon, selectedPlatform === name && styles.selectedPlatformIcon)}
                height={height}
              />
            </button>
          ))}
        </div>
        <div className={styles.gameTagContainer}>
          <input
            className={styles.gameTag}
            type="text"
            onChange={handleOnTagChange}
            placeholder="GameTag#12345"
            value={selectedTag}
          />
          { debouncedGametag.length > 0 ? (
            <div className={styles.gameTagValidation}>
              { isTagValid.isValid
                ? <CheckmarkIcon width="20" height="20" alt="valid" fill="#0F0" />
                : <CrossIcon width="20" height="20" alt="not valid" fill="#F00" />}
            </div>
          ) : null}
        </div>

      </div>
      { isTagValid.isValid && <StatsViewer stats={isTagValid.stats} />}
      { isTagValid.isValid && <LinkGeneratorInputs gamertag={selectedTag} platform={selectedPlatform} /> }
    </div>
  );
}
