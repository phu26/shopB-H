import { Injectable } from '@angular/core';
import { ResourceService } from 'app/main/apps/admission/resource.service';
import { HttpClient, HttpRequest, HttpEventType, HttpErrorResponse, HttpParams, HttpHeaders } from '@angular/common/http';
import { create } from 'domain';
import { environment } from 'environments/environment';
import { RequestOptions } from '@angular/http';

@Injectable({
  providedIn: 'root'
})
export class DataExcelService extends ResourceService<any> {
  public progress: number;  
  public message: string;
  constructor(private _httpClient: HttpClient) {
    super(_httpClient, 'DataExcels');
  }


  public importExcel(ids,danhmucid,dottuyensinhid){
    
    var data ={
      ids: ids,
      danhmucid:danhmucid,
      dottuyensinhid:dottuyensinhid
    };
    
    return this.create(data,"importData");

  }

  public checkDMNganhDaoTao(dottuyensinhid,danhmucid,ids?){
    return this._httpClient.get(`${environment.urlApi}/DataExcels/checkDanhMucNganhDaoTao?dottuyensinhid=${dottuyensinhid}&danhmucid=${danhmucid}`,{observe: 'response'});
  }
  public checkDMDoiTuongUuTien(dottuyensinhid,danhmucid,ids?){
    return this._httpClient.get(`${environment.urlApi}/DataExcels/checkDanhMucDoiTuongUuTien?dottuyensinhid=${dottuyensinhid}&danhmucid=${danhmucid}`,{observe: 'response'});
  }
  public checkDMKhuVucUuTien(dottuyensinhid,danhmucid,ids?){
    return this._httpClient.get(`${environment.urlApi}/DataExcels/checkDanhMucKhuVucUuTien?dottuyensinhid=${dottuyensinhid}&danhmucid=${danhmucid}`,{observe: 'response'});
  }
  
  public StartImport(ids,danhmucid,dottuyensinhid){
    
    var data ={
      ids: ids,
      danhmucid:danhmucid,
      dottuyensinhid:dottuyensinhid
    };
    
    return this.create(data,"StartImport");

  }

}
