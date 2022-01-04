import type { NextApiRequest, NextApiResponse } from 'next';
import { TwitchStatus, TwitchSubStatusResponse } from '../../types/twitch';
import { checkIfUserIsSubbed } from '../../controllers/TwitchController';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<TwitchSubStatusResponse>,
) {
  const { id } = req.query;

  if (!id || typeof id !== 'string') {
    return res.status(400).json({ error: 'Bad input, expected ID', status: TwitchStatus.Failed });
  }

  const isSubbed = await checkIfUserIsSubbed(id);

  return res.status(200).json({
    status: isSubbed ? TwitchStatus.Verified : TwitchStatus.NotVerified,
  });
}
