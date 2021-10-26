import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { C2AccountRoutingModule } from './c2-account-routing.module';
import { C2AccountComponent } from './c2-account.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';
import { PhoneFormatPipe } from 'src/app/shared/pipe/format/phone-format.pipe';


@NgModule({
  declarations: [
    C2AccountComponent,
    PhoneFormatPipe
  ],
  imports: [
    CommonModule,
    C2AccountRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NgxPaginationModule,
  ]
})
export class C2AccountModule { }
