import { Injectable } from '@angular/core';
import { SecurityService } from '../security.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class UserAndGuestAllowService {
  constructor(public securityService: SecurityService, public router: Router) {}
  canActivate(): boolean {
    if (this.securityService.isGuest() || this.securityService.isLoggedIn()) {
      return true;
    } else {
      this.router.navigate(['./']).then();
      return false;
    }
  }
}
