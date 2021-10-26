import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { C20StaffComponent } from './c20-staff.component';

const routes: Routes = [{ path: '', component: C20StaffComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class C20StaffRoutingModule { }
