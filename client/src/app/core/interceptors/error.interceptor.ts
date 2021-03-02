import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { SecurityService } from '../service/security.service';
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class ErrorIntercept implements HttpInterceptor {
  constructor(private securityService: SecurityService) {}

  intercept(
    request: HttpRequest<{}>,
    next: HttpHandler
  ): Observable<HttpEvent<{}>> {
    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === 401) {
          this.securityService.logoutOn401();
        }
        if (error.status >= 500 && error.status < 600) {
          return throwError('Unable to perform this action');
        }

        if (error.status === 0) {
          return throwError('No response from server');
        }
        return throwError(error.error);
      })
    );
  }
}
