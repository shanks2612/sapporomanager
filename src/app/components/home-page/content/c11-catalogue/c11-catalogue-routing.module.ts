import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { C11CatalogueComponent } from './c11-catalogue.component';

const routes: Routes = [{ path: '', component: C11CatalogueComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class C11CatalogueRoutingModule { }
