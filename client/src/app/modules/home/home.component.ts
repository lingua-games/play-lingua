import { Component, OnInit } from '@angular/core';
import { NavigationStart, Router } from '@angular/router';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  style: any = {};

  constructor(private router: Router) {
    router.events.subscribe((val) => {
      if (val instanceof NavigationStart) {
        if (!this.style.transform) {
          this.style.transform = `rotate(0deg)`;
        }

        const rotateValue = this.style.transform;
        let newRouteValue = +parseInt(rotateValue.substr(7, 3), null);
        newRouteValue = newRouteValue === 0 ? 360 : 0;
        this.style.transition = environment.intervalForRoundMainPage + 'ms';
        this.style.transform = `rotate(${newRouteValue}deg)`;
      }
    });
  }

  ngOnInit(): void {}

  rotate(): void {}
}
