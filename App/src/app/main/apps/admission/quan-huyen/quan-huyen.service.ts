import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { QuanHuyen } from "../Models/QuanHuyen.model";
import { ResourceService } from 'app/main/apps/admission/resource.service';
import { Observable, of } from 'rxjs';

// @Injectable({
//   providedIn: 'root'
// })
@Injectable()
//export class QuanHuyenService implements Resolve<any>
export class QuanHuyenService extends ResourceService<QuanHuyen>
{

    
  routeParams: any;
  QuanHuyen: QuanHuyen;

  constructor(
    private _httpClient: HttpClient
  ) {
    super(_httpClient, 'quanhuyens')

  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> | Promise<any> | any {
    this.routeParams = route.params;
    return new Promise((resolve, reject) => {

      Promise.all([
        this.getTreeQuanHuyen()
      ]).then(
        () => {
          resolve();
        },
        reject
      );
    });
  }

  getTreeQuanHuyen(): Promise<any> {
    return new Promise((resolve, reject) => {
      this._httpClient.get(`${this.url}/${this.endpoint}/GetTree`)
        .subscribe((response: any) => {
          this.QuanHuyen = response;
          resolve(response);
        }, reject);

    });
  }
  GetDSTheoCap(Cap, ChaId): Observable<QuanHuyen[]> {
    return this.httpClient
      .get(`${this.url}/${this.endpoint}/GetDSTheoCap/?Cap=${Cap}& =${ChaId}`)
      .map((data: QuanHuyen) => this.convertData(data));
  }

  GetDSTheoCapAsync(Cap, ChaId): Promise<QuanHuyen[]> {
    return this.httpClient
      .get(`${this.url}/${this.endpoint}/GetDSTheoCap/?Cap=${Cap}&ChaId=${ChaId}`)
      .map((data: QuanHuyen) => this.convertData(data)).toPromise();
  }
  

  //top: la trang 1,2,3,4
  SearchAsync(cap,text,top,chaId): Observable<QuanHuyen[]> {
    
    let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
   
    debugger;
    var data= JSON.stringify(text);
    return this.httpClient
      .post(`${this.url}/${this.endpoint}/Search/?Cap=${cap}&top=${top}${chaId==null?'':'&chaId='+chaId}`,data,{headers:headers})
      .map((data: QuanHuyen) => this.convertData(data));
  }
  
  


 

}




