import { LanguageModel } from './language.model';

export interface DefaultLanguageModel {
  defaultBaseLanguage: LanguageModel;
  defaultTargetLanguage: LanguageModel;
}
