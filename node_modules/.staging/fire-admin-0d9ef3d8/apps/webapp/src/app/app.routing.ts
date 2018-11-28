import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    children: [
      { path: '', redirectTo: 'home', pathMatch: 'full' },
      { path: 'home', loadChildren: 'app/home/home.module#HomeModule' },
      { path: 'admin', loadChildren: 'app/admin/admin.module#AdminModule' },
      { path: 'auth', loadChildren: 'app/auth/auth.module#AuthModule' },
    ]
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { useHash: true }),
  ],
  exports: [
    RouterModule,
  ],
})
export class AppRoutingModule { }
