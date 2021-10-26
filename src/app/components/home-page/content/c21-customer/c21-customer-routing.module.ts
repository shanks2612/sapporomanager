import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { C21CustomerComponent } from './c21-customer.component';

const routes: Routes = [{ path: '', component: C21CustomerComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class C21CustomerRoutingModule { }
