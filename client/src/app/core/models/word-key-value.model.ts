export interface WordKeyValueModel<T = void> {
  key: string;
  translates: T;
  wrongCount?: number;
  speechCode: string;
  speechStatus: SpeechStatus;
}

export enum SpeechStatus {
  NotFound = 0,
  Success = 1,
  Error = 2,
}

export class TranslateModel {
  public speechCode?: string;
  public speechStatus?: SpeechStatus;
  public value?: string;
}
