import {
  HttpEvent,
  HttpHandler,
  HttpRequest,
  HttpErrorResponse,
  HttpInterceptor,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { LocalStorageHelper } from '../models/local-storage.enum';
import { LocalStorageService } from '../service/local-storage.service';

@Injectable()
export class TokenIntercept implements HttpInterceptor {
  constructor(private localStorageService: LocalStorageService) {}
  intercept(
    request: HttpRequest<{}>,
    next: HttpHandler
  ): Observable<HttpEvent<{}>> {
    request = request.clone({
      setHeaders: {
        Authorization: `Bearer ${this.localStorageService.load(
          LocalStorageHelper.token
        )}`,
      },
    });
    return next.handle(request);
  }
}
