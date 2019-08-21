import { Component, Inject, OnDestroy, OnInit, AfterViewInit } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { Platform } from '@angular/cdk/platform';
import { TranslateService } from '@ngx-translate/core';
import { Subject, Observable } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { FuseConfigService } from '@fuse/services/config.service';
import { FuseNavigationService } from '@fuse/components/navigation/navigation.service';
import { FuseSidebarService } from '@fuse/components/sidebar/sidebar.service';
import { FuseSplashScreenService } from '@fuse/services/splash-screen.service';
import { FuseTranslationLoaderService } from '@fuse/services/translation-loader.service';

import { navigation } from 'app/navigation/navigation';
import { locale as navigationEnglish } from 'app/navigation/i18n/en';
import { locale as navigationTurkish } from 'app/navigation/i18n/tr';
import { ActivatedRoute } from '@angular/router';

import { HttpClient, HttpHeaders, HttpParams, HttpRequest, HttpEventType } from '@angular/common/http';
import { HttpParamsOptions } from '@angular/common/http/src/params';
import { environment } from 'environments/environment';

@Component({
    selector: 'app',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
    fuseConfig: any;
    navigation: any;
    _TruongLayout: string = 'shop';
    // Private
    private _unsubscribeAll: Subject<any>;

    /**
     * Constructor
     *
     * @param {DOCUMENT} document
     * @param {FuseConfigService} _fuseConfigService
     * @param {FuseNavigationService} _fuseNavigationService
     * @param {FuseSidebarService} _fuseSidebarService
     * @param {FuseSplashScreenService} _fuseSplashScreenService
     * @param {FuseTranslationLoaderService} _fuseTranslationLoaderService
     * @param {Platform} _platform
     * @param {TranslateService} _translateService
     */
    constructor(
        @Inject(DOCUMENT) private document: any,
        private _fuseConfigService: FuseConfigService,
        private _fuseNavigationService: FuseNavigationService,
        private _fuseSidebarService: FuseSidebarService,
        private _fuseSplashScreenService: FuseSplashScreenService,
        private _fuseTranslationLoaderService: FuseTranslationLoaderService,
        private _translateService: TranslateService,
        private _platform: Platform,
        private _activedRoute: ActivatedRoute,
        private _httpClient: HttpClient
    ) {
        // this._CheckLogin();

        // Get default navigation
        this.navigation = navigation;

        // Register the navigation to the service
        this._fuseNavigationService.register('main', this.navigation);

        // Set the main navigation as our current navigation
        this._fuseNavigationService.setCurrentNavigation('main');

        // Add languages
        this._translateService.addLangs(['en', 'tr']);

        // Set the default language
        this._translateService.setDefaultLang('en');

        // Set the navigation translations
        this._fuseTranslationLoaderService.loadTranslations(navigationEnglish, navigationTurkish);

        // Use a language
        this._translateService.use('en');

        /**
         * ----------------------------------------------------------------------------------------------------
         * ngxTranslate Fix Start
         * ----------------------------------------------------------------------------------------------------
         */

        /**
         * If you are using a language other than the default one, i.e. Turkish in this case,
         * you may encounter an issue where some of the components are not actually being
         * translated when your app first initialized.
         *
         * This is related to ngxTranslate module and below there is a temporary fix while we
         * are moving the multi language implementation over to the Angular's core language
         * service.
         **/

        // Set the default language to 'en' and then back to 'tr'.
        // '.use' cannot be used here as ngxTranslate won't switch to a language that's already
        // been selected and there is no way to force it, so we overcome the issue by switching
        // the default language back and forth.
        /**
         setTimeout(() => {
            this._translateService.setDefaultLang('en');
            this._translateService.setDefaultLang('tr');
         });
         */

        /**
         * ----------------------------------------------------------------------------------------------------
         * ngxTranslate Fix End
         * ----------------------------------------------------------------------------------------------------
         */

        // Add is-mobile class to the body if the platform is mobile
        if (this._platform.ANDROID || this._platform.IOS) {
            this.document.body.classList.add('is-mobile');
        }

        // Set the private defaults
        this._unsubscribeAll = new Subject();




    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void {
        //this._TruongLayout = environment.truong;
        //debugger;
        // let configLayout=localStorage.getItem('configLayout');
        // Subscribe to config changes
        this._fuseConfigService.config
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe((config) => {
                this.fuseConfig = config;
                if (localStorage.getItem('configLayout'))
                    this.fuseConfig = JSON.parse(localStorage.getItem('configLayout'));

                // if (window.location.href.indexOf('/tuyen-sinh/') >= 0 || window.location.pathname == '/')
                // {
                //     this.fuseConfig.layout.style = 'layout-thi-sinh';
                //     return;
                // }
                // Boxed
                if (this.fuseConfig.layout.width === 'boxed') {
                    this.document.body.classList.add('boxed');
                }
                else {
                    this.document.body.classList.remove('boxed');
                }
                if (window.location.pathname.indexOf('/tuyen-sinh') != -1 || window.location.pathname == '/tuyen-sinh' || window.location.pathname == '/') {
                    this.fuseConfig.layout.style = 'layout-thi-sinh';

                }
                // Color theme - Use normal for loop for IE11 compatibility
                for (let i = 0; i < this.document.body.classList.length; i++) {
                    const className = this.document.body.classList[i];

                    if (className.startsWith('theme-')) {
                        this.document.body.classList.remove(className);
                    }
                }

                this.document.body.classList.add(this.fuseConfig.colorTheme);

            });
    }

    _CheckLogin() {
       let code= this._getParameterByName('code',this.document.location.search);
        //let url = new URLSearchParams(this.document.location.search);
        //let code = url.get("code");
        if (code) {
            this._setCode(code);
        }
        else {

            var authData = localStorage.getItem("authorizationData");
            if (authData == null) {
                let urlRedirect = this.document.location.href;
                if (window.location.pathname.indexOf('/tuyen-sinh') == -1 && window.location.pathname != '/tuyen-sinh' && window.location.pathname != '/') {
                    // if (window.location.href.indexOf('/tuyen-sinh/') == -1 && window.location.pathname != '/') {
                    var redirect_url = encodeURIComponent(environment.urlApp + 'admission/');
                    window.open(environment.urlSSO + "#/login?redirect_url=" + redirect_url + "&clientId=tsadmin", '_self');
                }
            }
            else {
                //if (window.location.pathname.indexOf('/tuyen-sinh') == -1 && window.location.pathname != '/tuyen-sinh' && window.location.pathname != '/') {
                if (!JSON.parse(localStorage.getItem('goiComplete'))) {
                    localStorage.removeItem('goiComplete');
                   
                    let tailink=(JSON.parse(authData).client_id=="tsadmission" &&(window.location.pathname.indexOf('/tuyen-sinh') >-1 || window.location.pathname == '/tuyen-sinh' || window.location.pathname == '/'))||
                    (JSON.parse(authData).client_id=="tsadmin" &&(window.location.pathname.indexOf('/admission') >-1 || window.location.pathname == '/admission'));
                    if (!tailink) {
                        localStorage.removeItem('authorizationData');
                        if (window.location.pathname.indexOf('/tuyen-sinh') == -1 && window.location.pathname != '/tuyen-sinh' && window.location.pathname != '/') {
                            var redirect_url = encodeURIComponent(environment.urlApp + 'admission/');
                            window.open(environment.urlSSO + "#/login?redirect_url=" + redirect_url + "&clientId=tsadmin", '_self');
                        } else {
                            var redirect_url = encodeURIComponent(environment.urlApp + 'tuyen-sinh/');
                            window.open(environment.urlSSO + "#/login?redirect_url=" + redirect_url + "&clientId=tsadmission", '_self');
                        }
                    }
                }
                else {
                    localStorage.removeItem('goiComplete');
                }
                // }
            }
        }
    }
    _setCode(code: string) {
        if (window.location.pathname.indexOf('/tuyen-sinh') == -1 && window.location.pathname != '/tuyen-sinh' && window.location.pathname != '/') {
            const body = new HttpParams()
                .set('code', code)
                .set('client_id', 'tsadmin')
                .set('redirect_uri', environment.urlAppComplete + 'admission%2f')
                .set('grant_type', 'authorization_code');
            this._httpClient.post(environment.urlAPISSO + 'token', body)
                .subscribe(async data => {
                    await localStorage.setItem("authorizationData", JSON.stringify(data));
                    localStorage.setItem('goiComplete', 'true');
                    window.location.href = environment.urlApp + 'admission/';//this.document.location.origin+'/'+this.document.location.pathname;
                    console.log(data);
                }, err => {
                    console.error(err)
                }
                );
        } else {
            const body = new HttpParams()
                .set('code', code)
                .set('client_id', 'tsadmission')
                .set('redirect_uri', environment.urlAppComplete + 'tuyen-sinh%2f')
                .set('grant_type', 'authorization_code')

            this._httpClient.post(environment.urlAPISSO + 'token', body)
                .subscribe(async data => {
                 
                    await localStorage.setItem("authorizationData", JSON.stringify(data));
                    localStorage.setItem('goiComplete', 'true');
                    window.location.href = environment.urlApp+'tuyen-sinh/profile/ho-so-xet-tuyen/'+(data as any).userId+'/null';
                    console.log(data);
                }, err => {
                    console.error(err)
                }
                );
        }

    }

    _getParameterByName(name, url) {
        if (!url) url = window.location.href;
        name = name.replace(/[\[\]]/g, '\\$&');
        var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
            results = regex.exec(url);
        if (!results) return null;
        if (!results[2]) return '';
        return decodeURIComponent(results[2].replace(/\+/g, ' '));
    }

    /**
     * On destroy
     */
    ngOnDestroy(): void {
        // Unsubscribe from all subscriptions
        this._unsubscribeAll.next();
        this._unsubscribeAll.complete();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Toggle sidebar open
     *
     * @param key
     */
    toggleSidebarOpen(key): void {
        this._fuseSidebarService.getSidebar(key).toggleOpen();
    }
}
