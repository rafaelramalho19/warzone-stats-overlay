const RAISING_ID = '35961576';
const tokenFetchUrl = `https://id.twitch.tv/oauth2/token?${new URLSearchParams({
  client_id: process.env.TWITCH_CLIENT_ID || '',
  client_secret: process.env.TWITCH_CLIENT_SECRET || '',
  refresh_token: process.env.TWITCH_REFRESH_TOKEN || '',
  grant_type: 'refresh_token',
}).toString()}`;

export type SubscriptionData = {
  broadcaster_id: string,
  broadcaster_login: string,
  broadcaster_name: string,
  gifter_id: string,
  gifter_login: string,
  gifter_name: string,
  is_gift: Boolean,
  plan_name: string,
  tier: string,
  user_id: string,
  user_login: string,
  user_name: string,
};

export type SubscriptionsResponse = {
  data: SubscriptionData[],
  pagination?: {
    cursor: string,
  },
  points: Number
};

export async function getSubscriberList(paginationToken?: string) {
  const { access_token: accessToken } = await (await fetch(tokenFetchUrl, { method: 'POST' })).json();

  const response: SubscriptionsResponse = await (
    await fetch(`https://api.twitch.tv/helix/subscriptions?${new URLSearchParams({
      broadcaster_id: RAISING_ID,
      ...(paginationToken && { after: paginationToken }),
    }).toString()}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Client-Id': process.env.TWITCH_CLIENT_ID || '',
      },
    })).json();

  return response;
}

export async function checkIfUserIsSubbed(id: string, prevPagination?: string): Promise<boolean> {
  const { data: subs, pagination } = await getSubscriberList(prevPagination);
  if (!subs) {
    return false;
  }

  const isSubbed = subs.some((sub) => sub.user_name.toLowerCase() === id.toLowerCase());

  if (!isSubbed && pagination?.cursor) {
    return checkIfUserIsSubbed(id, pagination.cursor);
  }

  return isSubbed;
}
