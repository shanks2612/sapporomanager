import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { C0HomeadminRoutingModule } from './c0-homeadmin-routing.module';
import { C0HomeadminComponent } from './c0-homeadmin.component';


@NgModule({
  declarations: [
    C0HomeadminComponent
  ],
  imports: [
    CommonModule,
    C0HomeadminRoutingModule
  ]
})
export class C0HomeadminModule { }
