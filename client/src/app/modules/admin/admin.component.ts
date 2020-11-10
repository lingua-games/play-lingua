import { Component, OnInit } from '@angular/core';
import { AdminMenu } from '../../core/models/AdminMenu';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss'],
})
export class AdminComponent implements OnInit {
  menus: AdminMenu[] = [];

  constructor() {}

  ngOnInit(): void {
    this.menus = [];
    this.menus.push({ label: 'book', url: './books' } as AdminMenu);
    this.menus.push({ label: 'chapters', url: './chapters' } as AdminMenu);
    this.menus.push({ label: 'word', url: './words' } as AdminMenu);
  }
}
