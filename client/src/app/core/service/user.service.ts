import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UserModel } from '../models/user.model';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  userUrl = environment.apiUrl + 'user';

  constructor(private http: HttpClient) {}

  public add(user: UserModel): Observable<UserModel> {
    return this.http.post<UserModel>(this.userUrl, user);
  }
}
