import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LocalStorageHelper } from '../../../core/models/local-storage.enum';
import { LocalStorageService } from '../../../core/service/local-storage.service';

@Component({
  selector: 'app-greeting',
  templateUrl: './greeting.component.html',
  styleUrls: ['./greeting.component.scss'],
})
export class GreetingComponent {
  constructor(
    private router: Router,
    private localStorageService: LocalStorageService
  ) {}

  playGuest(): void {
    this.localStorageService.save(LocalStorageHelper.isGuest, 'true');
    this.localStorageService.delete(LocalStorageHelper.selectedLanguages);
    this.localStorageService.delete(LocalStorageHelper.defaultLanguages);
    this.router.navigate(['choose-languages']).then();
  }
}
