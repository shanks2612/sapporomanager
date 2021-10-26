import { NgModule } from "@angular/core";
import { TransferHttpCacheModule } from "@nguniversal/common";
import { NgxSpinnerModule } from "ngx-spinner";
import { ContentComponent } from "./content.component";

@NgModule({
    declarations: [
        ContentComponent,
    ],
    imports: [
        NgxSpinnerModule,
        TransferHttpCacheModule,
    ],
    providers: [],
    entryComponents: [],
})

export class ContentModule { }