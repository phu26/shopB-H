import { HttpClient, HttpResponse } from '@angular/common/http';
import { CotDiem } from '../Models/CotDiem.model';
import { ResourceService, QueryOption } from 'app/main/apps/admission/resource.service';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable()
export class LoaiDiemService extends ResourceService<CotDiem>
{

    public dotTuyenSinhId=null;
    constructor(
        private _httpClient: HttpClient
    ) {
        super(_httpClient, 'cotdiems')
    }

    page(expand='', textSearch='',filter = '', sort = 'Id asc', pageIndex = 0, pageSize = 3): Observable<HttpResponse<Object>> {
        let queryOption = new QueryOption (expand,textSearch,filter ,sort, pageIndex, pageSize) ;
        return this.httpClient
          .get(`${this.url}/${this.endpoint}/PageInCludeLoai?dottuyensinhid=${this.dotTuyenSinhId}&${queryOption.getParams()}`,{ observe: 'response' })
      }
}
