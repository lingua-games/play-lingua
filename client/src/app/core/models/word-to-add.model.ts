export class WordToAddModel {
  base: SourceTargetModel;
  targets: SourceTargetModel[];
}

export interface SourceTargetModel {
  value: string;
  isValid: boolean;
}
