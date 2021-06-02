import { LanguageModel } from './language.model';

export interface DefaultLanguageModel {
  baseLanguage: LanguageModel;
  targetLanguage: LanguageModel;
}
