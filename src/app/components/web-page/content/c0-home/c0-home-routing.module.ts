import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { C0HomeComponent } from './c0-home.component';

const routes: Routes = [{ path: '', component: C0HomeComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class C0HomeRoutingModule { }
