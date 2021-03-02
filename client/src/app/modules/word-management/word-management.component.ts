import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router, RouterEvent } from '@angular/router';

@Component({
  selector: 'app-word-management',
  templateUrl: './word-management.component.html',
  styleUrls: ['./word-management.component.scss'],
})
export class WordManagementComponent implements OnInit {
  currentRoute: string;

  constructor(router: Router) {
    router.events.subscribe((event: RouterEvent) => {
      if (event instanceof NavigationEnd) {
        this.currentRoute = event.url;
      }
    });
  }

  ngOnInit(): void {}
}
