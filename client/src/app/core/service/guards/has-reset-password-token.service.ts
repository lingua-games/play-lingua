import { Injectable } from '@angular/core';
import { SecurityService } from '../security.service';

@Injectable({
  providedIn: 'root',
})
export class HasResetPasswordToken {
  constructor(private securityService: SecurityService) {}
  canActivate(): boolean {
    const needsResetPassword =
      this.securityService.getTokenInformation()?.needsResetPassword;
    if (needsResetPassword) {
      return JSON.parse(needsResetPassword);
    } else {
      return false;
    }
  }
}
