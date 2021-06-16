// tslint:disable-next-line:no-any
declare const require: any;
const secrets = require('./secretKeys.json');

export const environment = {
  production: false,
  apiUrl: 'https://localhost:44319/',
  productionUrl: 'http://localhost:4000',
  intervalForRoundMainPage: 1500,
  startGameCount: 1000,
  recordCount: 5,
  rankCount: 10,
  secretKeys: secrets,
};
