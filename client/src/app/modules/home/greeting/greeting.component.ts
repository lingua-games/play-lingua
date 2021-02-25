import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LocalStorageHelper } from '../../../core/models/local-storage.enum';

@Component({
  selector: 'app-greeting',
  templateUrl: './greeting.component.html',
  styleUrls: ['./greeting.component.scss'],
})
export class GreetingComponent implements OnInit {
  constructor(private router: Router) {}

  ngOnInit(): void {
    if (localStorage.getItem(LocalStorageHelper.token)) {
      this.router.navigate(['game-menu']).then();
    }
  }

  playGuest(): void {
    localStorage.setItem(LocalStorageHelper.isGuest, 'true');
    localStorage.removeItem(LocalStorageHelper.selectedLanguages);
    this.router.navigate(['choose-languages']).then();
  }
}
