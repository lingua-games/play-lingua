export class RegisterApiResultModel {
  status: RegisterStatus;
  token: string;
  constructor() {
    this.status = RegisterStatus.NotSet;
    this.token = '';
  }
}

export enum RegisterStatus {
  NotSet = 0,
  EmailSent = 1,
  AlreadyRegistered = 2,
  NeedsChangePassword = 3,
}
