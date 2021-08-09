// tslint:disable-next-line:no-any
declare const require: any;
const secrets = require('./secretKeys.json');

export const environment = {
  production: true,
  apiUrl: '',
  productionUrl: 'https://playinglingua.com',
  intervalForRoundMainPage: 1500,
  startGameCount: 1000,
  recordCount: 5,
  rankCount: 10,
  secretKeys: secrets,
};
