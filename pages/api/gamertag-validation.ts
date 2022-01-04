import type { NextApiRequest, NextApiResponse } from 'next';
import { validateGameTag } from '../../controllers/CallOfDutyController';
import { ValidateGametagResponse } from '../../types/call-of-duty';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ValidateGametagResponse>,
) {
  const { gamertag, platform } = req.query;

  if (!gamertag || typeof gamertag !== 'string') {
    return res.status(400).json({ error: 'Bad input, expected gamertag to be a string' });
  }

  if (platform && typeof platform !== 'string') {
    return res.status(400).json({ error: 'Bad input, expected platform to be a string' });
  }

  try {
    const { valid, stats } = await validateGameTag(gamertag, platform as Platforms);

    return res.status(200).json({
      valid,
      stats: {
        wins: stats.wins,
        kills: stats.kills,
        deaths: stats.deaths,
        kdRatio: parseFloat(`${stats.kdRatio}`).toFixed(2),
      },
    });
  } catch (e) {
    console.error('Error in gamertag validation', e);

    return res.status(500).json({
      error: 'Server Error',
    });
  }
}
