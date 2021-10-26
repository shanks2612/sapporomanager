import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MaintainPageComponent } from './components/maintain-page/maintain-page.component';
import { NotfoundComponent } from './components/notfound/notfound.component';
import { NotpermitPageComponent } from './components/notpermit-page/notpermit-page.component';

const routes: Routes = [
  // admin
  { path: '', redirectTo: 'web/home', pathMatch: 'full' },

  {
    path: 'manager',
    loadChildren: () =>
      import('./components/home-page/home-page.module').then((m) => m.HomePageModule),
  },

  // login
  { path: 'login', loadChildren: () => import('./components/login/login.module').then(m => m.LoginModule) },

  // register

  // home user
  { path: 'web', loadChildren: () => import('./components/web-page/web-page.module').then(m => m.WebPageModule) },

  { path: 'maintain', component: MaintainPageComponent },

  { path: 'not-permit', component: NotpermitPageComponent },
  { path: 'register', loadChildren: () => import('./components/register/register.module').then(m => m.RegisterModule) },
  

  { path: '**', component: NotfoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
