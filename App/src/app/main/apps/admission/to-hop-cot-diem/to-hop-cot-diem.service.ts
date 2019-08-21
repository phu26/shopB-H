
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ToHopCotDiem } from '../Models/ToHopCotDiem.model';
import { ResourceService } from 'app/main/apps/admission/resource.service';
import { Observable } from 'rxjs';


@Injectable()
export class ToHopCotDiemService extends ResourceService<ToHopCotDiem>
{
    constructor(
        private _httpClient: HttpClient
    ) {
        super(_httpClient, 'tohopcotdiems')
    }
    singleExpandCotDiem(id: number): Observable<ToHopCotDiem> {
        return this.httpClient
          .get(`${this.url}/${this.endpoint}/${id}?expand=cotdiem`)
          .map((data: any) => data as ToHopCotDiem);
      }

}
