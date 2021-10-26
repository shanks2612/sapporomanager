import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MaintainPageRoutingModule } from './maintain-page-routing.module';
import { MaintainPageComponent } from './maintain-page.component';


@NgModule({
  declarations: [
    MaintainPageComponent
  ],
  imports: [
    CommonModule,
    MaintainPageRoutingModule
  ]
})
export class MaintainPageModule { }
