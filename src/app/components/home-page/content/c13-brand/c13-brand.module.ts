import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { C13BrandRoutingModule } from './c13-brand-routing.module';
import { C13BrandComponent } from './c13-brand.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';


@NgModule({
  declarations: [
    C13BrandComponent
  ],
  imports: [
    CommonModule,
    C13BrandRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NgxPaginationModule
  ]
})
export class C13BrandModule { }
