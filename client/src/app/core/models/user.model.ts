import { LanguageModel } from './language.model';

export interface UserModel {
  id: number;
  email: string;
  displayName: string;
  password: string;
  rePassword: string;
  isSelectedLanguages: boolean;
  defaultBaseLanguageId: number;
  defaultBaseLanguage: LanguageModel;
  defaultTargetLanguage: LanguageModel;
  defaultTargetLanguageId: number;
  totalScore: number;
  EmailAndDisplayName: string;
  captchaCode: string;
  emailVerificationCode: string;
}
