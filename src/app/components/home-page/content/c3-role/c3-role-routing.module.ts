import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { C3RoleComponent } from './c3-role.component';

const routes: Routes = [{ path: '', component: C3RoleComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class C3RoleRoutingModule { }
