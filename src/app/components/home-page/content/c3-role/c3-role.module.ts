import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { C3RoleRoutingModule } from './c3-role-routing.module';
import { C3RoleComponent } from './c3-role.component';


@NgModule({
  declarations: [
    C3RoleComponent
  ],
  imports: [
    CommonModule,
    C3RoleRoutingModule
  ]
})
export class C3RoleModule { }
