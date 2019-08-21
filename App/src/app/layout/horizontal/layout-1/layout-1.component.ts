import { Component, OnDestroy, OnInit, ViewEncapsulation, Inject } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { FuseConfigService } from '@fuse/services/config.service';
import { navigation } from 'app/navigation/navigation';
import { DOCUMENT } from '@angular/platform-browser';
import { environment } from 'environments/environment';

@Component({
    selector     : 'horizontal-layout-1',
    templateUrl  : './layout-1.component.html',
    styleUrls    : ['./layout-1.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class HorizontalLayout1Component implements OnInit, OnDestroy
{
    fuseConfig: any;
    navigation: any;

    // Private
    private _unsubscribeAll: Subject<any>;

    /**
     * Constructor
     *
     * @param {FuseConfigService} _fuseConfigService
     */
    constructor(@Inject(DOCUMENT) private document: any,
        private _fuseConfigService: FuseConfigService
    )
    {
        //this._checkLogin();
        // Set the defaults
        this.navigation = navigation;

        // Set the private defaults
        this._unsubscribeAll = new Subject();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void
    {
        debugger;
        // Subscribe to config changes
        this._fuseConfigService.config
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe((config) => {
                //debugger;
                if(localStorage.getItem('configLayout'))
                this.fuseConfig=JSON.parse(localStorage.getItem('configLayout'));
                else
                this.fuseConfig = config;
            });
    }
    _checkLogin(){
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
                if (window.location.pathname.indexOf('/tuyen-sinh') == -1 && window.location.pathname != '/tuyen-sinh' && window.location.pathname != '/') {
                    if (!JSON.parse(localStorage.getItem('goiComplete'))) {
                        // if (window.location.href.indexOf('/tuyen-sinh/') == -1 && window.location.pathname != '/') {
                        var redirect_url = encodeURIComponent(environment.urlApp + 'admission/');
                        window.open(environment.urlSSO + "#/login?redirect_url=" + redirect_url + "&clientId=tsadmin", '_self');
                    }else{
                        localStorage.removeItem('goiComplete');
                    }
                }
            }
    }
    /**
     * On destroy
     */
    ngOnDestroy(): void
    {
        // Unsubscribe from all subscriptions
        this._unsubscribeAll.next();
        this._unsubscribeAll.complete();
    }
}
