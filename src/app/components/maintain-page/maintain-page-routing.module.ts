import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MaintainPageComponent } from './maintain-page.component';

const routes: Routes = [{ path: '', component: MaintainPageComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MaintainPageRoutingModule { }
