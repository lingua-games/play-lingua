import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UserModel } from '../models/user.model';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { EditUserModel } from '../models/edit-user.model';
import { LoginResultModel } from '../models/login-result.model';
import { RegisterApiResultModel } from '../models/register-api-result.model';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  userUrl = environment.apiUrl + 'user/';

  constructor(private http: HttpClient) {}

  public add(user: UserModel): Observable<RegisterApiResultModel> {
    return this.http.post<RegisterApiResultModel>(this.userUrl, user);
  }

  public editUser(user: EditUserModel): Observable<LoginResultModel> {
    return this.http.put<LoginResultModel>(this.userUrl + 'update', user);
  }

  public getUserInformation(): Observable<UserModel> {
    return this.http.get<UserModel>(this.userUrl + 'get-user-information');
  }
}
