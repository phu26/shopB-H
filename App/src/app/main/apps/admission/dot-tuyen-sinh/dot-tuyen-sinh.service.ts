import { Injectable } from '@angular/core';
import { ResourceService } from '../resource.service';
import { DotTuyenSinh } from '../Models/DotTuyenSinh.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable()
export class DotTuyenSinhService extends ResourceService<DotTuyenSinh> {

  constructor(
    private _httpClient: HttpClient
  ) {
    super(
      _httpClient, 'dottuyensinhs'
    );

  }
  RefreshAdmissionResult(DotTuyenSinhid: number): Observable<Boolean> {
    // let headers = new HttpHeaders();
    // var reqHeader = new HttpHeaders();
    // if(this.authData!=null&&this.authData.access_token!=""){
     
    //    reqHeader = new HttpHeaders({ 
    //      'Authorization': 'Bearer ' + this.authData.access_token});
    //  }
    return this.httpClient
      .get(`${this.url}/${this.endpoint}/UpdateAdmissionResult?DotTuyenSinhId=${DotTuyenSinhid!=null?DotTuyenSinhid:''}`)
      .map((data: any) => data as Boolean);
  }
  ExportExcelprocess(DotTuyenSinhid: number): Observable<any> {
  
    return this.httpClient
      .get(`${this.url}/${this.endpoint}/   ?DotTuyenSinhId=${DotTuyenSinhid!=null?DotTuyenSinhid:'null'}`)
      .map((data: any) => data as any);
  }

}

import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Observable } from 'rxjs';

@Injectable()
export class PersonValidatorService 
//implements ValidatorService 
{

  constructor() {
    
   }

  getRowValidator(): FormGroup {
    return new FormGroup({
      'Id':new FormControl(),
      'NganhDaoTao': new FormControl(null, Validators.required),
      'ChiTieu': new FormControl(),
      'ChiTieuVuot': new FormControl(),
      'ChiTieuThapNhat': new FormControl(),
      'DiemSan': new FormControl(),
      'DiemChuan': new FormControl(),
      'ToHopCotDiems': new FormControl()
      });
  }

  
}
