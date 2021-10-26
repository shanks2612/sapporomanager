import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { C2AccountComponent } from './c2-account.component';

const routes: Routes = [{ path: '', component: C2AccountComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class C2AccountRoutingModule { }
