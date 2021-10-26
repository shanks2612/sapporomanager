import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NotpermitPageRoutingModule } from './notpermit-page-routing.module';
import { NotpermitPageComponent } from './notpermit-page.component';


@NgModule({
  declarations: [
    NotpermitPageComponent
  ],
  imports: [
    CommonModule,
    NotpermitPageRoutingModule
  ]
})
export class NotpermitPageModule { }
