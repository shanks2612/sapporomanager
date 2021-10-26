import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { C30PermissionComponent } from './c30-permission.component';

const routes: Routes = [{ path: '', component: C30PermissionComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class C30PermissionRoutingModule { }
