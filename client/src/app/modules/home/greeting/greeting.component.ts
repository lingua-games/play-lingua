import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LocalStorageHelper } from '../../../core/models/local-storage.enum';
import { LocalStorageService } from '../../../core/service/local-storage.service';
import { SecurityService } from '../../../core/service/security.service';

@Component({
  selector: 'app-greeting',
  templateUrl: './greeting.component.html',
  styleUrls: ['./greeting.component.scss'],
})
export class GreetingComponent implements OnInit {
  constructor(
    private router: Router,
    private localStorageService: LocalStorageService,
    private securityService: SecurityService
  ) {}

  ngOnInit(): void {
    if (this.securityService.isLoggedIn()) {
      this.router.navigate(['game-menu']).then();
    }
  }

  playGuest(): void {
    this.localStorageService.save(LocalStorageHelper.isGuest, 'true');
    this.localStorageService.delete(LocalStorageHelper.selectedLanguages);
    this.localStorageService.delete(LocalStorageHelper.defaultLanguages);
    this.router.navigate(['choose-languages']).then();
  }
}
