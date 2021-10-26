import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { C1ProductComponent } from './c1-product.component';

const routes: Routes = [{ path: '', component: C1ProductComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class C1ProductRoutingModule { }
