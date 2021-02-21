export class UserModel {
  public id: number;
  public email: string;
  public displayName: string;
  public password: string;
  public rePassword: string;
  public baseLanguages: string;
  public targetLanguages: string;
  public isSelectedLanguages: boolean;
  public defaultBaseLanguage: number;
  public defaultTargetLanguage: number;
  public totalScore: number;
}
