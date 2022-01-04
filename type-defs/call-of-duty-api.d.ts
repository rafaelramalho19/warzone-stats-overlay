enum Platforms {
  All = 'all',
  Activision = 'acti',
  Battlenet = 'battle',
  PSN = 'psn',
  Steam = 'steam',
  Uno = 'uno',
  XBOX = 'xbl',
}

interface Methods {
  login(username: string, password: string, captureKey?: string, headless?: bool);
  loginWithSSO(sso: string);

  BO4Stats(gamertag: string, platform?: Platforms);
  BO4zm(gamertag: string, platform?: Platforms);

  BO4mp(gamertag: string, platform?: Platforms);

  BO4blackout(gamertag: string, platform?: Platforms);
  BO4friends(gamertag: string, platform?: Platforms);
  BO4combatmp(gamertag: string, platform?: Platforms);
  BO4combatmpdate(gamertag: string, start = 0, end = 0, platform?: Platforms);
  BO4combatzm(gamertag: string, platform?: Platforms);
  BO4combatzmdate(gamertag: string, start = 0, end = 0, platform?: Platforms);
  BO4combatbo(gamertag: string, platform?: Platforms);
  BO4combatbodate(gamertag: string, start = 0, end = 0, platform?: Platforms);
  BO4leaderboard(page, platform?: Platforms);
  MWleaderboard(page, platform?: Platforms);
  MWcombatmp(gamertag: string, platform?: Platforms);
  MWcombatmpdate(gamertag: string, start = 0, end = 0, platform?: Platforms);
  MWcombatwz(gamertag: string, platform?: Platforms);
  MWcombatwzdate(gamertag: string, start = 0, end = 0, platform?: Platforms);
  MWfullcombatmp(gamertag: string, platform?: Platforms);

  MWfullcombatmpdate(gamertag: string, start = 0, end = 0, platform?: Platforms);
  MWfullcombatwz(gamertag: string, platform?: Platforms);
  MWfullcombatwzdate(gamertag: string, start = 0, end = 0, platform?: Platforms);
  MWmp(gamertag: string, platform?: Platforms);
  MWwz(gamertag: string, platform?: Platforms);
  MWBattleData(gamertag: string, platform?: Platforms);
  MWfriends(gamertag: string, platform?: Platforms);
  MWWzfriends(gamertag: string, platform?: Platforms);
  MWstats(gamertag: string, platform?: Platforms);
  MWwzstats(gamertag: string, platform?: Platforms);
  MWweeklystats(gamertag: string, platform?: Platforms);
  MWloot(gamertag: string, platform?: Platforms);
  MWAnalysis(gamertag: string, platform?: Platforms);
  MWMapList(platform?: Platforms);
  MWFullMatchInfomp(matchId, platform?: Platforms);
  MWFullMatchInfowz(matchId, platform?: Platforms);
  CWmp(gamertag: string, platform?: Platforms);
  CWloot(gamertag: string, platform?: Platforms);
  CWAnalysis(gamertag: string, platform?: Platforms);
  CWMapList(platform?: Platforms);
  CWcombatmp(gamertag: string, platform?: Platforms);
  CWcombatdate(gamertag: string, start = 0, end = 0, platform?: Platforms);
  CWFullMatchInfo(matchId, platform?: Platforms);

  VGmp(gamertag: string, platform?: Platforms);
  VGloot(gamertag: string, platform?: Platforms);
  VGAnalysis(gamertag: string, platform?: Platforms);
  VGMapList(platform?: Platforms);
  VGcombatmp(gamertag: string, platform?: Platforms);
  VGcombatdate(gamertag: string, start = 0, end = 0, platform?: Platforms);
  VGFullMatchInfo(matchId, platform?: Platforms);
  GetPurchasablePublic();
  getBundleInformation(title, bundleId);
  friendFeed(gamertag: string, platform?: Platforms);
  getEventFeed();
  getLoggedInIdentities();
  getLoggedInUserInfo();
  FuzzySearch(query, platform?: Platforms);
  getBattlePassInfo(gamertag: string, platform?: Platforms);
  getCodPoints(gamertag: string, platform?: Platforms);
  getBattlePassLoot(season, platform?: Platforms);
  getPurchasable(platform?: Platforms);
  purchaseItem(gamertag: string, item = 'battle_pass_upgrade_bundle_4', platform?: Platforms);
  getGiftableFriends(unoId, itemSku = '432000');
  sendGift(gamertag: string,
    recipientUnoId, senderUnoId, itemSku = '432000', sendingPlatform?: Platforms, platform?: Platforms
  );
  ConnectedAccounts(gamertag: string, platform?: Platforms);
  Presence(gamertag: string, platform?: Platforms);
  Settings(gamertag: string, platform?: Platforms);
  isLoggedIn(): boolean;
}

declare module 'call-of-duty-api' {
  export default function CallOfDutyAPI(options: { platform: Platforms, ratelimit: { maxRequests: Number } }) : Methods;
}
