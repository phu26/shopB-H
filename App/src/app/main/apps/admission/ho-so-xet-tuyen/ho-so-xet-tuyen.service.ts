import { Injectable } from '@angular/core';
import { ResourceService, QueryOption } from '../resource.service';
import { HttpClient, HttpResponse, HttpHeaders } from '@angular/common/http';
import { HoSoXetTuyen } from '../Models/HoSoXetTuyen.model';
import { Observable } from 'rxjs';

@Injectable()
export class HoSoXetTuyenService extends ResourceService<HoSoXetTuyen> {

  constructor(
    public _httpClient: HttpClient
  ) {
    super(
      _httpClient, 'HoSoXetTuyens'
    );
  }

  update(item: HoSoXetTuyen): Observable<HoSoXetTuyen> {
    var reqHeader = new HttpHeaders();
    if(this.authData!=null&&this.authData.access_token!=""){
     
       reqHeader = new HttpHeaders({ 
         'Authorization': 'Bearer ' + this.authData.access_token,'Content-Type':  'application/json'
        });
     }
    return this.httpClient
      .put<HoSoXetTuyen>(`${this.url}/${this.endpoint}?id=${item.Id}`,
      JSON.stringify(item),{headers:reqHeader})
      .map(data => data as HoSoXetTuyen); 
  }

  single(id: number, dotTuyenSinhId?: number): Observable<HoSoXetTuyen> {
    let headers = new HttpHeaders();
    var reqHeader = new HttpHeaders();
    if(this.authData!=null&&this.authData.access_token!=""){
     
       reqHeader = new HttpHeaders({ 
         'Authorization': 'Bearer ' + this.authData.access_token});
     }
  
   
    return this.httpClient
      .get(`${this.url}/${this.endpoint}/${id!=null?id:''}?DotTuyenSinhId=${dotTuyenSinhId}`,{headers:reqHeader})
      .map((data: any) => data as HoSoXetTuyen);
  }

  dangKyPhucKhao(id: number): Observable<HoSoXetTuyen> {
    let headers = new HttpHeaders();
    var reqHeader = new HttpHeaders();
    if(this.authData!=null&&this.authData.access_token!=""){
     
       reqHeader = new HttpHeaders({ 
         'Authorization': 'Bearer ' + this.authData.access_token});
     }
  
   
    return this.httpClient
      .get(`${this.url}/${this.endpoint}/DangKyPhucKhao?Id=${id}`,{headers:reqHeader})
      .map((data: any) => data as HoSoXetTuyen);
  }

  khoaHoSo(id: number): Observable<HoSoXetTuyen> {
    let headers = new HttpHeaders();
    var reqHeader = new HttpHeaders();
    if(this.authData!=null&&this.authData.access_token!=""){
     
       reqHeader = new HttpHeaders({ 
         'Authorization': 'Bearer ' + this.authData.access_token});
     }
  
   
    return this.httpClient
      .get(`${this.url}/${this.endpoint}/KhoaHoSo?Id=${id}`,{headers:reqHeader})
      .map((data: any) => data as HoSoXetTuyen);
  }

  singleAsync(id: number, dotTuyenSinhId?: number): Promise<HoSoXetTuyen> {
    let headers = new HttpHeaders();
    var reqHeader = new HttpHeaders();
    if(this.authData!=null&&this.authData.access_token!=""){
     
       reqHeader = new HttpHeaders({ 
         'Authorization': 'Bearer ' + this.authData.access_token});
     }
  
   
    return this.httpClient
      .get(`${this.url}/${this.endpoint}/${id!=null?id:''}?DotTuyenSinhId=${dotTuyenSinhId}`,{headers:reqHeader})
      .map((data: any) => data as HoSoXetTuyen).toPromise();
  }
  
  getHoSoXetTuyenbyMaHoSo(maHoSo:string,dotTuyenSinhId:string):Observable<HoSoXetTuyen>{
    return this.httpClient.get(`${this.url}/${this.endpoint}/GetHoSoBySoBienNhan/${maHoSo}/${dotTuyenSinhId}`,{ observe: 'response' })
    .map((data: any) => data.body as HoSoXetTuyen);
  }

}
@Injectable()
export class HoSoXetTuyenThiSinhService extends HoSoXetTuyenService {

  constructor(
    public _httpClient: HttpClient
  ) {
    super(
      _httpClient
    );
  }
  page(expand='', textSearch='',filter = '', sort = 'Id asc', pageIndex = 0, pageSize = 3): Observable<HttpResponse<Object>> {
    let queryOption = new QueryOption (expand,textSearch,filter ,sort, pageIndex, pageSize) ;
    return this.httpClient
      .get(`${this.url}/${this.endpoint}/pagethisinh?${queryOption.getParams()}`,{ observe: 'response' })
  }
  
}
