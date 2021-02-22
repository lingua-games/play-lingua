import { Component, OnInit } from '@angular/core';
import { SecurityService } from '../../../core/service/security.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-top-navbar',
  templateUrl: './top-navbar.component.html',
  styleUrls: ['./top-navbar.component.scss'],
})
export class TopNavbarComponent implements OnInit {
  constructor(
    private securityService: SecurityService,
    private router: Router
  ) {
    this.showFullSize = this.router.url.indexOf('games') < 0;
  }

  showFullSize = true;
  totalScore: string;
  ngOnInit(): void {
    this.securityService.getTotalScore().subscribe(
      (res: string) => {
        if (res !== 'loading') {
          this.totalScore = (Math.round(+res * 10) / 10).toString();
        } else {
          this.totalScore = res;
        }
      },
      () => {}
    );
    this.securityService.setTotalScore('0');
  }

  getUsername(): string {
    return this.securityService.isLoggedIn()
      ? `Welcome, ${this.securityService.getTokenInformation().displayName}`
      : 'Welcome, guest';
  }
}
