import { Injectable } from '@angular/core';
import { SecurityService } from '../security.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class OnlyUserAllowService {
  constructor(public securityService: SecurityService, public router: Router) {}
  canActivate(): boolean {
    if (this.securityService.isLoggedIn()) {
      return true;
    } else {
      console.log(this.router.navigate);
      if (this.router.navigate(['./'])) {
        this.router.navigate(['./']).then();
      }
      return false;
    }
  }
}
