import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomePageRoutingModule } from './home-page-routing.module';
import { HomePageComponent } from './home-page.component';
import { ThemeSettingComponent } from './theme-setting/theme-setting.component';
import { RouterModule } from '@angular/router';
import { MenuComponent } from './menu/menu.component';
import { FooterComponent } from './footer/footer.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { RightSidebarComponent } from './right-sidebar/right-sidebar.component';
import { NgxSpinnerModule } from 'ngx-spinner';
import { TransferHttpCacheModule } from '@nguniversal/common';
import { AuthGuard } from 'src/app/services/_helpers/auth.guard';


@NgModule({
  declarations: [
    HomePageComponent,
    MenuComponent,
    FooterComponent,
    SidebarComponent,
    RightSidebarComponent,
    ThemeSettingComponent
    // ContentComponent,
  ],
  imports: [
    TransferHttpCacheModule,
    CommonModule,
    NgxSpinnerModule,
    HomePageRoutingModule,
    RouterModule.forChild([
      {
        path: '',
        component: HomePageComponent,
        children: [
          {
            path: '',
            loadChildren: () =>
              import('./content/content.module').then((m) => m.ContentModule),
              canActivate: [AuthGuard],
          },
          
        ],
      },
    ]),
  ]
})
export class HomePageModule { }
