import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { C22SupplierComponent } from './c22-supplier.component';

const routes: Routes = [{ path: '', component: C22SupplierComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class C22SupplierRoutingModule { }
