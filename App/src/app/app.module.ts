import { NgModule, LOCALE_ID, APP_INITIALIZER } from '@angular/core';
import localeGB from '@angular/common/locales/vi';
registerLocaleData(localeGB);
import { registerLocaleData } from '@angular/common';

import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule, Routes } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import 'hammerjs';

import { FuseModule } from '@fuse/fuse.module';
import { FuseProgressBarModule } from '@fuse/components';

import { fuseConfig } from 'app/fuse-config';

import { AppComponent } from 'app/app.component';
import { LayoutModule } from 'app/layout/layout.module';
import { AppConfigService } from './app-config-service.service';
import { ShopComponent } from './main/apps/shop/shop.component';



const appRoutes: Routes = [
    {
        path: '',
        loadChildren: './main/apps/apps.module#AppsModule'
    }
];
const appInitializerFn = (appConfig: AppConfigService) => {
    return () => {
        return appConfig.loadAppConfig();
    }
};


@NgModule({
    declarations: [
        AppComponent,

    ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        HttpClientModule,



        // InMemoryWebApiModule.forRoot(FakeDbService, {
        //     delay             : 0,
        //     passThruUnknownUrl: true
        // }),

        // Material moment date module
        // MatMomentDateModule,

        // Material
        // MatButtonModule,
        // MatIconModule,

        // Fuse modules

        //FuseSharedModule,
        // FuseSidebarModule,
        //FuseThemeOptionsModule,

        // App modules
        LayoutModule
        // ,AppStoreModule

        ///////////////////////////////////
        , TranslateModule.forRoot(),
        RouterModule.forRoot(appRoutes),
        FuseModule.forRoot(fuseConfig),
        FuseProgressBarModule,
    ],
    bootstrap: [
        AppComponent
    ],
    providers: [
        { provide: LOCALE_ID, useValue: "vi" }
        // ,AppConfigService
        // ,{
        //     provide: APP_INITIALIZER,
        //     useFactory: appInitializerFn,
        //     multi: true,
        //     deps: [AppConfigService]
        // }
    ]
})
export class AppModule {

}
