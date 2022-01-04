import CallOfDutyAPI from 'call-of-duty-api';
import moment from 'moment';
import { Platforms, WZStats } from '../types/call-of-duty';

const api = CallOfDutyAPI({
  platform: Platforms.Battlenet,
  ratelimit: { maxRequests: 10 },
});

api.loginWithSSO(process.env.ACTIVISION_COOKIE || '');

export async function validateGameTag(gamertag: string, platform: Platforms = Platforms.Battlenet) {
  api.loginWithSSO(process.env.ACTIVISION_COOKIE || '');
  const data = await api.MWwzstats(gamertag, platform);

  if (!data) {
    return { valid: false, stats: {} };
  }

  const stats: WZStats = data?.lifetime?.mode?.br?.properties || {};

  return { valid: true, stats };
}

export async function getTodayKills(
  gamertag: string,
  platform: Platforms = Platforms.Battlenet,
  startingHour: number = 13,
) {
  const today = moment();
  let yesterday = moment();
  if (today.hour() > startingHour) {
    yesterday.hour(startingHour);
  } else {
    yesterday = yesterday.subtract(1, 'day');
    yesterday.hour(startingHour);
  }

  const start = yesterday.valueOf();
  const end = today.valueOf();

  const { matches = [] } = await api.MWcombatwzdate(gamertag, start, end, platform);

  let games = matches;
  if (matches.length === 20) {
    // Limit of matches, we need to try from 2 hours to 2 hours
    for (let i: number = 0; i < 12; i += 1) {
      const latestSeconds = games[games.length - 1].utcStartSeconds * 1000;
      // eslint-disable-next-line no-await-in-loop
      const response = await api.MWcombatwzdate(gamertag, start.valueOf(), latestSeconds, platform);
      games = [...games, ...response.matches];

      if (response.matches.length < 20) break;
    }
  }

  const totalKills = games.reduce((prev: number, curr: any) => prev + curr.playerStats.kills, 0);
  const totalDeaths = games.reduce((prev: number, curr: any) => prev + curr.playerStats.deaths, 0);

  const maxKills = games.reduce((prev: number, curr: any) => (
    curr.playerStats.kills > prev ? curr.playerStats.kills : prev
  ), 0);

  const wins = games.filter((x: any) => x.playerStats.teamPlacement === 1);
  const winsToday = wins.length;

  return {
    totalKills, winsToday, maxKills, totalDeaths,
  };
}
