import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { C0HomeadminComponent } from './c0-homeadmin.component';

const routes: Routes = [{ path: '', component: C0HomeadminComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class C0HomeadminRoutingModule { }
