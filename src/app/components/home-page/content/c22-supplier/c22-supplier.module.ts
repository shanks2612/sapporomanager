import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { C22SupplierRoutingModule } from './c22-supplier-routing.module';
import { C22SupplierComponent } from './c22-supplier.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';


@NgModule({
  declarations: [
    C22SupplierComponent
  ],
  imports: [
    CommonModule,
    C22SupplierRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NgxPaginationModule
  ]
})
export class C22SupplierModule { }
