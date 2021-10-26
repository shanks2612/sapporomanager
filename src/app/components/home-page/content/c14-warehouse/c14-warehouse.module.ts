import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { C14WarehouseRoutingModule } from './c14-warehouse-routing.module';
import { C14WarehouseComponent } from './c14-warehouse.component';


@NgModule({
  declarations: [
    C14WarehouseComponent
  ],
  imports: [
    CommonModule,
    C14WarehouseRoutingModule
  ]
})
export class C14WarehouseModule { }
