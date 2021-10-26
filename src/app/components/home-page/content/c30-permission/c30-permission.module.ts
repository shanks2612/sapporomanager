import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { C30PermissionRoutingModule } from './c30-permission-routing.module';
import { C30PermissionComponent } from './c30-permission.component';


@NgModule({
  declarations: [
    C30PermissionComponent
  ],
  imports: [
    CommonModule,
    C30PermissionRoutingModule
  ]
})
export class C30PermissionModule { }
