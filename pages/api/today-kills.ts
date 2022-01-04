import type { NextApiRequest, NextApiResponse } from 'next';
import { getTodayKills } from '../../controllers/CallOfDutyController';
import { TodayKillsResponse } from '../../types/call-of-duty';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<TodayKillsResponse>,
) {
  const { gamertag, platform, startingHour } = req.query;

  if (!gamertag || typeof gamertag !== 'string') {
    return res.status(400).json({ error: 'Bad input, expected gamertag to be a string' });
  }

  if (platform && typeof platform !== 'string') {
    return res.status(400).json({ error: 'Bad input, expected platform to be a string' });
  }

  try {
    const {
      totalKills, winsToday, maxKills, totalDeaths,
    } = await getTodayKills(gamertag, platform as Platforms, parseInt(startingHour as string, 10));

    return res.status(200).json({
      maxKills,
      totalDeaths,
      totalKills,
      winsToday,
      kdRatio: parseFloat(`${totalKills / (totalDeaths || 1)}`).toFixed(2),
    });
  } catch (e) {
    console.error('Error in gamertag validation', e);

    return res.status(500).json({
      error: 'Server Error',
    });
  }
}
