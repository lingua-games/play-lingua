import { UserModel } from './user.model';

export class LoginResultModel {
  public isLogin?: boolean;
  public message?: string;
  public user?: UserModel;
  public token?: string;
}
