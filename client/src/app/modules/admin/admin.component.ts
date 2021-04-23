import { Component, OnInit } from '@angular/core';
import { AdminMenu } from '../../core/models/AdminMenu';
import { NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss'],
})
export class AdminComponent implements OnInit {
  menus: AdminMenu[] = [];
  currentMenu = '';

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.menus = [];
    this.menus.push({
      label: 'View invitations',
      url: './view-invitations',
    } as AdminMenu);
    this.menus.push({
      label: 'Send invitation',
      url: './send-invitation',
    } as AdminMenu);
    this.menus.push({ label: 'Books', url: './books' } as AdminMenu);
    this.menus.push({ label: 'Chapters', url: './chapters' } as AdminMenu);
    this.menus.push({ label: 'Word', url: './words' } as AdminMenu);

    if (this.router.url === '/admin') {
      this.router.navigate(['/admin/view-invitations']).then();
    }

    this.currentMenu = this.router.url.replace('/admin', '.');
    this.router.events.subscribe((val) => {
      if (val instanceof NavigationEnd) {
        this.currentMenu = val.url.replace('/admin', '.');
      }
    });
  }
}
