import { Injectable } from '@angular/core';
import { SecurityService } from '../security.service';
import { Router } from '@angular/router';
import { LocalStorageHelper } from '../../models/local-storage.enum';
import { LocalStorageService } from '../local-storage.service';

@Injectable({
  providedIn: 'root',
})
export class VerifyTokenService {
  constructor(
    public securityService: SecurityService,
    public router: Router,
    public localStorageService: LocalStorageService
  ) {}
  canActivate(): boolean {
    if (this.localStorageService.load(LocalStorageHelper.token)) {
      const token = this.securityService.getTokenInformation();
      console.log(token);
      if (token && JSON.parse(token?.needsResetPassword)) {
        this.router.navigate(['./reset-password']).then();
        return false;
      }
    }
    return true;
  }
}
