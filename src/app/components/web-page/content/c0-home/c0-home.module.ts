import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { C0HomeRoutingModule } from './c0-home-routing.module';
import { C0HomeComponent } from './c0-home.component';
import { NgxShimmerLoadingModule } from 'ngx-shimmer-loading';


@NgModule({
  declarations: [
    C0HomeComponent
  ],
  imports: [
    CommonModule,
    C0HomeRoutingModule,
    NgxShimmerLoadingModule 
  ]
})
export class C0HomeModule { }
