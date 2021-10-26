import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NotpermitPageComponent } from './notpermit-page.component';

const routes: Routes = [{ path: '', component: NotpermitPageComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NotpermitPageRoutingModule { }
