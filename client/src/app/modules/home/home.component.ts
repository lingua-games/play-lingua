import { Component, OnInit } from '@angular/core';
import { NavigationEnd, NavigationStart, Router } from '@angular/router';
import { environment } from '../../../environments/environment';
import { SecurityService } from '../../core/service/security.service';
import { StyleModel } from '../../core/models/style.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  style: StyleModel = {} as StyleModel;
  isLoading?: boolean;

  constructor(
    private router: Router,
    private securityService: SecurityService
  ) {}

  isLoggedIn(): boolean {
    return this.securityService.isLoggedIn();
  }

  ngOnInit(): void {
    this.router.events.subscribe((val) => {
      if (val instanceof NavigationStart) {
        if (
          val.url.indexOf('games/') > -1 ||
          val.url.indexOf('word-management') > -1 ||
          val.url.indexOf('admin') > -1
        ) {
          this.isLoading = true;
          return;
        }
        if (!this.style.transform) {
          this.style.transform = `rotate(0deg)`;
        }

        const rotateValue = this.style.transform;
        let newRouteValue = +parseInt(rotateValue.substr(7, 3), 0);
        newRouteValue = newRouteValue === 0 ? 360 : 0;
        this.style.transition =
          environment.intervalForRoundMainPage.toString() + 'ms';
        this.style.transform = `rotate(${newRouteValue}deg)`;
      }

      if (val instanceof NavigationEnd) {
        if (val.url.indexOf('games/') > -1 || val.url.indexOf('admin') > -1) {
          this.isLoading = false;
          return;
        }
      }
    });
  }
}
