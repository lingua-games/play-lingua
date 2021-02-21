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
  ngOnInit(): void {}

  getUsername(): string {
    return this.securityService.isLoggedIn()
      ? `Welcome, ${this.securityService.getTokenInformation().displayName}`
      : 'Welcome, guest';
  }

  getTotalScore(): string {
    return this.securityService.getTotalScore();
  }
}
