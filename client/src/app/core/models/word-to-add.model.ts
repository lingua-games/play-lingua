export class WordToAddModel {
  base: SourceTargetModel = {} as SourceTargetModel;
  targets: SourceTargetModel[] = [];
}

export interface SourceTargetModel {
  value: string;
  isValid: boolean;
}
