import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { ThiSinh } from "../Models/ThiSinh.model";
import { ResourceService } from '../resource.service';
import { environment } from 'environments/environment';
@Injectable()
export class ThiSinhService extends ResourceService<ThiSinh> {
  constructor(
    private _httpClient: HttpClient
  ) {
    super(_httpClient, 'thisinhs')

  }

  singleByCMND(cmnd){
    let headers = new HttpHeaders();
    var reqHeader = new HttpHeaders();
    if(this.authData!=null&&this.authData.access_token!=""){
     
       reqHeader = new HttpHeaders({ 
         'Authorization': 'Bearer ' + this.authData.access_token});
     }
    return this.httpClient
      .get(`${this.url}/thisinhs/GetThiSinhByCMND?cmnd=${cmnd!=null?cmnd:''}`,{headers:reqHeader})
      .map((data: any) => data as ThiSinh);
  }

}
