import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { C20StaffRoutingModule } from './c20-staff-routing.module';
import { C20StaffComponent } from './c20-staff.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';


@NgModule({
  declarations: [
    C20StaffComponent
  ],
  imports: [
    CommonModule,
    C20StaffRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NgxPaginationModule
  ]
})
export class C20StaffModule { }
