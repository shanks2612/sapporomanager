import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { C11CatalogueRoutingModule } from './c11-catalogue-routing.module';
import { C11CatalogueComponent } from './c11-catalogue.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';
// import { AutofocusFixModule } from 'ngx-autofocus-fix';


@NgModule({
  declarations: [
    C11CatalogueComponent
  ],
  imports: [
    CommonModule,
    C11CatalogueRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NgxPaginationModule,
    // AutofocusFixModule
  ]
})
export class C11CatalogueModule { }
