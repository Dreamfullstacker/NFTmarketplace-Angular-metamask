import { NotFoundComponent } from './pages/not-found/not-found.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule, } from '@angular/common';
import { BrowserModule  } from '@angular/platform-browser';
import { AuthGuard } from './_guards/auth.guard'

const routes: Routes = [
  { path: 'auth', loadChildren: () => import('./pages/auth/auth.module').then(m => m.AuthModule) },
  { path: '', loadChildren: () => import('./pages/main/main.module').then(m => m.MainModule) },
  { path: '**', component: NotFoundComponent },
];
@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    RouterModule.forRoot(routes, {
      useHash: true,
      anchorScrolling: 'enabled',
      scrollPositionRestoration: 'top',
    }),
  ],
  exports: [],
})
export class AppRoutingModule {}