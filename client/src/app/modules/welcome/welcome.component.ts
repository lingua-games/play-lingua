import { Component, OnInit } from '@angular/core';
import { NavigationStart, Router, RouterOutlet } from '@angular/router';
import {
  animate,
  animateChild,
  group,
  query,
  style,
  transition,
  trigger,
} from '@angular/animations';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.scss'],
})
export class WelcomeComponent implements OnInit {
  style: any = {};

  constructor(private router: Router) {
    router.events.subscribe((val) => {
      if (val instanceof NavigationStart) {
        console.log(this.style.transform);
        if (!this.style.transform) {
          this.style.transform = `rotate(0deg)`;
        }

        const rotateValue = this.style.transform;
        let newRouteValue = +parseInt(rotateValue.substr(7, 3), null);
        newRouteValue = newRouteValue === 0 ? 360 : 0;
        this.style.transition = '2000ms';
        this.style.transform = `rotate(${newRouteValue}deg)`;
      }
    });
  }

  ngOnInit(): void {}

  rotate(): void {}
}
