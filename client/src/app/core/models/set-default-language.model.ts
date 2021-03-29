import { LanguageModel } from './language.model';

export interface SetDefaultLanguageModel {
  defaultBaseLanguage: LanguageModel;
  defaultTargetLanguage: LanguageModel;
}
