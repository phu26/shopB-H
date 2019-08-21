import { Injectable, Inject } from '@angular/core';
import { 
  Router,
  CanActivate,
  ActivatedRouteSnapshot
} from '@angular/router';
import { DOCUMENT } from '@angular/common';
import { environment } from 'environments/environment';
@Injectable({ providedIn: 'root' })
export class RoleGuardService implements CanActivate {
  constructor(@Inject(DOCUMENT) private document: any,public router: Router) {}
  canActivate(route: ActivatedRouteSnapshot): boolean {
    // this will be passed from the route config
    // on the data property
    debugger;
    let token = localStorage.getItem('authorizationData');
    // decode the token to get its payload
    if (token==null||JSON.parse(token).userId==""
    ) {
        let urlRedirect = this.document.location.href;
        let redirect_url=encodeURIComponent(urlRedirect);
        window.open(environment.urlSSO + "#/login?redirect_url=" + redirect_url + "&clientId=tsadmission", '_self');
    }
    return true;
  }
}