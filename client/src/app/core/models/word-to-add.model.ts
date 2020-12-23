export class WordToAddModel {
  base: SourceTargetModel;
  targets: SourceTargetModel[];
}

export class SourceTargetModel {
  value: string;
  isValid?: boolean;
}
