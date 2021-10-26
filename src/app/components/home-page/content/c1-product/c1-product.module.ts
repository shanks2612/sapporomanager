import { TreeViewModule } from '@progress/kendo-angular-treeview';
import { EditorModule } from '@progress/kendo-angular-editor';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { C1ProductRoutingModule } from './c1-product-routing.module';
import { C1ProductComponent } from './c1-product.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';
import { NgxCurrencyModule } from 'ngx-currency';
// import { NgSelect2Module } from 'ng-select2';
import { NgSelectModule } from '@ng-select/ng-select';

@NgModule({
  declarations: [
    C1ProductComponent
  ],
  imports: [
    CommonModule,
    C1ProductRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NgxPaginationModule,
    EditorModule,
    TreeViewModule,
    NgxCurrencyModule,
    // NgSelect2Module,
    NgSelectModule
  ]
})
export class C1ProductModule { }
