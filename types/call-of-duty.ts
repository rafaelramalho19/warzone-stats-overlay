export enum Platforms {
  All = 'all',
  Activision = 'acti',
  Battlenet = 'battle',
  PSN = 'psn',
  Steam = 'steam',
  Uno = 'uno',
  XBOX = 'xbl',
}

export type ValidateGametagResponse = {
  valid?: Boolean,
  stats?: WZStats,
  error?: string,
};

export type TodayKillsResponse = {
  error?: string,
  kdRatio?: string,
  maxKills?: number,
  totalDeaths?: number,
  totalKills?: number,
  winsToday?: number,
};

export type WZStats = {
  cash?: number,
  contracts?: number,
  deaths?: number,
  downs?: number,
  gamesPlayed?: number,
  kdRatio?: string,
  kills?: number,
  objTime?: number,
  revives?: number,
  score?: number,
  scorePerMinute?: number,
  timePlayed?: number,
  tokens?: number,
  topFive?: number,
  topTen?: number,
  topTwentyFive?: number,
  wins?: number,
};
