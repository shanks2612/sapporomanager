import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { C14WarehouseComponent } from './c14-warehouse.component';

const routes: Routes = [{ path: '', component: C14WarehouseComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class C14WarehouseRoutingModule { }
