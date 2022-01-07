import classNames from 'classnames';
import React, { ReactElement, useEffect, useState } from 'react';
import { Platforms } from '../../types/call-of-duty';
import Button from '../Button/Button';
import { Checkbox } from '../Checkbox/Checkbox';
import { ColorPicker } from '../ColorPicker/ColorPicker';
import { RangeInput } from '../RangeInput/RangeInput';

import styles from './LinkGeneratorInputs.module.css';

type Props = {
  gamertag: string,
  platform: Platforms
};

export default function LinkGeneratorInputs({ gamertag, platform }: Props) : ReactElement {
  const [showKills, setShowKills] = useState(true);
  const [showWins, setShowWins] = useState(true);
  const [showEmojies, setShowEmojies] = useState(true);
  const [showKD, setShowKD] = useState(false);
  const [useUppercase, setUppercase] = useState(true);

  const [color, setColor] = useState('#FFF');
  const [textShadow, setTextShadow] = useState('#000');
  const [startingHour, setStartingHour] = useState(13);
  const [useLocalFont, setLocalFontUsage] = useState(false);
  const [fontFamily, setFontFamily] = useState('Patrick Hand');

  const [queryParams, setQueryParams] = useState('');

  useEffect(() => {
    setQueryParams(new URLSearchParams({
      gamertag: encodeURIComponent(gamertag),
      platform: encodeURIComponent(platform),

      color: encodeURIComponent(color),
      fontFamily: encodeURIComponent(fontFamily),
      showEmojies: encodeURIComponent(showEmojies),
      showKD: encodeURIComponent(showKD),
      showKills: encodeURIComponent(showKills),
      showWins: encodeURIComponent(showWins),
      startingHour: encodeURIComponent(startingHour),
      textShadow: encodeURIComponent(textShadow),
      useLocalFont: encodeURIComponent(useLocalFont),
      useUppercase: encodeURIComponent(useUppercase),
    }).toString());
  }, [
    showKills, showWins, showEmojies, showKD, useUppercase, color,
    textShadow, startingHour, useLocalFont, fontFamily, gamertag, platform,
  ]);

  return (
    <div className={styles.container}>
      <div className={styles.row}>
        <Checkbox label="Show Kills" onChange={() => setShowKills(!showKills)} value={showKills} />
        <Checkbox label="Show Wins" onChange={() => setShowWins(!showWins)} value={showWins} />
        <Checkbox label="Use Emojies" onChange={() => setShowEmojies(!showEmojies)} value={showEmojies} />
        <Checkbox label="Uppercase Text" onChange={() => setUppercase(!useUppercase)} value={useUppercase} />
        <Checkbox label="Show KD" onChange={() => setShowKD(!showKD)} value={showKD} />
      </div>

      <div className={classNames(styles.row, styles.textContainer)}>
        <ColorPicker label="Text Color" onChange={setColor} value={color} />
        <ColorPicker label="Text Shadow" onChange={setTextShadow} value={textShadow} />
        <RangeInput label="Starting Hour" onChange={setStartingHour} value={startingHour} />
      </div>
      <div className={classNames(styles.row, styles.fontContainer)}>
        <div className={styles.textInput}>
          Google fonts family:
          <input
            type="text"
            placeholder="Font family"
            value={fontFamily}
            onChange={(ev) => setFontFamily(ev.target.value)}
          />
        </div>
        <Checkbox label="Use local font" onChange={() => setLocalFontUsage(!useLocalFont)} value={useLocalFont} />
      </div>

      <div className={classNames(styles.row, styles.lastRow)}>
        <iframe className={styles.preview} src={`/preview?${queryParams}`} title="preview" frameBorder="0" />
      </div>
      <Button
        className={styles.copy}
        onClick={() => {
          navigator.clipboard.writeText(`${window.location.origin}/preview?${queryParams}`);
        }}
      >
        Copy to Clipboard

      </Button>
    </div>
  );
}
