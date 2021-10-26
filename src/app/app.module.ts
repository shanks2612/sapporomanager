import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NotfoundComponent } from './components/notfound/notfound.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgxSpinnerModule } from "ngx-spinner";
import { NgxPaginationModule } from 'ngx-pagination';
import { HomePageRoutingModule } from './components/home-page/home-page-routing.module';
import { MaintainPageRoutingModule } from './components/maintain-page/maintain-page-routing.module';
import { NotpermitPageRoutingModule } from './components/notpermit-page/notpermit-page-routing.module';
import { WebPageRoutingModule } from './components/web-page/web-page-routing.module';
import { FormDirectiveDirective } from './shared/directive/form-directive.directive';
import { EditorModule } from '@progress/kendo-angular-editor';
import { TreeViewModule } from '@progress/kendo-angular-treeview';
import { NgxCurrencyModule } from 'ngx-currency';
// import { NgSelect2Module } from 'ng-select2';
import { NgSelectModule } from '@ng-select/ng-select';
import { NgxShimmerLoadingModule } from 'ngx-shimmer-loading';
// import { Options } from 'Select2';




@NgModule({
  declarations: [
    AppComponent,
    NotfoundComponent,
    FormDirectiveDirective,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserModule,
    CommonModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot({
      timeOut: 1000,
      positionClass: 'toast-top-right',
      preventDuplicates: true,
    }),
    NgxSpinnerModule,
    NgxPaginationModule,
    HomePageRoutingModule,
    MaintainPageRoutingModule,
    NotpermitPageRoutingModule,
    WebPageRoutingModule,
    EditorModule,
    TreeViewModule,
    NgxCurrencyModule,
    // NgSelect2Module,
    NgSelectModule,
    // BootstrapAutocompleteModule
    NgxShimmerLoadingModule
  ],
  providers: [
    // { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    // { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    // ApiService
  ],

  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppModule { }
