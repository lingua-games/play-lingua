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
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === 401) {
          this.securityService.logoutOn401();
        }
        return throwError(error.error);
      })
    );
  }
}
