export interface WordKeyValueModel<T = void> {
  key: string;
  values: T;
  wrongCount?: number;
}
