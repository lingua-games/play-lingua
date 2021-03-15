import { Component, OnInit } from '@angular/core';
import { SecurityService } from './core/service/security.service';
import { UserService } from './core/service/user.service';
import { UserModel } from './core/models/user.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'client';
  something: string;

  constructor(
    private securityService: SecurityService,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    if (this.securityService.isLoggedIn()) {
      this.getUserInformation();
    }
  }

  getUserInformation(): void {
    this.securityService.initialTotalScore('loading');
    this.userService.getUserInformation().subscribe(
      (res: UserModel) => {
        this.securityService.initialTotalScore(res.totalScore.toString());
      },
      () => {
        this.securityService.initialTotalScore('0');
      }
    );
  }
}
