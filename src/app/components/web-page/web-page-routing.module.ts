import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WebPageComponent } from './web-page.component';

const routes: Routes = [{ path: '', component: WebPageComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WebPageRoutingModule { }
