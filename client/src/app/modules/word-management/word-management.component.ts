import { Component, OnInit } from '@angular/core';
import { Event, NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-word-management',
  templateUrl: './word-management.component.html',
  styleUrls: ['./word-management.component.scss'],
})
export class WordManagementComponent implements OnInit {
  currentRoute = '';

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.router.events.subscribe(
      (event: Event) => {
        if (event instanceof NavigationEnd) {
          this.currentRoute = event.url;
        }
      },
      () => {},
      () => {}
    );
  }
}
