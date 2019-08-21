import { HttpClient, HttpResponse } from '@angular/common/http';
import { CotDiem } from '../Models/CotDiem.model';
import { ResourceService, QueryOption } from 'app/main/apps/admission/resource.service';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable()
export class CotDiemService extends ResourceService<CotDiem>
{

    constructor(
        private _httpClient: HttpClient
    ) {
        super(_httpClient, 'cotdiems')
    }
    getCotDiemByToHopCotDiemID(id) {
        return this._httpClient
            .get(`${this.url}/tohopcotdiems/${id}/cotdiems`).map((data: CotDiem) => this.convertData(data));
    }
}
