import { Injectable } from '@angular/core';
import { SecurityService } from '../security.service';
import { ActivatedRoute, Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class UserAndGuestAllowService {
  constructor(
    public securityService: SecurityService,
    public router: Router,
    public route: ActivatedRoute
  ) {}
  canActivate(): boolean {
    this.route.paramMap.subscribe((paramMap) => {
      console.log(paramMap.get('code'));
    });
    return true;

    // debugger;
    // if (this.securityService.isGuest() || this.securityService.isLoggedIn()) {
    //   return true;
    // } else {
    //   this.router.navigate(['./']).then();
    //   return false;
    // }
  }
}
