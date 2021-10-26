import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { C21CustomerRoutingModule } from './c21-customer-routing.module';
import { C21CustomerComponent } from './c21-customer.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';


@NgModule({
  declarations: [
    C21CustomerComponent
  ],
  imports: [
    CommonModule,
    C21CustomerRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NgxPaginationModule
  ]
})
export class C21CustomerModule { }
