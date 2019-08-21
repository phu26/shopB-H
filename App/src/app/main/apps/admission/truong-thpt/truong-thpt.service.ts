import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { TruongTHPT } from '../Models/TruongTHPT.model';
import { ResourceService } from 'app/main/apps/admission/resource.service';
import { Observable } from 'rxjs';

@Injectable()
export class TruongThptService extends ResourceService<TruongTHPT>
{
  constructor(
      private _httpClient: HttpClient
  ) {
      super(_httpClient, 'truongthpts');

  }

    //cap:THPT,DH,CD,TC,ĐHCL: có thể trường nhiều cấp cách nhau bởi dấu ","
    //tinhThanhId, quanHuyenId có thể null
    SearchAsync(cap,text,page,tinhThanhId,quanHuyenId): Observable<TruongTHPT[]> {
    
      let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
     
      debugger;
      var data= JSON.stringify(text);
      return this.httpClient
        .post(`${this.url}/${this.endpoint}/Search/?Cap=${cap}${tinhThanhId==null?'':'&tinhThanhId='+tinhThanhId}${quanHuyenId==null?'':'&quanHuyenId='+quanHuyenId}&page=${page}`,data,{headers:headers})
        .map((data: TruongTHPT) => this.convertData(data));
    }
    
} 
