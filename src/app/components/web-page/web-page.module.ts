import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WebPageRoutingModule } from './web-page-routing.module';
import { WebPageComponent } from './web-page.component';
import { BannerComponent } from './banner/banner.component';
import { FooterComponent } from './footer/footer.component';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    WebPageComponent,
    BannerComponent,
    FooterComponent,
  ],
  imports: [
    CommonModule,
    WebPageRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild([
      {
        path: '',
        component: WebPageComponent,
        children: [
          {
            path: '',
            loadChildren: () =>
              import('./content/content.module').then((m) => m.ContentModule),
          },
          {
            path: 'home',
            loadChildren: () => import('./content/c0-home/c0-home.module').then(m => m.C0HomeModule)
          },
        ],
      },
    ]),
  ]
})
export class WebPageModule { }
