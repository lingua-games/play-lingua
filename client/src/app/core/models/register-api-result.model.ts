export class RegisterApiResultModel {
  status: RegisterStatus;

  constructor() {
    this.status = RegisterStatus.NotSet;
  }
}

export enum RegisterStatus {
  NotSet = 0,
  EmailSent = 1,
  AlreadyRegistered = 2,
}
