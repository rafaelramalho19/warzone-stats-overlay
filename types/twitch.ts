export enum TwitchStatus {
  Failed = 'Failed',
  Verified = 'Subscribed',
  NotVerified = 'Not Subscribed',
}

export type TwitchSubStatusResponse = {
  error?: string,
  status: string
};
