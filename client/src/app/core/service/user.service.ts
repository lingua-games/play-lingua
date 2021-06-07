import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UserModel } from '../models/user.model';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { EditUserModel } from '../models/edit-user.model';
import { LoginResultModel } from '../models/login-result.model';
import { RegisterApiResultModel } from '../models/register-api-result.model';
import { ApiResult } from '../models/api-result.model';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  userUrl = environment.apiUrl + 'user/';

  constructor(private http: HttpClient) {}

  public add(user: UserModel): Observable<RegisterApiResultModel> {
    return this.http.post<RegisterApiResultModel>(this.userUrl, user);
  }

  forgotPasswordRequest(user: UserModel): Observable<boolean> {
    return this.http.post<boolean>(this.userUrl + 'forgot-password', user);
  }

  public resendActivationCode(user: UserModel): Observable<boolean> {
    return this.http.post<boolean>(
      this.userUrl + 'resend-activation-code',
      user
    );
  }

  public editUser(user: EditUserModel): Observable<LoginResultModel> {
    return this.http.put<LoginResultModel>(this.userUrl + 'update', user);
  }

  public getUserInformation(): Observable<UserModel> {
    return this.http.get<UserModel>(this.userUrl + 'get-user-information');
  }

  public activateUser(user: UserModel): Observable<ApiResult<UserModel>> {
    return this.http.post<ApiResult<UserModel>>(
      this.userUrl + 'activate-user',
      user
    );
  }

  public resetPassword(user: UserModel): Observable<LoginResultModel> {
    return this.http.post<LoginResultModel>(
      this.userUrl + 'reset-password',
      user
    );
  }
}
