import { Injectable } from '@angular/core';
import { SecurityService } from '../security.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class OnlyUserAllowService {
  constructor(public securityService: SecurityService, public router: Router) {}
  canActivate(): boolean {
    const isLoggedIn = this.securityService.isLoggedIn();
    if (isLoggedIn.success) {
      return true;
    } else {
      this.router.navigate([isLoggedIn.route]).then();
      return false;
    }
  }
}
