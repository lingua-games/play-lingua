import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

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
  },
  {
    path: 'games/falling-stars',
    loadChildren: () =>
      import('./modules/games/falling-stars/falling-stars.module').then(
        (x) => x.FallingStarsModule
      ),
  },
  {
    path: 'games/super-mario',
    loadChildren: () =>
      import('./modules/games/super-mario/super-mario.module').then(
        (x) => x.SuperMarioModule
      ),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
