import { CommonModule } from '@angular/common';
import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { TransferHttpCacheModule } from "@nguniversal/common";
import { NgxSpinnerModule } from "ngx-spinner";
// import { FooterComponent } from "../footer/footer.component";
// import { MenuComponent } from "../menu/menu.component";
// import { RightSidebarComponent } from "../right-sidebar/right-sidebar.component";
// import { SidebarComponent } from "../sidebar/sidebar.component";
// import { ThemeSettingComponent } from "../theme-setting/theme-setting.component";
import { ContentComponent } from "./content.component";

@NgModule({
    declarations: [
        ContentComponent,
    ],
    imports: [
        NgxSpinnerModule,
        TransferHttpCacheModule,
        CommonModule,
        RouterModule.forChild([
            {
                path: '',
                component: ContentComponent,
                children: [
                    {
                        path: 'home',
                        loadChildren: () => import('./c0-homeadmin/c0-homeadmin.module').then(m => m.C0HomeadminModule)
                    },
                    {
                        path: 'catalogue',
                        loadChildren: () => import('./c11-catalogue/c11-catalogue.module').then(m => m.C11CatalogueModule)
                    },
                    {
                        path: 'product',
                        loadChildren: () => import('./c1-product/c1-product.module').then(m => m.C1ProductModule)
                    },
                    {
                        path: 'brand',
                        loadChildren: () => import('./c13-brand/c13-brand.module').then(m => m.C13BrandModule)
                    },
                    {
                        path: 'warehouse',
                        loadChildren: () => import('./c14-warehouse/c14-warehouse.module').then(m => m.C14WarehouseModule)
                    },
                    {
                        path: 'account',
                        loadChildren: () => import('./c2-account/c2-account.module').then(m => m.C2AccountModule)
                    },
                    {
                        path: 'staff',
                        loadChildren: () => import('./c20-staff/c20-staff.module').then(m => m.C20StaffModule)
                    },
                    {
                        path: 'customer',
                        loadChildren: () => import('./c21-customer/c21-customer.module').then(m => m.C21CustomerModule)
                    },
                    {
                        path: 'supplier',
                        loadChildren: () => import('./c22-supplier/c22-supplier.module').then(m => m.C22SupplierModule)
                    },
                    {
                        path: 'role',
                        loadChildren: () => import('./c3-role/c3-role.module').then(m => m.C3RoleModule)
                    },
                    {
                        path: 'permission',
                        loadChildren: () => import('./c30-permission/c30-permission.module').then(m => m.C30PermissionModule)
                    },
                ]
            }
        ])
    ],
    providers: [],
    entryComponents: [],
})

export class ContentModule { }