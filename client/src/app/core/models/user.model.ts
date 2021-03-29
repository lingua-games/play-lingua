export interface UserModel {
  id: number;
  email: string;
  displayName: string;
  password: string;
  rePassword: string;
  baseLanguages: string;
  targetLanguages: string;
  isSelectedLanguages: boolean;
  defaultBaseLanguage: number;
  defaultTargetLanguage: number;
  totalScore: number;
}
