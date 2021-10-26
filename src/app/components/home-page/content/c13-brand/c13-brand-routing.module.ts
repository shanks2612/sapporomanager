import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { C13BrandComponent } from './c13-brand.component';

const routes: Routes = [{ path: '', component: C13BrandComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class C13BrandRoutingModule { }
