import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { OnlyUserAllowService } from './core/service/guards/only-user-allow.service';
import { UserAndGuestAllowService } from './core/service/guards/user-and-guest-allow.service';

const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('./modules/home/home.module').then((m) => m.HomeModule),
  },
  {
    path: 'admin',
    loadChildren: () =>
      import('./modules/admin/admin.module').then((x) => x.AdminModule),
    canActivate: [OnlyUserAllowService],
  },
  {
    path: 'games/falling-stars',
    loadChildren: () =>
      import('./modules/games/falling-stars/falling-stars.module').then(
        (x) => x.FallingStarsModule
      ),
    canActivate: [UserAndGuestAllowService],
  },
  {
    path: 'games/feedback/falling-stars/:code',
    loadChildren: () =>
      import('./modules/games/falling-stars/falling-stars.module').then(
        (x) => x.FallingStarsModule
      ),
  },
  {
    path: 'games/feedback/super-mario/:code',
    loadChildren: () =>
      import('./modules/games/super-mario/super-mario.module').then(
        (x) => x.SuperMarioModule
      ),
  },
  {
    path: 'games/super-mario',
    loadChildren: () =>
      import('./modules/games/super-mario/super-mario.module').then(
        (x) => x.SuperMarioModule
      ),
    canActivate: [UserAndGuestAllowService],
  },
  {
    path: 'word-management',
    loadChildren: () =>
      import('./modules/word-management/word-management.module').then(
        (x) => x.WordManagementModule
      ),
    canActivate: [OnlyUserAllowService],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
