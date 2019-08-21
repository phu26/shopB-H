import {  OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpResponse, HttpHeaders } from '@angular/common/http';
import 'rxjs/add/operator/map'
import { environment } from 'environments/environment';
import { RequestOptions } from '@angular/http';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json'
  })
};

// @Injectable({
//   providedIn: 'root'
// })
export class ResourceService<T extends Resource> implements OnInit {
  authData:any=null;
  ngOnInit(): void {
    this.authData=JSON.parse(localStorage.getItem('authorizationData'));
  }

  constructor(
    public httpClient: HttpClient,
    public endpoint: string,
    public url?: string
    ) 
    { 
      if(!this.url)
      this.url=environment.urlApi;
      else
      this.url = url;

      this.authData=JSON.parse(localStorage.getItem('authorizationData'));
    }

    public create(item: T,router?:string): Observable<T> {
  
      return this.httpClient
        .post<T>(`${this.url}/${this.endpoint}${!router?'':'/'+router}`, JSON.stringify(item), httpOptions)
        .map(data => data as T);
    }

    public createUpload(item: T,url:string=null): Observable<T> {
      var reqHeader=new HttpHeaders();
      return this.httpClient
        .post<T>(`${url}`, item,{headers:reqHeader})
        .map(data => data as T);
    }

    public createUpload_V1(item: T,url:string=null): Observable<T> {
      // let reqHeader = {
      //   headers: new HttpHeaders({
      //     'Content-Type':  'multipart/form-data'
      //   })
      // };
      return this.httpClient
        .post<T>(`${url}`, item)
        .map(data => data as T);
    }

  public update(item: T): Observable<T> {
    return this.httpClient
      .put<T>(`${this.url}/${this.endpoint}?id=${item.Id}`,
      JSON.stringify(item),httpOptions)
      .map(data => data as T); 
  }

  single(id: number): Observable<T> {
    let headers = new HttpHeaders();
    var reqHeader = new HttpHeaders();
    if(this.authData!=null&&this.authData.access_token!=""){
     
       reqHeader = new HttpHeaders({ 
         'Authorization': 'Bearer ' + this.authData.access_token});
     }
  
   
    return this.httpClient
      .get(`${this.url}/${this.endpoint}/${id!=null?id:''}`,{headers:reqHeader})
      .map((data: any) => data as T);
  }

  singleAsync(id: number): Promise<T> {
    let headers = new HttpHeaders();
    var reqHeader = new HttpHeaders();
    if(this.authData!=null&&this.authData.access_token!=""){
     
       reqHeader = new HttpHeaders({ 
         'Authorization': 'Bearer ' + this.authData.access_token});
     }
   
    return this.httpClient
      .get(`${this.url}/${this.endpoint}/${id!=null?id:''}`,{headers:reqHeader})
      .map((data: any) => data as T).toPromise();


  }
 
  createAuthorizationHeader(headers: HttpHeaders) {
    headers.set('Authorization', 'Bearer ' +
    this.authData.access_token); 
  }

  all(expand='',textSearch='' , filter = '', sort = 'Id asc'): Observable<T[]> {
    let headers = new HttpHeaders();
    let queryOption = new QueryOption (expand,textSearch,filter ,sort, undefined, undefined) ;
    //this.createAuthorizationHeader(headers);
    // this.httpClient.DefaultRequestHeaders.Authorization =
    // new AuthenticationHeaderValue("Bearer", "Your Oauth token");
    return this.httpClient
      .get(`${this.url}/${this.endpoint}/all?${queryOption.getParams()}`,{headers:headers})
      .map((data: any) => data as T[] );
  }

  allAsync(expand='',textSearch='' , filter = '', sort = 'Id asc'): Promise<T[]> {
    let headers = new HttpHeaders();
    let queryOption = new QueryOption (expand,textSearch,filter ,sort, undefined, undefined) ;
    //this.createAuthorizationHeader(headers);
    // this.httpClient.DefaultRequestHeaders.Authorization =
    // new AuthenticationHeaderValue("Bearer", "Your Oauth token");
    return this.httpClient
      .get(`${this.url}/${this.endpoint}/all?${queryOption.getParams()}`,{headers:headers})
      .map((data: any) => data as T[] ).toPromise();
  }
  
  page(expand='', textSearch='',filter = '', sort = 'Id asc', pageIndex = 0, pageSize = 3): Observable<HttpResponse<Object>> {
    let queryOption = new QueryOption (expand,textSearch,filter ,sort, pageIndex, pageSize) ;
    return this.httpClient
      .get(`${this.url}/${this.endpoint}/page?${queryOption.getParams()}`,{ observe: 'response' })
  }

  pageAsync(expand='', textSearch='',filter = '', sort = 'Id asc', pageIndex = 0, pageSize = 3): Promise<HttpResponse<Object>> {
    let queryOption = new QueryOption (expand,textSearch,filter ,sort, pageIndex, pageSize) ;
    return this.httpClient
      .get(`${this.url}/${this.endpoint}/page?${queryOption.getParams()}`,{ observe: 'response' }).toPromise()
  }

  delete(id: number) {
    return this.httpClient
      .delete(`${this.url}/${this.endpoint}?id=${id}`);
  }
  public convertData(data: any): T[] {
    return data.map(item => item);
  }

 
}




export class Resource {
  Id: number
}


export interface Serializer {
  fromJson(json: any): Resource;
  toJson(resource: Resource): any;
}

export class QueryOption {
  expand: string;
  textSearch:string;
  filter: string;
  sort: string;
  page: number;
  pageSize: number;

  constructor(expand: string, textSearch:string , filter: string, sort: string, page: number, pageSize: number) {
    this.expand = expand;
    this.filter = filter;
    this.sort = sort;
    this.page = page;
    this.pageSize = pageSize;
    this.textSearch=textSearch;

  }

  getParams(): string {
    let text:string='1=1';
    //if(this.textSearch)
     // text=`CONTAINS((ts.Ten, ts.CMND,ts.Email, ts.SoBaoDanh , ts.SDT), '"${this.textSearch}"')`;

    let params: string = [
      `expand=${this.expand || ''}`,
      `search=${this.textSearch || ''}`,
      `filter=${text} AND (${this.filter || '1=1'})`,
      `sort=${this.sort || ''}`,
      `page=${this.page || 0}`,
      `pageSize=${this.pageSize || 0}`,
    
    ].join('&');

    return params;
  }

}
  
